/**
 * fix_mechaber_rama_br.mjs
 *
 * Safe fix for mechaber en.html files that are missing <br> separators.
 *
 * Condition to qualify (all must be true):
 *   1. slug === mechaber
 *   2. Hebrew has N segments (split on <br>)
 *   3. English has exactly 1 segment (no <br> at all)
 *   4. English contains exactly (N - 1) occurrences of {Rama:
 *
 * Fix: insert <br /> immediately before each {Rama: in the English.
 * This perfectly matches the Hebrew segment count with no guesswork.
 *
 * Usage:
 *   node fix_mechaber_rama_br.mjs            # dry run
 *   node fix_mechaber_rama_br.mjs --execute  # apply changes
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
    const mechaberDir = path.join(simanPath, seifDir, 'mechaber');
    if (!fs.existsSync(mechaberDir)) continue;

    const hePath = path.join(mechaberDir, 'he.html');
    const enPath = path.join(mechaberDir, 'en.html');
    if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

    const he = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
    const en = fs.readFileSync(enPath, 'utf8').replace(/^﻿/, '').trim();

    const heBr = brSegs(he);
    const enBr = brSegs(en);

    if (enBr !== 1) continue; // already has <br>s or is empty — skip

    const ramaCount = (en.match(/\{Rama:/g) || []).length;
    const needed = heBr - 1;

    if (ramaCount === 0 || ramaCount !== needed) {
      // Can't safely fix: no Rama markers, or count doesn't match Hebrew segments
      if (heBr > 1) {
        skipped.push({ loc: `${simanName}/${seifDir}`, heBr, ramaCount, needed });
      }
      continue;
    }

    const fixed = en.replace(/\{Rama:/g, '<br />\n{Rama:');
    qualified.push({ enPath, loc: `${simanName}/${seifDir}`, heBr, ramaCount, fixed });
  }
}

console.log(`\n=== fix_mechaber_rama_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified (safe to fix): ${qualified.length}`);
console.log(`Skipped (Rama count mismatch or no Rama): ${skipped.length}\n`);

if (qualified.length) {
  console.log('Sample of changes (first 10):');
  for (const { loc, heBr, ramaCount } of qualified.slice(0, 10)) {
    console.log(`  ${loc}  he=${heBr} rama=${ramaCount} → will insert ${ramaCount} <br>`);
  }
  if (qualified.length > 10) console.log(`  ... and ${qualified.length - 10} more`);
}

if (skipped.length) {
  console.log('\nSkipped (needs AI):');
  for (const { loc, heBr, ramaCount, needed } of skipped.slice(0, 20)) {
    console.log(`  ${loc}  he=${heBr} rama=${ramaCount} needed=${needed}`);
  }
  if (skipped.length > 20) console.log(`  ... and ${skipped.length - 20} more`);
}

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes made. Re-run with --execute to apply.');
  process.exit(0);
}

let written = 0;
for (const { enPath, fixed } of qualified) {
  fs.writeFileSync(enPath, fixed, 'utf8');
  written++;
}
console.log(`\nDone. ${written} files updated.`);
console.log('Run bundle-corpus-yd1.mjs to rebuild bundles.');
