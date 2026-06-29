#!/usr/bin/env node
/** Editorial cleanup — siman 096 turei-zahav only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_096/turei-zahav/part-001.txt';
const SLUG = 'turei-zahav';

const T = {
  '1#א': `With a meat knife that is ben yomo. This is according to Maharam in the Tur, who holds a sharp thing is not called such except a kort of chalita that pierces the intestines of an animal when one eats it; therefore it gives taste for improvement even when not ben yomo. But other sharp things are not the same; therefore he wrote here that it forbids only ben yomo, or when it is not well scraped — then it forbids because of the grease on it; therefore removal of place is needed. One should not challenge from what he wrote at the end of siman 94 seif 7 regarding hot meat cut with a dairy knife that a peel suffices because of grease on the knife when not ben yomo — there regarding the peel it is not so necessary, for there is in any case sixty against it and it is hot and transfers taste throughout; unlike here where it does not spread at all more than the amount for removal of place. Maharach challenged from hot meat: why does one need sixty there at all, only a peel? I already wrote there in my view that sixty is needed there too, and it is plain.`,
  '1#ב': `Or that one tastes it, etc. Turei Chayim general rule 61 wrote that we are not expert nowadays in this tasting.`,
  '1#ג': `And some say the same applies, etc. This is the view of Sefer HaTerumah in the Tur: a radish and every sharp thing is like a kort of chalita and forbids even when not ben yomo. It is not like fish that came up in a bowl, which is permitted through noten taam bar noten taam, for here with a knife it is different — sometimes grease congeals on it and is not recognizable and it is noten taam bar noten taam from the actual substance; and furthermore because of the sharpness of the radish and through the pressure of the knife it emits more than hot fish — so too Rashi. From this it appears to me regarding tamcha that they call kreyn, that was ground in a clean dairy bowl, that it is permitted to eat that kreyn with meat, for there is no pressure of the knife and no grease.`,
  '1#ד': `Against what the knife touched in them. And because one does not know clearly in which place it touched — a matter not dependent on a person is not remembered — therefore one needs sixty against the entire blade of the knife except the handle; and so too Rashal in chapter 25 siman 62.`,
  '1#ה': `What the knife touched in them, etc. And even though in meat and milk all agree we say the piece itself is nevelah — that is, in a forbidden piece such as milk that fell on the meat — but here all of it is permitted before cooking; and it appears to me plain that if there is sixty one need not remove the onions, since there was no prohibition on them, and automatically when the onions are in the pot they become like other things in the pot. It is not like what is written siman 106, that a piece forbidden through absorption of prohibition remains forbidden forever — that case is different, for since it became forbidden it cannot return to permissibility, as Beit Yosef wrote there in the name of Terumat HaDeshen; unlike if only permitted was absorbed, as here, for we say well that whatever was nullified is as if it were not, and even if all of it were meat it was nullified; therefore the onions were fully permitted. But if the onions were cut with a forbidden knife they became nevelah, and even if there is sixty one must remove the onions, and it is like milk that Rama wrote siman 98 seif 4: one must put cold water there, etc.; so too with those onions that became nevelah — this appears clear, and many are not careful about this; see siman 98 seif 4.`,
  '1#ו': `And the same applies if one cut them with a non-Jew's knife. Explanation: we estimate sixty against what the knife touched, for Shulchan Aruch follows its reasoning in siman 92 that it is decided we do not say the piece itself is nevelah except in meat and milk; but for us who hold in all prohibitions we say the piece itself is nevelah, we need here sixty against every place of removal in the radish — that is, if one cut the radish in one place alone; but if one cut it finely, the entire radish is forbidden and therefore one needs sixty against all of it. In this there is no distinction between meat and milk and a forbidden knife: in both, if one cut in one place the amount for removal of place suffices, and if cut finely all is forbidden. Only regarding cooking that they cook afterward is there a distinction: if one cooked milk with meat one needs sixty against the contact in the knife, that is the blade, as written above — whether cut in one place or finely; but with a forbidden knife and fine cutting one needs sixty against the entire radish, and if cut in one place one needs sixty against the place of removal, since whatever became forbidden is considered nevelah and the rest is fully permitted. One cannot say that the forbidden part forbids the part that did not become forbidden, for we already hold we do not say in half a piece that it became nevelah, as Tosafot wrote chapter 25 — for otherwise whatever was forbidden the amount of a peel would forbid everything; and this is plain, that the prohibition does not spread more with a forbidden knife than with a meat knife. And so is written in Turei Chayim general rule 61; and this is what Tur wrote regarding a forbidden knife that one needs sixty against all of it — that is, when cutting finely; and so is explained explicitly in Beit Yosef who brought Semag's words that explained thus the view of Sefer HaTerumah, which are Tur's words here. All this is plain and clear; however it requires study what Rama wrote nearby: "and if one cut them finely one must estimate sixty against the entire radish" — this is plainly regarding a non-Jew's knife, which is adjacent to it, for if with meat to milk, sixty against the place of the knife suffices according to all; or it deals with a non-Jew's knife, and if so even when cutting in one place we need sixty against the place of removal. Two difficulties on Rama: first, he should have written this in the name of "some say," for according to the first view even here sixty against the place of the knife suffices, for we do not say the piece itself is nevelah; and second, he should have written that if one cut in one place one needs sixty against the place of removal, since it deals with a forbidden knife. I saw in Lechem Yehudah that with a meat knife we estimate sixty against the place of the knife even with fine cutting, as written above; and with a forbidden knife he wrote one needs sixty against the radish even if not cut finely — and this is not correct: why should we need against the entire radish in prohibition more than cooking meat with milk? And furthermore Beit Yosef explicitly wrote in the name of Semag that specifically with fine cutting one needs sixty against the entire radish even with a forbidden knife. For halachah we have only as the halachah wrote according to what we hold — chein nafsho — and that is b'dieved, as Rama wrote nearby.`,
  '1#ז': `And some say if one cut a radish, etc. Explanation: even if one did not cut finely — and this is Rashba's view in the Tur, that in every case the knife taste spreads throughout the radish like a kort of chalita in the Gemara.`,
  '1#ח': `They are accustomed to buy it, etc. Since others are not found, it is like b'dieved to permit through removal of place and to rely on those who disagree with Rashba above; and Maharai wrote the reason they are lenient: Maharam wrote many proofs that a sharp thing is called such only regarding a kort of chalita; therefore one may be lenient with other sharp things where there is some reason to be lenient.`,
  '2#_': `And sour fruits. Turei Chayim general rule 61 wrote in the name of Issur VeHeter that sour apples are not called a sharp thing; and it appears that in a case of loss one may rely on this for the reason I wrote nearby in the name of Maharai. And that liquid they make in Russian lands, soaked with water, that they call borscht — it appears plain it is called a sharp thing even if not very sour, still like weak vinegar, in chapter 25 regarding chalita, for we require the fruit itself.`,
  '3#_': `Of meat ben yomo. This is astounding, for in siman 103 seif 6 Shulchan Aruch itself ruled even when not ben yomo.`,
  '4#א': `Lemon juice. Explanation: they cut the lemon and extract its essence from it, which they call lemoni zafet.`,
  '4#ב': `And therefore in some places they eat cabbage, etc., even though sliced and cut. Explanation: gentiles cut them after pickling; those cut before pickling have no concern at all. It appears plain that those places stringent with cabbage do not hold this reason Rama wrote — "because they bring many together," etc. — for with cabbage too they make many together; if so lemon juice should be forbidden to them too, for it is one reason. According to this it requires study what he wrote afterward "but other things," etc., which implies even for those stringent it is permitted in this; and he concluded "like lemon juice one should not be stringent," etc., which implies with lemon juice too there is no stringency at all. The same applies to sharp preserves such as ginger — forbidden to those stringent, for with cabbage Mahariv wrote gentiles are not believed to say they have designated vessels for this; it appears in my humble view that those stringent with sliced cabbage after pickling should be stringent also with sharp preserves and lemon juice, for otherwise there are two contradictory matters.`,
  '4#ג': `But other things that are not sharp. What does this teach us? It is more astounding what he wrote afterward regarding dry turnips, that with turnip it is permitted in every case, as written afterward. It appears to me to emend according to his words in Turei Chayim in this language: "But other things that are not so sour, such as apples or dry fruit and the like," etc. Turei Chayim general rule 41 wrote: since they are lenient with a thing a person's soul is disgusted by, one may also be lenient if one cut the worm with the fruit that is permitted through a small peel, since even with a radish it does not forbid more than the amount of a peel — end of his words.`,
  '5#_': `Through scraping alone. Rinsing does not suffice since it is moist; and scraping is less than a peel, for a peel must be somewhat thick so it can all be removed as one — so too Ran and Beit Yosef.`,
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
  `${ts} siman_096/turei-zahav ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_096/turei-zahav — ${n} blocks`);
