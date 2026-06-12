import fs from 'fs';
const d = JSON.parse(fs.readFileSync('_siman-069-hebrew-dump.json', 'utf8'));
const sk = d['siftei-kohen'];
for (const k of ['1#א', '1#ב', '5#_']) {
  console.log('---', k);
  console.log(sk[k].slice(0, 120));
}
