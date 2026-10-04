import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, lstatSync } from 'node:fs';
import { resolve, relative, dirname, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export function inventory(directory) {
  const root = resolve(directory); const entries = [];
  function walk(folder) {
    for (const item of readdirSync(folder)) {
      const absolute = resolve(folder, item); const info = lstatSync(absolute);
      if (info.isSymbolicLink()) throw new Error('Release artifacts must not contain symlinks');
      if (info.isDirectory()) walk(absolute);
      else if (info.isFile()) entries.push({path:relative(root,absolute).replaceAll('\\','/'),bytes:info.size,sha256:hash(readFileSync(absolute))});
    }
  }
  walk(root); return entries.sort((a,b) => a.path.localeCompare(b.path));
}
export function verifySnapshot(snapshot) {
  const manifest = JSON.parse(readFileSync(resolve(snapshot,'snapshot.json'),'utf8'));
  if (JSON.stringify(inventory(resolve(snapshot,'artifact'))) !== JSON.stringify(manifest.files)) throw new Error('Snapshot is incomplete, changed or has unexpected files');
  return manifest;
}
export function saveSnapshot(source, destination, kind = 'candidate') {
  if (existsSync(destination)) throw new Error('Choose a new snapshot directory; existing snapshots are never overwritten');
  const files = inventory(source);
  const build = JSON.parse(readFileSync(resolve(source,'build-info.json'),'utf8'));
  const routes = JSON.parse(readFileSync(resolve(source,'route-manifest.json'),'utf8'));
  if (!/^[a-f0-9]{64}$/.test(build.buildId)) throw new Error('Missing build identity');
  for (const file of files) {
    const target = resolve(destination,'artifact',file.path);
    mkdirSync(dirname(target),{recursive:true}); copyFileSync(resolve(source,file.path),target);
  }
  const manifest = {kind,createdAt:new Date().toISOString(),build,canonicalBase:routes[0].url.replace(/\/ro\/?$/,''),files};
  writeFileSync(resolve(destination,'snapshot.json'),JSON.stringify(manifest,null,2)+'\n');
  verifySnapshot(destination); return manifest;
}
export function restoreSnapshot(snapshot, destination) {
  const manifest = verifySnapshot(snapshot);
  if (existsSync(destination)) throw new Error('Restore requires a new directory; current dist is never overwritten');
  mkdirSync(destination,{recursive:true});
  for (const file of manifest.files) {
    const target = resolve(destination,file.path);
    mkdirSync(dirname(target),{recursive:true}); copyFileSync(resolve(snapshot,'artifact',file.path),target);
  }
  if (JSON.stringify(inventory(destination)) !== JSON.stringify(manifest.files)) throw new Error('Restored artifact differs from snapshot');
  return manifest;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [action, source, target] = process.argv.slice(2);
    const root = resolve('.release-archives');
    // Restore/copy operations are restricted to the explicit workspace archive.
    for (const directory of action === 'verify' ? [source] : action === 'save' ? [target] : [source,target]) {
      if (!directory || !resolve(directory).startsWith(root + sep)) throw new Error('Snapshot/restore paths must stay inside .release-archives');
    }
    if (action === 'save') console.log('Saved candidate snapshot: ' + saveSnapshot(source,target).build.buildId);
    else if (action === 'verify') console.log('Snapshot verified: ' + verifySnapshot(source).build.buildId);
    else if (action === 'restore') console.log('Restored and verified: ' + restoreSnapshot(source,target).build.buildId);
    else throw new Error('Usage: release-artifact.mjs save dist .release-archives/NAME | verify SNAPSHOT | restore SNAPSHOT NEW_DIRECTORY');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
