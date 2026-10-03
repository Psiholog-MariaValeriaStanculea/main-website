import { mkdirSync, readFileSync } from 'node:fs';
import { test, expect } from './fixtures';

const originalText=JSON.parse(readFileSync('docs/qa/about-services-text-before.json','utf8')) as Record<string,string[]>;
for(const language of ['ro','en','it','es'])for(const route of ['despre','servicii']){
 test('polished reading preserves text and reflows in both themes: '+language+'/'+route,async({page},info)=>{
  test.skip(info.project.name!=='desktop','One explicit phone/desktop matrix suffices');
  for(const colorScheme of ['light','dark'] as const)for(const width of [320,1440]){
   await page.emulateMedia({colorScheme});await page.setViewportSize({width,height:900});
   await page.goto(language+'/'+route+'/');await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
   const text=await page.locator('main').evaluate(main=>{
    const walker=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);const parts:string[]=[];
    for(let node=walker.nextNode();node;node=walker.nextNode()){const value=node.textContent?.trim();if(value)parts.push(value);}
    return parts;
   });
   expect(text).toEqual(originalText[language+'/'+route]);
   await expect(page.locator('html')).toHaveClass(new RegExp(colorScheme));
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
   if(language==='ro'){
    mkdirSync('docs/qa',{recursive:true});await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:'docs/qa/ro-'+route+'-'+colorScheme+'-'+width+'.png',fullPage:true});
   }
   // Every indexed section remains reachable through its original fragment.
   const sectionLinks=page.locator('main nav a[href*="#"]');
   await expect(sectionLinks).toHaveCount(route==='despre'?6:7);
   for(const link of await sectionLinks.all()){
    const href=await link.getAttribute('href');const fragment=href!.slice(href!.indexOf('#'));await link.click();
    await expect(page.locator(fragment)).toBeInViewport();
    await expect(page.locator(fragment).locator('h2,h3').first()).toBeFocused();
   }
   await page.goto(language+'/'+route+'/');
   await page.addStyleTag({content:'html{font-size:200%}p{line-height:1.5!important;margin-bottom:2em!important}*{letter-spacing:.12em!important;word-spacing:.16em!important}'});
   const overflow=await page.locator('main *').evaluateAll(elements=>elements.filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,class:el.className,right:el.getBoundingClientRect().right,text:el.textContent?.slice(0,60)})));
   expect(await page.evaluate(()=>document.documentElement.scrollWidth),JSON.stringify(overflow)).toBeLessThanOrEqual(width+1);
   await page.locator('main').getByRole('link').last().scrollIntoViewIfNeeded();
   await expect(page.locator('main').getByRole('link').last()).toBeVisible();
  }
 });
}
