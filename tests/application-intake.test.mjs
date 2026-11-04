import test, { mock } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('./register.cjs');
const submission = require('../lib/applications/submit.ts');
const { POST } = require('../app/api/applications/route.ts');
const { GET } = require('../app/api/application-policy/route.ts');
const { applicationConfig } = require('../lib/applications/config.ts');
const { APPLICATION_PRIVACY_VERSION } = require('../lib/applications/validation.ts');

test('production intake stays closed with complete config until explicit approval; local fixtures still work', async () => {
  const fixture = {
    APPLICATION_DATABASE_URL: 'postgresql://fixture:fixture@db.invalid/app?sslmode=verify-full',
    APPLICATION_ENCRYPTION_KEY: 'a'.repeat(64), APPLICATION_ABUSE_KEY: 'b'.repeat(64),
    APPLICATION_DATA_OWNER: 'Test Controller', APPLICATION_RETENTION_DAYS: '30',
    APPLICATION_ALLOW_LOCAL: 'false', APPLICATION_ACCEPTING_SUBMISSIONS: '',
  };
  const saved = Object.fromEntries(Object.keys(fixture).map(key => [key, process.env[key]]));
  const send = mock.method(submission, 'submitApplication', async () => ({ reference: `UK-${'A'.repeat(32)}`, replayed: false }));
  const warning = mock.method(console, 'warn', () => {});
  const request = () => new Request('https://ulaskredi.com.tr/api/applications', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID(), Origin: 'https://ulaskredi.com.tr' },
    body: JSON.stringify({ name: 'Örnek Başvuru', phone: '05550000001', topic: 'OTHER', channel: 'CONTACT_FORM', note: '', privacyAcknowledged: true, privacyVersion: APPLICATION_PRIVACY_VERSION }),
  });
  try {
    Object.assign(process.env, fixture);
    for (const flag of ['', 'false', 'TRUE']) {
      process.env.APPLICATION_ACCEPTING_SUBMISSIONS = flag;
      const policy = await GET();
      assert.equal(policy.status, 503);
      assert.deepEqual(await policy.json(), { enabled: false });
      assert.equal((await POST(request())).status, 503);
      assert.equal(send.mock.calls.length, 0, 'disabled intake must never invoke storage');
    }
    assert.ok(applicationConfig(), 'workers/retention keep access while public intake is paused');
    process.env.APPLICATION_ACCEPTING_SUBMISSIONS = 'true';
    assert.equal((await GET()).status, 200);
    assert.equal((await POST(request())).status, 201);
    process.env.APPLICATION_ACCEPTING_SUBMISSIONS = 'false';
    process.env.APPLICATION_ALLOW_LOCAL = 'true';
    assert.equal((await GET()).status, 200);
    assert.equal((await POST(request())).status, 201);
    assert.equal(send.mock.calls.length, 2);
  } finally {
    send.mock.restore(); warning.mock.restore();
    for (const key of Object.keys(fixture)) saved[key] === undefined ? delete process.env[key] : process.env[key] = saved[key];
  }
});

test('contact-only production release cannot be opened by either runtime flag', async () => {
  const keys = ['NODE_ENV', 'APPLICATION_ALLOW_LOCAL', 'APPLICATION_ACCEPTING_SUBMISSIONS'];
  const saved = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const send = mock.method(submission, 'submitApplication', async () => { throw Error('production storage must not run'); });
  try {
    process.env.NODE_ENV = 'production';
    for (const flag of ['true', 'false', '']) {
      process.env.APPLICATION_ALLOW_LOCAL = flag;
      process.env.APPLICATION_ACCEPTING_SUBMISSIONS = flag;
      const policy = await GET();
      assert.equal(policy.status, 503);
      assert.deepEqual(await policy.json(), { enabled: false });
      const request = new Request('https://ulaskredi.com.tr/api/applications', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'unread-body',
      });
      const response = await POST(request);
      assert.equal(response.status, 503);
      assert.equal((await response.json()).code, 'APPLICATION_INTAKE_DISABLED');
      assert.equal(request.bodyUsed, false, 'closed release does not read personal data');
    }
    assert.equal(send.mock.calls.length, 0);
  } finally {
    send.mock.restore();
    for (const key of keys) saved[key] === undefined ? delete process.env[key] : process.env[key] = saved[key];
  }
});
