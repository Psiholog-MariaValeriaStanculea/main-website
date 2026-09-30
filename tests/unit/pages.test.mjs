import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parse } from 'yaml';
import { spawnSync } from 'node:child_process';
import { checkHtml, checkArtifact, checkLive } from '../../scripts/check-pages.mjs';
import { createPagesServer } from '../../scripts/serve-pages.mjs';

const html = '<html><head><script type="module" src="/main-website/assets/app.js"></script>' +
  '<link rel="stylesheet" href="/main-website/assets/app.css"></head>' +
  '<body><main><h1>Visible website</h1></main></body></html>';

test('compiled prerendered HTML passes; 404 needs a heading but no main', () => {
  checkHtml(html, 'index.html');
  checkHtml(html.replace(/<\/?main>/g, ''), '404.html');
});

for (const [name, content, error] of [
  ['blank React root', '<div id="root"></div><script src="/src/main.tsx"></script>', /Missing rendered content/],
  ['Jekyll publishing the original source', readFileSync('index.html', 'utf8'), /Missing rendered content/],
  ['unresolved Vite placeholders', html.replace('Visible website', '%BASE_URL%'), /Unprocessed Vite template/],
  ['source TypeScript script', html.replace('/main-website/assets/app.js', '/src/main.tsx'), /Unbuilt source script/],
  ['missing compiled JS', html.replace(/<script.*?<\/script>/, ''), /Missing production JavaScript/],
  ['missing compiled CSS', html.replace(/<link[^>]+>/, ''), /Missing production stylesheet/],
]) test(`rejects ${name}`, () => assert.throws(() => checkHtml(content, 'index.html'), error));

