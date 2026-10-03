import { defineConfig } from '@playwright/test';
import base from './playwright.config';

// Dimensions are CSS pixels. DPR models raster density, not a native OS.
const profiles = [
 ['folded-narrow',280,653,2,true], ['small-phone',320,568,2,true],
 ['android-sized',360,800,3,true], ['phone-retina',390,844,3,true], ['large-phone',430,932,3,true],
 ['short-landscape',653,280,2,true], ['phone-landscape',844,390,3,true],
 ['fold-half',540,720,2,true], ['fold-open',717,512,2,true],
 ['tablet-portrait',768,1024,2,true], ['tablet-large',820,1180,2,true],
 ['tablet-landscape',1024,768,2,true], ['tablet-short',1024,600,2,true], ['tablet-wide',1180,820,2,true],
 ['before-sm',639,900,1,false], ['at-sm',640,900,1,false], ['before-md',767,900,1,false],
 ['before-lg',1023,900,1,false], ['before-xl',1279,900,1,false], ['at-xl',1280,900,1,false],
 ['laptop',1366,768,1,false], ['desktop-retina',1440,900,2,false], ['scaled-desktop',1536,864,1.25,false],
 ['full-hd',1920,1080,1,false], ['qhd',2560,1440,1,false],
 ['ultrawide',3440,1440,1,false], ['super-ultrawide',3840,1080,1,false], ['4k',3840,2160,1,false],
] as const;
const channels=(process.env.RESPONSIVE_CHANNELS || '').split(',').filter(Boolean);
if(channels.some(channel=>!['chrome','msedge'].includes(channel)))throw new Error('Use installed chrome or msedge channels only.');
export default defineConfig({
 ...base, testDir:'./tests/responsive',testIgnore:[],workers:2,timeout:60000,
 outputDir:'responsive-test-results',
 reporter:[['list'],['html',{open:'never',outputFolder:'responsive-playwright-report'}]],
 use:{...base.use,baseURL:base.use!.baseURL!.replace(':4180',':4183'),launchOptions:{ignoreDefaultArgs:['--hide-scrollbars']}},
 projects:[
  ...profiles.map(([name,width,height,deviceScaleFactor,touch])=>({name,use:{browserName:'chromium' as const,viewport:{width,height},deviceScaleFactor,isMobile:touch,hasTouch:touch},testMatch:'matrix.spec.ts'})),
  ...channels.flatMap(channel=>profiles.filter(([name])=>['folded-narrow','phone-landscape','at-xl','ultrawide'].includes(name)).map(([name,width,height,deviceScaleFactor,touch])=>({name:channel+'-'+name,use:{browserName:'chromium' as const,channel,viewport:{width,height},deviceScaleFactor,isMobile:touch,hasTouch:touch},testMatch:'matrix.spec.ts'}))),
  {name:'device-scenarios',use:{browserName:'chromium',viewport:{width:717,height:512},hasTouch:true,isMobile:true},testMatch:'scenarios.spec.ts'},
 ],
 webServer:{...base.webServer,command:'node scripts/serve-pages.mjs --root dist --port 4183',url:base.use!.baseURL!.replace(':4180',':4183'),reuseExistingServer:false},
});
