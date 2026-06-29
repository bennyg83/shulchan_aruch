#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

function setEnglish(rel, slug, seif, marker, newEn) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, "utf8");
  const parts = s.split("**** OC001 SOURCE BLOCK ****");
  let found = false;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const head = "**** OC001 SOURCE BLOCK ****";
    if (
      !slugM ||
      slugM[1].trim() !== slug ||
      !seifM ||
      String(seifM[1].trim()) !== String(seif) ||
      !markerM ||
      markerM[1].trim() !== marker
    ) {
      return head + block;
    }
    found = true;
    const enTag = "**** ENGLISH ****";
    const endTag = "**** END BLOCK ****";
    const enStart = block.indexOf(enTag);
    const enEnd = block.indexOf(endTag);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel}`);
    const before = block.slice(0, enStart + enTag.length + 1);
    const after = block.slice(enEnd);
    const nl = block[enEnd - 1] === "\n" ? "" : "\n";
    return head + before + newEn + nl + after;
  });
  if (!found) throw new Error(`Block not found: ${rel} ${slug} seif=${seif} marker=${marker}`);
  fs.writeFileSync(fp, out.join(""), "utf8");
  console.log(`OK ${rel} ${slug} seif=${seif} marker=${marker}`);
}

const mhs = "siman_114/machatzit-hashekel/part-001.txt";
const ma = "siman_114/magen-avraham/part-001.txt";
const me = "siman_114/mechaber/part-001.txt";
const mb = "siman_114/mishnah-berurah/part-001.txt";

setEnglish(
  mhs,
  "machatzit-hashekel",
  "7",
  "_",
  `(Note 7) Regarding tal (dew) — nevertheless it is praise. Meaning: it is a kind of praise like rain (and see Taz siman 117 note 3). Not so regarding the request, for we rule in siman 117: if one did not ask for rain but said "and give dew for a blessing," we make him return even though he asked for dew. The reason is: since rains are sometimes withheld, they must be prayed for; therefore what he asked regarding dew does not help, for in any case he must ask for the rain that is needed. And see in the Rav Beit Yosef in the name of Ran the reason for the difference between mentioning dew and rain in the request.`
);

setEnglish(
  mhs,
  "machatzit-hashekel",
  "8",
  "א",
  `(Note 8) "He shall say," etc. — this is pointed out in error; and it should read: "and if he remembered before he began 'Ata Kadosh'."`
);

setEnglish(
  mhs,
  "machatzit-hashekel",
  "8",
  "ב",
  `Specifically in matters where we make him return — and as written in siman 294 seif 4.`
);

setEnglish(
  mhs,
  "machatzit-hashekel",
  "9",
  "_",
  `(Note 9) If he erred, etc. — but if he erred in the middle, etc. — see siman 127 and siman 159; and see what is written in siman 64 in the name of Rambam.`
);

setEnglish(
  ma,
  "magen-avraham",
  "1",
  "_",
  `In Musaf prayer. And the reason we do not begin in Maariv is because not everyone is in the synagogue, and they would form factions — one mentions and one does not mention. And the reason they were not concerned about this regarding the request is, in my view, because there in any case not everyone begins on day one — rather everything is according to locality. And the reason we do not begin in Shacharis is because one must proclaim, and in Shacharis it is impossible because one must adjoin redemption to prayer. And see siman 236. In some regions they practice mentioning rain on Hoshana Rabbah, which is not proper — but if they proclaim on Hoshana Rabbah "Mashiv ha'ruach," etc., so that they begin mentioning on the night of Shemini Atzeret, there is some support for the custom (Radbaz vol. 1 siman 200).`
);

setEnglish(
  ma,
  "magen-avraham",
  "2",
  "_",
  `That the chazzan should proclaim — meaning the chazzan says aloud "Mashiv ha'ruach" [within] (before) the prayer. Rama holds the shamash proclaims before the prayer. Bach wrote that according to him, even if the chazzan mentioned it quietly, the congregation may not mention unless they proclaimed first aloud; this appears in seif 3 in the gloss. And it is stated in Beit Yosef: even one praying at home may not mention until the congregation has mentioned. In my view, one who lives where there is no minyan should wait until the time the congregations pray. See siman 90 note 69.`
);

setEnglish(
  ma,
  "magen-avraham",
  "3",
  "א",
  `And similarly regarding tal (dew). Meaning: the Sephardic custom is to say Mashiv ha'ruach and Morid ha'tal during the summer months.`
);

setEnglish(
  ma,
  "magen-avraham",
  "3",
  "ב",
  `We do not make him return — for dew and winds are not withheld; nevertheless it is good to say it so it should be for a blessing. In my view, even if he has not yet finished the blessing we do not make him return, since there is no obligation at all to say it. See siman 294.`
);

setEnglish(
  ma,
  "magen-avraham",
  "3",
  "ג",
  `That they already heard — and the reason we do not proclaim is so they should not say Mashiv ha'ruach, etc., for it appears as though they refuse rain — according to what Chazal said: one does not pray for abundant good (Levush).`
);

