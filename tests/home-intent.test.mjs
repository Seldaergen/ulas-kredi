import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {JSDOM} from 'jsdom';
const require=createRequire(import.meta.url);require('./register.cjs');
test('consultancy entry points lead to existing need explanations without requesting personal data',()=>{
 const Hero=require('../components/home/HeroSection.tsx').default;
 const Scope=require('../components/home/TrustSection.tsx').default;
 const dom=new JSDOM(renderToStaticMarkup(React.createElement(React.Fragment,null,React.createElement(Hero),React.createElement(Scope))));
 try{const doc=dom.window.document;assert.match(doc.querySelector('h1').textContent,/Yüksek limitli kredi/);assert.equal(doc.querySelectorAll('.cro-start').length,0);assert.equal(doc.querySelectorAll('.cro-finance-art').length,1);for(const link of doc.querySelectorAll('.cro-needs-grid a[href^="#"]'))assert.equal(link.getAttribute('href'),'#iletisim');assert.equal(doc.querySelectorAll('form,input,select,textarea').length,0);assert.match(doc.body.textContent,/Banka veya kredi veren kuruluş değiliz/);}finally{dom.window.close();}
});
test('FAQ structured answers are exactly the visible answers and have keyboard-native summaries',()=>{
 const Faq=require('../components/home/FaqOptimized.tsx').default;
 const dom=new JSDOM(renderToStaticMarkup(React.createElement(Faq)));
 try{const doc=dom.window.document;const schema=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);const rows=[...doc.querySelectorAll('details')];assert.equal(schema.mainEntity.length,rows.length);assert.ok(rows.length>=4);for(const [i,row] of rows.entries()){assert.equal(schema.mainEntity[i].name,row.querySelector('summary').textContent.replace('+',''));assert.equal(schema.mainEntity[i].acceptedAnswer.text,row.querySelector('p').textContent);}}finally{dom.window.close();}
});
