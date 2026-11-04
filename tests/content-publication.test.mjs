import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('./register.cjs');
const { POSTS, PUBLISHED_POSTS } = require('../lib/content/posts.ts');
const { publication, SOURCE_CHECK_DATE } = require('../lib/content/publication.ts');
const { generateMetadata } = require('../app/rehber/[slug]/page.tsx');

test('content inventory has unique slugs and bodies, complete dates and explicit source-checked publication states', () => {
  assert.equal(POSTS.length, 65);
  assert.equal(PUBLISHED_POSTS.length, 8);
  const hashes = new Set();
  for (const post of POSTS) {
    assert.ok(post.title.trim() && post.excerpt.trim());
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(post.date).toISOString().slice(0, 10), post.date);
    assert.ok(!/[\s/%?#]/.test(post.slug), post.slug);
    const hash = createHash('sha256').update(JSON.stringify(post.content)).digest('hex');
    assert.ok(!hashes.has(hash), `Duplicate body: ${post.slug}`); hashes.add(hash);
    const review = publication(post);
    assert.ok(review.updateResponsibility);
    if (review.status === 'published') {
      assert.equal(review.sourceCheckedAt, SOURCE_CHECK_DATE);
      assert.ok(review.sources.length);
      assert.ok(review.sources.every(source => new URL(source.url).protocol === 'https:'));
    } else { assert.equal(review.sourceCheckedAt, null); assert.ok(review.reason); }
  }
});

test('canonical host cannot be changed by SITE_URL and unreviewed articles stay noindex', async () => {
  const previous = process.env.SITE_URL;
  try {
    process.env.SITE_URL = 'https://www.example.invalid';
    for (const post of POSTS) {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
      assert.equal(metadata.alternates.canonical, `https://ulaskredi.com.tr/rehber/${encodeURIComponent(post.slug)}`);
      if (publication(post).status !== 'published') assert.equal(metadata.robots.index, false);
    }
  } finally { if (previous === undefined) delete process.env.SITE_URL; else process.env.SITE_URL = previous; }
});

test('source-corrected articles do not claim universal 1300 thresholds or that a credit application itself lowers the score', () => {
  const visible = PUBLISHED_POSTS.map(post => JSON.stringify(post)).join('\n');
  assert.ok(!visible.includes('1300'));
  assert.ok(!visible.includes('Bu davranış puanı daha da baskılar'));
  const report = PUBLISHED_POSTS.find(post => post.slug === 'e-devlet-kredi-notu-dogru-mu');
  assert.ok(report.excerpt.includes('aynı ürün değildir'));
});
