#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_143/peri-megadim/part-001.txt": {
    "2:כ":
      "Another point I will speak: Eshel Avraham wrote here that the letter hei was found as a complete word doubled — they take out another, for all extra [letters] are considered as removed. And to me this requires study; for perhaps in such a case one may say: whatever is fit for soaking, like a letter stuck to a letter — so here; and even if one holds that extra is considered removed — in treifot they rule thus completely, unlike here — and this requires study.",
    "2:ל":
      "The lay scribe said: All that I heard from my rabbis, and some of what was taught to me from Heaven, I wrote down — surely five Torah scrolls, long and wide as the sea; and, with God's help, the corruption of the times [has damaged them]. And every God-fearing man should be careful about this, especially scribes of STaM; go and see what Tzitz Eliezer wrote in siman 119: after he ruled, he feared perhaps he had not aimed correctly according to halakha, and he was great in his generation — and what will they answer for us today? Therefore let every man fear for his soul before ruling a halakhic matter, and the like.",
  },
  "output/siman_143/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Seif 2 — We do not read. The reason is on account of honor of the congregation; and Mordekhai wrote that the congregation can waive their honor. And so Bach inferred from the words of RIVa. And see above siman 53, Taz s.k. 2, and Pri Chadash there.",
    "2:_":
      "Seif 4, in the gloss — one must compromise; meaning, this is the way of resolution. But the view of Agur is that even in a complete error one does not take out another; and the view of Beit Yosef is that even for missing and extra letters one takes out another — but Rama personally decided thus as halakha; and so is explained in Darkei Moshe, Yoreh Deah siman 279; and see in responsum Minchat Yaakov siman 18.",
    "3:_": "There — to read in that chumash. See below siman 153, Magen Avraham s.k. 3.",
  },
  "output/siman_143/turei-zahav/part-001.txt": {
    "4:א":
      "And if they already read three verses along with it. His words are wondrous, for he combined two views together, one opposite the other. One: per Shulchan Aruch, even within three verses he completes in another Torah scroll without the blessing after it, but he waits with the blessing until he finishes in another Torah scroll — and this is the view of Mahari Bei Rav, the teacher of Beit Yosef. And per this gloss, which is from Mordekhai chapter 2 of Megillah, he says the missing or invalid portion from memory and completes until three verses and blesses after it, and takes out another. Second: per Mahari Bei Rav, even if he already read three verses he does not bless after it, but takes out another Torah scroll and completes; and per Mordekhai he must bless after it on the invalid Torah scroll, and afterward takes out another. If so, he should have written \"some say\": if they already read three verses. And in Levush he wrote here \"some say\"; and in Yoreh Deah siman 279 I raised in Saad to practice: if the error is found within three verses, he does not bless after it, but takes out another and completes, and afterward blesses after it; and he need not recite the opening blessing again on the other, but relies on what he blessed on the invalid one. And if after three verses — he blesses after it and takes out another. And if the error is found in a place where it is impossible to stop — such as three verses will not remain afterward, or it is in the reading of the last [aliyah], after whom there is no reading — then he should practice like Mordekhai: he says the error from memory and completes in the invalid scroll, and afterward blesses after it. See Yoreh Deah what proof he brought for this from the law of the Talmud.",
    "4:ב":
      "Missing and extra [letters]. Such as vavs or yuds that are full or missing; and so in Levush. But the matter does not depend on whether they have one meaning, such as keves and kesev — in this one must take out another, for it is nevertheless a different word; and not as some householders said, that the matter depends on the meaning of the word — this is not so. And once I was traveling in the community of Skal on Shabbat, when a crack was found in one letter in a manner that it was pasul, and there was no other Torah scroll there — I ruled to complete the count of readers in that Torah scroll, for this crack was not visible to the eye explicitly; and it was a pressing hour — it appears that even those who are stringent, whom Rama brought, admit. And so I saw in the responsum of R' Moshe of Lublin, who ruled regarding a missing complete word, when there was no other Torah scroll, that he should complete the reading in that scroll as long as they had not read seven men; but if it is found thus after they read seven, that reader completes the entire sedra.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
