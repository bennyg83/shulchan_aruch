/**
 * move_misplaced_seifs.mjs
 *
 * Finds commentary folders sitting in seif-001 whose embedded Hebrew header
 * claims a different seif (e.g. "(סימן ל"ה סעיף ב')") and moves them to
 * the correct seif folder.
 *
 * Usage:
 *   node move_misplaced_seifs.mjs           # dry run — no disk changes
 *   node move_misplaced_seifs.mjs --execute  # apply moves
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

// Hebrew letter → seif number (strip geresh/apostrophe/quote before lookup)
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

const moves = [];      // { siman, slug, fromSeif, toSeif }
const deletions = [];  // { siman, slug, fromSeif } — source is duplicate of existing target
const skipped = [];    // { siman, slug, toSeif } — target seif not in seif-index.json

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  const seif1Path = path.join(simanPath, 'seif-001');
  if (!fs.existsSync(seif1Path)) continue;

  // Load seif-index.json to know which seifim are published for this siman
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

    const html = fs.readFileSync(hePath, 'utf8');
    const text = html.replace(/<[^>]+>/g, '').trim();

    // Match (סימן X סעיף Y) or (סימן X בש"ע סעיף Y)
    const m = text.match(/^\(סימן\s+[^\s)]+\s+(?:בש"ע\s+)?סעיף\s+([^\s)]+)/);
    if (!m) continue;

    const claimedSeifStr = m[1];
    if (claimedSeifStr.replace(/['"׳'"״]/g, '').startsWith('א')) continue; // seif 1 = correct

    const toSeif = hebrewToSeif(claimedSeifStr);
    if (!toSeif || toSeif === 1) continue;

    // Skip if the target seif is not in seif-index.json — moving there would make it invisible
    if (!publishedSeifim.has(toSeif)) {
      skipped.push({ siman: simanName, slug, toSeif, claimedSeifStr });
      continue;
    }

    const targetSeifDir = path.join(simanPath, `seif-${pad3(toSeif)}`);
    const targetSlugDir = path.join(targetSeifDir, slug);

    if (fs.existsSync(targetSlugDir)) {
      deletions.push({ siman: simanName, slug, fromSeif: 1, toSeif, claimedSeifStr });
    } else {
      moves.push({ siman: simanName, slug, fromSeif: 1, toSeif, claimedSeifStr });
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────────
console.log(`\n=== move_misplaced_seifs.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Moves (seif-001 → target, target doesn't exist yet): ${moves.length}`);
for (const { siman, slug, toSeif, claimedSeifStr } of moves) {
  console.log(`  ${siman}/seif-001/${slug} → seif-${pad3(toSeif)}/ (header claims: ${claimedSeifStr})`);
}
console.log(`\nDeletions (seif-001 copy is duplicate of existing target): ${deletions.length}`);
for (const { siman, slug, toSeif, claimedSeifStr } of deletions) {
  console.log(`  ${siman}/seif-001/${slug} → REMOVE (target seif-${pad3(toSeif)}/${slug} already exists; header claims: ${claimedSeifStr})`);
}
console.log(`\nSkipped (target seif not in seif-index.json — would be invisible): ${skipped.length}`);
for (const { siman, slug, toSeif, claimedSeifStr } of skipped) {
  console.log(`  ${siman}/seif-001/${slug} → seif-${pad3(toSeif)}/ SKIPPED (header claims: ${claimedSeifStr})`);
}
console.log(`\nTotal actionable: ${moves.length + deletions.length} files affected (${skipped.length} skipped)`);

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes made. Re-run with --execute to apply.');
  process.exit(0);
}

// ── Execute ───────────────────────────────────────────────────────────────────
console.log('\nApplying changes...');

for (const { siman, slug, toSeif } of moves) {
  const simanPath = path.join(corpusDir, siman);
  const source = path.join(simanPath, 'seif-001', slug);
  const targetSeifPath = path.join(simanPath, `seif-${pad3(toSeif)}`);
  const target = path.join(targetSeifPath, slug);

  if (!fs.existsSync(targetSeifPath)) fs.mkdirSync(targetSeifPath, { recursive: true });
  fs.renameSync(source, target);
  console.log(`  MOVED   ${siman}/seif-001/${slug} → seif-${pad3(toSeif)}/`);
}

for (const { siman, slug } of deletions) {
  const source = path.join(corpusDir, siman, 'seif-001', slug);
  fs.rmSync(source, { recursive: true, force: true });
  console.log(`  DELETED ${siman}/seif-001/${slug} (duplicate)`);
}

// Rebuild seif-001 manifest for every siman we touched
const touchedSimanim = new Set([...moves, ...deletions].map(x => x.siman));
for (const simanName of touchedSimanim) {
  const seif1Path = path.join(corpusDir, simanName, 'seif-001');
  const manifestPath = path.join(seif1Path, 'translated-sources-manifest.json');
  if (!fs.existsSync(manifestPath)) continue;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!manifest.sources) continue;

  const existingSlugs = new Set(
    fs.readdirSync(seif1Path)
      .filter(d => !d.endsWith('.json') && fs.statSync(path.join(seif1Path, d)).isDirectory())
      .filter(d => fs.existsSync(path.join(seif1Path, d, 'he.html')))
  );

  const before = manifest.sources.length;
  manifest.sources = manifest.sources.filter(s => existingSlugs.has(s.slug) || s.slug === 'mechaber');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`  MANIFEST ${simanName}/seif-001: ${before} → ${manifest.sources.length} sources`);
}

console.log('\nDone. Run bundle-corpus-yd1.mjs to rebuild bundles.');
