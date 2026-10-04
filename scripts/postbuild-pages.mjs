import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { createServer } from 'vite';

const outDirIndex=process.argv.indexOf('--outDir');
const outDir = resolve(process.cwd(), outDirIndex>=0?process.argv[outDirIndex+1]:'dist');
const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
const server = await createServer({
  mode: 'production', server: { middlewareMode: true, watch: null },
  appType: 'custom', ssr: { noExternal: ['react-helmet-async'] },
});
const escapeXml = value => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]));
try {
  const { render, getPages, getBuildInfo } = await server.ssrLoadModule('/src/entry-server.tsx');
  const allPages = getPages();
  const pages = allPages.filter(page => page.indexable);
  const writePage = async (path, language, file, redirectTo) => {
    const { body, head } = await render(path, language);
    let html = template
      .replace(/<html[^>]*>/, `<html lang="${language}">`)
      .replace(/<title>[\s\S]*?<\/title>/g, '')
      .replace(/<meta\s+(?:name|property)="(?:description|author|keywords|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '')
      .replace('</head>', `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    // Pages has no configurable HTTP redirect rules. Keep crawlable alias HTML,
    // its canonical target, and an instant refresh that also works without JS.
    // A pathname target keeps local preview/restored artifacts on their own host.
    if (redirectTo) html = html.replace('</head>', `<meta http-equiv="refresh" content="0; url=${escapeXml(new URL(redirectTo).pathname)}"></head>`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html, 'utf8');
  };
  for (const page of allPages) await writePage(page.path, page.language, resolve(outDir, `.${page.path}`, 'index.html'), page.redirectTo);
  writeFileSync(resolve(outDir, 'route-manifest.json'), JSON.stringify(allPages, null, 2));
  await writePage('/ro', 'ro', resolve(outDir, 'index.html'));
  await writePage('/ro/pagina-inexistenta', 'ro', resolve(outDir, '404.html'));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${escapeXml(page.url)}</loc>
${page.lastModified ? `    <lastmod>${escapeXml(page.lastModified)}</lastmod>\n` : ''}
${pages.filter(other => other.route === page.route).map(other => `    <xhtml:link rel="alternate" hreflang="${other.language}" href="${escapeXml(other.url)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(pages.find(other => other.route === page.route && other.language === 'ro').url)}" />
  </url>`).join('\n')}
</urlset>
`;
  const baseUrl = new URL(pages[0].url);
  baseUrl.pathname = baseUrl.pathname.replace(/\/ro$/, '');
  writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap, 'utf8');
  writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl.href.replace(/\/$/, '')}/sitemap.xml\n`, 'utf8');
  // Fingerprint the actual compiled/prerendered artifact, including local edits.
  // Compute before adding markers so every page carries the same identity.
  const files=readdirSync(outDir,{recursive:true,withFileTypes:true}).filter(entry=>entry.isFile())
    .map(entry=>resolve(entry.parentPath,entry.name)).filter(file=>file!==resolve(outDir,'build-info.json')).sort();
  const hash=createHash('sha256');
  for(const file of files)hash.update(file.slice(outDir.length).replaceAll('\\','/')).update('\0').update(readFileSync(file));
  const buildId=hash.digest('hex');
  for(const file of files.filter(file=>file.endsWith('.html'))){
    writeFileSync(file,readFileSync(file,'utf8').replace('</head>',`<meta name="site-build-id" content="${buildId}"></head>`));
  }
  writeFileSync(resolve(outDir, 'build-info.json'), JSON.stringify({...getBuildInfo(),buildId}));
  console.log(`SEO: rendered ${allPages.length} localized pages; ${pages.length} indexable sitemap entries, robots.txt and 404 page.`);
} finally {
  await server.close();
}
