import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import postcss from 'postcss';

test('the lockfile contains no unpatched instances of the reported packages', () => {
  const { packages } = JSON.parse(readFileSync('package-lock.json', 'utf8'));
  const floors = {
    'brace-expansion': { 1: '1.1.21', 2: '2.1.7', 3: '3.0.9', 5: '5.0.12' },
    nanoid: { 3: '3.3.19', 5: '5.1.6' },
    browserslist: { 4: '4.28.7' },
    'js-yaml': { 4: '4.3.2', 5: '5.4.2' },
    postcss: { 8: '8.5.23' },
    'react-router': { 7: '7.18.0' },
    'react-router-dom': { 7: '7.18.0' },
    'baseline-browser-mapping': { 2: '2.11.0' },
    '@humanfs/node': { 0: '0.16.8' },
    'postcss-selector-parser': { 6: '6.1.4', 7: '7.1.3' },
  };
  for (const [path, entry] of Object.entries(packages)) {
    const name = path.split('node_modules/').at(-1);
    assert.notEqual(name, 'braces', 'braces has no patched release and must stay out of the build graph');
    if (!floors[name]) continue;
    const version = entry.version.split('.').map(Number);
    const floor = floors[name][version[0]];
    assert.ok(floor, `Review the security baseline before adopting ${name}@${entry.version}`);
    const minimum = floor.split('.').map(Number);
    const firstDifference = version.findIndex((part, index) => part !== minimum[index]);
    assert.ok(firstDifference === -1 || version[firstDifference] > minimum[firstDifference], `${path}@${entry.version} is below ${floor}`);
  }
});

test('nanoid zero/negative sizes terminate; ordinary identifiers still work', () => {
  // A subprocess timeout safely detects a regression to an infinite loop.
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', `
    import assert from 'node:assert/strict';
    import { customAlphabet } from 'nanoid';
    import { nanoid } from 'nanoid/non-secure';
    assert.equal(customAlphabet('abc', 0)(), '');
    assert.equal(customAlphabet('abc', 10)(0), '');
    assert.equal(nanoid(-1), '');
    assert.match(customAlphabet('abc', 16)(), /^[abc]{16}$/);
    assert.equal(nanoid(16).length, 16);
  `], { encoding: 'utf8', timeout: 5000 });
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
});

test('PostCSS refuses external source maps without from, but preserves adjacent maps', async t => {
  const root = mkdtempSync(join(tmpdir(), 'valeria-postcss-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const secret = join(root, 'outside.map');
  const marker = 'PRIVATE_SOURCE_MAP_CONTENT';
  const map = JSON.stringify({ version: 3, file: 'input.css', sources: ['private.css'], sourcesContent: [marker], names: [], mappings: 'AAAA' });
  writeFileSync(secret, map);
  for (const path of [secret.replaceAll('\\', '/'), relative(process.cwd(), secret).replaceAll('\\', '/')]) {
    const result = await postcss([]).process(`a{color:red}/*# sourceMappingURL=${path} */`, { from: undefined, map: { inline: false } });
    assert.ok(!result.map.toString().includes(marker), 'An absolute or traversing map must not disclose its contents');
  }
  writeFileSync(join(root, 'input.css.map'), map);
  const valid = await postcss([]).process('a{color:red}/*# sourceMappingURL=input.css.map */',
    { from: join(root, 'input.css'), map: { inline: false } });
  assert.ok(valid.map.toString().includes(marker), 'A legitimate adjacent source map remains supported');
});
