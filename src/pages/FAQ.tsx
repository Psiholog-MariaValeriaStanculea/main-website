import { useTranslation } from "react-i18next";
import { serializeJsonLd } from "@/lib/seo";
import { Helmet } from "react-helmet-async";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link, useParams } from "react-router-dom";
import { HelpCircle, MessageCircle } from "lucide-react";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";

type FaqItem = {
  q: string;
  a: string;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

type FaqCategories = Record<string, FaqCategory>;

const FAQ = () => {
  const { t } = useTranslation('faq');
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  // Generate structured data for FAQ
  const generateStructuredData = () => {
    const categories = t('categories', { returnObjects: true }) as FaqCategories;
    const faqItems: Array<{ "@type": "Question"; name: string; acceptedAnswer: { "@type": "Answer"; text: string } }> = [];
    
    Object.values(categories).forEach((category) => {
      if (category.items) {
        category.items.forEach((item) => {
          faqItems.push({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          });
        });
      }
    });

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems
    };
  };

  const categories = t('categories', { returnObjects: true }) as FaqCategories;

  return (
    <>
      <SEOHead />
      <Helmet>
        <script type="application/ld+json">
          {serializeJsonLd(generateStructuredData())}
        </script>
      </Helmet>

      <div className="bg-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <div className="w-16 h-16 bg-gradient-warm shadow-warm rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
          </div>

          <div className="mb-12 rounded-[2rem] border border-border/70 bg-gradient-sanctuary p-8 text-center shadow-soft">
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              {t('lead')}
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {Object.entries(categories).map(([categoryKey, category]) => (
              <Card key={categoryKey} className="shadow-soft overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                    {category.title}
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.items.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${categoryKey}-${index}`}
                        className="rounded-2xl border border-border/80 bg-card/72 px-6 shadow-soft"
                      >
                        <AccordionTrigger className="text-left text-foreground hover:text-primary font-medium py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent forceMount className="text-muted-foreground leading-relaxed pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="mt-16 overflow-hidden border-0 bg-gradient-primary shadow-sanctuary">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary-foreground mb-4">
                {t('cta.stillQuestions')}
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('cta.description')}
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="shadow-warm"
                asChild
              >
                <Link to={`/${currentLang}/contact`}>
                  {t('cta.contact')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FAQ;