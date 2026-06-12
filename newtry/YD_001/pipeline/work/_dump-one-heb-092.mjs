import fs from 'fs';
const [slug, key] = process.argv.slice(2);
const h = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
const v = h[slug][key];
const raw = typeof v === 'string' ? v : v.raw || v.heb || '';
const out = `_heb-${slug}-${key.replace('#', '-')}.txt`;
fs.writeFileSync(out, raw);
console.log('Wrote', out, raw.length);
