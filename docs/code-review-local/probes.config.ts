import { defineConfig } from '@playwright/test';

export default defineConfig({
 testDir: '.', testMatch: 'probes.spec.ts', workers: 1,
 outputDir: '../../test-results/local-review-probes',
 reporter: [['list']],
 use: {baseURL:'http://127.0.0.1:4190/main-website/',browserName:'chromium',viewport:{width:1440,height:900}},
 webServer:{cwd:process.cwd(),command:'node scripts/serve-pages.mjs --root .contact-test-dist --port 4190',url:'http://127.0.0.1:4190/main-website/',reuseExistingServer:false},
});
