#!/usr/bin/env node
/** Editorial cleanup — siman 098 beer-hagolah only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_098/beer-hagolah/part-001.txt';
const SLUG = 'beer-hagolah';

const T = {
  '1#א': `The memar of Rava, Chullin daf 96.`,
  '1#ב': `Rambam in chapter 15 of Forbidden Mixtures, and even if he is not expert in this — as Tur wrote in the name of Rashba.`,
  '1#ג': `Explained in siman 103.`,
  '1#ד': `Tur in the name of Rashba.`,
  '2#א': `Tur in the name of Rabbeinu Tam, and like Rava who said its kind in its kind is nullified in its majority by Torah law — Zevachim daf 79.`,
  '2#ב': `According to Rabbeinu Tam, since the forbidden item imparted taste to the permitted food, all of it became forbidden.`,
  '2#ג': `There, in the name of Rashba.`,
  '2#ד': `Beit Yosef in the name of Rashba.`,
  '3#_': `Tur in the name of Rashba, and Ran explained the reason that when spilled it comes only incidentally — we go to leniency and not to a doubt of knowledge.`,
  '4#א': `Tur; and likewise Rashba from that which we say regarding udder — who knows how much emerged from it — Chullin daf 97.`,
  '4#ב': `There, in the name of R' Peretz.`,
  '5#א': `There; and likewise Rashba in Terumat HaDeshen.`,
  '5#ב': `There and there; and explained "old" — that one shook it in it that same day in permitted food before shaking in it the milk.`,
  '5#ג': `Rashba there in the name of Ramban, who holds we do not say regarding absorbed food that the piece becomes nevelah.`,
  '6#_': `From the incident of Mar bar Rav Ashi, etc., and like R' Yochanan who holds half a shiur is forbidden by Torah law — Chullin daf 108.`,
  '7#_': `I cited it above siman 86.`,
  '8#_': `I cited it above in siman 90 in the laws of udder.`,
  '9#א': `Tur from mishnah 2 chapter 2 of Orlah, and the memar of R' Yochanan regarding pigul and leftover, etc. — Zevachim daf 75.`,
  '9#ב': `Rosh in responsum from that which is above.`,
};

function patchFile() {
  const fp = path.join(OUT, REL);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== SLUG) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    keysInFile.add(key);
    if (!(key in T)) throw new Error(`No translation for ${key}`);
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = [...keysInFile].filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not patched: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${REL} (${applied.size} blocks)`);
  return applied.size;
}

const n = patchFile();
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} siman_098/beer-hagolah ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_098/beer-hagolah — ${n} blocks`);
