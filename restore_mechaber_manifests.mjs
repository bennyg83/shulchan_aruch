import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const corpusRoot = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const mechaber_entry = {
  slug: "mechaber",
  title: "Mechaber & Rama",
  long: false,
  dataKey: "mechaber",
  includeInReader: true
};

// Collect all siman numbers from corpus
const allSimanim = readdirSync(corpusRoot)
  .filter(d => /^siman\d+$/.test(d))
  .map(d => parseInt(d.replace('siman', ''), 10))
  .sort((a, b) => a - b);

let fixed = 0;
for (const siman of allSimanim) {
  const simanDir = join(corpusRoot, `siman${siman}`);
  if (!existsSync(simanDir)) continue;
  for (const seifDir of readdirSync(simanDir)) {
    if (!seifDir.startsWith('seif-')) continue;
    const manifestPath = join(simanDir, seifDir, 'translated-sources-manifest.json');
    const mechFile = join(simanDir, seifDir, 'mechaber', 'en.html');
    if (!existsSync(manifestPath) || !existsSync(mechFile)) continue;
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    if (manifest.sources.some(s => s.slug === 'mechaber')) continue; // already there
    manifest.sources.unshift(mechaber_entry);
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
    fixed++;
  }
}
console.log(`Patched ${fixed} manifests`);
