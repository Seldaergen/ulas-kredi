import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('./register.cjs');
const { applicationInput, APPLICATION_PRIVACY_VERSION } = require('../lib/applications/validation.ts');
const { encryptPayload, decryptPayload } = require('../lib/applications/crypto.ts');
const input = { name: 'Örnek Başvuru', phone: '0 (555) 000-00-01', topic: 'CREDIT_SCORE', channel: 'CONTACT_FORM', note: '', website: '', privacyAcknowledged: true, privacyVersion: APPLICATION_PRIVACY_VERSION };

test('shared schema normalizes TR mobile phones and rejects sensitive/unknown fields and unacknowledged privacy', () => {
  for (const phone of ['05550000001', '+90 555 000 00 01', '5550000001']) assert.equal(applicationInput.parse({ ...input, phone }).phone, '+905550000001');
  for (const change of [{ name: '--' }, { phone: '02120000000' }, { phone: '555000000' }, { topic: 'unknown' }, { channel: 'ADMIN' }, { note: '12345678901' }, { note: 'kart 1234 5678 9012 3456' }, { note: 'IBAN TR12000000000000' }, { note: 'şifre xyz' }, { note: '<b>html</b>' }, { note: 'x'.repeat(401) }, { status: 'CLOSED' }, { privacyAcknowledged: false }, { privacyVersion: 'other' }]) assert.equal(applicationInput.safeParse({ ...input, ...change }).success, false);
});

test('authenticated encryption conceals PII and binds ciphertext to the application reference', () => {
  const keys = ['APPLICATION_ENCRYPTION_KEY', 'APPLICATION_ABUSE_KEY', 'APPLICATION_DATABASE_URL', 'APPLICATION_RETENTION_DAYS', 'APPLICATION_DATA_OWNER', 'APPLICATION_ALLOW_LOCAL'];
  const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  try {
    Object.assign(process.env, { APPLICATION_ENCRYPTION_KEY: 'a'.repeat(64), APPLICATION_ABUSE_KEY: 'b'.repeat(64), APPLICATION_DATABASE_URL: 'postgresql://fixture:fixture@127.0.0.1:1/never_connect', APPLICATION_RETENTION_DAYS: '30', APPLICATION_DATA_OWNER: 'Sentetik Yayıncı', APPLICATION_ALLOW_LOCAL: 'true' });
    const encrypted = encryptPayload('fixture-reference', { name: input.name, phone: input.phone, note: '' });
    assert.ok(!encrypted.includes(input.name));
    assert.equal(decryptPayload('fixture-reference', encrypted).name, input.name);
    assert.throws(() => decryptPayload('other-reference', encrypted));
    const parts = encrypted.split('.'); parts[2] = Buffer.alloc(16).toString('base64');
    assert.throws(() => decryptPayload('fixture-reference', parts.join('.')));
    process.env.APPLICATION_ALLOW_LOCAL = 'false';
    assert.throws(() => require('../lib/applications/config.ts').applicationConfig(), /PRODUCTION_CONTROLLER_REQUIRED/);
    process.env.APPLICATION_ALLOW_LOCAL = 'true';
  } finally { for (const key of keys) previous[key] === undefined ? delete process.env[key] : process.env[key] = previous[key]; }
});
