import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { productionPreflight } from '../scripts/production-preflight.mjs';
const version = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
const fixture = () => ({
  APPLICATION_DATABASE_URL: 'postgresql://fixture:synthetic-password@db.invalid/app?sslmode=verify-full',
  APPLICATION_ENCRYPTION_KEY: 'a'.repeat(64), APPLICATION_ABUSE_KEY: 'b'.repeat(64),
  APPLICATION_DATA_OWNER: 'Test Controller', APPLICATION_RETENTION_DAYS: '30',
  APPLICATION_SMTP_HOST: 'smtp.invalid', APPLICATION_SMTP_PORT: '587',
  APPLICATION_SMTP_USER: 'synthetic-user', APPLICATION_SMTP_PASS: 'synthetic-secret',
  APPLICATION_NOTIFICATION_TO: 'ops@example.invalid', APPLICATION_NOTIFICATION_FROM: 'notice@example.invalid',
  APPLICATION_OPERATOR_ID: 'test-operator',
});
test('missing configuration fails closed and exposes no values', () => {
  assert.equal(productionPreflight({}, version).configuration, 'BLOCKED');
  const env = fixture(); env.APPLICATION_DATABASE_URL = 'not-a-url-synthetic-secret';
  const result = productionPreflight(env, version);
  assert.equal(result.configuration, 'BLOCKED');
  for (const secret of ['not-a-url-synthetic-secret', 'synthetic-secret', 'synthetic-password']) assert.ok(!JSON.stringify(result).includes(secret));
});
test('syntactically complete fixture never claims production verified', () => {
  const result = productionPreflight(fixture(), version);
  assert.equal(result.configuration, 'PASS');
  assert.equal(result.production, 'NOT_VERIFIED');
});
test('unsafe deployment settings fail independently', () => {
  for (const patch of [
    { APPLICATION_DATABASE_URL: 'postgresql://localhost/app?sslmode=disable' },
    { APPLICATION_ALLOW_LOCAL: 'true' }, { NODE_TLS_REJECT_UNAUTHORIZED: '0' },
    { APPLICATION_SMTP_HOST: '127.0.0.1' }, { APPLICATION_TRUSTED_PROXY_HOPS: '6' },
    { APPLICATION_DATA_OWNER: 'Sentetik sorumlu' },
    { APPLICATION_ABUSE_KEY: 'A'.repeat(64) },
  ]) assert.equal(productionPreflight({ ...fixture(), ...patch }, version).configuration, 'BLOCKED');
  assert.equal(productionPreflight(fixture(), '0.0.0').configuration, 'BLOCKED');
});
