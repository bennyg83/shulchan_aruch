#!/usr/bin/env node
/**
 * Merge _chunks-120/*.json + mechaber overrides + gen fallback → _patch-siman-120-translations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translateBlock, stripHtml, esc } from './_gen-siman-translations.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = '120';

const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));

const overrides = {};
const chunkDir = path.join(WORK, `_chunks-${sim}`);
if (fs.existsSync(chunkDir)) {
  for (const f of fs.readdirSync(chunkDir).filter((x) => x.endsWith('.json'))) {
    const slug = f.replace(/\.json$/, '');
    Object.assign(overrides, {
      [slug]: {
        ...(overrides[slug] || {}),
        ...JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8')),
      },
    });
  }
}

const TRANSLATIONS = {};
let hebLeft = 0;
let fromChunk = 0;
let fromMechaber = 0;
let fromGen = 0;

for (const slug of Object.keys(heb).sort()) {
  TRANSLATIONS[slug] = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    let val =
      overrides[slug]?.[key] ??
      mechaberAll[sim]?.[slug]?.[key] ??
      translateBlock(slug, entry);
    if (overrides[slug]?.[key]) fromChunk++;
    else if (mechaberAll[sim]?.[slug]?.[key]) fromMechaber++;
    else fromGen++;
    if (/[\u0590-\u05FF]{3,}/.test(val)) hebLeft++;
    TRANSLATIONS[slug][key] = val;
  }
}

let out = `/** YD001 quality-pass translations siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;

const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
fs.writeFileSync(outPath, out);
const n = Object.values(TRANSLATIONS).reduce((a, m) => a + Object.keys(m).length, 0);
console.log(
  `Wrote ${outPath} — ${n} blocks, ${hebLeft} with Hebrew; sources: chunk=${fromChunk} mechaber=${fromMechaber} gen=${fromGen}`,
);
