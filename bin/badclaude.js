#!/usr/bin/env node
const path = require('path');
const { spawn } = require('child_process');

let electronBinary;
try {
  electronBinary = require('electron');
} catch (e) {
  console.error('Could not load Electron. Try: npm install -g badclaude');
  process.exit(1);
}

const appPath = path.resolve(__dirname, '..');
const extraArgs = [];
const env = { ...process.env };

if (process.platform === 'linux' && env.WAYLAND_DISPLAY) {
  extraArgs.push('--enable-features=UseOzonePlatform', '--ozone-platform=wayland');
}

const child = spawn(electronBinary, [appPath, ...extraArgs], {
  detached: true,
  env,
  stdio: 'ignore',
  windowsHide: true,
});

child.on('error', (err) => {
  console.error('Failed to start badclaude:', err.message);
  process.exit(1);
});

child.unref();
