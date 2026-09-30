import { defineConfig } from '@playwright/test';
import { readFileSync } from 'node:fs';

const firstPage = new URL(readFileSync('dist/sitemap.xml', 'utf8').match(/<loc>([^<]+)<\/loc>/)![1]);
const basePath = firstPage.pathname.replace(/(?:ro|en|it|es)(?:\/.*)?$/, '');

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:4180${basePath}`,
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
    command: 'node scripts/serve-pages.mjs',
    url: `http://127.0.0.1:4180${basePath}`,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
