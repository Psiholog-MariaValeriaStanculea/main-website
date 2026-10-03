export const pageRoutes = [
  { path: '', key: 'home' }, { path: '/despre', key: 'about' },
  { path: '/servicii', key: 'services' }, { path: '/resurse', key: 'resources' },
  { path: '/intrebari-frecvente', key: 'faq' }, { path: '/contact', key: 'contact' },
  { path: '/blog', key: 'blog' }, { path: '/confidentialitate', key: 'privacy' },
  { path: '/cookie-uri', key: 'cookies' },
] as const;
export const navigationRoutes = pageRoutes.slice(0, 6);
export const withoutLanguage = (path: string) => path.replace(/^\/[a-z]{2}(?=\/|$)/, '').replace(/\/$/, '') || '';
