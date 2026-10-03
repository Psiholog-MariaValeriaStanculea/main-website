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

const attribute=(tag,name)=>tag?.match(new RegExp(`\\b${name}=["']([^"']+)["']`))?.[1];
export function checkBuildIdentity(html,buildId,page){
  assert.match(buildId || '',/^[a-f0-9]{64}$/,'An expected build ID is required');
  const marker=[...html.matchAll(/<meta\b[^>]*>/g)].map(match=>match[0]).find(tag=>attribute(tag,'name')==='site-build-id');
  assert.equal(attribute(marker,'content'),buildId,`Build identity mismatch: ${page}`);
}

export async function checkLive(siteUrl, fetchSite = fetch, expected = {}) {
    const base = new URL(siteUrl);
    assert.ok(['http:', 'https:'].includes(base.protocol), 'Expected an HTTP(S) site URL');
    base.pathname = `${base.pathname.replace(/\/+$/, '')}/`;
    base.search = '';
    base.hash = '';
    assert.match(expected.buildId || '',/^[a-f0-9]{64}$/,'An expected build ID is required');
    const canonicalBase=new URL(expected.canonicalBaseUrl || base);
    canonicalBase.pathname=canonicalBase.pathname.replace(/\/+$/,'')+'/';
    canonicalBase.search='';canonicalBase.hash='';
    const assets = new Map();
    for (const route of ['', 'ro/', 'en/contact/']) {
      const url = new URL(route, base);
      const response = await fetchSite(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      assert.equal(response.status, 200, `Page unavailable: ${url}`);
      assert.ok(response.headers.get('content-type')?.includes('text/html'), `Invalid page type: ${url}`);
      const html = await response.text();
      checkHtml(html, url);
      checkBuildIdentity(html,expected.buildId,url);
      const language=route.startsWith('en/')?'en':'ro';
      assert.equal(attribute(html.match(/<html\b[^>]*>/)?.[0],'lang'),language,`Wrong page language: ${url}`);
      const canonical=[...html.matchAll(/<link\b[^>]*>/g)].map(match=>match[0]).find(tag=>attribute(tag,'rel')==='canonical');
      const actualCanonical=new URL(attribute(canonical,'href') || 'about:blank');
      const wantedCanonical=new URL(route || 'ro/',canonicalBase);
      assert.equal(actualCanonical.origin,wantedCanonical.origin,`Wrong canonical origin: ${url}`);
      assert.equal(actualCanonical.pathname.replace(/\/$/,''),wantedCanonical.pathname.replace(/\/$/,''),`Wrong canonical route: ${url}`);
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
    return `Pages HTTP checks passed: build ${expected.buildId}, 3 pages and ${assets.size} production assets at ${base}`;
}

export function checkArtifact(root = '.') {
    const workflowDir = resolve(root, '.github/workflows');
    const workflows = readdirSync(workflowDir).filter(file => /\.ya?ml$/.test(file));
    const deployers = workflows.filter(file => /uses:\s*actions\/deploy-pages@/.test(readFileSync(resolve(workflowDir, file), 'utf8')));
    assert.deepEqual(deployers, ['deploy-github-pages.yml'], 'Only the Vite workflow may deploy this Pages site');
    assert.ok(existsSync(resolve(root, 'dist/.nojekyll')), 'Missing .nojekyll in the Pages artifact');
    const {buildId}=JSON.parse(readFileSync(resolve(root,'dist/build-info.json'),'utf8'));
    for (const page of ['index.html', 'ro/index.html', 'en/contact/index.html', '404.html']) {
      const html=readFileSync(resolve(root, 'dist', page), 'utf8');
      checkHtml(html,page);checkBuildIdentity(html,buildId,page);
    }
    return 'Pages artifact checks passed: one deployment workflow, rendered content, compiled JS/CSS and .nojekyll.';
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const urlIndex = process.argv.indexOf('--url');
    if(urlIndex===-1)console.log(checkArtifact());
    else{
      const idIndex=process.argv.indexOf('--build-id');
      const canonicalIndex=process.argv.indexOf('--canonical-base');
      const buildId=idIndex>=0?process.argv[idIndex+1]:JSON.parse(readFileSync('dist/build-info.json','utf8')).buildId;
      const canonicalBaseUrl=canonicalIndex>=0?process.argv[canonicalIndex+1]:idIndex>=0?process.argv[urlIndex+1]:JSON.parse(readFileSync('dist/route-manifest.json','utf8'))[0].url.replace(/\/ro\/?$/,'');
      console.log(await checkLive(process.argv[urlIndex+1],fetch,{buildId,canonicalBaseUrl}));
    }
  } catch (error) {
    console.error(`Pages verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}
