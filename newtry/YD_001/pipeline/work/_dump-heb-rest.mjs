import fs from 'fs';
const h = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
const strip = (s) => (s || '').replace(/<[^>]+>/g, '');
const out = '_en/_heb';
fs.mkdirSync(out, { recursive: true });
const map = {
  'peleti-4-b.txt': ['peleti', '4#ב'],
  'mateh-1.txt': ['mateh-yehonatan', '1#_'],
  'mateh-2.txt': ['mateh-yehonatan', '2#_'],
  'mateh-3.txt': ['mateh-yehonatan', '3#_'],
  'mateh-4.txt': ['mateh-yehonatan', '4#_'],
  'mateh-5.txt': ['mateh-yehonatan', '5#_'],
  'mateh-7.txt': ['mateh-yehonatan', '7#_'],
  'yad-1.txt': ['yad-avraham', '1#_'],
  'yad-2.txt': ['yad-avraham', '2#_'],
  'yad-4.txt': ['yad-avraham', '4#_'],
  'yad-5.txt': ['yad-avraham', '5#_'],
  'yad-7.txt': ['yad-avraham', '7#_'],
};
for (const [file, [slug, key]] of Object.entries(map)) {
  const e = h[slug][key];
  fs.writeFileSync(`${out}/${file}`, strip(e.raw || e.heb));
  console.log('wrote', file, strip(e.raw || e.heb).length);
}
