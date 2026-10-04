import test from 'node:test';
import assert from 'node:assert/strict';
import { releaseIssues } from '../../scripts/check-release.mjs';
const keys = ['clinical', 'professional', 'translations', 'privacy', 'providersAndAbuse', 'emailDelivery', 'domain', 'rollback'];
const verified = () => Object.fromEntries(keys.map(key => [key, { status: 'verified', evidence: 'review record', reviewer: 'reviewer', date: '2026-10-04' }]));
test('release fails closed for absent evidence and each missing prerequisite', () => {
  assert.equal(releaseIssues({}, []).length, 8);
  assert.deepEqual(releaseIssues(verified(), []), []);
  for (const key of keys) {
    const record = verified(); record[key].evidence = '';
    assert.ok(releaseIssues(record, []).some(issue => issue.startsWith(key + ':')));
  }
});
test('approval records cannot publish unresolved privacy placeholders in any language', () => {
  for (const marker of ['[DE CONFIRMAT]', '[TO CONFIRM]', '[DA CONFERMARE]', '[POR CONFIRMAR]']) assert.ok(releaseIssues(verified(), [marker]).includes('Privacy copy contains unresolved facts'));
});
