#!/usr/bin/env node
/** Writes _patch-siman-036.mjs from translation modules */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const { TRANSLATIONS } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations.mjs')).href
);
const { TRANSLATIONS_B } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-b.mjs')).href
);
const { TRANSLATIONS_C } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-c.mjs')).href
);
const { TRANSLATIONS_D } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-d.mjs')).href
);
const { KOL_YAAKOV, KOL_YAAKOV_PART2 } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-kol.mjs')).href
);

const ALL = { ...TRANSLATIONS };
for (const mod of [TRANSLATIONS_B, TRANSLATIONS_C, TRANSLATIONS_D]) {
  for (const [slug, map] of Object.entries(mod)) {
    ALL[slug] = { ...(ALL[slug] || {}), ...map };
  }
}
ALL['kol-yaakov'] = { ...KOL_YAAKOV };

const HEADER = `#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

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
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\\n') ? T[key] : T[key] + '\\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(\`Keys not found in \${rel}: \${missing.join(', ')}\`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(\`OK \${rel} (\${applied.size} blocks)\`);
}

`;

const FILES = [
  ['siman_036/mechaber/part-001.txt', 'mechaber'],
  ['siman_036/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_036/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_036/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_036/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_036/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_036/kereti/part-001.txt', 'kereti'],
  ['siman_036/peleti/part-001.txt', 'peleti'],
  ['siman_036/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_036/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_036/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_036/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_036/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_036/yad-avraham/part-001.txt', 'yad-avraham'],
  ['siman_036/yad-ephraim/part-001.txt', 'yad-ephraim'],
  ['siman_036/kol-yaakov/part-001.txt', 'kol-yaakov'],
  ['siman_036/kol-yaakov/part-002.txt', 'kol-yaakov', KOL_YAAKOV_PART2],
];

let body = '';
let total = 0;
for (const row of FILES) {
  const [rel, slug, extra] = row;
  const T = extra ? { ...extra } : { ...ALL[slug] };
  const n = Object.keys(T).length;
  total += n;
  body += `\n// --- ${slug} — ${rel} (${n}) ---\n`;
  body += `patchFile('${rel}', '${slug}', ${JSON.stringify(T, null, 2)});\n`;
}

const out = HEADER + body + "\nconsole.log('siman_036 patch complete');\n";
fs.writeFileSync(path.join(__dir, '_patch-siman-036.mjs'), out, 'utf8');
console.log('Wrote _patch-siman-036.mjs, keys:', total);
