import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { cs3, ma4 } from "./pipeline/work/_siman-215-p2-long-en.mjs";

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

const bhc = "output/siman_215/biur-halacha/part-001.txt";
const cs = "output/siman_215/chokhmat-shlomo/part-001.txt";
const er = "output/siman_215/eliyah-rabbah/part-001.txt";
const ea = "output/siman_215/eshel-avraham/part-001.txt";
const kh = "output/siman_215/kaf-hachayyim/part-001.txt";
const mh = "output/siman_215/machatzit-hashekel/part-001.txt";
const ma = "output/siman_215/magen-avraham/part-001.txt";
const mc = "output/siman_215/mechaber/part-001.txt";
const mb = "output/siman_215/mishnah-berurah/part-001.txt";

patch(
  bhc,
  "biur-halacha",
  4,
  "_",
  `<b>And it is forbidden to answer amen after him</b> — see Mishna Berurah; nevertheless it appears that if one practices according to some view and that view was not completely rejected by the poskim [such as one who blesses Baruch Atah... Elokeinu melech ha'olam chai ha'olamim per the Yerushalmi] — even though by law he is not obligated to answer amen on it, for doubt in amen is lenient — nevertheless there is no prohibition if he answers, as Peri Megadim wrote in letter 1 that there is no concern of lo tissa.`,
);

patch(
  cs,
  "chokhmat-shlomo",
  1,
  "_",
  `<b>Seif 1.</b> NB see in Peri Megadim in the introduction and here in that siman where he was uncertain whether in a case of doubt one may bless or not; and see in my work on Orach Chayim year 5604 in Laws of Sukkah siman 638 what may be resolved of this doubt, see there, and examine well.`,
);

patch(
  cs,
  "chokhmat-shlomo",
  2,
  "_",
  `<b>There, seif 2</b> — one who hears one of Israel bless etc. NB: behold, such is Rambam's view, and Tur's language in siman 215 is thus, and these are his words: it appears to me that "they answer" that he said is not an obligation but permission etc.; but Rambam wrote: everyone who hears is obligated to answer amen etc. I wonder how it entered Tur's mind to say it is permission, for the Talmud is explicit in chapter 4 of Shevuot daf 36: Rabbah said amen on it is an oath etc., amen is affirmation of words, as written "and Yirmiyahu said to Chananyah amen, so may Hashem do" etc., and Rashi explained amen on it — affirmation of words, and it is fit to answer amen on prayer and supplication which is language of "may it be affirmed" that it be the will that the matter be true, end of his words; if so it is proven there is obligation to answer amen. And it is possible Tur explains not like Rashi's explanation, only that he teaches it is permitted to answer and it is not amen y'tomah; and it is possible to be evidence that such is the intent from what was difficult for him — why bring evidence from Yirmiyahu and not bring evidence from Scripture of David before Yirmiyahu, as written in chapter 72 "and blessed be the Name of His glory forever, and let His glory fill all the earth, amen and amen," and likewise chapter 89 "blessed is Hashem forever, amen and amen," and likewise chapter 106 "blessed is Hashem God of Israel from the world to the world, and all the people said amen"; if so from all this it is proven amen was affirmation of words, and why did he call the verse of Yirmiyahu? But per the above that he came to prove it is not amen y'tomah — it fits well that he teaches that even in Chananyah's words who was a false prophet it is also not amen y'tomah if he blesses Israel, and it fits well; but on Tur it is difficult how he can say it is permission, for Scripture says "and all the people said amen" — implying obligation to answer amen, and one cannot say here that he teaches we may expound amen thus, for we already hear from chapters 72 and 89 that it is permitted to answer amen — perforce he teaches there is obligation to answer amen, and it is proven like Rambam; great study required; and see Taz s.k. 4 what he wrote explaining Tur's words and what he wrote "they answer" etc.; and see in my work on Shulchan Aruch Orach Chayim year 5609 in responsum to the community of Posen, who acquired standing in Laws of Prayer siman 124, see there, and examine well.`,
);

