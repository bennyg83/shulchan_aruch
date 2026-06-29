/**
 * fix_siman35.mjs
 * Step 1: Fix kol-yaakov he.html alignment (inline <br> removal)
 * Step 2: Move misplaced commentaries to correct seif folders
 * Step 3: Strip redundant seif-headers from all siman 35 commentaries
 */

import fs from 'fs';
import path from 'path';

const simanDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/siman35';

// ──────────────────────────────────────────────────────────────────────────────
// STEP 1: Fix kol-yaakov he.html alignment
// Remove all inline <br> (non-terminal), ensure one <br> per non-empty line
// ──────────────────────────────────────────────────────────────────────────────
function fixKolYaakov() {
  const hePath = path.join(simanDir, 'seif-001', 'kol-yaakov', 'he.html');
  const original = fs.readFileSync(hePath, 'utf8');

  const lines = original.split('\n');
  const fixed = lines.map(line => {
    const trimmed = line.trimEnd();
    if (!trimmed) return trimmed; // preserve empty lines
    // Strip ALL <br> from the line, then add exactly one at the end
    const stripped = trimmed.replace(/<br\s*\/?>/gi, '').trimEnd();
    if (!stripped) return ''; // if line was only <br> tags, keep empty
    return stripped + '<br>';
  });

  const result = fixed.join('\n');

  // Verify count before writing
  const brSegs = result.split(/<br\s*\/?>/).filter(s => s.trim()).length;
  const enPath = path.join(simanDir, 'seif-001', 'kol-yaakov', 'en.html');
  const enBrSegs = fs.readFileSync(enPath, 'utf8').split(/<br\s*\/?>/).filter(s => s.trim()).length;

  console.log(`[Step 1] kol-yaakov he br-segs after fix: ${brSegs} (en: ${enBrSegs})`);

  if (brSegs === enBrSegs) {
    fs.writeFileSync(hePath, result, 'utf8');
    console.log('[Step 1] kol-yaakov he.html written. Alignment: OK');
  } else {
    console.log(`[Step 1] MISMATCH — he:${brSegs} en:${enBrSegs}. Not writing.`);
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// STEP 2: Move misplaced commentaries to correct seif folders
// Any file in seif-001 whose text starts with (סימן X סעיף Y) where Y != א
// ──────────────────────────────────────────────────────────────────────────────

// Hebrew letter → seif number — strip geresh/apostrophe/quote before lookup
function hebrewToSeif(hStr) {
  const clean = hStr.trim().replace(/['"׳']/g, '');
  const map = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8,
    'ט': 9, 'י': 10, 'יא': 11, 'יב': 12, 'יג': 13, 'יד': 14,
    'טו': 15, 'טז': 16, 'יז': 17, 'יח': 18, 'יט': 19,
    'כ': 20, 'כא': 21, 'ל': 30, 'מ': 40, 'מג': 43, 'נ': 50,
  };
  return map[clean] || null;
}

function moveSeifFiles() {
  const seif1Path = path.join(simanDir, 'seif-001');
  const slugs = fs.readdirSync(seif1Path)
    .filter(d => !d.endsWith('.json') && fs.statSync(path.join(seif1Path, d)).isDirectory());

  const moves = [];

  for (const slug of slugs) {
    const hePath = path.join(seif1Path, slug, 'he.html');
    if (!fs.existsSync(hePath)) continue;
    const html = fs.readFileSync(hePath, 'utf8');
    const text = html.replace(/<[^>]+>/g, '').trim();

    const m = text.match(/^\(סימן\s+[^\s)]+\s+(?:בש"ע\s+)?סעיף\s+([^\s)]+)/);
    if (!m) continue;

    const claimedSeifStr = m[1].replace(/[' ]/g, '');
    if (claimedSeifStr.startsWith('א')) continue; // Already seif 1, skip

    const seifNum = hebrewToSeif(m[1]);
    if (!seifNum || seifNum === 1) continue;

    moves.push({ slug, seifNum, claimedSeifStr });
  }

  if (moves.length === 0) {
    console.log('[Step 2] No misplaced commentaries found in seif-001.');
    return;
  }

  console.log(`[Step 2] Found ${moves.length} misplaced commentaries:`);

  for (const { slug, seifNum, claimedSeifStr } of moves) {
    const seifDirName = `seif-${String(seifNum).padStart(3, '0')}`;
    const targetSeifPath = path.join(simanDir, seifDirName);
    const targetSlugPath = path.join(targetSeifPath, slug);
    const sourceSlugPath = path.join(seif1Path, slug);

    console.log(`  ${slug}: seif-001 → ${seifDirName} (claimed: ${claimedSeifStr})`);

    // Create seif folder if needed
    if (!fs.existsSync(targetSeifPath)) {
      fs.mkdirSync(targetSeifPath, { recursive: true });
    }

    // Move the slug folder (if target already exists, source is a duplicate — remove it)
    if (fs.existsSync(targetSlugPath)) {
      console.log(`  NOTE: ${seifDirName}/${slug} already exists — removing seif-001 duplicate`);
      fs.rmSync(sourceSlugPath, { recursive: true, force: true });
      continue;
    }
    fs.renameSync(sourceSlugPath, targetSlugPath);
    console.log(`  Moved ${slug} → ${seifDirName}/`);
  }

  // Rebuild seif-001 manifest after moves
  rebuildManifest(seif1Path);
}

function rebuildManifest(seifPath) {
  const manifestPath = path.join(seifPath, 'translated-sources-manifest.json');
  if (!fs.existsSync(manifestPath)) return;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const existingSlugs = new Set(
    fs.readdirSync(seifPath)
      .filter(d => !d.endsWith('.json') && fs.statSync(path.join(seifPath, d)).isDirectory())
      .filter(d => fs.existsSync(path.join(seifPath, d, 'he.html')))
  );

  const originalCount = manifest.sources ? manifest.sources.length : 0;
  if (manifest.sources) {
    manifest.sources = manifest.sources.filter(s => existingSlugs.has(s.slug) || s.slug === 'mechaber');
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`[Step 2] Rebuilt seif-001 manifest: ${originalCount} → ${manifest.sources?.length ?? 0} sources`);
}

// ──────────────────────────────────────────────────────────────────────────────
// STEP 3: Strip redundant seif-headers from he.html and en.html
// Pattern at start: (סימן X סעיף Y ...) or (ס"ק X) etc.
// ──────────────────────────────────────────────────────────────────────────────
function stripSeifHeaders() {
  let stripped = 0;
  let skipped = 0;

  for (const seifDir of fs.readdirSync(simanDir).filter(d => d.startsWith('seif') && fs.statSync(path.join(simanDir, d)).isDirectory())) {
    const seifPath = path.join(simanDir, seifDir);
    const slugs = fs.readdirSync(seifPath)
      .filter(d => !d.endsWith('.json') && fs.statSync(path.join(seifPath, d)).isDirectory());

    for (const slug of slugs) {
      for (const fname of ['he.html', 'en.html']) {
        const fPath = path.join(seifPath, slug, fname);
        if (!fs.existsSync(fPath)) continue;
        let content = fs.readFileSync(fPath, 'utf8');

        const stripped1 = content
          // Hebrew: (סימן ... סעיף ...) at very start, possibly after optional <b>/<i>
          .replace(/^(\s*(?:<[^>]+>\s*)*)\((?:סימן|ס')\s[^)]+\)\s*/, '$1')
          // nekudot-hakesef: (ס"ק X) at start
          .replace(/^(\s*(?:<[^>]+>\s*)*)\(ס"ק\s[^)]+\)\s*/, '$1')
          // English: (Siman ... seif ...) at start
          .replace(/^(\s*(?:<[^>]+>\s*)*)\(Siman\s[^)]+\)\s*/i, '$1');

        if (stripped1 !== content) {
          fs.writeFileSync(fPath, stripped1, 'utf8');
          stripped++;
          console.log(`  [Step 3] Stripped header from ${seifDir}/${slug}/${fname}`);
        } else {
          skipped++;
        }
      }
    }
  }
  console.log(`[Step 3] Done. Stripped: ${stripped} files, unchanged: ${skipped}`);
}

// ──────────────────────────────────────────────────────────────────────────────
// RUN
// ──────────────────────────────────────────────────────────────────────────────
console.log('=== fix_siman35.mjs ===\n');
fixKolYaakov();
console.log('');
moveSeifFiles();
console.log('');
stripSeifHeaders();
console.log('\nDone. Rebuild bundles to apply changes.');
