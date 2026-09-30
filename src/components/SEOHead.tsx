import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { SupportedLanguage, defaultLanguage, supportedLanguages } from '@/lib/i18n';
import { siteConfig } from '@/lib/siteConfig';

const ogLocaleMap: Record<SupportedLanguage, string> = {
  ro: 'ro_RO',
  en: 'en_GB',
  es: 'es_ES',
  it: 'it_IT',
};

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export const SEOHead = ({ 
  title, 
  description, 
  keywords,
  ogImage = "/lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png",
  ogType = "website",
  noindex = false 
}: SEOHeadProps) => {
  const location = useLocation();
  const { lang } = useParams<{ lang?: string }>();
  const pathLanguage = lang || location.pathname.split('/')[1];
  const currentLanguage = supportedLanguages.includes(pathLanguage as SupportedLanguage)
    ? pathLanguage as SupportedLanguage : defaultLanguage;

  const baseUrl = (import.meta.env.VITE_SITE_URL?.trim() || window.location.origin || siteConfig.siteUrl).replace(/\/$/, '');
  const currentPath = location.pathname || '/';
  const currentUrl = `${baseUrl}${currentPath}`;
  const imageUrl = new URL(ogImage.startsWith('/') ? `${import.meta.env.BASE_URL}${ogImage.slice(1)}` : ogImage, `${baseUrl}/`).href;
  const pathWithoutLang = currentPath.replace(/^\/(ro|en|es|it)(?=\/|$)/, '') || '/';
  const localizedPath = pathWithoutLang === '/' ? '' : pathWithoutLang;
  
  const defaultTitles = {
    ro: "Psiholog Copii și Familii București - Cabinet de Psihologie | Valeria Stănculea",
    en: "Child & Family Psychologist Bucharest - Psychology Practice | Valeria Stănculea", 
    es: "Psicóloga Infantil y Familiar Bucarest - Consulta de Psicología | Valeria Stănculea",
    it: "Psicologa Bambini e Famiglie Bucarest - Studio di Psicologia | Valeria Stănculea"
  };
  
  const defaultDescriptions = {
    ro: "Cabinet de psihologie în București specializat în lucrul cu copii, adolescenți și familii. Servicii la cabinet și online în toată România. Suport multilingv.",
    en: "Psychology practice in Bucharest specializing in children, adolescents and families. In-person and online services throughout Romania. Multilingual support.",
    es: "Consulta de psicología en Bucarest especializada en niños, adolescentes y familias. Servicios presenciales y online en toda Rumania. Apoyo multilingüe.",
    it: "Studio di psicologia a Bucarest specializzato in bambini, adolescenti e famiglie. Servizi in presenza e online in tutta la Romania. Supporto multilingue."
  };

  const siteTitle = title || defaultTitles[currentLanguage];
  const siteDescription = description || defaultDescriptions[currentLanguage];
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PsychologicalPractice",
    "name": siteConfig.businessName,
    "description": siteDescription,
    "url": baseUrl,
    "email": siteConfig.contactEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.practiceAddress,
      "addressLocality": siteConfig.practiceLocality,
      "addressRegion": siteConfig.practiceRegion,
      "addressCountry": siteConfig.practiceCountry
    },
    "openingHours": siteConfig.openingHours,
    "priceRange": siteConfig.priceRange,
    "serviceType": [
      "Psihoterapie copii și adolescenți",
      "Consiliere parentală",
      "Evaluări psihologice",
      "Terapie de familie", 
      "Suport psihologic multilingv"
    ],
    "physician": {
      "@type": "Person",
      "name": siteConfig.practitionerName,
      "jobTitle": "Psiholog Clinician și Psihoterapeut",
      "qualification": "Colegiul Psihologilor din România"
    },
    ...(siteConfig.contactPhoneHref ? { telephone: siteConfig.contactPhone } : {})
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Valeria Stănculea" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Language and Region */}
      <html lang={currentLanguage} />
      <meta name="geo.region" content="RO-B" />
      <meta name="geo.placename" content="București" />
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteConfig.businessName} />
      <meta property="og:locale" content={ogLocaleMap[currentLanguage]} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Hreflang for multilingual SEO */}
      <link rel="alternate" hrefLang="ro" href={`${baseUrl}/ro${localizedPath}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${localizedPath}`} />
      <link rel="alternate" hrefLang="es" href={`${baseUrl}/es${localizedPath}`} />
      <link rel="alternate" hrefLang="it" href={`${baseUrl}/it${localizedPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/${defaultLanguage}${localizedPath}`} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional Meta Tags for Psychology Practice */}
      <meta name="medical-specialty" content="Clinical Psychology" />
      <meta name="service-area" content="București, România" />
      <meta name="target-audience" content="Copii, Adolescenți, Părinți, Familii" />
    </Helmet>
  );
};
