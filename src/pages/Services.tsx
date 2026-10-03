import { ArrowDownRight, ArrowRight, Blocks, ClipboardList, Globe2, HandHeart, HeartHandshake, Sprout, Users, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import { SEOHead } from '@/components/SEOHead';
import { Action } from '@/components/editorial/Action';
import { FamilyMotif } from '@/components/editorial/FamilyMotif';

const serviceIcons: Record<string,LucideIcon> = {evaluare:ClipboardList,'consiliere-copii':Blocks,terapie:Sprout,'consiliere-parentala':HeartHandshake,'relatia-parinte-copil':HandHeart,familie:Users,online:Globe2};
export default function Services() {
 const {copy,path} = useEditorial(); const c = copy.services;
 const groups = [{id:'copii-adolescenti',icon:Blocks,items:c.items.slice(0,3)},{id:'parinti-relatii',icon:HeartHandshake,items:c.items.slice(3,6)},{id:'format-online',icon:Globe2,items:c.items.slice(6)}];
 return <><SEOHead /><div className="site-container detail-page services-page">
  <div className="service-opening">
   <header className="page-intro services-intro"><div><p className="eyebrow">{copy.nav.services}</p><h1>{c.title}</h1><p>{c.intro}</p></div><FamilyMotif className="service-intro-motif" /></header>
   <nav aria-label={copy.ui.contents} className="page-contents"><ul className="service-index">{c.items.map(item=><li key={item.id}><Link className="text-link" to={'#'+item.id}>{item.title}<ArrowDownRight size={17} aria-hidden="true" /></Link></li>)}</ul></nav>
  </div>
  {groups.map((group,index)=>{const GroupIcon=group.icon;return <section key={group.id} id={group.id} className="service-group">
   <div className="service-group-heading"><span className="chapter-icon" aria-hidden="true"><GroupIcon size={28} strokeWidth={1.5} /></span><h2>{c.groups[index]}</h2></div>
   <div className="service-cards">{group.items.map(item=>{const Icon=serviceIcons[item.id];return <article key={item.id} id={item.id} className="service-row">
    <div className="service-card-heading"><span className="support-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.5} /></span><h3>{item.title}</h3></div>
    <div className="service-card-body"><p>{item.text}</p><ul>{item.examples.map(example=><li key={example}>{example}</li>)}</ul><p className="service-initial">{c.initial}</p><Action variant="outline" asChild className="service-contact"><Link to={path('/contact')+'?service='+item.id}>{c.cta}<ArrowRight size={18} aria-hidden="true" /></Link></Action></div>
   </article>;})}</div>
  </section>;})}
  <div className="service-closing closing-panel"><p>{copy.home.closingText}</p><Action asChild><Link to={path('/contact')}>{copy.ui.contact}<ArrowRight size={18} aria-hidden="true" /></Link></Action></div>
 </div></>;
}
