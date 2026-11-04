import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('./register.cjs');
const route = require('../app/rehber/[slug]/page.tsx');
const { POSTS } = require('../lib/content/posts.ts');
const slug = 'puanım-dusuk-kredi-cekmek-istiyorum';
const props = value => ({ params: Promise.resolve({ slug: value }) });

test('guide request boundary rejects malformed path encoding while leaving valid and double-encoded paths and query strings intact', () => {
  const { NextRequest } = require('next/server');
  const { proxy } = require('../proxy.ts');
  for (const segment of ['%', '%ZZ', '%C4', '%E0%A4%A']) {
    assert.equal(proxy(new NextRequest(`http://localhost/rehber/${segment}`)).status, 400);
  }
  for (const segment of [slug, encodeURIComponent(slug), encodeURIComponent(encodeURIComponent(slug)), 'missing-paket1-fixture', '?q=%ZZ']) {
    const response = proxy(new NextRequest(`http://localhost/rehber/${segment}`));
    assert.equal(response.headers.get('x-middleware-next'), '1');
    assert.equal(response.headers.get('location'), null);
  }
});

test('article route accepts raw and once-encoded Turkish segments with unchanged canonical and static params', async () => {
  assert.deepEqual(await route.generateStaticParams(), POSTS.map(post => ({ slug: post.slug })));
  for (const value of [slug, encodeURIComponent(slug), encodeURIComponent(slug).toLowerCase()]) {
    assert.ok(await route.default(props(value)));
    const metadata = await route.generateMetadata(props(value));
    assert.equal(metadata.alternates.canonical, `https://ulaskredi.com.tr/rehber/${encodeURIComponent(slug)}`);
    assert.equal(metadata.title, POSTS.find(post => post.slug === slug).title);
  }
});

test('article route decodes only once and keeps unknown, malformed and delimiter segments unavailable', async () => {
  for (const value of [encodeURIComponent(encodeURIComponent(slug)), 'missing-paket1-fixture', '%', '%C4', '%ZZ', '%E0%A4%A', '%2F', '%5C', '%00']) {
    await assert.rejects(route.default(props(value)), error => error.digest === 'NEXT_HTTP_ERROR_FALLBACK;404');
    assert.deepEqual(await route.generateMetadata(props(value)), {});
  }
});
