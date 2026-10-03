import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
const evidence:Record<string,unknown>={};
const output='docs/code-review-local/fix-probe-results.json';
test.beforeEach(async({page})=>{
 await page.route('https://**/*',route=>route.abort('blockedbyclient'));
});
test.afterEach(()=>writeFileSync(output,JSON.stringify(evidence,null,2)+'\n'));

test('both logo variants load and only the visible image is scrolled',async({page})=>{
 await page.goto('ro/');
 await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 const hidden=page.locator('.brand-logo-dark');
 await expect(hidden).toBeHidden();
 for(const image of await page.locator('img').all()){
  if(await image.isVisible())await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate(element=>(element as HTMLImageElement).complete&&(element as HTMLImageElement).naturalWidth>0)).toBe(true);
 }
 evidence.logo={hiddenImageIncluded:await hidden.count(),allImagesLoaded:true,hiddenImageScrollOmitted:true};
});

test('navigation retains the sending lock and prevents duplicate requests',async({page})=>{
 const releases:Array<()=>void>=[];let requests=0;
 await page.route('https://api.emailjs.com/api/v1.0/email/send',async route=>{
  requests++;await new Promise<void>(resolve=>releases.push(resolve));await route.fulfill({status:200,body:'OK'});
 });
 await page.goto('en/contact/');
 await page.locator('#name').fill('Local review probe');
 await page.locator('#email').fill('review@example.invalid');
 await page.locator('#message').fill('Fictional local-only inquiry.');
 await page.locator('form button[type=submit]').click();
 await expect.poll(()=>requests).toBe(1);
 await expect(page.locator('form button[type=submit]')).toBeDisabled();
 await page.locator('form a[href$="/confidentialitate"]').click();
 await expect(page.locator('main h1')).toHaveText('Privacy');
 await page.goBack();
 await expect(page.locator('#message')).toHaveValue('Fictional local-only inquiry.');
 await expect(page.locator('form button[type=submit]')).toBeDisabled();
 await page.locator('form').evaluate((form:HTMLFormElement)=>form.requestSubmit());
 expect(requests).toBe(1);
 evidence.contact={concurrentRequestsAfterSpaReturn:requests,firstRequestStillPending:true,draftRestored:true};
 for(const release of releases)release();
 await expect(page.getByRole('status')).toContainText('Your inquiry has been submitted');
});

test('observe initial deep-link anchor after fonts load',async({page})=>{
 await page.goto('ro/servicii/#online');
 await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await page.evaluate(()=>document.fonts.ready);
 const start=await page.locator('#online').boundingBox();
 await expect(page.locator('#online')).toBeInViewport();
 evidence.anchor={targetTop:start?.y,scrollY:await page.evaluate(()=>scrollY)};
});

test('observe localized no-JavaScript 404 fallback',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 const response=await page.goto('http://127.0.0.1:4190/main-website/en/does-not-exist/');
 const languages=await page.locator('.static-error-language').evaluateAll(cards=>cards.map(card=>card.getAttribute('lang')));
 expect(response?.status()).toBe(404);expect(languages).toEqual(['ro','en','it','es']);
 await expect(page.locator('.static-error-language[lang="en"] h2')).toHaveText('Page not found');
 evidence.noJs404={status:response?.status(),requestedLanguage:'en',recoveryLanguages:languages};
 await context.close();
});

test('audit every localized route locally without scrolling a hidden logo',async({page})=>{
 test.setTimeout(120000);
 const manifest=JSON.parse(readFileSync('.contact-test-dist/route-manifest.json','utf8')) as {path:string;language:string;url:string}[];
 const completed:string[]=[];const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 for(const width of [320,1440]){
  await page.setViewportSize({width,height:900});
  for(const item of manifest){
   expect((await page.goto(item.path.slice(1)+'/'))?.status()).toBe(200);
   await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
   await expect(page.locator('html')).toHaveAttribute('lang',item.language);
   await expect(page.locator('main h1')).toBeVisible();
   await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',item.url);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
   expect((await page.reload())?.status()).toBe(200);
   await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
   for(const image of await page.locator('img').all()){
    if(await image.isVisible())await image.scrollIntoViewIfNeeded();
    await expect.poll(()=>image.evaluate(element=>(element as HTMLImageElement).complete&&(element as HTMLImageElement).naturalWidth>0)).toBe(true);
   }
   completed.push(width+':'+item.path);
  }
 }
 expect(errors).toEqual([]);evidence.routeAudit={completed,errors,artifact:'.contact-test-dist',hiddenImageScrollOmitted:true};
 writeFileSync('docs/code-review-local/route-audit-results.json',JSON.stringify(evidence.routeAudit,null,2)+'\n');
});