function artifact(t) {
  const root = mkdtempSync(join(tmpdir(), 'valeria-pages-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const write = (file, content) => {
    const parts = file.split('/'); parts.pop();
    mkdirSync(join(root, ...parts), { recursive: true });
    writeFileSync(join(root, file), content);
  };
  write('.github/workflows/deploy-github-pages.yml', 'steps:\n  - uses: actions/deploy-pages@v5\n');
  for (const file of ['index.html', 'ro/index.html', 'en/contact/index.html', '404.html']) write(`dist/${file}`, html);
  write('dist/.nojekyll', '');
  write('dist/assets/app.js', 'console.log("built");');
  write('dist/assets/app.css', 'body { color: black; }');
  return { root, write };
}

test('one compiled Pages artifact passes', t => checkArtifact(artifact(t).root));
test('competing Jekyll deployment is rejected', t => {
  const { root, write } = artifact(t);
  write('.github/workflows/jekyll-gh-pages.yml', 'steps:\n  - uses: actions/deploy-pages@v5\n');
  assert.throws(() => checkArtifact(root), /Only the Vite workflow/);
});
test('missing .nojekyll is rejected', t => {
  const { root } = artifact(t); rmSync(join(root, 'dist/.nojekyll'));
  assert.throws(() => checkArtifact(root), /Missing .nojekyll/);
});
test('source replacing a nested rendered page is rejected', t => {
  const { root, write } = artifact(t); write('dist/en/contact/index.html', '<div id="root"></div>');
  assert.throws(() => checkArtifact(root), /Missing rendered content/);
});

function siteFetch(override = () => undefined) {
  return async url => {
    const path = new URL(url).pathname;
    const changed = override(path);
    if (changed) return changed;
    const asset = /\/assets\//.test(path);
    return new Response(asset ? 'compiled asset' : html, {
      headers: { 'content-type': asset ? (path.endsWith('.css') ? 'text/css' : 'text/javascript') : 'text/html' },
    });
  };
}

test('HTTP check follows language routes and deduplicates JS/CSS requests', async () => {
  const requests = [];
  const fetchSite = siteFetch();
  await checkLive('https://example.test/main-website?old=1#old', async url => {
    requests.push(String(url)); return fetchSite(url);
  });
  assert.deepEqual(requests, ['', 'ro/', 'en/contact/', 'assets/app.js', 'assets/app.css']
    .map(path => `https://example.test/main-website/${path}`));
});
test('custom-domain root assets are supported', async () => {
  const fetchSite = async url => new Response(new URL(url).pathname.includes('/assets/') ? 'compiled' : html.replaceAll('/main-website/', '/'),
    { headers: { 'content-type': String(url).endsWith('.css') ? 'text/css' : String(url).endsWith('.js') ? 'text/javascript' : 'text/html' } });
  await checkLive('https://example.test/', fetchSite);
});
for (const [name, override, error] of [
  ['missing language route', path => path.endsWith('/en/contact/') ? new Response('', { status: 404 }) : undefined, /Page unavailable/],
  ['source published as live HTML', path => !path.includes('/assets/') ? new Response(readFileSync('index.html', 'utf8'), { headers: { 'content-type': 'text/html' } }) : undefined, /Missing rendered content/],
  ['CSS returns HTML fallback', path => path.endsWith('.css') ? new Response(html, { headers: { 'content-type': 'text/html' } }) : undefined, /Invalid asset type/],
  ['missing JS', path => path.endsWith('.js') ? new Response('', { status: 404 }) : undefined, /Asset unavailable/],
  ['empty CSS', path => path.endsWith('.css') ? new Response(' ', { headers: { 'content-type': 'text/css' } }) : undefined, /Empty production asset/],
  ['wrong project base path', path => !path.includes('/assets/') ? new Response(html.replaceAll('/main-website/', '/'), { headers: { 'content-type': 'text/html' } }) : undefined, /Asset outside Pages path/],
]) test(`HTTP check rejects ${name}`, async () => {
  await assert.rejects(checkLive('https://example.test/main-website/', siteFetch(override)), error);
});
test('non-HTTP deployment URLs are rejected', async () => {
  await assert.rejects(checkLive('file:///main-website/'), /Expected an HTTP/);
});

test('Vite refuses to build mismatched Pages URL and asset base paths', () => {
  const result = spawnSync(process.execPath, ['node_modules/vite/bin/vite.js', 'build', '--mode', 'production'], {
    encoding: 'utf8',
    env: { ...process.env, VITE_GITHUB_PAGES: 'true', VITE_BASE_PATH: '/wrong-project/',
      VITE_SITE_URL: 'https://example.test/main-website' },
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /VITE_BASE_PATH.*must match the pathname of VITE_SITE_URL/);
});

test('strict test server exposes real nested pages, asset MIME, HEAD and missing-file 404s', async t => {
  const { root } = artifact(t);
  const server = createPagesServer(join(root, 'dist'), '/main-website/');
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}/main-website/`;
  await checkLive(base);
  const redirect = await fetch(base.slice(0, -1), { redirect: 'manual' });
  assert.equal(redirect.status, 301);
  const head = await fetch(`${base}assets/app.css`, { method: 'HEAD' });
  assert.equal(head.status, 200); assert.equal(await head.text(), '');
  for (const path of ['en/missing/', 'assets/missing.js', '%2e%2e%2fpackage.json']) {
    assert.equal((await fetch(base + path)).status, 404);
  }
  assert.equal((await fetch(`${base}bad%ZZ`)).status, 400);
});

test('deployment has test gates before upload and exactly one deployer', () => {
  const files = readdirSync('.github/workflows').filter(file => /\.ya?ml$/.test(file));
  const workflows = files.map(file => parse(readFileSync(join('.github/workflows', file), 'utf8')));
  const deployers = workflows.filter(workflow => Object.values(workflow.jobs).some(job =>
    job.steps?.some(step => step.uses?.startsWith('actions/deploy-pages@'))));
  assert.equal(deployers.length, 1, 'Multiple workflows can overwrite the compiled site');
  const build = deployers[0].jobs.build.steps;
  assert.deepEqual(deployers[0].jobs.build.permissions, { contents: 'read', pages: 'read' });
  assert.deepEqual(deployers[0].jobs.deploy.permissions, { contents: 'read', pages: 'write', 'id-token': 'write' });
  const upload = build.findIndex(step => step.uses?.startsWith('actions/upload-pages-artifact@'));
  assert.ok(upload > 0);
  for (const command of ['npm run test:unit', 'npm run test:e2e', 'npm run check:seo', 'npm run check:pages']) {
    assert.ok(build.slice(0, upload).some(step => step.run?.includes(command)), `${command} must gate artifact upload`);
  }
  assert.equal(build[upload].with.path, './dist');
  assert.equal(deployers[0].jobs.deploy.needs, 'build');
  assert.ok(deployers[0].jobs.deploy.steps.some(step => step.run?.includes('scripts/check-pages.mjs --url')));
});
test('pull requests get tests without publishing a Pages artifact', () => {
  const workflow = parse(readFileSync('.github/workflows/test.yml', 'utf8'));
  assert.ok(Object.hasOwn(workflow.on, 'pull_request'));
  const commands = workflow.jobs.test.steps.map(step => step.run || '').join('\n');
  for (const command of ['npm run lint', 'npx tsc -b', 'npm run test:unit', 'npm run build:github-pages',
    'npm run check:seo', 'npm run check:pages', 'npm run test:e2e']) assert.ok(commands.includes(command));
  assert.ok(!JSON.stringify(workflow).includes('actions/deploy-pages@'));
  assert.equal(workflow.permissions.contents, 'read');
});
