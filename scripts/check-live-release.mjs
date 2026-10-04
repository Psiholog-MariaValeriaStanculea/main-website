import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { lookup } from 'node:dns/promises';
import https from 'node:https';
import { createHash } from 'node:crypto';
import { resolve,dirname } from 'node:path';
const outputArg=process.argv.indexOf('--output');
const output=resolve(outputArg===-1?'docs/qa/live-release-2026-10-04.json':process.argv[outputArg+1]);
const base = new URL('https://psiholog-mariavaleriastanculea.github.io/main-website/');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const routes = JSON.parse(readFileSync('dist/route-manifest.json', 'utf8'));
const expected = JSON.parse(readFileSync('dist/build-info.json', 'utf8')).buildId;
const certificate = await new Promise((resolve, reject) => {
  const request = https.get(base, response => {
    const peer = response.socket.getPeerCertificate();
    resolve({authorised:response.socket.authorized,subject:peer.subject,issuer:peer.issuer,validFrom:peer.valid_from,validTo:peer.valid_to}); response.resume();
  }); request.on('error',reject); request.setTimeout(15000,() => request.destroy(new Error('TLS check timeout')));
});
const pages = []; const assetUrls = new Set();
const paths = ['', ...routes.map(route => route.path.replace(/^\//,'')+'/'), 'build-info.json', 'pagina-inexistenta-2026-10-04/'];
// Read-only requests; no form or provider calls.
for (let offset=0; offset<paths.length; offset+=6) {
  await Promise.all(paths.slice(offset,offset+6).map(async path => {
    const response = await fetch(new URL(path,base),{signal:AbortSignal.timeout(15000),cache:'no-store'});
    const body = await response.text();
    const marker = body.match(/name="site-build-id"\s+content="([a-f0-9]+)"/)?.[1] || null;
    pages.push({path,status:response.status,url:response.url,language:body.match(/<html[^>]*lang="([^"]+)"/)?.[1],canonical:body.match(/rel="canonical"[^>]*href="([^"]+)"/)?.[1],buildId:marker,matchesCandidate:marker===expected,sha256:hash(body)});
    for(const match of body.matchAll(/(?:src|href)="([^" ]+\.(?:js|css))"/g)){
      const asset = new URL(match[1],response.url);
      if(asset.origin===base.origin&&asset.pathname.startsWith(base.pathname+'assets/')) assetUrls.add(asset.href);
    }
  }));
}
const assets = await Promise.all([...assetUrls].map(async url => {
  const response=await fetch(url,{signal:AbortSignal.timeout(15000)});const bytes=Buffer.from(await response.arrayBuffer());
  return {url,status:response.status,type:response.headers.get('content-type'),bytes:bytes.length,sha256:hash(bytes)};
}));
const http = await fetch(new URL(base.href.replace('https:','http:')),{redirect:'manual',signal:AbortSignal.timeout(15000)});
let customDomain;
try {customDomain={host:'valeriastanculea.ro',dns:await lookup('valeriastanculea.ro',{all:true}),ownership:'unverified',selection:'source-document candidate; user has not confirmed cutover'};}
catch(error){customDomain={host:'valeriastanculea.ro',dnsError:error.code,ownership:'unverified',selection:'source-document candidate; user has not confirmed cutover'};}
const report={checkedAt:new Date().toISOString(),base:base.href,expectedCandidateBuild:expected,githubDns:await lookup(base.hostname,{all:true}),certificate,httpRedirect:{status:http.status,location:http.headers.get('location')},customDomain,pages:pages.sort((a,b)=>a.path.localeCompare(b.path)),assets};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({pages:pages.length,statuses:pages.reduce((counts,page)=>(counts[page.status]=(counts[page.status]||0)+1,counts),{}),assets:assets.length,tlsAuthorised:certificate.authorised,httpRedirect:report.httpRedirect,customDomain,candidatePublished:pages.some(page=>page.matchesCandidate)},null,2));
