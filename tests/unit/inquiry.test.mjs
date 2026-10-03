import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(readFileSync('src/lib/inquiry.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {createSubmissionController,validateInquiry}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));

test('an optional message and names with diacritics are valid; missing name, email and excess text are rejected',()=>{
 assert.deepEqual(validateInquiry({name:"Ștefania D'Angelo",email:'reader@example.invalid',message:''}),{name:false,email:false,message:false});
 assert.deepEqual(validateInquiry({name:' ',email:'not an email',message:'x'.repeat(1001)}),{name:true,email:true,message:true});
});
test('missing provider configuration never sends and reports unavailable',async()=>{
 let calls=0;const states=[];const controller=createSubmissionController(async()=>{calls++;},state=>states.push(state),false);
 await controller.submit({message:''});assert.equal(calls,0);assert.deepEqual(states,[{status:'unavailable',pending:false}]);
});
test('a pending request prevents duplicates and a late accepted result resolves uncertainty',async()=>{
 let complete,calls=0;const states=[];
 const controller=createSubmissionController(()=>{calls++;return new Promise(resolve=>{complete=resolve;});},state=>states.push(state),true,10);
 const original=controller.submit({message:'draft'});await controller.submit({message:'duplicate'});await delay(25);
 assert.equal(calls,1);assert.deepEqual(states.at(-1),{status:'uncertain',pending:true});
 complete();await original;assert.deepEqual(states.at(-1),{status:'accepted',pending:false});
});
test('definite rejection permits an explicit retry but never retries automatically',async()=>{
 let calls=0;const states=[];const controller=createSubmissionController(async()=>{calls++;if(calls===1)throw {status:403};},state=>states.push(state),true);
 await controller.submit({message:'keep me'});assert.equal(calls,1);assert.equal(states.at(-1).status,'rejected');
 await controller.submit({message:'keep me'});assert.equal(calls,2);assert.equal(states.at(-1).status,'accepted');
});
test('network failure and provider server errors do not claim confirmed rejection',async()=>{
 for(const error of [new TypeError('network failure'),{status:500}]){
  const states=[];await createSubmissionController(async()=>{throw error;},state=>states.push(state),true).submit({});
  assert.deepEqual(states.at(-1),{status:'uncertain',pending:false});
 }
});
test('disposed form suppresses late results and clears uncertainty timers',async()=>{
 let complete;const states=[];const controller=createSubmissionController(()=>new Promise(resolve=>{complete=resolve;}),state=>states.push(state),true,10);
 const pending=controller.submit({});controller.dispose();await delay(25);complete();await pending;
 assert.deepEqual(states,[{status:'sending',pending:true}]);
});
