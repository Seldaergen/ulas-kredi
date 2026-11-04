// Real PostgreSQL + localhost SMTP + production HTTP + mobile/desktop Chromium.
// All credentials and records are synthetic. No inherited production services.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { randomBytes, randomUUID } from 'node:crypto';
import EmbeddedPostgres from 'embedded-postgres';
import { SMTPServer } from 'smtp-server';
import { verifyAppearance } from './verify-appearance.mjs';
import { verifyInnerPages } from './verify-inner-pages.mjs';
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve('.tooling/playwright');
const { chromium } = await import('playwright');
const require = createRequire(import.meta.url);
require('../tests/register.cjs');
const { APPLICATION_PRIVACY_VERSION } = require('../lib/applications/validation.ts');
const { applicationDb, closeApplicationDb } = require('../lib/applications/db.ts');
const operations = require('../lib/applications/operations.ts');
const { processNotifications } = require('../lib/applications/notifications.ts');
const fixtureName = 'Sentetik Gizli Başvuru';
const fixturePhone = '05550000001';
const fixtureNote = 'Sentetik özel talep notu';
let phase = 'initialization';
let postgresStarted = false;
let browser;
let server;
let appLogs = '';
let rejectMail = true;
const mail = [];
const children = new Set();
fs.mkdirSync(path.resolve('artifacts/package3'), { recursive: true });
const directory = fs.mkdtempSync(path.resolve('artifacts/package3/postgres-'));
async function freePort() {
  const socket = net.createServer();
  await new Promise((resolve, reject) => { socket.once('error', reject); socket.listen(0, '127.0.0.1', resolve); });
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  return port;
}
const databasePort = await freePort();
const databasePassword = randomBytes(24).toString('hex');
const postgres = new EmbeddedPostgres({ databaseDir: directory, user: 'fixture', password: databasePassword, port: databasePort, persistent: true, createPostgresUser: false, autoRehydrateSymlinks: true,
  postgresFlags: ['-h', '127.0.0.1', '-c', 'unix_socket_directories=', '-c', 'log_statement=none', '-c', 'log_min_error_statement=panic'],
  onLog: () => {}, onError: () => {},
});
const smtp = new SMTPServer({ disabledCommands: ['AUTH', 'STARTTLS'], logger: false, onData(stream, session, callback) {
  let raw = '';
  stream.on('data', chunk => { raw += chunk; });
  stream.on('end', () => {
    if (rejectMail) { const error = new Error('Synthetic rejection'); error.responseCode = 451; callback(error); }
    else { mail.push(raw); callback(); }
  });
} });
const allowed = ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL'];
const env = Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]]));
function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { env, stdio: ['ignore', 'pipe', 'pipe'] });
    children.add(child); let output = '';
    child.stdout.on('data', chunk => { output += chunk; }); child.stderr.on('data', chunk => { output += chunk; });
    child.on('error', reject); child.on('exit', code => { children.delete(child); code === 0 ? resolve(output) : reject(new Error('LOCAL_CHILD_FAILED')); });
  });
}
let origin;
const payload = (overrides = {}) => ({ name: fixtureName, phone: fixturePhone, topic: 'CREDIT_SCORE', note: fixtureNote, channel: 'CONTACT_FORM', privacyAcknowledged: true, privacyVersion: APPLICATION_PRIVACY_VERSION, website: '', ...overrides });
const post = (body, key = randomUUID(), extras = {}) => fetch(`${origin}/api/applications`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key, Origin: origin, ...extras }, body: JSON.stringify(body), signal: AbortSignal.timeout(20000) });
const step = value => { phase = value; console.log(`CHECK ${value}`); };
try {
  step('isolated PostgreSQL startup and additive migrations');
  await postgres.initialise(); await postgres.start(); postgresStarted = true;
  await postgres.createDatabase('ulas_applications_test');
  env.APPLICATION_DATABASE_URL = `postgresql://fixture:${databasePassword}@127.0.0.1:${databasePort}/ulas_applications_test`;
  assert.equal(new URL(env.APPLICATION_DATABASE_URL).hostname, '127.0.0.1');
  Object.assign(env, { APPLICATION_ENCRYPTION_KEY: randomBytes(32).toString('hex'), APPLICATION_ABUSE_KEY: randomBytes(32).toString('hex'), APPLICATION_RETENTION_DAYS: '30', APPLICATION_DATA_OWNER: 'Sentetik Test Yayıncısı', APPLICATION_OPERATOR_ID: 'fixture-operator', APPLICATION_ALLOW_LOCAL: 'true', NEXT_TELEMETRY_DISABLED: '1' });
  await new Promise(resolve => smtp.listen(0, '127.0.0.1', resolve));
  Object.assign(env, { APPLICATION_SMTP_HOST: '127.0.0.1', APPLICATION_SMTP_PORT: String(smtp.server.address().port), APPLICATION_NOTIFICATION_TO: 'staff@example.invalid', APPLICATION_NOTIFICATION_FROM: 'system@example.invalid' });
  Object.assign(process.env, env);
  await run(['node_modules/prisma/build/index.js', 'migrate', 'deploy', '--config', 'prisma.applications.config.ts']);
  const db = applicationDb();
  await db.$queryRaw`SELECT 1`;
  const port = await freePort(); origin = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { env, stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', chunk => { appLogs += chunk; }); server.stderr.on('data', chunk => { appLogs += chunk; });
  let ready = false;
  for (let i = 0; i < 150; i++) {
    if (server.exitCode !== null) throw Error('HTTP_SERVER_FAILED');
    try { if ((await fetch(`${origin}/api/health`)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready);

  step('HTTP validation, sensitive fields, origin, body limits and honeypot');
  for (const invalid of [null, {}, payload({ name: '--' }), payload({ phone: '123' }), payload({ topic: 'anything' }), payload({ privacyAcknowledged: false }), payload({ privacyVersion: 'old' }), payload({ note: '12345678901' }), payload({ note: '<script>x</script>' }), payload({ extra: 'unexpected' })]) assert.equal((await post(invalid)).status, 400);
  assert.equal((await post(payload(), 'bad-key')).status, 400);
  assert.equal((await post(payload(), randomUUID(), { Origin: 'https://attacker.invalid' })).status, 403);
  assert.equal((await post(payload(), randomUUID(), { 'Sec-Fetch-Site': 'cross-site' })).status, 403);
  assert.equal((await post(payload({ website: 'bot' }))).status, 202);
  assert.equal((await post(payload({ note: 'x'.repeat(5000) }))).status, 413);
  assert.equal(await db.application.count(), 0);

  step('valid application, encrypted persistence and idempotency under concurrent retry');
  const key = randomUUID();
  const responses = await Promise.all(Array.from({ length: 6 }, () => post(payload(), key)));
  const bodies = await Promise.all(responses.map(response => response.json()));
  assert.ok(responses.every(response => [200, 201].includes(response.status)));
  assert.equal(new Set(bodies.map(body => body.reference)).size, 1);
  const reference = bodies[0].reference;
  assert.match(reference, /^UK-[A-F0-9]{32}$/);
  assert.equal(await db.application.count(), 1);
  assert.equal(await db.applicationEvent.count({ where: { kind: 'CREATED' } }), 1);
  assert.equal(await db.applicationNotification.count(), 1);
  const stored = await db.application.findUniqueOrThrow({ where: { reference } });
  assert.equal(stored.status, 'NEW'); assert.ok(!JSON.stringify(stored).includes(fixtureName)); assert.ok(!JSON.stringify(stored).includes('5550000001'));
  assert.equal((await post(payload({ note: 'Değişen talep' }), key)).status, 409);
  assert.equal(mail.length, 0);

  step('real SMTP rejection preserves application and records retryable attempt');
  const failed = await processNotifications(1);
  assert.equal(failed[0].outcome, 'FAILED');
  assert.equal((await db.application.findUniqueOrThrow({ where: { reference } })).status, 'NEW');
  assert.equal((await db.applicationNotification.findUniqueOrThrow({ where: { applicationId: stored.id } })).state, 'RETRY');
  assert.equal((await db.notificationAttempt.findFirstOrThrow()).errorCode, 'SMTP_UNAVAILABLE');
  step('controlled retry and notification delivery without customer PII');
  rejectMail = false;
  await operations.retryNotification(reference);
  const delivered = await processNotifications(1);
  assert.equal(delivered[0].outcome, 'SENT'); assert.equal(mail.length, 1);
  assert.ok(mail[0].includes(reference));
  for (const value of [fixtureName, fixturePhone, '+905550000001', fixtureNote]) assert.ok(!mail[0].includes(value));
  assert.equal((await db.application.findUniqueOrThrow({ where: { reference } })).status, 'NEW');
  assert.equal(await db.notificationAttempt.count(), 2);
  await assert.rejects(operations.retryNotification(reference));

  step('local authorized management, masking, audit and independent status transitions');
  delete process.env.APPLICATION_OPERATOR_ID;
  await assert.rejects(operations.listApplications(), /OPERATOR_ALIAS_REQUIRED/);
  await assert.rejects(operations.showApplication(reference, true), /OPERATOR_ALIAS_REQUIRED/);
  process.env.APPLICATION_OPERATOR_ID = env.APPLICATION_OPERATOR_ID;
  const listing = await run(['scripts/applications-admin.mjs', 'list']);
  assert.ok(listing.includes(reference)); assert.ok(!listing.includes(fixtureName));
  const summary = await operations.showApplication(reference);
  assert.ok(!JSON.stringify(summary).includes(fixturePhone));
  const revealed = await operations.showApplication(reference, true);
  assert.equal(revealed.customer.name, fixtureName);
  await assert.rejects(operations.changeApplicationStatus(reference, 'IN_REVIEW'));
  for (const status of ['CONTACT_PENDING', 'CONTACTED', 'IN_REVIEW', 'CLOSED']) await operations.changeApplicationStatus(reference, status);
  assert.equal((await db.applicationNotification.findUniqueOrThrow({ where: { applicationId: stored.id } })).state, 'SENT');
  await assert.rejects(operations.changeApplicationStatus(reference, 'NEW'));
  for (const route of ['/admin', '/admin/applications', `/api/applications/${reference}`]) assert.equal((await fetch(origin + route)).status, 404);
  assert.equal((await fetch(`${origin}/api/applications`)).status, 405);
  assert.equal((await fetch(`${origin}/api/contact`)).status, 405);

  step('real mobile browser: validation, form -> durable database, lost response and safe retry');
  browser = await chromium.launch({ headless: true, env: Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]])) });
  step('Electric Finance dark/light, responsive screenshots, calculator and accessibility checks');
  await verifyAppearance(browser, origin);
  step('Package 5 inner-page design, navigation and application conversion');
  await verifyInnerPages(browser, origin);
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  const pageErrors = []; page.on('pageerror', error => pageErrors.push(error.name));
  await page.goto(`${origin}/iletisim`);
  const form = page.getByRole('form', { name: 'Danışmanlık başvurusu' });
  await form.locator('input[name=name]').fill(fixtureName);
  await form.locator('input[name=phone]').fill('123');
  await form.locator('select[name=topic]').selectOption('LIMIT');
  await form.locator('input[name=privacyAcknowledged]').check();
  assert.equal(await form.getByRole('button', { name: 'Başvuruyu Kaydet' }).isDisabled(), true);
  await form.locator('input[name=phone]').fill('05550000002');
  await form.locator('textarea[name=note]').fill(fixtureNote);
  const beforeBrowser = await db.application.count();
  const browserKeys = [];
  page.on('request', request => { if (request.url().endsWith('/api/applications')) browserKeys.push(request.headers()['idempotency-key']); });
  await page.route('**/api/applications', async route => { await route.fetch(); await route.abort('failed'); }, { times: 1 });
  await form.getByRole('button', { name: 'Başvuruyu Kaydet' }).tap();
  await form.getByRole('alert').waitFor();
  assert.equal(await db.application.count(), beforeBrowser + 1);
  assert.equal(await form.getByText('Başvurunuz kaydedildi.', { exact: true }).count(), 0);
  const replay = page.waitForResponse(response => response.url().endsWith('/api/applications') && response.status() === 200);
  await form.getByRole('button', { name: 'Başvuruyu Kaydet' }).tap();
  const replayBody = await (await replay).json();
  await form.getByRole('status').filter({ hasText: replayBody.reference }).waitFor();
  await form.screenshot({ path: 'artifacts/package5/screenshots/home-regression/application-success-mobile.png', animations: 'disabled' });
  assert.equal(browserKeys.length, 2); assert.equal(browserKeys[0], browserKeys[1]);
  assert.equal(await db.application.count(), beforeBrowser + 1);
  assert.equal(context.pages().length, 1);
  assert.equal(await form.locator('input[name=name]').inputValue(), '');
  assert.equal(await form.locator('input[name=phone]').getAttribute('inputmode'), 'tel');
  assert.ok(await form.getByRole('button', { name: 'Başvuruyu Kaydet' }).isDisabled());
  assert.deepEqual(pageErrors, []);
  await context.close();

  step('atomic transaction failure and desktop form recovery without false success');
  await db.$executeRawUnsafe(`CREATE FUNCTION fixture_reject_event() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'fixture write rejection'; END $$`);
  await db.$executeRawUnsafe(`CREATE TRIGGER fixture_event_failure BEFORE INSERT ON "ApplicationEvent" FOR EACH ROW EXECUTE FUNCTION fixture_reject_event()`);
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await desktop.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const desktopPage = await desktop.newPage(); await desktopPage.goto(origin);
  const hero = desktopPage.getByRole('form', { name: 'Danışmanlık başvurusu' }).first();
  await hero.locator('input[name=name]').fill(fixtureName);
  await hero.locator('input[name=phone]').fill('05550000003');
  await hero.locator('select[name=topic]').selectOption('NEED_CREDIT');
  await hero.locator('input[name=privacyAcknowledged]').check();
  const beforeFailure = await db.application.count();
  await hero.getByRole('button', { name: 'Başvuruyu Kaydet' }).click();
  await hero.getByRole('alert').waitFor();
  assert.equal(await db.application.count(), beforeFailure);
  assert.equal(await hero.getByText('Başvurunuz kaydedildi.', { exact: true }).count(), 0);
  await db.$executeRawUnsafe('DROP TRIGGER fixture_event_failure ON "ApplicationEvent"');
  await db.$executeRawUnsafe('DROP FUNCTION fixture_reject_event()');
  const recovery = desktopPage.waitForResponse(response => response.url().endsWith('/api/applications') && response.status() === 201);
  await hero.getByRole('button', { name: 'Başvuruyu Kaydet' }).click();
  const recovered = await (await recovery).json();
  await hero.getByRole('status').filter({ hasText: recovered.reference }).waitFor();
  await hero.screenshot({ path: 'artifacts/package5/screenshots/home-regression/application-success-desktop.png', animations: 'disabled' });
  assert.equal((await db.application.findUniqueOrThrow({ where: { reference: recovered.reference } })).channel, 'HERO_FORM');
  await desktop.close();

  step('concurrent workers, lease recovery and bounded retry');
  const outcomes = await Promise.all([run(['scripts/application-worker.mjs', '1']), run(['scripts/application-worker.mjs', '1'])]);
  assert.ok(outcomes.every(value => value.includes('SENT')));
  assert.equal(new Set(mail).size, mail.length);
  const crashedResponse = await post(payload({ phone: '05550000004' }));
  const crashedReference = (await crashedResponse.json()).reference;
  const crashedApp = await db.application.findUniqueOrThrow({ where: { reference: crashedReference }, include: { notification: true } });
  await db.applicationNotification.update({ where: { id: crashedApp.notification.id }, data: { state: 'SENDING', attemptCount: 1, leaseToken: randomUUID(), leaseUntil: new Date(0) } });
  await db.notificationAttempt.create({ data: { notificationId: crashedApp.notification.id, number: 1, status: 'STARTED', messageId: `<application-${crashedReference}@ulaskredi.com.tr>` } });
  await processNotifications(1);
  assert.deepEqual((await db.notificationAttempt.findMany({ where: { notificationId: crashedApp.notification.id }, orderBy: { number: 'asc' } })).map(row => row.status), ['UNKNOWN', 'SUCCEEDED']);
  await db.applicationNotification.update({ where: { id: crashedApp.notification.id }, data: { state: 'DEAD', attemptCount: 10, maxAttempts: 10 } });
  await assert.rejects(operations.retryNotification(crashedReference));

  step('database restart durability and persistent duplicate/rate controls');
  for (let i = 0; i < 2; i++) assert.equal((await post(payload())).status, 201);
  assert.equal((await post(payload())).status, 429);
  const countBeforeRestart = await db.application.count();
  await closeApplicationDb();
  await postgres.stop(); postgresStarted = false;
  const unavailable = await post(payload({ phone: '05550000005' }));
  assert.equal(unavailable.status, 503); assert.equal((await unavailable.json()).ok, false);
  await postgres.start(); postgresStarted = true;
  const resumed = applicationDb();
  assert.equal(await resumed.application.count(), countBeforeRestart);
  assert.equal((await post(payload(), key)).status, 200);
  assert.equal((await post(payload())).status, 429);
  const unique = await Promise.all(Array.from({ length: 8 }, (_, i) => post(payload({ phone: `0555000010${i}` }))));
  assert.ok(unique.every(response => response.status === 201));
  const uniqueBodies = await Promise.all(unique.map(response => response.json()));
  assert.equal(new Set(uniqueBodies.map(body => body.reference)).size, 8);

  step('retention/erasure removes PII and cancels notification work');
  await resumed.application.update({ where: { reference: recovered.reference }, data: { retentionUntil: new Date(0) } });
  assert.equal((await operations.purgeExpired()).erased, 1);
  const erased = await resumed.application.findUniqueOrThrow({ where: { reference: recovered.reference }, include: { notification: true } });
  assert.equal(erased.encryptedPayload, null); assert.equal(erased.payloadHash, null); assert.equal(erased.idempotencyHash, null); assert.equal(erased.notification.state, 'CANCELLED');

  step('no PII/secret exposure in public responses, logs, emails or client JavaScript');
  for (const route of ['/', '/iletisim', '/api/application-policy', '/api/applications']) {
    const text = await (await fetch(origin + route)).text();
    for (const value of [fixtureName, fixturePhone, fixtureNote, env.APPLICATION_ENCRYPTION_KEY, env.APPLICATION_ABUSE_KEY, databasePassword]) assert.ok(!text.includes(value));
  }
  for (const value of [fixtureName, fixturePhone, fixtureNote, env.APPLICATION_ENCRYPTION_KEY, env.APPLICATION_ABUSE_KEY, databasePassword]) assert.ok(!appLogs.includes(value));
  const jsFiles = fs.readdirSync('.next/static/chunks', { recursive: true }).filter(file => file.endsWith('.js'));
  for (const file of jsFiles) {
    const content = fs.readFileSync(path.join('.next/static/chunks', file), 'utf8');
    assert.ok(!content.includes('APPLICATION_ENCRYPTION_KEY')); assert.ok(!content.includes('APPLICATION_DATABASE_URL'));
  }
  console.log('PASS real PostgreSQL durability, API transactions/idempotency, SMTP outbox, local administration, mobile/desktop Chromium, erasure and privacy');
} catch (error) {
  console.error(`FAIL phase=${phase}; kind=${error?.name ?? 'Error'}`);
  // Assertion diagnostics contain synthetic data only; save a redacted version.
  let detail = String(error?.stack ?? error);
  for (const value of [fixtureName, fixturePhone, fixtureNote, databasePassword, env.APPLICATION_ENCRYPTION_KEY, env.APPLICATION_ABUSE_KEY].filter(Boolean)) detail = detail.replaceAll(value, '[REDACTED]');
  fs.writeFileSync('artifacts/package3/integration-error.log', detail);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  for (const child of children) child.kill('SIGTERM');
  if (server) { server.kill('SIGTERM'); await new Promise(resolve => { if (server.exitCode !== null) resolve(); else server.once('exit', resolve); }); }
  await closeApplicationDb();
  if (postgresStarted) await postgres.stop();
  if (smtp.server.listening) await new Promise(resolve => smtp.close(resolve));
}
