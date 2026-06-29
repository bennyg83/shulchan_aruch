#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { patchFile, ROOT, OUT } from './_patch-siman-098-group-c-utils.mjs';

const T = {
  'siman_400/baer-heitev/part-001.txt': {
    '1#א': `**Shoes.** Shach wrote: I do not know what relevance shoes on his feet has here — for one who permits because of shoes on his feet permits even Ishmaelite wrapping, as is clear in the Gemara and Ramban. In truth, Mahariv wrote that here it is permitted because since they practice this wrapping even after the seven days of mourning, we do not forbid a matter done in public except what applies only within the seven; and afterward he wrote that it is also permitted because of shoes on his feet — see there. And the Levush omitted this conclusion — "since he has shoes on his feet" — end.`,
    '1#ב': `**He returns it.** Shach wrote: and nowadays they do not practice to be strict about this. And it is possible that the shoes prove for them, as Beit Yosef wrote — where he has shoes on his feet he need not return the tear — see there, end.`,
    '1#ג': `**The portion.** Darishah wrote in the name of Maharshal that likewise to return twice mikra and once targum is permitted on erev Shabbat.`,
  },
  'siman_400/beer-hagolah/part-001.txt': {
    '1#_': `Mishnah Moed Katan 19a:`,
    '2#_': `As Shmuel's statement there, 24a:`,
  },
  'siman_400/beur-hagra/part-001.txt': {
    '1#א': `**For behold part of the laws of mourning, etc.** Tur — and seemingly puzzling that even on Yom Tov it should count; but Tosafot already explained 23b s.v. m"id. And in Tosafot Rabbeinu they challenge, etc.; and the Tur's words follow the explanation of Rabbeinu Shimon there in Tosafot — see there.`,
    '1#ב': `**That is, etc.** Rif and Shulchan Pesachim ruled like Shmuel because R' Nachman holds like him there; and likewise R' Yochanan there said there is no difference, etc. — and not like Tosafot there s.v. Shmuel, etc.`,
    '1#ג': `**And specifically, etc., since, etc.** This Mahariv wrote in the second reason; but in the first reason he wrote because anything within thirty is permitted even on Shabbat, as stated below siman 399 seif 1 (in s.k. 4). And in any case, since it is not like Ishmaelite wrapping it is permitted — Shmuel explained only for R' Abba, but according to Shmuel's reason, etc.; and so too Mordechai — and he wrote: head-wrapping is a private matter and not like Ishmaelite wrapping but only covering the head, as Abbaye — for we find R' Yosef; and according to the reason of shoes on his feet, even Ishmaelite wrapping is permitted as stated above; and Shmuel according to his reason, etc.; R' Yirmiyah said there is no difference, etc.; and so in Pirkei R' Eliezer; and Rosh brought siman 93 — they go on Shabbat, etc., one who enters the gate of mourners and his mustache, etc.; and in Shulchan Aruch he omitted this law of shoes on his feet; and that of R' Yosef and Abbaye in this — several views.`,
    '1#ד': `**And to wear his shoes.** By law of the Gemara it is permitted, and he is obligated in removing them — except from what is stated there (in parentheses): what is different about putting on the sandal that it is permitted because not everyone, etc.; and now everyone goes in sandals. Rosh.`,
    '2#א': `**His dragging, etc.** In Tosafot 17b s.v. b'shechal, etc.`,
    '2#ב': `**If the thirtieth day fell, etc.** As stated below, and the Sages agree, etc. — even though part of a day is not like the whole day for them, here likewise.`,
  },
  'siman_400/pitchei-teshuva/part-001.txt': {
    '1#_': `**Public matters.** See responsa Givat Shaul siman 72 — he wrote that what people practice on erev Shabbat within the seven days of mourning to sit on a chair and bench and to wear shoes immediately after chatzos of the day because of the honor of Shabbat is an error; and it is fitting for all Torah scholars to protest and rebuke those people who are lenient in this matter and to abolish their custom — see there. And see responsa Shivat Tzion siman 360 — he wrote that a mourner on erev Shabbat, from the time the congregation accepted Shabbat upon themselves, namely with saying Barchu, mourning law ceases, for then it is entry of Shabbat; and so they practice that the mourner stands on erev Shabbat for Minchah with shoes removed outside the synagogue, and before the chazzan begins Barchu they call the mourner to enter and put on his shoes — and all this if the mourner lives where they pray with a congregation and the individual follows the congregation. But if the mourner lives where there is no minyan of ten, certainly the mourner may not advance to accept Shabbat while the day is still great in order to exempt himself from mourning laws; and even though he practices all Sabbaths of the year to add much from weekday to holy, nevertheless on erev Shabbat within mourning he may not remove from himself the obligation of mourning laws before the time of Minchah ketanah, which is two and a half hours before night; but from the time of Minchah ketanah he may advance erev Shabbat.`,
    '2#_': `**And to set upright the bed.** See responsa Radbaz part 1, siman 62.`,
  },
  'siman_400/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_': `(Siman 400, Shach s.k. 4) **Likewise** to return twice mikra. In Eshel Avraham OC (siman 285 s.k. 4) he wrote that possibly if the seventh day falls on Shabbat he must wait until after leaving the synagogue and complete before eating.`,
  },
  'siman_400/siftei-kohen/part-001.txt': {
    '1#א': `**But public matters** — namely to remove his wrapping — do not apply; and he must wear his shoes and set upright the bed. Etc. — so it should be.`,
    '1#ב': `**And specifically, etc., since he has shoes on his feet.** I do not know what relevance shoes on his feet has here — for one who permits because of shoes on his feet permits even Ishmaelite wrapping, as is implied in the Gemara and Ramban; and in truth Mahariv wrote that here it is permitted because since they practice this wrapping even after seven days of mourning, we do not forbid a matter done in public except what applies only within the seven; and afterward he wrote that it is also permitted because of shoes on his feet — see there; and in Atzei Chaim he omitted this conclusion — "since he has shoes on his feet." Bach in siman 386 — Mahariv deals with that wrapping which is a garment called kapa, as I heard they practice to wear it all thirty; but for the hat before the eyes that they practice in our kingdoms all seven alone — that is called wrapping for us — it is public on Shabbat if he does not raise the hat as every person does; therefore as soon as the shaliach tzibbur begins Barchu he is obligated to raise the hat — necessarily.`,
    '1#ג': `**He returns his tear behind him.** And nowadays they do not practice to be strict about this; and it is possible that shoes prove for them, as Hagahos Maimoniyos wrote and Beit Yosef brings — where he has shoes on his feet he need not return the tear — see there.`,
    '1#ד': `**But to return to the portion, etc.** It is written in Darishah in the name of Maharshal that likewise to return twice mikra and once targum is permitted on erev Shabbat.`,
    '2#_': `**And on Shabbat he despaired of seeking him, etc.** — since they despaired of seeking him it is as though buried, as above siman 375 seif 7; and Shabbat counts even at the beginning of the count, as below siman 402 seif 7.`,
  },
  'siman_400/turei-zahav/part-001.txt': {
    '1#_': `**But to return to the portion.** In Agudah he wrote that it appears forbidden; and Maharshal wrote to rule that on a weekday it is forbidden and on Shabbat permitted, since it is its time and obligation of the day — until here his language. And Maharshal wrote in a responsum siman 71 that a mourner whose son's bris is on Shabbat should not ascend to the Torah, even though they practice in some places that the father of the son is obligated to ascend on the day of his son's bris — nevertheless it is not called a public matter.`,
  },
};

let total = 0;
for (const [rel, translations] of Object.entries(T)) {
  const slug = rel.split('/')[1];
  total += patchFile(rel, slug, translations);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_400 editorial patch ${total} blocks\n`);
console.log(`[DONE] siman_400 — ${total} blocks`);
