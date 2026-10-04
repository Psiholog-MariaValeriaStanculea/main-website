import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { captureQa } from './qa';
async function theme(page:Page,value:string){
 if(page.viewportSize()!.width<1280 && await page.getByRole('dialog').count()===0)await page.getByRole('button',{name:'Open menu',exact:true}).click();
 await expect(page.getByRole('button',{name:'Appearance',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Appearance',exact:true}).click();
 await page.getByRole('menuitemradio',{name:value,exact:true}).click();
 await expect(page.getByRole('menuitemradio')).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Appearance',exact:true})).toBeVisible();
}
async function logo(page:Page,mode:'light'|'dark'){
 await expect(page.locator('.brand-logo-'+mode)).toBeVisible();
 await expect(page.locator('.brand-logo-'+(mode==='dark'?'light':'dark'))).toBeHidden();
 await expect.poll(()=>page.locator('.brand-logo-'+mode).evaluate(element=>(element as HTMLImageElement).complete&&(element as HTMLImageElement).naturalWidth>0)).toBe(true);
}
test.beforeEach(async({page})=>{await page.goto('en/');await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');});
test('system, light and dark appearance work and explicit preference persists',async({page},info)=>{
 await page.emulateMedia({colorScheme:'dark'});await expect(page.locator('html')).toHaveClass(/dark/);
 await logo(page,'dark');
 await theme(page,'Light');await expect(page.locator('html')).toHaveClass(/light/);
 await logo(page,'light');
 await page.reload();await expect(page.locator('html')).toHaveClass(/light/);
 await logo(page,'light');
 await theme(page,'Dark');await expect(page.locator('html')).toHaveClass(/dark/);
 await logo(page,'dark');
 await page.goto('ro/');await expect(page.locator('html')).toHaveClass(/dark/);
 await page.evaluate(()=>document.fonts.ready);
 await captureQa(page,info,'ro-home-dark-'+(info.project.name==='desktop'?'1440':'320')+'.png');
 for(const suffix of ['intrebari-frecvente','contact']){
  await page.goto('ro/'+suffix+'/');
  if(suffix==='intrebari-frecvente'){
   const first=page.locator('main button[aria-controls]').first();await expect(first).toHaveAttribute('aria-expanded','false');await first.click();await expect(first).toHaveAttribute('aria-expanded','true');
  }
  await captureQa(page,info,'ro-'+suffix+'-dark-'+(info.project.name==='desktop'?'1440':'320')+'.png',{animations:'disabled'});
 }
 await page.goto('en/');
 await theme(page,'System');await page.emulateMedia({colorScheme:'light'});await expect(page.locator('html')).toHaveClass(/light/);
 await logo(page,'light');
});
test('blocked storage does not break the site or theme selection',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await theme(page,'Dark');await expect(page.locator('html')).toHaveClass(/dark/);
});
test('mobile menu traps focus and Escape returns to the opener',async({page},info)=>{
 test.skip(info.project.name!=='mobile','Mobile menu');
 const opener=page.getByRole('button',{name:'Open menu',exact:true});await opener.click();
 const menu=page.getByRole('dialog',{name:'Menu',exact:true});await expect(menu).toBeVisible();
 await expect(page.locator('body')).toHaveCSS('overflow','hidden');
 await menu.locator('a').last().focus();await page.keyboard.press('Tab');
 expect(await menu.evaluate(element=>element.contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Escape');await expect(menu).toHaveCount(0);await expect(opener).toBeFocused();
 await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');
});
test('resizing an open mobile menu releases scrolling',async({page},info)=>{
 test.skip(info.project.name!=='mobile','Mobile menu');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.setViewportSize({width:1440,height:900});
 await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');
 await expect(page.locator('header nav').getByRole('link',{name:'Services',exact:true})).toBeVisible();
});
test('language selection preserves page, query and anchor',async({page})=>{
 await page.goto('en/servicii/?source=test#evaluare');
 await page.getByRole('button',{name:'Change language',exact:true}).click();await page.getByRole('menuitem',{name:'Română',exact:true}).click();
 await expect(page).toHaveURL(/\/ro\/servicii\/\?source=test#evaluare$/);
 await expect(page.locator('html')).toHaveAttribute('lang','ro');await expect(page.locator('#evaluare')).toBeInViewport();
});
test('homepage support links lead to the intended service section',async({page})=>{
 await page.locator('a[href$="/servicii#consiliere-parentala"]').click();
 await expect(page.locator('#consiliere-parentala')).toBeInViewport();
 await page.locator('#consiliere-parentala a').click();
 await expect(page).toHaveURL(/\/en\/contact\?service=consiliere-parentala$/);
 await expect(page.locator('#category')).toContainText('Support for parents');
 await expect(page.getByText('Selected form of support:',{exact:false})).toContainText('Parent counselling');
});
test('contact draft survives language changes without browser persistence',async({page})=>{
 await page.goto('en/contact/?service=terapie');await page.locator('#name').fill("Ștefania D'Angelo");
 await page.locator('#email').fill('reader@example.invalid');await page.locator('#message').fill('Draft with accents: ș ț î & ?');
 await page.getByRole('button',{name:'Change language',exact:true}).click();await page.getByRole('menuitem',{name:'Italiano',exact:true}).click();
 await expect(page.locator('#name')).toHaveValue("Ștefania D'Angelo");await expect(page.locator('#message')).toHaveValue('Draft with accents: ș ț î & ?');
 const stores=await page.evaluate(()=>JSON.stringify(localStorage)+JSON.stringify(sessionStorage));
 expect(stores).not.toContain('reader@example.invalid');expect(stores).not.toContain('Draft with accents');
 await expect(page.locator('main form input[name="phone"]')).toHaveCount(0);
 await expect(page.locator('main form input[name="childAge"]')).toHaveCount(0);
});
test('missing configuration offers direct email without false success or email-app launch',async({page})=>{
 test.skip(JSON.parse(readFileSync('dist/build-info.json','utf8')).contactConfigured,'Production provider is configured; failure states run in the isolated suite.');
 await page.goto('en/contact/');
 await expect(page.getByRole('status')).toContainText('The form is currently unavailable');
 await expect(page.locator('form button[type=submit]')).toBeDisabled();
 await expect(page.locator('main a[href="mailto:psiholog.mariavaleriabaciu@gmail.com"]').first()).toBeVisible();
 await expect(page.locator('form')).not.toContainText('Your inquiry has been submitted');
});
test('reading the privacy notice and returning preserves the in-memory inquiry',async({page})=>{
 await page.goto('en/contact/');await page.locator('#name').fill('Reader');await page.locator('#message').fill('Unsure where to start.');
 await page.locator('form a[href$="/confidentialitate"]').click();await expect(page.locator('main h1')).toHaveText('Privacy policy (GDPR)');
 await page.goBack();await expect(page.locator('#message')).toHaveValue('Unsure where to start.');
 await page.reload();await expect(page.locator('#message')).toHaveValue('');
});
test('article search, empty state, clear and back-to-collection preserve filtering',async({page})=>{
 await page.goto('en/resurse/');const search=page.getByRole('searchbox',{name:'Search articles',exact:true});
 await search.fill('9834-nonexistent-topic');await expect(page.getByRole('heading',{name:'No articles found',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Reset filters',exact:true}).click();await expect(search).toHaveValue('');
 const title=(await page.locator('main h3').first().innerText()).trim();await search.fill(title);
 await page.locator('main h3 a').first().click();await expect(page.locator('main h1')).toHaveText(title);
 await page.getByRole('link',{name:'Back to articles',exact:true}).click();await expect(search).toHaveValue(title);
 await expect(page.getByRole('status')).toContainText('1 article');
});
test('Back restores the reading position rather than scrolling to the top',async({page})=>{
 await page.goto('en/resurse/');await page.locator('main h3 a').last().scrollIntoViewIfNeeded();
 const before=await page.evaluate(()=>scrollY);await page.locator('main h3 a').last().click();await page.goBack();
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(Math.max(0,before-100));
});
test('selected courses are labelled accurately and no launch testimonials or fees appear',async({page})=>{
 await page.goto('en/despre/');const disclosure=page.locator('details');await disclosure.locator('summary').click();
 await expect(disclosure.locator('li')).toHaveCount(8);await expect(disclosure).toContainText('2025');
 await expect(page.locator('main')).not.toContainText(/Testimonials|All courses|RON/);
 await page.goto('en/');await expect(page.locator('main form')).toHaveCount(0);await expect(page.locator('[aria-roledescription="carousel"]')).toHaveCount(0);
});
for(const language of ['ro','en','it','es'])test('hero actions fit the first mobile viewport: '+language,async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(language+'/');
 const actions=page.locator('.hero-text a');await expect(actions).toHaveCount(2);
 for(const link of await actions.all()){
  const rect=await link.boundingBox();expect(rect!.y+rect!.height).toBeLessThanOrEqual(844);
 }
});
