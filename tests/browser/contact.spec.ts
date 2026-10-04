import { readFileSync } from 'node:fs';
import { captureQa } from './qa';
import { test, expect } from './fixtures';
const copy=(language:string)=>JSON.parse(readFileSync('src/locales/'+language+'/editorial.json','utf8'));
const endpoint='https://api.emailjs.com/api/v1.0/email/send';
async function draft(page:import('@playwright/test').Page){
 await page.locator('#name').fill("Ștefania D'Angelo");
 await page.locator('#email').fill('reader@example.invalid');
 await page.locator('#message').fill('Please discuss options. No clinical details.');
 await page.locator('#privacy-agreed').check();
}
for(const language of ['ro','en','it','es'])test('localized validation, rejection, preserved draft and explicit retry: '+language,async({page},info)=>{
 const c=copy(language).contact;let requests=0;
 await page.route(endpoint,route=>{requests++;return route.fulfill({status:requests===1?403:200,body:requests===1?'Forbidden':'OK'});});
 await page.goto(language+'/contact/');await expect(page.locator('html')).toHaveAttribute('data-app-ready','true');
 await expect(page.locator('#category')).toContainText(c.categories.unsure);
 await page.locator('form button[type=submit]').click();
 await expect(page.locator('#name-error')).toHaveText(c.nameError);await expect(page.locator('#name')).toBeFocused();expect(requests).toBe(0);
 await expect(page.locator('#name')).toHaveAttribute('aria-invalid','true');
 const errorColor=await page.evaluate(()=>{
  const sample=document.createElement('span');sample.style.color='hsl('+getComputedStyle(document.documentElement).getPropertyValue('--destructive')+')';
  document.body.append(sample);const color=getComputedStyle(sample).color;sample.remove();return color;
 });
 await expect(page.locator('#name')).toHaveCSS('border-top-color',errorColor);
 await draft(page);await page.locator('form button[type=submit]').click();
 await expect(page.getByRole('status')).toContainText(c.rejected);
 await expect(page.locator('#message')).toHaveValue('Please discuss options. No clinical details.');
 await expect(page.locator('#name')).toHaveValue("Ștefania D'Angelo");expect(requests).toBe(1);
 if(language==='ro'){await page.evaluate(()=>scrollTo(0,0));await captureQa(page,info,'mocked-contact-rejected-'+info.project.name+'.png');}
 await page.locator('form button[type=submit]').click();await expect(page.getByRole('status')).toContainText(c.success);expect(requests).toBe(2);
 await expect(page.locator('#name')).toBeDisabled();
 if(language==='ro'){await page.evaluate(()=>scrollTo(0,0));await captureQa(page,info,'mocked-contact-accepted-'+info.project.name+'.png');}
 await page.getByRole('button',{name:c.newRequest,exact:true}).click();await expect(page.locator('#name')).toHaveValue('');
});
test('an optional message sends stable service context once and preserves the draft while sending',async({page})=>{
 let release!:()=>void;let payload:Record<string,unknown>|undefined;let requests=0;
 await page.route(endpoint,async route=>{requests++;payload=route.request().postDataJSON();await new Promise<void>(resolve=>{release=resolve;});await route.fulfill({status:200,body:'OK'});});
 await page.goto('en/contact/?service=consiliere-parentala');await draft(page);await page.locator('#message').fill('');
 await page.locator('form').evaluate((form:HTMLFormElement)=>{form.requestSubmit();form.requestSubmit();});
 await expect.poll(()=>requests).toBe(1);await expect(page.locator('form button[type=submit]')).toBeDisabled();
 await expect(page.locator('#name')).toBeDisabled();await expect(page.getByRole('status')).toContainText(copy('en').contact.sending);
 const data=payload?.template_params as Record<string,string>;
 expect(data).toMatchObject({language:'en',service:'consiliere-parentala',category:'parent',message:'',reply_to:'reader@example.invalid'});
 expect(data).not.toHaveProperty('to_email');
 release();await expect(page.getByRole('status')).toContainText(copy('en').contact.success);
});
test('uncertain delivery prevents retry while pending and accepts a late result',async({page})=>{
 let release!:()=>void;let requests=0;
 await page.route(endpoint,async route=>{requests++;await new Promise<void>(resolve=>{release=resolve;});await route.fulfill({status:200,body:'OK'});});
 await page.goto('en/contact/');await draft(page);await page.clock.install();
 await page.locator('form button[type=submit]').click();await expect.poll(()=>requests).toBe(1);
 await page.clock.fastForward(30001);await expect(page.getByRole('status')).toContainText(copy('en').contact.uncertain);
 await expect(page.locator('form button[type=submit]')).toBeDisabled();expect(requests).toBe(1);
 release();await expect(page.getByRole('status')).toContainText(copy('en').contact.success);
});
test('network failure retains the draft and does not claim acceptance or retry automatically',async({page})=>{
 let requests=0;await page.route(endpoint,route=>{requests++;return route.abort('failed');});
 await page.goto('en/contact/');await draft(page);await page.locator('form button[type=submit]').click();
 await expect(page.getByRole('status')).toContainText(copy('en').contact.uncertain);
 await expect(page.locator('#email')).toHaveValue('reader@example.invalid');expect(requests).toBe(1);
 await expect(page.locator('main a[href^="mailto:"]')).toBeVisible();
});
test('the configured form works with blocked browser storage without storing a draft',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
 await page.route(endpoint,route=>route.fulfill({status:200,body:'OK'}));
 await page.goto('en/contact/');await draft(page);await page.locator('form button[type=submit]').click();
 await expect(page.getByRole('status')).toContainText(copy('en').contact.success);
 expect(await page.evaluate(()=>sessionStorage.length)).toBe(0);
});

