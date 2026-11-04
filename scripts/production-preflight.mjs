import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Offline validation only: no .env loading, network, database or mail operations.
// Return fixed field names, never configuration values or raw exceptions.
export function productionPreflight(env, nodeVersion = process.versions.node) {
  const failures = [];
  const check = (name, valid) => { if (!valid) failures.push(name); };
  const expected = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
  check('NODE_VERSION', nodeVersion === expected);
  const key = value => /^[a-f0-9]{64}$/i.test(value ?? '');
  check('APPLICATION_ENCRYPTION_KEY', key(env.APPLICATION_ENCRYPTION_KEY));
  check('APPLICATION_ABUSE_KEY', key(env.APPLICATION_ABUSE_KEY));
  check('DISTINCT_KEYS', !!env.APPLICATION_ENCRYPTION_KEY && env.APPLICATION_ENCRYPTION_KEY.toLowerCase() !== env.APPLICATION_ABUSE_KEY?.toLowerCase());
  const local = host => ['localhost', '127.0.0.1', '[::1]', '::1'].includes(host.toLowerCase());
  try {
    const url = new URL(env.APPLICATION_DATABASE_URL);
    check('APPLICATION_DATABASE_URL', ['postgres:', 'postgresql:'].includes(url.protocol) && !!url.hostname && !local(url.hostname));
    check('DATABASE_TLS_VERIFY_FULL', url.searchParams.get('sslmode') === 'verify-full' && !url.searchParams.has('sslaccept'));
  } catch { failures.push('APPLICATION_DATABASE_URL'); }
  const owner = env.APPLICATION_DATA_OWNER?.trim() ?? '';
  check('APPLICATION_DATA_OWNER', owner.length >= 3 && owner.length <= 160 && !/[\r\n]/.test(owner) && !/^(sentetik|fixture|example|örnek)(?:\s|$)/iu.test(owner));
  const days = Number(env.APPLICATION_RETENTION_DAYS);
  check('APPLICATION_RETENTION_DAYS', Number.isInteger(days) && days >= 1 && days <= 365);
  check('APPLICATION_ALLOW_LOCAL', !env.APPLICATION_ALLOW_LOCAL || env.APPLICATION_ALLOW_LOCAL === 'false');
  check('TLS_VERIFICATION', env.NODE_TLS_REJECT_UNAUTHORIZED !== '0');
  const hops = Number(env.APPLICATION_TRUSTED_PROXY_HOPS ?? 0);
  check('APPLICATION_TRUSTED_PROXY_HOPS', Number.isInteger(hops) && hops >= 0 && hops <= 5);
  check('APPLICATION_SMTP_HOST', !!env.APPLICATION_SMTP_HOST && !local(env.APPLICATION_SMTP_HOST));
  const port = Number(env.APPLICATION_SMTP_PORT);
  check('APPLICATION_SMTP_PORT', Number.isInteger(port) && port >= 1 && port <= 65535);
  for (const name of ['APPLICATION_SMTP_USER', 'APPLICATION_SMTP_PASS']) check(name, !!env[name]);
  for (const name of ['APPLICATION_NOTIFICATION_TO', 'APPLICATION_NOTIFICATION_FROM']) check(name, /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(env[name] ?? ''));
  check('APPLICATION_OPERATOR_ID', /^[a-z0-9._-]{3,64}$/i.test(env.APPLICATION_OPERATOR_ID ?? ''));
  return { configuration: failures.length ? 'BLOCKED' : 'PASS', failures,
    production: 'NOT_VERIFIED',
    scope: 'Offline syntax only; separate least-privilege web/worker/operator secrets. DB, SMTP, DNS, legal approval, backups and schedulers require independent verification.' };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = productionPreflight(process.env);
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.configuration === 'PASS' ? 0 : 1;
}
