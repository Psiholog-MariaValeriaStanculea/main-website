import { build } from 'vite';
import { execFileSync } from 'node:child_process';

// Isolated artifact: dummy public identifiers and intercepted requests only.
// Never replace the reviewable production preview or use real provider keys.
Object.assign(process.env,{
 VITE_EMAILJS_SERVICE_ID:'test_service',
 VITE_EMAILJS_TEMPLATE_ID:'test_template',
 VITE_EMAILJS_PUBLIC_KEY:'test_public_key',
 PLAYWRIGHT_CONTACT_TESTS:'1',
});
await build({mode:'production',build:{outDir:'.contact-test-dist'}});
execFileSync(process.execPath,['scripts/postbuild-pages.mjs','--outDir','.contact-test-dist'],{stdio:'inherit',env:{...process.env,NODE_ENV:'development'}});
execFileSync(process.execPath,['node_modules/@playwright/test/cli.js','test'],{stdio:'inherit'});
