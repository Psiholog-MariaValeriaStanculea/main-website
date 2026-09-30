import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { test, expect } from './fixtures';

const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
const languages = ['ro', 'en', 'it', 'es'];
const routes = ['', '/despre', '/servicii', '/contact', '/intrebari-frecvente', '/blog', ...[1, 2, 3, 4, 5, 6].map(id => `/blog/${id}`)];
const basePath = urls[0].pathname.replace(/(?:ro|en|it|es)(?:\/.*)?$/, '');

test('live verifier accepts the complete production HTML and JS/CSS responses', async ({ baseURL }) => {
  expect(execFileSync(process.execPath, ['scripts/check-pages.mjs', '--url', baseURL!], { encoding: 'utf8' }))
    .toContain('Pages HTTP checks passed');
});

test('sitemap contains the complete set of 48 localized routes', () => {
  expect(urls.map(url => url.pathname).sort()).toEqual(languages.flatMap(lang => routes.map(route => `${basePath}${lang}${route}`)).sort());
});

for (const url of urls) {
  const route = url.pathname.slice(basePath.length);
  const lang = route.split('/')[0];
  test(`direct load and reload: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
    // SSR content alone could hide a JS startup failure: a working theme button proves React mounted.
    await page.getByRole('button', { name: { ro: 'Mod întunecat', en: 'Dark mode', it: 'Modalità scura', es: 'Modo oscuro' }[lang], exact: true }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('head title')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url.href.replace(/\/$/, ''));
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(5);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{30}/);
    const width = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(width.content, 'Page must not scroll horizontally').toBeLessThanOrEqual(width.viewport + 1);
    expect(await page.locator('a[href]').evaluateAll((links, base) => links.map(link => link.getAttribute('href'))
      .filter(href => href?.startsWith('/') && !href.startsWith(base)), basePath)).toEqual([]);
    const reload = await page.reload();
    expect(reload?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('html')).toHaveClass(/dark/);
    // Load lazy images throughout the page, including below the fold.
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => {
        const image = element as HTMLImageElement;
        return image.complete && image.naturalWidth > 0;
      }), { message: 'Production image must finish loading successfully' }).toBe(true);
    }
  });
}

test('root entry and legacy hash bookmarks reach the correct language route', async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await expect(page).toHaveURL(new RegExp(`${basePath}ro/?$`));
  await expect(page.locator('main h1')).toBeVisible();
  await page.goto(`${baseURL}#/en/blog/1`);
  await expect(page).toHaveURL(new RegExp(`${basePath}en/blog/1$`));
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/blog\/1$/);
});

test('unknown pages return HTTP 404, noindex metadata and a usable home link', async ({ page }) => {
  const response = await page.goto('en/does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await page.getByRole('link', { name: 'Back to the homepage' }).click();
  await expect(page.locator('main h1')).toBeVisible();
});

test.describe('prerendered content without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const lang of languages) test(`${lang} homepage and article are readable`, async ({ page }) => {
    for (const route of [`${lang}/`, `${lang}/blog/1/`]) {
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.locator('main h1')).toBeVisible();
      await expect(page.locator('main')).toContainText(/\S.{100}/);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(route.replace(/\/$/, '') + '$'));
    }
  });
});