test('pending inquiry survives privacy navigation, Back and language change without a second send',async({page})=>{
 let release!:()=>void;let requests=0;let payload:Record<string,unknown>|undefined;
 await page.route(endpoint,async route=>{requests++;payload=route.request().postDataJSON();await new Promise<void>(resolve=>{release=resolve;});await route.fulfill({status:200,body:'OK'});});
 await page.goto('en/contact/?service=consiliere-parentala');await draft(page);await page.clock.install();
 await page.locator('form button[type=submit]').click();await expect.poll(()=>requests).toBe(1);
 await page.locator('form a[href$="/confidentialitate"]').click();await expect(page.locator('main h1')).toHaveText('Privacy policy (GDPR)');
 await page.goBack();await expect(page.locator('#message')).toHaveValue('Please discuss options. No clinical details.');
 await expect(page.locator('form button[type=submit]')).toBeDisabled();
 await page.locator('form').evaluate((form:HTMLFormElement)=>form.requestSubmit());
 await page.clock.fastForward(30001);await expect(page.getByRole('status')).toContainText(copy('en').contact.uncertain);
 await page.getByRole('button',{name:'Change language',exact:true}).click();await page.getByRole('menuitem',{name:'Italiano',exact:true}).click();
 await expect(page.getByRole('status')).toContainText(copy('it').contact.uncertain);
 await expect(page.locator('form button[type=submit]')).toBeDisabled();
 await page.locator('form').evaluate((form:HTMLFormElement)=>form.requestSubmit());expect(requests).toBe(1);
 expect(payload?.template_params).toMatchObject({language:'en',service:'consiliere-parentala',category:'parent'});
 release();await expect(page.getByRole('status')).toContainText(copy('it').contact.success);
 await expect(page.locator('#name')).toHaveValue('');
});

for(const accepted of [true,false])test('provider result while Contact is unmounted is retained: '+(accepted?'acceptance':'rejection'),async({page})=>{
 let release!:()=>void;let requests=0;
 await page.route(endpoint,async route=>{requests++;if(requests===1)await new Promise<void>(resolve=>{release=resolve;});await route.fulfill({status:accepted||requests>1?200:403,body:accepted||requests>1?'OK':'Forbidden'});});
 await page.goto('en/contact/');await draft(page);await page.locator('form button[type=submit]').click();await expect.poll(()=>requests).toBe(1);
 await page.locator('form a[href$="/confidentialitate"]').click();await expect(page.locator('main h1')).toHaveText('Privacy policy (GDPR)');
 const response=page.waitForResponse(endpoint);release();await response;
 await page.goBack();await expect(page.getByRole('status')).toContainText(accepted?copy('en').contact.success:copy('en').contact.rejected);
 await expect(page.locator('#name')).toHaveValue(accepted?'':"Ștefania D'Angelo");
 await expect(page.locator('#message')).toHaveValue(accepted?'':'Please discuss options. No clinical details.');
 expect(await page.evaluate(()=>JSON.stringify(localStorage)+JSON.stringify(sessionStorage))).not.toContain('reader@example.invalid');
 if(accepted){await page.getByRole('button',{name:copy('en').contact.newRequest,exact:true}).click();await expect(page.locator('#name')).toBeEnabled();}
 else{await draft(page);await page.locator('form button[type=submit]').click();await expect(page.getByRole('status')).toContainText(copy('en').contact.success);expect(requests).toBe(2);}
});


test('privacy agreement is explicit, preserves the draft on policy navigation, and resets after acceptance',async({page})=>{
 let requests=0;await page.route(endpoint,route=>{requests++;return route.fulfill({status:200,body:'OK'});});
 await page.goto('ro/contact/');await draft(page);await page.locator('#privacy-agreed').uncheck();
 await expect(page.locator('#privacy-agreed')).toHaveAccessibleName(copy('ro').contact.privacyAgree+' '+copy('ro').contact.privacyPolicy);
 await page.locator('form button[type=submit]').click();
 await expect(page.locator('#privacy-error')).toHaveText(copy('ro').contact.privacyAgreeError);
 await expect(page.locator('#privacy-agreed')).toBeFocused();expect(requests).toBe(0);
 await page.locator('form a[href$="/confidentialitate"]').click();await page.goBack();
 await expect(page.locator('#name')).toHaveValue("Ștefania D'Angelo");await expect(page.locator('#privacy-agreed')).not.toBeChecked();
 await page.locator('#privacy-agreed').check();await page.locator('form a[href$="/confidentialitate"]').click();await page.goBack();
 await expect(page.locator('#privacy-agreed')).toBeChecked();await page.locator('form button[type=submit]').click();
 await expect(page.getByRole('status')).toContainText(copy('ro').contact.success);expect(requests).toBe(1);
 await page.getByRole('button',{name:copy('ro').contact.newRequest,exact:true}).click();await expect(page.locator('#privacy-agreed')).not.toBeChecked();
});

for(const language of ['ro','en','it','es'])test('footer policies and SAL remain usable at 320px: '+language,async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto(language+'/contact/');
 const footer=page.locator('footer');await expect(footer.getByRole('img')).toBeVisible();
 const badge=footer.getByRole('img');expect(await badge.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
 await expect(footer.locator('a[href="https://reclamatiisal.anpc.ro/"]')).toHaveCount(1);
 expect(await footer.innerText()).not.toMatch(/NETOPIA|parteneri|partners|acreditări|accreditations|diplome/i);
 await footer.locator('a[href$="/termeni-si-conditii"]').click();await expect(page.locator('main h1')).toHaveText(copy(language).legal.termsTitle);
 await expect(page.locator('meta[name=robots]')).toHaveAttribute('content',/noindex/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
