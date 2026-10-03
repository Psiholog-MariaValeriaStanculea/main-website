import type { Page, TestInfo } from '@playwright/test';

export async function captureQa(page: Page, info: TestInfo, name: string, options: { animations?: 'disabled' } = {}) {
  const path = info.outputPath(name);
  await page.screenshot({ path, fullPage: true, ...options });
  await info.attach(name, { path, contentType: 'image/png' });
}
