/**
 * expand_seif_index.mjs
 *
 * Audits the 90 simanim where move_misplaced_seifs.mjs skipped a commentary
 * because its target seif wasn't in seif-index.json.
 *
 * For each skipped case, checks whether the target seif FOLDER already exists
 * on disk. If it does, the seif-index.json just needs updating — it was never
 * expanded when the content was published (same pattern as siman 35).
 *
 * Usage:
 *   node expand_seif_index.mjs            # audit only — no disk changes
 *   node expand_seif_index.mjs --execute  # add missing seif numbers to seif-index.json
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 *   or: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

function hebrewToSeif(hStr) {
  const clean = hStr.trim().replace(/['"׳'"״]/g, '');
  const map = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8,
    'ט': 9, 'י': 10, 'יא': 11, 'יב': 12, 'יג': 13, 'יד': 14,
    'טו': 15, 'טז': 16, 'יז': 17, 'יח': 18, 'יט': 19,
    'כ': 20, 'כא': 21, 'כב': 22, 'כג': 23, 'כד': 24, 'כה': 25,
    'כו': 26, 'כז': 27, 'כח': 28, 'כט': 29,
    'ל': 30, 'לא': 31, 'לב': 32, 'לג': 33, 'לד': 34, 'לה': 35,
    'מ': 40, 'מג': 43, 'נ': 50,
  };
  return map[clean] || null;
}

const pad3 = n => String(n).padStart(3, '0');

// Collect same skipped cases as move_misplaced_seifs.mjs
const skipped = []; // { simanName, slug, toSeif, claimedSeifStr }

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  const seif1Path = path.join(simanPath, 'seif-001');
  if (!fs.existsSync(seif1Path)) continue;

  let publishedSeifim = new Set([1]);
  try {
    const idx = JSON.parse(fs.readFileSync(path.join(simanPath, 'seif-index.json'), 'utf8'));
    publishedSeifim = new Set(idx.seifim || [1]);
  } catch { /* use default */ }

  const slugs = fs.readdirSync(seif1Path).filter(d =>
    !d.endsWith('.json') &&
    fs.statSync(path.join(seif1Path, d)).isDirectory()
  );

  for (const slug of slugs) {
    const hePath = path.join(seif1Path, slug, 'he.html');
    if (!fs.existsSync(hePath)) continue;
    const text = fs.readFileSync(hePath, 'utf8').replace(/<[^>]+>/g, '').trim();
    const m = text.match(/^\(סימן\s+[^\s)]+\s+(?:בש"ע\s+)?סעיף\s+([^\s)]+)/);
    if (!m) continue;
    const claimedSeifStr = m[1];
    if (claimedSeifStr.replace(/['"׳'"״]/g, '').startsWith('א')) continue;
    const toSeif = hebrewToSeif(claimedSeifStr);
    if (!toSeif || toSeif === 1) continue;
    if (!publishedSeifim.has(toSeif)) {
      skipped.push({ simanName, slug, toSeif, claimedSeifStr });
    }
  }
}

// ── Audit each skipped case ────────────────────────────────────────────────────
const canExpand   = []; // target seif folder exists on disk → just needs seif-index.json update
const noFolder    = []; // target seif folder doesn't exist → would need new folder + content

for (const item of skipped) {
  const { simanName, toSeif } = item;
  const targetSeifPath = path.join(corpusDir, simanName, `seif-${pad3(toSeif)}`);
  if (fs.existsSync(targetSeifPath)) {
    canExpand.push({ ...item, targetSeifPath });
  } else {
    noFolder.push(item);
  }
}

// ── Report ────────────────────────────────────────────────────────────────────
console.log(`\n=== expand_seif_index.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Total skipped by move script: ${skipped.length}`);

console.log(`\n── CAN EXPAND (seif folder exists on disk, seif-index.json just needs updating): ${canExpand.length}`);
// Group by siman for readability
const bySimanExpand = {};
for (const item of canExpand) {
  (bySimanExpand[item.simanName] ??= []).push(item);
}
for (const [siman, items] of Object.entries(bySimanExpand).sort()) {
  const seifs = [...new Set(items.map(i => i.toSeif))].sort((a, b) => a - b);
  const slugs = items.map(i => `${i.slug}→seif-${pad3(i.toSeif)}`).join(', ');
  console.log(`  ${siman}: add seif(s) ${seifs.join(', ')} to seif-index  [${slugs}]`);
}

console.log(`\n── NO FOLDER (target seif doesn't exist — content not yet published): ${noFolder.length}`);
for (const { simanName, slug, toSeif, claimedSeifStr } of noFolder) {
  console.log(`  ${simanName}/seif-001/${slug} → seif-${pad3(toSeif)} (claims: ${claimedSeifStr}) — folder missing`);
}

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes made.');
  console.log('Re-run with --execute to add missing seif numbers to seif-index.json.');
  console.log('Undo: git checkout HEAD -- public/corpus/yd1/');
  process.exit(0);
}

// ── Execute: update seif-index.json for canExpand simanim ────────────────────
console.log('\nExpanding seif-index.json files...');

const touchedSimanim = new Set(canExpand.map(i => i.simanName));
for (const simanName of [...touchedSimanim].sort()) {
  const simanPath = path.join(corpusDir, simanName);
  const indexPath = path.join(simanPath, 'seif-index.json');
  const idx = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

  const before = [...idx.seifim].sort((a, b) => a - b);
  const toAdd = canExpand
    .filter(i => i.simanName === simanName)
    .map(i => i.toSeif);

  const combined = [...new Set([...idx.seifim, ...toAdd])].sort((a, b) => a - b);
  idx.seifim = combined;

  fs.writeFileSync(indexPath, JSON.stringify(idx, null, 2) + '\n', 'utf8');
  const added = toAdd.filter(s => !before.includes(s));
  console.log(`  ${simanName}: ${JSON.stringify(before)} → ${JSON.stringify(combined)} (added: ${added.join(', ')})`);
}

console.log(`\nDone. ${touchedSimanim.size} seif-index.json files updated.`);
console.log('Next: re-run move_misplaced_seifs.mjs (dry run) to confirm skipped count dropped.');
console.log('Then: run bundle-corpus-yd1.mjs to rebuild bundles.');
