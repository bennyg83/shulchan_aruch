/**
 * Map the 3,691 missing-EN corpus entries against their TXT source blocks.
 * Categories:
 *   HAS_REAL   — TXT has non-placeholder, non-garbage EN → can fill corpus
 *   HAS_GARBAGE — TXT has garbage EN (GARBAGE_RE match) → needs translation
 *   HAS_PENDING — TXT has only placeholder blocks → needs translation
 *   NO_TXT      — no TXT file found for this siman/slug → old-build artifact, no TXT source
 */
const fs = require('fs'), path = require('path');

function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function strip(h) { return h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }

const GARBAGE = /terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;
const PENDING_RE = /English translation pending/i;

const corpusBase = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
const txtBase = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_001/output';

// Parse TXT blocks from a file
function parseTxtBlocks(txtPath) {
  if (!fs.existsSync(txtPath)) return null;
  const txt = fs.readFileSync(txtPath, 'utf8').replace(/\r\n/g, '\n');
  const blocks = [];
  const re = /slug:\s*(\S+)\nseif:\s*(\d+)\nmarker:\s*(\S+)\n\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK \*\*\*\*/g;
  let m;
  while ((m = re.exec(txt)) !== null) {
    blocks.push({ slug: m[1], seif: parseInt(m[2]), marker: m[3], he: m[4].trim(), en: m[5].trim() });
  }
  return blocks;
}

// Normalise corpus slug → TXT slug (kaf-hachayim → kaf-hachayyim etc.)
const SLUG_MAP = { 'kaf-hachayim': 'kaf-hachayyim' };
function txtSlug(s) { return SLUG_MAP[s] || s; }

const results = { HAS_REAL: [], HAS_GARBAGE: [], HAS_PENDING: [], NO_TXT: [] };

for (const si of fs.readdirSync(corpusBase).filter(d => d.startsWith('siman'))) {
  const siNum = parseInt(si.replace('siman', ''));
  const siP = path.join(corpusBase, si);
  for (const se of fs.readdirSync(siP).filter(d => { try { return d.startsWith('seif-') && fs.statSync(path.join(siP, d)).isDirectory(); } catch { return false; } })) {
    const seNum = parseInt(se.replace('seif-', ''));
    const seP = path.join(siP, se);
    for (const slug of fs.readdirSync(seP).filter(s => { try { return fs.statSync(path.join(seP, s)).isDirectory(); } catch { return false; } })) {
      const hp = path.join(seP, slug, 'he.html');
      const ep = path.join(seP, slug, 'en.html');
      if (!fs.existsSync(hp)) continue;
      const he = brSegs(fs.readFileSync(hp, 'utf8'));
      if (he.length === 0) continue; // skip empty HE (old skeletons)
      const en = fs.existsSync(ep) ? brSegs(fs.readFileSync(ep, 'utf8')) : [];
      if (en.length > 0) continue; // skip entries that already have EN

      // Find TXT source
      const tSlug = txtSlug(slug);
      const siPadded = String(siNum).padStart(3, '0');
      const txtPath = path.join(txtBase, `siman_${siPadded}`, tSlug, 'part-001.txt');
      const blocks = parseTxtBlocks(txtPath);

      if (!blocks) {
        results.NO_TXT.push({ si, se, slug });
        continue;
      }

      // Find blocks for this seif
      const seifBlocks = blocks.filter(b => b.seif === seNum);
      if (seifBlocks.length === 0) {
        results.NO_TXT.push({ si, se, slug, reason: 'no blocks for seif' });
        continue;
      }

      // Categorise EN content
      const nonPending = seifBlocks.filter(b => !PENDING_RE.test(b.en));
      const withGarbage = nonPending.filter(b => GARBAGE.test(b.en));
      const withReal = nonPending.filter(b => b.en.length > 0 && !GARBAGE.test(b.en));

      if (withReal.length > 0) {
        results.HAS_REAL.push({ si, se, slug, realCount: withReal.length, total: seifBlocks.length });
      } else if (withGarbage.length > 0) {
        results.HAS_GARBAGE.push({ si, se, slug, garbageCount: withGarbage.length, total: seifBlocks.length });
      } else {
        results.HAS_PENDING.push({ si, se, slug, total: seifBlocks.length });
      }
    }
  }
}

console.log('=== Gap Map for 3,691 missing-EN entries ===');
console.log('HAS_REAL   (TXT has usable EN, can fill):  ', results.HAS_REAL.length);
console.log('HAS_GARBAGE (TXT has garbage, needs retranslation):', results.HAS_GARBAGE.length);
console.log('HAS_PENDING (TXT has only placeholders):   ', results.HAS_PENDING.length);
console.log('NO_TXT     (no TXT source found):          ', results.NO_TXT.length);
console.log('');

// Show samples of each
['HAS_REAL', 'HAS_GARBAGE', 'HAS_PENDING', 'NO_TXT'].forEach(cat => {
  console.log(`--- ${cat} (first 5) ---`);
  results[cat].slice(0, 5).forEach(e => console.log(' ', e.si + '/' + e.se + '/' + e.slug, JSON.stringify(e).slice(0, 80)));
});

// Save full results
fs.writeFileSync(
  'C:/Users/binya/Documents/Shulchan aruch/_gap_map.json',
  JSON.stringify(results, null, 2), 'utf8'
);
console.log('\nFull results saved to _gap_map.json');
