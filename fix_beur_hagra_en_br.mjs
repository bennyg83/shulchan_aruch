/**
 * fix_beur_hagra_en_br.mjs
 *
 * Fixes beur-hagra en.html files where multiple entries are separated by
 * blank lines without <br>, causing them to merge into one segment in the
 * side-by-side reader.
 *
 * Pattern: en.html has entries starting with ** (bold marker). Each non-last
 * entry must end with <br>. Missing ones cause he > en segment mismatch.
 *
 * Fix: for each non-last entry line that lacks a trailing <br>, add one.
 * Only applies when brSegs(he) > brSegs(en) and the fix achieves alignment.
 *
 * Usage:
 *   node fix_beur_hagra_en_br.mjs            # dry run
 *   node fix_beur_hagra_en_br.mjs --execute  # apply
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

function applyFix(en) {
  const lines = en.split('\n');
  // Collect indices of all ENTRY lines (start with **)
  const entryIndices = lines
    .map((l, i) => l.trimStart().startsWith('**') ? i : -1)
    .filter(i => i >= 0);

  if (entryIndices.length < 2) return en; // nothing to fix

  const result = [...lines];
  // For each entry except the last, find the last non-blank line of that
  // entry's "block" (up to the next entry's line) and add <br> if missing.
  for (let e = 0; e < entryIndices.length - 1; e++) {
    const entryLine = entryIndices[e];
    const nextEntry = entryIndices[e + 1];
    // Find the last non-blank line in [entryLine, nextEntry)
    let lastContentLine = entryLine;
    for (let i = nextEntry - 1; i >= entryLine; i--) {
      if (result[i].trim() !== '') { lastContentLine = i; break; }
    }
    // Add <br /> if not already there
    if (!/<br\s*\/?>/.test(result[lastContentLine])) {
      result[lastContentLine] = result[lastContentLine].trimEnd() + '<br />';
    }
  }
  return result.join('\n');
}

const qualified = [];
const skipped = [];
const already = [];

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  for (const seifDir of fs.readdirSync(simanPath).filter(d => /^seif-\d+$/.test(d)).sort()) {
    const dir = path.join(simanPath, seifDir, 'beur-hagra');
    if (!fs.existsSync(dir)) continue;

    const hePath = path.join(dir, 'he.html');
    const enPath = path.join(dir, 'en.html');
    if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

    const he = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
    const en = fs.readFileSync(enPath, 'utf8').replace(/^﻿/, '').trim();

    const heSegs = brSegs(he);
    const enSegs = brSegs(en);

    if (heSegs === enSegs) { already.push(`${simanName}/${seifDir}`); continue; }
    if (heSegs < enSegs) {
      skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, note: 'en>he (reversed)' });
      continue;
    }

    const fixed = applyFix(en);
    const fixedSegs = brSegs(fixed);

    if (fixedSegs !== heSegs) {
      skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, fixed: fixedSegs, note: 'fix did not align' });
      continue;
    }

    qualified.push({ enPath, loc: `${simanName}/${seifDir}`, before: enSegs, after: fixedSegs, fixed });
  }
}

console.log(`\n=== fix_beur_hagra_en_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Already aligned:     ${already.length}`);
console.log(`Qualified (safe fix): ${qualified.length}`);
console.log(`Skipped (unfixable):  ${skipped.length}\n`);

console.log('Sample qualified (first 15):');
for (const { loc, before, after } of qualified.slice(0, 15)) {
  console.log(`  ${loc}  en: ${before} → ${after}`);
}
if (qualified.length > 15) console.log(`  ... and ${qualified.length - 15} more`);

if (skipped.length) {
  console.log('\nSkipped (need review):');
  for (const { loc, he, en, fixed, note } of skipped.slice(0, 20)) {
    console.log(`  ${loc}  he=${he} en=${en}${fixed !== undefined ? ' fixed='+fixed : ''}  [${note}]`);
  }
  if (skipped.length > 20) console.log(`  ... and ${skipped.length - 20} more`);
}

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
    } catch {
      process.stdout.write(`  STILL LOCKED: ${enPath}\n`);
    }
  }
}

console.log(`\nDone. ${written} files updated.`);
console.log('Run bundle-corpus.mjs --volume yd1 to rebuild bundles.');
