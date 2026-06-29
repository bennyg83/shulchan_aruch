/**
 * fix_mechaber_title_split.mjs
 *
 * Fixes mechaber seif-001 en.html files where the siman title ("In it are N seifim")
 * and the halachic content are merged into one <br> segment, but the Hebrew has them
 * as two separate segments.
 *
 * Condition to qualify (all must be true):
 *   1. slug === mechaber, seif === seif-001
 *   2. Hebrew has exactly 2 segments
 *   3. English has exactly 1 segment
 *   4. English contains a seif-count phrase (the title) followed by content
 *
 * Fix: insert <br /> after the first "seifim?" (+ trailing punctuation/bold-close)
 * in the English — this is always the title/content boundary.
 *
 * Usage:
 *   node fix_mechaber_title_split.mjs            # dry run (shows transformations)
 *   node fix_mechaber_title_split.mjs --execute  # apply
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

// Match "seif", "seifim", "se'if", "se'ifim" followed by any combo of . : *
// We capture up to and including the trailing punctuation so we can insert <br> right after.
const TITLE_END_RE = /(se['’]?if(?:im)?)([\*\.:]+)/i;

const qualified = [];
const skipped = [];

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  const mechaberDir = path.join(simanPath, 'seif-001', 'mechaber');
  if (!fs.existsSync(mechaberDir)) continue;

  const hePath = path.join(mechaberDir, 'he.html');
  const enPath = path.join(mechaberDir, 'en.html');
  if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

  const he = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
  const en = fs.readFileSync(enPath, 'utf8').replace(/^﻿/, '').trim();

  if (brSegs(he) !== 2) continue;
  if (brSegs(en) !== 1) continue; // already fixed

  const m = en.match(TITLE_END_RE);
  if (!m) {
    skipped.push({ simanName, en: en.slice(0, 120) });
    continue;
  }

  // Build the fixed version: insert <br /> right after the matched punctuation
  const insertPos = m.index + m[0].length;
  const fixed = en.slice(0, insertPos) + '\n<br />\n' + en.slice(insertPos).trimStart();

  qualified.push({ simanName, enPath, matchedPhrase: m[0], before: en.slice(0, insertPos + 40), fixed });
}

console.log(`\n=== fix_mechaber_title_split.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified: ${qualified.length}`);
console.log(`Skipped (no seif-count phrase found): ${skipped.length}\n`);

console.log('Sample transformations (first 10):');
for (const { simanName, matchedPhrase, before } of qualified.slice(0, 10)) {
  console.log(`  ${simanName}  matched: "${matchedPhrase}"  →  insert <br> after: "...${before.slice(-50)}"`);
}
if (qualified.length > 10) console.log(`  ... and ${qualified.length - 10} more`);

if (skipped.length) {
  console.log('\nStill skipped (need manual review):');
  for (const { simanName, en } of skipped) {
    console.log(`  ${simanName}: "${en}"`);
  }
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
