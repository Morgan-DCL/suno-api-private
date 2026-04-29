#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const tokenScript = path.join(projectRoot, 'suno', 'token_suno.py');

console.log('\nSuno auth setup\n');
console.log('This now uses the shared Python auth cache.');
console.log('A dedicated Brave profile will open if a valid token is not already cached.\n');

const pythonCandidates = ['python3', 'python'];
let result = null;

for (const python of pythonCandidates) {
  result = spawnSync(
    python,
    [tokenScript, '--refresh-auth'],
    {
      cwd: projectRoot,
      stdio: 'inherit',
      env: process.env
    }
  );

  if (result.error && result.error.code === 'ENOENT') {
    continue;
  }
  break;
}

if (!result || result.error) {
  console.error('Unable to run Python. Install python3 or run: python3 suno/token_suno.py --refresh-auth');
  process.exit(1);
}

process.exit(result.status ?? 1);
