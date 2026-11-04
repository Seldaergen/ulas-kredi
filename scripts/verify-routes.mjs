import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const require = createRequire(import.meta.url);
require('../tests/register.cjs');
const { POSTS } = require('../lib/content/posts.ts');
const { APPLICATION_PRIVACY_VERSION } = require('../lib/applications/validation.ts');
const reservation = net.createServer();
await new Promise((resolve, reject) => { reservation.once('error', reject); reservation.listen(0, '127.0.0.1', resolve); });
const port = reservation.address().port;
await new Promise(resolve => reservation.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const allowed = ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL', 'SYSTEMROOT', 'COMSPEC'];
const env = Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]]));
env.NEXT_TELEMETRY_DISABLED = '1';
const server = spawn(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { env, stdio: ['ignore', 'ignore', 'pipe'] });
let startupError;
let stderr = '';
server.on('error', error => { startupError = error; });
server.stderr.on('data', chunk => { stderr += chunk; });
const get = route => fetch(origin + route, { signal: AbortSignal.timeout(10000) });
try {
  let ready = false;
  for (let i = 0; i < 150; i++) {
    if (startupError) throw startupError;
    if (server.exitCode !== null) throw Error(`Next exited: ${stderr}`);
    try { if ((await get('/api/health')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'Production server ready');
  const routes = ['/', '/hizmetler', '/nasil-calisir', '/iletisim', '/rehber', '/videolar', '/soru-cevap', '/kvkk', '/gizlilik', '/cerez', '/yasal-uyari', ...POSTS.map(post => `/rehber/${post.slug}`)];
  for (const route of routes) {
    const response = await get(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.ok(html.includes('<title') && html.includes('<main'), `${route}: document`);
    assert.ok(html.includes('<h1'), `${route}: server-rendered heading`);
  }
  console.log(`PASS pages: ${routes.length}/${routes.length} (11 pages + 65 retained article URLs)`);
  for (const route of ['/missing-paket1-fixture', '/rehber/missing-paket1-fixture', '/rehber/missing-package2-fixture']) assert.equal((await get(route)).status, 404, route);
  console.log('PASS unknown routes: 3/3 return 404; formerly unregistered article now 200');

  const slug = 'puanım-dusuk-kredi-cekmek-istiyorum';
  const canonical = `https://ulaskredi.com.tr/rehber/${encodeURIComponent(slug)}`;
  for (const segment of [slug, encodeURIComponent(slug), encodeURIComponent(slug).toLowerCase()]) {
    const response = await get(`/rehber/${segment}`);
    assert.equal(response.status, 200, segment);
    const html = await response.text();
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${segment}: canonical`);
    assert.ok(html.includes('application/ld+json') && html.includes('Puanım Düşük, Kredi Çekmek İstiyorum'), `${segment}: article`);
  }
  for (const segment of [encodeURIComponent(encodeURIComponent(slug)), '%25', '%25ZZ', '%2F', '%5C', '%00']) assert.equal((await get(`/rehber/${segment}`)).status, 404, segment);
  for (const segment of ['%', '%ZZ', '%C4', '%E0%A4%A']) assert.equal((await get(`/rehber/${segment}`)).status, 400, segment);
  console.log('PASS Turkish slug: raw/encoded/lowercase encoded 200 + canonical; double encoded/escaped invalid/delimiters 404; malformed transport encoding 400');

  const health = await (await get('/api/health')).json();
  assert.equal(health.ok, true); assert.equal(health.service, 'ulas-kredi');
  const finance = await (await get('/api/finance')).json();
  assert.equal(finance.ok, true); assert.equal(finance.rates.length, 4);
  // /api/rates was prerendered by the build. Never request live market data here.
  for (const [body, status] of [[{}, 400], [{ website: 'bot' }, 202], [{ name: 'Sentetik Başvuru', phone: '05550000000', topic: 'OTHER', channel: 'CONTACT_FORM', note: '', privacyAcknowledged: true, privacyVersion: APPLICATION_PRIVACY_VERSION }, 503]]) {
    const response = await fetch(`${origin}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID() }, body: JSON.stringify(body), signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, status);
  }
  console.log('PASS health/finance stub/contact validation/honeypot/missing application storage fails closed');
} finally {
  server.kill('SIGTERM');
  await new Promise(resolve => { if (server.exitCode !== null || startupError) resolve(); else server.once('exit', resolve); });
}
