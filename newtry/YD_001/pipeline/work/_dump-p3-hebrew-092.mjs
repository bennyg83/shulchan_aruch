import fs from 'fs';
const heb = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
const slugs = ['siftei-kohen', 'turei-zahav', 'peleti', 'mateh-yehonatan', 'yad-avraham'];
let out = '';
for (const slug of slugs) {
  for (const [key, val] of Object.entries(heb[slug])) {
    const text = typeof val === 'string' ? val : val.hebrew ?? val.text ?? JSON.stringify(val);
    const plain = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    out += `### ${slug} ${key}\n${plain}\n\n`;
  }
}
fs.writeFileSync('_hebrew-092-p3-plain.txt', out);
console.log('wrote', out.length, 'chars', out.split('###').length - 1, 'blocks');
