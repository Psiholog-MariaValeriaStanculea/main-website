import { storage } from "@/lib/storage";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage, supportedLanguages, defaultLanguage } from '../lib/i18n';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  supportedLanguages: readonly SupportedLanguage[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(defaultLanguage);

  useEffect(() => {
    const lang = i18n.language as SupportedLanguage;
    if (supportedLanguages.includes(lang)) {
      setCurrentLanguage(lang);
    }
  }, [i18n.language]);

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    storage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      supportedLanguages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};