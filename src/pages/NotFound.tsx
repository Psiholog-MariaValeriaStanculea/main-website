import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { defaultLanguage, supportedLanguages, type SupportedLanguage } from "@/lib/i18n";

const notFoundCopy: Record<SupportedLanguage, { title: string; description: string; cta: string }> = {
  ro: {
    title: "Pagina nu a fost găsită",
    description: "Linkul poate fi incorect sau pagina a fost mutată. Poți reveni la pagina principală și continua de acolo.",
    cta: "Înapoi la pagina principală",
  },
  en: {
    title: "Page not found",
    description: "The link may be incorrect or the page may have moved. You can return to the homepage and continue from there.",
    cta: "Back to the homepage",
  },
  es: {
    title: "Página no encontrada",
    description: "Es posible que el enlace sea incorrecto o que la página se haya movido. Puedes volver a la página principal y continuar desde allí.",
    cta: "Volver a la página principal",
  },
  it: {
    title: "Pagina non trovata",
    description: "Il link potrebbe essere errato oppure la pagina potrebbe essere stata spostata. Puoi tornare alla home page e continuare da lì.",
    cta: "Torna alla home page",
  },
};

const NotFound = () => {
  const location = useLocation();
  const pathLanguage = location.pathname.split("/")[1] as SupportedLanguage | undefined;
  const currentLanguage = pathLanguage && supportedLanguages.includes(pathLanguage)
    ? pathLanguage
    : defaultLanguage;
  const copy = notFoundCopy[currentLanguage];

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead title={`404 | Valeria Stănculea`} description={copy.description} noindex />
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-background border border-border rounded-2xl shadow-soft p-10 text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase mb-4">404</p>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">{copy.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{copy.description}</p>
          <Link
            to={`/${currentLanguage}`}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium transition-colors hover:bg-primary-dark"
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
