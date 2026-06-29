import { writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const corpusRoot = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const sourceRoot = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

for (let siman = 128; siman <= 142; siman++) {
  const corpusDir = join(corpusRoot, `siman${siman}`);
  if (!existsSync(corpusDir)) { console.log(`skip siman ${siman}: no corpus dir`); continue; }

  const seifFolders = readdirSync(corpusDir).filter(d => /^seif-\d+$/.test(d)).sort();
  if (!seifFolders.length) { console.log(`skip siman ${siman}: no seif folders`); continue; }

  const maxSeif = parseInt(seifFolders[seifFolders.length - 1].replace('seif-', ''), 10);

  const pad3 = n => String(n).padStart(3, '0');
  const manifest = {
    siman,
    seifRange: { from: 1, to: maxSeif },
  };

  const destPath = join(sourceRoot, `siman_${pad3(siman)}`, 'manifest.json');
  writeFileSync(destPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`siman ${siman}: manifest.json → seifRange 1–${maxSeif}`);
}
console.log('Done');
