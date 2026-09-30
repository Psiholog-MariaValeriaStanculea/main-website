import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 48, 'Expected six pages and six articles in four languages');
assert.equal(new Set(urls).size, urls.length, 'Sitemap URLs must be unique');
const titles = new Set();
for (const url of urls) {
  const match = new URL(url).pathname.match(/\/(ro|en|es|it)(\/.*)?$/);
  assert.ok(match, `Localized URL: ${url}`);
  const [, language, suffix = ''] = match;
  const html = readFileSync(resolve(dist, language, `.${suffix || '/'}`, 'index.html'), 'utf8');
  assert.ok(html.includes(`<html lang="${language}">`), `Language: ${url}`);
  assert.equal((html.match(/<title\b/g) || []).length, 1, `Single title: ${url}`);
  const title = html.match(/<title[^>]*>(.*?)<\/title>/)[1];
  assert.ok(title.length > 15 && !titles.has(title), `Unique descriptive title: ${url}`);
  titles.add(title);
  assert.equal((html.match(/name="description"/g) || []).length, 1, `Single description: ${url}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `Single canonical: ${url}`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `Canonical matches sitemap: ${url}`);
  assert.equal((html.match(/rel="alternate"/g) || []).length, 5, `Hreflang set: ${url}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One rendered heading: ${url}`);
  assert.ok(!html.includes('lovable.dev/opengraph') && !html.includes('@lovable_dev'), 'No template social metadata');
  assert.ok(!html.includes('noindex'), `Indexable page: ${url}`);
  const imageUrl = html.match(/property="og:image" content="([^"]+)"/)[1];
  assert.ok(/^https?:\/\//.test(imageUrl), `Absolute social image: ${url}`);
  const basePath = new URL(url).pathname.slice(0, match.index);
  const assetPath = new URL(imageUrl).pathname.slice(basePath.length).replace(/^\//, '');
  assert.ok(existsSync(resolve(dist, assetPath)), `Social image exists: ${url}`);
  const data = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(item => JSON.parse(item[1]));
  assert.ok(data[0]['@graph'].some(item => item['@type'] === 'LocalBusiness'), `Practice schema: ${url}`);
  if (/\/blog\/\d+$/.test(url)) {
    const article = data[0]['@graph'].find(item => item['@type'] === 'BlogPosting');
    assert.ok(article?.headline && article.datePublished && article.author.url, `Article schema: ${url}`);
    assert.ok(html.includes('<article'), `Rendered article content: ${url}`);
  }
  if (suffix === '/intrebari-frecvente') assert.ok(data.some(item => item['@type'] === 'FAQPage'), 'FAQ schema');
}
assert.equal((sitemap.match(/<xhtml:link /g) || []).length, urls.length * 5, 'Sitemap language alternatives');
const notFound = readFileSync(resolve(dist, '404.html'), 'utf8');
assert.ok(notFound.includes('noindex,follow'), '404 must not be indexed');
assert.ok(!notFound.includes('rel="alternate"'), '404 has no language alternatives');
console.log(`SEO checks passed for ${urls.length} pages: rendered content, metadata, canonicals, hreflang, image paths and structured data.`);
