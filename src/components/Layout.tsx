import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import TestimonialsSection from "./local/TestimonialsSection";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = /^\/(ro|en|it|es)\/?$/.test(location.pathname);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      document.getElementById(id)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      {!isHomePage && <TestimonialsSection variant="compact" />}
      <Footer />
    </div>
  );
};

export default Layout;
