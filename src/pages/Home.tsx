import { ArrowRight, Blocks, Brain, Globe2, HeartHandshake, Sun, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { Action } from '@/components/editorial/Action';
import { FAQList } from '@/components/editorial/FAQList';
import { Articles } from '@/components/editorial/Articles';
import { FamilyMotif } from '@/components/editorial/FamilyMotif';
import { useEditorial } from '@/lib/editorial';
import { getBlogPosts } from '@/data/blogPosts';

const supportIcons = [Blocks, HeartHandshake, Users, Globe2];

export default function Home() {
 const {copy,language,path}=useEditorial(); const c=copy.home;
 const roles=copy.ui.role.split(' · ');
 return <><SEOHead />
 <section className="home-hero">
  <div className="site-container hero-grid">
   <div className="hero-text"><p className="hero-eyebrow">{roles.map((role,index)=>{const Icon=index===0?Brain:HeartHandshake;return <span key={role} className="hero-role"><Icon size={20} strokeWidth={1.6} aria-hidden="true" /><strong>{role}</strong>{index<roles.length-1 && <span className="sr-only">{' · '}</span>}</span>;})}</p><h1 className="hero-title">{c.title}</h1><p className="hero-copy">{c.intro}</p>
    <div className="flex flex-col sm:flex-row gap-3 mt-6"><Action asChild><Link to={path('/servicii')}>{copy.ui.services}<ArrowRight aria-hidden="true" size={18} /></Link></Action><Action variant="outline" asChild><Link to={path('/contact')}>{copy.ui.contact}</Link></Action></div>
   </div>
   <div className="portrait-frame"><span className="portrait-sun" aria-hidden="true"><Sun size={48} strokeWidth={1.2} /></span>
    <img className="hero-photo" src={import.meta.env.BASE_URL+'images/portrait-750.webp'} srcSet={[375,600,750].map(width=>import.meta.env.BASE_URL+'images/portrait-'+width+'.webp '+width+'w').join(', ')} sizes="(min-width: 1216px) 463px, (min-width: 1024px) 40vw, calc(100vw - 40px)" width="750" height="750" {...{fetchpriority:'high'}} decoding="async" alt="Valeria Stănculea" />
    <svg className="portrait-line" viewBox="0 0 160 230" fill="none" aria-hidden="true"><path d="M21 217C77 166 110 82 113 13M71 156C34 149 15 126 13 104C49 111 69 129 71 156ZM95 108C121 105 144 83 151 60C119 60 97 80 95 108ZM109 57C78 50 66 31 65 9C93 17 105 33 109 57Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
   </div>
  </div>
 </section>
 <section className="recognition-section section-space"><div className="site-container recognition-layout"><div className="recognition-heading"><FamilyMotif className="family-motif" /><h2>{c.recognitionTitle}</h2></div><ul className="recognition-list">{c.recognition.map((item,index)=><li key={item}><span className="recognition-number" aria-hidden="true">0{index+1}</span><span>{item}</span></li>)}</ul></div></section>
 <section className="site-container section-space"><h2 className="section-heading">{c.supportTitle}</h2><div className="support-grid">{c.supports.map((card,index)=>{const Icon=supportIcons[index];return <div className="support-card" key={card.anchor}><span className="support-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.5} /></span><h3>{card.title}</h3><p>{card.text}</p><Link className="text-link text-base" to={path('/servicii')+'#'+card.anchor} aria-label={card.link+': '+card.title}>{card.link}<ArrowRight size={18} aria-hidden="true" /></Link></div>;})}</div></section>
 <section className="approach-section section-space"><div className="site-container">
  <div className="approach-layout"><div className="approach-portrait"><img src={import.meta.env.BASE_URL+'images/portrait-standing-1200.webp'} width="1200" height="799" loading="lazy" decoding="async" alt="Valeria Stănculea" /></div><div className="copy-stack"><p className="eyebrow">Valeria Stănculea</p><h2>{c.approachTitle}</h2><p className="text-muted-foreground">{c.approachText}</p><Link className="text-link inline-flex items-center gap-3 min-h-11" to={path('/despre')}>{c.approachLink}<ArrowRight size={18} aria-hidden="true" /></Link></div></div>
  <div className="first-contact"><h3>{c.firstTitle}</h3><ol className="steps-grid">{c.steps.map((step,index)=><li key={step}><span className="step-number" aria-hidden="true">0{index+1}</span><p>{step}</p></li>)}</ol></div>
 </div></section>
 <section className="site-container section-space"><div className="section-heading"><h2>{c.resourcesTitle}</h2><p>{c.resourcesIntro}</p></div><Articles posts={getBlogPosts(language).slice(0,3)} /><Link className="text-link inline-flex items-center gap-3 mt-6 min-h-11" to={path('/resurse')}>{copy.ui.allResources}<ArrowRight size={18} aria-hidden="true" /></Link></section>
 <section className="questions-section section-space"><div className="site-container questions-layout"><div><p className="eyebrow">{copy.nav.faq}</p><h2 className="mt-3 mb-6">{c.faqTitle}</h2><Link className="text-link inline-block min-h-11" to={path('/intrebari-frecvente')}>{copy.ui.allFAQ}</Link></div><FAQList items={copy.faq.groups[0].items} /></div></section>
 <section className="site-container closing-section"><div className="closing-panel"><FamilyMotif className="closing-symbol" /><div><h2>{c.closingTitle}</h2><p>{c.closingText}</p></div><Action asChild><Link to={path('/contact')}>{copy.ui.contact}<ArrowRight size={18} aria-hidden="true" /></Link></Action></div></section>
 </>;
}
