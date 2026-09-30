import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonRo from '../locales/ro/common.json';
import navigationRo from '../locales/ro/navigation.json';
import homeRo from '../locales/ro/home.json';
import aboutRo from '../locales/ro/about.json';
import servicesRo from '../locales/ro/services.json';
import contactRo from '../locales/ro/contact.json';
import localRo from '../locales/ro/local.json';
import faqRo from '../locales/ro/faq.json';
import blogRo from '../locales/ro/blog.json';

import commonEn from '../locales/en/common.json';
import navigationEn from '../locales/en/navigation.json';
import homeEn from '../locales/en/home.json';
import aboutEn from '../locales/en/about.json';
import servicesEn from '../locales/en/services.json';
import contactEn from '../locales/en/contact.json';
import localEn from '../locales/en/local.json';
import faqEn from '../locales/en/faq.json';
import blogEn from '../locales/en/blog.json';

import commonIt from '../locales/it/common.json';
import navigationIt from '../locales/it/navigation.json';
import homeIt from '../locales/it/home.json';
import aboutIt from '../locales/it/about.json';
import servicesIt from '../locales/it/services.json';
import contactIt from '../locales/it/contact.json';
import localIt from '../locales/it/local.json';
import faqIt from '../locales/it/faq.json';
import blogIt from '../locales/it/blog.json';

import commonEs from '../locales/es/common.json';
import navigationEs from '../locales/es/navigation.json';
import homeEs from '../locales/es/home.json';
import aboutEs from '../locales/es/about.json';
import servicesEs from '../locales/es/services.json';
import contactEs from '../locales/es/contact.json';
import localEs from '../locales/es/local.json';
import faqEs from '../locales/es/faq.json';
import blogEs from '../locales/es/blog.json';

export const defaultLanguage = 'ro';
export const supportedLanguages = ['ro', 'en', 'it', 'es'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

const resources = {
  ro: {
    common: commonRo,
    navigation: navigationRo,
    home: homeRo,
    about: aboutRo,
    services: servicesRo,
    contact: contactRo,
    local: localRo,
    faq: faqRo,
    blog: blogRo,
  },
  en: {
    common: commonEn,
    navigation: navigationEn,
    home: homeEn,
    about: aboutEn,
    services: servicesEn,
    contact: contactEn,
    local: localEn,
    faq: faqEn,
    blog: blogEn,
  },
  it: {
    common: commonIt,
    navigation: navigationIt,
    home: homeIt,
    about: aboutIt,
    services: servicesIt,
    contact: contactIt,
    local: localIt,
    faq: faqIt,
    blog: blogIt,
  },
  es: {
    common: commonEs,
    navigation: navigationEs,
    home: homeEs,
    about: aboutEs,
    services: servicesEs,
    contact: contactEs,
    local: localEs,
    faq: faqEs,
    blog: blogEs,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    load: "languageOnly",
    debug: false,
    
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupFromPathIndex: 0,
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;