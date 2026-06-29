/**
 * fix_beer_hagolah_br.mjs
 *
 * Two-pass fix for beer-hagolah segment mismatches:
 *
 * PASS A (he > en): English has all text but footnote markers (1), (2), (°), (°°)
 *   are not preceded by <br>. Insert <br /> before each marker not already
 *   preceded by <br>. Validate: brSegs(fixedEn) === brSegs(he).
 *
 * PASS B (en > he): Hebrew is plain-text with newlines only (no <br>).
 *   Same as kereti/peleti fix — join non-empty lines with '<br />\n'.
 *   Validate: lineCount(he) === brSegs(en).
 *
 * Usage:
 *   node fix_beer_hagolah_br.mjs            # dry run
 *   node fix_beer_hagolah_br.mjs --execute  # apply
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

// Footnote section-start markers in Beer HaGolah English.
// (1), (2), ... or (°), (°°), (*), (**), etc.
const FOOTNOTE_RE = /\(\d+\)|\(°+\)|\(\*+\)/g;

function brSegs(html) {
  return html.split(/<br\s*\/?>/).filter(s => s.trim()).length;
}
function nonEmptyLines(text) {
  return text.split('\n').filter(l => l.trim());
}

function applyEnFix(en) {
  return en.replace(FOOTNOTE_RE, (marker, offset, str) => {
    const before = str.slice(0, offset).trimEnd();
    if (before.length === 0) return marker;
    const stripped = before.replace(/<(?!br)[^>]*>/gi, '').trimEnd();
    if (stripped.length === 0 || /<br\s*\/?>$/.test(stripped)) return marker;
    return '<br />\n' + marker;
  });
}

const passA = { qualified: [], skipped: [] };
const passB = { qualified: [], skipped: [] };

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

    const heSegs = brSegs(he);
    const enSegs = brSegs(en);

    if (heSegs === enSegs) continue;

    if (heSegs > enSegs) {
      // Pass A: try inserting <br> before footnote markers in en
      FOOTNOTE_RE.lastIndex = 0;
      if (!FOOTNOTE_RE.test(en)) { FOOTNOTE_RE.lastIndex = 0; passA.skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, reason: 'no marker' }); continue; }
      FOOTNOTE_RE.lastIndex = 0;
      const fixed = applyEnFix(en);
      const fixedSegs = brSegs(fixed);
      if (fixedSegs !== heSegs) {
        passA.skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, fixed: fixedSegs });
        continue;
      }
      passA.qualified.push({ enPath, loc: `${simanName}/${seifDir}`, before: enSegs, after: fixedSegs, fixed });
    } else {
      // Pass B: en > he — try adding <br> at newline boundaries in he
      const rawBrCount = (he.match(/<br\s*\/?>/g) || []).length;
      if (rawBrCount > 0) { passB.skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, reason: 'he already has <br>' }); continue; }
      const lines = nonEmptyLines(he);
      if (lines.length <= 1) { passB.skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, reason: 'he single line' }); continue; }
      if (lines.length !== enSegs) { passB.skipped.push({ loc: `${simanName}/${seifDir}`, he: heSegs, en: enSegs, lines: lines.length, reason: 'line≠enSeg' }); continue; }
      const fixed = lines.join('<br />\n');
      passB.qualified.push({ hePath, loc: `${simanName}/${seifDir}`, lines: lines.length, fixed });
    }
  }
}

console.log(`\n=== fix_beer_hagolah_br.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Pass A (insert <br> before footnote markers in en): ${passA.qualified.length} qualified, ${passA.skipped.length} skipped`);
console.log(`Pass B (add <br> at newlines in he): ${passB.qualified.length} qualified, ${passB.skipped.length} skipped`);
console.log();

if (passA.qualified.length) {
  console.log('Pass A sample (first 10):');
  passA.qualified.slice(0, 10).forEach(q => console.log(`  ${q.loc}  en: ${q.before} → ${q.after}`));
  if (passA.qualified.length > 10) console.log(`  ... and ${passA.qualified.length - 10} more`);
}
if (passA.skipped.length) {
  console.log('\nPass A skipped (first 10):');
  passA.skipped.slice(0, 10).forEach(s => console.log(`  ${s.loc}  he=${s.he} en=${s.en} ${s.fixed !== undefined ? 'fixed='+s.fixed : ''} [${s.reason||''}]`));
  if (passA.skipped.length > 10) console.log(`  ... and ${passA.skipped.length - 10} more`);
}
if (passB.qualified.length) {
  console.log('\nPass B sample:');
  passB.qualified.forEach(q => console.log(`  ${q.loc}  ${q.lines} he lines → ${q.lines} segs`));
}
if (passB.skipped.length) {
  console.log('\nPass B skipped:');
  passB.skipped.forEach(s => console.log(`  ${s.loc}  he=${s.he} en=${s.en} [${s.reason}]`));
}

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes. Re-run with --execute to apply.');
  process.exit(0);
}

let written = 0;
for (const { enPath, fixed } of passA.qualified) {
  try { fs.writeFileSync(enPath, fixed, 'utf8'); written++; } catch { /* skip locked */ }
}
for (const { hePath, fixed } of passB.qualified) {
  try { fs.writeFileSync(hePath, fixed, 'utf8'); written++; } catch { /* skip locked */ }
}
console.log(`\nDone. ${written} files updated.`);