setEnglish(
  ma,
  "magen-avraham",
  "4",
  "_",
  `Even in a place where, etc. — nevertheless it is not a matter of mentioning, only of request, as written in siman 117 seif 2.`
);

setEnglish(
  ma,
  "magen-avraham",
  "5",
  "_",
  `Regarding tal we do not make him return — and even though it is not withheld, nevertheless mentioning it is praise to the Holy One, blessed be He, in mentioning it; not so regarding the request, where one must ask about something that is withheld, as written in siman 117 seif 4.`
);

setEnglish(
  ma,
  "magen-avraham",
  "6",
  "א",
  `Even if he finished the blessing — specifically in matters where we make him return; but in matters where we do not make him return, he should not say it. And as written in siman 294 seif 4; and so wrote Bach, not like Rashal.`
);

setEnglish(
  ma,
  "magen-avraham",
  "6",
  "ב",
  `If he erred in them — for example, he erred in their closings, or he did not say HaMelech HaKadosh between Rosh Hashanah and Yom Kippur (Tosafos); but if he erred in the middle, it is of no consequence [and see siman 129 and siman 159]. And there are many places that differ in the prayer text; and in Beit Yosef siman 113 in the name of Abudraham: each one should not move from his custom. And in siman 122 he wrote in the name of the Minhag: if one said one of the blessings in a short coin like the blessing over fruits and matzah, whose opening is its closing — he has changed from the coin that the Sages minted and did not fulfill, end quote. And see what is written in siman 64.`
);

setEnglish(
  ma,
  "magen-avraham",
  "8",
  "_",
  `For us — meaning: for them, even if they said tal during the rainy season as in the summer months, he has fulfilled.`
);

setEnglish(
  ma,
  "magen-avraham",
  "9",
  "א",
  `Until Morid ha'tal — and "until" is inclusive.`
);

setEnglish(
  ma,
  "magen-avraham",
  "9",
  "ב",
  `Three times each day — it is difficult, for on Shabbat and Yom Tov they say it twice each day, and there are more than ninety in thirty days. And one could say that regarding the request the law is likewise; and regarding the request there are fewer than ninety, for on Shabbat and Yom Tov there is no request; therefore we stated the middle formulation of ninety times (Darkei Moshe). And so wrote Rama in a responsum. Nevertheless this is strained, for we do not find in the Yerushalmi that it refers to the request; and in Hagahot Maimoniyot he did not actually write ninety — rather he wrote that one should say it as many times as they say it in thirty days; and similarly regarding the request.`
);

setEnglish(
  ma,
  "magen-avraham",
  "9",
  "ג",
  `He is in the presumption — as we say in the Gemara: if he pushed back his gores he is liable; if he brought them near, all the more so. And Rif rejected his proof, etc. (Tur). And it requires investigation: how does he bring proof from R' Meir, when we rule like R' Yehuda that it does not become a muad until it gores three times in three days and not three times in one day [afterward I saw Shlah raised this difficulty]. And so wrote below in siman 576 seif 2: specifically three deaths in three days; but three deaths in one day — this is not a matter; and this is not like R' Meir, as we say in the Gemara. If so, see that this is not a kal vachomer. And one could say that the verse "on that day he shall prophesy" — that is why it was stated. And similarly regarding a matter we say "on that day the air is different," not so here: if he became accustomed when he says them scattered — kal vachomer when consecutive. And this is the meaning: since for R' Meir even regarding an ox he holds kal vachomer, all the more so here. And even though we do not rule like R' Meir regarding an ox, here nevertheless we rule like him.`
);

setEnglish(
  ma,
  "magen-avraham",
  "9",
  "ד",
  `Until Mechalkel chayim, etc. — and "until" is inclusive; if so, his tongue became accustomed to say Rav L'hosia from Mechalkel chayim, as above. And see in Shlah who disagrees on this.`
);

setEnglish(
  me,
  "mechaber",
  "1",
  "main",
  `The Laws of Mentioning Wind, Rain, and Dew. Containing 9 seifim. We begin to say in the second blessing Mashiv ha'ruach u'morid ha'geshem in the Musaf prayer of the last Yom Tov of the festival, and we do not cease until the Musaf prayer of the first Yom Tov of Pesach.`
);

setEnglish(
  me,
  "mechaber",
  "2",
  "main",
  `It is forbidden to mention rain until the chazzan proclaims it. {Rama: And some say that before they begin Musaf the shamash proclaims Mashiv ha'ruach, etc., so that the congregation should mention it in their prayer, and so is the practice (Mordechai on the beginning of the first chapter of Taanit).} Therefore, even if one is sick or under duress, one should not advance one's prayer before the congregation's prayer, since it is forbidden to mention until the chazzan says it. But if one knows that the chazzan proclaimed it, even though one did not hear, one may mention it. And for this reason, if one came to the synagogue and the congregation had already begun to pray, one prays and mentions it, even though one did not hear from the chazzan.`
);

