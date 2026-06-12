#!/usr/bin/env node
/**
 * sprint-pending-simanim.mjs — Refresh checklist, list simanim with pending work,
 * then run queue-next + build-agent-batch once per siman (separate queue/batch files).
 *
 *   node pipeline/sprint-pending-simanim.mjs
 *   node pipeline/sprint-pending-simanim.mjs --skip-refresh --max-simanim 10 --max-blocks 40
 *   node pipeline/sprint-pending-simanim.mjs --list-only
 */
import { spawnSync } from 'child_process';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadPendingSimanim } from './lib/checklist-simanim.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT   = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot:        path.join(OC_ROOT, 'output'),
    skipRefresh:    false,
    listOnly:       false,
    maxSimanim:     25,
    maxBlocks:      50,
    maxFiles:       50,
    minPending:     1,
    checklistPath:  path.join(OC_ROOT, 'checklist-output', 'checklist.json'),
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--out':           opts.outRoot = path.resolve(args[++i]); break;
      case '--skip-refresh':  opts.skipRefresh = true; break;
      case '--list-only':     opts.listOnly = true; break;
      case '--max-simanim':   opts.maxSimanim = parseInt(args[++i], 10) || 25; break;
      case '--max-blocks':    opts.maxBlocks = parseInt(args[++i], 10) || 50; break;
      case '--max-files':     opts.maxFiles = parseInt(args[++i], 10) || 50; break;
      case '--min-pending':   opts.minPending = parseInt(args[++i], 10) || 1; break;
      case '--checklist':     opts.checklistPath = path.resolve(args[++i]); break;
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

  console.log('\n── EH001 sprint by siman (pending from checklist scan) ──\n');

  if (!opts.skipRefresh) {
    console.log('1) Refresh checklist scan…');
    runNode('../sa-checklist.mjs', ['--out', opts.outRoot]);
  } else {
    console.log('1) Using existing checklist (--skip-refresh)');
  }

  if (!fs.existsSync(opts.checklistPath)) {
    console.error(`No checklist at ${opts.checklistPath}. Run without --skip-refresh.`);
    process.exit(1);
  }

  let simanim = loadPendingSimanim(opts.checklistPath).filter(s => s.pending >= opts.minPending);
  console.log(`\n2) Simanim with pending translations: **${simanim.length}** (processing top ${opts.maxSimanim} this run)\n`);

  if (opts.listOnly) {
    for (const s of simanim.slice(0, opts.maxSimanim))
      console.log(`  siman ${s.siman}\t${s.pending} pending\t(${s.done}/${s.total} done)`);
    console.log('');
    return;
  }

  simanim = simanim.slice(0, opts.maxSimanim);
  const workDir = path.join(__dirname, 'work');
  fs.mkdirSync(workDir, { recursive: true });

  const batches = [];
  let n = 0;
  for (const { siman, pending } of simanim) {
    const tag = String(siman).padStart(3, '0');
    const queueOut = path.join(workDir, `queue-siman-${tag}.json`);
    const batchOut = path.join(workDir, `batch-siman-${tag}.md`);

    console.log(`\n── Siman ${siman} (${pending} pending in scan) ──`);
    runNode('queue-next.mjs', [
      '--out', opts.outRoot,
      '--siman', String(siman),
      '--max-blocks', String(opts.maxBlocks),
      '--max-files', String(opts.maxFiles),
      '--queue-out', queueOut,
    ]);

    const q = JSON.parse(fs.readFileSync(queueOut, 'utf8'));
    if (q.itemCount === 0) {
      console.log('  (no blocks in queue — likely all checkpointed or nothing on disk)');
      continue;
    }

    runNode('build-agent-batch.mjs', ['--queue', queueOut, '--out', batchOut]);
    batches.push({ siman, pendingFromScan: pending, blocksInBatch: q.itemCount, queue: queueOut, batch: batchOut });
    n++;
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    outRoot:     opts.outRoot,
    maxSimanim:  opts.maxSimanim,
    maxBlocks:   opts.maxBlocks,
    batchesWritten: n,
    batches,
  };
  fs.writeFileSync(path.join(workDir, 'sprint-by-siman-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\nDone. Wrote **${n}** batch file(s) under ${workDir}`);
  console.log(`Manifest: ${path.join(workDir, 'sprint-by-siman-manifest.json')}`);
  console.log('\nNext: translate each batch-siman-*.md, apply edits, then:');
  console.log('  npm run apply:dictionary');
  console.log('  npm run pipeline:mark-done -- --file <ids.txt>\n');
}

main();
