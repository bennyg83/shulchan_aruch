import fs from 'fs';
import path from 'path';

function stripHtml(h) {
  return h
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/<br>/gi, '\n')
    .trim();
}

const dir = path.resolve('output/siman_048');
const canon = [
  'mechaber', 'turei-zahav', 'siftei-kohen', 'baer-heitev', 'beer-hagolah',
  'beur-hagra', 'kereti', 'peleti', 'pitchei-teshuva', 'nekudot-hakesef',
  'kaf-hachayim', 'mateh-yehonatan', 'yad-avraham', 'yad-ephraim', 'rabbi-akiva-eiger-yd',
];
const out = {};
for (const slug of canon) {
  const t = fs.readFileSync(path.join(dir, slug, 'part-001.txt'), 'utf8');
  out[slug] = [];
  for (const b of t.split('**** YD001 SOURCE BLOCK ****').filter((x) => x.includes('**** HEBREW ****'))) {
    const seif = b.match(/seif:\s*(\d+)/)[1];
    const marker = b.match(/marker:\s*(.+)/)[1].trim();
    const key = `${seif}#${marker === 'main' ? 'main' : marker}`;
    const he = b.split('**** HEBREW ****')[1].split('**** ENGLISH ****')[0].trim();
    out[slug].push({ key, he: stripHtml(he) });
  }
}
fs.writeFileSync('pipeline/work/_siman-048-blocks.json', JSON.stringify(out, null, 2));
console.log('blocks', Object.values(out).reduce((a, x) => a + x.length, 0));
