import type { ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, BookOpen, GraduationCap, HandHeart, HeartHandshake, Leaf, Scale, ShieldCheck, Sprout, Waypoints, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import ro from '@/locales/ro/master-about.json';
import en from '@/locales/en/master-about.json';
import it from '@/locales/it/master-about.json';
import es from '@/locales/es/master-about.json';
import { SEOHead } from '@/components/SEOHead';
import { Action } from '@/components/editorial/Action';

const sources = {ro,en,it,es};
const chapterIcons: Record<string,LucideIcon> = {identitate:HeartHandshake,'cum-lucrez':Waypoints,misiune:Sprout,dincolo:BookOpen};
const valueIcons = [HeartHandshake,HandHeart,ShieldCheck,Leaf,Scale];
function ChapterHeading({icon:Icon,children}:{icon:LucideIcon;children:ReactNode}) {
 return <div className="chapter-heading"><span className="chapter-icon" aria-hidden="true"><Icon size={28} strokeWidth={1.5} /></span><h2>{children}</h2></div>;
}

export default function About() {
 const {copy,language,path} = useEditorial();
 const content = sources[language];
 const [intro,...sections] = content.sections;
 const groups = content.professional.groups;
 return <><SEOHead /><div className="site-container detail-page about-page">
  <div className="profile-opening">
   <header className="page-intro"><p className="eyebrow">{copy.ui.role}</p><h1>{copy.about.title}</h1></header>
   <section id={intro.id} className="profile-intro">
    <div className="copy-stack profile-intro-copy"><h2>{copy.about.intro}</h2>{intro.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
    <div className="portrait-frame profile-portrait"><img src={import.meta.env.BASE_URL+'images/portrait-close-1200.webp'} srcSet={[600,1200].map(width=>import.meta.env.BASE_URL+'images/portrait-close-'+width+'.webp '+width+'w').join(', ')} sizes="(min-width: 1216px) 381px, (min-width: 1024px) 34vw, calc(100vw - 40px)" width="1200" height="800" className="hero-photo about-intro-photo" alt="Valeria Stănculea" decoding="async" /></div>
   </section>
  </div>
  <nav aria-label={copy.ui.contents} className="page-contents"><p className="helper-text">{copy.ui.contents}</p><div className="contents-grid">
   {sections.filter(section=>section.id!=='dincolo').map(section=><Link key={section.id} to={'#'+section.id} className="text-link">{section.title}<ArrowDownRight size={17} aria-hidden="true" /></Link>)}
   <Link to="#valori" className="text-link">{copy.about.valuesTitle}<ArrowDownRight size={17} aria-hidden="true" /></Link>
   <Link to="#pregatire" className="text-link">{content.professional.title}<ArrowDownRight size={17} aria-hidden="true" /></Link>
   <Link to="#dincolo" className="text-link">{sections[sections.length-1].title}<ArrowDownRight size={17} aria-hidden="true" /></Link>
  </div></nav>
  <div className="about-content">
   {sections.filter(section=>section.id!=='dincolo').map(section=><section key={section.id} id={section.id} className={'about-section about-chapter'+(section.id==='misiune'?' mission-chapter':'')}>
    <ChapterHeading icon={chapterIcons[section.id]}>{section.title}</ChapterHeading>
    <div className="chapter-copy copy-stack">{section.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
   </section>)}
   <section id="valori" className="about-section about-chapter">
    <ChapterHeading icon={HandHeart}>{copy.about.valuesTitle}</ChapterHeading>
    <dl className="values-list about-values chapter-copy">{copy.about.values.map((value,index)=>{const Icon=valueIcons[index];return <div key={value.title}><dt><span className="value-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>{value.title}</dt><dd>{value.text}</dd></div>;})}</dl>
   </section>
   <section id="pregatire" className="about-section about-chapter">
    <ChapterHeading icon={GraduationCap}>{content.professional.title}</ChapterHeading>
    <div className="chapter-copy"><div className="copy-stack professional-intro">{content.professional.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
     <div className="professional-groups">{groups.map((group,index)=><div key={group.title} className="professional-group">
      <h3>{group.title}</h3>
      {group.paragraphs.length>0 && <div className="copy-stack">{group.paragraphs.map(p=><p key={p}>{p}</p>)}</div>}
      {index===8?<details className="training-disclosure"><summary className="text-link">{copy.ui.selectedCourses}</summary><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></details>:group.items.length>0?<ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul>:null}
      {group.continuation.map((block,blockIndex)=><div key={blockIndex} className="professional-continuation"><div className="copy-stack">{block.paragraphs.map(p=><p key={p}>{p}</p>)}</div>{block.items.length>0 && <ul>{block.items.map(item=><li key={item}>{item}</li>)}</ul>}</div>)}
     </div>)}</div>
    </div>
   </section>
   {sections.filter(section=>section.id==='dincolo').map(section=><section key={section.id} id={section.id} className="about-section about-chapter">
    <ChapterHeading icon={BookOpen}>{section.title}</ChapterHeading>
    <div className="chapter-copy copy-stack">{section.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
   </section>)}
   <div className="page-actions"><Action asChild><Link to={path('/servicii')}>{copy.ui.services}<ArrowRight size={18} aria-hidden="true" /></Link></Action><Action variant="outline" asChild><Link to={path('/contact')}>{copy.ui.contact}</Link></Action></div>
  </div>
 </div></>;
}
