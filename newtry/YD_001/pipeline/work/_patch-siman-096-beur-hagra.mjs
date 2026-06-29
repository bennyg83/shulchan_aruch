#!/usr/bin/env node
/** Editorial cleanup — siman 096 beur-hagra only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_096/beur-hagra/part-001.txt';
const SLUG = 'beur-hagra';

const T = {
  '1#א': `Or beet. There, siman 112 seif 1.`,
  '1#ב': `Ben yomo, etc. This is like Rashi's two reasons there s.v. kishus. And even though if cooked it is permitted according to Shulchan Aruch siman 95, one cannot say like Rashi's second reason, as Tosafot wrote s.v. halachta hold that its sharpness emits the actual taste. Shach: (Lekut) Ben yomo, etc. From this expression, as I wrote (in siman 95 s.k. 14), it is permitted except we do not say except regarding chalita, and their knives are ordinarily well scraped, as Rashba wrote; therefore he had to say chalita. And even though the master said, etc., that a craftsman acquires his vessels, as written in siman 122 (s.k. 7); see there (end).`,
  '1#ג': `The amount, etc. One cannot say the amount of a peel from what is written; but sharpness drags to its end, and here he said plainly forbidden; and between scraping and a peel there is a great difference — Or Zarua and Terumat HaDeshen.`,
  '1#ד': `Or that one tastes it, etc. Gemara there: "Is this possible," etc.`,
  '1#ה': `And some say, etc. Like a kort of chalita in Avodah Zarah 39a; therefore with an acquired knife it deals with, since he said "and even though the master said," etc. The first reasoning holds some say regarding a kort of sharp chalita that is very sharp — therefore the mishnah there teaches only a kort of sharp chalita; and in Chullin 98b, "Feed him chalita," etc., pierces its intestines, unlike a radish and other sharp things — Rambam and Rosh in chapter 2 of Avodah Zarah there. In the hagahah siman 98 seif 2, plainly like the latter view. (Lekut) And some say, etc., he holds like Mordechai's text, as written in seif 2 in the hagahah (end).`,
  '1#ו': `And if one cut them, etc. Tosafot there s.v. agav, etc.; and Beit HaGolah; and as written above siman 94 seif 6.`,
  '1#ז': `And some say, etc. Forbidden — it appears all is forbidden, as written regarding a kort of sharp chalita — Terumat HaDeshen. And Tosafot there s.v. agav, etc., and Rosh in Chullin wrote chalita is different because they are small and one cannot know where they were cut; but one does not forbid more than roasted, grilled, or cooked without sauce.`,
  '1#ח': `But if, etc. For it is not sharp.`,
  '1#ט': `And if there is doubt, etc. As Shach explained s.k. 12–13: specifically with tamcha, because some say only radish, some say only ben yomo, and ordinarily their vessels are not ben yomo; therefore they are lenient in doubt.`,
  '2#א': `If one cut, etc. Tosafot there s.v. agav, etc. (Lekut) If one cut, etc. But Semak wrote in the name of R' Yitzchak: you have only what the Sages said; and so too many poskim (end).`,
  '2#ב': `Nevertheless, etc. From what is written in chapter 6 of Berachot, this expression, etc. (Lekut) Nevertheless, etc. From this expression as above; see Mordechai there (end).`,
  '3#א': `Ben yomo. For a mortar is ordinarily well scraped.`,
  '3#ב': `And some say. Like the latter view in seif 1. (Lekut) Spice, etc. Semag wrote: with a dry thing, specifically ben yomo. And some say, etc., according to his view that contradicts Semag's words from chalita; and this is what is written in seif 2 in the hagahah — Mordechai's two views (end).`,
  '4#_': `Lemon juice. Shach and Peri Chadash forbid.`,
  '5#א': `Rinsing. As written Chullin 8b: "Let us say they disagree," etc. (Lekut) Rather rinsing. First explanation in Rashi: because a stam knife has grease, etc.; and in Tosafot Chullin 96a he challenged from this on the first section in Rashi, and a view that here too rinsing is needed, etc.; see there; he agreed to the first explanation — for the second explanation it is difficult why sharpness drags, for it is not sharp at all; but for the first explanation it is well, because sharpness is soft and cannot with rinsing in kli sheni that absorbs in rinsing; therefore scraping is needed (end). (Lekut) Rinsing. That is when not well scraped; and Terumat HaDeshen explained Rashi: because of congealed grease, etc.; and it is asked why turnip is permitted, and another explanation in Rashi: because of its sharpness — but it is not clear, for nevertheless it is noten taam bar noten taam; the first explanation is primary; and that he said turnip is permitted, rinsing is still needed, etc.; see there (end).`,
  '5#ב': `And specifically, etc. And according to Terumat HaDeshen and Shulchan Aruch according to his words; therefore he mentioned turnip.`,
  '5#ג': `And even, etc. If, etc. Rashi there s.v. ve'im irvan, etc., one time; and this is what the Gemara said "and if he mixed them," etc., meaning irvan.`,
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
  `${ts} siman_096/beur-hagra ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_096/beur-hagra — ${n} blocks`);
