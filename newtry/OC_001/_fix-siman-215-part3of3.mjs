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

const mb = "output/siman_215/mishnah-berurah/part-001.txt";
const pm = "output/siman_215/peri-megadim/part-001.txt";
const rae = "output/siman_215/rabbi-akiva-eiger/part-001.txt";
const st = "output/siman_215/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_215/turei-zahav/part-001.txt";

patch(
  mb,
  "mishnah-berurah",
  1,
  "ב",
  `(2) That they are the end of berachot — meaning after the blessing "Shomer Amo Yisrael La'ad" [or after "HaPores Sukkat Shalom" etc. that they say on Shabbat], which concludes the berachot of Keriat Shema; or after the blessing "Boneh Yerushalayim," which concludes the first three berachot that are from the Torah; but not after the first berachot of Ma'ariv and Shacharit — for although they are two berachot, they are not at the end of the matter; and "Amen" applies only at the conclusion and discharge of the matter:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(3) After "Yehallelucha" etc. — and even though one does not answer Amen after oneself except specifically after two adjacent berachot, nevertheless these are called adjacent: "Yehallelucha" is adjacent to the berachah before Hallel, and "Yishtabach" is adjacent to "Baruch She'amar," for it is forbidden to interrupt and speak between "Baruch She'amar" and "Yishtabach," and between the berachah before Hallel and "Yehallelucha" [and the psalms of song that they say between them are not considered an interruption]. Not so with the final berachah after the berachah of enjoyment — for although there are also two berachot, one before it and one after it, since it has no connection with the first berachah — for he may interrupt and speak between the tasting after the first berachah and the final berachah — the final berachah is like a separate berachah:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(4) "Boneh Yerushalayim" — because it is the end of berachot that are d'oraisa; for the berachah "HaTov VeHaMeitiv" is d'rabbanan, and in order to show that there is a distinction between them, therefore they answer Amen after it:`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ה",
  `(5) "Shomer Amo" etc. — but one does not answer after "Yeira'u Eineinu," which he blesses by himself, for it is not related to the berachah of Keriat Shema and is like a separate berachah:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "א",
  `(6) That he did not hear all of it — but heard only that he mentions the Name and the end of the berachah — he is obligated to answer Amen after him. And some rule that even if he heard only the signature of the berachah, he must answer Amen [Acharonim]. And see in Chayei Adam who compelled that even the first view agrees where he knows on which berachah he is answering, that he must answer; and as above siman 124 seif 8 in the gloss — see there:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ב",
  `(7) Even if he is not obligated — meaning, and all the more so where he himself is obligated in that berachah and wants to fulfill through the blesser's berachah — he certainly must answer Amen to show that he too upholds and sustains the words of the blesser. But then we require specifically that he hear the entire berachah from beginning to end, as above siman 213 seif 3:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ג",
  `(8) Obligated to answer — as it is written "for the Name of Hashem I call out — give greatness to our God" (Devarim 32:3); and they expounded [Yoma 37b]: Moshe said to Israel: when I bless and mention the Name of the Holy One, blessed be He — you give greatness to our God with the response of Amen:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ד",
  `(9) After him Amen — it is stated in the Midrash: when one hears another praying or blessing Israel, even without mention of the Name, he must answer Amen. Therefore the custom spread to answer Amen after "HaRachaman" in Birkat HaMazon [acharonim]:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ה",
  `(10) But if he was, etc. — from the fact that he listed heretic and Samaritan together with a child and an adult who changed the wording, it implies they have one law; and just as with a child and an adult who changed — even if he heard the entire berachah from their mouth he does not answer Amen, for the berachah is in vain — so too with these. And even though in the Gemara they say that one also answers after a Samaritan if he heard the entire berachah from his mouth — that is before they found for them the image of a dove on Mount Gerizim, for they worshipped it; but afterward, not — for their intention was for Mount Gerizim, and a heretic too — his intention is not for Heaven but for idolatry. And the Gra in his explanation ruled that with these two, if he heard the entire berachah from his mouth, he answers Amen after him:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ו",
  `(11) And he changed, etc. — and specifically when he changed in a manner that he does not fulfill through the berachah on account of this, and behold it is as one who blesses a berachah in vain — it is forbidden to answer Amen after him:`,
);
patch(
  mb,
  "mishnah-berurah",
  2,
  "ז",
  `(12) He heard the entire berachah — for the way of a non-Jew is not to intend for idolatry when he mentions the Name [and it appears the same for one who heard from one who converted his religion to idolatry]. Nevertheless, the Taz's view is that there is no obligation to answer for a non-Jew — only permission:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "א",
  `(13) That he is learning, etc. — meaning, it is not fit to say Amen in truth and to uphold the words of the blesser, since there is no berachah upon him:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ב",
  `(14) For naught — meaning, when the rabbi learns with them berachot not at their time, nevertheless it is permitted to mention the Name of Hashem; and even the rabbi may mention the Name in order to teach the child the berachot, for in any case we need to learn with them in order to educate them in Torah study and in observance of mitzvot (as it is written "and you shall teach them to your children" etc.). And specifically with a child it is permitted to mention the Name; but an adult, at the time he learns berachot in the Gemara, says without mention of the Name; and only when he learns the verses mentioned in the Talmud may he say them as they are written, with mention of the Name:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ג",
  `(15) To exempt, etc. — such as when he blesses berachot at their time through education:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ד",
  `(16) That they are bnei chinuch — it implies that on a berachah that he blesses over eating and the like before he reached the age of education, one does not answer Amen on him [Peri Megadim in his novellae on Berachot]:`,
);
patch(
  mb,
  "mishnah-berurah",
  3,
  "ה",
  `(17) That they recite the haftarah — meaning that then they read in the Torah and the Prophets and bless before and after them, and one must answer Amen on them:`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "א",
  `(18) A berachah that is unnecessary — such as one who blesses during the meal on things already discharged through the berachah of HaMotzi — that berachah is wholly unnecessary. And furthermore the poskim wrote that even if now the berachah would not be in vain, it is also sometimes in the category of a berachah that is unnecessary — such as if the table was set before him and his intention was to go and wash his hands and eat, and he takes before washing and blesses on things he intends to eat during the meal — this too is forbidden, for it causes a berachah that is unnecessary; and all the more so one who interrupts between the berachah and the action, for he causes the first berachah to be entirely nullified — certainly forbidden. And see above siman 46 in Mishna Berurah sk 14 and in Magen Avraham in this siman regarding completing one hundred berachot on Shabbat:`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ב",
  `(19) For naught — meaning, even though he blesses in the order of the berachah's wording in the way of praise and thanksgiving, since it is unnecessary — and all the more so if he mentioned the Name of Hashem for naught, heaven forbid; and not only the four-letter Name of Hashem — the other Names are also included in this prohibition. And the same if he uttered the Name in a foreign tongue for naught — meaning, not in the way of praise and thanksgiving — there is also a prohibition [acharonim]. The Arizal wrote in the name of the Shelah: if you hear your friend mentioning the Name, do not enter within his words to say "do such-and-such for me," for through this he will fall silent to hear your words and you cause him to utter the Name of Heaven for naught. But if you hear your friend mentioned the Name of Hashem to curse his fellow — then interrupt his words, for he will sin when he curses:`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ג",
  `(20) As one who swears falsely — this is the Rambam's language, and its source is from what is stated in the Gemara: whoever blesses a berachah that is unnecessary transgresses "you shall not take the Name of Hashem your God in vain." Nevertheless, the view of several Rishonim is that the essence of the prohibition is d'rabbanan, since he mentions it in a berachah in the way of praise and thanksgiving, and the verse is merely an asmachta. But if he mentions it for idolatry, heaven forbid, for naught without a berachah — according to all there is a Torah prohibition, for he transgresses the positive commandment "you shall fear Hashem your God," which is a warning against uttering the Name of Heaven for naught, as stated in Temurah [daf 4a] — for this is part of fearing Him, not to mention His great Name except in the way of praise and thanksgiving for what one is obligated, but not for naught. Nevertheless, whether per the Rambam or per the other poskim — if he was in doubt about which berachah, whether he blessed or not — if it is something that is d'oraisa, he returns and blesses; if it is d'rabbanan, he does not return and bless. And it appears from several acharonim that there is a prohibition in returning and blessing. The acharonim wrote: even if there is a double doubt requiring a berachah — such as a doubt whether he ate a kezayit or not, and even if he did not eat, perhaps the halachah is that on a creature, even less than a kezayit, one blesses — nevertheless, his doubt is resolved to be lenient and he does not bless:`,
);
patch(
  mb,
  "mishnah-berurah",
  4,
  "ד",
  `(21) And it is forbidden to answer Amen after him — for he is not better than a child who mentions the Name through his learning, who did not transgress a prohibition in his mention, and nevertheless one does not answer Amen after him, for there is no berachah upon him — all the more so this one, who transgressed a prohibition by uttering the Name of Heaven for naught [Gra]:`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `<b>After.</b> Taz: and similarly in Magen Avraham ot 2 and Beit Yosef; and one could say further: the two berachot "Yishtabach" are considered as one, and likewise Hallel — it could have been thus, as with the berachah of the Torah. Not so "Boneh Yerushalayim," for they are separate berachot — "HaZan et HaAretz" and Beit Yosef and Bach on this. And see Levush who wrote to interrupt between d'oraisa berachot and d'rabbanan ones:`,
);
patch(
  pm,
  "peri-megadim",
  2,
  "_",
  `<b>Obligated.</b> Taz wrote this to exclude Bach, who explained that the Tur also holds there is obligation for Israel; only for a non-Jew there is no obligation — even if he heard the entire berachah, he may answer if he wishes, and there is no obligation — see there. But Beit Yosef explained as the Taz says here, and it appears that after a non-Jew there is no obligation but only permission; and I will explain further in ot 3. B'Tzel Dekel, parashat Ha'azinu, and in the word gimel — a novella of the Ramban: Amen on the berachah of the Torah and in Birkat HaMazon and an aspect of three from the Torah — see there and in Magen Avraham here:`,
);
patch(
  pm,
  "peri-megadim",
  3,
  "_",
  `<b>And they answer.</b> Taz, Berachot 49b: in the Mishnah they answer after Israel and not after a Samaritan until he hears the entire berachah; and in the Yerushalmi — a non-Jew, they answer after him, and that is even if he did not hear the entire berachah. For in hearing, even from a Samaritan... The Mechaber wrote a Samaritan one does not answer — that is after they decreed. And it implies a non-Jew too — if he heard the entire berachah, one does not answer. And see Rambam, chapter 1 of Hilchot Berachot 13 — see there; and Ra'avad emended: a non-Jew, they answer if he heard the entire berachah, and he is preferable to a Samaritan (for they made them like a non-Jew for degradation, not for elevation — Beit Yosef). Nevertheless in the Yerushalmi it appears that even without hearing all of it they answer for a non-Jew — Bach; and therefore the Taz explained that the plain meaning of the Mishnah implies a non-Jew is not equal to Israel — for otherwise it would have included them together. And this is what it says: but otherwise it would have said "one answers Amen after a non-Jew and not after a Samaritan unless he heard the entire berachah" — from which it implies a non-Jew, no. And that which it did not include them with a Samaritan — it need not, for all the more so he is more than a Samaritan; even before they decreed, the Samaritan was more suspected, for a non-Jew is not accustomed to this — Beit Yosef. And in our novellae I expanded, and here there is no need to expand. Levush wrote in siman 213: it is a great mitzvah to answer Amen from the mouth of a minor bar chinuch; and I have a doubt on this for Tosafot in Megillah, and we hold in Kiddushin 29b that a minor blesses for his father even though it is only d'rabbanan; and Levush there wrote: when a minor ate — all the more so, so there should not be two d'rabbanan matters; and in Magen Avraham Kiddushin 29... and it requires study. And see Taz 7 in the name of Lechem Rav, who also wrote there is a doubt whether it is a great mitzvah in the berachah of a minor, and I have a doubt why — and it requires study:`,
);

