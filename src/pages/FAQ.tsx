import { useEditorial } from '@/lib/editorial';
import { SEOHead } from '@/components/SEOHead';
import { FAQList } from '@/components/editorial/FAQList';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ShieldCheck, Users } from 'lucide-react';
import { Action } from '@/components/editorial/Action';
const groupIcons=[MessageCircle,Users,ShieldCheck];
export default function FAQ() {
 const {copy,path}=useEditorial();
 return <><SEOHead /><div className="site-container detail-page faq-page"><header className="page-intro conversation-intro"><div><p className="eyebrow">{copy.nav.faq}</p><h1>{copy.faq.title}</h1><p>{copy.faq.intro}</p></div><div className="conversation-motif" aria-hidden="true"><MessageCircle size={68} strokeWidth={1.2} /></div></header>
  <div className="faq-groups">{copy.faq.groups.map((group,index)=>{const Icon=groupIcons[index];return <section key={group.title} className="faq-group">
   <div className="faq-group-heading"><span className="chapter-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.5} /></span><h2>{group.title}</h2></div><FAQList items={group.items} />
  </section>;})}</div>
  <div className="page-actions faq-contact-action"><MessageCircle size={28} strokeWidth={1.5} aria-hidden="true" /><Action asChild><Link to={path('/contact')}>{copy.ui.contact}<ArrowRight size={18} aria-hidden="true" /></Link></Action></div>
 </div></>;
}
