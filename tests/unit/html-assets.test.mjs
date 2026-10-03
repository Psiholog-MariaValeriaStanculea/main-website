import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { htmlAssets, checkAssetPaths } from '../../scripts/html-assets.mjs';

test('HTML asset inspection follows browser parsing, including quoted > and decoded attributes', () => {
  assert.deepEqual(htmlAssets(`<IMG alt='1 > 0' SRC='/main-website/assets/a.png'>
    <script SRC=/main-website/assets/app.js></script>
    <link REL='alternate stylesheet' HREF='/main-website/assets/app&#46;css'>
    <link href='/main-website/assets/chunk.js' rel=modulepreload>`), [
    { tagName: 'img', url: '/main-website/assets/a.png' },
    { tagName: 'script', url: '/main-website/assets/app.js' },
    { tagName: 'link', url: '/main-website/assets/app.css' },
    { tagName: 'link', url: '/main-website/assets/chunk.js' },
  ]);
});

test('comments, script text, escaped text and inert templates do not invent assets', () => {
  assert.deepEqual(htmlAssets(`<!-- <img src='/outside/comment.png'> -->
    <script>const example = "<img src='/outside/script.png'>";</script>
    <p>&lt;img src='/outside/text.png'&gt;</p>
    <template><img src='/outside/template.png'></template>
    <link rel=canonical href='https://example.test/'><img data-src='/outside/lazy.png'>`), []);
});

test('asset validation rejects missing, disguised and escaping paths while keeping valid assets', t => {
  const root = mkdtempSync(join(tmpdir(), 'valeria-assets-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const dist = join(root, 'dist');
  mkdirSync(join(dist, 'assets'), { recursive: true });
  writeFileSync(join(dist, 'assets', 'photo.png'), 'asset');
  writeFileSync(join(root, 'outside.png'), 'outside');
  const options = { dist, deploymentPath: '/main-website', page: 'test' };
  checkAssetPaths(`<img alt='1 > 0' src='/main-website/assets/photo.png'>`, options);
  checkAssetPaths('<img src="HTTPS://example.test/photo.png">', options);
  checkAssetPaths(`<!-- <img src='/outside.png'> -->`, options);
  assert.throws(() => checkAssetPaths(`<IMG alt='1 > 0' SRC='/main-website/assets/missing.png'>`, options), /Missing asset/);
  assert.throws(() => checkAssetPaths(`<img src='/main-website&#47;assets&#47;missing.png'>`, options), /Missing asset/);
  assert.throws(() => checkAssetPaths(`<img src='/wrong-project/assets/photo.png'>`, options), /Asset outside deployment path/);
  assert.throws(() => checkAssetPaths(`<img src='/main-website/assets/../../outside.png'>`, options), /Asset outside build directory/);
});

test('custom-domain root asset paths remain supported', t => {
  const dist = mkdtempSync(join(tmpdir(), 'valeria-root-assets-'));
  t.after(() => rmSync(dist, { recursive: true, force: true }));
  writeFileSync(join(dist, 'app.js'), 'compiled');
  checkAssetPaths('<script src="/app.js"></script>', { dist, deploymentPath: '', page: 'root' });
});
