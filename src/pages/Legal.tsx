import { useLocation } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import { SEOHead } from '@/components/SEOHead';
import { siteConfig } from '@/lib/siteConfig';
export default function Legal() {
 const {copy}=useEditorial(); const privacy=useLocation().pathname.includes('confidentialitate');const c=copy.legal;
 return <><SEOHead noindex={privacy && import.meta.env.VITE_PRIVACY_REVIEWED !== 'true'} /><div className="site-container pb-12">
  <header className="page-intro"><h1>{privacy?c.privacyTitle:c.cookiesTitle}</h1><p>{privacy?c.privacyIntro:c.cookiesIntro}</p></header>
  <div className="reading-column">{(privacy?c.privacySections:c.cookieSections).map(section=><section key={section.title} className="copy-stack mb-8"><h2>{section.title}</h2><p>{section.text}</p></section>)}<a className="text-link email-link" href={'mailto:'+siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
   {privacy && <section className="mt-8 copy-stack"><h2>{c.providers}</h2><ul className="space-y-3"><li><a className="text-link" href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">{c.hostingPolicy}</a></li><li><a className="text-link" href="https://www.emailjs.com/legal/privacy-policy/">{c.deliveryPolicy}</a></li></ul></section>}
  </div>
 </div></>;
}
