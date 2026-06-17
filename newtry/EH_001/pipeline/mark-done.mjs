#!/usr/bin/env node
/**
 * mark-done.mjs — Append completed block ids to pipeline/work/state.json (resume / de-dupe queue).
 *
 *   node pipeline/mark-done.mjs --ids "path#slug=x#seif=1#marker=main" "path#..."
 *   node pipeline/mark-done.mjs --file completed-ids.txt   (one id per line)
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { workDir: path.join(__dirname, 'work'), ids: [], file: null };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--work-dir': opts.workDir = path.resolve(args[++i]); break;
      case '--file':     opts.file = path.resolve(args[++i]); break;
      case '--ids':      while (args[i + 1] && !args[i + 1].startsWith('--')) opts.ids.push(args[++i]); break;
    }
  }
  return opts;
}

function main() {
  const opts = parseArgs();
  fs.mkdirSync(opts.workDir, { recursive: true });
  const statePath = path.join(opts.workDir, 'state.json');

  let state = { completedIds: [], lastUpdated: null };
  if (fs.existsSync(statePath)) {
    try {
      state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
    } catch { /* reset */ }
  }
  const set = new Set(Array.isArray(state.completedIds) ? state.completedIds : []);

  if (opts.file) {
    const lines = fs.readFileSync(opts.file, 'utf8').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    for (const l of lines) set.add(l);
  }
  for (const id of opts.ids) set.add(id);

  state.completedIds = [...set].sort();
  state.lastUpdated  = new Date().toISOString();
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), 'utf8');
  console.log(`Checkpoint: ${state.completedIds.length} id(s) stored → ${statePath}`);
}

main();
