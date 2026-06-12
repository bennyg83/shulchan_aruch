import fs from 'fs';
const d = JSON.parse(fs.readFileSync('_siman-069-hebrew-dump.json', 'utf8'));
const sk = d['siftei-kohen'];
const tz = d['turei-zahav'];
console.log('siftei-kohen', Object.keys(sk).length);
console.log('turei-zahav', Object.keys(tz).length);
for (const [k, v] of Object.entries(sk)) {
  const isArr = v.startsWith('["');
  console.log(`SK\t${k}\t${isArr ? 'ARRAY' : 'PLAIN'}\t${v.length}`);
}
for (const [k, v] of Object.entries(tz)) {
  console.log(`TZ\t${k}\tPLAIN\t${v.length}`);
}
