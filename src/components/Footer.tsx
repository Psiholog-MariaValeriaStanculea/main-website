import { Link } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import { siteConfig } from '@/lib/siteConfig';
export default function Footer() {
 const {copy,path} = useEditorial();const c=copy.footer;
 return <footer className="site-footer"><div className="site-container">
  <div className="footer-grid">
   <div><p className="brand">Valeria Stănculea</p><p className="mt-3 max-w-xs text-muted-foreground">{copy.ui.role}</p></div>
   <div className="footer-column"><h2>{copy.nav.contact}</h2><Link to={path('/contact')}>{copy.contact.formTitle}</Link><a className="email-link" href={'mailto:'+siteConfig.contactEmail}>{siteConfig.contactEmail}</a></div>
   <nav aria-label={c.usefulLinks} className="footer-column"><h2>{c.usefulLinks}</h2><Link to={path('/cookie-uri')}>{c.cookies}</Link><Link to={path('/confidentialitate')}>{c.privacy}</Link><Link to={path('/termeni-si-conditii')}>{c.terms}</Link></nav>
   <div className="footer-column"><h2>{c.consumerProtection}</h2><a className="footer-sal" href="https://reclamatiisal.anpc.ro/" aria-label={c.sal}><img src={import.meta.env.BASE_URL+'consumer-protection/anpc-sal-2026.jpg'} alt={c.salAlt} width="250" height="50" loading="lazy" /></a></div>
  </div><p className="helper-text mt-8 pt-5 border-t">© {new Date().getFullYear()} Valeria Stănculea. {copy.ui.copyright}</p>
 </div></footer>;
}
