import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';import About from './pages/About';import Services from './pages/Services';
import FAQ from './pages/FAQ';import Contact from './pages/Contact';import Blog from './pages/Blog';import BlogPost from './pages/BlogPost';
import Legal from './pages/Legal';import NotFound from './pages/NotFound';
import { MultilingualLayout } from './components/MultilingualLayout';
import { pageRoutes } from './lib/routes';
const components={home:Home,about:About,services:Services,faq:FAQ,contact:Contact,resources:Blog,blog:Blog,privacy:Legal,cookies:Legal};
function LegacyRedirect(){const location=useLocation();return <Navigate replace to={'/ro'+location.pathname+location.search+location.hash} />;}
export function SiteRoutes(){
 return <Routes>
  <Route path="/" element={<Navigate to="/ro" replace />} />
  {pageRoutes.filter(route=>route.path).map(route=><Route key={route.key} path={route.path} element={<LegacyRedirect />} />)}
  <Route path="/blog/:id" element={<LegacyRedirect />} />
  <Route path="/:lang" element={<MultilingualLayout><Layout /></MultilingualLayout>}>
   {pageRoutes.map(route=>{const Component=components[route.key];return route.path?<Route key={route.key} path={route.path.slice(1)} element={<Component />} />:<Route key={route.key} index element={<Component />} />;})}
   <Route path="blog/:id" element={<BlogPost />} />
   <Route path="*" element={<NotFound />} />
  </Route>
  <Route path="*" element={<Layout><NotFound /></Layout>} />
 </Routes>;
}