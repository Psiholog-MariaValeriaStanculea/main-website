import { useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Action } from '@/components/editorial/Action';
import { SEOHead } from '@/components/SEOHead';
import { useEditorial } from '@/lib/editorial';
import { siteConfig } from '@/lib/siteConfig';
import { validateInquiry } from '@/lib/inquiry';
import { contactConfigured as configured } from '@/lib/inquiryTransport';
import { useInquiry } from '@/components/InquiryProvider';
import { AlertCircle, ArrowRight, CheckCircle2, Info, LoaderCircle, Mail, MessageCircle } from 'lucide-react';
import { FamilyMotif } from '@/components/editorial/FamilyMotif';
export default function Contact() {
 const {copy,language,path}=useEditorial(); const c=copy.contact;
 const [params]=useSearchParams();
 const {draft,setDraft,state,submit:send,reset}=useInquiry();
 const {data,context,sourceService}=draft;
 const [enhanced,setEnhanced]=useState(false);
 const [errors,setErrors]=useState({name:false,email:false,message:false});
 useEffect(()=>{setEnhanced(true);},[]);
 useEffect(()=>{
  const id=params.get('service');
  if(id!==sourceService && !state.pending && state.status!=='accepted'){
   const item=copy.services.items.find(service=>service.id===id);
   setDraft(current=>({...current,sourceService:id,context:item?.id || '',data:{...current.data,category:item?.category || 'unsure'}}));
  }
 },[params,copy.services.items,state.pending,state.status,sourceService,setDraft]);
 const selected=copy.services.items.find(item=>item.id===context);
 const locked=state.pending || state.status==='accepted';
 const update=(field:'name'|'email'|'message',value:string)=>{setDraft(current=>({...current,data:{...current.data,[field]:value}}));setErrors(current=>({...current,[field]:false}));};
 const submit=(event:FormEvent)=>{
  event.preventDefault();
  const invalid=validateInquiry(data);setErrors(invalid);
  const first=(['name','email','message'] as const).find(field=>invalid[field]);
  if(first){document.getElementById(first)?.focus();return;}
  send({from_name:data.name.trim(),from_email:data.email.trim(),reply_to:data.email.trim(),
   subject:c.categories[data.category as keyof typeof c.categories],category:data.category,
   service:context,language,message:data.message});
 };
 const feedback=state.status==='ready' ? '' : state.status==='accepted' ? c.success : state.status==='sending' ? c.sending : c[state.status];
 const FeedbackIcon=state.status==='accepted'?CheckCircle2:state.status==='sending'?LoaderCircle:AlertCircle;
 return <><SEOHead /><div className="site-container detail-page contact-page">
  <header className="page-intro conversation-intro"><div><p className="eyebrow">{copy.nav.contact}</p><h1>{c.title}</h1><p>{c.intro}</p></div><div className="conversation-motif" aria-hidden="true"><MessageCircle size={68} strokeWidth={1.2} /></div></header>
  <div className="contact-layout">
   <section className="inquiry-panel"><div className="inquiry-heading"><span className="chapter-icon" aria-hidden="true"><Mail size={27} strokeWidth={1.5} /></span><h2>{c.formTitle}</h2></div>
    {state.status==='unavailable' && <div role="status" aria-live="polite" className="inquiry-unavailable"><Info size={22} aria-hidden="true" /><div><p>{c.unavailable}</p><a className="text-link email-link inline-block min-h-11 mt-2" href={'mailto:'+siteConfig.contactEmail}>{siteConfig.contactEmail}</a></div></div>}
    <noscript><p className="text-base mb-6">{c.noJS}</p></noscript>
    <form noValidate onSubmit={submit} className="space-y-6" aria-busy={state.pending}>
     <p className="helper-text">{c.required}</p>
     {selected && <p className="inquiry-context">{c.selected}: {selected.title}</p>}
     <div className="inquiry-identity">
     <div><Label htmlFor="name" className="field-label">{c.name}</Label><Input id="name" name="name" autoComplete="name" required maxLength={150} disabled={locked} className="field-control" value={data.name} onChange={e=>update('name',e.target.value)} aria-invalid={errors.name} aria-describedby={errors.name?'name-error':undefined} />{errors.name && <p id="name-error" className="field-error">{c.nameError}</p>}</div>
     <div><Label htmlFor="email" className="field-label">{copy.ui.email}</Label><Input id="email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} disabled={locked} className="field-control" value={data.email} onChange={e=>update('email',e.target.value)} aria-invalid={errors.email} aria-describedby={errors.email?'email-error':undefined} />{errors.email && <p id="email-error" className="field-error">{c.emailError}</p>}</div>
     </div>
     <div><Label htmlFor="category" className="field-label">{c.category}</Label>
      <Select name="category" value={data.category} disabled={locked} onValueChange={value=>{setDraft(current=>({...current,data:{...current.data,category:value},context:selected?.category===value?current.context:''}));}}>
       <SelectTrigger id="category" className="field-control"><SelectValue /></SelectTrigger>
       <SelectContent className="z-[120] max-w-[calc(100vw-2rem)]">{Object.entries(c.categories).map(([value,label])=><SelectItem key={value} value={value} className="min-h-11 text-base whitespace-normal">{label}</SelectItem>)}</SelectContent>
      </Select>
     </div>
     <div><Label htmlFor="message" className="field-label">{c.message}</Label><p id="message-help" className="helper-text mb-3">{c.messageHelp}</p><Textarea id="message" name="message" rows={5} maxLength={1000} disabled={locked} className="field-control min-h-36 resize-y" value={data.message} onChange={e=>update('message',e.target.value)} aria-invalid={errors.message} aria-describedby={'message-help'+(errors.message?' message-error':'')} /><p className="helper-text text-right mt-1">{data.message.length} / 1.000</p>{errors.message && <p id="message-error" className="field-error">{c.lengthError}</p>}</div>
     <div className="inquiry-footer">
     <Link className="text-link text-sm block min-h-11 inquiry-privacy" to={path('/confidentialitate')}>{c.privacyHelp}</Link>
     <p className="helper-text">{c.appointment}</p>
     {state.status!=='unavailable' && <div aria-live="polite" aria-atomic="true" role="status">{feedback && <div className="inquiry-feedback" data-status={state.status}><FeedbackIcon size={23} className={state.status==='sending'?'animate-spin':undefined} aria-hidden="true" /><p>{feedback}</p></div>}</div>}
     {state.status==='accepted' ? <Action type="button" variant="outline" onClick={()=>reset(params.get('service'))}>{c.newRequest}</Action> :
      <Action type="submit" disabled={!enhanced || !configured || state.pending} className="w-full sm:w-auto">{state.pending?c.sending:state.status==='rejected'||state.status==='uncertain'?c.retry:c.submit}<ArrowRight size={18} aria-hidden="true" /></Action>}
     </div>
    </form>
   </section><aside className="contact-aside contact-direct">
    <FamilyMotif className="contact-family" />
    <h2>{copy.ui.directEmail}</h2><a className="text-link email-link contact-email" href={'mailto:'+siteConfig.contactEmail}>{siteConfig.contactEmail}<ArrowRight size={18} aria-hidden="true" /></a>
    <div className="contact-expectation"><Info size={22} aria-hidden="true" /><p>{c.appointment}</p></div>
   </aside>
  </div></div></>;
}
