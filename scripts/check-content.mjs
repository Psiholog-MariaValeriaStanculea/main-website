import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import ts from 'typescript';

export const languages = ['ro', 'en', 'it', 'es'];
const read = (language, file) => JSON.parse(readFileSync(`src/locales/${language}/${file}.json`, 'utf8'));
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, shape(value[key])]));
  assert.equal(typeof value, 'string', 'Content leaves must be strings');
  assert.ok(value.trim(), 'Empty copy');
  return 'string';
}
const reference = read('ro', 'editorial');
const about = read('ro', 'master-about');
for (const language of languages) {
  const copy = read(language, 'editorial');
  const biography = read(language, 'master-about');
  assert.deepEqual(shape(copy), shape(reference), `${language}: missing keys or different editorial list length`);
  for (const key of ['privacySections', 'cookieSections', 'termsSections']) {
    assert.deepEqual(copy.legal[key].map(section => section.id), reference.legal[key].map(section => section.id), `${language}: legal section order`);
    assert.equal(new Set(copy.legal[key].map(section => section.id)).size, copy.legal[key].length, `${language}: legal anchors must be unique`);
  }
  assert.deepEqual(biography.sections.map(section => section.id), about.sections.map(section => section.id), `${language}: About section order`);
  assert.equal(biography.professional.groups.length, about.professional.groups.length, `${language}: professional groups`);
  assert.deepEqual(copy.services.items.map(item => [item.id, item.category]), reference.services.items.map(item => [item.id, item.category]), `${language}: service mapping`);
  assert.equal(new Set(copy.services.items.map(item => item.id)).size, 7);
  // Paragraph grouping differs in translated biographies; dates, hours and names do not.
  const text = JSON.stringify(biography);
  for (const token of new Set(JSON.stringify(about).match(/\b\d{1,4}\b/g))) assert.ok(new RegExp(`\\b${token}\\b`).test(text), `${language}: missing professional number ${token}`);
  for (const name of ['ARPI', 'APRICAS', 'CogniKit', 'NEPSY', 'Adebowale', 'Porumbu', 'Chiriac']) assert.ok(text.includes(name), `${language}: missing professional name ${name}`);
}
// Check article IDs in every language without executing browser-specific configuration.
const source = ts.createSourceFile('blogPosts.ts', readFileSync('src/data/blogPosts.ts', 'utf8'), ts.ScriptTarget.Latest, true);
const declarations = source.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]);
const articles = declarations.find(node => node.name.getText(source) === 'localizedPostContent').initializer;
for (const language of languages) {
  const locale = articles.properties.find(node => node.name.getText(source) === language);
  assert.deepEqual(locale.initializer.properties.map(node => node.name.text), ['1', '2', '3', '4', '5', '6'], `${language}: missing article`);
}
for (const language of languages) {
  for (const historical of ['about', 'blog', 'common', 'contact', 'faq', 'home', 'local', 'navigation', 'services']) assert.ok(!existsSync(`src/locales/${language}/${historical}.json`), `Historical copy reintroduced: ${language}/${historical}`);
}
console.log('Content checks passed: four locale schemas, service IDs, About sections, professional numbers/names and 24 articles. Editorial/clinical approval is separate.');
