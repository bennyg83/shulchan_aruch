import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const gra = "output/siman_206/beur-hagra/part-001.txt";
const bh = "output/siman_206/biur-halacha/part-001.txt";
const cs = "output/siman_206/chokhmat-shlomo/part-001.txt";
const dm = "output/siman_206/dagul-merevavah/part-001.txt";
const er = "output/siman_206/eliyah-rabbah/part-001.txt";
const kh = "output/siman_206/kaf-hachayyim/part-001.txt";
const mh = "output/siman_206/machatzit-hashekel/part-001.txt";

patch(gra, "beur-hagra", 4, "ב", `<b>Or etc.</b> As written above seif 3.`);
patch(
  gra,
  "beur-hagra",
  5,
  "א",
  `<b>Seif 5, one does not bless etc.</b> Rambam and Tur from the aforementioned Yerushalmi — the law of one who picked etc.:`,
);
patch(
  gra,
  "beur-hagra",
  5,
  "ב",
  `<b>But one who etc.</b> As written in perek 7 — all neveilah etc. and seif 6, but one standing by a spring — and above siman 177 seif 4, and as written one who blessed on wine that was before him, and at the beginning of Eiruvin they disagree about shinui makom — but it can be said the opposite from what is written; there is no distinction except on Shabbatot and Yamim Tovim, etc. And Beit Yosef wrote in the name of Kol Bo 18 on R' Zerachiyah there, and likewise Yoreh De'ah siman 259 seif 6 in Shulchan Aruch — and this is what Rama wrote in the gloss "and it is good etc.":`,
);
patch(
  gra,
  "beur-hagra",
  6,
  "א",
  `<b>Seif 6, he took etc.</b> The language of Rambam and 24 of Rosh from Yerushalmi there, and the chapter of ruling the doubt stringently:`,
);
patch(gra, "beur-hagra", 6, "ב", `<b>Or became repulsive.</b> R' Menachem:`);
patch(
  gra,
  "beur-hagra",
  6,
  "ג",
  `<b>Only etc.</b> It is the view of Raavad and Semag in the name of Rabbenu Tam to rule the doubt leniently, and so Maharil and Abudraham and siman 259 seif 2 in such cases:`,
);

patch(
  bh,
  "biur-halacha",
  6,
  "_",
  `<b>Only if his mind was not on it etc.</b> — Even though from Rama's wording it appears he interprets the Mechaber's words, in truth it is not so: in the view of the Mechaber, who brought the law as the view of Tosafot and Rosh and also R' Yona [thus Maamar Mordekhai established against Taz] — even with explicit intent on everything to eat, he must also return and bless, for the essence of his blessing was on that which he holds in his hand and the rest is dragged along afterward automatically; therefore since it fell and was lost he must return and bless [so too Prisha and Nahar Shalom and Maamar Mordekhai, and so is proven from the Gra]. Only that Rama agreed to the law to practice like the other poskim who disagree [namely Hagahot Maimoniot and Kol Bo in the name of Rabbenu Tam and responsum of Maharil and so in Abudraham — both per the sages of that generation there and per the view of R' Gershom bar Shelomo], and he holds that with intent to eat all of them he need not return and bless [and it is reasonable that in this case even if they were not before him at the time of the blessing]. And this is what Rama concluded: "only if his mind was not on it" — meaning that practically one should not return and bless except where at the time of the blessing his mind was not explicitly on all of them but only in general [even though in general one may eat everything with this blessing; if he blessed in general it applies only when the first did not fall — for then everything is drawn to him in his blessing; but when the first fell and the blessing stands only on these, it helps only where his mind was explicitly on them — for then they are equal in this blessing — but not in general even if they were before him when he blessed on the first]. However, where his mind was explicitly to eat also the rest — even when the first fell — he need not return and bless [and so explained Magen Avraham and Elya Rabbah and Nahar Shalom — Rama's intent is that his mind was not explicit]. And know further: even though per Shulchan Aruch and Rama it is proven that in general in any case he returns and blesses even if all were placed before him on the table at the time of the blessing — from many poskim it is proven that they hold that even in general, since all were placed on the table before him, he need not return and bless; and this is Raavad brought in Beit Yosef [because he holds that in general the blessing applies to everything placed before him on the table], and Rabbenu Gershom bar Shelomo also agreed with him as explained in Abudraham, and Shibolei Leket also holds thus — he explains Yerushalmi that one must bless when his mind was only on that alone; and it implies that in general, if all were before him on the table, he need not return and bless; and the sages of the generation that Abudraham brought also wrote like Shibolei Leket [and also Rambam's view can be explained thus — only when they were not placed before him at the time of the blessing must he return and bless]. And see in Magen Avraham who brought in the name of Mabit who also wrote that in general he does not return and bless. Safek berachot lehakel.`,
);

