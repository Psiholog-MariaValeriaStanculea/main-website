const serviceID=import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const templateID=import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const publicKey=import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
export const contactConfigured=Boolean(serviceID && templateID && publicKey);

export async function sendInquiry(payload:Record<string,string>) {
 // Avoid the SDK's storage getter when browser privacy settings block it.
 let storageReadable=true;
 try { void window.localStorage; } catch { storageReadable=false; }
 if(!storageReadable){
  const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{
   method:'POST',headers:{'Content-Type':'application/json'},
   body:JSON.stringify({service_id:serviceID,template_id:templateID,user_id:publicKey,template_params:payload}),
  });
  if(!response.ok)throw {status:response.status};
  return {status:response.status};
 }
 const {default:emailjs}=await import('@emailjs/browser');
 const memory=new Map<string,string>();
 return emailjs.send(serviceID!,templateID!,payload,{publicKey:publicKey!,storageProvider:{
  get:async key=>memory.get(key)||null,set:async(key,value)=>{memory.set(key,value);},remove:async key=>{memory.delete(key);},
 }});
}
