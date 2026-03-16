#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

function has(cmd) {
  const probe = spawnSync(cmd, ['--version'], { stdio: 'ignore' });
  return probe.status === 0;
}

const python = has('python3') ? 'python3' : (has('python') ? 'python' : null);

if (!python) {
  console.error('[dev.mjs] Python is required but not found in PATH.');
  process.exit(1);
}

const result = spawnSync(python, ['scripts/dev.py', ...args], { stdio: 'inherit' });
process.exit(result.status ?? 1);
