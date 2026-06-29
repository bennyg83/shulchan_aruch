#!/usr/bin/env node
/** Editorial cleanup — siman 096 kaf-hachayim only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_096/kaf-hachayim/part-001.txt';
const SLUG = 'kaf-hachayim';

const T = {
  '1#_': `1) [Seif 1] A radish or beet cut with a meat knife that is ben yomo. Even though it is well scraped and clean, certainly through the sharpness of the radish and beet and the pressure of the knife, the knife emits the actual taste in it and it is like an actual prohibition; therefore it is not like other noten taam bar noten taam as above siman 95, which is permitted. Shach s.k. 2. Kereti orach 1 wrote: and so is primary according to Shulchan Aruch, unlike Peri Chadash who disagrees. And so too Perat orach 1: thus is primary, unlike Peri Chadash. And so too Shafan Dam orach 2: Heaven forbid to deviate from Shulchan Aruch and the Rav. And so Chochmat Da'at orach 1, Chacham Tzvi general rule 49 orach 1, Beit Yitzchak orach 2, Arukh HaShulchan orach 5, Zivchei Tzedek orach 1 wrote: and so agreed most Acharonim, unlike Peri Chadash orach 2.`,
  '2#_': `2) There. Cut with a meat ben yomo knife or that is not well scraped, etc. This is according to Maharam whom Tur brought, who does not call a sharp thing such except a kort of chalita that pierces the animal's intestines when one eats it (as written above siman 91), and therefore gives taste for improvement even when not ben yomo; but other sharp things are not the same; therefore he wrote here it forbids only ben yomo or when not well scraped, and then it forbids because of grease on it; therefore removal of place is needed. Taz s.k. 1. Meaning this is Maharam's view, but there are disputants, as explained in Tur and Beit Yosef; therefore he wrote afterward in Shulchan Aruch: some say the same applies when not ben yomo and it is well scraped. See below orach 9.`,
  '3#_': `3) There. Or that it is not well scraped. Explanation: it is not ben yomo and not well scraped; presumably grease is congealed on its surface. Shach s.k. 3. Minchat Yitzchak on Turei Chayim general rule 58 orach 17 and general rule 61 orach 13. Perat orach 3, Chochmat Da'at orach 1, Shafan Dam orach 3, Zivchei Tzedek orach 3 — unlike Peri Chadash orach 3, who wrote that with a stam knife a peel suffices.`,
  '4#_': `4) There. Until one removes from the place of the cut the amount for removal of place, etc. For a thing that forbids due to sharpness does not forbid more than the amount for removal. Shach s.k. 4. And so Erech HaShulchan orach 2: most poskim hold one does not forbid all of it; therefore one should not be stringent except with removal of place, as Maran ruled in Shulchan Aruch, unlike Perat — end of his words. Zivchei Tzedek orach 4.`,
  '5#_': `5) There. That it is like the thickness of a finger. That is, like the width of a finger, as written below siman 105 seif 4 "and a finger" — meaning the thumb, as written above siman 46 orach 54 and siman 53 orach 19; see there.`,
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
  `${ts} siman_096/kaf-hachayim ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_096/kaf-hachayim — ${n} blocks`);
