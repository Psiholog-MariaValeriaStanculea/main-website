import { test, expect } from '../browser/fixtures';

test('landscape cutouts and home indicator leave controls in the safe area',async({page,context})=>{
 await page.setViewportSize({width:844,height:390});
 const cdp=await context.newCDPSession(page);
 await cdp.send('Emulation.setSafeAreaInsetsOverride',{insets:{top:0,left:44,right:44,bottom:21}});
 await page.goto('en/');await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await expect(page.locator('meta[name=viewport]')).toHaveAttribute('content',/viewport-fit=cover/);
 const box=await page.locator('.header-top-row').boundingBox();
 await expect(page.locator('.header-top-row')).toHaveCSS('padding-left','44px');
 await expect(page.locator('.header-top-row')).toHaveCSS('padding-right','44px');
 expect(box!.width).toBe(844);
 await page.getByRole('button',{name:'Open menu',exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toHaveCSS('padding-bottom','21px');
 await dialog.locator('.mobile-menu-body').evaluate(e=>e.scrollTop=e.scrollHeight);
 const close=await dialog.getByRole('button',{name:'Close menu',exact:true}).boundingBox();
 expect(close!.x+close!.width).toBeLessThanOrEqual(800);
 await page.setViewportSize({width:844,height:240});
 expect((await dialog.boundingBox())!.height).toBe(240);
 await expect(dialog.getByRole('button',{name:'Close menu',exact:true})).toBeInViewport();
 await dialog.getByRole('button',{name:'Close menu',exact:true}).click();
});

test('fold, unfold, rotate and grow to desktop preserve the inquiry draft and release menu lock',async({page})=>{
 await page.goto('en/contact/');await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await page.locator('#name').fill('Unsent local draft');await page.locator('#message').fill('Preserve across viewport changes');
 for(const [width,height] of [[280,653],[717,512],[844,390],[1024,768]]){
  await page.setViewportSize({width,height});
  await expect(page.locator('#name')).toHaveValue('Unsent local draft');await expect(page.locator('#message')).toHaveValue('Preserve across viewport changes');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
 }
 await page.evaluate(()=>scrollTo(0,0));await page.getByRole('button',{name:'Open menu',exact:true}).click();
 await expect(page.getByRole('dialog')).toBeVisible();await page.setViewportSize({width:1280,height:900});
 await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');
 await expect(page.locator('#name')).toHaveValue('Unsent local draft');
 await expect(page.locator('.site-header .enhanced-navigation')).toBeVisible();
});

test('200 percent text and increased spacing reflow in the complete primary journey',async({page})=>{
 for(const language of ['ro','en','it','es'])for(const route of ['','despre/','servicii/','resurse/'])for(const width of [320,1280]){
  await page.setViewportSize({width,height:900});await page.goto(language+'/'+route);
  await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');await page.evaluate(()=>document.fonts.ready);
  await page.addStyleTag({content:'html{font-size:200%}p{line-height:1.5!important;margin-bottom:2em!important}*{letter-spacing:.12em!important;word-spacing:.16em!important}'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth),language+'/'+route+' at '+width).toBeLessThanOrEqual(width+1);
  await expect.poll(()=>page.evaluate(()=>[...document.querySelectorAll('main h1,main h2,main h3,main p,main .editorial-button')].filter(e=>{const r=e.getBoundingClientRect();return getComputedStyle(e).visibility!=='hidden'&&r.width>0&&(r.left<-.5||r.right>document.documentElement.clientWidth+1);}).map(e=>e.textContent?.slice(0,50))),'Reading text must also fit inside panels that hide decorations').toEqual([]);
  await expect(page.locator('main h1')).toBeVisible();
 }
});
