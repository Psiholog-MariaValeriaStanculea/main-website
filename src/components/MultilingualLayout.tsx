import { useEffect, type ReactNode } from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '@/lib/i18n';
export function MultilingualLayout({children}:{children:ReactNode}){
 const {lang}=useParams();const location=useLocation();const {i18n}=useTranslation();
 const valid=supportedLanguages.includes(lang as SupportedLanguage);
 useEffect(()=>{if(valid){void i18n.changeLanguage(lang);document.documentElement.lang=lang!;}},[valid,lang,i18n]);
 if(!valid)return <Navigate replace to={'/ro'+location.pathname.replace(/^\/[^/]+/,'')+location.search+location.hash} />;
 return <>{children}</>;
}