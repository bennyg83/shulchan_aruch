/**
 * fix_he_newline_to_br.mjs
 *
 * Fixes he.html files where multiple bold entries are separated by newlines
 * instead of <br> tags, causing misalignment with the English which uses <br>.
 *
 * Condition to qualify (all must be true):
 *   1. slug in: siftei-kohen, baer-heitev, turei-zahav, beur-hagra
 *   2. he.html has 0 raw <br> tags
 *   3. he.html has N <b> openings (N > 1)
 *   4. en.html has exactly N <br>-separated segments
 *
 * Fix: insert <br /> before each <b> except the first.
 * This adds HTML structure only — no Hebrew text is changed.
 *
 * Usage:
 *   node fix_he_newline_to_br.mjs            # dry run
 *   node fix_he_newline_to_br.mjs --execute  # apply
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

const TARGET_SLUGS = ['siftei-kohen', 'baer-heitev', 'turei-zahav', 'beur-hagra'];

function brSegs(html) {
  return html.split(/<br\s*\/?>/).filter(s => s.trim()).length;
}
function boldCount(html) {
  return (html.match(/<b>/g) || []).length;
}
function rawBrCount(html) {
  return (html.match(/<br\s*\/?>/g) || []).length;
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

      if (rawBrCount(he) !== 0) continue;      // already has <br>
      const heBold = boldCount(he);
      const enSegs = brSegs(en);
      if (heBold <= 1) continue;               // single entry, nothing to add
      if (heBold !== enSegs) {
        skipped.push({ loc: `${simanName}/${seifDir}/${slug}`, heBold, enSegs });
        continue;
      }

      // Insert <br /> before each <b> except the very first occurrence
      let firstSeen = false;
      const fixed = he.replace(/<b>/g, match => {
        if (!firstSeen) { firstSeen = true; return match; }
        return '<br />\n<b>';
      });

      qualified.push({ hePath, loc: `${simanName}/${seifDir}/${slug}`, heBold, fixed });
    }
  }
}

console.log(`\n=== fix_he_newline_to_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Qualified (safe to fix): ${qualified.length}`);
console.log(`Skipped (bold/en-seg count mismatch): ${skipped.length}\n`);

const bySlug = {};
for (const { loc } of qualified) {
  const slug = loc.split('/')[2];
  bySlug[slug] = (bySlug[slug] || 0) + 1;
}
console.log('By commentator:');
Object.entries(bySlug).forEach(([s, c]) => console.log(`  ${s}: ${c}`));

console.log('\nSample (first 10):');
for (const { loc, heBold } of qualified.slice(0, 10)) {
  console.log(`  ${loc}  bold=${heBold} → insert ${heBold - 1} <br>`);
}
if (qualified.length > 10) console.log(`  ... and ${qualified.length - 10} more`);

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
console.log('Run bundle-corpus-yd1.mjs to rebuild bundles.');
