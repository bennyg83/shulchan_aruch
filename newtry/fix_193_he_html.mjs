import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const seifDir = 'C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/siman193/seif-001';
const MARKER = '**** ENGLISH ****';
const WRITE = process.argv.includes('--write');

const SLUGS = [
  'turei-zahav', 'baer-heitev', 'beer-hagolah', 'beur-hagra',
  'tiferet-yisrael', 'torat-hashlamim', 'chiddushei-hilkhot-niddah'
];

for (const slug of SLUGS) {
  const heFile = join(seifDir, slug, 'he.html');
  const enFile = join(seifDir, slug, 'en.html');
  const content = readFileSync(heFile, 'utf8');

  const heLines = [];
  const enLines = [];

  for (const line of content.split('\n')) {
    if (line.includes(MARKER)) {
      const idx = line.indexOf(MARKER);
      const hePart = line.slice(0, idx).trim();
      const enPart = line.slice(idx + MARKER.length).trim();
      if (hePart) heLines.push(hePart);
      if (enPart) enLines.push(enPart);
    } else {
      // Decide: does this line belong to Hebrew or English?
      // After a MARKER line, lines until the next <b> or Hebrew-start are English
      // Simple heuristic: if previous output went to en, check if this line starts a new Hebrew entry
      const lastWasEn = enLines.length > heLines.length;
      const startsHebrew = /^<b>/.test(line.trim()) || /^[֐-׿װ-״]/.test(line.trim());
      if (lastWasEn && startsHebrew) {
        heLines.push(line);
      } else if (lastWasEn) {
        enLines.push(line);
      } else {
        heLines.push(line);
      }
    }
  }

  const cleanHe = heLines.join('\n').trim();
  const cleanEn = enLines.join('\n').trim();
  const existingEn = readFileSync(enFile, 'utf8').trim();

  console.log('\n=== ' + slug + ' ===');
  console.log('HE (' + cleanHe.length + ' chars): ' + cleanHe.slice(0, 120).replace(/\n/g, '↵'));
  console.log('EN (' + cleanEn.length + ' chars): ' + cleanEn.slice(0, 120).replace(/\n/g, '↵'));
  console.log('EXISTING EN (' + existingEn.length + ' chars): ' + existingEn.slice(0, 80).replace(/\n/g, '↵'));
  console.log('→ en.html will be: ' + (cleanEn.length > 20 ? 'REPLACED with extracted' : 'kept (extracted too short)'));

  if (WRITE) {
    writeFileSync(heFile, cleanHe + '\n', 'utf8');
    if (cleanEn.length > 20) {
      writeFileSync(enFile, cleanEn + '\n', 'utf8');
    }
    console.log('  WRITTEN.');
  }
}

if (!WRITE) console.log('\n--- DRY RUN. Pass --write to apply. ---');
