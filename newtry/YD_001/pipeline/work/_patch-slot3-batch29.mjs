#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_262/beer-hagolah/part-001.txt': {
    '2#א': 'Mishnah Shabbat daf 137a.',
  },
  'siman_262/beur-hagra/part-001.txt': {
    '1#ה':
      'With him etc. From what is stated in Shabbat 137a — they say Rabbi Yosi: the primary case is such and such, not like such and such; and in Beit Yosef he wrote that these two rulings contradict each other; see Taz and Shach (and see above siman 264 note 10).',
    '5#_':
      'Small stars. Specifically; and Shach. (Likut) If he was born when very small stars were visible etc. — we are not experts in the measure of stars; and Tosafot Shabbat 35a s.v. "two" etc., but it is difficult etc.; and now they disagree etc.; therefore the main matter depends on setting. And even though the sky was bright etc. — it does not depend on the light of the sky but on the stars; and at dawn the opposite: at the pillar of dawn when the sky begins to lighten, as stated in Yerushalmi beginning Berakhot — "two horns of light" etc., even though all the stars stand, as in Yerushalmi beginning Berakhot — R\' Chanina, colleagues of the rabbis asked: lest you say at evening three stars appear even though the sun is in the middle of the sky — meaning in the middle thickness of the sky; and you might say likewise at dawn — R\' Abba said it is written "the sun came out upon the earth" and "the sun came" — the Torah compared its going out to its coming in: just as coming in is when it is hidden from creatures, so going out is when it becomes known to creatures. R\' Abba said it is written "morning — light"; the Torah called light "morning." We learn R\' Yishmael: "in the morning, in the morning" — to give a boundary to the morning of the morning etc. R\' Chiya: we learn from derech eretz — the king goes out etc. Rashba in chapter 2 of Shabbat was troubled by Yerushalmi that holds Yerushalmi deals with beginning of sunset, therefore wrote uncertain; but it is not so, rather as explained above; thus resolves Tosafot\'s difficulty Shabbat there s.v. "two-thirds"; Or Zaru\'a there deals otherwise; say perhaps etc.; that we say later etc.; per this opinion it is not night until four mil after sunset; so they challenged there; and we establish we follow a medium person etc.; and so Ramban and Ran — from beginning of sunset until pillar of dawn is three mil and a quarter, as in Orach Chaim 261; if so from dawn until sunrise equals from sunset until 95 (twilight) — not so as Yerushalmi above, and sense contradicts every viewer that dawn is much greater than 95 after sunset; in northern countries dawn begins in summer at half the night — then there is no 95 at all in summer; I already explained they are not equal, for at dawn stars still stand a long time — certainly going out and coming in of stars are equal, and coming of light and going out equal; therefore in countries leaning north light does not come at all in summer but stars stand; but 95 of Pesachim is when all stars are not visible until it is truly night and light is completely removed due to smallness of stars — as stated Shabbat 55b: not small stars that are seen only at night, meaning after light comes, and they are not seen in summer at all; going out of stars said everywhere that it is night is three stars alone, and medium ones as in Shabbat — they differ in the two, and they are seen in upper setting equal to lower; because great expertise is needed to know three stars alone and they be medium, as Tosafot wrote, therefore they gave measure in setting etc.; and so Abaye and Rava "woe" there; with this their last difficulty is also resolved — they challenged and we establish medium person etc.; and it is not so as above; and besides, no difficulty, for this measure of four mil is not at every time and place — known that at every time it changes, and in every place; and the answer "perhaps doubt" is wondrous, for it is already estimated in Pesachim there; but per all said everything is fine; no need for two settings — all settings are one; measure from sunset to night is only three-quarters mil; even in our land more, as above, due to change of horizons and time; the time is on equinox days Nisan and Tishrei when everything is equal; thus not contradicted what Rambam and R\' Yonah wrote that measure of twilight is twenty degrees — measure of hour and third, per this Gemara is hour and half (or hour and fifth — see OC 459); also heaven forbid Gemara words contradicted in sense that per this there would be no night four months in our lands — Rambam and R\' Yonah on equator, Gemara on their horizon. Per what is stated, begins at pillar of dawn immediately at sunset — this is twilight between sunset and beginning of light which is setting when redness ceases; blood invalid at sunset (Zevachim 56a and Rashba); no mincha prayer then (Berakhot 29b) — "they curse in the West one who prays with the sun dimming"; and if per Tosafot still day, Shabbat begins then (Shabbat 17b) Beit Hillel permit with the sun; Tosafot Shabbat 34 like Tosafot Rosh Hashanah 9a s.v. "and R\' Yehudah" (end quote) (and see our teacher OC 261).',
  },
  'siman_262/nekudot-hakesef/part-001.txt': {
    '2#_':
      '(there note 3) ruled not to circumcise on the fifth and sixth day — not so, as Shach wrote in siman 265.',
  },
  'siman_262/siftei-kohen/part-001.txt': {
    '3#א': 'Androgynous etc. See above siman 266 seif 10.',
    '5#_':
      'Very small stars etc. Specifically because they are very small one may not rely on them to circumcise on Shabbat; but regarding medium stars in the next seif one may rely on them to circumcise even on Shabbat.',
  },
  'siman_262/turei-zahav/part-001.txt': {
    '2#_':
      'Until he recovers. I saw in Bedek HaBayit that Bach wrote in the name of Rashba that nevertheless one does not circumcise on the fifth day — because on the third day there is pain for the circumcised, and one should not cause pain on Shabbat; per this it appears all the more one does not circumcise on the sixth day, which has more pain, as written in siman 266 in the name of Rashba and Ramban.',
  },
  'siman_262/yad-avraham/part-001.txt': {
    '1#_':
      '(siman 262, Shach note 2) The question: if it is valid within eight days, why push off Shabbat? I saw in Metsudat David who wrote to resolve: we hold a positive commandment pushes off a negative commandment; if so, why need a verse for the eighth day even on Shabbat — without the verse it would push off; rather it is necessary that the true law is when he leaves with mila within eight; if so, Shabbat would not be pushed off, since he can circumcise on erev Shabbat; the verse teaches that nevertheless he must circumcise specifically on Shabbat. Unlike David — certainly a verse is needed that mila pushes off Shabbat; even if we say he cannot circumcise before — if only aseh docheh lav for a simple lav, but Shabbat is a lav with karet, it would not push off, as explained in the sugya beginning of Yevamot regarding Pesach and the tamid.',
  },
  'siman_275/beer-hagolah/part-001.txt': {
    '1#_':
      'Beraita Shabbat 4, 103b; and it implies there is no repair, per Rambam chapter 8 of Sefer Torah; and the reason the Rosh wrote their repair is far — Tur brought it.',
    '3#_': 'Beraita Shabbat [daf 104].',
  },
  'siman_275/baer-heitev/part-001.txt': {
    '1#ג':
      'Holes. The Shach wrote it implies that due to honor of the Name it is forbidden, but not regarding other words — unlike the Levush, whose reason is making holes in the sheet; per this, even regarding another word it would be forbidden. The answer: regarding other words they did not forbid at all; what the Rav said "to make holes in the sheet" is not to exclude removing the thin upper peel — for this appears all the more forbidden, as greater disgrace and close to erasing; rather it comes to exclude: if the Name was written from the outset on a cloth attached to the hole, then it is permitted to remove the cloth with the Name — only cutting and scraping the Name is forbidden, but regarding cloth it is permitted to remove for the sake of repair — end quote.',
    '3#_':
      'Brick. The Taz explained (*) that a brick is three tefachim and a levenah (space) is one and a half — meaning the brick is the writing and the levenah is the empty place; the Shach explained the opposite — the levenah is three tefachim and the brick one and a half.',
  },
  'siman_275/beur-hagra/part-001.txt': {
    '4#א': 'The Song at the Sea etc. Mishneh Torah chapter 12, halachah 11.',
  },
  'siman_275/pitchei-teshuva/part-001.txt': {
    '1#_':
      'Closed. Baer Heitev what he wrote; and see on this responsum AAZ Pnei Me\'orot part 1 siman 13; responsum Mash\'at Moshe part 4 siman 22; Mayim Rabim part 4 simanim 54–55; Shemesh Tzedakah part 4 siman 53; and what is written above siman 273 note 4. And see Bnei Yonah — he wrote one may be lenient if he left part in the middle when that place is not fit for writing, such as a stitch or tear; even if there is a patch underneath — for one who does not write on a patch it is recognizable he did not leave the place intentionally to make a parashah break; one may be lenient — see there; examine: if a parashah is required and he left space but there is a tear etc., perhaps it is invalid since what he interrupted looks like a parashah sign. [See Chatham Sofer siman 264 in a Sefer Torah who ended the page at "vayedaber Hashem" and left two empty lines and began the next page "el Moshe lemor zot asher laLevi\'im" — wrote plainly this is leaving a parashah where there is no parashah, invalid without repair; nevertheless all scribes in our time are accustomed to repair; as Bnei Yonah testified; in this parashah there is no Name and it is repaired easily. And there siman 261 — similar question in a Sefer Torah where each sheet has fifty lines; on one page he forgot and wrote only forty-nine lines and left one line at page end interrupting mid-verse — wrote that apparently there is no repair at all for that sheet; against most scribes there is no choice but to invalidate and write another in its place; but if between verses and parashiyot of the order, likely he stopped mid-verse; every mid-verse repair is not permitted — see there. This seems like the model above that one may correct when stopped mid-verse, but if between verses and parashiyot of order — different. See responsum where no evil between verses; if need to correct and write face-to-face text to sustain these books — do not rely; no proof mistakenly printed in this light; it is light of Torah. [See blasphemy] etc. And in responsum he wrote not raised by righteous to renew seder, but reverse — they mentioned in wake of seder to say this form is not open and does not contradict; Bible signed book RSA — not a strong proof for us. Also wrote agreed to customs of Spanish writers as Rambam\'s order.]',
    '4#_':
      'Holes. Baer Heitev in the name of Shach — comes to exclude if the Name was written on a cloth etc.; see She\'elat Yaavetz part 1 siman 153 who disagrees and forbids even on cloth, for cloth is considered the sheet itself — see there. [See Chatham Sofer siman 264 in a Sefer Torah — scribe erred in Mishpatim at "Elohim lo tekallel" which must be setumah; he erred and wrote on that line only the three words "ki chanun ani" and began the word Elohim on the next line and made it petuchah; doubt whether scribe sanctified it, especially since custom is to sanctify (see above siman 276 note 1); if so cannot erase; scraping Name is difficult; he devised repair: if possible drag several lines after the line with "Elohim lo tekallel," place cloth underneath, scrape beforehand the words after "Elohim lo tekallel" that stand at line end; when cloth is placed, cut "Elohim lo tekallel" and move the three words to line end — this is not scraping, better than Shach to permit if written on cloth, especially with doubt perhaps not sanctified; scribe must be expert and quick with glue before separating word Elohim from sheet so when moved it adheres immediately without lifting from column; parchment there very thin so adhesion not visible. See further glory of Moses — permitted to cut entire line with sheet above (lower line as "body of holiness") and stick another patch — not case where Name cannot be cut as dove; actually parent. Another case not to cut Name: Name fixed and "correct" but parashah needs correction for open/closed or written plene/defective unnecessarily; if Name itself not corrected and needs repair — so bad must write another sheet unless Name not written in his writing; if written fair, not case of holiness; if written as fair, not holiness case. These are words of Shach — one may cut in Torah for the reasons given; and he wrote in responsum etc. See Kvod Moshe — upper method permitted to cut entire line with sheet above.]',
  },
  'siman_275/siftei-kohen/part-001.txt': {
    '6#_':
      'And below, five lines, and their beginnings: vayavo, vayedaber etc. In the Rambam it reads vayavo le-daber asher hazot asher etc.; and it is written in Sefer Maaseh Merkavah daf 81d; and in the Tur this was copied corrupted; I wondered at Rama and Ramam who trusted the printers and did not examine after them, and copied as in Tur editions — end quote. And it is a wonder why he was not troubled likewise at the beginning regarding the Song at the Sea — they wrote below the song five lines beginning vatikach, sus, vayetze\'u, vayihiyu; and the matter is simple that it is an error — there is no word vayihiyu at all in the verse; also impossible to align the lines thus in Scripture — see there. And in the Rambam: vatikach, after them sus, vayetze\'u, vayavo\'u — see there; and see further in the Rambam many laws and customs in writing a Sefer Torah.',
  },
};

function patchFile(rel, T) {
  const fp = path.join(ROOT, 'output', rel);
  let s = fs.readFileSync(fp, 'utf8');
  const applied = [];
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const seif = block.match(/^\s*seif: (\d+)/m)?.[1];
    const marker = block.match(/^\s*marker: (.+)/m)?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.push(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.includes(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.length} blocks)`);
  return applied.length;
}

let total = 0;
for (const [rel, T] of Object.entries(PATCHES)) {
  total += patchFile(rel, T);
}
console.log(`[PATCHED] ${total} blocks total`);
