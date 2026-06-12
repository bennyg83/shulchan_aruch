import fs from 'fs';
const h = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
for (const slug of ['mateh-yehonatan', 'yad-avraham', 'peleti', 'turei-zahav']) {
  for (const [k, v] of Object.entries(h[slug])) {
    const raw = typeof v === 'string' ? v : v.raw || v.heb || '';
    console.log(slug, k, raw.length);
  }
}
