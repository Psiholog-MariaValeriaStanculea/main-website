import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SupportedLanguage, supportedLanguages, defaultLanguage } from '@/lib/i18n';
import { useTranslation } from 'react-i18next';

const languageNames: Record<SupportedLanguage, string> = {
  ro: 'Română',
  en: 'English',
  it: 'Italiano',
  es: 'Español',
};

const languageFlags: Record<SupportedLanguage, string> = {
  ro: '🇷🇴',
  en: '🇬🇧',
  it: '🇮🇹',
  es: '🇪🇸',
};

export const LanguageSwitcher = () => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();
  const location = useLocation();
  const currentLang = (lang as SupportedLanguage) || defaultLanguage;

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    // Replace current language in pathname with new language
    const pathSegments = location.pathname.split('/');
    if (pathSegments[1] && supportedLanguages.includes(pathSegments[1] as SupportedLanguage)) {
      pathSegments[1] = newLang;
    } else {
      pathSegments.splice(1, 0, newLang);
    }
    const newPath = pathSegments.join('/');
    navigate({ pathname: newPath, search: location.search, hash: location.hash });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label={t('language')} variant="ghost" size="sm" className="gap-2 rounded-full border border-border/40 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-muted">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageFlags[currentLang]} {currentLang.toUpperCase()}</span>
          <span className="sm:hidden">{languageFlags[currentLang]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[110] bg-background border-border shadow-lg">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={`gap-2 ${currentLang === language ? 'bg-accent text-accent-foreground' : ''}`}
          >
            <span>{languageFlags[language]}</span>
            <span>{languageNames[language]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
