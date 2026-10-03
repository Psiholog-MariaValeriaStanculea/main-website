import { readFileSync } from 'node:fs';
import { captureQa } from './qa';
import { execFileSync } from 'node:child_process';
import { test, expect } from './fixtures';
const manifest=JSON.parse(readFileSync('dist/route-manifest.json','utf8')) as {url:string;path:string;language:string;indexable:boolean}[];
const urls=manifest.map(item=>new URL(item.url));
const languages=['ro','en','it','es'];
const basePath=urls[0].pathname.replace(/(?:ro|en|it|es)(?:\/.*)?$/,'');
test('live verifier accepts the production artifact',async({baseURL})=>{
 expect(execFileSync(process.execPath,['scripts/check-pages.mjs','--url',baseURL!],{encoding:'utf8'})).toContain('Pages HTTP checks passed');
});
test('sitemap matches all indexable manifest pages',()=>{
 const sitemap=[...readFileSync('dist/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(item=>item[1]);
 expect(sitemap.sort()).toEqual(manifest.filter(page=>page.indexable).map(page=>page.url).sort());
 expect(manifest).toHaveLength(60);
});
for(const item of manifest){
 const url=new URL(item.url);const route=url.pathname.slice(basePath.length);
 test('direct load and reload: '+route,async({page})=>{
  expect((await page.goto(route))?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
  await expect(page.locator('main h1')).toHaveCount(1);await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang',item.language);
  await expect(page.locator('head title')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',item.url);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(item.indexable?5:0);
  const width=await page.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
  expect(width.content,'No horizontal page scrolling').toBeLessThanOrEqual(width.viewport+1);
  expect(await page.locator('a[href]').evaluateAll((links,base)=>links.map(link=>link.getAttribute('href')).filter(href=>href?.startsWith('/')&&!href.startsWith(base)),basePath)).toEqual([]);
  expect((await page.reload())?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
  for(const image of await page.locator('img').all()){
   if(await image.isVisible())await image.scrollIntoViewIfNeeded();
   await expect.poll(()=>image.evaluate(element=>(element as HTMLImageElement).complete&&(element as HTMLImageElement).naturalWidth>0)).toBe(true);
  }
 });
}
test('root and legacy hash bookmarks reach the intended page',async({page,baseURL})=>{
 await page.goto(baseURL!);await expect(page).toHaveURL(new RegExp(basePath+'ro/?$'));
 await page.goto(baseURL+'#/en/blog/1');await expect(page).toHaveURL(/\/en\/blog\/1$/);await expect(page.locator('html')).toHaveAttribute('lang','en');
});
test('unknown page keeps HTTP 404 and offers localized recovery',async({page})=>{
 expect((await page.goto('en/does-not-exist/'))?.status()).toBe(404);
 await expect(page.getByRole('heading',{name:'Page not found',exact:true})).toBeVisible();
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);
 await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
 await page.getByRole('link',{name:'Back to the homepage',exact:true}).click();
 await expect(page.locator('main h1')).toBeVisible();
});
test.describe('without JavaScript',()=>{
 test.use({javaScriptEnabled:false});
 test('static 404 provides all four languages and working recovery links',async({page},info)=>{
  for(const requested of languages){
   expect((await page.goto(requested+'/does-not-exist/'))?.status()).toBe(404);
   await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);
   await expect(page.locator('.enhanced-error-content')).toBeHidden();
   await expect(page.locator('main h1:visible')).toHaveText('404');
   await expect(page.locator('header button:visible')).toHaveCount(0);
   await expect(page.locator('.static-error-language')).toHaveCount(4);
   for(const language of languages){
    const c=JSON.parse(readFileSync('src/locales/'+language+'/editorial.json','utf8'));
    const card=page.locator('.static-error-language[lang="'+language+'"]');
    await expect(card.getByRole('heading',{name:c.ui.notFound,exact:true})).toBeVisible();
    for(const [name,suffix] of [[c.ui.backHome,''],[c.nav.services,'servicii/'],[c.nav.contact,'contact/']]){
     await expect(card.getByRole('link',{name,exact:true})).toHaveAttribute('href',basePath+language+'/'+suffix);
    }
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  }
  await captureQa(page,info,'404-no-js-'+info.project.name+'.png');
  await page.locator('.static-error-language[lang="en"] a').first().click();
  await expect(page).toHaveURL(/\/en\/$/);await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('main h1')).toBeVisible();
 });
 for(const language of languages)test(language+' content, FAQ, contact and language links remain usable',async({page})=>{
  for(const suffix of ['', '/blog/1','/intrebari-frecvente','/contact']){
   expect((await page.goto(language+suffix+'/'))?.status()).toBe(200);
   await expect(page.locator('main h1')).toBeVisible();await expect(page.locator('main')).toContainText(/\S.{100}/);
   if(suffix==='/intrebari-frecvente'){
    await expect(page.locator('.accordion-content-persistent').first()).toBeVisible();
    await expect(page.locator('.accordion-content-persistent').first()).toContainText(/\S.{40}/);
   }
   if(suffix==='/contact')await expect(page.locator('main a[href="mailto:psiholog.mariavaleriabaciu@gmail.com"]').first()).toBeVisible();
  }
  await page.goto(language+'/servicii/#evaluare');
  await page.locator('header').getByRole('link',{name:'English',exact:true}).click();
  await expect(page).toHaveURL(/\/en\/servicii\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await page.locator('main a[href$="#evaluare"]').click();
  await expect(page.locator('#evaluare')).toBeInViewport();
 });
});
