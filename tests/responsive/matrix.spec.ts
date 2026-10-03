import type { Page } from '@playwright/test';
import { test, expect } from '../browser/fixtures';

async function ready(page:Page,route:string,theme:string){
 if(page.url()==='about:blank')await page.goto('ro/');
 await page.evaluate(value=>localStorage.setItem('lovable-ui-theme',value),theme);
 await page.goto(route);await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('html')).toHaveClass(new RegExp(theme));
}
async function readingFits(page:Page){
 const result=await page.evaluate(()=>{
  const width=document.documentElement.clientWidth;
  const controls=[...document.querySelectorAll<HTMLElement>('main .editorial-button, .site-header .utility-button')];
  return {width,scroll:document.documentElement.scrollWidth,clipped:controls.filter(e=>{
   const r=e.getBoundingClientRect();return r.width>0&&(r.left<-.5||r.right>width+1||e.scrollWidth>e.clientWidth+2);
  }).map(e=>e.textContent),container:document.querySelector('.site-container')!.getBoundingClientRect().width};
 });
 expect(result.scroll,JSON.stringify(result)).toBeLessThanOrEqual(result.width+1);
 expect(result.clipped).toEqual([]);
 expect(result.container).toBeLessThanOrEqual(1216);
 await expect(page.locator('main h1')).toBeVisible();
 await expect(page.locator('.site-footer')).toBeAttached();
}

test('all primary and legal reading layouts in both themes',async({page})=>{
 for(const theme of ['light','dark'])for(const route of ['', 'despre/','servicii/','resurse/','blog/1/','contact/','intrebari-frecvente/','confidentialitate/','cookie-uri/']){
  await ready(page,'ro/'+route,theme);await readingFits(page);
 }
 if(page.viewportSize()!.width<=359){
  const lines=await page.locator('.header-brand .brand-copy>span>span').evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);return r.getClientRects().length;});
  expect(lines,'The surname remains one word in the compact header').toBe(1);
 }
});

test('translated services, FAQ and inquiry reflow in both themes',async({page})=>{
 for(const theme of ['light','dark'])for(const language of ['en','it','es'])for(const route of ['', 'servicii/','intrebari-frecvente/','contact/']){
  await ready(page,language+'/'+route,theme);await readingFits(page);
  if(route==='contact/'){
   expect(await page.locator('#email').evaluate(e=>parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);
   if(page.viewportSize()!.height<700)await expect(page.locator('.contact-direct')).toHaveCSS('position','static');
  }
 }
});

test('menus, touch targets and form remain reachable on short and wide screens',async({page})=>{
 await ready(page,'en/contact/','light');
 await page.locator('#name').fill('Local responsive test');await page.locator('#email').fill('test@example.invalid');
 await page.locator('#message').fill('Unsent local draft');await expect(page.locator('#message')).toBeFocused();
 await page.locator('#category').click();await expect(page.getByRole('listbox')).toBeVisible();
 await page.keyboard.press('End');await page.keyboard.press('Enter');await expect(page.getByRole('listbox')).toHaveCount(0);
 await ready(page,'en/','light');
 const language=page.getByRole('button',{name:'Change language',exact:true});
 expect((await language.boundingBox())!.height).toBeGreaterThanOrEqual(44);
 await language.click();await expect(page.getByRole('menu')).toBeFocused();
 await page.keyboard.press('ArrowDown');await expect(page.getByRole('menuitem').first()).toBeFocused();
 await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await expect(language).toBeFocused();
 const menu=page.getByRole('button',{name:'Open menu',exact:true});
 const mobile=await menu.isVisible();
 if(mobile){
  await menu.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
  await dialog.locator('.mobile-menu-body').evaluate(e=>e.scrollTop=e.scrollHeight);
  await expect(dialog.getByRole('button',{name:'Close menu',exact:true})).toBeInViewport();
  await expect(dialog.getByRole('link',{name:'psiholog.mariavaleriabaciu@gmail.com',exact:true})).toBeInViewport();
 }
 const appearance=page.getByRole('button',{name:'Appearance',exact:true});await appearance.click();
 await page.getByRole('menuitemradio',{name:'Dark',exact:true}).click();await expect(page.locator('html')).toHaveClass(/dark/);
 if(mobile){await page.getByRole('button',{name:'Close menu',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);}
 await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');
 await readingFits(page);
});
