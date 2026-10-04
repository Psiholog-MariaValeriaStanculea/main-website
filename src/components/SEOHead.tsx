import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { supportedLanguages, defaultLanguage } from '@/lib/i18n';
import { useEditorial } from '@/lib/editorial';
import { siteConfig } from '@/lib/siteConfig';
import { assetUrl,pageUrl,siteBaseUrl,serializeJsonLd } from '@/lib/seo';
import { pageRoutes,withoutLanguage } from '@/lib/routes';
import { getArticlePath } from '@/data/articleMetadata';
interface Props {title?:string;description?:string;keywords?:string;ogImage?:string;ogType?:string;noindex?:boolean;article?:{id:string;title:string;author:string;image:string;reviewedOn:string;sources:{url:string}[]}}
export function SEOHead({title,description,keywords,ogImage,ogType='website',noindex=false,article}:Props){
 const location=useLocation();const {copy,language}=useEditorial();
 const suffix=article?getArticlePath(article.id,language):withoutLanguage(location.pathname);
 const key=pageRoutes.find(route=>route.path===suffix)?.key || 'home';
 const descriptions={home:copy.home.intro,about:copy.home.approachText,services:copy.services.intro,resources:copy.resources.intro,blog:copy.resources.intro,contact:copy.contact.intro,faq:copy.faq.intro,privacy:copy.legal.privacyIntro,cookies:copy.legal.cookiesIntro,terms:copy.legal.termsIntro};
 const headings={home:copy.home.title,about:copy.about.title,services:copy.services.title,resources:copy.resources.title,blog:copy.resources.articles,contact:copy.contact.title,faq:copy.faq.title,privacy:copy.legal.privacyTitle,cookies:copy.legal.cookiesTitle,terms:copy.legal.termsTitle};
 const pageTitle=title || headings[key]+' | Valeria Stănculea';
 const pageDescription=description || descriptions[key];
 const url=pageUrl('/'+language+suffix);const image=assetUrl(ogImage||article?.image||'/lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png');
 const person=siteBaseUrl+'/#practitioner';const website=siteBaseUrl+'/#website';
 const graph:Record<string,unknown>[]=[
  {'@type':'Person','@id':person,name:siteConfig.practitionerName,url:pageUrl('/'+language+'/despre')},
  {'@type':'WebSite','@id':website,name:siteConfig.businessName,url:siteBaseUrl,publisher:{'@id':person},inLanguage:supportedLanguages},
  {'@type':key==='about'?'AboutPage':key==='contact'?'ContactPage':'WebPage','@id':url+'#webpage',url,name:pageTitle,description:pageDescription,inLanguage:language,isPartOf:{'@id':website},about:{'@id':person}}
 ];
 if(article)graph.push({'@type':'BlogPosting','@id':url+'#article',headline:article.title,description:pageDescription,image,dateModified:article.reviewedOn,citation:article.sources.map(source=>source.url),author:{'@type':'Person','@id':person,name:article.author,url:pageUrl('/'+language+'/despre')},inLanguage:language,mainEntityOfPage:{'@id':url+'#webpage'}});
 return <Helmet><html lang={language}/><title>{pageTitle}</title><meta name="description" content={pageDescription}/><meta name="author" content="Valeria Stănculea"/>{keywords&&<meta name="keywords" content={keywords}/>}
  <link rel="canonical" href={url}/><meta name="robots" content={noindex?'noindex,follow':'index,follow,max-image-preview:large'}/>
  {!noindex&&supportedLanguages.map(lang=><link key={lang} rel="alternate" hrefLang={lang} href={pageUrl('/'+lang+(article?getArticlePath(article.id,lang):suffix))}/>)}{!noindex&&<link rel="alternate" hrefLang="x-default" href={pageUrl('/'+defaultLanguage+(article?getArticlePath(article.id,defaultLanguage):suffix))}/>}
  <meta property="og:title" content={pageTitle}/><meta property="og:description" content={pageDescription}/><meta property="og:type" content={ogType}/><meta property="og:url" content={url}/><meta property="og:image" content={image}/><meta property="og:site_name" content={siteConfig.businessName}/><meta property="og:locale" content={{ro:'ro_RO',en:'en_GB',it:'it_IT',es:'es_ES'}[language]}/>
  <meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={pageTitle}/><meta name="twitter:description" content={pageDescription}/><meta name="twitter:image" content={image}/>
  <script type="application/ld+json">{serializeJsonLd({'@context':'https://schema.org','@graph':graph})}</script>
 </Helmet>;
}
