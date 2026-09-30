import { Mail, MapPin, Linkedin, Facebook, Instagram, MessageCircle, Phone, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import Logo from "./Logo";
import { siteConfig } from "@/lib/siteConfig";

const Footer = () => {
  const { t } = useTranslation(["common", "navigation"]);
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  const quickLinks = [
    { path: `/${currentLang}`, label: t("common:footer.links.home") },
    { path: `/${currentLang}/despre`, label: t("common:footer.links.about") },
    { path: `/${currentLang}/servicii`, label: t("common:footer.links.services") },
    { path: `/${currentLang}/blog`, label: t("common:footer.links.blog") },
    { path: `/${currentLang}/intrebari-frecvente`, label: t("common:footer.links.faq") },
    { path: `/${currentLang}/contact`, label: t("common:footer.links.contact") },
  ];
  const contactHref = siteConfig.contactPhoneHref ?? `mailto:${siteConfig.contactEmail}`;

  return (
    <footer className="relative overflow-hidden border-t border-border/10 bg-[linear-gradient(180deg,#1f8f8b_0%,#186b68_100%)] text-primary-foreground">
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="container-max section-padding pb-8 relative z-10">
        <div className="mb-12 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
          <div className="space-y-5">
            <Logo lang={currentLang} variant="light" />
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/80">
              {t("common:footer.description")}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                {t("common:footer.hoursWeekdays")}
              </span>
              <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-primary-foreground/80">
                {t("common:footer.location")}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">{t("common:footer.quickLinks")}</h3>
            <ul className="grid gap-2 text-sm text-primary-foreground/80">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">{t("common:footer.contactTitle")}</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              {siteConfig.contactPhoneHref && (
                <li className="rounded-2xl border border-white/10 bg-white/8 p-3">
                  <a href={contactHref} className="inline-flex items-center gap-3 transition-colors hover:text-white">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span className="break-all">{siteConfig.contactPhone}</span>
                  </a>
                </li>
              )}
              <li className="rounded-2xl border border-white/10 bg-white/8 p-3">
                <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex items-center gap-3 transition-colors hover:text-white">
                  <Mail className="h-4 w-4 text-secondary" />
                  <span className="break-all">{siteConfig.contactEmail}</span>
                </a>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/8 p-3">
                <div className="inline-flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-secondary" />
                  <span>{t("common:footer.location")}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">{t("common:footer.hoursTitle")}</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="rounded-2xl border border-white/10 bg-white/8 p-3">
                <div className="inline-flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-secondary" />
                  <span>{t("common:footer.hoursWeekdays")}</span>
                </div>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/8 p-3 pl-3">
                {t("common:footer.hoursWeekend")}
              </li>
            </ul>
            <div className="flex gap-3 pt-1">
              {siteConfig.socialLinks.map(({ href, label }) => {
                const iconMap = {
                  LinkedIn: Linkedin,
                  Facebook: Facebook,
                  Instagram: Instagram,
                  WhatsApp: MessageCircle,
                } as const;
                const Icon = iconMap[label as keyof typeof iconMap];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-primary-foreground/80 transition-all hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col gap-2 text-sm text-primary-foreground/75 md:flex-row md:items-center md:justify-between">
          <p>{t("common:footer.copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("common:footer.credentials")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
