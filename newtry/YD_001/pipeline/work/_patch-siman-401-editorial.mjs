#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';

const T = {
  'siman_401/baer-heitev/part-001.txt': {
    '6#_': `**On erev Shabbat.** (Even though on the evening of) [but on the evening of] Rosh Chodesh and erev Chanukah they say Tzidduk haDin even after chatzos — (not) [for it is] not preferable to erev Shabbat; so too Levush — and it implies that likewise they do not say it on erev Yom Tov after chatzos. Shach.`,
    '7#_': `**They practice.** Maharshal ruled that one must practice all laws of mourning, and such is the custom; and so too the Mechaber in OC siman 696 seif 4. And in Darishah he wrote to reconcile the Mechaber's words that they do not contradict each other — for in OC it deals with one whose relative died that same day, and here it deals with one who died before then — forced (and some want to emend in OC that "on Chanukah" should read "in private"; meaning: all private mourning matters apply on Purim; and thereby reconciled what mentions Chanukah in the laws of Purim — it should have been brought in the laws of Chanukah siman 670 where he mentions Chanukah laws in a eulogy; but certainly it is a scribal error and should read "in private"). And the Rav in Hagahah there ruled like the Mechaber here and wrote that so they practice; and Bach brought only Maharshal's words — see there. End Shach.`,
  },
  'siman_401/beer-hagolah/part-001.txt': {
    '1#_': `Mishnah Moed Katan 27a:`,
    '2#_': `Nimukei Yosef there:`,
    '3#_': `Mishnah there 24b:`,
    '4#_': `There in the Gemara 25a:`,
    '5#_': `Rabbeinu Yerucham and in the name of Raavad, and so too Rambam, and so too Mordechai, and so is implied in Yerushalmi, and so Hagahos Maimoniyos chapter 1:`,
    '6#_': `There in the Mishnah:`,
    '7#_': `Tur, and like the view of his father the Rosh in his rulings, and so Ramban and Rambam in chapter 1 and Shulchan Pesachim: (°) to exclude Maharam of Rothenburg and Semag and Semak who wrote that they do not make havra'ah on Tishah BeAv — and see Beit Yosef.`,
  },
  'siman_401/beur-hagra/part-001.txt': {
    '1#_': `**Except for honor of a Torah scholar.** So too 2b and Megillah 3b, and as stated in siman 245.`,
    '3#_': `**If he heard on chol haMoed, etc.** From the challenge there on the Mishnah — "and even a sage" — and the baraita teaches "a sage," etc. — implies the baraita deals even on chol haMoed; and it deals with close tidings — for if between death and burial, even if not a sage but only a worthy person, they are obligated to tear for him, as stated below and as stated above siman 340 seifim 6–7, and OC siman 547 — until here the siman.`,
    '4#א': `**(Collected) But the relatives, etc.** From the Mishnah cited above and Yerushalmi there, and in Tosafot chaf 1 s.v. shekvar, etc., and there 24b s.v. ella, etc. (72b).`,
    '4#ב': `**And likewise for Chanukah, etc.** From that he distinguished at the end — women on the festival, etc., on Rosh Chodesh, etc. — and did not distinguish at the beginning; and it is not required.`,
    '4#ג': `**Even on the second day of Yom Tov, etc.** — for they did not say (Yoma 6a) that the Rabbis equated it to a weekday except for what is needed for it alone; from that he said "even to cut myrtle for him," etc. — implies specifically everything for his need.`,
    '6#_': `**They say, etc., and Chanukah.** See OC siman 420 seif 2: (Collected) They say, etc. — in Rosh siman 134, seif 7 — see there siman 132 (end).`,
    '7#א': `**Died, etc.** As stated below, and even though, etc.`,
    '7#ב': `**Nevertheless.** See OC siman 696.`,
  },
  'siman_401/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_': `(Siman 401 seif 4) **Even** on the second day of Yom Tov. Even though the Mechaber ruled (siman 399 seif 13) that if the day of death and burial is on the second day of Yom Tov they mourn — nevertheless they do not make havra'ah; if so it implies havra'ah is lighter; and if so why on chol haMoed is it the reverse — they do not mourn and nevertheless make havra'ah? And it must be said: havra'ah is not a matter of mourning but is like a kind of eulogy; and therefore they do not make havra'ah on the second day of Yom Tov; but on chol haMoed they make havra'ah, for nevertheless it is not a eulogy. So too Tiferet Yisrael above (siman 378).`,
    '2#_': `(Shach s.k. 3) **So too** Atzei Chaim. And in Eliyah Rabbah OC (siman 429) he wrote on this; and it appears to us that if they bury the deceased after the time of Minchah arrived — even Minchah gedolah — they do not say Tzidduk haDin; and in Chok Yaakov there he wrote: and here in Prague the custom is not to say after chatzos on these days except on erev Rosh Chodesh, because they also say selichot called "minor Yom Kippur" — after chatzos they also say Tzidduk haDin; and in Be'er Heitev there he testified otherwise — that he wrote: here in Prague they practice not to say Tzidduk haDin even on erev Rosh Chodesh; and he concluded there "and the first is primary" (namely Shach here) — for there are poskim who say Tzidduk haDin even on Yom Tov — end.`,
  },
  'siman_401/siftei-kohen/part-001.txt': {
    '2#_': `**As stated in siman 340.** So read.`,
    '3#_': `**He heard, etc.** See above siman 340 s.k. 32, and OC siman 547.`,
    '6#_': `**After chatzos on erev Shabbat.** (Even though on the evening of) [but on the evening of] Rosh Chodesh and erev Chanukah they say it even after chatzos — (not) [for it is] not preferable to erev Shabbat; so too Atzei Chaim — and it implies that likewise on erev Yom Tov after chatzos they do not say Tzidduk haDin.`,
    '7#_': `**Nevertheless mourning does not apply on it, etc.** — and Maharshal ruled that one must practice all laws of mourning, and such is the custom; and Darishah brought it — see there; and so too the Mechaber in OC siman 696 seif 4; and Darishah wrote to reconcile the Mechaber's words that they do not contradict — for in OC it deals with one whose relative died that same day, and here with one who died before then — forced; and the Rav in Hagahah there ruled like the Mechaber here) and wrote that so they practice; and Bach brought only Maharshal's words — see there.`,
  },
};

let total = 0;
for (const [rel, translations] of Object.entries(T)) {
  const slug = rel.split('/')[1];
  total += patchFile(rel, slug, translations);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_401 editorial patch ${total} blocks\n`);
console.log(`[DONE] siman_401 — ${total} blocks`);
