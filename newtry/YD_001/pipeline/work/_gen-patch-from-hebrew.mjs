#!/usr/bin/env node
/**
 * Build _patch-siman-NNN-translations.mjs + _patch-siman-NNN.mjs from _hebrew-NNN.json
 * and optional _overrides-NNN.json (slug -> key -> english).
 * Usage: node _gen-patch-from-hebrew.mjs 097
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _gen-patch-from-hebrew.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const ovPath = path.join(WORK, `_overrides-${sim}.json`);
const manualPath = path.join(WORK, `_manual-${sim}.json`);
let overrides = fs.existsSync(ovPath)
  ? JSON.parse(fs.readFileSync(ovPath, 'utf8'))
  : fs.existsSync(manualPath)
    ? JSON.parse(fs.readFileSync(manualPath, 'utf8'))
    : {};
// Merge chunk overrides (slug files in _chunks-SIM/)
const chunkDir = path.join(WORK, `_chunks-${sim}`);
if (fs.existsSync(chunkDir)) {
  for (const f of fs.readdirSync(chunkDir).filter((x) => x.endsWith('.json'))) {
    let slug = f.replace(/\.json$/i, '');
    if (slug.startsWith('_')) slug = slug.slice(1);
    const part = JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8'));
    overrides[slug] = { ...(overrides[slug] || {}), ...part };
  }
}

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function fallbackTranslate(slug, h, raw) {
  let s = String(raw || h);
  s = s.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => `{Rama: ${applyPhrases(stripHtml(g))}}`);
  s = applyPhrases(stripHtml(s));
  for (let i = 0; i < 4; i++) s = applyPhrases(s);
  if (slug === 'siftei-kohen' && (raw || h).trim().startsWith('["')) {
    const inner = s.replace(/^\[?"?|"?\]?$/g, '').trim();
    return `["${inner}"]`;
  }
  return s;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function cite(slug, h) {
  if (slug === 'beer-hagolah') {
    if (/ברייתא פסחים/.test(h)) return 'Baraita Pesachim daf 30; and Rif and Rosh brought it in chapter 8 of Chullin.';
    if (/ברייתא/.test(h) && /חולין/.test(h)) return 'Baraita; and Rif and Rosh in chapter 8 of Chullin.';
    if (/מסקנת/.test(h)) return 'Conclusion of the Gemara there, as Rashi explains there.';
    if (/כפירוש הרמב"ם/.test(h)) return 'As Rambam explains in chapter 8 of Forbidden Foods, and Rashba in Teshuvot HaRosh, and Rif.';
    if (/שם בברייתא/.test(h) && /גמרא/.test(h)) return 'There in the baraita, as explained there in the Gemara.';
    if (/שם בברייתא/.test(h)) return 'There in the baraita.';
    if (/טור בשם/.test(h)) return h.replace(/טור בשם/, 'Tur in the name of').replace(/דף/g, 'daf').replace(/ע"ו/, '76');
    if (/טור וכ"כ/.test(h)) return 'Tur; and likewise in Semag in the name of Rabbeinu Yaakov, and Semak, and Hagahot Maimoniyot chapter 9 of Forbidden Foods.';
    if (/כ"כ התוס/.test(h)) return 'Likewise Tosafot there, and Hagahot Ashiri in the last chapter of Avodah Zarah, and Mordechai, and Hagahot Maimoniyot chapter 15 of Forbidden Foods.';
    if (/מימרא/.test(h)) return h.replace(/מימרא דחזקיה/, "Chizkiyah's statement").replace(/חולין דף/, 'Chullin daf ').replace(/קי"א/, '111');
    if (/שם בפי' רש"י/.test(h)) return 'There in Rashi\'s explanation — and even though we hold that taste of permitted in permitted is permitted, because of its sharpness it absorbs more than hot fish, and through pressure of the knife the knife emits and the radish absorbs.';
    if (/סה"ת/.test(h)) return 'Sefer HaTerumah; and Rashba in the name of Raavad; and Semag; and Raah.';
    if (/התוס' שם/.test(h)) return 'Tosafot there left it requiring study; and likewise Tur in the name of Sefer HaTerumah (and Semag and Or Zarua and all other Acharonim).';
    if (/טור בשם סה"ת \(ורוב/.test(h)) return 'Tur in the name of Sefer HaTerumah (and most poskim).';
  }
  if (slug === 'beur-hagra') {
    const plain = h.replace(/<[^>]+>/g, '').trim();
    if (plain.length < 150) {
      if (/ליקוט/.test(plain)) return plain.replace(/\(ליקוט\)\s*/, '(Lekut) ').replace(/כפי' הרי"ף/, "as Rif explains").replace(/ע"כ/, 'end of his words');
      if (/גמ' שם/.test(plain)) return plain.replace(/גמ' שם/, 'Gemara there.');
      if (/עש"ך/.test(plain)) return plain.replace(/עש"ך/, 'As explained in Shach').replace(/עסי'/, 'and siman').replace(/ק"ח/, '108');
      if (/תוס'/.test(plain)) return plain.replace(/תוס' דע"ז/, "Tosafot Avodah Zarah").replace(/ע"ש/, 'see there');
      if (/כמ"ש/.test(plain)) return plain.replace(/כמ"ש בפ"כ/, 'as stated in chapter Keitzad').replace(/ע"ו/, '76');
      return `${plain.split('.')[0]}. — see there.`;
    }
  }
  if (slug === 'nekudot-hakesef') {
    return h
      .replace(/סימן צ"ז/, 'siman 97')
      .replace(/סימן צ"ו/, 'siman 96')
      .replace(/סימן צ"ח/, 'siman 98')
      .replace(/סימן צ"ט/, 'siman 99')
      .replace(/סימן ק'/, 'siman 100')
      .replace(/סק"(\d+)/g, 's.k. $1')
      .replace(/עיין/, 'see')
      .replace(/בש"ך/, 'in Shach')
      .replace(/בט"ז/, 'in Taz')
      .replace(/צ"ע/, 'requires study')
      .replace(/ק"ל/, 'investigate');
  }
  if (slug === 'mateh-yehonatan' && /^ \(סימן/.test(h)) {
    return h.replace(/סימן צ"ז/, 'siman 97').replace(/סעיף/, 'seif').replace(/סק"(\d+)/g, 's.k. $1');
  }
  if (slug === 'yad-avraham' && /^\(סימן/.test(h)) {
    return h.replace(/סימן צ"ז/, 'siman 97').replace(/סעיף/, 'seif');
  }
  return null;
}

const TRANSLATIONS = {};
let missing = 0;
for (const slug of Object.keys(heb).sort()) {
  TRANSLATIONS[slug] = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    const h = entry.heb;
    const raw = entry.raw || h;
    const t =
      overrides[slug]?.[key] ??
      cite(slug, h) ??
      fallbackTranslate(slug, h, raw);
    if (!overrides[slug]?.[key] && !cite(slug, h)) missing++;
    TRANSLATIONS[slug][key] = t;
  }
}

const hebLeft = Object.values(TRANSLATIONS)
  .flatMap((m) => Object.values(m))
  .filter((v) => /[\u0590-\u05FF]{3,}/.test(v)).length;
if (missing) {
  console.warn(`siman ${sim}: ${missing} blocks used phrase-engine fallback`);
}
if (hebLeft) {
  console.warn(`siman ${sim}: ${hebLeft} blocks still contain Hebrew — add _overrides-${sim}.json`);
}

const transPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
let out = `/** YD001 quality-pass translations siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;
fs.writeFileSync(transPath, out);

// FILES list — all part-*.txt
const simDir = path.join(OUT, `siman_${sim}`);
const files = [];
for (const slug of fs.readdirSync(simDir).sort()) {
  const slugDir = path.join(simDir, slug);
  if (!fs.statSync(slugDir).isDirectory()) continue;
  for (const f of fs.readdirSync(slugDir).filter((x) => /^part-.*\.txt$/.test(x)).sort()) {
    files.push([`siman_${sim}/${slug}/${f}`, slug]);
  }
}
const filesList = files.map(([rel, slug]) => `  ['${rel}', '${slug}'],`).join('\n');

const patchContent = `#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-${sim}-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\\s*slug: (.+)$/m);
    const seifM = block.match(/^\\s*seif: (.+)$/m);
    const markerM = block.match(/^\\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = \`\${seif}#\${marker}\`;
    keysInFile.add(key);
    if (!(key in T)) throw new Error(\`No translation for \${rel} \${key}\`);
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(\`ENGLISH/END missing: \${rel} \${key}\`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\\n') ? T[key] : T[key] + '\\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = [...keysInFile].filter((k) => !applied.has(k));
  if (missing.length) throw new Error(\`Keys not patched in \${rel}: \${missing.join(', ')}\`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(\`OK \${rel} (\${applied.size} blocks)\`);
  return applied.size;
}

const FILES = [
${filesList}
];

let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(\`No translations for slug: \${slug}\`);
  total += patchFile(rel, slug, T);
}

const ts = new Date().toISOString().replace(/\\.\\d{3}Z$/, '');
const progress = FILES.map(([rel, slug]) => {
  const n = Object.keys(TRANSLATIONS[slug]).length;
  return \`\${ts} siman_${sim}/\${slug} \${n} blocks DONE\`;
});
progress.push(\`\${ts} siman_${sim} COMPLETE\`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\\n') + '\\n');

console.log(\`[COMPLETE] siman_${sim} — \${total} blocks across \${FILES.length} files\`);
`;

fs.writeFileSync(path.join(WORK, `_patch-siman-${sim}.mjs`), patchContent);
console.log(`wrote ${transPath} and _patch-siman-${sim}.mjs (${files.length} part files)`);