setEnglish(
  me,
  "mechaber",
  "3",
  "main",
  `If one said Mashiv ha'ruach (during the summer months) or did not say it during the rainy season, we do not make him return. And similarly regarding tal: if one mentioned it during the rainy season or did not mention it during the summer months, we do not make him return. {Rama: And we Ashkenazim do not mention tal, neither in the summer months nor in the rainy season; rather, in the summer months we only say Rav L'hosia Mechalkel chayim, etc. (Tur). Some say the chazzan stops mentioning in the Musaf prayer of the first Yom Tov of Pesach, but the congregation mentions it; and they do not stop until Minchah, for by then they already heard the chazzan stop in the Musaf prayer. And so is the practice.}`
);

setEnglish(
  me,
  "mechaber",
  "4",
  "main",
  `If one said Morid ha'geshem during the summer months, we make him return; and he returns to the beginning of the blessing. And if he concluded the blessing, he returns to the beginning of the prayer. And even in a place where rain is needed during the summer months, if one mentioned rain instead of tal, we make him return. {Rama: And similarly, if one mentioned rain and tal, one must return (Beit Yosef in the name of Rambam, Rosh, and Tur).}`
);

setEnglish(
  me,
  "mechaber",
  "5",
  "main",
  `During the rainy season, if one did not say Morid ha'geshem, we make him return. And this is when one did not mention tal; but if one mentioned tal, we do not make him return.`
);

setEnglish(
  me,
  "mechaber",
  "6",
  "main",
  `When do we say that we make him return when he did not say Morid ha'geshem during the rainy season? When he concluded the entire blessing and began the blessing after it — then he returns to the beginning of the prayer. But if he remembered before he concluded the blessing, he says it at the point where he remembered. And even if he concluded the blessing but remembered before he began Ata Kadosh, he need not return; rather he says Mashiv ha'ruach u'morid ha'geshem, without a closing formula. {Rama: The first three blessings are considered as one; and anywhere one erred in them, one returns to the beginning, whether alone or with the congregation (Tur).}`
);

setEnglish(
  me,
  "mechaber",
  "7",
  "main",
  `Anywhere we say that one returns to the blessing in which one erred — that is when one erred inadvertently; but if deliberately and with intent, one returns to the beginning.`
);

setEnglish(
  me,
  "mechaber",
  "8",
  "main",
  `During the summer months, if one is in doubt whether one mentioned Morid ha'geshem or not — up to thirty days there is a presumption that one mentioned rain, and one must return. {Rama: And this applies for us who do not mention tal during the summer months. If one is in doubt whether one said Morid ha'geshem during the rainy season — for all thirty days one returns, for it is certain one said what one was accustomed to say; and indeed one did not mention either tal or rain. After thirty days one does not return (his own opinion).}`
);

setEnglish(
  me,
  "mechaber",
  "9",
  "main",
  `If on the first day of Pesach one says from the blessing Ata Gibor until Morid ha'tal ninety times — corresponding to the thirty days when one would say it three times each day — from that point onward, if one does not remember whether one mentioned rain, there is a presumption that one did not mention rain and one need not return. {Rama: And similarly for us: if one said until Mechalkel chayim without Mashiv ha'ruach u'morid ha'geshem that we mention during the rainy season; and similarly if on Shemini Atzeret one said ninety times Ata Gibor until Morid ha'geshem — if afterward one is in doubt whether one mentioned it or not, the presumption is that one mentioned it (his own opinion).}`
);

setEnglish(
  mb,
  "mishnah-berurah",
  "1",
  "א",
  `(1) In the second blessing — because it contains resurrection of the dead, and rains are life to the world like resurrection of the dead.`
);

setEnglish(
  mb,
  "mishnah-berurah",
  "1",
  "ב",
  `(2) In Musaf prayer, etc. — and it would have been fitting to mention from the first Yom Tov of the festival, for on it we are judged regarding water; but because rain is a sign of curse on the festival of Sukkot, since one cannot sit in the sukkah during rain, we do not mention rain until the seven days of sitting in the sukkah have passed. And by right one should begin immediately on the night of the last Yom Tov; but in Maariv not all the people are in the synagogue — one mentions and one does not mention, and they would form factions. And why do we not mention in Shacharis? Some wrote because it is forbidden to mention rain until the chazzan or shamash proclaims aloud Morid ha'geshem before the prayer, as below; and this is impossible to proclaim in Shacharis because one must adjoin redemption to prayer. And see another reason in Taz. And if one erred and mentioned Mashiv ha'ruach u'morid ha'geshem in Maariv of Shemini Atzeret or in Shacharis, one does not return.`
);

console.log("Done siman 114 part 1 — 29 blocks");
