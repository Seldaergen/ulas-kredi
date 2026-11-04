import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url); require('./register.cjs');
const {loanPayment,monthlyBudget}=require('../lib/calculators.ts');
test('amortization agrees with independent repayment simulation, zero and near zero rates',()=>{
 for(const [p,r,n] of [[200000,3.49,24],[100000,0,12],[100000,1e-10,360],[1,20,1],[10000000,20,360]]) {
 const result=loanPayment(p,r,n); assert.ok(result);
 let presentValue=0; for(let i=1;i<=n;i++) presentValue+=result.monthly/(1+r/100)**i;
 assert.ok(Math.abs(presentValue-p)<Math.max(.01,p*1e-6),String(presentValue));
 assert.ok(Math.abs(result.total-result.monthly*n)<.001);
 }
 assert.equal(loanPayment(1200,0,12).monthly,100);
});
test('calculator invalid boundaries never produce misleading results; budget supports deficit',()=>{
 for(const args of [[NaN,1,12],[0,1,12],[-1,1,12],[1,-1,12],[1,21,12],[1,1,0],[1,1,1.5],[1,1,361],[Infinity,1,12]]) assert.equal(loanPayment(...args),null);
 assert.deepEqual(monthlyBudget(100,150),{remaining:-50,ratio:150});
 assert.equal(monthlyBudget(0,0),null); assert.equal(monthlyBudget(NaN,0),null); assert.equal(monthlyBudget(100,-1),null);
});
