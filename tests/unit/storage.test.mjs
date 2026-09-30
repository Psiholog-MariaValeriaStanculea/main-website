import assert from 'node:assert/strict';
import { test } from 'node:test';
import { storage } from '../../src/lib/storage.ts';

test('preference storage reads, writes and removes values', t => {
  const original = globalThis.window;
  t.after(() => { globalThis.window = original; });
  const values = new Map();
  globalThis.window = { localStorage: {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
  } };
  assert.equal(storage.getItem('theme'), null);
  storage.setItem('theme', 'dark'); assert.equal(storage.getItem('theme'), 'dark');
  storage.removeItem('theme'); assert.equal(storage.getItem('theme'), null);
});
for (const name of ['blocked access', 'quota exceeded']) test(`preference storage survives ${name}`, t => {
  const original = globalThis.window;
  t.after(() => { globalThis.window = original; });
  const fail = () => { throw new Error(name); };
  globalThis.window = name === 'blocked access' ? Object.defineProperty({}, 'localStorage', { get: fail }) :
    { localStorage: { getItem: fail, setItem: fail, removeItem: fail } };
  assert.equal(storage.getItem('theme'), null);
  assert.doesNotThrow(() => storage.setItem('theme', 'dark'));
  assert.doesNotThrow(() => storage.removeItem('theme'));
});
