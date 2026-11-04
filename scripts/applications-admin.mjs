import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../tests/register.cjs');
const { closeApplicationDb } = require('../lib/applications/db.ts');
const ops = require('../lib/applications/operations.ts');
const [command, reference, value, ...flags] = process.argv.slice(2);
try {
  let result;
  if (command === 'list') result = await ops.listApplications();
  else if (command === 'show' && /^UK-[A-F0-9]{32}$/.test(reference ?? '')) result = await ops.showApplication(reference, value === '--reveal');
  else if (['status', 'retry', 'erase'].includes(command) && /^UK-[A-F0-9]{32}$/.test(reference ?? '') && (command === 'status' ? flags.join(' ') : [value, ...flags].join(' ')) === `--confirm ${reference}`) {
    if (command === 'status') result = await ops.changeApplicationStatus(reference, value);
    if (command === 'retry') result = await ops.retryNotification(reference);
    if (command === 'erase') result = await ops.eraseApplication(reference);
  } else if (command === 'purge-expired' && reference === '--confirm-expiry-policy') result = await ops.purgeExpired();
  else throw new Error('INVALID_COMMAND');
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
} catch { console.error('Operation failed. Check configuration, operator alias, reference and allowed transition. No sensitive details logged.'); process.exitCode = 1; }
finally { await closeApplicationDb(); }
