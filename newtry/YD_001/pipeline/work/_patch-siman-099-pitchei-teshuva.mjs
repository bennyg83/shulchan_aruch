#!/usr/bin/env node
/** Editorial cleanup — siman 099 pitchei-teshuva only */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_099/pitchei-teshuva/part-001.txt';
const SLUG = 'pitchei-teshuva';

const T = {
  '1#_': `Forbidden bones combine. Avodat HaTaharah ruled like Ran that soft bones combine with the prohibition; and see in responsa Mahari HaLevi siman 28 who did not rule thus, only that they combine with permitted food — see there his proof. And see there further in siman 27 where he wrote there is room to doubt whether specifically in cooking forbidden bones combine with permitted food and not in salting or roasting; and therefore in weak fat prohibition by law it does not require sixty except because of stringency that we compare to cooking — they combine in any case; but fat prohibition that requires sixty because the prohibition spreads — perhaps it does not spread in bones and does not combine even of permitted food — see there. And see in Sefer Teivat Gema parashat Vayera letter 9 who wrote that even a limb from a live animal that fell into permitted food — the bones in it combine with permitted food, even though in a limb from a live animal a bone combines for an olive-volume — this is a novelty; and specifically while in its eye its emission does not help — see there.`,
  '2#_': `In the gravy. See in responsa Beit Yaakov end of siman 57 who wrote that what rises as steam upward is lacking from the food, and when estimating with sixty one must estimate what is lacking through the steam — see there.`,
  '3#_': `One does not nullify a prohibition. Avodat HaTaharah wrote in the name of poskim that it is rabbinic; and see in responsa Noda B'Yehuda second edition part 14 siman 45 who wrote that specifically to nullify the taste of prohibition is rabbinic, but the substance of prohibition dry in dry in the majority is from the Torah, and likewise to nullify in sixty — see there (and through this is resolved what he challenged in Sefer Tiferet Yisrael on mishnayot Ma'aser Sheni chapter 2 mishnah 4 — see there; and see in Netziv what I wrote on this); but wet in wet to nullify in sixty — it appears there permitted from the Torah; and see on this in responsa Pnei Aryeh 62 at length; and see in Noda B'Yehuda first edition part 14 siman 26 s.v. ve'akhpakh omer ani; and see in responsa Shemen Rokeach part 2 siman 14 who extended greatly on this matter and explained many details in this law.`,
  '4#_': `L'chatchila. [Avodat HaTaharah in the name of Taz: that which is permitted if his intent is not specifically otherwise in another matter. And in Pri Megadim it is explained that even if possible only with great effort it is also permitted — see there; and see in Sefer Beit Yehuda who wrote accordingly it appears in Pri Etz that they call malinsh that they cook in water and afterward squeeze the malinsh and throw them away and strain the sack and cook it in honey to dip bread and meat in them — one need not check beforehand each malinsh one by one to see inside the holes to check for worms common in them, since there is great effort to check all of them; but Pri Megadim's words are not compelling — see there.] And see in responsa Noda B'Yehuda part 14 siman 26 on the matter of kruvok, and some call it hozin in foreign language — it is the bladder of an impure fish, and they dry it and put it in a liquid of honey water and its nature is to whiten the liquid; and the great ones of the generation were aroused on this that it should be forbidden, for this remains inside the liquid and is pickled like cooked; and if because it is nullified in sixty — one does not nullify prohibition l'chatchila — and he extended on this and concludes it is fully permitted for many reasons — see there; and see in responsa Tiferet Tzvi part 14 siman 73.`,
  '5#_': `For his sake. Avodat HaTaharah in the name of Taz: he says permitted — he is b'shogeg; and see in responsa Tzemach Tzedek siman 46 who wrote that if he is in doubt in ruling and asked students and did not ask renowned decisors — he is not called b'shogeg — see there; and through this he rejected the words of responsa Beit Yaakov siman 85 who wished to compare if she acted on a woman's statement to acting on a sage's ruling — what is the difference — see there; and see further in Beit Yaakov there who disagrees with Taz on this. [And see Magen Avraham siman 318 s.k. 3; and see in responsa Chavat Sela siman 88 what he wrote on this, and the implication of his words that he agrees with Taz on this — see there.]`,
  '6#_': `But if it became known. Avodat HaTaharah disagrees on this that one should not distinguish at all between known and not known, only between b'shogeg and b'mezid; and see further in Shach who extended to refute Issur VeHeter's view who wrote that even where we say chein nafsho there is also distinction between known and not known that does not exist; and he raised that even without knowledge we say chein nafsho; and he concluded even Rama in his own words and Turei Chayim brought Issur VeHeter's words that without knowledge we do not say chein nafsho — lest the Rav retracted and therefore did not write this law in his hagahot — see there; and so raised Peri Chadash and Minchat Yitzchak general rule 5 s.k. 38 — except Minchat Yitzchak wrote there that in wet in wet, since in Hagahat Peri Megadim we do not say chein nafsho in it, one may be lenient in this without knowledge — see there. And Pri Megadim wrote: and for practical halachah without knowledge in basar b'chalav certainly forbidden from the Torah, and in other prohibitions in Hagahat Peri Megadim I have no authority to be lenient — see there; and it appears also to be stringent is not clear to him; and see in responsa Rabbeinu Akiva Eiger new edition end of seif s.k. 7 who wondered on Shach in what he wrote "perhaps the Rav retracted" — for it appears there is no doubt, for certainly the Rav retracted, for above siman 73 seif 6 in found liver clinging he wrote in the hagahah chein nafsho and needs sixty against all the fowl; and the language "found" implies they did not sense the liver remained in the fowl until afterward when found so — behold even without knowledge we say chein nafsho; and so we rule siman 72 seif 3 regarding heart. And since so, even Pri Megadim wrote it is not clear to him to be lenient in Hagahat Peri Megadim — in my humble opinion it is clear to be stringent, for in that case of heart and liver no view to be lenient in Hagahat Peri Megadim was mentioned there. And again he wrote to resolve Shach's words: since Shach wrote plainly that that piece is certainly forbidden even without knowledge — lest much prohibition remained in it — since so automatically the others are forbidden if there is not sixty against the entire piece; for though we say without knowledge we do not say chein nafsho — nevertheless after the mixture became known and the piece stands in its prohibition, the chein nafsho forbids now the other — as if it fell into another pot it would forbid, so too it forbids the pieces in this pot. And if so one may say the reason in heart and liver requires sixty against all the fowl — it deals when found clinging while the pot was still boiling; and since the fowl remained in its prohibition, now after knowledge the fowl became nevelah and forbids the others as if it fell now into another pot; but where this does not apply, such as they removed the fowl from the pot before it was known, or the pot cooled before it was known — in this Shach was in doubt whether Rama retracted or not; and on this Pri Megadim wrote it is not clear to him to be lenient in Hagahat Peri Megadim, also to be stringent not clear to him; and therefore one who is lenient in this in Hagahat Peri Megadim or for Shabbat need we do not rebuke him — so too see there.`,
  '7#_': `One increases upon it. Avodat HaTaharah — and what he challenged on Magen Avraham, see in responsa Rabbeinu Akiva Eiger in Hagahot to siman 38 — he too challenged thus and wrote to resolve the contradiction with good reasoning — see there.`,
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
  `${ts} siman_099/pitchei-teshuva ${n} blocks editorial CLEAN\n`
);
console.log(`[DONE] siman_099/pitchei-teshuva — ${n} blocks`);
