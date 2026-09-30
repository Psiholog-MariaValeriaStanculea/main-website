import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, Leaf, Mail, Menu, Phone, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";
import { siteConfig } from "@/lib/siteConfig";

const Navigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation("navigation");
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  const isActive = (path: string) => location.pathname === path;
  const servicesPath = `/${currentLang}/servicii`;
  const contactPath = `/${currentLang}/contact`;
  const appointmentLabel = t("appointmentShort");
  const brandName = t("logoShort").toUpperCase();
  const servicesLinks = [
    { label: t("servicesEvaluation"), href: `${servicesPath}#evaluare` },
    { label: t("servicesTherapy"), href: `${servicesPath}#terapie` },
    { label: t("servicesParental"), href: `${servicesPath}#consiliere-parentala` },
  ];

  const navItems = [
    { path: `/${currentLang}`, label: t("home") },
    { path: `/${currentLang}/despre`, label: t("about") },
    { path: servicesPath, label: t("services"), icon: ChevronDown, isServices: true },
    { path: `/${currentLang}/blog`, label: t("blog") },
    { path: `/${currentLang}/intrebari-frecvente`, label: t("faq") },
    { path: contactPath, label: t("contact") },
  ];

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const contactEmail = siteConfig.contactEmail;
  const contactPhoneLabel = siteConfig.contactPhone;
  const mobileMenu =
    isMobileOpen && typeof document !== "undefined"
      ? createPortal(
          <div id="mobile-menu" className="fixed inset-0 z-[100] flex flex-col bg-background lg:hidden">
            <div className="flex items-center justify-between border-b border-border/10 px-4 py-4">
              <Link to={`/${currentLang}`} className="inline-flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-primary/8 text-primary shadow-sm">
                  <Leaf className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <span className="font-heading text-[1rem] font-bold uppercase tracking-[0.18em] text-foreground">
                  {brandName}
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  className="rounded-full border border-border/30 p-2.5 text-foreground transition-colors hover:bg-muted"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
              <div className="mb-4 flex items-center gap-2">
                <LanguageSwitcher />
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  if (item.isServices) {
                    return (
                      <div key={item.path} className="rounded-[1.5rem] border border-border/10 bg-muted/20 p-2">
                        <Link
                          to={item.path}
                          className="flex items-center justify-between rounded-[1.15rem] px-4 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                          onClick={() => setIsMobileOpen(false)}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="h-4 w-4" />
                        </Link>
                        <div className="px-2 pb-2">
                          {servicesLinks.map((service) => (
                            <Link
                              key={service.href}
                              to={service.href}
                              className="flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-primary"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              <span className="h-2 w-2 rounded-full bg-primary/60" />
                              <span>{service.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block rounded-[1.15rem] px-4 py-4 text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-primary"
                      }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-border/10 bg-card/80 p-4 text-sm text-muted-foreground shadow-sm">
                {siteConfig.contactPhoneHref && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={siteConfig.contactPhoneHref} className="hover:text-primary">{contactPhoneLabel}</a>
                  </div>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${siteConfig.contactEmail}`} className="break-all hover:text-primary">
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="mt-auto border-t border-border/10 bg-background pt-4">
                <Button variant="cta" size="lg" className="w-full rounded-full py-6 text-base font-semibold" asChild>
                  <Link to={contactPath} onClick={() => setIsMobileOpen(false)}>
                    {appointmentLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/15 bg-background/95 shadow-[0_8px_30px_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div className="hidden border-b border-border/10 bg-background/70 lg:block">
        <div className="container-max">
          <div className="flex h-11 items-center justify-between text-[12px] font-medium text-muted-foreground">
            <div className="flex items-center gap-6">
              {siteConfig.contactPhoneHref ? (
                <a
                  href={siteConfig.contactPhoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  aria-label={contactPhoneLabel}
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{contactPhoneLabel}</span>
                </a>
              ) : null}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{contactEmail}</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle showLabel />
            </div>
          </div>
        </div>
      </div>

      <div className="container-max">
        <div className="hidden lg:flex items-end justify-between gap-8 py-5 xl:py-6">
          <div className="min-w-0 flex-1">
            <Link to={`/${currentLang}`} className="group inline-flex items-center gap-3 text-left">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border/30 bg-primary/8 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Leaf className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-[1.55rem] font-bold uppercase leading-none tracking-[0.22em] text-foreground xl:text-[1.75rem]">
                  {brandName}
                </span>
                <span className="mt-2 block max-w-2xl text-[12px] leading-5 text-muted-foreground xl:text-[13px]">
                  {t("subtitle")}
                </span>
              </span>
            </Link>
          </div>

          <div className="flex min-w-0 items-center gap-1">
            <div className="flex items-center gap-1 rounded-full border border-border/20 bg-background/80 p-1 shadow-sm backdrop-blur-sm">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (item.isServices) {
                  return (
                    <div
                      key={item.path}
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        to={item.path}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted hover:text-primary"
                        }`}
                        aria-haspopup="menu"
                        aria-expanded={isServicesOpen}
                      >
                        <span>{item.label}</span>
                        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                      </Link>

                      {isServicesOpen && (
                        <div className="absolute left-0 top-full z-20 pt-3">
                          <div className="w-72 rounded-[1.5rem] border border-border/20 bg-background p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                            {servicesLinks.map((service) => (
                              <Link
                                key={service.href}
                                to={service.href}
                                className="flex items-start gap-3 rounded-[1.1rem] px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                              >
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                                <span className="leading-5">{service.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <Button variant="cta" className="ml-3 rounded-full px-6 py-5 text-sm font-semibold shadow-sm" asChild>
              <Link to={contactPath}>{appointmentLabel}</Link>
            </Button>
          </div>
        </div>

        <div className="flex h-18 items-center justify-between gap-4 py-3 lg:hidden">
          <Link to={`/${currentLang}`} className="group inline-flex min-w-0 items-center gap-3 text-left">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-border/30 bg-primary/8 text-primary shadow-sm">
              <Leaf className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-[1.02rem] font-bold uppercase leading-none tracking-[0.18em] text-foreground">
                {brandName}
              </span>
              <span className="mt-1 hidden max-w-[14rem] truncate text-[11px] leading-4 text-muted-foreground sm:block">
                {t("subtitle")}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="rounded-full border border-border/30 p-2.5 text-foreground transition-colors hover:bg-muted"
              onClick={() => setIsMobileOpen((value) => !value)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu}
    </nav>
  );
};

export default Navigation;
