import { Link, useLocation } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import { SEOHead } from '@/components/SEOHead';
import { siteConfig } from '@/lib/siteConfig';
export default function Legal() {
 const {copy,path}=useEditorial(); const pathname=useLocation().pathname;
 const privacy=pathname.includes('confidentialitate');const terms=pathname.includes('termeni-si-conditii');const c=copy.legal;
 const title=privacy?c.privacyTitle:terms?c.termsTitle:c.cookiesTitle;
 const intro=privacy?c.privacyIntro:terms?c.termsIntro:c.cookiesIntro;
 const sections=privacy?c.privacySections:terms?c.termsSections:c.cookieSections;
 const reviewed=import.meta.env.VITE_PRIVACY_REVIEWED==='true';
 return <><SEOHead noindex={!reviewed} /><div className="site-container pb-12">
  <header className="page-intro"><h1>{title}</h1><p>{intro}</p><p className="legal-date">{c.updated}</p></header>
  <div className="legal-layout">
   <nav className="legal-contents" aria-label={c.contents}><h2>{c.contents}</h2><ol>{sections.map(section=><li key={section.id}><a href={'#'+section.id}>{section.title}</a></li>)}</ol></nav>
   <div className="legal-body">
    {!reviewed&&<p className="legal-draft" role="note">{c.draftNotice}</p>}
    {sections.map(section=><section id={section.id} key={section.id} className="copy-stack legal-section"><h2>{section.title}</h2><p>{section.text}</p></section>)}
    <section className="copy-stack legal-section"><h2>{c.contactHeading}</h2><a className="text-link email-link" href={'mailto:'+siteConfig.contactEmail}>{siteConfig.contactEmail}</a></section>
    <nav className="legal-related" aria-label={c.related}><h2>{c.related}</h2><Link to={path('/confidentialitate')}>{c.privacyTitle}</Link><Link to={path('/cookie-uri')}>{c.cookiesTitle}</Link><Link to={path('/termeni-si-conditii')}>{c.termsTitle}</Link></nav>
    <details className="legal-sources"><summary>{c.sourcesTitle}</summary>{privacy&&<><h3>{c.providers}</h3><ul>{c.providerLinks.map(link=><li key={link.url}><a className="text-link" href={link.url}>{link.title}</a></li>)}</ul></>}<ul>{c.frameworkLinks.map(link=><li key={link.url}><a className="text-link" href={link.url}>{link.title}</a></li>)}</ul></details>
   </div>
  </div>
 </div></>;
}
