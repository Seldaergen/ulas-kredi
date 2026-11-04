import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../tests/register.cjs');
const { closeApplicationDb } = require('../lib/applications/db.ts');
const { processNotifications } = require('../lib/applications/notifications.ts');
try { console.log(JSON.stringify(await processNotifications(Number(process.argv[2] ?? 10)))); }
catch { console.error('Notification worker unavailable. No application or SMTP details logged.'); process.exitCode = 1; }
finally { await closeApplicationDb(); }