patch(
  rae,
  "rabbi-akiva-eiger",
  1,
  "_",
  `Magen Avraham sk 6 — and the Rambam's view that it is d'oraisa — see in Kessef Mishneh chapter 3 of Hilchot Milah halachah 6; and in responsum Kol Eliyahu siman 7:`,
);
patch(
  rae,
  "rabbi-akiva-eiger",
  2,
  "_",
  `There. And there is a difficulty on this — see in Even HaEzer above siman 212 and investigate (Gloss of the Beit Yosef):`,
);

patch(
  st,
  "shaarei-teshuvah",
  2,
  "_",
  `<b>Amen.</b> Ba'er Hetev and Levush wrote that one who answers Amen is greater than the blesser, and they challenged him from what Rav said: "grab and bless"; and see in the light in Shach Choshen Mishpat siman 589 and in Pri Megadim, Orach Chaim siman 57, and in responsa at the end of Sefer Sha'ar Yosef siman 7, who brought Maharitbaz like the Shach; and see in Birkei Yosef on this:`,
);
patch(
  st,
  "shaarei-teshuvah",
  4,
  "_",
  `<b>At the time.</b> When he learns — Ba'er Hetev; and in She'elat Ya'avetz siman 81 he wrote: if there is a mention in the middle of the nature of a berachah written in the Talmud, he may say it with the Name. And in Birkei Yosef he wrote: elderly rabbis in the land of Israel practiced not to mention the Name in their reading; and likewise in Machatzit HaShekel, for thus wrote Tashbatz Katan in the name of Maharam — and I do not read the four-letter Name of Hashem in the Talmud, only "Hashem," end quote. And see further in She'elat Ya'avetz there, who wrote: when reading in the Talmud and in the rest of the words of Chazal and in the verses of their written teachings — he reads as is customary in Scripture for the mentions when he reads them; and he wrote that thus practiced his father, the Chassid, may his memory be blessed:`,
);

patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `<b>After the berachah "Boneh Yerushalayim."</b> For it is the end of berachot that are from the Torah; and "HaTov VeHaMeitiv" is d'rabbanan:`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "א",
  `<b>Obligated to answer Amen.</b> Thus said the Rambam — to exclude what the Tur said initially, "they answer" — meaning, not an obligation but teaching that one does not answer after a Samaritan; and the Mishnah is the Tur's source, which says they answer after Israel; and on this the Tur said afterward. But the Rambam wrote etc. — meaning he argues on what was said initially: for Israel there is no obligation to answer when one did not hear the entire berachah from his mouth; but the Rambam establishes obligation also in this:`,
);
patch(
  tz,
  "turei-zahav",
  2,
  "ב",
  `<b>And they answer Amen after a non-Jew.</b> This is from the Yerushalmi that the Rosh brought, and he wrote the reason: because the way of a non-Jew is not to intend for idolatry when he mentions the Name — meaning, to exclude a Samaritan, for if he mentions the Name his intention is for Mount Gerizim; and similarly Rabbenu Yitzchak in the name of the Yerushalmi. And I say Amen after all blessers, as it is said "blessed be you of all nations" (Shoftim 5:24). And in Rambam that was before Beit Yosef, non-Jew is written similar to Samaritan; and he wrote in Kessef Mishneh that in the Tur's manuscript in Rambam it is not written regarding a non-Jew a prohibition but specifically Samaritan — and that is correct; and therefore the Rama ruled like him, and it is correct since we do not find our Talmud differing — we certainly follow the Yerushalmi, except that he decided specifically when he heard all the berachot from him; and this is at least to distinguish between non-Jew and Israel. And furthermore it appears to distinguish that for a non-Jew there is no obligation — only that there is no prohibition to answer after him he is saying; and as the Tur wanted to explain initially regarding Israel. And this is proven from the Mishnah: "one answers Amen after Israel" etc., and it did not cite non-Jew — only that there is at least a distinction between them; and that is in the ways I wrote:`,
);

const PATCH_COUNT = 30;
console.log(`ok siman 215 part 3/3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-215-part3of3.json",
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
