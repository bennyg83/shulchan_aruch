#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = new Map([
  [
    `biur-halacha:6:_`,
    `His law, etc., is like the law of other interruptions — see in Mishna Berurah what he wrote: if one sneezed a little, meaning even without duress, so it is implied from Peri Chadash, and this is correct. And know further that wherever we said in these matters that one returns to the beginning of the blessing b'dieved — if he did not return, he has no [obligation] to return to the beginning for that, for b'dieved we rely on the Rashba, who holds that in all these matters one need not return to the beginning of the blessing but only to the place he paused — so wrote Eliyah Rabbah, unlike the Taz, and so ruled Chayei Adam and others — see there; and in particular per the view of the Gra, who agrees with the Rashba. And what we wrote further regarding intentional [speech] — some say he returns to the beginning — this is the view of Bach, Knesset HaGedolah, Magen Avraham, Eliyah Rabbah, Peri Chadash, Chayei Adam, and Magen Giborim; and it is also proven from Peri Chadash and the Gra, who hold like Bach — the view of Abudraham in the name of R' Yehuda Gaon and Eliyah Rabbah in the name of the Raavad, likewise. And what we wrote — some say there is no distinction between unwitting and intentional — this is the view of Shulchan Aruch, Levush, Peri Megadim, Taz, Peri Chadash, and the Gra in the name of the Rashba, also in this approach; but he is more lenient, for even if he spoke intentionally he does not return to the beginning of the blessing but only to the place he paused, for he follows his view that he holds thus regarding unwitting speech. And know further that it appears one who requires returning to the beginning of prayer for intentional speech — even speech between blessing and blessing — and the Taz who is lenient in this b'dieved is only per his view that he holds intentional speech in the middle of a blessing returns only to the beginning of that blessing, for he only invalidates that blessing; unlike the Rosh Aharon, who holds he returns to the beginning of prayer; and in Shulchan Shelomo he did not write thus — and this requires study in his reason. Afterward I found in Magen Avraham in siman 183, note 11, that he ruled regarding intentional speech in the Amidah that one returns to the beginning like in prayer, and there it speaks of between blessing and blessing; and it is possible to answer that there the three blessings are considered as one, as explained in siman 188 in Magen Avraham, note 8 — unlike in prayer; but the language of the Rabbenu Gershom brought in Beit Yosef does not imply thus.`,
  ],
  [
    `biur-halacha:7:_`,
    `And he should be like one who answers — see in Mishna Berurah, and see in Beit Yosef and Darkei Moshe, that the essence of this law whether it is permitted to be silent and listen depends on a dispute: some say that since one who listens is like one who answers, he is literally like one who answers and it is forbidden because of interruption; nevertheless he ruled to be lenient because of custom. And one should examine our custom, which holds that even though one who listens is not like actual speech — if one needed to relieve himself while his fellow was leading the prayer, whether he may leave — and although regarding a baal keri it is forbidden when his fellow is leading him in prayer (see Berachos 20b in Tosafos s.v. as we find in Seder HaDoros) — it is possible baal keri is stricter. And regarding other blessings, see above in siman 92 in Mishna Berurah, note 6. And see in Peri Megadim, who also wrote another question like this.`,
  ],
  [
    `kaf-hachayyim:6:_`,
    `(6) There — but a king or non-Jew, etc. — Rashi explained, may his memory be blessed, that he will not kill him; and so the Rambam there; and so Magen Avraham, note 1, that he fears lest he kill him; but because of monetary loss he need not interrupt — and they brought this in Shulchan Aruch HaRav, note 1. However the rabbi in Matteh Yehuda, note 1, challenged the words of Magen Avraham mentioned, and wrote there is no distinction between a king or non-Jew and whether he came regarding monetary matters or came to kill him — he must interrupt, because a person is always forewarned and non-Jews are suspected regarding three transgressions, and it is like the law of a scorpion below in note 63 — see there; and he meant whether he will come to fine him money or come to fine him to kill him if he does not interrupt — he must interrupt, for we are concerned lest he come to kill him afterward; and so the Machberet, note 2, and these are his words: from that which they stated anonymously in the Gemara, etc., it is implied that even though it appears a king or non-Jew will not kill him and he sees monetary matters — he interrupts; and so I saw that the rabbi in Mahari Katz wrote in Matteh Yehuda, the printed edition, literally, and not like Magen Avraham — and the reader will see that the language of Mahari Katz in the printed Matteh Yehuda is garbled and there is no need to elaborate — end quote. And Beit Din Shel Shalom 271b; and we already explained the words of Mahari Katz mentioned; and nevertheless the words of Magen Avraham may also be explained thus — and this is what he wrote: but because of monetary loss he need not interrupt — if it is certainly clear to him and certain that he will not kill him but only will cause him monetary loss, such as when there is a statute in the kingdom that they do not kill except one liable in judgment, as now in kingdoms that have this statute; but if not, if there is concern that after he fines him money he will return and impose death — Magen Avraham also agrees he should interrupt; and this is what he pointed to seif 3 and siman 108, note 6, seif 8 — to say that specifically if it is clear to him there is only monetary loss as in siman 108, then he does not interrupt; but if there is concern of danger as in seif 3 regarding a scorpion, he rules one interrupts. And he pointed to siman 92, where he wrote in note 2 in the name of Semag that one does not interrupt in prayer except when there is concern of danger to life — see there; and it is implied that for monetary loss, whatever will be, he need not interrupt. And the reason appears to me: even though it is written in Sifrei 256 that for a mitzvah one should not waste more than a fifth — one may say here it is different, because he already began to pray and behold he is as one standing and speaking before the king, and it is not honorable to interrupt his speech before the king because of monetary loss, whatever will be — only where there is concern of danger we are lenient. And see Peri Megadim, Eshel Avraham and Machatzit HaShekel, note 1, and Ruach Chayim, note 1, and siman 2 in the laws of the eighteen blessings, note 48 — and understand carefully.`,
  ],
  [
    `eliyah-rabbah:8:_`,
    `(8) If he spoke, etc. — the language of the Levush: and if he transgressed and spoke, etc. — it is explained that it refers to intentional [speech]; and so it is implied from what Beit Yosef wrote, and this is not with permission, etc. And one may question what Knesset HaGedolah wrote, that it refers to speech due to duress, such as when he saw a king, etc. — how does this resolve the words of Beit Yosef and Levush? And perhaps he explained the words of Beit Yosef and Levush as when it was possible for him to shorten or turn aside from the path, as above at the beginning of this siman, when then it is forbidden to interrupt with speech and he transgressed and spoke — nevertheless due to duress it is called [permitted], and this is forced. Nevertheless it is heard from his words that for intentional [speech] with full intent he returns to the beginning even if he did not wait in order to finish it entirely, as below in siman 114, seif 6, and so ruled Bach, and so is the main view. And in what I explained are resolved all the difficulties that the Taz challenged on Beit Yosef and Bach — and in vain he elaborated — understand carefully. Also what he elaborated and explained the words of Abudraham, that it refers when he did not begin from the beginning of the blessing but from the place he paused and finished and uprooted his feet that he must return and pray from the beginning — is forced; also it does not appear to me thus for the law, since in the essential law of this matter and the beginning of the blessing the Rashba disagrees that one need not begin except from the place he paused, as Beit Yosef wrote, like Keriat Shema siman 64 — if so, certainly we have no [reason] to be more stringent to return to the beginning because of this. Also a difficulty on him from that which in siman 114 he wrote he will explain his reason and did not explain; and Olas Tamid wrote that below it is less, for he changed the order of prayer. And it is not clear, for the Tur and Shulchan Aruch wrote there in every place where they said he returns to the blessing in which he erred, and these matters are unwitting, etc. — it is possible the language 'he erred in it' does not imply to him regarding prayer. Also what Olas Tamid wrote, that it appears for the halachah that even intentionally he does not return because we take doubtful blessings leniently — end quote. It is difficult: the reason of doubtful blessings to be lenient is because blessings are rabbinic, and he himself wrote below in siman 107 that prayer is d'oraisa and doubt is stringent — and see in Lechem Chamudos page 23 and his proofs there, and this requires study. If he interrupted between blessing and blessing, it is simple he begins from the place he paused.`,
  ],
]);

fixes.set(
  `eliyah-rabbah:7:_`,
  fs.readFileSync(new URL("./work/en-104-eliyah-7.txt", import.meta.url), "utf8").trim()
);

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
  "output/siman_104/biur-halacha/part-001.txt",
  "output/siman_104/kaf-hachayyim/part-001.txt",
  "output/siman_104/eliyah-rabbah/part-001.txt",
]) {
  console.log(f, apply(f, fixes));
}
