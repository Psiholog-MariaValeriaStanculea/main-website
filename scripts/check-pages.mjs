import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function checkHtml(html, page) {
  assert.ok(/<h1\b/.test(html) && (page === '404.html' || /<main\b/.test(html)), `Missing rendered content: ${page}`);
  assert.ok(!html.includes('%BASE_URL%'), `Unprocessed Vite template: ${page}`);
  assert.ok(!/<script\b[^>]*src=["'][^"']*(?:\/src\/|\.tsx?(?:[?"']))/.test(html), `Unbuilt source script: ${page}`);
  const script = html.match(/<script\b[^>]*type="module"[^>]*src="([^"]+)"/);
  assert.ok(script && /\/assets\/.+\.js$/.test(script[1]), `Missing production JavaScript: ${page}`);
  assert.ok(/<link\b[^>]*rel="stylesheet"[^>]*href="[^"]*\/assets\/[^"']+\.css"/.test(html), `Missing production stylesheet: ${page}`);
}

export async function checkLive(siteUrl, fetchSite = fetch) {
    const base = new URL(siteUrl);
    assert.ok(['http:', 'https:'].includes(base.protocol), 'Expected an HTTP(S) site URL');
    base.pathname = `${base.pathname.replace(/\/+$/, '')}/`;
    base.search = '';
    base.hash = '';
    const assets = new Map();
    for (const route of ['', 'ro/', 'en/contact/']) {
      const url = new URL(route, base);
      const response = await fetchSite(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, `Page unavailable: ${url}`);
      assert.ok(response.headers.get('content-type')?.includes('text/html'), `Invalid page type: ${url}`);
      const html = await response.text();
      checkHtml(html, url);
      for (const match of html.matchAll(/<(script|link)\b[^>]*(?:src|href)="([^"]+)"[^>]*>/g)) {
        const asset = new URL(match[2], url);
        if (asset.origin !== base.origin || !/\.(?:js|css)$/.test(asset.pathname)) continue;
        assert.ok(asset.pathname.startsWith(`${base.pathname}assets/`), `Asset outside Pages path: ${asset}`);
        assets.set(asset.href, asset.pathname.endsWith('.css') ? 'text/css' : /(?:java|ecma)script/);
      }
    }
    for (const [url, mime] of assets) {
      const response = await fetchSite(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, `Asset unavailable: ${url}`);
      assert.match(response.headers.get('content-type') || '', typeof mime === 'string' ? new RegExp(mime) : mime, `Invalid asset type: ${url}`);
      assert.ok((await response.text()).trim(), `Empty production asset: ${url}`);
    }
    return `Pages HTTP checks passed: 3 pages and ${assets.size} production assets at ${base}`;
}

export function checkArtifact(root = '.') {
    const workflowDir = resolve(root, '.github/workflows');
    const workflows = readdirSync(workflowDir).filter(file => /\.ya?ml$/.test(file));
    const deployers = workflows.filter(file => /uses:\s*actions\/deploy-pages@/.test(readFileSync(resolve(workflowDir, file), 'utf8')));
    assert.deepEqual(deployers, ['deploy-github-pages.yml'], 'Only the Vite workflow may deploy this Pages site');
    assert.ok(existsSync(resolve(root, 'dist/.nojekyll')), 'Missing .nojekyll in the Pages artifact');
    for (const page of ['index.html', 'ro/index.html', 'en/contact/index.html', '404.html']) {
      checkHtml(readFileSync(resolve(root, 'dist', page), 'utf8'), page);
    }
    return 'Pages artifact checks passed: one deployment workflow, rendered content, compiled JS/CSS and .nojekyll.';
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const urlIndex = process.argv.indexOf('--url');
    console.log(urlIndex === -1 ? checkArtifact() : await checkLive(process.argv[urlIndex + 1]));
  } catch (error) {
    console.error(`Pages verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}
