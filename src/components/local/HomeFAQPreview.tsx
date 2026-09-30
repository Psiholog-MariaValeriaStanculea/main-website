import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import SectionEyebrow from "./SectionEyebrow";

type FaqPreviewItem = { q: string; a: string };

const HomeFAQPreview = () => {
  const { t } = useTranslation(["home", "faq"]);
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  const previewItems = t("home:faqPreview.items", { returnObjects: true }) as FaqPreviewItem[];

  return (
    <section className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#f7fbfb_0%,#eef7f4_100%)] dark:bg-[linear-gradient(180deg,#0b1120_0%,#0f172a_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container-max relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <SectionEyebrow icon={HelpCircle} label={t("home:faqPreview.eyebrow")} />
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
              {t("home:faqPreview.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home:faqPreview.description")}
            </p>
            <Button variant="default" size="lg" className="px-8 py-6 rounded-full" asChild>
              <Link to={`/${currentLang}/intrebari-frecvente`}>
                {t("home:faqPreview.viewAll")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="rounded-[34px] border border-border/40 bg-white/90 p-4 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/75">
            <Accordion type="single" collapsible className="space-y-3">
              {previewItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="rounded-[24px] border border-border/20 px-5 shadow-none transition-colors hover:bg-primary-light/5 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent forceMount className="data-[state=closed]:hidden text-muted-foreground leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQPreview;