patch(
  cs,
  "chokhmat-shlomo",
  1,
  "_",
  `<b>Seif 2.</b> They were before him ground produce and tree produce, etc. NB: see in Magen Avraham in the name of Ra'ah that if he blessed first birkat chatanim he must bless again afterward birkat erusin on its name. And it would appear this is specifically for those who hold chuppah before kiddushin does not help; but for those who hold it helps, he need not bless again. However, one can say: even if it helps, that is only the body of the chuppah; but the blessings that come on the simchah certainly do not apply before kiddushin, since the mind is not settled lest they retract afterward — if so there is no simchah, and therefore no blessings apply; therefore even according to those who hold chuppah before kiddushin helps, nevertheless the blessings apply only after kiddushin, for the bread of acquisition of chuppah is only after kiddushin — think well; so it appears correct to me.`,
);

patch(
  dm,
  "dagul-merevavah",
  1,
  "_",
  `Emendation: the Mechaber wrote R' Moshe in the gloss of Shulchan Aruch HaTahor.`,
);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>If he blessed on tree fruits etc.</b> It appears to me that those growths on the tree and one blesses borei peri haAdamah because the fruit is not finished or they are not the primary fruit — if he blessed borei peri haEtz he has fulfilled his obligation; end of Magen Avraham's words. It is difficult: if so, why did Tur and Shulchan Aruch rule in siman 202 seif 2 regarding boser that is not the primary fruit that if he is in doubt he should bless borei peri haAdamah? And so they wrote at the end of that siman that behold, even with the blessing borei peri haEtz he has fulfilled, since it grew on the tree.`,
);
patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(2) <b>They were before him etc.</b> Taz wondered on Shulchan Aruch: why do I need that they be before him? Behold, even if they brought tree fruit before him after the blessing — if he intended to exempt, he has fulfilled his obligation; end. And according to my humble opinion, he wrote "before him" for emphasis — that even though they are before him, nevertheless specifically intent is required — to exclude one who blessed in general, who does not exempt tree fruit. Beit Yosef wrote: therefore if before him were an etrog and olive of the seven species and he blessed on the etrog — if he did not intend to exempt the olive, he must bless on the olive; and likewise if before him were nuts and apples and he blessed on the nuts — if he did not intend to exempt the apples, he must bless on them, for if the apple is dearer to him than the nuts, it is not logical that he exempt it by dragging unless he intended for them from the outset; end. And see below at the end of siman 246.`,
);
patch(
  er,
  "eliyah-rabbah",
  3,
  "_",
  `(3) <b>[Levush] He should bless first etc.</b> It is difficult, for below siman 211 seif 3 he wrote two views on this, and it is explained there.`,
);
patch(
  er,
  "eliyah-rabbah",
  4,
  "_",
  `(4) <b>That he not interrupt between etc.</b> Olat Tamid challenged: from above siman 177 it implies specifically when interrupting with speech there is an interruption; and he answered that with speech there is interruption even in less than k'dei dibur, but in silence we require more than k'dei dibur — and it requires study for the law; end of his words briefly. In my humble opinion it is possible that here he speaks only l'chatchila, but b'dieved he does not return and bless — and this is easy to understand; and so ruled Magen Avraham. It is also possible that silence, even more than k'dei dibur, is not an interruption unless the pause was about a matter where he did not think at the time of the pause that he would eat or drink immediately — and it is comparable to distraction. And there is some proof from what they wrote in Mateh Moshe and Kenesset HaGedolah siman 203 in the name of Sefer Chassidim: if they told him after he blessed that the tekufah falls — he should wait and not speak until he knows for certain that the tekufah has passed, and then drink the water; end. It implies even more than k'dei dibur; and so it implies somewhat in seif 5 regarding one who blessed before they brought before him, etc.; and so it implies from Ri'az that he brought in Sheirei Kenesset HaGedolah — and still requires study. Again I found in Sefer Berachat Avraham daf 174 that he wrote explicitly that even if he is silent more than k'dei dibur there is no interruption; and he distinguishes between a berachah of praise such as the blessing on lightning — below siman 227 — and a berachah of enjoyment; see there at length.`,
);
patch(
  er,
  "eliyah-rabbah",
  5,
  "_",
  `(5) <b>[Levush] Rabbi u'mori etc.</b> In Sheirei Kenesset HaGedolah he expanded to delete the word u'mori, for "Shalom aleikha rabbi" alone is within k'dei dibur; and so I found in Maadanei Melech chapter Merubah. And the law of pressing the face to the ground I explained in siman 74.`,
);
patch(
  er,
  "eliyah-rabbah",
  6,
  "_",
  `(6) <b>[Levush] Whether with the right etc.</b> Sultana Belula wrote: one should not stab the fruit on which he blesses with a knife, because with the right hand is the main of life — and then there are two opposites in one matter; end. And Sefer Chassidim siman 109 wrote: one who says to his friend "pass me the book" — he should take it with the right and not with the left.`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] If he blessed borei peri haAdamah on tree fruits — he has fulfilled his obligation. And the reason is because the primary of a tree is earth. Berachot 40b. Beit Yosef. Ohr Torah letter 1. And even if he acted intentionally and blessed borei peri haAdamah on tree fruit — he also has fulfilled his obligation. Even HaEzer letter 1.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — borei peri haAdamah — he has fulfilled his obligation. So Tur. And so Tosafot there and Rashba and Rosh, as written in Beit Yosef. However Beit Yosef wrote that Rambam ruled in chapter 8 that he has not fulfilled his obligation; but in Kessef Mishneh there in chapter 8 law 10 he wrote that there is a version in Rambam where it is written that he has fulfilled — see there. And so in the version before us it is written that he has fulfilled. And so is the consensus of the acharonim that he has fulfilled — and so we rule.`,
);
patch(
  kh,
  "kaf-hachayyim",
  3,
  "א",
  `(3) There — borei peri haEtz — he has not fulfilled his obligation. However, those growths on the tree that one blesses borei peri haAdamah because the fruit is not finished or they are not the primary fruit — if he blessed borei peri haEtz he has fulfilled his obligation. Magen Avraham sk 1. Shaarei Teshuvah letter 1. Yad Efraim in Hagahat Tashbetz. Birkei Yosef letter 2 ch. 1 klal 51 letter 12. Chida letter 2. And see Elya Rabbah letter 1 and Maamar Mordekhai letter 1 and in Even HaEzer what they questioned on the words of Magen Avraham mentioned — nevertheless, since all the aforementioned poskim agree to his words and it is simple — we rule thus per Magen Avraham. And likewise on something whose blessing is borei peri haEtz or borei peri haAdamah only because it was crushed — one blesses shehakol; if b'dieved he blessed on it the blessing fitting for that species — he has fulfilled his obligation. Chida there.`,
);
patch(
  kh,
  "kaf-hachayyim",
  3,
  "ב",
  `(3) And likewise on ground fruits whose law is to bless shehakol — like those fruits that are better cooked than raw — if he blessed borei peri haAdamah he has fulfilled his obligation. Peri Megadim ch. 1 siman 58. Birkei Yosef letter 3.`,
);
patch(
  kh,
  "kaf-hachayyim",
  4,
  "_",
  `(4) There — therefore if he is in doubt etc. — he blesses borei peri haAdamah. Ohr Torah letter 1 wrote: since Rambam disagrees on this and holds that if he blessed borei peri haEtz borei peri haAdamah he has not fulfilled his obligation — it is better to bless shehakol so that he fulfills according to all opinions — see there. And so the Rav Rishon LeTzion in Yoreh De'ah — see there. But Birkei Yosef letter 4 wrote: since Rambam's view is not clear and there are versions where it is written that he has fulfilled — the main thing is as Maran ruled — see there. And Shaarei Teshuvah brought it; and Matteh Yehudah letter 1 agreed and challenged Ohr Torah — see there. And so is the consensus of the acharonim: Razah letter 1 ch. 1 klal 58 letter 4, Chida letter 1, Kitzur Shulchan Aruch siman 56 letter 2.`,
);
patch(
  kh,
  "kaf-hachayyim",
  5,
  "_",
  `(5) There — and on everything, if he said shehakol etc. — it implies that even on a smell in the heavens, if he said shehakol he has fulfilled his obligation. And see below siman 216 letter 32.`,
);
patch(
  kh,
  "kaf-hachayyim",
  6,
  "_",
  `(6) There — if he said shehakol he has fulfilled his obligation, etc. And likewise if he blessed in any case on anything he has fulfilled his obligation — for in the language of Torah everything is called food except water and salt. Chida there letter 3; Ben Ish Chai parashat Balak letter 13.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "_",
  `(sk 1) If he blessed etc. It appears to me that those etc. — if he blessed borei peri haEtz he has fulfilled his obligation. And in Sefer Avodat HaRokeach he disagrees, and so in Sefer Even HaEzer; and he brought proof from what is written above siman 202 seif 2: since we do not know the measure of the white bean, one should always bless borei peri haAdamah until it is greatest — end; meaning thereby it necessarily follows that even if it already left the category of boser and is finished fruit fit to bless on it borei peri haEtz — nevertheless, if he blessed on tree fruits borei peri haAdamah he has fulfilled his obligation. And according to Magen Avraham's words it would be better to say he should bless borei peri haEtz — for now that he blesses borei peri haAdamah, for us he has fulfilled, but according to Rambam who holds that if he blessed on tree fruits borei peri haAdamah he has not fulfilled his obligation — if so, when he blesses on fruit that is not completely finished borei peri haAdamah, it is possible he has not fulfilled his obligation, lest perhaps it is already finished and fit to bless borei peri haEtz; and when he blessed on it borei peri haAdamah he has not fulfilled his obligation according to Rambam — which is not so if he blesses borei peri haEtz, for he fulfills according to Magen Avraham for all opinions that even if not finished he fulfills with the blessing borei peri haEtz; and he expanded further. And in my humble opinion one must say that Magen Avraham did not write that if he blessed on something whose fruit is not finished borei peri haEtz he has fulfilled his obligation. Rather, for us who rule that if he blessed on tree fruit borei peri haAdamah he has fulfilled his obligation — because the primary of a tree is earth and it grows from the ground, as it is in Berachot daf 40a — thus we follow the primary nourishment; if so, the same applies if he blessed on something whose fruit is not finished borei peri haEtz he has also fulfilled his obligation, for it is not yet called tree fruit, nevertheless since its primary nourishment is from the tree he has fulfilled, for we follow the nourishment. But according to Rambam, who holds that if he blessed on tree fruits borei peri haAdamah he has not fulfilled his obligation — it implies he holds we do not follow the primary nourishment; if so, it is possible Magen Avraham agrees that if he blessed on something whose fruit is not finished borei peri haEtz he has not fulfilled his obligation; and if so, the difficulty returns that it would be better to say that since we do not know the measure of the white bean he should bless borei peri haEtz in order to fulfill also according to Rambam — for if so, even if he blesses borei peri haEtz he will not fulfill according to Rambam; if so, it is better to bless borei peri haAdamah, for this is clear in the Gemara that if he blessed on tree fruits borei peri haAdamah he has fulfilled his obligation — unlike blessing borei peri haEtz, since this is not clear in the Gemara; but if he blesses on boser borei peri haAdamah he has fulfilled — this is the true law.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "_",
  `(sk 2) They were etc. And regarding l'chatchila see siman 211 seif 3. Certainly l'chatchila one must bless on each thing its proper blessing as enacted by chazal; and in siman 211 it is explained that one must precede the blessing borei peri haEtz to the blessing borei peri haAdamah.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "א",
  `(sk 3) That he came to betroth and to enter immediately. And the meaning is per our custom that they sanctify under the chuppah and bless birkat erusin, and afterward the man sanctifies the woman and they read the ketubah and bless the seven marriage blessings; but in places where they sanctify a long time before the chuppah, per the custom of the Talmud — they would bless birkat erusin at the time of kiddushin, and at the time of their entering the chuppah when the marriage was complete they would bless only birkat nisuin, not birkat erusin.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ב",
  `They came only to enter the chuppah. Meaning she is already sanctified and they already blessed birkat erusin; therefore he erred and blessed only birkat chatanim — namely the seven marriage blessings — and did not bless birkat erusin. And he ruled: if afterward it became known to him that he had not yet sanctified her and he must now bless birkat erusin — he must return and bless again the marriage blessings after birkat erusin.`,
);

const PATCH_COUNT = 26;
console.log(`ok siman 206 remainder — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-206.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
