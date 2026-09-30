import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SupportedLanguage, defaultLanguage } from "@/lib/i18n";

interface LogoProps {
  lang?: SupportedLanguage;
  className?: string;
  variant?: "default" | "light";
}

const Logo = ({ lang = defaultLanguage, className = "", variant = "default" }: LogoProps) => {
  const { t } = useTranslation("navigation");
  const textClass = variant === "light" ? "text-white" : "text-primary";

  return (
    <Link to={`/${lang}`} className={`flex items-center gap-2.5 group ${className}`}>
      <span className={`flex h-11 w-11 items-center justify-center rounded-full shadow-soft transition-transform duration-300 group-hover:scale-105 ${
        variant === "light" ? "bg-white text-primary" : "bg-primary text-primary-foreground"
      }`}>
        <Leaf className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className={`font-heading text-xl font-bold leading-tight ${textClass}`}>
        {t("logoShort")}
      </span>
    </Link>
  );
};

export default Logo;
