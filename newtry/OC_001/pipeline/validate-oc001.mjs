#!/usr/bin/env node
/**
 * validate-oc001.mjs — Structural checks on OC001 part files.
 *
 *   node pipeline/validate-oc001.mjs --root output
 *   node pipeline/validate-oc001.mjs --root output --from-queue
 *   node pipeline/validate-oc001.mjs --files output/siman_021/mechaber/part-001.txt
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  END_MARKER,
  HEB_MARKER,
  ENG_MARKER,
  walkOc001PartFiles,
  parsePartFileBlocks,
  inferDefaultSiman,
} from './lib/blocks.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT   = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot:     path.join(OC_ROOT, 'output'),
    fromQueue:   false,
    queuePath:   path.join(__dirname, 'work', 'queue.json'),
    files:       [],
    strictPending: false,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--root':
      case '--out':       opts.outRoot = path.resolve(args[++i]); break;
      case '--from-queue': opts.fromQueue = true; break;
      case '--queue':     opts.queuePath = path.resolve(args[++i]); break;
      case '--files':     while (args[i + 1] && !args[i + 1].startsWith('--')) opts.files.push(path.resolve(args[++i])); break;
      case '--strict-pending': opts.strictPending = true; break;
    }
  }
  return opts;
}

function validateFile(absPath, outRoot, strictPending) {
  const errors = [];
  let text;
  try {
    text = fs.readFileSync(absPath, 'utf8');
  } catch (e) {
    return [`${absPath}: ${e.message}`];
  }

  if (!text.includes(HEB_MARKER)) errors.push('missing HEBREW marker');
  if (!text.includes(ENG_MARKER)) errors.push('missing ENGLISH marker');
  if (!text.includes(END_MARKER)) errors.push('missing END BLOCK marker');

  const defSim = inferDefaultSiman(absPath, outRoot);
  const blocks = parsePartFileBlocks(absPath, defSim);
  for (const b of blocks) {
    if (strictPending && !b.translated)
      errors.push(`pending block seif=${b.seif} marker=${b.marker} slug=${b.slug}`);
    if (!b.slug) errors.push('block missing slug: header');
  }

  return errors.length ? errors.map(e => `${path.relative(outRoot, absPath)}: ${e}`) : [];
}

function main() {
  const opts = parseArgs();
  const outRoot = opts.outRoot;
  let files = opts.files;

  if (opts.fromQueue) {
    if (!fs.existsSync(opts.queuePath)) {
      console.error(`No queue at ${opts.queuePath}`);
      process.exit(1);
    }
    const q   = JSON.parse(fs.readFileSync(opts.queuePath, 'utf8'));
    const set = new Set();
    for (const it of q.items || []) {
      if (it.absPath) set.add(path.resolve(it.absPath));
      else if (it.file) set.add(path.resolve(outRoot, it.file));
    }
    files = [...set];
  }

  if (files.length === 0) {
    for (const f of walkOc001PartFiles(outRoot)) files.push(f);
  }

  const all = [];
  for (const f of files) {
    all.push(...validateFile(f, outRoot, opts.strictPending));
  }

  if (all.length) {
    console.error(`Validation failed (${all.length} issue(s)):\n`);
    for (const e of all.slice(0, 200)) console.error(`  ${e}`);
    if (all.length > 200) console.error(`  … and ${all.length - 200} more`);
    process.exit(1);
  }
  console.log(`OK — ${files.length} file(s) checked under ${outRoot}${opts.strictPending ? ' (strict pending)' : ''}`);
}

main();
