import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n, { supportedLanguages, type SupportedLanguage } from './lib/i18n';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import { getBlogPosts } from './data/blogPosts';
import { pageUrl } from './lib/seo';

export const getPages = () => supportedLanguages.flatMap(language => [
  '', '/despre', '/servicii', '/contact', '/intrebari-frecvente', '/blog',
  ...getBlogPosts(language).map(post => `/blog/${post.id}`),
].map(route => ({ path: `/${language}${route}`, language, route, url: pageUrl(`/${language}${route}`) })));

export async function render(path: string, language: SupportedLanguage) {
  const translations = i18n.cloneInstance({ lng: language, initImmediate: false });
  await translations.changeLanguage(language);
  const helmetContext: { helmet?: HelmetServerState } = {};
  const body = renderToString(
    <HelmetProvider context={helmetContext}>
      <I18nextProvider i18n={translations}>
        <ThemeProvider defaultTheme="light">
          <StaticRouter location={import.meta.env.BASE_URL.replace(/\/$/, "") + path} basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/:lang" element={<Layout><Home /></Layout>} />
              <Route path="/:lang/despre" element={<Layout><About /></Layout>} />
              <Route path="/:lang/servicii" element={<Layout><Services /></Layout>} />
              <Route path="/:lang/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/:lang/intrebari-frecvente" element={<Layout><FAQ /></Layout>} />
              <Route path="/:lang/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/:lang/blog/:id" element={<Layout><BlogPost /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </ThemeProvider>
      </I18nextProvider>
    </HelmetProvider>,
  );
  const helmet = helmetContext.helmet!;
  return { body, head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString() + helmet.script.toString() };
}
