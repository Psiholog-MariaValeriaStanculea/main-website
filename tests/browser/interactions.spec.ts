import { test, expect } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('en/');
  await expect(page.getByRole('button', { name: 'Dark mode', exact: true })).toBeVisible();
});

test('theme toggles, persists, and follows system changes until explicitly selected', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Light mode', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/light/);
  await page.getByRole('button', { name: 'Dark mode', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('blocked browser storage still allows content, theme and cookie dismissal', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  await page.reload();
  await expect(page.locator('main h1')).toBeVisible();
  await page.getByRole('button', { name: 'Dark mode', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Reject All', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Cookie Usage' })).toHaveCount(0);
});

test.describe('cookie consent', () => {
  test.use({ savedConsent: false });
  test('cookie rejection persists across reloads and retains necessary consent', async ({ page }) => {
    await page.getByRole('button', { name: 'Reject All', exact: true }).click();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('cookie-consent')!))).toEqual({ necessary: true, analytics: false, marketing: false });
    await page.clock.install();
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/light/);
    await page.clock.fastForward(1600);
    await expect(page.getByRole('heading', { name: 'Cookie Usage' })).toHaveCount(0);
  });
});

test('mobile menu traps focus, closes with Escape and releases scroll', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only');
  const trigger = page.getByRole('button', { name: 'Open menu', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Menu', exact: true });
  await expect(dialog).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await dialog.getByRole('link', { name: 'Book Now', exact: true }).focus();
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('resizing an open mobile menu restores desktop navigation and scrolling', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('nav').getByRole('link', { name: 'Services', exact: true })).toBeVisible();
});

test('language dropdown is clickable above the mobile dialog and preserves query/anchor', async ({ page }, testInfo) => {
  await page.goto('en/servicii/?tracking=regression#evaluare');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.getByRole('button', { name: 'Change language', exact: true }).click();
  await page.getByRole('menuitem', { name: /Română/ }).click();
  await expect(page).toHaveURL(/\/ro\/servicii\/\?tracking=regression#evaluare$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('#evaluare')).toBeInViewport();
});

test('desktop services dropdown opens with keyboard focus and navigates to its anchor', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop navigation only');
  const services = page.locator('nav').getByRole('link', { name: 'Services', exact: true });
  await services.focus();
  await expect(services).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  const assessment = page.locator('nav').getByRole('link', { name: 'Psychological assessment', exact: true });
  await expect(assessment).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(services).toHaveAttribute('aria-expanded', 'false');
  await services.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/en\/servicii#evaluare$/);
  await expect(page.locator('#evaluare')).toBeInViewport();
});

test('package toggle changes plans, pressed state and retains a visible popular badge', async ({ page }) => {
  const packages = page.getByRole('button', { name: 'Packages', exact: true });
  const session = page.getByRole('button', { name: 'Per session', exact: true });
  await expect(session).toHaveAttribute('aria-pressed', 'true');
  await packages.click();
  await expect(packages).toHaveAttribute('aria-pressed', 'true');
  await expect(session).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByRole('heading', { name: 'Family Package', exact: true })).toBeVisible();
  const badge = page.getByText('Most Popular', { exact: true });
  expect(await badge.evaluate(element => {
    const badge = element.getBoundingClientRect(); const card = element.parentElement!.getBoundingClientRect();
    return badge.top >= card.top && badge.bottom <= card.bottom;
  })).toBe(true);
  await session.click();
  await expect(page.getByRole('heading', { name: 'Standard Session', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Family Package', exact: true })).toHaveCount(0);
});

test('blog search includes featured articles, empty results and category reset', async ({ page }) => {
  await page.goto('en/blog/');
  const search = page.getByRole('textbox', { name: 'Search articles...' });
  const firstTitle = (await page.locator('main h3').first().innerText()).trim();
  await search.fill(firstTitle);
  await expect(page.getByRole('heading', { name: firstTitle, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Featured Article', exact: true })).toHaveCount(0);
  await search.fill('no-such-article-regression-9834');
  await expect(page.getByRole('heading', { name: 'No articles found', exact: true })).toBeVisible();
  await expect(page.locator('main a[href*="/blog/"]')).toHaveCount(0);
  await search.fill('');
  await page.locator('main button[aria-pressed="false"]').first().click();
  await expect(page.getByRole('heading', { name: 'Featured Article', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'All Categories', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Featured Article', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Read Article', exact: true }).click();
  await expect(page.locator('main h1')).toHaveText(firstTitle);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/blog\/\d+$/);
});

test('contact form rejects missing/invalid fields and encodes inquiry text in its email link', async ({ page }) => {
  await page.goto('en/contact/');
  const submit = page.locator('form button[type="submit"]');
  await submit.click();
  await expect(page.locator('#name')).toBeFocused();
  await page.locator('#name').fill('Regression Test');
  await page.locator('#email').fill('invalid-email');
  await submit.click();
  await expect(page.locator('#email')).toBeFocused();
  await page.locator('#email').fill('test@example.invalid');
  const subject = 'A & B? Ședință'; const message = 'Testing accents: ș ț î & ? +\nSecond line';
  await page.locator('#subject').fill(subject);
  await page.locator('#message').fill(message);
  // Inspect the prepared email only; never send an inquiry or open an email application.
  const mailto = await page.locator('main a[href^="mailto:"][href*="subject="]').last().getAttribute('href');
  const query = new URLSearchParams(mailto!.split('?')[1]);
  expect(query.get('subject')).toBe(subject);
  expect(query.get('body')).toContain(message);
  expect(query.get('body')).toContain('test@example.invalid');
  await expect(page.locator('#name')).toHaveValue('Regression Test');
});
