import { storage } from "@/lib/storage";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { SupportedLanguage, supportedLanguages, defaultLanguage } from '@/lib/i18n';

interface MultilingualLayoutProps {
  children: React.ReactNode;
}

export const MultilingualLayout = ({ children }: MultilingualLayoutProps) => {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLang = lang as SupportedLanguage || defaultLanguage;
    
    // Validate language parameter
    if (lang && !supportedLanguages.includes(lang as SupportedLanguage)) {
      navigate(`/${defaultLanguage}`, { replace: true });
      return;
    }

    // Change language if different
    if (currentLang !== i18n.language) {
      i18n.changeLanguage(currentLang);
    }

    // Update document lang attribute for SEO
    document.documentElement.lang = currentLang;
    
    // Store in localStorage for persistence
    storage.setItem('language', currentLang);
  }, [lang, i18n, navigate]);

  return <>{children}</>;
};