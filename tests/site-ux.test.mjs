import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);require('./register.cjs');
const {GUIDE_COVERS}=require('../lib/content/guide-covers.ts');
const {PUBLISHED_POSTS}=require('../lib/content/posts.ts');
const {VERIFIED_VIDEOS}=require('../lib/videos/verified.ts');

test('approved guide images resolve locally and the invented numeric bank score is excluded',()=>{
 assert.equal(GUIDE_COVERS['banka-ic-skor-nedir'],undefined);
 for(const [slug,src] of Object.entries(GUIDE_COVERS)){
  assert.ok(PUBLISHED_POSTS.some(p=>p.slug===slug),slug);
  assert.ok(src.startsWith('/content/'),src);
  assert.ok(fs.statSync('public'+src).size>1000,src);
 }
 assert.equal(GUIDE_COVERS['puanım-dusuk-kredi-cekmek-istiyorum'],'/content/puanim-dusuk-kredi.jpg');
});
test('the verified video archive has valid unique IDs, dated source URLs and local thumbnails',()=>{
 assert.ok(VERIFIED_VIDEOS.length>0);
 assert.equal(new Set(VERIFIED_VIDEOS.map(v=>v.id)).size,VERIFIED_VIDEOS.length);
 for(const video of VERIFIED_VIDEOS){
  assert.match(video.id,/^[A-Za-z0-9_-]{11}$/);
  assert.ok(video.title.trim().length>5);
  assert.equal(video.href,'https://www.youtube.com/watch?v='+video.id);
  assert.ok(Number.isFinite(Date.parse(video.publishedAt)));
  assert.ok(video.thumb.startsWith('/images/videos/'));
  const bytes=fs.readFileSync('public'+video.thumb);assert.equal(bytes[0],0xff);assert.equal(bytes[1],0xd8);
 }
});