patch(cs, "chokhmat-shlomo", 3, "_", cs3);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) [Levush] The adult who answers etc. And in Levush Yom Tov he divides on this, for we see Rav said to his son Chiya: seize and bless, and likewise Rav Huna — evidently the halacha is that the blesser is preferable, up to here. And above siman 197 seif 2 he should have written thus; and see at the end of Nazir and in Shelah daf 255.`,
);

patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(2) [Levush] And he heard that he mentioned etc. — so wrote the Rash, Tur, Rabbenu Yonah, and Rabbenu Yerucham daf 103. I wonder at the Bartenura end of the chapter Eilu Devarim who wrote: even though he did not hear mention of the Name but only the end of the blessing, up to here. However, in Rashi's and Rambam's explanation it appears at first glance like him, and all the acharonim did not notice this.`,
);

patch(
  er,
  "eliyah-rabbah",
  3,
  "_",
  `(3) But if he was etc. Beit Yosef and Kesef Mishneh and Taz and Magen Avraham did not look at Rambam's explanation of the Mishnah, where it is clear there that specifically after an Israelite his fellow one answers, and there is no distinction whether he heard the entire blessing or not.`,
);

patch(
  er,
  "eliyah-rabbah",
  4,
  "_",
  `(4) That it is permitted to teach etc. But an adult when he learns the blessings in the Talmud says without mention of the Name — Magen Avraham.`,
);

patch(
  ea,
  "eshel-avraham",
  4,
  "_",
  `As one who swears in vain etc., as written in Eliyah Rabbah. Nevertheless it is only d'rabbanan, since he blesses — Tosafot Rosh Hashanah daf 33, and so in Sefer HaChinuch parashat Ekev; and so one may explain Rambam not like Magen Avraham; and Shelah wrote in the name of Ramban: one who mentions Him in vain — even if people did not excommunicate him — he removes his shoe and sits on the ground like one in niduy and asks three to permit him; and if not, on him is said, God forbid, if you do not observe etc.`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] But after two blessings etc. — therefore one should answer amen after his blessings on the haftarah; and some practice thus. Berkei Yosef letter 1, and so in his book for Lodz siman 20 letter 19, Shatz chapter 8 folio 1. However, Zekan Aharon letter 1 wrote that this custom is not among us; and so now in our time we have not seen anyone who practices thus.`,
);

patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — only after two blessings etc. Maharshal wrote: therefore requires study in the morning Torah blessing which has two blessings whether to answer amen after one's own blessing, end of his words; and Bach brought it and wrote they were not accustomed to answer amen after the Torah blessing. The reason is Rambam spoke only of two blessings and three similar to Boneh Yerushalayim, for each blessing was enacted for a separate matter, such as birkat hamazon: (1) blessing of haZan, (2) blessing of the land, (3) Boneh Yerushalayim; but the two Torah blessings are considered as one since both are on the Torah, end of his words.`,
);

patch(
  kh,
  "kaf-hachayyim",
  3,
  "_",
  `(3) There — and they practiced to answer amen after Yehalelukha etc. — because it is forbidden to interrupt in the middle of Hallel and psalms of praise; and it is as if the first and last blessing are adjacent to each other. Not so in the blessing on fruits; and in the Torah blessing too the enactment of the ancients was that the first blesses before it and the last after it, and they were not adjacent. Magen Avraham s.k. 1.`,
);

patch(
  kh,
  "kaf-hachayyim",
  4,
  "_",
  `(4) There — and they practiced to answer amen after Yehalelukha etc. — and so they practice to answer amen after the conclusion of the eighteen [blessings]. But after Ga'al Yisrael of Shaharit they were not accustomed to answer, because per the Zohar it is an interruption — Beit Yosef; and see above siman 66 seif 7; and likewise after the conclusion of his blessing in birkat hamazon one does not answer amen — Beit Yosef.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "א",
  `<b>s.k. 1 — after Yehalelukha, because it is forbidden etc.</b> — meaning: even though specifically after two adjacent blessings [is required], Yehalelukha is adjacent to the blessing before Hallel and Yishtabach adjacent to Baruch she'amar; and even though they interrupt between the two blessings with recitation of Hallel and psalms of praise — nevertheless they are called adjacent, for it is forbidden to interrupt between them in speech; not so in the blessing on fruits — even though there are also two blessings, one before and one after — nevertheless since one may interrupt between the first blessing and the last in speech, it is not called adjacency.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "ב",
  `<b>And the Torah blessing etc.</b> Even though there is a blessing before and after and they are adjacent, l'chatchila one should not interrupt between one blessing and the last blessing; even though if he interrupted and spoke it is not an interruption as written above siman 170 seif 2 — that is only b'dieved; see there in Tur.`,
);

