type RecaptchaApi = {
 render: (container: HTMLElement, options: {sitekey:string;size:'normal'|'compact';callback:(token:string)=>void;'expired-callback':()=>void;'error-callback':()=>void}) => number;
 reset: (id:number) => void;
};
declare global {
 interface Window { grecaptcha?:RecaptchaApi; siteRecaptchaReady?:()=>void; }
}
let loading:Promise<RecaptchaApi>|undefined;
/** Loaded by the Contact widget; other routes do not request Google's script. */
export function loadRecaptcha(language:string):Promise<RecaptchaApi> {
 if(window.grecaptcha?.render)return Promise.resolve(window.grecaptcha);
 if(loading)return loading;
 loading=new Promise((resolve,reject)=>{
  const script=document.createElement('script');
  const fail=()=>{clearTimeout(timer);script.remove();delete window.siteRecaptchaReady;loading=undefined;reject(new Error('reCAPTCHA unavailable'));};
  const timer=setTimeout(fail,20000);
  window.siteRecaptchaReady=()=>{
   clearTimeout(timer);delete window.siteRecaptchaReady;
   if(window.grecaptcha?.render)resolve(window.grecaptcha);else fail();
  };
  script.src='https://www.google.com/recaptcha/api.js?onload=siteRecaptchaReady&render=explicit&hl='+encodeURIComponent(language);
  script.async=true;script.defer=true;script.onerror=fail;
  document.head.append(script);
 });
 return loading;
}
