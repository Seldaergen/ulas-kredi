import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, delimiter } from 'node:path';

// Build-only entry point. Never migrate, start jobs or inherit service secrets.
const mode = process.argv[2];
const expected = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
if (!['web', 'jobs'].includes(mode) || process.versions.node !== expected) {
  console.error('Render build blocked: select web/jobs and match the Node version in .nvmrc.');
  process.exit(1);
}
const allowed = ['PATH', 'HOME', 'TMPDIR', 'TMP', 'TEMP', 'LANG', 'LC_ALL', 'XDG_CACHE_HOME'];
const env = Object.fromEntries(allowed.filter(key => process.env[key]).map(key => [key, process.env[key]]));
env.PATH = `${dirname(process.execPath)}${delimiter}${env.PATH ?? ''}`;
if (process.env.ELECTRIC_FINANCE_STAGING === 'true') env.ELECTRIC_FINANCE_STAGING = 'true';
Object.assign(env, { NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1', PRISMA_SKIP_POSTINSTALL_GENERATE: 'true' });
// Next's TypeScript CLI reads a child process through pipes. Some restricted
// runners return empty output with status 0; detect that before installing/building.
const probe = spawnSync(process.execPath, ['--version'], { env, encoding: 'utf8', shell: false });
if (probe.error || probe.status !== 0 || probe.stdout?.trim() !== `v${expected}`) {
  console.error('Render build blocked: Node child-process output capture is unavailable. Run in an environment that permits child processes and stdio pipes.');
  process.exit(1);
}
function run(command, args) {
  const result = spawnSync(command, args, { env, stdio: 'inherit', shell: false });
  if (result.error || result.status !== 0) process.exit(result.status ?? 1);
}
run('npm', ['ci', '--include=dev']);
run(process.execPath, ['node_modules/prisma/build/index.js', 'generate', '--config', 'prisma.applications.config.ts']);
if (mode === 'web') {
  run(process.execPath, ['scripts/render-social-image.mjs']);
  run('npm', ['run', 'build']);
}
