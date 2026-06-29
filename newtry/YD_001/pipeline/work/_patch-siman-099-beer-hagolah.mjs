#!/usr/bin/env node
/** Editorial cleanup — siman 099 beer-hagolah only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_099/beer-hagolah/part-001.txt';
const SLUG = 'beer-hagolah';

const T = {
  '1#א': `Tur in the name of Rabbeinu Shimshon, and similarly Rosh agreed, and so too Rashba from Yerushalmi chapter 1 of Orlah:`,
  '1#ב': `There; and so Rashba wrote, and so Ran — that is, the reason forbidden bones in the foreleg do not combine to permit hullin — daf 98.`,
  '1#ג': `There.`,
  '2#_': `There, from the words of Rabbeinu Shimshon in chapter 5 of Terumot and Rosh in chapter 7 of Chullin:`,
  '3#_': `Rashba in responsum, question, siman 464, and like R' Efrayim:`,
  '4#א': `The statement of R' Chanina there daf 97, and the first version is stringent, as Rashi explained, and so Rosh there and Sh"P:`,
  '4#ב': `Rashba in responsum and wrote: because in not its kind in its kind we establish that an olive-volume in keAchilat Peras is d'oraisa; and it is possible even up to sixty according to those who hold ta'am k'ikkar is d'oraisa, like R' Chayyim and those who follow his approach:`,
  '4#ג': `There, and like Rambam chapter 15 of Forbidden Foods:`,
  '5#א': `Beitzah daf 4, from mishnah 9 chapter 5 of Terumot`,
  '5#ב': `There.`,
  '5#ג': `Tur in the name of Rambam chapter 15 of Forbidden Foods, from the law of one who cooks on Shabbat, as I noted in Tur Orach Chaim siman 318 (and Rashba in the name of Rambam and Ra'avad):`,
  '5#ד': `There, from the words of Rashba:`,
  '6#א': `Tur in the name of Rashba (and in Beit Yosef it is brought):`,
  '6#ב': `There, the statement of Rav Matna Beitzah daf 4:`,
  '7#_': `Rivash siman 249 in the name of Ra'avad; and similar to these matters Tur wrote in siman 122 in the name of Rashba, and Mechaber wrote them there too:`,
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
  `${ts} siman_099/beer-hagolah ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_099/beer-hagolah — ${n} blocks`);
