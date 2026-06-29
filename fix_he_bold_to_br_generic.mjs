/**
 * fix_he_bold_to_br_generic.mjs
 *
 * Generic fix for en > he segment mismatches where the Hebrew uses <b> entry
 * headers without sufficient <br> separators. Handles cases the original
 * fix_he_newline_to_br.mjs missed (rawBr > 0 but still under-separated).
 *
 * Condition to qualify (all must be true):
 *   1. brSegs(en) > brSegs(he)  — English has MORE segments than Hebrew
 *   2. he.html has at least 1 <b> tag
 *   3. After inserting <br /> before each <b> not already preceded by <br>,
 *      brSegs(fixedHe) === brSegs(en)  — exact alignment achieved
 *
 * No slug restriction — scans the entire corpus.
 *
 * Usage:
 *   node fix_he_bold_to_br_generic.mjs            # dry run
 *   node fix_he_bold_to_br_generic.mjs --execute  # apply
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

function applyFix(he) {
  // Insert <br /> before each <b> that is not already preceded by <br>
  // (ignoring intervening non-<br> HTML tags like </b>, whitespace, newlines).
  return he.replace(/<b>/g, (match, offset, str) => {
    const before = str.slice(0, offset).trimEnd();
    if (before.length === 0) return match; // first <b> in file
    const stripped = before.replace(/<(?!br)[^>]*>/gi, '').trimEnd();
    if (stripped.length === 0 || /<br\s*\/?>$/.test(stripped)) return match;
    return '<br />\n<b>';
  });
}

const qualified = [];
const skipped = [];

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  for (const seifDir of fs.readdirSync(simanPath).filter(d => /^seif-\d+$/.test(d)).sort()) {
    for (const slug of fs.readdirSync(path.join(simanPath, seifDir)).filter(d => d !== '_included')) {
      const dir = path.join(simanPath, seifDir, slug);
      const hePath = path.join(dir, 'he.html');
      const enPath = path.join(dir, 'en.html');
      if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

      const he = fs.readFileSync(hePath, 'utf8').replace(/^﻿/, '').trim();
      const en = fs.readFileSync(enPath, 'utf8').replace(/^﻿/, '').trim();

      const heSegs = brSegs(he);
      const enSegs = brSegs(en);

      if (enSegs <= heSegs) continue;              // not reversed
      if (!(he.match(/<b>/g) || []).length) continue; // no bold tags to work with

      const fixed = applyFix(he);
      const fixedSegs = brSegs(fixed);

      if (fixedSegs !== enSegs) {
        skipped.push({ loc: `${simanName}/${seifDir}/${slug}`, he: heSegs, en: enSegs, fixed: fixedSegs });
        continue;
      }

      qualified.push({ hePath, loc: `${simanName}/${seifDir}/${slug}`, before: heSegs, after: fixedSegs, fixed });
    }
  }
}

console.log(`\n=== fix_he_bold_to_br_generic.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified (aligns after fix): ${qualified.length}`);
console.log(`Skipped (still misaligned):   ${skipped.length}\n`);

const bySlug = {};
for (const { loc } of qualified) {
  const slug = loc.split('/')[2];
  bySlug[slug] = (bySlug[slug] || 0) + 1;
}
console.log('By commentator:');
Object.entries(bySlug).sort((a, b) => b[1] - a[1]).forEach(([s, c]) => console.log(`  ${s}: ${c}`));

console.log('\nSample (first 10):');
for (const { loc, before, after } of qualified.slice(0, 10)) {
  console.log(`  ${loc}  he: ${before} → ${after}`);
}
if (qualified.length > 10) console.log(`  ... and ${qualified.length - 10} more`);

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
