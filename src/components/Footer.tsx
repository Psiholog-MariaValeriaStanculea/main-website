import { Link } from 'react-router-dom';
import { useEditorial } from '@/lib/editorial';
import { navigationRoutes } from '@/lib/routes';
import { siteConfig } from '@/lib/siteConfig';
export default function Footer() {
 const {copy,path} = useEditorial();
 return <footer className="site-footer"><div className="site-container">
  <div className="footer-grid">
   <div><p className="brand">Valeria Stănculea</p><p className="mt-3 max-w-xs text-muted-foreground">{copy.ui.role}</p></div>
   <nav aria-label={copy.ui.menu} className="flex flex-col items-start">{navigationRoutes.map(route=><Link key={route.key} to={path(route.path)} className="hover:underline">{copy.nav[route.key]}</Link>)}</nav>
   <div><p className="font-medium">{copy.nav.contact}</p><a className="text-link email-link" href={'mailto:'+siteConfig.contactEmail}>{siteConfig.contactEmail}</a><div className="flex flex-col items-start mt-3"><Link className="text-link" to={path('/confidentialitate')}>{copy.nav.privacy}</Link><Link className="text-link" to={path('/cookie-uri')}>{copy.nav.cookies}</Link></div></div>
  </div><p className="helper-text mt-8 pt-5 border-t">© {new Date().getFullYear()} Valeria Stănculea. {copy.ui.copyright}</p>
 </div></footer>;
}