patch(
  mh,
  "machatzit-hashekel",
  2,
  "_",
  `<b>(s.k. 2) In Birkat HaMazon etc.</b> For the d'rabbanan blessing; for haTov vehaMetiv we hold it is d'rabbanan.`,
);

patch(
  mh,
  "machatzit-hashekel",
  3,
  "א",
  `<b>(s.k. 3) Or a Samaritan etc.</b> That is before the decree; meaning before they decreed on them that their law be like complete non-Jews, as is in Chullin daf 6 folio 1; and it implies in Beit Yosef that after the decree they are worse than non-Jews — that if one hears a blessing from a non-Jew they answer amen after him, as is in Yerushalmi; and see in Laws of Chapters chapter 1 of Laws of Blessings.`,
);

patch(
  mh,
  "machatzit-hashekel",
  3,
  "ב",
  `Not like Yerushalmi — because in our Gemara it was not mentioned at all to answer after a non-Jew, and it mentioned only Samaritan in the Mishnah; if so the plain meaning of the Mishnah also implies specifically Samaritans (that is, before the decree), and in our Gemara too it was not mentioned to answer after a non-Jew; and it is impossible that our Talmud also holds one answers after a non-Jew — one must explain that since the plain meaning of the Mishnah does not imply so, perforce one must say our Talmud argues with Yerushalmi.`,
);

patch(
  mh,
  "machatzit-hashekel",
  3,
  "ג",
  `And this is the view of the Rav in the gloss; if so what is written in the gloss that they answer amen after idolaters if he heard the entire blessing — likewise a Samaritan; only one may say he specified idolaters for emphasis, for it is not necessary that he holds like what Rabbenu Yosef in his book Beit Yosef wrote, that it implies he holds a Samaritan is worse than idolaters; and even though regarding a Samaritan one does not answer, regarding a non-Jew one answers — if so this that Rama ruled one answers after a non-Jew is because he ruled like Yerushalmi; if so it is difficult why Rama said regarding a non-Jew if he heard the entire blessing — for in Yerushalmi it is proven a non-Jew is preferable to a Samaritan (before the decree), and even if he did not hear the entire blessing they answer after him; and Bach challenged thus, see there; and it seems he holds like what Kemach Minchah wrote that both non-Jew and Samaritan require hearing the entire blessing; and one must say he holds we do not accept Yerushalmi since it was not mentioned in our Talmud that [a non-Jew] is preferable to a Samaritan; but logically he holds he is not worse than a Samaritan, and regarding a Samaritan we learned that if he heard the entire blessing they answer — if so the same applies to idolaters.`,
);

patch(
  mh,
  "machatzit-hashekel",
  4,
  "_",
  `(s.k. 4) The entire blessing etc., and as written siman 156, so it should read; and see there in Magen Avraham and what is written there.`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "א",
  `<b>After Yehalelukha.</b> Because it is forbidden to interrupt in the middle of Hallel and psalms of praise — it is as if the first and last blessing are adjacent to each other; not so in the blessing on fruits; and in the Torah blessing too the enactment of the ancients was that the first blesses before it and the last after it, and they were not adjacent.`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "ב",
  `<b>In Birkat HaMazon.</b> To interrupt between d'oraisa blessings and d'rabbanan blessings.`,
);

