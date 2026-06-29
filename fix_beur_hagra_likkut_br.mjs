/**
 * fix_beur_hagra_likkut_br.mjs
 *
 * Fixes beur-hagra en.html files where Likkut sections are embedded inline
 * without a <br> separator. The Hebrew has each Likkut entry as its own segment
 * (with <br>), but the English has the Likkut content merged into the preceding
 * paragraph — marked by (Likkut), [Collection:], etc. but no <br> break.
 *
 * Fix: insert <br /> immediately before each Likkut marker that is not already
 * preceded by a <br> tag.
 * Only applies when the fix produces exact segment alignment with the Hebrew.
 *
 * Usage:
 *   node fix_beur_hagra_likkut_br.mjs            # dry run
 *   node fix_beur_hagra_likkut_br.mjs --execute  # apply
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

// Matches Likkut START markers embedded in English prose.
// Includes transliterations (Likkut, Lekut, Leket, Luke) and English synonyms
// (Collection, Extract, Excerpt, Collected, Anthology, Supplement, Addition).
// Does NOT include end-of-Likkut markers like (end), (end extract), (until here).
const MARKER_RE = /\(li[ky]+[uo]t[s]?\)|\(lekut\)|\(likut\)|\(leket\)|\(luke\)|\(collection[s]?\)|\[collection[:\s]*\]|\(extract[s]?\)|\(excerpt[s]?\)|\(collected(?:\s+notes)?\)|\(anthology\)|\(supplement\)|\(addition\)/gi;

function brSegs(html) {
  return html.split(/<br\s*\/?>/).filter(s => s.trim()).length;
}

function applyFix(en) {
  // Add <br /> before each Likkut marker not already preceded by <br>.
  // Strip trailing non-<br> HTML tags (e.g. <b>) before checking, so that
  // patterns like "<br>\n<b>(Likkut)" are correctly seen as already having <br>.
  return en.replace(MARKER_RE, (marker, offset, str) => {
    const before = str.slice(0, offset).trimEnd();
    if (before.length === 0) return marker;
    // Remove trailing HTML tags that are NOT <br>
    const stripped = before.replace(/<(?!br)[^>]*>/gi, '').trimEnd();
    if (stripped.length === 0 || /<br\s*\/?>$/.test(stripped)) return marker;
    return '<br />\n' + marker;
  });
}

const qualified = [];
const skipped = [];

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

    if (heSegs <= enSegs) continue; // already aligned or reversed

    if (!MARKER_RE.test(en)) { MARKER_RE.lastIndex = 0; continue; }
    MARKER_RE.lastIndex = 0;

    const fixed = applyFix(en);
    const fixedSegs = brSegs(fixed);

    if (fixedSegs !== heSegs) {
      skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, fixed: fixedSegs });
      continue;
    }

    qualified.push({ enPath, loc: `${simanName}/${seifDir}`, before: enSegs, after: fixedSegs, fixed });
  }
}

console.log(`\n=== fix_beur_hagra_likkut_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified (aligns after fix): ${qualified.length}`);
console.log(`Skipped (still misaligned):   ${skipped.length}\n`);

console.log('Sample qualified (first 15):');
for (const { loc, before, after } of qualified.slice(0, 15)) {
  console.log(`  ${loc}  en: ${before} → ${after}`);
}
if (qualified.length > 15) console.log(`  ... and ${qualified.length - 15} more`);

if (skipped.length) {
  console.log('\nSample skipped (first 10):');
  for (const { loc, he, en, fixed } of skipped.slice(0, 10)) {
    console.log(`  ${loc}  he=${he} en=${en} fixed=${fixed}`);
  }
  if (skipped.length > 10) console.log(`  ... and ${skipped.length - 10} more`);
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
