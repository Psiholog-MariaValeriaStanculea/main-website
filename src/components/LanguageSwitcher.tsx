import { Link, useLocation } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supportedLanguages } from '@/lib/i18n';
import { useEditorial } from '@/lib/editorial';
import { Action } from './editorial/Action';
import { useMenuFocusReturn } from '@/hooks/useMenuFocusReturn';
const names = {ro:'Română',en:'English',it:'Italiano',es:'Español'};
export function LanguageSwitcher() {
 const { copy, language } = useEditorial();
 const location = useLocation();
 const focus=useMenuFocusReturn();
 const href = (lang: string) => ({pathname: location.pathname.replace(/^\/(ro|en|it|es)(?=\/|$)/, '/' + lang), search:location.search, hash:location.hash});
 return <div>
  <DropdownMenu modal={false}><DropdownMenuTrigger asChild>
   <Action ref={focus.triggerRef} variant="ghost" className="utility-button px-2 text-sm" aria-label={copy.ui.language}>{language.toUpperCase()}</Action>
  </DropdownMenuTrigger><DropdownMenuContent {...focus.contentProps} align="end" className="z-[120]">
   {supportedLanguages.map(lang => <DropdownMenuItem key={lang} asChild className="min-h-11 text-base"><Link to={href(lang)} state={location.state} lang={lang} hrefLang={lang} aria-current={lang === language ? 'true' : undefined}>{names[lang]}</Link></DropdownMenuItem>)}
  </DropdownMenuContent></DropdownMenu>
  <noscript><div className="flex flex-wrap gap-3 text-sm">{supportedLanguages.map(lang => <Link key={lang} to={href(lang)} lang={lang} hrefLang={lang} className="text-link inline-flex items-center min-h-11">{names[lang]}</Link>)}</div></noscript>
 </div>;
}
