#!/usr/bin/env node
/** Editorial cleanup — siman 096 baer-heitev only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_096/baer-heitev/part-001.txt';
const SLUG = 'baer-heitev';

const T = {
  '1#א': `Sielka (beet). That is, spinach; and even though it is well scraped and clean, nevertheless through the sharpness of the radish and beet and the pressure of the knife, the knife emits the actual taste in it and it is like an actual prohibition; therefore some say it is unlike other noten taam bar noten taam. And if it is not well scraped, even if not ben yomo, presumably grease is congealed on its surface. Shach. Taz wrote this is according to Maharam in the Tur, who does not call a sharp thing such except a kort of chalita, but other sharp things are not the same; therefore he wrote here it forbids only ben yomo or when not well scraped. And some say: why does he require removal of place here, and in siman 94 s.k. 7 with hot meat cut with a dairy knife that is not ben yomo a peel suffices because of grease on the knife — there regarding the peel in any case there is sixty against it and it is hot and transfers taste throughout; unlike here where it does not spread more than the amount for removal of place. Maharach challenged from hot meat: why need sixty there at all, only a peel? I already wrote there in my view that sixty is needed there too, and it is plain; see siman 94 what he wrote in the name of Shach.`,
  '1#ב': `That we taste it. Turei Chayim wrote we are not expert nowadays in this tasting; Shach wrote this is l'chatchila, but b'dieved if a Jew tasted and there was no meat taste and it was cooked in milk it is permitted — specifically for tasting by a non-Jew we are not accustomed to rely even b'dieved, unlike tasting by a Jew (and Peri Chadash wrote even l'chatchila).`,
  '1#ג': `Well scraped. The reason of those who hold a radish and every sharp thing is like a kort of chalita and forbids even when not ben yomo; it is not like fish that came up in a bowl, permitted through noten taam bar noten taam, for here with a knife it is different — sometimes grease congeals on it and is not recognizable and it is noten taam bar noten taam from the actual substance; and furthermore because of the sharpness of cold and through knife pressure it emits more than boiling fish. From this it appears to me regarding tamcha called kreyn ground in a clean dairy bowl, permitted to eat with meat, for there is no knife pressure and no grease — end of Taz's words. Shach wrote the custom follows those who say there is no distinction between ben yomo and not ben yomo; however certainly in other things that are not sharp, the law of a knife is like other vessels: if not ben yomo and clean, permitted.`,
  '1#ד': `That it touched. Shach wrote: when it is known clearly how much it touched; but from the ordinary way of cutting along the entire knife, see siman 94. Taz wrote: since it is a matter not dependent on a person he does not remember and does not know clearly where it touched — therefore sixty against the entire blade except the handle (and if there is sixty one need not remove the onions, since there was no prohibition on them; automatically when onions are in the pot they become like other things in the pot. But if onions were cut with a forbidden knife, even with sixty one must remove the onions. I found in Terumat HaDeshen siman 61: onion is a sharp thing when placed raw in the dish, but if cooked first alone and then placed in the dish its sharpness is nullified; he brings proof from the mishnah in Terumot chapter 10; see there). (And since he attributes the taste because it is a matter not dependent on a person, etc., it appears even one who says "it is clear to me" does not help; see siman 1 seif 3.) Shach wrote: that sixty does not suffice against removal of place because one does not know how much to remove; or it deals with when the place the knife touched is less than the amount for removal of place.`,
  '1#ה': `The radish. The reason is in Shach: each piece is forbidden the amount for removal of place; however this is specifically when the radish is smaller than the knife or the knife is not before us to estimate; but when the knife is smaller than the radish and it is before us, plainly one does not need sixty but only against the knife. However with a forbidden knife, for us who hold chein nafsho in all prohibitions, each piece is nevelah the amount for removal of place; when cut finely one must estimate against the entire radish. Certainly where they cooked a whole radish cut with a forbidden knife, if there is sixty in the dish against the removal of place it is permitted — unlike Maharam of Lublin who wrote that immediately when placed in the dish the entire radish becomes nevelah as absorbed prohibition if there is not sixty in the radish itself against the removal of place — end of his words; but this is not so, for the removal of place is not forbidden in itself and the prohibition is not distinct and visible and it is only forbidden the amount for removal of place — absorbed prohibition does not apply; and so Bach in siman 22 seif 6. Taz wrote: in this there is no distinction between Beit Yosef and a forbidden knife — in both, if cut in one place the amount for removal suffices, and if cut finely all is forbidden; only regarding subsequent cooking is there a distinction: cooking milk with meat needs sixty against knife contact, the blade, whether cut in one place or finely; but with a forbidden knife and fine cutting, sixty against the entire radish, and cutting in one place needs sixty against removal of place. It requires study what Rama wrote that if cut finely one must estimate sixty against the entire radish — plainly regarding a non-Jew's knife. Two difficulties on Rama: he should have written this in the name of "some say"; and he should have written that cutting in one place needs sixty against removal of place with a forbidden knife. He also wrote it appears plain that if there is sixty one need not remove the onions; and some say regarding siman 106 that a piece forbidden through absorption remains forbidden forever — that case is different. But if onions were cut with a forbidden knife, nevelah, even with sixty one must remove the onions — this appears clear; many are not careful; see siman 98 seif 4 — end of his words.`,
  '1#ו': `Prohibition. Explanation: even if not cut finely, in every case the knife-taste prohibition spreads throughout the radish — that is l'chatchila; but b'dieved it is forbidden only nevelah if not cut finely; but with fine cutting one needs sixty with Beit Yosef against the knife or radish when smaller than the knife; with a forbidden knife, even if the radish is larger than the knife, one must estimate against the entire radish because each piece is nevelah. Shach wrote b'dieved applies specifically if already cooked.`,
  '1#ז': `The greens. That it is not sharp. Turei Chayim wrote the tails of leeks and onions too are not sharp and do not absorb except the amount of a peel.`,
  '1#ח': `Their tails. All that are cut toward their tails up to half the radish we rely on presumption and half-and-half; above that, no. Where it is known the knife was ben yomo but there is doubt whether the radish was cut with it — safek lechumra; specifically with radish, but with kreyn they are lenient because many poskim hold one forbids only with radish and not with anything else. Shach in the name of Hagahat Issur VeHeter.`,
  '1#ט': `And in a place. But in a place where others are found to buy, it is like l'chatchila and all is forbidden. Shach.`,
  '2#א': `Salted. Shach wrote: it appears from Rama's view l'chatchila all is forbidden and b'dieved one estimates removal of place; but Turei Chayim brings in the name of Issur VeHeter that if one cut salted fish with a forbidden knife one needs scraping, and if cut before salting rinsing suffices; one must say Mechaber deals with very salted fish, for then through salt sharpness and knife pressure it absorbs more; but a small amount of salt is not considered sharp, as above siman 95 seif 2 in the hagahah. Taz wrote in the name of Issur VeHeter that sour apples are not called sharp; and that liquid made in Russia called borscht appears plainly called sharp even if not very sour, still like weak vinegar, etc. (and Beit Yehudah wrote in siman 95 it is not called sharp if they can drink it raw unless so sour they cannot drink it raw like vinegar; see there).`,
  '2#ב': `Designated. Shach wrote: it appears if we know certainly it was cut with a non-Jew's knife, even not ben yomo it is forbidden like a kort of chalita; but Maharshal disagrees; therefore it appears one should not be so stringent with ginger, since even with a radish many poskim permit when not ben yomo; and this is plain that every dry sharp thing is permitted through rinsing.`,
  '3#א': `Spice. Shach wrote: and the same applies to ground salt and all other sharp things — specifically when ground, but not when placed in a meat mortar.`,
  '3#ב': `Not. Shach ruled thus is primary and the custom follows Rama.`,
  '4#א': `Lemon juice. Explanation: they cut lemons and extract essence, called lemoni zafet. Bach disagrees and is stringent in these laws; see there. Shach wrote: investigate Rama's view — if cut finely one needs sixty against the entire radish because chein nafsho; if so why say here that if some became forbidden they are nullified in others? One must say he holds olives are sharper than lemon juice; or certainly for halachah one may not rely on this; therefore the Rav wrote where they are accustomed to be stringent one should not change — olives are forbidden only because with lemon juice they are accustomed to permit; the Rav wrote one may resolve the custom and rely that it was nullified, since one may also say they cut with a new designated knife as with ginger, but from doubt we forbid them; therefore we rely on nullification to resolve the custom, even though above in seif 1 they buy radishes from gentiles because of doubt whether cut with a forbidden knife — we follow leniency because there one may rely on presumption and half-and-half, unlike here where they likely cut with their knife — end of his words. Taz wrote: those stringent with sliced cabbage after pickling should be stringent with sharp preserves and lemon juice, otherwise two contradictory matters (and Lechem HaPanim wrote preserves are not called sharp at all because honey nullifies sharpness; see there. Terumat HaDeshen siman 71 permits whole cabbage gentiles cook first whole and then pickle, permitted to eat; see there). He also wrote: with ginger too one should be stringent because Turei Chayim regarding cabbage wrote gentiles are not believed about designated vessels; if so the same with preserves; see there.`,
  '4#ב': `Turnips. Taz wrote: what does this teach? With turnip it is permitted in every case; it appears to me to emend according to Turei Chayim's words: "but other things not so sour, such as apples or dry fruit," etc. — end of his words. Turei Chayim wrote: since they are lenient with a thing a person's soul is disgusted by, one may be lenient if one cut the worm with permitted fruit through a small peel, since even with radish it does not forbid more than the amount of a peel — end; see siman 84 seif 9 what Shach wrote whether worms are called nat bar lichtamil.`,
  '5#א': `Alone. Explanation: less than a peel, for a peel must be somewhat thick to be removed all as one; unlike scraping. However scraping suffices by law with rinsing, except because of moisture one cannot rinse — through rinsing it absorbs more.`,
  '5#ב': `Radish. Shach wrote: at first glance from this language l'chatchila forbidden to cut radish to eat with meat even though one already cut turnip; Maharshal disagrees and permits even l'chatchila; since the radish in any case needs rinsing, let us be concerned lest he soak and eat with meat without rinsing, as we forbid in siman 91 to place meat in a forbidden bowl — unlike here where if he wishes to eat it so it is permitted; we are not concerned. Or this case is different: rinsing is only a mere stringency. Certainly to cut l'chatchila turnip in order to afterward cut radish — Gemara and poskim forbid — end of his words.`,
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
  `${ts} siman_096/baer-heitev ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_096/baer-heitev — ${n} blocks`);
