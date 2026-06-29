/**
 * sync_seif_index.mjs
 *
 * Syncs every siman's seif-index.json to match all seif-NNN folders that
 * actually exist on disk. Adds any missing seif numbers; never removes existing ones.
 *
 * Usage:
 *   node sync_seif_index.mjs            # dry run — no disk changes
 *   node sync_seif_index.mjs --execute  # apply updates
 *
 * Undo: git checkout HEAD -- public/corpus/yd1/
 */

import fs from 'fs';
import path from 'path';

const DRY_RUN = !process.argv.includes('--execute');
const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';

const updates = [];

for (const simanName of fs.readdirSync(corpusDir).filter(d => /^siman\d+$/.test(d)).sort()) {
  const simanPath = path.join(corpusDir, simanName);
  const indexPath = path.join(simanPath, 'seif-index.json');
  if (!fs.existsSync(indexPath)) continue;

  const idx = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const indexed = new Set(idx.seifim || []);

  const onDisk = fs.readdirSync(simanPath)
    .filter(d => /^seif-\d+$/.test(d))
    .map(d => parseInt(d.replace('seif-', ''), 10))
    .sort((a, b) => a - b);

  const missing = onDisk.filter(n => !indexed.has(n));
  if (!missing.length) continue;

  const merged = [...new Set([...indexed, ...onDisk])].sort((a, b) => a - b);
  updates.push({ simanName, indexPath, idx, before: [...indexed].sort((a,b)=>a-b), merged, missing });
}

console.log(`\n=== sync_seif_index.mjs (${DRY_RUN ? 'DRY RUN' : 'EXECUTE'}) ===\n`);
console.log(`Simanim needing update: ${updates.length}\n`);

for (const { simanName, before, merged, missing } of updates) {
  console.log(`  ${simanName}: +[${missing.join(',')}] → [${merged.join(',')}]`);
}

if (DRY_RUN) {
  console.log('\n[DRY RUN] No changes made. Re-run with --execute to apply.');
  process.exit(0);
}

const failed = [];
for (const { simanName, indexPath, idx, merged } of updates) {
  try {
    idx.seifim = merged;
    fs.writeFileSync(indexPath, JSON.stringify(idx, null, 2) + '\n', 'utf8');
  } catch (e) {
    failed.push({ simanName, indexPath, idx, merged });
    process.stdout.write(`  LOCKED: ${simanName} — will retry\n`);
  }
}

// One retry pass for locked files
if (failed.length) {
  process.stdout.write(`\nRetrying ${failed.length} locked files...\n`);
  for (const { simanName, indexPath, idx, merged } of failed) {
    try {
      idx.seifim = merged;
      fs.writeFileSync(indexPath, JSON.stringify(idx, null, 2) + '\n', 'utf8');
      process.stdout.write(`  OK: ${simanName}\n`);
    } catch (e) {
      process.stdout.write(`  STILL LOCKED: ${simanName} — skipped\n`);
    }
  }
}

const written = updates.length - failed.filter(f => {
  try { fs.statSync(f.indexPath); return false; } catch { return true; }
}).length;
console.log(`\nDone. ${updates.length - failed.length} updated, ${failed.length} retried.`);
console.log('Run bundle-corpus-yd1.mjs to rebuild bundles.');
