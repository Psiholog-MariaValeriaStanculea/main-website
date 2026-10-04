import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';

test('legal page titles are unique across locales, including unindexed privacy pages', async t => {
  const server = await createServer({
    mode: 'production', server: { middlewareMode: true, watch: null },
    appType: 'custom', ssr: { noExternal: ['react-helmet-async'] },
  });
  t.after(() => server.close());
  const { render, getPages } = await server.ssrLoadModule('/src/entry-server.tsx');
  const pages = getPages().filter(page => ['/confidentialitate', '/cookie-uri', '/termeni-si-conditii'].includes(page.route));
  assert.equal(pages.length, 12);
  const titles = new Map();
  for (const page of pages) {
    const { head } = await render(page.path, page.language);
    if (process.env.VITE_PRIVACY_REVIEWED !== 'true') {
      assert.equal(page.indexable, false);
      assert.match(head, /name="robots"[^>]*content="noindex,follow"/);
    }
    const title = head.match(/<title[^>]*>(.*?)<\/title>/)?.[1];
    assert.ok(title && title.length > 15, `Descriptive legal title: ${page.path}`);
    assert.ok(!titles.has(title), `Duplicate legal title ${JSON.stringify(title)}: ${page.path}; first used by ${titles.get(title)}`);
    titles.set(title, page.path);
  }
});
