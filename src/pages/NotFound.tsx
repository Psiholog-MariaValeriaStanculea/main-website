import { Link } from 'react-router-dom';
import { editorial, useEditorial } from '@/lib/editorial';
import { supportedLanguages } from '@/lib/i18n';
import { SEOHead } from '@/components/SEOHead';
import { Action } from '@/components/editorial/Action';
export default function NotFound(){
 const {copy,path}=useEditorial();
 return <><SEOHead title={'404 | '+copy.ui.notFound+' | Valeria Stănculea'} description={copy.ui.notFoundText} noindex />
  <div className="site-container section-space"><div className="enhanced-error-content reading-column"><p className="eyebrow">404</p><h1 className="mt-4">{copy.ui.notFound}</h1><p className="mt-5">{copy.ui.notFoundText}</p><div className="flex flex-col sm:flex-row gap-3 mt-6"><Action asChild><Link to={path()}>{copy.ui.backHome}</Link></Action><Action variant="outline" asChild><Link to={path('/servicii')}>{copy.nav.services}</Link></Action><Action variant="outline" asChild><Link to={path('/contact')}>{copy.nav.contact}</Link></Action></div></div>
   <noscript><style>{'.enhanced-error-content{display:none}'}</style><h1>404</h1><div className="grid sm:grid-cols-2 gap-6 mt-6">
    {supportedLanguages.map(language=>{const c=editorial[language];return <section key={language} lang={language} className="support-card static-error-language">
     <p className="eyebrow">{{ro:'Română',en:'English',it:'Italiano',es:'Español'}[language]}</p><h2 className="mt-3">{c.ui.notFound}</h2><p>{c.ui.notFoundText}</p>
     <nav className="flex flex-col items-start gap-2"><a className="text-link" href={import.meta.env.BASE_URL+language+'/'}>{c.ui.backHome}</a><a className="text-link" href={import.meta.env.BASE_URL+language+'/servicii/'}>{c.nav.services}</a><a className="text-link" href={import.meta.env.BASE_URL+language+'/contact/'}>{c.nav.contact}</a></nav>
    </section>;})}
   </div></noscript>
  </div>
 </>;
}
