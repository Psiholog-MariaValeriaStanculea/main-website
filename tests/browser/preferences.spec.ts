import type { Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { test, expect } from './fixtures';

test.use({launchOptions:{ignoreDefaultArgs:['--hide-scrollbars']}});

async function geometry(page:Page){
 return page.evaluate(()=>({
  width:document.documentElement.clientWidth,
  x:document.querySelector('main')!.getBoundingClientRect().x,
  scrollY,
  lock:document.body.getAttribute('data-scroll-locked'),
 }));
}
async function ready(page:Page){
 await page.goto('en/');await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>scrollTo(0,240));
}
async function clickVisible(page:Page,button:import('@playwright/test').Locator){
 // A physical click avoids Playwright scrolling a sticky control into scroll-padding.
 const rect=await button.boundingBox();expect(rect).not.toBeNull();
 await page.mouse.click(rect!.x+rect!.width/2,rect!.y+rect!.height/2);
}

test('language dropdown retains scrollbar, scroll position and keyboard recovery',async({page})=>{
 await ready(page);const before=await geometry(page);
 const opener=page.getByRole('button',{name:'Change language',exact:true});
 await opener.evaluate((element:HTMLButtonElement)=>element.focus({preventScroll:true}));await page.keyboard.press('Enter');
 await expect(page.getByRole('menu')).toBeVisible();expect(await geometry(page)).toEqual(before);
 await page.keyboard.press('ArrowDown');await page.keyboard.press('Escape');
 await expect(page.getByRole('menu')).toHaveCount(0);await expect(opener).toBeFocused();expect(await geometry(page)).toEqual(before);
 let language='en';
 for(const [next,name] of [['ro','Română'],['it','Italiano'],['es','Español'],['en','English']]){
  const copy=JSON.parse(readFileSync('src/locales/'+language+'/editorial.json','utf8'));
  await clickVisible(page,page.getByRole('button',{name:copy.ui.language,exact:true}));
  await page.getByRole('menuitem',{name,exact:true}).click();
  await expect(page.locator('html')).toHaveAttribute('lang',next);await expect(page.getByRole('menu')).toHaveCount(0);
  expect(await geometry(page)).toEqual(before);language=next;
 }
 await clickVisible(page,page.getByRole('button',{name:'Change language',exact:true}));
 await page.locator('.hero-copy').click({position:{x:10,y:20}});await expect(page.getByRole('menu')).toHaveCount(0);expect(await geometry(page)).toEqual(before);
});

test('theme dropdown retains page geometry, including inside the mobile dialog',async({page},info)=>{
 await ready(page);
 const initial=await geometry(page);
 if(info.project.name==='mobile')await clickVisible(page,page.getByRole('button',{name:'Open menu',exact:true}));
 const before=await geometry(page);
 const opener=page.getByRole('button',{name:'Appearance',exact:true});
 for(const value of ['Dark','Light','System']){
  await clickVisible(page,opener);await expect(page.getByRole('menu')).toBeVisible();expect(await geometry(page)).toEqual(before);
  await page.getByRole('menuitemradio',{name:value,exact:true}).click();
  await expect(page.getByRole('menu')).toHaveCount(0);await expect(opener).toBeFocused();expect(await geometry(page)).toEqual(before);
 }
 if(info.project.name==='mobile'){
  await expect(page.getByRole('dialog')).toBeVisible();await expect(page.locator('body')).toHaveCSS('overflow','hidden');
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');
  expect(await geometry(page)).toEqual(initial);
 }
});
