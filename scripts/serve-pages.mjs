import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

// A strict static host: valid routes use their own HTML; missing files return 404.
// Vite's SPA fallback can conceal missing prerendered pages during browser tests.
export function createPagesServer(root, basePath) {
  const directory = resolve(root);
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
  return createServer((request, response) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
    catch { response.writeHead(400).end(); return; }
    if (pathname === basePath.slice(0, -1) && basePath !== '/') {
      response.writeHead(301, { Location: basePath }).end(); return;
    }
    let file = resolve(directory, pathname.slice(basePath.length));
    if (!pathname.startsWith(basePath) || (file !== directory && !file.startsWith(directory + sep))) {
      response.writeHead(404).end(); return;
    }
    let status = 200;
    try {
      if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
      if (!statSync(file).isFile()) throw new Error('Not a file');
    } catch {
      status = 404;
      file = resolve(directory, '404.html');
    }
    try {
      const data = readFileSync(file);
      response.writeHead(status, { 'Content-Type': mime[extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : data);
    } catch { response.writeHead(404).end(); }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const rootIndex=process.argv.indexOf('--root');
  const root=rootIndex>=0?process.argv[rootIndex+1]:'dist';
  const sitemap = readFileSync(resolve(root,'sitemap.xml'), 'utf8');
  const firstPage = new URL(sitemap.match(/<loc>([^<]+)<\/loc>/)[1]);
  const basePath = firstPage.pathname.replace(/(?:ro|en|it|es)(?:\/.*)?$/, '');
  const server = createPagesServer(root, basePath);
  const portIndex = process.argv.indexOf('--port');
  const port = portIndex >= 0 ? Number(process.argv[portIndex + 1]) : 4180;
  server.listen(port, '127.0.0.1', () => console.log(`Pages test server: http://127.0.0.1:${port}${basePath}`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
}
