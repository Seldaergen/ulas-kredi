import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { seoSnapshot } from './seo-snapshot.mjs';
const require = createRequire(import.meta.url);
require('../tests/register.cjs');
const { POSTS, PUBLISHED_POSTS } = require('../lib/content/posts.ts');
const { publication } = require('../lib/content/publication.ts');
const site = 'https://ulaskredi.com.tr';
const pages = ['/', '/hizmetler', '/nasil-calisir', '/iletisim', '/rehber', '/videolar', '/kvkk', '/gizlilik', '/cerez', '/yasal-uyari'];
const expectedSitemap = new Set([...pages, ...PUBLISHED_POSTS.map(post => `/rehber/${encodeURIComponent(post.slug)}`)].map(route => new URL(route, site).href));
const socket = net.createServer();
await new Promise((resolve, reject) => { socket.once('error', reject); socket.listen(0, '127.0.0.1', resolve); });
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const allowed = ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL', 'SYSTEMROOT', 'COMSPEC'];
const env = Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]]));
env.NEXT_TELEMETRY_DISABLED = '1';
if (process.env.ELECTRIC_FINANCE_STAGING === 'true') env.ELECTRIC_FINANCE_STAGING = 'true';
const server = spawn(process.execPath, ['--max-old-space-size=256', path.resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { env, stdio: ['ignore', 'ignore', 'pipe'] });
let failure;
let stderr = '';
server.on('error', error => { failure = error; });
server.stderr.on('data', chunk => { stderr = (stderr + chunk).slice(-8192); });
const get = (route, options = {}) => fetch(origin + route, { headers: { 'User-Agent': 'Googlebot' }, signal: AbortSignal.timeout(15000), ...options });
const cache = new Map();
async function documentAt(route) {
  const normalized = new URL(route, origin);
  const key = normalized.pathname + normalized.search;
  if (!cache.has(key)) {
    const response = await get(key);
    const html = await response.text();
    const dom = new JSDOM(html, { url: new URL(key, site).href });
    try {
      cache.set(key, { status: response.status, doc: seoSnapshot(dom.window.document), contentType: response.headers.get('content-type') });
    } finally {
      dom.window.close();
    }
  }
  return cache.get(key);
}
try {
  let ready = false;
  for (let i = 0; i < 150; i++) {
    if (failure) throw failure;
    if (server.exitCode !== null) throw Error(stderr);
    try { const response = await get('/api/health'); await response.arrayBuffer(); if (response.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'Production server ready');
  const robots = await get('/robots.txt');
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/ulaskredi\.com\.tr\/sitemap\.xml/);
  const sitemap = await get('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  const xmlDom = new JSDOM(await sitemap.text(), { contentType: 'application/xml' });
  const xml = xmlDom.window.document;
  assert.equal(xml.documentElement.namespaceURI, 'http://www.sitemaps.org/schemas/sitemap/0.9');
  const locations = [...xml.querySelectorAll('url > loc')].map(node => node.textContent);
  assert.equal(locations.length, new Set(locations).size);
  assert.deepEqual(new Set(locations), expectedSitemap);
  xmlDom.window.close();
  console.log(`PASS robots + valid XML sitemap: ${locations.length} indexable URLs`);

  for (const url of locations) {
    const route = new URL(url).pathname;
    const { status, doc } = await documentAt(route);
    assert.equal(status, 200, route);
    assert.ok(doc.querySelector('h1')?.textContent.trim(), `${route}: SSR h1`);
    assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1, `${route}: one canonical`);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, url, route);
    assert.ok(doc.querySelector('meta[name="description"]')?.content, `${route}: description`);
    assert.equal(new URL(doc.querySelector('meta[property="og:url"]')?.content ?? 'about:blank').href, url, `${route}: OG URL`);
    assert.ok(doc.querySelector('meta[property="og:title"]')?.content, `${route}: OG title`);
    assert.ok(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'), `${route}: indexable`);
    const image = doc.querySelector('meta[property="og:image"]')?.content;
    assert.ok(image, `${route}: OG image`);
    const imageUrl = new URL(image);
    assert.equal(imageUrl.origin, site);
    const imageResponse = await get(imageUrl.pathname);
    await imageResponse.body?.cancel();
    assert.equal(imageResponse.status, 200, image);
  }
  console.log(`PASS canonical, description, OG image/URL and SSR heading: ${locations.length}/${locations.length}`);
  const listing = await documentAt('/rehber');
  for (const post of PUBLISHED_POSTS) assert.ok([...listing.doc.querySelectorAll('a[href]')].some(anchor => new URL(anchor.href).pathname === `/rehber/${encodeURIComponent(post.slug)}`), `SSR listing: ${post.slug}`);
  const filtered = await documentAt('/rehber?topic=yapilandirma');
  assert.ok(filtered.doc.querySelector('h1'));
  assert.ok(filtered.doc.querySelector('a[href*="kredi-yapilandirma-nedir"]'));
  assert.ok(!filtered.doc.querySelector('a[href*="/rehber/banka-ic-skor-nedir"]'), 'SSR topic filter');
  for (const post of POSTS) {
    const route = `/rehber/${encodeURIComponent(post.slug)}`;
    const { status, doc } = await documentAt(route);
    assert.equal(status, 200, route);
    const review = publication(post);
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent));
    const article = schemas.find(schema => schema['@type'] === 'Article');
    if (review.status === 'published') {
      assert.ok(article, route);
      assert.equal(article.mainEntityOfPage['@id'], new URL(route, site).href);
      assert.equal(article.datePublished, post.date);
      assert.equal(article.dateModified, review.modified);
      assert.deepEqual(article.citation, review.sources.map(source => source.url));
      assert.ok(doc.querySelector('a[href="/iletisim#iletisim"]'), `${route}: application CTA`);
      assert.ok(doc.querySelector('a[href^="/hizmetler"]'), `${route}: services`);
    } else {
      assert.ok(doc.querySelector('meta[name="robots"]')?.content.includes('noindex'), route);
      assert.equal(article, undefined, `${route}: no unreviewed Article schema`);
      assert.ok(doc.body.textContent.includes('İçerik kaynak kontrolünde'));
      for (const block of post.content.filter(block => block.type === 'p')) assert.ok(!doc.querySelector('main')?.textContent.includes(block.text), `${route}: unverified body withheld`);
    }
  }
  console.log(`PASS registry HTTP + publication/schema policy: ${POSTS.length} retained URLs, ${PUBLISHED_POSTS.length} published`);

  await documentAt('/soru-cevap');
  const queue = [...cache.keys()];
  const checked = new Set();
  let links = 0;
  for (let i = 0; i < queue.length; i++) {
    const route = queue[i];
    if (checked.has(route)) continue;
    checked.add(route);
    const { status, doc, contentType } = await documentAt(route);
    assert.equal(status, 200, route);
    if (!contentType?.includes('text/html')) continue;
    for (const anchor of doc.querySelectorAll('a[href]')) {
      const href = anchor.getAttribute('href');
      assert.ok(!href.includes('XXXXXXXX'), `${route}: placeholder CTA`);
      const url = new URL(href, new URL(route, site));
      if (url.origin !== site) continue;
      const target = url.pathname + url.search;
      const destination = await documentAt(target);
      assert.equal(destination.status, 200, `${route} -> ${href}`);
      if (url.hash) assert.ok(destination.doc.getElementById(decodeURIComponent(url.hash.slice(1))), `${route} -> ${href}: missing fragment`);
      if (!checked.has(target)) queue.push(target);
      links++;
    }
    // JSON-LD must parse on all visited HTML pages, and global FAQ markup must not leak.
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent));
    if (new URL(route, site).pathname !== '/' && new URL(route, site).pathname !== '/hizmetler') assert.ok(!schemas.some(schema => schema['@type'] === 'FAQPage'), `${route}: unrelated FAQ`);
  }
  console.log(`PASS internal link + fragment crawl: ${checked.size} HTML routes, ${links} links`);
  const contact = await documentAt('/iletisim');
  assert.ok(contact.doc.querySelector('#iletisim form'), 'Existing contact form');
  assert.ok(contact.doc.querySelector('[data-application-contact-fallback]'), 'SSR contact fallback before policy approval');
  assert.ok(contact.doc.querySelector('fieldset[hidden][disabled]'), 'SSR PII fields are hidden and disabled before policy approval');
  assert.ok(contact.doc.querySelector('a[href="tel:+905416061356"]'), 'Existing direct telephone destination');
  assert.ok(contact.doc.querySelector('a[href="https://wa.me/905416061356"]'), 'Existing direct WhatsApp destination');
  const service = await documentAt('/hizmetler');
  assert.ok(service.doc.querySelector('a[href^="/rehber/"]'), 'Service -> guide');
  const homeText = (await documentAt('/')).doc.body.textContent;
  for (const claim of ['12K+', '4.200+', '25+ banka', '34.52', '2350.00', '15+ yıl', '13+ yıllık']) assert.ok(!homeText.includes(claim), `Unverified homepage claim: ${claim}`);
  for (const route of ['/package2-unknown', '/rehber/package2-unknown']) assert.equal((await get(route)).status, 404);
  const slash = await get('/rehber/', { redirect: 'manual' });
  assert.ok([301, 308].includes(slash.status), 'Permanent trailing-slash normalization');
  assert.equal(new URL(slash.headers.get('location'), origin).pathname, '/rehber');
  console.log(`PASS journey, safe homepage claims, unknown 404 and permanent slash normalization (${slash.status})`);
} finally {
  console.log(`SEO memory: peak verifier RSS ${Math.round(process.resourceUsage().maxRSS / 1024)} MiB; ${cache.size} lightweight page summaries; at most one HTML DOM`);
  cache.clear();
  server.kill('SIGTERM');
  await new Promise(resolve => { if (server.exitCode !== null || failure) resolve(); else server.once('exit', resolve); });
}
