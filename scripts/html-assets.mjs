import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { relative, resolve, isAbsolute } from 'node:path';
import { parse } from 'parse5';

// Inspect HTML structure; this is an asset validator, not an HTML sanitizer.
export function htmlAssets(html) {
  const pending = [parse(html)];
  const assets = [];
  while (pending.length) {
    const node = pending.pop();
    const attributes = new Map(node.attrs?.map(({ name, value }) => [name, value]));
    const relation = attributes.get('rel')?.toLowerCase().split(/\s+/) || [];
    const assetTag = node.tagName === 'img' || node.tagName === 'script' ||
      (node.tagName === 'link' && relation.some(value => ['stylesheet', 'modulepreload'].includes(value)));
    if (assetTag) {
      const url = attributes.get(node.tagName === 'link' ? 'href' : 'src');
      if (url) assets.push({ tagName: node.tagName, url });
    }
    // Template contents and raw text are inert; do not interpret them as assets.
    for (let index = (node.childNodes?.length || 0) - 1; index >= 0; index--) pending.push(node.childNodes[index]);
  }
  return assets;
}

export function checkAssetPaths(html, { dist, deploymentPath, page }) {
  for (const { url } of htmlAssets(html)) {
    if (/^https?:\/\//i.test(url)) continue;
    assert.ok(url.startsWith(`${deploymentPath}/`), `Asset outside deployment path on ${page}: ${url}`);
    const file = resolve(dist, url.slice(deploymentPath.length + 1));
    const within = relative(dist, file);
    assert.ok(within && within !== '..' && !within.startsWith('..\\') && !within.startsWith('../') && !isAbsolute(within),
      `Asset outside build directory on ${page}: ${url}`);
    assert.ok(existsSync(file), `Missing asset on ${page}: ${url}`);
  }
}
