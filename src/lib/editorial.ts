import { useParams, useLocation } from 'react-router-dom';
import ro from '@/locales/ro/editorial.json';
import en from '@/locales/en/editorial.json';
import it from '@/locales/it/editorial.json';
import es from '@/locales/es/editorial.json';
import { supportedLanguages, type SupportedLanguage } from './i18n';
export const editorial = { ro, en, it, es };
export type EditorialCopy = typeof ro;
export function useEditorial() {
  const { lang } = useParams();
  const location = useLocation();
  const candidate = lang || location.pathname.split('/')[1];
  const language = supportedLanguages.includes(candidate as SupportedLanguage) ? candidate as SupportedLanguage : 'ro';
  return { copy: editorial[language], language, path: (suffix = '') => `/${language}${suffix}` };
}
