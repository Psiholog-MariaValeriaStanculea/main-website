import { defineConfig } from '@playwright/test';
import { readFileSync } from 'node:fs';

const contactTests=process.env.PLAYWRIGHT_CONTACT_TESTS==='1';
const artifact=contactTests?'.contact-test-dist':'dist';
const port=contactTests?4182:4180;
const firstPage = new URL(readFileSync(artifact+'/sitemap.xml', 'utf8').match(/<loc>([^<]+)<\/loc>/)![1]);
const basePath = firstPage.pathname.replace(/(?:ro|en|it|es)(?:\/.*)?$/, '');

export default defineConfig({
  testDir: './tests/browser',
  testMatch: contactTests?['contact.spec.ts','recaptcha.spec.ts']:'**/*.spec.ts',
  testIgnore: contactTests?[]:['**/contact.spec.ts','**/recaptcha.spec.ts'],
  outputDir: contactTests?'contact-test-results':'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never',outputFolder:contactTests?'contact-playwright-report':'playwright-report' }]],
  use: {
    baseURL: `http://127.0.0.1:${port}${basePath}`,
    colorScheme: 'light',
    reducedMotion: 'no-preference',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 320, height: 740 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: `node scripts/serve-pages.mjs --root ${artifact} --port ${port}`,
    url: `http://127.0.0.1:${port}${basePath}`,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
