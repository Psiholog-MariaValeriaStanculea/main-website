import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, relative, extname, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { parseDocument } from 'yaml';

const root=process.cwd();
const excluded=new Set(['.git','.release-archives','node_modules','dist','dist-ssr','.contact-test-dist','.tmp-fonttools','playwright-report','test-results','contact-test-results','contact-playwright-report','responsive-test-results','responsive-playwright-report','blob-report','coverage','.cache','.vite','__pycache__']);
const paths=[];const excludedDirectories=[];
function walk(directory){
 for(const entry of readdirSync(directory,{withFileTypes:true})){
  const absolute=resolve(directory,entry.name);const path=relative(root,absolute).replaceAll('\\','/');
  if(entry.isDirectory()){
   if(excluded.has(entry.name)){excludedDirectories.push(path);continue;}
   walk(absolute);
  }else if(entry.isFile())paths.push(path);
 }
}
walk(root);paths.sort();
const tracked=new Set(execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean));
const issues=[];const notes=[];const files=[];let jsonCount=0,yamlCount=0,importCount=0,assetCount=0,assetReferenceCount=0;
const textExtensions=new Set(['.ts','.tsx','.js','.mjs','.css','.html','.json','.md','.txt','.xml','.yml','.yaml','.py','.svg']);
const resolveImport=(path,specifier)=>{
 const base=specifier.startsWith('@/')?resolve(root,'src',specifier.slice(2)):resolve(root,dirname(path),specifier);
 return ['', '.ts','.tsx','.js','.mjs','.json','.css','.d.ts','/index.ts','/index.tsx','/index.js'].some(suffix=>existsSync(base+suffix));
};
for(const path of paths){
 const bytes=readFileSync(resolve(root,path));const extension=extname(path);const text=bytes.toString('utf8');
 const temporary=path.startsWith('.tmp-')||extension==='.tsbuildinfo';
 const environment=path.startsWith('.env');
 files.push({path,bytes:statSync(resolve(root,path)).size,tracked:tracked.has(path),category:temporary?'generated legacy file':environment?'environment template':path.startsWith('docs/')?'documentation/evidence':path.startsWith('public/')||path.startsWith('src/assets/')?'asset':'source/configuration',sha256:environment||path==='docs/project-file-inventory.json'?null:createHash('sha256').update(bytes).digest('hex')});
 if(textExtensions.has(extension)&&text.includes('\uFFFD'))issues.push(path+': invalid UTF-8 replacement character');
 if(extension==='.json'){
  jsonCount++;
  try{
   if(path.startsWith('tsconfig')){const parsed=ts.parseConfigFileTextToJson(path,text);if(parsed.error)throw new Error(ts.flattenDiagnosticMessageText(parsed.error.messageText,' '));}
   else JSON.parse(text);
  }catch(error){issues.push(path+': '+error.message);}
 }
 if(['.yaml','.yml'].includes(extension)){
  yamlCount++;const document=parseDocument(text);for(const error of document.errors)issues.push(path+': '+error.message);
 }
 if(['.ts','.tsx','.js','.mjs'].includes(extension)){
  const source=ts.createSourceFile(path,text,ts.ScriptTarget.Latest,true);
  for(const node of source.statements){
   if(!ts.isImportDeclaration(node)&&!ts.isExportDeclaration(node))continue;
   const specifier=node.moduleSpecifier;if(!specifier||!ts.isStringLiteral(specifier))continue;
   if(!specifier.text.startsWith('.')&&!specifier.text.startsWith('@/'))continue;
   importCount++;if(!resolveImport(path,specifier.text))issues.push(path+': unresolved local import '+specifier.text);
  }
 }
 if(['.png','.jpg','.webp','.woff2','.ico'].includes(extension)){
  assetCount++;
  const png=bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpeg=bytes[0]===255&&bytes[1]===216;
  const webp=bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP';
  const woff=bytes.subarray(0,4).toString()==='wOF2';
  const ico=bytes.subarray(0,4).equals(Buffer.from([0,0,1,0]));
  const valid=extension==='.woff2'?woff:extension==='.webp'?webp:extension==='.ico'?ico||png:png||jpeg;
  if(!valid)issues.push(path+': unrecognized binary signature');
  else if(extension==='.png'&&jpeg)notes.push(path+': valid JPEG with legacy PNG extension; existing public URL preserved.');
 }
 if(['.ts','.tsx','.html'].includes(extension)){
  for(const match of text.matchAll(/(?:images|lovable-uploads)\/[\w.-]+\.(?:png|jpg|webp|svg|ico)/g)){
   assetReferenceCount++;if(!existsSync(resolve(root,'public',match[0])))issues.push(path+': missing public asset '+match[0]);
  }
 }
}
const generatedTracked=files.filter(file=>file.category==='generated legacy file'&&file.tracked).map(file=>file.path);
const report={scope:'All workspace files except dependencies, Git internals, build artifacts, test reports and caches. This is structural/file validation, not a line-by-line security review.',checkedFiles:files.length,jsonCount,yamlCount,importCount,assetCount,assetReferenceCount,excludedDirectories,generatedTracked,notes,issues,files};
if(process.argv.includes('--report')){mkdirSync('docs',{recursive:true});writeFileSync('docs/project-file-inventory.json',JSON.stringify(report,null,2)+'\n');}
console.log(`Files: ${files.length}; JSON/JSONC: ${jsonCount}; YAML: ${yamlCount}; local imports: ${importCount}; binary asset signatures: ${assetCount}; public asset references: ${assetReferenceCount}.`);
console.log(`Previously tracked generated files: ${generatedTracked.length}. Adding ignore rules does not remove them from Git's index.`);
for(const note of notes)console.log(note);
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}else console.log('Structural file checks passed.'+(process.argv.includes('--report')?' Inventory: docs/project-file-inventory.json':''));
