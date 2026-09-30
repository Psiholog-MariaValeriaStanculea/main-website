import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { SupportedLanguage, defaultLanguage, supportedLanguages } from '@/lib/i18n';
import { siteConfig } from '@/lib/siteConfig';
import { seoMetadata } from '@/data/seoMetadata';
import { assetUrl, pageUrl, siteBaseUrl, serializeJsonLd } from '@/lib/seo';

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
  article?: { title: string; date: string; author: string; image: string };
}

export const SEOHead = ({ 
  title, 
  description, 
  keywords,
  ogImage = "/lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png",
  ogType = "website",
  noindex = false,
  article 
}: SEOHeadProps) => {
  const location = useLocation();
  const { lang } = useParams<{ lang?: string }>();
  const pathLanguage = lang || location.pathname.split('/')[1];
  const currentLanguage = supportedLanguages.includes(pathLanguage as SupportedLanguage)
    ? pathLanguage as SupportedLanguage : defaultLanguage;

  const baseUrl = siteBaseUrl;
  const currentPath = location.pathname || '/';
  const currentUrl = pageUrl(currentPath);
  const imageUrl = assetUrl(article?.image || ogImage);
  const pathWithoutLang = currentPath.replace(/^\/(ro|en|es|it)(?=\/|$)/, '') || '/';
  const localizedPath = pathWithoutLang === '/' ? '' : pathWithoutLang.replace(/\/+$/, '');
  const pageKey = localizedPath.slice(1) || 'home';
  const metadata = seoMetadata[currentLanguage][pageKey];
  
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

  const siteTitle = title || metadata?.[0] || defaultTitles[currentLanguage];
  const siteDescription = description || metadata?.[1] || defaultDescriptions[currentLanguage];
  
  const practitionerId = `${baseUrl}/#practitioner`;
  const practiceId = `${baseUrl}/#practice`;
  const homeUrl = pageUrl(`/${currentLanguage}`);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'LocalBusiness', '@id': practiceId,
      name: siteConfig.businessName, url: homeUrl, image: imageUrl,
      email: siteConfig.contactEmail,
      address: {
        '@type': 'PostalAddress', streetAddress: siteConfig.practiceAddress,
        addressLocality: siteConfig.practiceLocality, addressRegion: siteConfig.practiceRegion,
        addressCountry: siteConfig.practiceCountry,
      },
      areaServed: { '@type': 'Country', name: 'Romania' },
      ...(siteConfig.contactPhoneHref ? { telephone: siteConfig.contactPhone } : {}),
      sameAs: siteConfig.socialLinks.filter(link => link.label !== 'WhatsApp').map(link => link.href),
    },
    { '@type': 'Person', '@id': practitionerId, name: siteConfig.practitionerName,
      url: pageUrl(`/${currentLanguage}/despre`), worksFor: { '@id': practiceId } },
    { '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: baseUrl,
      name: siteConfig.businessName, inLanguage: supportedLanguages, publisher: { '@id': practiceId } },
    { '@type': pageKey === 'despre' ? 'AboutPage' : pageKey === 'contact' ? 'ContactPage' : 'WebPage',
      '@id': `${currentUrl}#webpage`, url: currentUrl, name: siteTitle,
      description: siteDescription, inLanguage: currentLanguage,
      isPartOf: { '@id': `${baseUrl}/#website` }, about: { '@id': practiceId } },
  ];
  if (localizedPath) {
    const crumbs = [{ '@type': 'ListItem', position: 1,
      name: seoMetadata[currentLanguage].home[0], item: homeUrl }];
    if (article) crumbs.push({ '@type': 'ListItem', position: 2,
      name: 'Blog', item: pageUrl(`/${currentLanguage}/blog`) });
    crumbs.push({ '@type': 'ListItem', position: crumbs.length + 1,
      name: article?.title || siteTitle, item: currentUrl });
    graph.push({ '@type': 'BreadcrumbList', '@id': `${currentUrl}#breadcrumbs`, itemListElement: crumbs });
  }
  if (article) graph.push({
    '@type': 'BlogPosting', '@id': `${currentUrl}#article`, headline: article.title,
    description: siteDescription, image: [imageUrl], datePublished: article.date,
    author: { '@type': 'Person', '@id': practitionerId, name: article.author,
      url: pageUrl(`/${currentLanguage}/despre`) },
    publisher: { '@id': practiceId }, inLanguage: currentLanguage,
    mainEntityOfPage: { '@id': `${currentUrl}#webpage` },
  });
  const structuredData = { '@context': 'https://schema.org', '@graph': graph };

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
      {!noindex && supportedLanguages.map(language => (
        <link key={language} rel="alternate" hrefLang={language} href={pageUrl(`/${language}${localizedPath}`)} />
      ))}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={pageUrl(`/${defaultLanguage}${localizedPath}`)} />}
      {article && <meta property="article:published_time" content={article.date} />}
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex,follow" : "index,follow,max-image-preview:large"} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {serializeJsonLd(structuredData)}
      </script>
      
      {/* Additional Meta Tags for Psychology Practice */}
      <meta name="medical-specialty" content="Clinical Psychology" />
      <meta name="service-area" content="București, România" />
      <meta name="target-audience" content="Copii, Adolescenți, Părinți, Familii" />
    </Helmet>
  );
};
