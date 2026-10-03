import { test, expect } from './fixtures';
for(const motion of ['no-preference','reduce'] as const)test('FAQ opens, closes and compares answers with motion='+motion,async({page})=>{
 await page.emulateMedia({reducedMotion:motion});await page.goto('en/intrebari-frecvente/');
 const triggers=page.locator('main button[aria-controls]');const first=triggers.first();
 await expect(first).toHaveAttribute('aria-expanded','false');
 const answer=page.locator('[id="'+await first.getAttribute('aria-controls')+'"]');
 await expect(answer).toBeHidden();await first.click();await expect(answer).toBeVisible();
 await triggers.nth(1).click();await expect(answer).toBeVisible();await expect(triggers.nth(1)).toHaveAttribute('aria-expanded','true');
 await first.press('Enter');await expect(answer).toBeHidden();
 if(motion==='reduce')expect(await answer.locator(':scope > div').evaluate(element=>parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(.001);
});
test('large text and spacing do not clip reading or controls',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.goto('ro/contact/');
 await page.addStyleTag({content:'html{font-size:200%}p{line-height:1.5!important;margin-bottom:2em!important}*{letter-spacing:.12em!important;word-spacing:.16em!important}'});
 const width=await page.evaluate(()=>({content:document.documentElement.scrollWidth,viewport:innerWidth}));
 expect(width.content).toBeLessThanOrEqual(width.viewport+1);
 await expect(page.locator('main h1')).toBeVisible();
 await page.locator('#message').scrollIntoViewIfNeeded();await expect(page.locator('#message')).toBeVisible();
});
