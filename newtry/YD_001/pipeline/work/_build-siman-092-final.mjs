/**
 * Merge siman 092 translation parts → _patch-siman-092-translations.mjs
 * Run: node _build-siman-092-final.mjs
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { TRANSLATIONS_P1 } from './_patch-siman-092-translations-p1.mjs';
import { TRANSLATIONS_P2 } from './_patch-siman-092-translations-p2.mjs';
import { TRANSLATIONS_P3_SK } from './_patch-siman-092-translations-p3-sk.mjs';
import { TRANSLATIONS_P3_TUREI } from './_patch-siman-092-translations-p3-turei.mjs';
import { TRANSLATIONS_P3_REST } from './_patch-siman-092-translations-p3-rest.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const en = (name) => fs.readFileSync(join(__dir, '_en', name), 'utf8').trim();

const heb = JSON.parse(fs.readFileSync(join(__dir, '_hebrew-092.json'), 'utf8'));

function deepMerge(target, source) {
  for (const [slug, keys] of Object.entries(source)) {
    if (!target[slug]) target[slug] = {};
    Object.assign(target[slug], keys);
  }
  return target;
}

const merged = {};
deepMerge(merged, TRANSLATIONS_P1);
deepMerge(merged, TRANSLATIONS_P2);
deepMerge(merged, TRANSLATIONS_P3_SK);
deepMerge(merged, TRANSLATIONS_P3_TUREI);
deepMerge(merged, TRANSLATIONS_P3_REST);

// peleti: use complete _en files (p3-rest pointed at missing path)
merged.peleti = { ...merged.peleti };
merged.peleti['4#ב'] = en('peleti-4-b.txt');
merged.peleti['4#ג'] = en('peleti-4-g.txt');

// mateh-yehonatan from _en/*.txt + p3-rest for 6,8
merged['mateh-yehonatan'] = {
  '1#_': en('mateh-1.txt'),
  '2#_': en('mateh-2.txt'),
  '3#_': en('mateh-3.txt'),
  '4#_': en('mateh-4.txt'),
  '5#_': en('mateh-5.txt'),
  '6#_': TRANSLATIONS_P3_REST['mateh-yehonatan']['6#_'],
  '7#_': en('mateh-7.txt'),
  '8#_': TRANSLATIONS_P3_REST['mateh-yehonatan']['8#_'],
};

// yad-avraham from _en/*.txt + inline short blocks
merged['yad-avraham'] = {
  '1#_': en('yad-1.txt'),
  '2#_': en('yad-2.txt'),
  '3#_': `(There seif 3) And if he cooked it with others, sixty is required to nullify all of it; and if he recognizes it he throws it away and the others are permitted. And know that we also require majority that the majority of pieces be permitted, as the law of dry in dry — siman 109 — see Shach there; and see siman 102. And this is Shach's intent when he wrote: and if it is not fit to be honored it is nullified in majority — meaning we require majority in any case.`,
  '4#_': en('yad-4.txt'),
  '5#_': en('yad-5.txt'),
  '6#_': `(There seif 6) People are accustomed to permit through cooling — see Shach and poskim on when the pot remains forbidden.`,
  '7#_': en('yad-7.txt'),
  '8#_': `(There seif 8) Two pots do not forbid each other — applied to panada oven and meat pot, as Taz wrote.`,
  '9#_': `(There seif 9) Milk candle from the wick side — not from other side of vessel; Maharam on hot drop on cold knife — scraping; Maharil on iruy from kli rishon only.`,
};

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function shachWrap(en) {
  if (en.startsWith('[')) return en;
  return `["${en.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`;
}

const HYBRID = /[\u0590-\u05FF]/;
const BAD = [
  'fellה',
  'requires studyד',
  '[Translation required',
  'non-Jew',
  'hand recoils',
  'first dish',
  'allocated',
];

let out = `/** Full translations siman 092 — YD001 editorial pass */\nexport const TRANSLATIONS = {\n`;
let total = 0;
let missing = 0;
let corrupt = 0;

for (const slug of Object.keys(heb).sort()) {
  out += `  '${slug}': {\n`;
  for (const key of Object.keys(heb[slug]).sort()) {
    total++;
    let t = merged[slug]?.[key];
    if (!t) {
      missing++;
      t = `[Translation required ${slug} ${key}]`;
    }
    const bad = BAD.some((p) => t.includes(p)) || HYBRID.test(t);
    if (bad) corrupt++;
    if (slug === 'siftei-kohen') {
      if (Array.isArray(t)) {
        const inner = String(t[0]).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
        out += `    '${key}': \`["${inner.replace(/"/g, '\\"')}"]\`,\n`;
      } else if (typeof t === 'string' && t.startsWith('[')) {
        out += `    '${key}': \`${esc(t)}\`,\n`;
      } else {
        out += `    '${key}': ${shachWrap(String(t))},\n`;
      }
    } else {
      out += `    '${key}': \`${esc(t)}\`,\n`;
    }
  }
  out += `  },\n`;
}
out += `};\n`;

const outPath = join(__dir, '_patch-siman-092-translations.mjs');
fs.writeFileSync(outPath, out);
console.log(
  JSON.stringify(
    { path: outPath, total, missing, corrupt, slugs: Object.keys(heb).length },
    null,
    2,
  ),
);
