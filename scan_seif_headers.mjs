import fs from 'fs';
import path from 'path';

const corpusDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const mismatched = [];

for (const simanDir of fs.readdirSync(corpusDir).filter(d => d.startsWith('siman'))) {
  const simanPath = path.join(corpusDir, simanDir);
  const seifDirs = fs.readdirSync(simanPath).filter(d => d.startsWith('seif') && fs.statSync(path.join(simanPath, d)).isDirectory());
  for (const seifDir of seifDirs) {
    const seifNum = parseInt(seifDir.replace('seif-', ''));
    const seifPath = path.join(simanPath, seifDir);
    const slugs = fs.readdirSync(seifPath).filter(d => !d.endsWith('.json') && fs.statSync(path.join(seifPath, d)).isDirectory());
    for (const slug of slugs) {
      const hePath = path.join(seifPath, slug, 'he.html');
      if (!fs.existsSync(hePath)) continue;
      const html = fs.readFileSync(hePath, 'utf8');
      const text = html.replace(/<[^>]+>/g, '').trim();
      // Look for (סימן X סעיף Y) or (סימן X בש"ע סעיף Y) pattern
      const m = text.match(/^\(סימן\s+[א-ת"'׳״]{1,10}\s+(?:בש"ע\s+)?סעיף\s+([א-ת"'׳״]{1,10})/);
      if (!m) continue;
      const claimedSeifStr = m[1];
      // If filed under seif-001 but header doesn't start with alef (seif 1)
      if (seifNum === 1 && !claimedSeifStr.startsWith('א')) {
        const preview = text.slice(0, 90).replace(/\n/g, ' ');
        mismatched.push(`${simanDir}/${seifDir}/${slug}: [claimed seif: ${claimedSeifStr}] ${preview}`);
      }
    }
  }
}

console.log('Possibly mismatched (seif-001 but header claims seif 2+): ' + mismatched.length);
mismatched.forEach(r => console.log(r));
