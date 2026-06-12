#!/usr/bin/env node
/**
 * Extract Hebrew, Claude-translate slugs, build overrides, generate patch modules,
 * and apply patches for simanim 127–128.
 *
 * Usage:
 *   node _run-patches-127-128.mjs
 *
 * Notes:
 * - Requires Claude Code CLI availability (see _claude-translate-yd-siman.mjs).
 * - Writes:
 *   _hebrew-127.json, _chunks-127/*.json, _overrides-127.json, _patch-siman-127*.mjs
 *   _hebrew-128.json, _chunks-128/*.json, _overrides-128.json, _patch-siman-128*.mjs
 * - Applies patches to:
 *   - output/siman_127/<slug>/part-*.txt
 *   - output/siman_128/<slug>/part-*.txt
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const simanim = ['127', '128'];

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: WORK,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...opts,
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const sim of simanim) {
  console.log(`\n=== siman ${sim}: extract Hebrew ===`);
  run('node', ['_extract-hebrew-siman.mjs', sim]);

  console.log(`=== siman ${sim}: run Claude translations (all slugs) ===`);
  run('node', ['_run-claude-siman.mjs', sim]);

  console.log(`=== siman ${sim}: build overrides from chunks ===`);
  run('node', ['_build-overrides-from-chunks.mjs', sim]);

  // Sanity check: verify overrides cover all keys
  const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
  const ov = JSON.parse(fs.readFileSync(path.join(WORK, `_overrides-${sim}.json`), 'utf8'));
  let missing = 0;
  for (const slug of Object.keys(heb)) {
    for (const key of Object.keys(heb[slug])) {
      if (!ov?.[slug]?.[key]) missing++;
    }
  }
  if (missing) {
    throw new Error(`siman ${sim}: overrides missing ${missing} keys (see _overrides-${sim}.json)`);
  }

  console.log(`=== siman ${sim}: generate patch translations module ===`);
  run('node', ['_gen-siman-translations.mjs', sim]);

  console.log(`=== siman ${sim}: write patch runner ===`);
  run('node', ['_mk-patch-runner.mjs', sim, `./_patch-siman-${sim}-translations.mjs`]);

  console.log(`=== siman ${sim}: apply patch ===`);
  run('node', [`_patch-siman-${sim}.mjs`]);
}

console.log('\n[COMPLETE] Session done — simanim: 127, 128');

