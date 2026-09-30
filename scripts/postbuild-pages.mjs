import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createServer } from 'vite';

const outDir = resolve(process.cwd(), 'dist');
const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
const server = await createServer({
  mode: 'production', server: { middlewareMode: true, watch: null },
  appType: 'custom', ssr: { noExternal: ['react-helmet-async'] },
});
const escapeXml = value => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]));
try {
  const { render, getPages } = await server.ssrLoadModule('/src/entry-server.tsx');
  const pages = getPages();
  const writePage = async (path, language, file) => {
    const { body, head } = await render(path, language);
    const html = template
      .replace(/<html[^>]*>/, `<html lang="${language}">`)
      .replace(/<title>[\s\S]*?<\/title>/g, '')
      .replace(/<meta\s+(?:name|property)="(?:description|author|keywords|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '')
      .replace('</head>', `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html, 'utf8');
  };
  for (const page of pages) await writePage(page.path, page.language, resolve(outDir, `.${page.path}`, 'index.html'));
  await writePage('/ro', 'ro', resolve(outDir, 'index.html'));
  await writePage('/pagina-inexistenta/404', 'ro', resolve(outDir, '404.html'));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${escapeXml(page.url)}</loc>
${pages.filter(other => other.route === page.route).map(other => `    <xhtml:link rel="alternate" hreflang="${other.language}" href="${escapeXml(other.url)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(pages.find(other => other.route === page.route && other.language === 'ro').url)}" />
  </url>`).join('\n')}
</urlset>
`;
  const baseUrl = new URL(pages[0].url);
  baseUrl.pathname = baseUrl.pathname.replace(/\/ro$/, '');
  writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8');
  writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl.href.replace(/\/$/, '')}/sitemap.xml\n`, 'utf8');
  console.log(`SEO: rendered ${pages.length} localized pages, sitemap, robots.txt and 404 page.`);
} finally {
  await server.close();
}
