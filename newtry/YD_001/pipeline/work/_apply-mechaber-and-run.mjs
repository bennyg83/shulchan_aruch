#!/usr/bin/env node
/** Merge _mechaber-overrides.json into full overrides via cite(), write translations, run patch */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sims = process.argv.slice(2).length ? process.argv.slice(2) : ['086', '087', '089', '090'];

const mechaber = JSON.parse(fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'));

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function cite(slug, heb) {
  if (slug === 'beer-hagolah') {
    if (/משנה/.test(heb)) {
      const d = heb.match(/דף ([^:]+)/);
      return d ? `Mishnah Chullin daf ${d[1].trim()}.` : 'Mishnah Chullin.';
    }
    if (/מסקנת|כדמפרש/.test(heb)) return 'Gemara there.';
    if (/שם במשנה/.test(heb)) return 'There in the Mishnah.';
    if (/ברייתא/.test(heb) && /תוספות/.test(heb)) return 'There in the baraita and as Tosafot explain there.';
    if (/ברייתא/.test(heb)) return 'There in the baraita.';
    if (/^שם/.test(heb) && heb.length < 60) return 'There.';
    if (/טור/.test(heb) && heb.length < 40) return 'Tur.';
    if (/הרא"ש|הר\"א/.test(heb)) return 'Rosh there.';
    if (/הרשב"א/.test(heb)) return 'Rashba there.';
    if (/רמב"ם/.test(heb)) return 'Rambam there.';
    if (/לשון הרמב"ם/.test(heb)) return 'Rambam chapter 3 Laws of Forbidden Foods halachah 18 from baraita Chullin daf 64.';
  }
  if (slug === 'beur-hagra') {
    if (heb.length < 120) {
      const b = heb.replace(/<[^>]+>/g, '').trim();
      if (/ע"ל|עיין/.test(b)) return `${b.split('.')[0]}. — see there.`;
      return `${b.slice(0, 80)} — Gra.`;
    }
  }
  if (slug === 'nekudot-hakesef') {
    return heb
      .replace(/סימן פ"ט/, 'siman 89')
      .replace(/סימן צ"/, 'siman 90')
      .replace(/סימן פ"ז/, 'siman 87')
      .replace(/סימן פ"ו/, 'siman 86')
      .replace(/סק"(\d+)/g, 's.k. $1')
      .replace(/עיין/, 'see')
      .replace(/בש"ך/, 'in Shach');
  }
  if (slug === 'rabbi-akiva-eiger-yd' && heb.length < 200) {
    return heb
      .replace(/סימן פ"ט/, 'siman 89')
      .replace(/סימן צ"/, 'siman 90')
      .replace(/סעיף/, 'seif')
      .replace(/אסור/, 'forbidden')
      .replace(/מותר/, 'permitted');
  }
  if (slug === 'mateh-yehonatan' && heb.startsWith('(סימן')) {
    return heb.replace(/סימן פ"ט/, 'siman 89').replace(/סימן צ"/, 'siman 90');
  }
  return null;
}

for (const sim of sims) {
  const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
  const TRANSLATIONS = {};
  let pending = 0;
  for (const slug of Object.keys(heb).sort()) {
    TRANSLATIONS[slug] = {};
    for (const [key, { heb: h }] of Object.entries(heb[slug])) {
      const t =
        mechaber[sim]?.[slug]?.[key] ??
        cite(slug, h);
      if (!t) {
        pending++;
        // Use Hebrew stripped as last resort for commentator blocks - mark for review
        TRANSLATIONS[slug][key] = `[REVIEW] ${h.slice(0, 500)}`;
      } else {
        TRANSLATIONS[slug][key] = t;
      }
    }
  }
  const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
  let out = `/** Siman ${sim} translations — mechaber manual + auto cite; [REVIEW] needs pass */\nexport const TRANSLATIONS = {\n`;
  for (const slug of Object.keys(TRANSLATIONS)) {
    out += `  '${slug}': {\n`;
    for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
      out += `    '${key}': \`${esc(val)}\`,\n`;
    }
    out += `  },\n`;
  }
  out += `};\n`;
  fs.writeFileSync(outPath, out);
  console.log(`siman ${sim}: wrote translations, ${pending} [REVIEW] blocks`);

  spawnSync('node', [path.join(WORK, `_mk-patch-runner.mjs`), sim, path.basename(outPath)], {
    cwd: WORK,
    stdio: 'inherit',
  });
  const r = spawnSync('node', [path.join(WORK, `_patch-siman-${sim}.mjs`)], { cwd: WORK, stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status);
}

console.log('Done apply-mechaber-and-run');
