import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
export function releaseIssues(record, copies) {
  const issues = [];
  for (const key of ['clinical', 'professional', 'translations', 'privacy', 'providersAndAbuse', 'emailDelivery', 'domain', 'rollback']) {
    const entry = record[key];
    if (entry?.status !== 'verified' || !entry.evidence?.trim() || !entry.reviewer?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date || '')) issues.push(`${key}: verified evidence, reviewer and date required`);
  }
  if (copies.some(copy => /\[(?:DE CONFIRMAT|TO CONFIRM|DA CONFERMARE|POR CONFIRMAR)\]/.test(copy))) issues.push('Privacy copy contains unresolved facts');
  return issues;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const record = JSON.parse(readFileSync('docs/release-readiness.json', 'utf8'));
  const copies = ['ro', 'en', 'it', 'es'].map(language => readFileSync(`src/locales/${language}/editorial.json`, 'utf8'));
  const issues = releaseIssues(record, copies);
  if (issues.length) { console.error('Release remains blocked:\n' + issues.join('\n')); process.exitCode = 1; }
  else console.log('Documented release checks passed. Existing repository approvals and EmailJS configuration are also required.');
}
