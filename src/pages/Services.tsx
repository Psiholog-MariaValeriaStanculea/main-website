import { ArrowRight, CheckCircle, Clock, Heart, Sparkles, Users, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/SEOHead";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";

const Services = () => {
  const { t } = useTranslation("services");
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  const mainServices = [
    {
      id: "evaluare",
      title: t("evaluation.title"),
      subtitle: t("evaluation.subtitle"),
      description: t("evaluation.description"),
      icon: Brain,
      details: t("evaluation.includes", { returnObjects: true }) as string[],
      duration: t("evaluation.duration"),
      price: t("evaluation.price"),
    },
    {
      id: "terapie",
      title: t("therapy.title"),
      subtitle: t("therapy.subtitle"),
      description: t("therapy.description"),
      icon: Heart,
      details: t("therapy.includes", { returnObjects: true }) as string[],
      duration: t("therapy.duration"),
      price: t("therapy.price"),
    },
    {
      id: "consiliere-parentala",
      title: t("parental.title"),
      subtitle: t("parental.subtitle"),
      description: t("parental.description"),
      icon: Users,
      details: t("parental.includes", { returnObjects: true }) as string[],
      duration: t("parental.duration"),
      price: t("parental.price"),
    },
    {
      id: "familie",
      title: t("family.title"),
      subtitle: t("family.subtitle"),
      description: t("family.description"),
      icon: Sparkles,
      details: t("family.includes", { returnObjects: true }) as string[],
      duration: t("family.duration"),
      price: t("family.price"),
    },
  ];

  const additionalServices = t("page.additionalServices", { returnObjects: true }) as { title: string; description: string }[];

  const ageGroups = t("page.ageGroups", { returnObjects: true }) as { range: string; focus: string; methods: string[] }[];

  return (
    <>
      <SEOHead />
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#faf8f4_100%)] py-16 md:py-20 dark:bg-[linear-gradient(180deg,#0b1120_0%,#111827_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-5 mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light/20 px-4 py-2 text-sm font-medium text-primary shadow-soft">
              <Sparkles className="mr-2 h-4 w-4" />
              {t("page.eyebrow")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-foreground leading-tight">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <div className="mb-20 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.9rem] border border-border/50 bg-white/90 p-7 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">{t("page.officeLabel")}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("page.officeDescription")}
              </p>
            </div>
            <div className="rounded-[1.9rem] border border-border/50 bg-white/90 p-7 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">{t("page.onlineLabel")}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("page.onlineDescription")}
              </p>
            </div>
            <div className="rounded-[1.9rem] border border-border/50 bg-[linear-gradient(135deg,rgba(249,174,56,0.16),rgba(44,166,161,0.10))] p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(249,174,56,0.10),rgba(44,166,161,0.08))]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">{t("page.approachLabel")}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("page.approachDescription")}
              </p>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{t("page.mainEyebrow")}</p>
              <h2 className="text-3xl font-heading font-bold text-foreground md:text-5xl">{t("page.mainTitle")}</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {mainServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    id={service.id}
                    className="group h-full overflow-hidden scroll-mt-24 lg:scroll-mt-48 rounded-[30px] border-border/50 bg-white/95 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-primary-light/25 p-3 shadow-soft transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                          <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-primary/80">
                            {service.subtitle}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration}</span>
                            </div>
                            <span className="font-semibold text-primary">{service.price}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                      <div className="rounded-[24px] border border-border/30 bg-primary-light/10 p-5 dark:border-white/10 dark:bg-primary/10">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">{t("page.includes")}</h4>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {service.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-primary" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{t("page.ageEyebrow")}</p>
              <h2 className="text-3xl font-heading font-bold text-foreground md:text-5xl">{t("page.ageTitle")}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {ageGroups.map((group) => (
                <Card
                  key={group.range}
                  className="overflow-hidden rounded-[28px] border border-border/50 bg-white/95 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75"
                >
                  <CardContent className="p-8 space-y-5 text-center">
                    <div className="mx-auto inline-flex rounded-full bg-primary-light/25 px-4 py-2 text-base font-bold text-primary">
                      {group.range}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground">{group.focus}</h3>
                    <div className="space-y-2">
                      {group.methods.map((method) => (
                        <div key={method} className="rounded-full bg-muted/60 px-4 py-2 text-sm text-muted-foreground">
                          {method}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{t("page.specializedEyebrow")}</p>
              <h2 className="text-3xl font-heading font-bold text-foreground md:text-5xl">{t("page.specializedTitle")}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {additionalServices.map((service) => (
                <Card
                  key={service.title}
                  className="overflow-hidden rounded-[28px] border border-border/50 bg-white/95 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75"
                >
                  <CardContent className="space-y-3 p-7">
                    <h3 className="text-lg font-heading font-bold text-foreground">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20 rounded-[2.4rem] border border-border/50 bg-[linear-gradient(135deg,rgba(44,166,161,0.08),rgba(249,174,56,0.12))] p-8 shadow-soft md:p-10 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(44,166,161,0.08),rgba(249,174,56,0.06))]">
            <h2 className="mb-8 text-center text-3xl font-heading font-bold text-foreground md:text-5xl">
              {t("page.processTitle")}
            </h2>
            <div className="grid gap-6 md:grid-cols-4">
              {(t("page.steps", { returnObjects: true }) as { step: string; title: string; desc: string }[]).map((item) => (
                <div
                  key={item.step}
                  className="rounded-[1.6rem] border border-border/40 bg-white/90 p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-warm dark:border-white/10 dark:bg-slate-950/75"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-lg font-bold text-primary-foreground shadow-soft">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-border/50 bg-[linear-gradient(135deg,#f5ecdf_0%,#eef7f4_100%)] p-8 text-center shadow-soft md:p-12 dark:border-white/10 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_100%)]">
            <h2 className="text-3xl font-heading font-bold text-foreground md:text-5xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("cta.description")}
            </p>
            <Button size="lg" variant="cta" className="mt-8 rounded-full px-8 py-6 text-base font-semibold" asChild>
              <Link to={`/${currentLang}/contact`}>
                {t("cta.button")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
