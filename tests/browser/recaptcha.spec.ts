import { readFileSync } from 'node:fs';
import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';
const endpoint='https://api.emailjs.com/api/v1.0/email/send';
const api='https://www.google.com/recaptcha/api.js*';
const copy=(language:string)=>JSON.parse(readFileSync('src/locales/'+language+'/editorial.json','utf8')).contact;
// Mocked callbacks test integration; these tokens never reach Google or EmailJS.
const manualCaptcha=`const usedHosts=new WeakSet();window.grecaptcha={render(element,options){
 if(usedHosts.has(element))throw new Error('reCAPTCHA has already been rendered in this element');usedHosts.add(element);
 window.mockCaptchaOptions=options;
 for(const [label,action] of [['Solve test verification',()=>options.callback('test-single-use-token')],['Expire test verification',()=>options['expired-callback']()],['Fail test verification',()=>options['error-callback']()]]){
  const button=document.createElement('button');button.type='button';button.textContent=label;button.onclick=action;element.append(button);
 }return 1;},reset(){}};window.siteRecaptchaReady();`;
async function setup(page:Page,language='en'){
 await page.route(api,route=>route.fulfill({contentType:'application/javascript',body:manualCaptcha}));
 await page.goto(language+'/contact/');
 await page.locator('#name').fill('Technical verification');await page.locator('#email').fill('test@example.invalid');
 await page.locator('#privacy-agreed').check();
}
for(const language of ['ro','en','it','es'])test('CAPTCHA loads automatically on Contact, expires, and supplies a token: '+language,async({page})=>{
 let googleRequests=0;let sent=0;let payload:Record<string,unknown>|undefined;
 page.on('request',request=>{if(request.url().startsWith('https://www.google.com/recaptcha/'))googleRequests++;});
 await page.route(endpoint,route=>{sent++;payload=route.request().postDataJSON();return route.fulfill({status:200,body:'OK'});});
 await page.goto(language+'/');expect(googleRequests).toBe(0);
 await setup(page,language);await expect(page.getByRole('button',{name:'Solve test verification'})).toBeVisible();expect(googleRequests).toBe(1);
 await expect(page.getByTestId('captcha-load')).toHaveCount(0);
 await page.locator('form button[type=submit]').click();await expect(page.getByRole('alert')).toContainText(copy(language).captchaRequired);await expect(page.locator('#captcha-verification')).toBeFocused();expect(sent).toBe(0);
 await page.getByRole('button',{name:'Solve test verification'}).click();
 await page.getByRole('button',{name:'Expire test verification'}).click();
 await page.locator('form button[type=submit]').click();expect(sent).toBe(0);
 await page.getByRole('button',{name:'Solve test verification'}).click();await page.locator('form button[type=submit]').click();
 await expect(page.getByRole('status')).toContainText(copy(language).success);expect(sent).toBe(1);
 expect(payload?.template_params).toMatchObject({'g-recaptcha-response':'test-single-use-token',language});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('rejection consumes the token and retry needs a fresh verification',async({page})=>{
 let sent=0;await page.route(endpoint,route=>{sent++;return route.fulfill({status:sent===1?403:200,body:sent===1?'Invalid CAPTCHA':'OK'});});
 await setup(page);await page.getByRole('button',{name:'Solve test verification'}).click();
 await page.locator('form button[type=submit]').click();await expect(page.getByRole('status')).toContainText(copy('en').rejected);
 await page.locator('form button[type=submit]').click();expect(sent).toBe(1);await expect(page.getByRole('alert')).toContainText(copy('en').captchaRequired);
 await page.getByRole('button',{name:'Solve test verification'}).click();await page.locator('form button[type=submit]').click();await expect(page.getByRole('status')).toContainText(copy('en').success);expect(sent).toBe(2);
});
test('Google failure preserves the draft and offers direct email and explicit retry',async({page})=>{
 let sent=0;await page.route(endpoint,route=>{sent++;return route.abort();});
 await page.route(api,route=>route.abort('failed'));
 await page.goto('en/contact/');await page.locator('#name').fill('Technical verification');await page.locator('#email').fill('test@example.invalid');
 await expect(page.getByRole('alert')).toContainText(copy('en').captchaFailed);
 await expect(page.locator('#email')).toHaveValue('test@example.invalid');await expect(page.locator('main a[href^="mailto:"]')).toBeVisible();
 await page.locator('form button[type=submit]').click();expect(sent).toBe(0);
 await page.route(api,route=>route.fulfill({contentType:'application/javascript',body:manualCaptcha}));await page.getByTestId('captcha-retry').click();
 await expect(page.getByRole('button',{name:'Solve test verification'})).toBeVisible();
});
test('navigation discards a solved token without storing it in the browser',async({page})=>{
 let sent=0;await page.route(endpoint,route=>{sent++;return route.fulfill({status:200,body:'OK'});});
 await setup(page);await page.getByRole('button',{name:'Solve test verification'}).click();
 expect(await page.evaluate(()=>JSON.stringify(localStorage)+JSON.stringify(sessionStorage))).not.toContain('test-single-use-token');
 await page.locator('form a[href$="/confidentialitate"]').click();await expect(page.locator('main h1')).toHaveText('Privacy policy (GDPR)');await page.goBack();
 await page.locator('form button[type=submit]').click();expect(sent).toBe(0);await expect(page.getByRole('alert')).toContainText(copy('en').captchaRequired);
});
test('CAPTCHA token is also required when browser storage is blocked',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
 let payload:Record<string,unknown>|undefined;await page.route(endpoint,route=>{payload=route.request().postDataJSON();return route.fulfill({status:200,body:'OK'});});
 await setup(page);await page.getByRole('button',{name:'Solve test verification'}).click();await page.locator('form button[type=submit]').click();
 await expect(page.getByRole('status')).toContainText(copy('en').success);expect(payload?.template_params).toHaveProperty('g-recaptcha-response','test-single-use-token');
});

test('loading feedback remains visible until Google responds',async({page})=>{
 let releaseScript:()=>void=()=>{};const gate=new Promise<void>(resolve=>{releaseScript=resolve;});
 await page.route(api,async route=>{await gate;await route.fulfill({contentType:'application/javascript',body:manualCaptcha});});
 await page.goto('en/contact/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#captcha-feedback')).toHaveText(copy('en').captchaLoading);
 await expect(page.locator('.captcha-widget')).toHaveAttribute('aria-busy','true');
 await expect(page.getByTestId('captcha-load')).toHaveCount(0);
 releaseScript();await expect(page.getByRole('button',{name:'Solve test verification'})).toBeVisible();
 await expect(page.locator('.captcha-widget')).toHaveAttribute('aria-busy','false');
});

