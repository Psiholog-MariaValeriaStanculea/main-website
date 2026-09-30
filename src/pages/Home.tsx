import { ArrowRight, CheckCircle, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import { SEOHead } from "@/components/SEOHead";
import WhyFamiliesChooseMe from "@/components/local/WhyFamiliesChooseMe";
import HowTherapyWorks from "@/components/local/HowTherapyWorks";
import ServicesLocation from "@/components/local/ServicesLocation";
import PracticalInfoRomania from "@/components/local/PracticalInfoRomania";
import HeroStats from "@/components/local/HeroStats";
import SessionPackages from "@/components/local/SessionPackages";
import TestimonialsSection from "@/components/local/TestimonialsSection";
import HomeConsultationForm from "@/components/local/HomeConsultationForm";
import LatestArticles from "@/components/local/LatestArticles";
import HomeFAQPreview from "@/components/local/HomeFAQPreview";
import SectionEyebrow from "@/components/local/SectionEyebrow";

const HERO_IMAGE = `${import.meta.env.BASE_URL}lovable-uploads/f7058975-3973-4045-bee5-8886215af9ac.png`;
const ABOUT_IMAGE = `${import.meta.env.BASE_URL}lovable-uploads/83e7a272-918c-44bb-8772-c1de1e40660d.png`;

const Home = () => {
  const { t } = useTranslation(["home", "navigation"]);
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  const services = [
    { title: t("home:services.evaluation.title"), description: t("home:services.evaluation.description"), icon: CheckCircle },
    { title: t("home:services.therapy.title"), description: t("home:services.therapy.description"), icon: Heart },
    { title: t("home:services.counseling.title"), description: t("home:services.counseling.description"), icon: Star },
  ];

  return (
    <>
      <SEOHead
        title={`${t("home:hero.eyebrow")} - Valeria Stănculea`}
        description={t("home:hero.description")}
        keywords="psiholog copii București, cabinet psihologie Sector 2, terapie familie România, psiholog clinician, consiliere parentală"
      />
      <div className="bg-background relative overflow-hidden">
        {/* Hero */}
        <section className="hero-container section-padding min-h-[82vh] lg:min-h-[88vh] flex items-center pt-24 lg:pt-28">
          <div className="absolute top-20 right-[10%] opacity-[0.04] pointer-events-none hidden lg:block">
            <svg width="320" height="320" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>

          <div className="container-max relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 md:space-y-8 fade-in-up text-left">
                <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {t("home:hero.eyebrow")}
                </div>
                <h1 className="max-w-2xl text-[2.35rem] md:text-5xl lg:text-[3.35rem] font-heading font-bold text-foreground leading-[1.08] tracking-tight">
                  {t("home:hero.title")}
                </h1>
                <p className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed">
                  {t("home:hero.description")}
                </p>
                <p className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed">
                  {t("home:hero.description2")}
                </p>
                <p className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed">
                  {t("home:hero.bio")}
                </p>
                <p className="max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed">
                  {t("home:hero.closing")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button size="lg" variant="default" className="text-base px-8 py-6 h-auto w-full sm:w-auto rounded-full" asChild>
                    <Link to={`/${currentLang}/contact`}>
                      {t("home:hero.ctaPrimary")}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                <HeroStats />
              </div>

              <div className="relative fade-in-up mt-8 lg:mt-0">
                <div className="hero-shape-beige" />
                <div className="hero-shape-teal" />
                <div className="hero-image-frame border-8 border-white shadow-xl dark:border-slate-950">
                  <img
                    src={HERO_IMAGE}
                    alt={t("home:hero.imageAlt")}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white p-5 rounded-2xl shadow-soft border border-border/30 max-w-[220px] animate-bounce-soft hidden md:block dark:border-white/10 dark:bg-slate-950/80">
                  <div className="flex items-center space-x-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{t("home:hero.experienceBadge")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding bg-primary-light/10 dark:bg-slate-950/70">
          <div className="container-max">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <SectionEyebrow icon={Heart} label={t("home:services.eyebrow")} />
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                {t("home:services.title")}
              </h2>
              <p className="text-lg text-muted-foreground">{t("home:services.subtitle")}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {services.map((service, index) => (
                <Card key={index} className="bg-white border border-border/50 hover:shadow-soft transition-all duration-300 rounded-[28px] overflow-hidden group dark:border-white/10 dark:bg-slate-950/75">
                  <CardContent className="p-8 md:p-10 flex flex-col gap-5">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light/35 group-hover:bg-primary transition-colors duration-300">
                      <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{service.description}</p>
                    <div className="pt-2">
                      <Link
                        to={`/${currentLang}/servicii`}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                      >
                        {t("home:services.moreInfo")}
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-14">
              <Button variant="default" size="lg" className="px-8 py-6 rounded-full text-lg font-semibold" asChild>
                <Link to={`/${currentLang}/servicii`}>
                  {t("home:services.viewAll")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section-padding bg-background">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative fade-in-up order-2 lg:order-1">
                <div className="hero-shape-beige" />
                <div className="relative w-full aspect-square rounded-[60px] overflow-hidden shadow-xl border-8 border-white dark:border-slate-950">
                  <img src={ABOUT_IMAGE} alt={t("home:about.title")} className="w-full h-full object-cover object-center" />
                </div>
              </div>
              <div className="fade-in-up space-y-6 order-1 lg:order-2">
                <SectionEyebrow icon={Heart} label={t("home:about.eyebrow")} />
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                  {t("home:about.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("home:about.description1")}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("home:about.description2")}</p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2 pb-4">
                  {(["behavioral", "adhd", "trauma", "relational"] as const).map((key) => (
                    <div key={key} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-sm">{t(`home:about.specializations.${key}`)}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" variant="default" className="px-8 py-6 rounded-full font-semibold" asChild>
                  <Link to={`/${currentLang}/despre`}>
                    {t("home:about.readMore")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <HowTherapyWorks />
        <WhyFamiliesChooseMe />
        <ServicesLocation />
        <SessionPackages />
        <TestimonialsSection variant="full" />
        <HomeConsultationForm />
        <LatestArticles />
        <HomeFAQPreview />
        <PracticalInfoRomania />

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-border/10 bg-[linear-gradient(135deg,#f5ecdf_0%,#f8f3eb_45%,#e6f3ee_100%)] dark:border-white/10 dark:bg-[linear-gradient(135deg,#0b1120_0%,#111827_55%,#0f172a_100%)]">
          <div className="absolute -top-16 right-0 h-56 w-56 rounded-full bg-white/40 blur-3xl dark:bg-primary/10" />
          <div className="absolute -bottom-16 left-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="container-max relative z-10 py-16 md:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                {t("home:cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {t("home:cta.description")}
              </p>
              <Button size="lg" variant="cta" className="px-8 py-6 rounded-full font-semibold text-lg shadow-sm" asChild>
                <Link to={`/${currentLang}/contact`}>
                  {t("home:cta.button")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
