#!/usr/bin/env node
/** Editorial cleanup — siman 098 mechaber only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_098/mechaber/part-001.txt';
const SLUG = 'mechaber';

const T = {
  '1#main': `The law of a forbidden item that became mixed with permitted food and the manner of its nullification. In it are 9 seifim: A forbidden item that became mixed with permitted food — not its kind in its kind, such as milk that became mixed with meat — we have a non-Jew taste it; if he says there is no milk taste, or if he says there is taste but it is spoiled — permitted, provided it will not end up improving it; and he must not know that we rely on him. And if there is no non-Jew to taste it, we estimate with sixty. And likewise if it is its kind in its kind, since we cannot establish it through taste, we estimate with sixty (and we do not practice now to rely on a non-Jew, and we estimate everything with sixty) (Agur and responsum of Maharam Padua siman 79 and other Acharonim):`,
  '2#main': `If its kind became mixed with its kind and was spilled in a manner that one cannot determine the amount to estimate — if it is known that the majority was permitted, it is permitted; and if it is not known that the majority was permitted, it is forbidden: {Rama: And regarding its kind in its kind, we follow presumption — if it is equal it is its kind in its kind, but we do not follow taste whether it is equal or not (Beit Yosef in the name of Agur and so in Hagahat Sh"D siman 39).} But if it became mixed with what is not its kind and was spilled in a manner that one cannot determine the amount, even if it is known that the majority was permitted it is forbidden. And if it became mixed both in its kind and not in its kind and was spilled in a manner that one cannot determine the amount, and it is known that the majority was permitted from its kind — we view what is not its kind as if it were not there, and the remainder is its kind and the majority nullifies it:}`,
  '3#main': `In what matters is this stated — when it was spilled; but a forbidden item that became mixed with permitted food and is before us, and it is impossible to determine its measure — even though it is from rabbinic prohibitions — it is forbidden:`,
  '4#main': `A forbidden item that was cooked with permitted food — even if one recognizes it and it is whole and one removed it — requires sixty against the entire forbidden amount, because we do not know how much emerged from it. Therefore one who cooks in a forbidden pot that is ben yomo, or inserts a spoon of forbidden food into permitted food, requires sixty against the entire pot and against all that one inserted from the spoon, because we do not know how much was absorbed — whether of earthenware, wood, or metal: {Rama: Provided it was absorbed through boiling by fire, for then absorption spreads through the entire vessel; but through boiling of brine it is not absorbed in the vessel more than the measure of a peel, and one need not estimate except the measure of a peel (Mordechai chapter Keitzad and Arukh general rule 24) — see above siman 69. And some are stringent with a metal spoon to require sixty against all of it even if one inserted only part, because part of its heat is all of its heat. Rama: And we practice according to the first view. And every prohibition that we nullify with sixty — if one recognizes it, one must remove it from there even though its taste was already nullified in sixty; therefore if milk fell into the dish and its taste was nullified in sixty, one must put cold water there and the nature of milk is to congeal and float above the water, and one removes it from there, for since it can be removed it is as if recognized and must be removed (Hagahot Mordechai in Chullin and Arukh general rule 23). A forbidden item that was nullified in a pot and was removed and fell into another pot requires again to nullify it with sixty against all of it, and so forever; but if it fell twice into the first pot, one need not nullify again (Hagahot Mordechai there).}`,
  '5#main': `If the amount of the forbidden item is known — such as a new spoon, or one that is not ben yomo, that was shaken in it and absorbed an olive-volume of milk, and afterward one shook in it a meat pot — one needs only sixty to nullify the olive-volume that it absorbed (and we do not say regarding a vessel that the piece becomes nevelah even if one shook forbidden food in it). But an old spoon that is ben yomo — one estimates against all of it (for all that was absorbed becomes forbidden and we do not know how much was absorbed) (there). And some say that in this too one needs only sixty to nullify the olive-volume absorbed: {Rama: And the first reasoning is primary, as explained above regarding a drop of milk that fell on the pot; and some do not distinguish between an old and new spoon, only between earthenware and other vessels (Mordechai chapter Gid HaNasheh) — they say that in earthenware, since the forbidden item cannot be separated through hagalah, we say the vessel becomes nevelah; but not in other vessels; and it is good to be concerned for stringency — see above siman 92.}`,
  '6#main': `Like half an olive-volume of forbidden food that became mixed with permitted food — requires sixty half-olive-volumes of permitted food to nullify it:`,
  '7#main': `An egg that has an embryo, or a drop of blood, that was cooked with others — requires sixty-one to nullify its emission:`,
  '8#main': `Cheese is nullified in one part in fifty-nine: {Rama: All prohibitions practiced in our time are nullified in sixty except chametz on Pesach and yayin nesekh as explained in their laws (Tur); provided the forbidden item does not impart taste in the pot; but if it imparts taste in that pot and it is forbidden in itself, even in a thousand it is not nullified as long as its taste is sensed; therefore salt and spices, which are made for taste — if they are forbidden in themselves — are not nullified in sixty (Arukh general rule 25 — see s.k. 27 and see above end of siman 105).}`,
  '9#main': `A pot that has fifty-nine olive-volumes of permitted food and two olive-volumes fell into it — one of blood and one of milk — each one combines with the fifty-nine of permitted food to nullify the other. And likewise fifty-nine olive-volumes of permitted food into which an olive-volume of milk fell, and in another pot there were thirty of permitted food and an olive-volume of blood fell into it and became mixed with the milk — each forbidden item combines with the permitted food in its pot to nullify the other.`,
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
  `${ts} siman_098/mechaber ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_098/mechaber — ${n} blocks`);
