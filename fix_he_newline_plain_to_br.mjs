/**
 * fix_he_newline_plain_to_br.mjs
 *
 * Fixes he.html files where entries are separated by NEWLINES only (no <b>
 * tags, no <br> tags) — plain text structure. The corresponding en.html
 * correctly uses <br> between segments.
 *
 * Condition to qualify (all must be true):
 *   1. slug in target list
 *   2. he.html has 0 raw <br> tags
 *   3. he.html has 0 <b> tags  (plain text, not bold-entry style)
 *   4. Number of non-empty lines in he.html equals brSegs(en.html)
 *
 * Fix: join the non-empty lines with '<br />\n' so the segment count matches.
 *
 * Usage:
 *   node fix_he_newline_plain_to_br.mjs            # dry run
 *   node fix_he_newline_plain_to_br.mjs --execute  # apply
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

const TARGET_SLUGS = ['kereti', 'peleti', 'chiddushei-hilkhot-niddah'];

function brSegs(html) {
  return html.split(/<br\s*\/?>/).filter(s => s.trim()).length;
}
function nonEmptyLines(text) {
  return text.split('\n').filter(l => l.trim());
}

const qualified = [];
const skipped = [];

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  for (const seifDir of fs.readdirSync(simanPath).filter(d => /^seif-\d+$/.test(d)).sort()) {
    for (const slug of TARGET_SLUGS) {
      const dir = path.join(simanPath, seifDir, slug);
      if (!fs.existsSync(dir)) continue;

      const hePath = path.join(dir, 'he.html');
      const enPath = path.join(dir, 'en.html');
      if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

      const he = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
      const en = fs.readFileSync(enPath, 'utf8').replace(/^﻿/, '').trim();

      if ((he.match(/<br\s*\/?>/g) || []).length !== 0) continue; // already has <br>
      if ((he.match(/<b>/g) || []).length !== 0) continue;        // bold-entry style, skip

      const lines = nonEmptyLines(he);
      if (lines.length <= 1) continue; // single entry, nothing to do

      const enSegs = brSegs(en);
      if (lines.length !== enSegs) {
        skipped.push({ loc: `${simanName}/${seifDir}/${slug}`, lines: lines.length, enSegs });
        continue;
      }

      const fixed = lines.join('<br />\n');
      qualified.push({ hePath, loc: `${simanName}/${seifDir}/${slug}`, lines: lines.length, fixed });
    }
  }
}

console.log(`\n=== fix_he_newline_plain_to_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified (safe to fix): ${qualified.length}`);
console.log(`Skipped (line/seg count mismatch): ${skipped.length}\n`);

const bySlug = {};
for (const { loc } of qualified) {
  const slug = loc.split('/')[2];
  bySlug[slug] = (bySlug[slug] || 0) + 1;
}
console.log('By commentator:');
Object.entries(bySlug).forEach(([s, c]) => console.log(`  ${s}: ${c}`));

console.log('\nSample (first 10):');
for (const { loc, lines } of qualified.slice(0, 10)) {
  console.log(`  ${loc}  ${lines} lines → ${lines - 1} <br> tags to insert`);
}
if (qualified.length > 10) console.log(`  ... and ${qualified.length - 10} more`);

if (skipped.length) {
  console.log('\nSkipped (line count ≠ en segs):');
  for (const { loc, lines, enSegs } of skipped.slice(0, 10)) {
    console.log(`  ${loc}  lines=${lines} enSegs=${enSegs}`);
  }
  if (skipped.length > 10) console.log(`  ... and ${skipped.length - 10} more`);
}

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes made. Re-run with --execute to apply.');
  process.exit(0);
}

let written = 0;
const failed = [];
for (const { hePath, fixed } of qualified) {
  try {
    fs.writeFileSync(hePath, fixed, 'utf8');
    written++;
  } catch {
    failed.push({ hePath, fixed });
  }
}
if (failed.length) {
  process.stdout.write(`\nRetrying ${failed.length} locked files...\n`);
  for (const { hePath, fixed } of failed) {
    try {
      fs.writeFileSync(hePath, fixed, 'utf8');
      written++;
    } catch {
      process.stdout.write(`  STILL LOCKED: ${hePath}\n`);
    }
  }
}

console.log(`\nDone. ${written} files updated.`);
console.log('Run bundle-corpus.mjs --volume yd1 to rebuild bundles.');
