import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';

const corpusRoot = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1';
const MARKER = '**** ENGLISH ****';

function findHeHtml(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) findHeHtml(full, results);
    else if (entry === 'he.html') results.push(full);
  }
  return results;
}

const allHeFiles = findHeHtml(corpusRoot);
const affected = allHeFiles.filter(f => readFileSync(f, 'utf8').includes(MARKER));
console.log(`Found ${affected.length} he.html files with leaked English markers (of ${allHeFiles.length} total)`);

const GARBAGE_RE = /Hashem's Word|Lord's Prayer|star worker|Starwork|Bible and the Bible|A\.J\. G\. G\.|M\.M\.M\.|D\.D\.D\./;

let stripped = 0, rescued = 0, skipped = 0;

for (const heFile of affected) {
  const content = readFileSync(heFile, 'utf8');
  const lines = content.split('\n');

  // Extract English lines
  const englishLines = lines
    .filter(l => l.startsWith(MARKER))
    .map(l => l.slice(MARKER.length).trim());

  const enFile = join(dirname(heFile), 'en.html');
  const enExists = existsSync(enFile);
  const enContent = enExists ? readFileSync(enFile, 'utf8').trim() : '';

  const enIsGarbage = !enExists || enContent.length < 10 || GARBAGE_RE.test(enContent);

  if (enIsGarbage && englishLines.length > 0) {
    writeFileSync(enFile, englishLines.join('\n') + '\n', 'utf8');
    rescued++;
    const rel = heFile.replace(corpusRoot, '').replace(/\\/g, '/');
    console.log(`RESCUED: ${rel}`);
  } else if (enIsGarbage) {
    skipped++;
    continue;
  }

  const cleaned = lines.filter(l => !l.startsWith(MARKER));
  writeFileSync(heFile, cleaned.join('\n'), 'utf8');
  stripped++;
}

console.log(`\nDone. Stripped: ${stripped} he.html, Rescued en.html: ${rescued}, Skipped (no English to rescue): ${skipped}`);
