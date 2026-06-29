#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const taz6 = fs.readFileSync(
  new URL("./work/en-104-taz-6.txt", import.meta.url),
  "utf8"
).trim();

const fixes = new Map([
  [
    `rabbi-akiva-eiger:3:_`,
    `Seif 3 — but a scorpion, one interrupts, because it is more prone to do harm. And I question this from the sugya in Shabbat 121a — and from where [do we know] exempt and permitted? For we learned 'and because of a scorpion so it not bite' — how do we learn snake from scorpion? Perhaps they were lenient only regarding scorpion, which is more common to harm.`,
  ],
  [
    `rabbi-akiva-eiger:4:_`,
    `Magen Avraham, note 3 — that are not common. See Magen Avraham siman 90.`,
  ],
  [
    `rabbi-akiva-eiger:5:_`,
    `Magen Avraham, note 6 — as is implied from the incident of Rabbi Avahu. And in my humble opinion there the question is how he should act regarding Keriat Shema — to where should he return, since this was a need for Keriat Shema — it is not called interruption, like kneading for an ox and one who brings salt, which is not interruption between the blessing of haMotzi and eating.`,
  ],
  [
    `shaarei-teshuvah:1:_`,
    `Seif 1 — in Shulchan Aruch, one may not interrupt, etc. And he wrote in Beit Yosef in the name of Mahari Mintz that it is forbidden to speak with his mouth to a laughing child even though he disturbs his prayer; but he is permitted to hint with his hands so the child be silent. And so Maharam ben Chaviv in a responsum in manuscript; and Mahari Mintz wrote further that if he already did something so the child would be silent and he still laughs and disturbs him, he should distance himself from him and not speak — see above, note 3; and see siman 63 regarding hinting in Keriat Shema for a matter of mitzvah, that there is a distinction between the first paragraph and the second; and here it is different, because due to the disturbance he cannot focus his prayer properly — it is considered a need of the prayer itself, and he is permitted to hint. And it appears that a distinguished person standing in prayer and the prayer leader waits for him in saying Kaddish, and he is not pleased that they wait for him because of the trouble of the congregation — and this thought disturbs his prayer — he is permitted to hint to the prayer leader that he pray in his usual manner and not wait for him; and this is like a laughing child who disturbs him.`,
  ],
  [
    `yad-ephraim:1:_`,
    `Taz, note 3 — and all that is not due to duress, etc. — so it should read. There he doubled the difficulty from the words of the Raavad in siman 65, because he added there things not said — that speech is worse, for in Megillah one returns to the place he paused even for speech. And in my humble opinion there is no proof from Megillah, for there the essence of fulfillment is through what one hears from the reading — if so, what difference speech or interruption after finishing a verse? He heard the Megillah, only he heard it intermittently; and even the reader there fulfills through what he hears from his own reading — unlike here in prayer, which requires one to pray; if so one must order his prayer in speech, and when he interrupted in the meantime with other matters, it is properly an interruption and worse than waiting.`,
  ],
  [
    `turei-zahav:3:_`,
    `But he may walk, etc. — as Beit Yosef in the name of Mahari Mintz, that we do not find walking called interruption anywhere — end quote. It is difficult from what the Tur and Shulchan Aruch wrote: but for another matter he may not leave his place until he finishes his prayer; and that case of R. Akiva when he prayed between himself and himself — a person would leave him in this corner and find him in another corner due to many bows and prostrations in supplications after prayer — end quote; and so the Rosh implies from this that walking is interruption; therefore Mahari Mintz argues on this; if so, per the Tur he may not go to throw off the snake since there is no danger — how did Rama bring this to rule halachah? One cannot prove that Mahari also holds like the Tur from that he too explained R. Akiva refers to supplications after prayer, as Beit Yosef wrote — for Mahari explained thus due to another difficulty, namely it was hard for him that one does not bow in the middle of blessings, but not as proof one may not leave prayer; and Tosafos brought this answer on this difficulty and rejected it because he speaks of eighteen; and answered perhaps in the middle of a blessing it is permitted to speak, etc. — nevertheless it appears from their words too that it is permitted to leave the prayer of eighteen for bowing. And Ribash siman 332 holds like the Tur and Rosh and forbids the prayer leader to uproot on Yom Kippur from prayer in what they bow in the order of the service, and Rama brings this below — and one wonders on him that here he ruled like Mahari Mintz that walking is not interruption in prayer — requires study; and see siman 8, note 13.`,
  ],
  [
    `turei-zahav:5:_`,
    `He returns to the beginning — although in siman 65 he ruled regarding Keriat Shema that one need not return except to the place he paused; here in prayer it is stricter; so the Rif proved from what they ruled in the chapter 'One whose dead lies before him' regarding water dripping on his knees that he returns to the beginning if he waited, etc.; and afterward regarding Keriat Shema he returns to the place he paused; and he brings proof that this is the conclusion at the end of tractate Rosh Hashanah; and likewise in Hallel, shofar blasts, and Megillah; but Tosafos, Rosh, and Tur do not distinguish between Keriat Shema and prayer except whether the waiting was due to duress is worse; and so Rama in siman 65; and here the Tur did not need to write the law if he waited long enough for the entire [prayer] that he must return to the beginning, for he already wrote this in siman 85; and likewise regarding prayer there is a distinction between waiting due to duress or not; and Shulchan Aruch who ruled here that if he waited he returns to the beginning — this is for all, for even the Rosh and Tur hold thus, only they disagree in the reason: Shulchan Aruch's reason is due to the stringency of prayer, and for the Rosh and Tur the reason is since he waited due to duress; therefore Rama did not need to write here anything on Shulchan Aruch. And Mahari Mintz wrongly challenged Shulchan Aruch and Rama that even if he waited long enough to finish it all he does not return except to the place he paused, and he relied on the words of Tosafos in the chapter 'One whose dead lies before him,' page 34, in the law of stopping due to a scorpion in prayer — 'however we do not find if he stopped that he returns to the beginning, since it does not say if he stopped he returns to the beginning but he returns to the beginning of the blessing' — end quote; and in truth Tosafos refers to stopping without waiting to finish it entirely, for there is a dispute in the chapter 'One whose dead lies before him,' page 24, per the answer of Rav Ashi; and here all agree he returns to the place he paused; but if he waited to finish it entirely, it is simple he returns to the beginning for all.`,
  ],
  [`turei-zahav:6:_`, taz6],
]);

function apply(file, map) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.slug}:${b.seif}:${b.marker}`;
      const en = map.get(key);
      if (en) {
        n++;
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  return n;
}

for (const f of [
  "output/siman_104/rabbi-akiva-eiger/part-001.txt",
  "output/siman_104/shaarei-teshuvah/part-001.txt",
  "output/siman_104/yad-ephraim/part-001.txt",
  "output/siman_104/turei-zahav/part-001.txt",
]) {
  console.log(f, apply(f, fixes));
}
