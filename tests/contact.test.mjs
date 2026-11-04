import test, { mock } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';
const require = createRequire(import.meta.url);
require('./register.cjs');
const { POST } = require('../app/api/contact/route.ts');
const { APPLICATION_PRIVACY_VERSION } = require('../lib/applications/validation.ts');
const request = (body, headers = {}) => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID(), ...headers }, body: JSON.stringify(body) });
const keys = ['APPLICATION_DATABASE_URL', 'APPLICATION_ENCRYPTION_KEY', 'APPLICATION_ABUSE_KEY', 'APPLICATION_RETENTION_DAYS', 'APPLICATION_DATA_OWNER'];

test('contact compatibility path rejects invalid/spam requests; absent storage never returns success or leaks PII', async () => {
  const saved = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const warning = mock.method(console, 'warn', () => {});
  try {
    keys.forEach(key => delete process.env[key]);
    assert.equal((await POST(request({}))).status, 400);
    assert.equal((await POST(new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' }))).status, 400);
    const bot = await POST(request({ website: 'bot' }));
    assert.equal(bot.status, 202); assert.equal((await bot.json()).ok, false);
    const payload = { name: 'Örnek Başvuru', phone: '05550000001', topic: 'OTHER', channel: 'CONTACT_FORM', note: '', privacyAcknowledged: true, privacyVersion: APPLICATION_PRIVACY_VERSION };
    assert.equal((await POST(request(payload, { Origin: 'https://attacker.invalid' }))).status, 403);
    assert.equal((await POST(request(payload, { 'Content-Type': 'text/plain' }))).status, 415);
    assert.equal((await POST(request({ ...payload, note: 'x'.repeat(5000) }))).status, 413);
    const failed = await POST(request(payload));
    assert.equal(failed.status, 503);
    const text = await failed.text();
    assert.equal(JSON.parse(text).ok, false); assert.ok(!text.includes(payload.name)); assert.ok(!text.includes(payload.phone));
    assert.equal(failed.headers.get('cache-control'), 'no-store');
    assert.deepEqual(warning.mock.calls.map(call => call.arguments), [['application_submission_unavailable']]);
  } finally {
    for (const key of keys) saved[key] === undefined ? delete process.env[key] : process.env[key] = saved[key];
    warning.mock.restore();
  }
});
