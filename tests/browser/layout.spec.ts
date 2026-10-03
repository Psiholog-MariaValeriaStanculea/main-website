import { mkdirSync } from 'node:fs';
import { test, expect } from './fixtures';
test('responsive reading and controls at all review widths',async({page},info)=>{
 test.skip(info.project.name!=='desktop','One viewport matrix suffices');
 for(const width of [320,390,768,1280,1440])for(const suffix of ['', '/despre','/servicii','/resurse','/blog/1','/contact','/intrebari-frecvente']){
  await page.setViewportSize({width,height:900});await page.goto('ro'+suffix+'/');
  await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(element=>element.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(element=>({tag:element.tagName,classes:element.className,text:element.textContent?.slice(0,50),right:element.getBoundingClientRect().right})));
  expect(await page.evaluate(()=>document.documentElement.scrollWidth),JSON.stringify(overflow)).toBeLessThanOrEqual(width+1);
  await expect(page.locator('main h1')).toBeVisible();
  if((width===1440 && ['', '/despre','/servicii','/resurse','/contact','/intrebari-frecvente'].includes(suffix)) || (width===390 && ['', '/contact','/despre','/servicii','/intrebari-frecvente'].includes(suffix))){
   mkdirSync('docs/qa',{recursive:true});await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({path:'docs/qa/ro-'+(suffix.slice(1)||'home')+'-'+width+'.png',fullPage:true});
  }
 }
});
for(const language of ['ro','en','it','es'])test('enlarged translated text reflows on phone and desktop: '+language,async({page},info)=>{
 test.skip(info.project.name!=='desktop','One text matrix suffices');
 for(const width of [320,1280])for(const suffix of ['/contact/','/intrebari-frecvente/']){
  await page.setViewportSize({width,height:900});await page.goto(language+suffix);
  if(suffix==='/intrebari-frecvente/'){
   await expect(page.locator('main button[aria-controls]').first()).toHaveAttribute('aria-expanded','false');
   for(const trigger of await page.locator('main button[aria-controls]').all()){await trigger.click();await expect(trigger).toHaveAttribute('aria-expanded','true');}
  }
  await page.addStyleTag({content:'html{font-size:200%}p{line-height:1.5!important;margin-bottom:2em!important}*{letter-spacing:.12em!important;word-spacing:.16em!important}'});
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(element=>element.getBoundingClientRect().right>innerWidth+1).slice(0,8).map(element=>({tag:element.tagName,classes:element.className,text:element.textContent?.slice(0,50),right:element.getBoundingClientRect().right})));
  expect(await page.evaluate(()=>document.documentElement.scrollWidth),JSON.stringify(overflow)).toBeLessThanOrEqual(width+1);
  if(suffix==='/contact/'){await page.locator('#message').scrollIntoViewIfNeeded();await expect(page.locator('#message')).toBeVisible();}
  else {const lastAnswer=page.locator('main .accordion-content-persistent').last();await lastAnswer.scrollIntoViewIfNeeded();await expect(lastAnswer).toBeVisible();}
 }
});
test('keyboard skip, language and FAQ controls work without a pointer',async({page})=>{
 await page.goto('en/');await page.keyboard.press('Tab');
 await expect(page.getByRole('link',{name:'Skip to content',exact:true})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused();
 await page.getByRole('button',{name:'Change language',exact:true}).focus();await page.keyboard.press('Enter');
 await page.keyboard.press('ArrowDown');await page.keyboard.press('Escape');
 await expect(page.getByRole('button',{name:'Change language',exact:true})).toBeFocused();
 await page.goto('en/intrebari-frecvente/');const trigger=page.locator('main button[aria-controls]').first();
 await trigger.focus();await page.keyboard.press('Enter');await expect(trigger).toHaveAttribute('aria-expanded','true');
});
