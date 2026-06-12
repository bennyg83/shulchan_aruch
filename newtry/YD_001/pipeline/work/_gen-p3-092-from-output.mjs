/**
 * Extract ENGLISH from output blocks for p3 slugs, apply term fixes, write TRANSLATIONS_P3 fragment.
 * Run: node _gen-p3-092-from-output.mjs > _p3-extracted-fragment.txt
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('..', 'output', 'siman_092');
const SLUGS = ['turei-zahav', 'peleti', 'mateh-yehonatan', 'yad-avraham'];

const FIXES = [
  [/ben yomo/gi, 'beit yomo'],
  [/ben Yomo/g, 'beit yomo'],
  [/chatichah na'asah nevelah/gi, 'chatichah na\'asah nevelah'],
  [/noten ta'am/gi, 'noten ta\'am'],
  [/kli rishon/gi, 'kli rishon'],
  [/kli sheni/gi, 'kli sheini'],
  [/yad soledes/gi, 'yad soledes bo'],
  [/basar b'chalav/gi, 'basar b\'chalav'],
  [/l'chatchila/gi, 'l\'chatchila'],
  [/b'dieved/gi, 'b\'ieved'],
  [/d'oraisa/gi, 'd\'oraisa'],
  [/d'rabbanan/gi, 'd\'rabbanan'],
  [/Rama:/g, '{Rama:'],
  [/siman (\d+)/g, (_, n) => `siman ${n}`],
  [/the craft/gi, 'melacha'],
  [/Saturday/gi, 'Shabbat'],
  [/first dish/gi, 'kli rishon'],
  [/allocated/gi, 'muktzeh'],
  [/hand recoils/gi, 'yad soledes bo'],
];

function extractEnglish(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const blocks = [];
  const re = /\*\*\*\* ENGLISH \*\*\*\*\r?\n([\s\S]*?)\r?\n\*\*\*\* END BLOCK \*\*\*\*/g;
  let m;
  while ((m = re.exec(text))) blocks.push(m[1].trim());
  return blocks;
}

function parseHeader(filePath, blockIndex) {
  const text = fs.readFileSync(filePath, 'utf8');
  const parts = text.split('**** OC001 SOURCE BLOCK ****').slice(1);
  const b = parts[blockIndex];
  if (!b) return null;
  const slug = b.match(/slug: (.+)/)?.[1];
  const seif = b.match(/seif: (.+)/)?.[1];
  const marker = b.match(/marker: (.+)/)?.[1];
  const key = seif === '_' ? `${seif}_` : `${seif}#${marker}`;
  return { slug, key };
}

function applyFixes(s) {
  let out = s;
  for (const [re, rep] of FIXES) out = out.replace(re, rep);
  return out;
}

function escTemplate(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const out = { turei-zahav: {}, peleti: {}, 'mateh-yehonatan': {}, 'yad-avraham': {} };

for (const slug of SLUGS) {
  const fp = path.join(ROOT, slug, 'part-001.txt');
  if (!fs.existsSync(fp)) {
    console.error('missing', fp);
    continue;
  }
  const eng = extractEnglish(fp);
  const text = fs.readFileSync(fp, 'utf8');
  const headers = [...text.matchAll(/slug: (.+)\r?\nseif: (.+)\r?\nmarker: (.+)/g)];
  headers.forEach((h, i) => {
    const seif = h[2];
    const marker = h[3];
    const key = seif === '_' ? `${seif}_` : `${seif}#${marker}`;
    let t = applyFixes(eng[i] || '[MISSING]');
    out[slug][key] = t;
  });
}

let js = '/** AUTO-EXTRACTED — review and replace with proper translations */\nexport const TRANSLATIONS_P3_EXTRACTED = {\n';
for (const [slug, keys] of Object.entries(out)) {
  js += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys)) {
    js += `    '${key}': \`${escTemplate(val)}\`,\n`;
  }
  js += `  },\n`;
}
js += '};\n';
fs.writeFileSync('_patch-siman-092-translations-p3-extracted.mjs', js);
console.log('Wrote _patch-siman-092-translations-p3-extracted.mjs', Object.values(out).reduce((n, o) => n + Object.keys(o).length, 0), 'blocks'));
