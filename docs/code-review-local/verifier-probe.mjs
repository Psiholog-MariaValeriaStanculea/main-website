import { checkLive } from '../../scripts/check-pages.mjs';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

// Synthetic stale deployment. No DNS lookup or outgoing HTTP request occurs.
const calls=[];
const {buildId}=JSON.parse(readFileSync('dist/build-info.json','utf8'));
const staleHtml='<html lang="ro"><head><title>OLD RELEASE</title><script type="module" src="/main-website/assets/old-release.js"></script><link rel="stylesheet" href="/main-website/assets/old-release.css"></head><body><main><h1>OLD RELEASE</h1></main></body></html>';
let rejection='';
await assert.rejects(checkLive('http://127.0.0.1:4199/main-website/',async url=>{
 calls.push(String(url));
 const path=new URL(url).pathname;
 return new Response(path.endsWith('.js')?'console.log("old release")':path.endsWith('.css')?'body{color:black}':staleHtml,{status:200,headers:{'Content-Type':path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':'text/html'}});
},{buildId}),error=>{rejection=error.message;return /Build identity mismatch/.test(rejection);});
writeFileSync('docs/code-review-local/verifier-fix-results.json',JSON.stringify({rejection,syntheticOldReleaseRejected:true,externalNetworkRequests:0,calls},null,2)+'\n');
console.log(rejection);
