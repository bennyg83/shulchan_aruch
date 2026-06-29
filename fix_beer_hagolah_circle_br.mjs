/**
 * fix_beer_hagolah_circle_br.mjs
 *
 * Fixes beer-hagolah en.html files where the main text and its (°) footnote
 * are merged into one <br> segment, but the Hebrew has them as two segments.
 *
 * Condition to qualify (all must be true):
 *   1. slug === beer-hagolah
 *   2. Hebrew has exactly 1 more segment than English (diff = 1)
 *   3. English has exactly 1 occurrence of (°) — the footnote marker
 *
 * Fix: insert <br /> immediately before the (°) in the English.
 *
 * Usage:
 *   node fix_beer_hagolah_circle_br.mjs            # dry run
 *   node fix_beer_hagolah_circle_br.mjs --execute  # apply
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function brSegs(html) {
  return html.split(/<br\s*\/?>/).filter(s => s.trim()).length;
}

const qualified = [];
const skipped = [];

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  for (const seifDir of fs.readdirSync(simanPath).filter(d => /^seif-\d+$/.test(d)).sort()) {
    const dir = path.join(simanPath, seifDir, 'beer-hagolah');
    if (!fs.existsSync(dir)) continue;

    const hePath = path.join(dir, 'he.html');
    const enPath = path.join(dir, 'en.html');
    if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

    const he = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
    const en = fs.readFileSync(enPath, 'utf8').replace(/^﻿/, '').trim();

    const diff = brSegs(he) - brSegs(en);
    if (diff !== 1) continue;

    const circles = (en.match(/\(°\)/g) || []).length;
    if (circles !== 1) {
      skipped.push({ loc: `${simanName}/${seifDir}`, diff, circles });
      continue;
    }

    // Insert <br /> before the single (°)
    const fixed = en.replace('(°)', '<br />\n(°)');
    qualified.push({ enPath, loc: `${simanName}/${seifDir}`, fixed });
  }
}

console.log(`\n=== fix_beer_hagolah_circle_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified (safe to fix): ${qualified.length}`);
console.log(`Skipped (diff=1 but 0 or 2+ circles): ${skipped.length}\n`);

console.log('Sample (first 10):');
for (const { loc } of qualified.slice(0, 10)) {
  console.log(`  ${loc}`);
}
if (qualified.length > 10) console.log(`  ... and ${qualified.length - 10} more`);

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes made. Re-run with --execute to apply.');
  process.exit(0);
}

let written = 0;
const failed = [];
for (const { enPath, fixed } of qualified) {
  try {
    fs.writeFileSync(enPath, fixed, 'utf8');
    written++;
  } catch {
    failed.push({ enPath, fixed });
  }
}

if (failed.length) {
  process.stdout.write(`\nRetrying ${failed.length} locked files...\n`);
  for (const { enPath, fixed } of failed) {
    try {
      fs.writeFileSync(enPath, fixed, 'utf8');
      written++;
    } catch (e) {
      process.stdout.write(`  STILL LOCKED: ${enPath}\n`);
    }
  }
}

console.log(`\nDone. ${written} files updated.`);
console.log('Run bundle-corpus-yd1.mjs to rebuild bundles.');
