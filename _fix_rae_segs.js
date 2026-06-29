/**
 * Fix RAE HE:2 EN:3 segment mismatches.
 * Two patterns:
 *   1. Duplicate adjacent EN segment → remove the duplicate
 *   2. EN[0] is from wrong (prior) seif → remove EN[0]
 * Garbage cases are skipped and reported for Codex.
 */
const fs = require('fs'), path = require('path');
const DRY = process.argv.includes('--dry');

function brSegs(h) { return h.split(/<br\s*\/?>/).filter(s => s.trim()); }
function strip(h) { return h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
const GARBAGE = /terrorist|heaven'?s people|kgb|lord'?s prayer|starwork|star work|lycott|bible and the bible|hand recoils|first dish|saturday\b|muktzeh.*allocat|m\.m\.m|d\.d\.d|her age\b|the craft\b/i;

function safeWrite(p, c) {
  const t = p + '.tmp';
  fs.writeFileSync(t, c, 'utf8');
  try { fs.renameSync(t, p); } catch {
    try { fs.unlinkSync(p); } catch {}
    fs.renameSync(t, p);
  }
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';
let fixed = 0, skippedGarbage = 0, skippedOther = 0;
const garbageCases = [];

for (const si of fs.readdirSync(base).filter(d => d.startsWith('siman'))) {
  const siPath = path.join(base, si);
  for (const se of fs.readdirSync(siPath).filter(d => { try { return d.startsWith('seif-') && fs.statSync(path.join(siPath, d)).isDirectory(); } catch { return false; } })) {
    const hp = path.join(siPath, se, 'rabbi-akiva-eiger', 'he.html');
    const ep = path.join(siPath, se, 'rabbi-akiva-eiger', 'en.html');
    if (!fs.existsSync(hp) || !fs.existsSync(ep)) continue;
    const he = brSegs(fs.readFileSync(hp, 'utf8'));
    const en = brSegs(fs.readFileSync(ep, 'utf8'));
    if (he.length !== 2 || en.length !== 3) continue;

    // Check for garbage in any EN segment
    const isGarbage = en.some(s => GARBAGE.test(strip(s)));
    if (isGarbage) {
      skippedGarbage++;
      garbageCases.push({ si, se, ep });
      continue;
    }

    let kept = null;

    // Only fix unambiguous duplicates — adjacent identical segments
    if (strip(en[0]) === strip(en[1])) {
      kept = [en[0], en[2]];
    } else if (strip(en[1]) === strip(en[2])) {
      kept = [en[0], en[1]];
    } else {
      // Non-duplicate: find the stray segment by seif reference.
      // Pattern A: EN[0] references a lower seif → stray is at front, keep EN[1]+EN[2]
      // Pattern B: EN[2] references a higher seif → stray is at end, keep EN[0]+EN[1]
      const seifNum = parseInt(se.replace('seif-', ''));
      const ref0 = (strip(en[0]).match(/[Ss]e[i']?[if]?\s+(\d+)/) || [])[1];
      const ref2 = (strip(en[2]).match(/[Ss]e[i']?[if]?\s+(\d+)/) || [])[1];
      if (ref0 && parseInt(ref0) < seifNum) {
        kept = [en[1], en[2]]; // stray at front
      } else if (ref2 && parseInt(ref2) > seifNum) {
        kept = [en[0], en[1]]; // stray at end
      } else {
        skippedOther++;
        garbageCases.push({ si, se, ep, reason: 'non-dup-ambiguous' });
        continue;
      }
    }

    if (!DRY) {
      safeWrite(ep, kept.join('<br />\n') + '\n');
    }
    fixed++;
    if (DRY && fixed <= 5) {
      console.log(`DRY ${si}/${se}: EN[${en.length}]→[${kept.length}]`);
      console.log(`  Removed: "${strip(en.find(s => !kept.includes(s)) || '').slice(0, 70)}"`);
    }
  }
}

console.log(`${DRY ? 'DRY ' : ''}Fixed: ${fixed} | Skipped (garbage): ${skippedGarbage} | Skipped (other): ${skippedOther}`);
if (garbageCases.length) {
  console.log('Garbage cases (need Codex):');
  garbageCases.forEach(c => console.log(' ', c.si + '/' + c.se));
}
