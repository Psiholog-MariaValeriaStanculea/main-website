import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ healthyPage: void; savedConsent: boolean }>({
  savedConsent: [true, { option: true }],
  healthyPage: [async ({ page, baseURL, savedConsent, javaScriptEnabled }, use) => {
    const errors: string[] = [];
    const origin = new URL(baseURL!).origin;
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (new URL(response.url()).origin === origin && response.status() >= 400 &&
        ['script', 'stylesheet', 'image', 'font'].includes(response.request().resourceType())) {
        errors.push(`${response.status()} ${response.url()}`);
      }
    });
    page.on('requestfailed', request => {
      if (javaScriptEnabled === false && request.resourceType() === 'script' && request.failure()?.errorText === 'csp') return;
      if (new URL(request.url()).origin === origin && request.failure()?.errorText !== 'net::ERR_ABORTED') {
        errors.push(`${request.failure()?.errorText} ${request.url()}`);
      }
    });
    // Fixtures never contact an email provider or launch a local email application.
    await page.route('https://api.emailjs.com/**', route => route.abort('blockedbyclient'));
    // Keep tests repeatable offline; external font CDN uptime is outside this artifact.
    await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }));
    if (savedConsent) await page.addInitScript(() => {
      try { localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false })); }
      catch { /* The blocked-storage test intentionally denies access. */ }
    });
    await use();
    expect(errors, 'Unhandled runtime errors or broken production assets').toEqual([]);
  }, { auto: true }],
});
export { expect };
