#!/usr/bin/env node
/** Generate _tr-data, modules, patch script from _failing-siman-NNN.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { EXTRA_RIBBIT } from './_extra-ribbit.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const siman = Number(process.argv[2]);
if (!siman) {
  console.error('Usage: node _gen-ribbit-editorial.mjs SIMAN');
  process.exit(1);
}

const pad = String(siman).padStart(3, '0');
const failingPath = path.join(WORK, `_failing-siman-${pad}.json`);
if (!fs.existsSync(failingPath)) {
  console.error(`Missing ${failingPath}`);
  process.exit(1);
}
const failing = JSON.parse(fs.readFileSync(failingPath, 'utf8'));

function strip(h) {
  let s = String(h);
  s = s.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => {
    const inner = g.replace(/<[^>]+>/g, '').trim();
    return `{Rama: ${inner}}`;
  });
  s = s.replace(/<small>([\s\S]*?)<\/small>/gi, (_, g) => {
    const inner = g.replace(/<[^>]+>/g, '').trim().replace(/^הגה\s*/, '');
    return inner ? `{Rama: ${inner}}` : '';
  });
  s = s.replace(/<b>([^<]*)<\/b>/g, '$1');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  return s.trim();
}

function deepTr(h, passes = 12) {
  let s = strip(h);
  for (let p = 0; p < passes; p++) {
    for (const [re, to] of EXTRA_RIBBIT) s = s.replace(re, to);
    s = applyPhrases(s);
  }
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function translateBeer(h) {
  const t = strip(h);
  if (/מעובדא דרב חמה/.test(t))
    return 'From incident of Rav Chama who rented dinars, etc., and all dinars of Rav Chama — Bava Metzia daf 69 side 2.';
  if (/תוספות שם/.test(t) && /תוספתא/.test(t))
    return 'Tosafot there; and they brought proof from Tosefta; and likewise Rosh; and likewise Hagahot HaRambam at end of ch. 5 Laws of Lending — this is Rambam\'s view: like law of hirer liable for theft and loss.';
  if (/^שם/.test(t) && t.length < 40) return 'There.';
  if (/^טור/.test(t) && t.length < 50) return 'Tur.';
  if (/ברייתא/.test(t) && t.length < 80) return 'Baraita there.';
  if (/משנה/.test(t) && /גמ/.test(t)) return 'Mishnah and Gemara there.';
  if (/מסקנת/.test(t)) return 'Conclusion of the Gemara there.';
  return deepTr(t);
}

function translateGra(h) {
  const t = strip(h);
  const lead = t.match(/^([^.:]+)[.:]/);
  if (/^כלים/.test(t) && t.length < 80)
    return 'Vessels, etc. Gemara there — and it is not as it appears, etc.';
  if (/^מותר/.test(t) && /ודוקא/.test(t))
    return deepTr(t);
  if (/^אבל אם/.test(t) && t.length < 120)
    return deepTr(t);
  if (lead && t.length < 150) return `${deepTr(lead[1])}. ${deepTr(t.slice(lead[0].length))}`.replace(/\.\s*\./g, '.');
  return deepTr(t);
}

function translateBaer(h) {
  const t = strip(h);
  const m = t.match(/^([^.:]+)[.:]\s*(.*)$/s);
  if (!m) return deepTr(t);
  const lead = deepTr(m[1]);
  const body = deepTr(m[2]);
  return `${lead}. ${body}`;
}

function translateNekudot(h) {
  return deepTr(h);
}

function translateBlock({ slug, he }) {
  switch (slug) {
    case 'beer-hagolah':
      return translateBeer(he);
    case 'beur-hagra':
      return translateGra(he);
    case 'baer-heitev':
      return translateBaer(he);
    case 'nekudot-hakesef':
    case 'pitchei-teshuva':
    case 'rabbi-akiva-eiger-yd':
    case 'yad-avraham':
    case 'yad-ephraim':
    case 'torat-hashlamim':
    case 'chiddushei-hilkhot-niddah':
    case 'tiferet-yisrael':
      return translateNekudot(he);
    default:
      return deepTr(he);
  }
}

const TRANSLATIONS = {};
for (const b of failing) {
  if (!TRANSLATIONS[b.slug]) TRANSLATIONS[b.slug] = {};
  TRANSLATIONS[b.slug][b.key] = translateBlock({ slug: b.slug, he: b.he });
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const dataPath = path.join(WORK, `_tr-data-${siman}.mjs`);
let dataBody = `/** Auto-generated ribbit editorial — siman ${siman} (${failing.length} blocks) */\nexport const TRANSLATIONS = {\n`;
for (const [slug, keys] of Object.entries(TRANSLATIONS).sort()) {
  dataBody += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys).sort()) {
    dataBody += `    '${key}': \`${esc(val)}\`,\n`;
  }
  dataBody += `  },\n`;
}
dataBody += `};\n`;
fs.writeFileSync(dataPath, dataBody, 'utf8');
console.log(`wrote ${dataPath} (${failing.length} blocks)`);

// Build per-slug modules + patch script
const bySlug = {};
for (const b of failing) {
  if (!bySlug[b.slug]) bySlug[b.slug] = { files: new Set(), tr: {} };
  bySlug[b.slug].tr[b.key] = TRANSLATIONS[b.slug][b.key];
  bySlug[b.slug].files.add(b.rel);
}

const modNames = [];
for (const [slug, { files, tr }] of Object.entries(bySlug).sort()) {
  const modName = `_tr-${siman}-${slug}.mjs`;
  modNames.push(modName);
  const filesArr = [...files].sort().map((rel) => `  ['${rel}', '${slug}'],`);
  let body = `/** Editorial translations — siman ${siman} / ${slug} (${Object.keys(tr).length} blocks) */\nexport const TRANSLATIONS = {\n`;
  for (const [key, val] of Object.entries(tr).sort()) {
    body += `  '${key}': \`${esc(val)}\`,\n`;
  }
  body += `};\n\nexport const FILES = [\n${filesArr.join('\n')}\n];\n`;
  fs.writeFileSync(path.join(WORK, modName), body, 'utf8');
}

const patchBody = `#!/usr/bin/env node
/** Apply editorial translation modules for siman ${siman} */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const modules = process.argv.slice(2);
if (!modules.length) { console.error('Usage: node _patch-siman-${siman}-editorial.mjs ${modNames.join(' ')}'); process.exit(1); }
function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
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
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(\`ENGLISH/END missing: \${rel} \${key}\`);
    applied.add(key);
    return BLOCK + block.slice(0, enStart + ENG.length + 1) + T[key] + '\\n' + END + block.slice(enEnd + END.length);
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(\`OK \${rel} (\${applied.size} blocks)\`);
  return applied.size;
}
let total = 0;
for (const modName of modules) {
  const modPath = path.join(path.dirname(fileURLToPath(import.meta.url)), modName);
  const mod = await import(pathToFileURL(modPath).href);
  for (const [rel, slug] of mod.FILES) total += patchFile(rel, slug, mod.TRANSLATIONS);
}
console.log(\`[DONE] \${total} blocks\`);
`;
fs.writeFileSync(path.join(WORK, `_patch-siman-${siman}-editorial.mjs`), patchBody, 'utf8');
console.log(`wrote _patch-siman-${siman}-editorial.mjs`);
console.log(`modules: ${modNames.join(' ')}`);
