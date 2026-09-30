import { siteConfig } from './siteConfig';

export const siteBaseUrl = siteConfig.siteUrl.replace(/\/+$/, '');

// VITE_SITE_URL includes the deployment subdirectory, if there is one.
export const pageUrl = (path: string) => `${siteBaseUrl}${path === '/' ? '' : `/${path.replace(/^\/+|\/+$/g, '')}`}`;

export const assetUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  const assetPath = path.startsWith(import.meta.env.BASE_URL)
    ? path.slice(import.meta.env.BASE_URL.length) : path.replace(/^\/+/, '');
  return `${siteBaseUrl}/${assetPath}`;
};

export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
