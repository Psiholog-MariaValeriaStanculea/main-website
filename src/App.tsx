import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { CookieBanner } from "./components/CookieBanner";
import { MultilingualLayout } from "./components/MultilingualLayout";
import Layout from "./components/Layout";
import { defaultLanguage } from "./lib/i18n";
import "./lib/i18n";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();
const Router = BrowserRouter;

const BlogPostRedirect = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={`/${defaultLanguage}/blog/${id}`} replace />;
};

const RouteLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center bg-background px-4">
    <div className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
      Loading...
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="lovable-ui-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router basename={import.meta.env.BASE_URL}>
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                {/* Default language routes (Romanian) */}
                <Route path="/" element={<Navigate to={`/${defaultLanguage}`} replace />} />
                <Route path="/despre" element={<Navigate to={`/${defaultLanguage}/despre`} replace />} />
                <Route path="/servicii" element={<Navigate to={`/${defaultLanguage}/servicii`} replace />} />
                <Route path="/intrebari-frecvente" element={<Navigate to={`/${defaultLanguage}/intrebari-frecvente`} replace />} />
                <Route path="/contact" element={<Navigate to={`/${defaultLanguage}/contact`} replace />} />
                <Route path="/blog" element={<Navigate to={`/${defaultLanguage}/blog`} replace />} />
                <Route path="/blog/:id" element={<BlogPostRedirect />} />
                
                {/* Multilingual routes */}
                <Route path="/:lang" element={
                  <MultilingualLayout>
                    <Layout>
                      <Home />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="/:lang/despre" element={
                  <MultilingualLayout>
                    <Layout>
                      <About />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="/:lang/servicii" element={
                  <MultilingualLayout>
                    <Layout>
                      <Services />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="/:lang/intrebari-frecvente" element={
                  <MultilingualLayout>
                    <Layout>
                      <FAQ />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="/:lang/contact" element={
                  <MultilingualLayout>
                    <Layout>
                      <Contact />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="/:lang/blog" element={
                  <MultilingualLayout>
                    <Layout>
                      <Blog />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="/:lang/blog/:id" element={
                  <MultilingualLayout>
                    <Layout>
                      <BlogPost />
                    </Layout>
                  </MultilingualLayout>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieBanner />
          </Router>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
