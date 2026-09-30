import { test, expect } from './fixtures';

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`FAQ answers collapse and reopen correctly with motion=${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto('en/intrebari-frecvente/');
    const trigger = page.locator('main button[aria-controls]').first();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    const answer = page.locator(`[id="${await trigger.getAttribute('aria-controls')}"]`);
    expect((await answer.textContent())!.trim().length).toBeGreaterThan(20);
    await expect.poll(() => answer.evaluate(element => element.getBoundingClientRect().height)).toBe(0);
    await trigger.scrollIntoViewIfNeeded();
    // Observe the actual layout transition. A duration declared in CSS alone cannot
    // detect Radix suppressing transitions on its measured content element.
    const sampleTransition = () => answer.evaluate(element => new Promise<number[]>(resolve => {
      const heights: number[] = [element.getBoundingClientRect().height];
      const target = element.firstElementChild!;
      let finished = false;
      const timeout = setTimeout(() => finish(), 2500);
      const finish = () => {
        finished = true;
        clearTimeout(timeout);
        target.removeEventListener('transitionrun', start);
        target.removeEventListener('transitionend', end);
        resolve(heights);
      };
      const frame = () => {
        if (finished) return;
        heights.push(element.getBoundingClientRect().height);
        requestAnimationFrame(frame);
      };
      const start = (event: Event) => {
        if ((event as TransitionEvent).propertyName === 'grid-template-rows') requestAnimationFrame(frame);
      };
      const end = (event: Event) => {
        if ((event as TransitionEvent).propertyName === 'grid-template-rows') finish();
      };
      target.addEventListener('transitionrun', start);
      target.addEventListener('transitionend', end);
    }));
    const [opening] = await Promise.all([reducedMotion === 'reduce' ? Promise.resolve([]) : sampleTransition(), trigger.click()]);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(answer).toBeVisible();
    await expect.poll(() => answer.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThan(20);
    if (reducedMotion === 'no-preference') {
      const full = await answer.evaluate(element => element.getBoundingClientRect().height);
      expect(opening.some(height => height > 1 && height < full - 1), 'Answer must animate through intermediate heights').toBe(true);
    } else {
      expect(await answer.locator(':scope > div').evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(0.001);
    }
    const [closing] = await Promise.all([reducedMotion === 'reduce' ? Promise.resolve([]) : sampleTransition(), trigger.click()]);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => answer.evaluate(element => element.getBoundingClientRect().height)).toBe(0);
    await expect(answer).toBeHidden();
    if (reducedMotion === 'no-preference') expect(closing.some(height => height > 1 && height < closing[0] - 1)).toBe(true);
    expect((await answer.textContent())!.trim().length).toBeGreaterThan(20);
    await trigger.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(answer).toBeVisible();
  });

  test(`carousel buttons and keyboard move slides with motion=${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto('en/');
    const carousel = page.locator('[aria-roledescription="carousel"]');
    await carousel.scrollIntoViewIfNeeded();
    const next = carousel.getByRole('button', { name: 'Next slide', exact: true });
    const previous = carousel.getByRole('button', { name: 'Previous slide', exact: true });
    await expect(next).toBeEnabled();
    await expect(previous).toBeVisible();
    for (const control of [next, previous]) {
      const box = await control.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    }
    const track = carousel.locator('[aria-roledescription="slide"]').first().locator('..');
    const initial = await track.evaluate(element => getComputedStyle(element).transform);
    await next.click();
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(initial);
    if (reducedMotion === 'reduce') {
      const positions = await track.evaluate(element => new Promise<string[]>(resolve => {
        const values: string[] = [];
        const sample = () => {
          values.push(getComputedStyle(element).transform);
          if (values.length === 4) resolve(values); else requestAnimationFrame(sample);
        }; requestAnimationFrame(sample);
      }));
      expect(new Set(positions).size, 'Reduced motion should jump without a scrolling animation').toBe(1);
    }
    await carousel.focus();
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).toBe(initial);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(initial);
  });
}

test('About entrance animations finish visibly and respect reduced motion', async ({ page }) => {
  await page.goto('en/despre/');
  const entrances = page.locator('.fade-in-up');
  expect(await entrances.count()).toBeGreaterThan(0);
  const states = await entrances.evaluateAll(elements => elements.map(element => {
    const style = getComputedStyle(element);
    return { fill: style.animationFillMode, delay: style.animationDelay };
  }));
  expect(states.every(state => state.fill === 'both')).toBe(true);
  expect(states.some(state => parseFloat(state.delay) > 0)).toBe(true);
  for (const entrance of await entrances.all()) await expect(entrance).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await entrances.evaluateAll(elements => elements.every(element =>
    parseFloat(getComputedStyle(element).animationDuration) <= 0.001 &&
    parseFloat(getComputedStyle(element).animationDelay) === 0))).toBe(true);
});
