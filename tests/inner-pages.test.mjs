import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const require=createRequire(import.meta.url);require('./register.cjs');
const Directory=require('../app/rehber/rehber-client.tsx').default;
const {PUBLISHED_POSTS}=require('../lib/content/posts.ts');
test('guide directory SSR shows each published article once and keeps Turkish search discoverable',()=>{
 const all=renderToStaticMarkup(React.createElement(Directory));
 assert.equal((all.match(/class="ef-guide-card"/g)??[]).length,PUBLISHED_POSTS.length);
 assert.match(all,/method="get"/);assert.match(all,/aria-label="Rehber konuları"/);
 const searched=renderToStaticMarkup(React.createElement(Directory,{query:'BANKA İÇ'}));
 assert.match(searched,/Banka İç Skoru/);assert.equal((searched.match(/class="ef-guide-card"/g)??[]).length,1);
 const missing=renderToStaticMarkup(React.createElement(Directory,{query:'package5-no-result-fixture'}));
 assert.match(missing,/rehber bulunamadı/);assert.equal((missing.match(/class="ef-guide-card"/g)??[]).length,0);
});
test('published guide retains canonical/schema metadata and uses the existing brand image for sharing',async()=>{
 const {generateMetadata}=require('../app/rehber/[slug]/page.tsx');
 const metadata=await generateMetadata({params:Promise.resolve({slug:'banka-ic-skor-nedir'})});
 assert.equal(metadata.alternates.canonical,'https://ulaskredi.com.tr/rehber/banka-ic-skor-nedir');
 assert.ok(JSON.stringify(metadata.openGraph.images).includes('/electric-finance-og.png'));
});
