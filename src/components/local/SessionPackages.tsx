import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import SectionEyebrow from "./SectionEyebrow";

type PackageFeature = string;

type PackagePlan = {
  name: string;
  price: string;
  period: string;
  note?: string;
  features: PackageFeature[];
  popular?: boolean;
  popularLabel?: string;
};

const SessionPackages = () => {
  const { t } = useTranslation("home");
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;
  const [billing, setBilling] = useState<"session" | "package">("session");

  const plans = t(`pricing.plans.${billing}`, { returnObjects: true }) as PackagePlan[];

  return (
    <section className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#faf8f3_100%)] dark:bg-[linear-gradient(180deg,#0b1120_0%,#111827_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container-max">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <SectionEyebrow icon={CreditCard} label={t("pricing.eyebrow")} />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t("pricing.subtitle")}
          </p>

          <div className="inline-flex items-center rounded-full border border-border/30 bg-white p-1 shadow-soft dark:border-white/10 dark:bg-slate-950/70">
            <button
              type="button"
              onClick={() => setBilling("session")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === "session"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground dark:hover:text-primary-foreground/90"
              }`}
            >
              {t("pricing.toggleSession")}
            </button>
            <button
              type="button"
              onClick={() => setBilling("package")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === "package"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground dark:hover:text-primary-foreground/90"
              }`}
            >
              {t("pricing.togglePackage")}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col overflow-hidden rounded-[30px] p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "scale-[1.015] border border-primary/20 bg-[linear-gradient(180deg,rgba(44,166,161,0.98)_0%,rgba(33,148,144,1)_100%)] text-primary-foreground shadow-[0_24px_60px_rgba(44,166,161,0.22)]"
                  : "border border-border/50 bg-white shadow-soft dark:border-white/10 dark:bg-slate-950/75"
              }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${plan.popular ? "bg-secondary" : "bg-primary/15"}`} />

              {plan.popular && plan.popularLabel && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
                  {plan.popularLabel}
                </span>
              )}

              <div className="mb-5 flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${plan.popular ? "text-secondary" : "text-primary"}`} />
                <h3 className={`text-xl font-heading font-bold ${plan.popular ? "" : "text-foreground"}`}>
                  {plan.name}
                </h3>
              </div>

              <div className="mb-2 flex items-end gap-2">
                <span className="text-4xl font-heading font-bold leading-none">{plan.price}</span>
                <span className={`text-sm pb-1 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>

              {plan.note && (
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.note}
                </p>
              )}

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                        plan.popular ? "bg-white/15" : "bg-primary-light/20"
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 ${plan.popular ? "text-secondary" : "text-primary"}`} />
                    </span>
                    <span className={plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "secondary" : "default"}
                className={`w-full rounded-full py-6 font-semibold ${plan.popular ? "bg-white text-primary hover:bg-white/90 dark:bg-white dark:text-primary dark:hover:bg-white/90" : ""}`}
                asChild
              >
                <Link to={`/${currentLang}/contact`}>{t("pricing.cta")}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-border/30 bg-white/80 px-5 py-4 text-center text-sm text-muted-foreground shadow-soft dark:border-white/10 dark:bg-slate-950/60">
          {t("pricing.disclaimer")}
        </div>
      </div>
    </section>
  );
};

export default SessionPackages;
