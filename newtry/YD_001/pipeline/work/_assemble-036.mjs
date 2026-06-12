#!/usr/bin/env node
/** Merge all translation fragments and emit modules + run compose */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));

async function loadMod(name) {
  try {
    return await import(pathToFileURL(path.join(__dir, name)).href);
  } catch {
    return null;
  }
}

const fragments = [
  './_patch-siman-036-translations.mjs',
  './_patch-siman-036-translations-b.mjs',
  './en-036-yad-avraham.mjs',
];

const extraMaps = [];
for (const f of fragments) {
  const m = await loadMod(f);
  if (!m) continue;
  if (m.TRANSLATIONS) extraMaps.push(m.TRANSLATIONS);
  if (m.TRANSLATIONS_B) extraMaps.push(m.TRANSLATIONS_B);
  if (m.YAD_AVRAHAM) extraMaps.push({ 'yad-avraham': m.YAD_AVRAHAM });
  if (m.TRANSLATIONS_C) extraMaps.push(m.TRANSLATIONS_C);
  if (m.TRANSLATIONS_D) extraMaps.push(m.TRANSLATIONS_D);
  if (m.KOL_ALL) extraMaps.push({ 'kol-yaakov': m.KOL_ALL });
}

// Load optional fragment files by glob pattern
for (const name of fs.readdirSync(__dir)) {
  if (!/^en-036-.+\.mjs$/.test(name)) continue;
  if (name === 'en-036-yad-avraham.mjs') continue;
  const m = await loadMod(`./${name}`);
  if (!m) continue;
  for (const [k, v] of Object.entries(m)) {
    if (k === 'default') continue;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      const slug = k.replace(/^[A-Z_]+$/, '').replace(/_/g, '-');
      if (k.includes('KOL')) {
        extraMaps.push({ 'kol-yaakov': v });
      } else if (k === 'TRANSLATIONS_C' || k === 'TRANSLATIONS_D') {
        extraMaps.push(v);
      } else {
        const slugName = Object.keys(v)[0]?.includes('#')
          ? name.replace('en-036-', '').replace('.mjs', '')
          : null;
        if (slugName) extraMaps.push({ [slugName.replace(/-/g, '-')]: v });
        else extraMaps.push(v);
      }
    }
  }
}

const { TRANSLATIONS } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations.mjs')).href
);
const { TRANSLATIONS_B } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-b.mjs')).href
);

for (const [slug, map] of Object.entries(TRANSLATIONS_B)) {
  TRANSLATIONS[slug] = { ...(TRANSLATIONS[slug] || {}), ...map };
}

for (const map of extraMaps) {
  for (const [slug, entries] of Object.entries(map)) {
    TRANSLATIONS[slug] = { ...(TRANSLATIONS[slug] || {}), ...entries };
  }
}

// Validate against blocks
const blocks = JSON.parse(fs.readFileSync(path.join(__dir, 'blocks-036.json'), 'utf8'));
const missing = [];
for (const b of blocks) {
  const m = TRANSLATIONS[b.slug];
  if (!m || !(b.key in m)) missing.push(`${b.slug}|${b.key}`);
}

if (missing.length) {
  console.error('MISSING', missing.length, 'keys');
  fs.writeFileSync(path.join(__dir, 'missing-036-keys.txt'), missing.join('\n'), 'utf8');
  process.exit(1);
}

// Write kol split
const kol = TRANSLATIONS['kol-yaakov'];
const part1Keys = new Set(
  blocks.filter((b) => b.rel.includes('part-001')).map((b) => b.key)
);
const KOL_YAAKOV = {};
const KOL_YAAKOV_PART2 = {};
for (const [k, v] of Object.entries(kol)) {
  if (part1Keys.has(k)) KOL_YAAKOV[k] = v;
  else KOL_YAAKOV_PART2[k] = v;
}

fs.writeFileSync(
  path.join(__dir, '_patch-siman-036-kol.mjs'),
  `/** Kol Yaakov siman 036 — assembled */\nexport const KOL_YAAKOV = ${JSON.stringify(KOL_YAAKOV, null, 2)};\nexport const KOL_YAAKOV_PART2 = ${JSON.stringify(KOL_YAAKOV_PART2, null, 2)};\n`,
  'utf8'
);

// Write translations-c for non-kol slugs that were in fragments
const cSlugs = ['siftei-kohen', 'turei-zahav', 'baer-heitev'];
const TRANSLATIONS_C = {};
for (const s of cSlugs) TRANSLATIONS_C[s] = TRANSLATIONS[s];
fs.writeFileSync(
  path.join(__dir, '_patch-siman-036-translations-c.mjs'),
  `export const TRANSLATIONS_C = ${JSON.stringify(TRANSLATIONS_C, null, 2)};\n`,
  'utf8'
);

const dSlugs = ['peleti', 'pitchei-teshuva', 'kaf-hachayim', 'yad-avraham'];
const TRANSLATIONS_D = {};
for (const s of dSlugs) TRANSLATIONS_D[s] = TRANSLATIONS[s];
fs.writeFileSync(
  path.join(__dir, '_patch-siman-036-translations-d.mjs'),
  `export const TRANSLATIONS_D = ${JSON.stringify(TRANSLATIONS_D, null, 2)};\n`,
  'utf8'
);

// Fix compose to use PART2 for part-002
let compose = fs.readFileSync(path.join(__dir, '_compose-036.mjs'), 'utf8');
if (!compose.includes('KOL_YAAKOV_PART2')) {
  compose = compose.replace(
    "const { TRANSLATIONS_C } = await import(",
    `const { TRANSLATIONS_D } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-d.mjs')).href
);
const { KOL_YAAKOV, KOL_YAAKOV_PART2 } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-kol.mjs')).href
);
for (const [slug, map] of Object.entries({ ...TRANSLATIONS_C, ...TRANSLATIONS_D })) {
  TRANSLATIONS[slug] = { ...(TRANSLATIONS[slug] || {}), ...map };
}
TRANSLATIONS['kol-yaakov'] = { ...KOL_YAAKOV };

const { TRANSLATIONS_C } = await import(`
  );
  compose = compose.replace(
    "['siman_036/kol-yaakov/part-002.txt', 'kol-yaakov'],",
    "['siman_036/kol-yaakov/part-002.txt', 'kol-yaakov', KOL_YAAKOV_PART2],"
  );
  compose = compose.replace(
    'for (const [rel, slug] of FILES)',
    'for (const row of FILES)'
  );
  compose = compose.replace(
    `  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(\`Missing slug \${slug}\`);`,
    `  const [rel, slug, extra] = row;
  const T = { ...TRANSLATIONS[slug], ...(extra || {}) };
  if (!T || !Object.keys(T).length) throw new Error(\`Missing slug \${slug}\`);`
  );
  fs.writeFileSync(path.join(__dir, '_compose-036.mjs'), compose, 'utf8');
}

console.log('All keys present. Wrote kol + translations-c/d. Run: node _compose-036.mjs');
