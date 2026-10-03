import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n,{supportedLanguages,type SupportedLanguage} from './lib/i18n';
import { ThemeProvider } from './components/ThemeProvider';
import { InquiryProvider } from './components/InquiryProvider';
import { SiteRoutes } from './SiteRoutes';
import { getBlogPosts } from './data/blogPosts';
import { pageRoutes } from './lib/routes';
import { pageUrl } from './lib/seo';
export const getBuildInfo=()=>({contactConfigured:Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() && import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() && import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim())});
export const getPages=()=>supportedLanguages.flatMap(language=>[
 ...pageRoutes.map(route=>({route:route.path,indexable:route.key!=='privacy'||import.meta.env.VITE_PRIVACY_REVIEWED==='true'})),
 ...getBlogPosts(language).map(post=>({route:'/blog/'+post.id,indexable:true})),
].map(({route,indexable})=>({path:'/'+language+route,language,route,indexable,url:pageUrl('/'+language+route)})));
export async function render(path:string,language:SupportedLanguage){
 const translations=i18n.cloneInstance({lng:language,initImmediate:false});await translations.changeLanguage(language);
 const context:{helmet?:HelmetServerState}={};
 const body=renderToString(<HelmetProvider context={context}><I18nextProvider i18n={translations}><ThemeProvider defaultTheme="system"><InquiryProvider><StaticRouter location={import.meta.env.BASE_URL.replace(/\/$/,'')+path} basename={import.meta.env.BASE_URL}><SiteRoutes /></StaticRouter></InquiryProvider></ThemeProvider></I18nextProvider></HelmetProvider>);
 const helmet=context.helmet!;
 return {body,head:helmet.title.toString()+helmet.meta.toString()+helmet.link.toString()+helmet.script.toString()};
}
