// Never inherit production service credentials into build or verification processes.
import { spawnSync } from 'node:child_process';
const allowed = ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL', 'SYSTEMROOT', 'COMSPEC'];
const env = Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]]));
env.NEXT_TELEMETRY_DISABLED = '1';
if (process.env.ELECTRIC_FINANCE_STAGING === 'true') env.ELECTRIC_FINANCE_STAGING = 'true';
const [command, ...args] = process.argv.slice(2);
if (!command) throw new Error('A local command is required');
const result = spawnSync(command, args, { env, stdio: 'inherit', shell: false });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
