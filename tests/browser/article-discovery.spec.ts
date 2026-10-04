import { readFileSync } from 'node:fs';
import { test, expect } from './fixtures';
import { captureQa } from './qa';

type ArticleRoute = { path:string; language:string; articleId?:string; indexable:boolean; redirectTo?:string; url:string; lastModified?:string };
const manifest:ArticleRoute[]=JSON.parse(readFileSync('dist/route-manifest.json','utf8'));
const articles=manifest.filter(page=>page.articleId&&page.indexable);
const names:Record<string,string>={ro:'Română',en:'English',it:'Italiano',es:'Español'};

test('article language switching preserves topic, query and fragment',async({page},info)=>{
 const translations=articles.filter(article=>article.articleId==='5');
 await page.goto(translations[0].path.slice(1)+'/?source=bookmark#article-sources');
 await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 for(const article of translations.slice(1)){
  await expect(page.getByRole('menu')).toHaveCount(0);
  await page.locator('header button[aria-haspopup="menu"]').first().focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toBeVisible();
  await page.getByRole('menuitem',{name:names[article.language],exact:true}).click();
  await expect(page).toHaveURL(new RegExp(article.path+'\\/?\\?source=bookmark#article-sources$'));
  await expect(page.locator('html')).toHaveAttribute('lang',article.language);
  await expect(page.locator('#article-sources')).toBeVisible();
  await expect(page.getByRole('menu')).toHaveCount(0);
  // Navigation and dropdown dismissal both schedule focus work. Finish those
  // animation frames before opening the next menu; no fixed delay is needed.
  await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
 }
 await expect(page.locator('[data-radix-popper-content-wrapper]')).toHaveCount(0);
 await page.screenshot({path:info.outputPath('article-sources-'+info.project.name+'-2026-10-04.png'),fullPage:false});
});

test.describe('existing bookmarks without JavaScript',()=>{
 test.use({javaScriptEnabled:false});
 for(const language of ['ro','en','it','es'])test(language+' numeric bookmarks reach all six canonical articles',async({page},info)=>{
  for(const article of articles.filter(article=>article.language===language)){
   const legacy=manifest.find(alias=>alias.language===language&&alias.articleId===article.articleId&&alias.redirectTo);
   await page.goto(legacy!.path.slice(1)+'/');
   await expect(page).toHaveURL(new RegExp(article.path+'/?$'));
   await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',article.url);
   await expect(page.locator('article time')).toHaveAttribute('datetime',article.lastModified!);
   await expect(page.locator('article a[lang="en"]')).not.toHaveCount(0);
   await expect(page.locator('main h1')).toBeVisible();
  }
  if(language==='ro')await captureQa(page,info,'article-discovery-'+info.project.name+'-2026-10-04.png');
 });
});
