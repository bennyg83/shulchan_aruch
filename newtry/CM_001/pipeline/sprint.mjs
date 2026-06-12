#!/usr/bin/env node
/**
 * sprint.mjs — One-shot: refresh checklist → queue → agent batch markdown.
 *
 *   node pipeline/sprint.mjs
 *   node pipeline/sprint.mjs --skip-refresh --max-blocks 80
 */
import { spawnSync } from 'child_process';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT   = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot:      path.join(OC_ROOT, 'output'),
    skipRefresh:  false,
    maxBlocks:    100,
    maxFiles:     40,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--out':          opts.outRoot = path.resolve(args[++i]); break;
      case '--skip-refresh': opts.skipRefresh = true; break;
      case '--max-blocks':   opts.maxBlocks = parseInt(args[++i], 10) || 100; break;
      case '--max-files':    opts.maxFiles = parseInt(args[++i], 10) || 40; break;
    }
  }
  return opts;
}

function runNode(scriptRel, extraArgs) {
  const script = path.join(__dirname, scriptRel);
  const r = spawnSync(process.execPath, [script, ...extraArgs], {
    cwd: OC_ROOT,
    stdio: 'inherit',
    env: process.env,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function main() {
  const opts = parseArgs();
  if (!fs.existsSync(opts.outRoot)) {
    console.error(`Missing output dir: ${opts.outRoot}`);
    process.exit(1);
  }

  console.log('\n── CM001 sprint ──\n');

  if (!opts.skipRefresh) {
    console.log('1) Refresh checklist…');
    runNode('../sa-checklist.mjs', ['--out', opts.outRoot]);
  } else {
    console.log('1) Skipping checklist refresh (--skip-refresh)');
  }

  console.log('\n2) Build queue…');
  runNode('queue-next.mjs', [
    '--out', opts.outRoot,
    '--max-blocks', String(opts.maxBlocks),
    '--max-files', String(opts.maxFiles),
  ]);

  console.log('\n3) Build agent batch…');
  runNode('build-agent-batch.mjs', []);

  const batch = path.join(__dirname, 'work', 'batch-latest.md');
  console.log(`\nDone. Open for translation:\n  ${batch}\n`);
  console.log('Next: translate blocks in the batch, apply edits to the listed files, then run:');
  console.log(`  npm run pipeline:validate -- --from-queue`);
  console.log(`  npm run apply:dictionary`);
  console.log(`  npm run pipeline:mark-done -- --file <ids.txt>   # optional; one stable id per line\n`);
}

main();
