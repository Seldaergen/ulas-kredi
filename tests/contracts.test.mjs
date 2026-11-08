import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('./register.cjs');
const { POSTS, getPost } = require('../lib/content/posts.ts');
const baseline = '5a769730a515f4ef687879cbd0dd36d532be90a3';
const read = file => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const original = file => execFileSync('git', ['show', `${baseline}:${file}`], { encoding: 'utf8' }).replace(/\r\n/g, '\n');

test('all 65 article sources are retained and registered; only explicitly reviewed source corrections differ from HEAD', () => {
  const files = fs.readdirSync('lib/content/posts').filter(file => file.endsWith('.ts'));
  assert.equal(files.length, 65);
  const corrected = new Set(['puanım-dusuk-kredi-cekmek-istiyorum.ts', 'banka-ic-skor-nedir.ts', 'e-devlet-kredi-notu-dogru-mu.ts', 'kredi-notu-sorgulama-sikligi-zararli-mi.ts', 'kredi-yapilandirma-nedir.ts', 'kredi-maliyeti-toplam-geri-odeme-nasil-bakilir.ts']);
  for (const file of files) if (!corrected.has(file)) assert.equal(read(`lib/content/posts/${file}`), original(`lib/content/posts/${file}`), file);
  assert.equal(POSTS.length, 65);
  assert.equal(new Set(POSTS.map(post => post.slug)).size, 65);
  for (const file of files) {
    const source = Object.values(require(`../lib/content/posts/${file}`))[0];
    assert.equal(getPost(source.slug), source, file);
  }
  for (const post of POSTS) assert.equal(getPost(post.slug), post);
  assert.equal(getPost('missing-paket1-fixture'), null);
  assert.equal(getPost('banka-ic-skor-nedir').slug, 'banka-ic-skor-nedir');
});

test('market/health APIs remain unchanged; legacy contact path shares the durable application handler', () => {
  for (const file of ['app/api/rates/route.ts', 'app/api/finance/route.ts', 'app/api/health/route.ts']) {
    assert.equal(read(file), original(file), file);
  }
  assert.equal(require('../app/api/contact/route.ts').POST, require('../app/api/applications/route.ts').POST);
});

test('existing static routes and essential contact destinations remain', () => {
  for (const route of ['', 'hizmetler', 'nasil-calisir', 'iletisim', 'rehber', 'soru-cevap', 'kvkk', 'gizlilik', 'cerez', 'yasal-uyari']) {
    assert.ok(fs.existsSync(`app/${route ? `${route}/` : ''}page.tsx`), route);
  }
  const contact = read('components/contact.tsx');
  assert.ok(contact.includes('ApplicationForm channel="CONTACT_FORM"'));
  assert.ok(read('components/home/HeroSection.tsx').includes('Danışmanla Görüş'));
  assert.ok(read('app/page.tsx').includes('<Contact embedded />'));
  assert.ok(!read('components/home/HeroSection.tsx').includes('<ApplicationForm'));
  for (const marker of ['905416061356', 'info@ulaskredi.com.tr', 'https://wa.me/', 'tel:+']) assert.ok(contact.includes(marker));
});

test('health route reports service without credentials or database access', async () => {
  const { GET } = require('../app/api/health/route.ts');
  const response = await GET();
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.service, 'ulas-kredi');
  assert.deepEqual(Object.keys(body).sort(), ['ok', 'service', 'ts']);
});