patch(
  ma,
  "magen-avraham",
  2,
  "א",
  `<b>Or a Samaritan.</b> For even though in the Gemara they say regarding a Samaritan too one answers if he heard the entire blessing — that is before the decree; but now they decreed on them to be complete idolaters (Beit Yosef); and Kemach Minchah wrote that Rambam's view is that even regarding an idolater one does not answer even if he heard the entire blessing — not like Yerushalmi — and Bach also wrote thus; Kemach Minchah further wrote that Rambam deals with when he did not hear the entire blessing; but if he heard it all he answers, whether for an idolater or a Samaritan — and this is the Rav's view in the gloss. It is in the Midrash: when one hears someone praying a matter or blessing for Israel even without mention of the Name — he is obligated to answer amen; therefore they answer amen after haRachaman in birkat hamazon.`,
);

patch(
  ma,
  "magen-avraham",
  2,
  "ב",
  `<b>The entire blessing.</b> For even though the idolater's intention is for their avodah zarah — nevertheless one estimates etc., as written siman 156.`,
);

patch(
  ma,
  "magen-avraham",
  3,
  "_",
  `<b>That it is permitted to teach etc.</b> But an adult when he learns the blessings in the Gemara says without mention of the Name; and so in Rambam's explanation of the Mishnayot in chapter HaRo'eh and in Tosafot beginning of chapter HaRo'eh.`,
);

patch(ma, "magen-avraham", 4, "_", ma4);

patch(
  mc,
  "mechaber",
  1,
  "main",
  `Responding "Amen" after blessings. Contains 4 seifim: One does not respond "Amen" after his own blessings, except after two or more blessings that conclude a series of blessings. It is customary to respond "Amen" after "Yehalelukha" and after "Yishtabach." {Rama: There are those who say that one should respond "Amen" only after the blessing "Boneh Yerushalayim" in Birkat HaMazon, and this is the widespread custom in these countries, and it should not be changed (Tosafot and Mordechai, beginning of the chapter Three Who Ate; Maharik, Root 72). In places where they are accustomed to respond "Amen" after "Yehalelukha" and "Yishtabach", one should also respond after the blessing "Shomer Amo Yisrael La'ad."}`,
);

patch(
  mc,
  "mechaber",
  2,
  "main",
  `If one hears a fellow Jew reciting one of the blessings — even if he did not hear the entire blessing from beginning to end, and even if he himself is not obligated in that blessing — he is required to respond "Amen" after it. However, if the one reciting the blessing was a heretic, or a Samaritan, or a young child, or an adult who altered the established wording of the blessings, one does not respond "Amen" after him. {Rama: One may respond "Amen" after a non-Jew if he heard the entire blessing from his mouth (Rabbenu Yitzchak, chapter Eilu Devarim).}`,
);

patch(
  mc,
  "mechaber",
  3,
  "main",
  `The rule that one does not respond "Amen" after a child applies specifically when the child is learning the blessings from his teacher, for it is permitted to teach children the blessings in their proper form even though, during the learning, they are reciting the blessings in vain. However, when the children are reciting the blessings to fulfill their own obligation — since they are of an age of education (bnei chinuch) — one does respond "Amen" after them. The same applies when they recite the haftarah in the synagogue.`,
);

patch(
  mc,
  "mechaber",
  4,
  "main",
  `Anyone who recites a blessing that is unnecessary is considered as one who takes the Name of Heaven in vain, and it is as if he swore a false oath. It is forbidden to respond "Amen" after him.`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(1) After his blessings — meaning after every individual blessing that he blesses, or even after two blessings — as long as they are not the end of blessings, one does not answer amen to oneself after them; for it is in the Gemara: anyone who answers amen after his own blessings — that is disgraceful. And behold from the Gemara's language it implies he did not make a prohibition here, only it is disgraceful — and this is when he did not make an interruption here; but if he blessed on some mitzvah matter he wishes to perform, or a blessing of enjoyment where he interrupted between the blessing and that matter — he made a prohibition here and returns and blesses [Peri Megadim in siman 151].`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 215 part 2/3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-215-part2of3.json",
);
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
  /\bDr\.\b/i,
  /\bIlan\b/i,
  /\bRach\b/i,
  /\bGLOSS:/i,
  /\bWayne\b/i,
  /\bAmy\b/i,
  /\bDamiliev\b/i,
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
