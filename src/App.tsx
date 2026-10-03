import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeProvider';
import { InquiryProvider } from './components/InquiryProvider';
import { SiteRoutes } from './SiteRoutes';
import './lib/i18n';
export default function App(){
 return <HelmetProvider><ThemeProvider defaultTheme="system"><InquiryProvider><BrowserRouter basename={import.meta.env.BASE_URL}><SiteRoutes /></BrowserRouter></InquiryProvider></ThemeProvider></HelmetProvider>;
}
