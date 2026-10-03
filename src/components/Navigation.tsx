import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigationRoutes, withoutLanguage } from '@/lib/routes';
import { useEditorial } from '@/lib/editorial';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Action } from './editorial/Action';
import { siteConfig } from '@/lib/siteConfig';

export default function Navigation() {
 const { copy, path } = useEditorial();
 const location = useLocation();
 const [open, setOpen] = useState(false);
 const header = useRef<HTMLElement>(null);
 const menuTrigger=useRef<HTMLButtonElement>(null);
 useEffect(() => setOpen(false), [location.pathname, location.hash]);
 useEffect(() => {
  const media = matchMedia('(min-width: 1280px)');
  const resize = () => { if (media.matches) setOpen(false); };
  media.addEventListener('change', resize);
  const observer = new ResizeObserver(() => {
   if (header.current) document.documentElement.style.setProperty('--header-height', header.current.offsetHeight + 'px');
  });
  if (header.current) observer.observe(header.current);
  return () => { media.removeEventListener('change', resize); observer.disconnect(); };
 }, []);
 const current = withoutLanguage(location.pathname);
 const links = navigationRoutes.map(route => <Link key={route.key} to={path(route.path)}
  aria-current={(current === route.path || route.key === 'resources' && current.startsWith('/blog')) ? 'page' : undefined}
  className={route.key === 'contact' ? 'nav-link bg-primary !text-primary-foreground px-4 !no-underline' : 'nav-link hover:bg-muted'}
 >{copy.nav[route.key]}</Link>);
 return <Dialog.Root open={open} onOpenChange={setOpen}>
  <header ref={header} className="site-header">
   <div className="site-container header-top-row flex min-h-[76px] items-center justify-between gap-4 py-3">
    <Link to={path()} className="brand header-brand min-w-0">
     <span className="brand-mark" aria-hidden="true">
      <img className="brand-logo-light" src={import.meta.env.BASE_URL+'images/brand-family-logo-v1-128.webp'} srcSet={import.meta.env.BASE_URL+'images/brand-family-logo-v1-128.webp 128w, '+import.meta.env.BASE_URL+'images/brand-family-logo-v1-256.webp 256w'} sizes="(min-width: 1280px) 58px, 40px" width="128" height="128" alt="" decoding="async" />
      <img className="brand-logo-dark" src={import.meta.env.BASE_URL+'images/brand-family-logo-dark-v1-128.webp'} srcSet={import.meta.env.BASE_URL+'images/brand-family-logo-dark-v1-128.webp 128w, '+import.meta.env.BASE_URL+'images/brand-family-logo-dark-v1-256.webp 256w'} sizes="(min-width: 1280px) 58px, 40px" width="128" height="128" alt="" decoding="async" />
     </span>
     <span className="brand-copy"><span>Valeria <span className="block min-[420px]:inline">Stănculea</span></span>
      <span className="hidden xl:block mt-1 max-w-[17rem] font-sans text-sm leading-snug tracking-normal text-muted-foreground">{copy.ui.role}</span>
     </span>
    </Link>
    <nav aria-label={copy.ui.menu} className="enhanced-navigation hidden xl:flex min-w-0 flex-1 flex-wrap justify-center items-center gap-0.5">{links}</nav>
    <div className="header-controls flex shrink-0 items-center gap-1">
     <LanguageSwitcher />
     <div className="hidden xl:block"><ThemeToggle /></div>
     <Dialog.Trigger asChild><Action ref={menuTrigger} variant="ghost" className="utility-button xl:hidden p-2" aria-label={copy.ui.openMenu}><Menu /></Action></Dialog.Trigger>
    </div>
   </div>
   <noscript><style>{'.site-header{position:static}.site-header .utility-button,.site-header .enhanced-navigation{display:none}.header-top-row{flex-wrap:wrap}.header-top-row>.header-brand{flex:1 1 100%}.header-controls{width:100%}'}</style><nav aria-label={copy.ui.menu} className="site-container flex flex-wrap gap-x-3 gap-y-1 pb-3 text-sm">{links}</nav></noscript>
  </header>
  <Dialog.Portal>
   <Dialog.Overlay className="fixed inset-0 z-[90] bg-foreground/30" />
   <Dialog.Content onCloseAutoFocus={event=>{event.preventDefault();menuTrigger.current?.focus({preventScroll:true});}} aria-describedby={undefined} className="mobile-navigation fixed inset-0 z-[100] bg-background flex flex-col p-5 outline-none overflow-hidden">
    <Dialog.Title className="sr-only">{copy.ui.menu}</Dialog.Title>
    <div className="flex shrink-0 justify-between items-center gap-4 pb-5 border-b">
     <span className="brand">Valeria Stănculea</span>
     <Dialog.Close asChild><Action variant="ghost" className="utility-button p-2" aria-label={copy.ui.closeMenu}><X /></Action></Dialog.Close>
    </div>
    <div className="mobile-menu-body min-h-0 flex-1 overflow-y-auto">
    <nav className="flex flex-col gap-2 py-5" aria-label={copy.ui.menu}>{links}</nav>
    <div className="flex items-center justify-between gap-4 py-5 border-t"><LanguageSwitcher /><ThemeToggle showLabel /></div>
    <a className="text-link email-link inline-block min-h-11 text-sm mt-4" href={'mailto:' + siteConfig.contactEmail}>{siteConfig.contactEmail}</a>
    </div>
   </Dialog.Content>
  </Dialog.Portal>
 </Dialog.Root>;
}
