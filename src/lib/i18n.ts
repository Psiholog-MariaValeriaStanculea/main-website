import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ro from '../locales/ro/editorial.json';import en from '../locales/en/editorial.json';
import it from '../locales/it/editorial.json';import es from '../locales/es/editorial.json';
export const defaultLanguage='ro';
export const supportedLanguages=['ro','en','it','es'] as const;
export type SupportedLanguage=typeof supportedLanguages[number];
const candidate=typeof window==='undefined'?'ro':window.location.pathname.slice(import.meta.env.BASE_URL.length).split('/')[0];
const language=supportedLanguages.includes(candidate as SupportedLanguage)?candidate:defaultLanguage;
void i18n.use(initReactI18next).init({resources:{ro:{editorial:ro},en:{editorial:en},it:{editorial:it},es:{editorial:es}},lng:language,
 fallbackLng:defaultLanguage,supportedLngs:supportedLanguages,defaultNS:'editorial',initImmediate:false,
 interpolation:{escapeValue:false},react:{useSuspense:false}});
export default i18n;
