import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { saveSnapshot, verifySnapshot, restoreSnapshot } from '../../scripts/release-artifact.mjs';
test('rollback preserves hidden files and exact bytes, rejects corruption and overwrite', () => {
  const root = mkdtempSync(join(tmpdir(),'website-artifact-'));
  try {
    const source=join(root,'source'),snapshot=join(root,'snapshot'),restored=join(root,'restored');
    mkdirSync(source);
    writeFileSync(join(source,'build-info.json'),JSON.stringify({buildId:'a'.repeat(64),contactConfigured:false}));
    writeFileSync(join(source,'route-manifest.json'),JSON.stringify([{url:'https://example.test/main-website/ro'}]));
    writeFileSync(join(source,'.nojekyll'),'');
    writeFileSync(join(source,'index.html'),'original HTML');
    saveSnapshot(source,snapshot); restoreSnapshot(snapshot,restored);
    assert.equal(readFileSync(join(restored,'index.html'),'utf8'),'original HTML');
    assert.ok(verifySnapshot(snapshot).files.some(file => file.path === '.nojekyll'));
    assert.throws(() => restoreSnapshot(snapshot,restored),/new directory/);
    assert.throws(() => saveSnapshot(source,snapshot),/never overwritten/);
    writeFileSync(join(snapshot,'artifact','index.html'),'changed');
    assert.throws(() => verifySnapshot(snapshot),/changed/);
    assert.throws(() => restoreSnapshot(snapshot,join(root,'bad-restore')),/changed/);
  } finally { rmSync(root,{recursive:true,force:true}); }
});