test('widget switches to compact at 320px and clears a solved token on resize',async({page})=>{
 let sent=0;await page.route(endpoint,route=>{sent++;return route.fulfill({status:200,body:'OK'});});
 await page.setViewportSize({width:1280,height:900});await setup(page);
 await expect(page.locator('.captcha-widget')).toHaveAttribute('data-size','normal');
 await page.getByRole('button',{name:'Solve test verification'}).click();
 await page.setViewportSize({width:320,height:740});
 await expect(page.locator('.captcha-widget')).toHaveAttribute('data-size','compact');
 await expect(page.getByRole('button',{name:'Solve test verification'})).toBeVisible();
 await page.locator('form button[type=submit]').click();expect(sent).toBe(0);
 await expect(page.getByRole('alert')).toContainText(copy('en').captchaRequired);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.setViewportSize({width:1280,height:900});
 await expect(page.locator('.captcha-widget')).toHaveAttribute('data-size','normal');
 await expect(page.getByRole('button',{name:'Solve test verification'})).toBeVisible();
});

for(const language of ['ro','en','it','es'])test('folded Contact fits while verification loads, fails and resizes: '+language,async({page})=>{
 let releaseScript:()=>void=()=>{};
 const gate=new Promise<void>(resolve=>{releaseScript=resolve;});
 // Match Google's fixed widget dimensions without sending requests to Google.
 const sizedCaptcha=`window.grecaptcha={render(element,options){
  window.mockCaptchaOptions=options;
  const frame=document.createElement('iframe');frame.title='Test verification';
  frame.width=options.size==='normal'?'304':'164';frame.height=options.size==='normal'?'78':'144';
  element.append(frame);return 1;},reset(){}};window.siteRecaptchaReady();`;
 await page.route(api,async route=>{await gate;await route.fulfill({contentType:'application/javascript',body:sizedCaptcha});});
 const fits=async()=>{
  const width=page.viewportSize()!.width;
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth),'Contact must fit the viewport').toBeLessThanOrEqual(width+1);
  const clipped=await page.locator('.inquiry-submit-panel').evaluate(panel=>[...panel.querySelectorAll('h3,p,button,input,iframe')].filter(element=>{
   const box=element.getBoundingClientRect();const bounds=panel.getBoundingClientRect();
   return box.width>0&&(box.left<bounds.left||box.right>bounds.right);
  }).map(element=>element.tagName+': '+element.textContent));
  expect(clipped,'Verification and submission controls must fit inside their panel').toEqual([]);
 };
 await page.setViewportSize({width:280,height:653});
 await page.goto(language+'/contact/',{waitUntil:'domcontentloaded'});
 try{
  await expect(page.locator('#captcha-feedback')).toHaveText(copy(language).captchaLoading);
  await page.locator('#name').fill('Unsent folded draft');
  await page.locator('#message').fill('Preserve verification draft on resize');
  await fits();
 }finally{releaseScript();}
 await expect(page.locator('#captcha-verification')).toHaveAttribute('data-state','ready');
 await expect(page.locator('.captcha-widget')).toHaveAttribute('data-size','compact');await fits();
 await page.evaluate(()=>{(window as unknown as {mockCaptchaOptions:{'error-callback':()=>void}}).mockCaptchaOptions['error-callback']();});
 await expect(page.getByTestId('captcha-retry')).toBeVisible();await fits();
 await page.getByTestId('captcha-retry').click();
 await expect(page.locator('#captcha-verification')).toHaveAttribute('data-state','ready');
 for(const width of [1280,280,717,320]){
  await page.setViewportSize({width,height:900});
  const normal=width>=717;
  await expect(page.locator('.captcha-widget')).toHaveAttribute('data-size',normal?'normal':'compact');
  await expect(page.locator('.captcha-widget iframe')).toHaveAttribute('width',normal?'304':'164');
  await fits();
  await expect(page.locator('#name')).toHaveValue('Unsent folded draft');
  await expect(page.locator('#message')).toHaveValue('Preserve verification draft on resize');
 }
});

