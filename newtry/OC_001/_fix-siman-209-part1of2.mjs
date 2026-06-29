import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { biurHalacha2, chokhmatShlomo1 } from "./pipeline/work/_siman-209-p1-long-en.mjs";

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

const az = "output/siman_209/ateret-zekenim/part-001.txt";
const bh = "output/siman_209/baer-heitev/part-001.txt";
const bhg = "output/siman_209/beer-hagolah/part-001.txt";
const gra = "output/siman_209/beur-hagra/part-001.txt";
const bhc = "output/siman_209/biur-halacha/part-001.txt";
const csf = "output/siman_209/chatam-sofer/part-001.txt";
const cs = "output/siman_209/chokhmat-shlomo/part-001.txt";
const dm = "output/siman_209/dagul-merevavah/part-001.txt";
const er = "output/siman_209/eliyah-rabbah/part-001.txt";
const kh = "output/siman_209/kaf-hachayyim/part-001.txt";
const mh = "output/siman_209/machatzit-hashekel/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `He took a cup of beer, etc. — and likewise the law if ground fruit was before him and he began the blessing intending to say borei peri haAdamah and erred and said borei peri haEtz: he does not return and bless, because when he mentioned the Name and kingship, which are the essence of the blessing, he intended only the fitting blessing; and likewise for a dish of grain and bread (so too Rambam in chapter 8). They challenged him and he answered the sages of Lunel that it is not so except for beer that comes from the vine; but for beer of barley it is obvious he has not fulfilled his obligation, and so ruled Baal HaMaor explicitly, and so is the view of Rashi and Rif and Rosh and most geonim that he has not fulfilled and must return and bless.`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>The species.</b> The conclusion of all acharonim is that we do not follow his intent if he said improperly — see their words.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>He has fulfilled.</b> He wrote in the language of "some say" because according to Rambam, who holds one view, he has not fulfilled because his intent was to say improperly, and so too Kessef Mishneh; but the main ruling is that he has fulfilled, as above. One who was reciting Birkat HaShachar and when he reached the blessing pokeach ivrim erred and said malbish arumim and returned within k'dei dibur and said pokeach ivrim — uncertain if he fulfilled porei ha'or; but if he intended malbish arumim he fulfilled me'ein sheva. Magen Avraham — see what Panim Me'irot wrote in siman 58. One who was making havdalah and after the wine blessing said borei meorei ha'esh and remembered and concluded borei minei besamim — he has fulfilled; however he must return and bless borei meorei ha'esh, Mishpat Tzedek like Kenesset HaGedolah. Magen Avraham wrote: specifically when at the time of the blessing he intended for the spices; but when he intended for the fire he fulfilled regarding fire and blesses afterward on the spices as above — see Magen Avraham that there is a textual error in his words.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `<b>Borei peri haGefen.</b> And this discusses when he knew it was water and only erred in speech; but if he thought it was wine and said borei peri haGefen and concluded shehakol — he has not fulfilled. Magen Avraham — see there.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `<b>Within k'dei dibur.</b> It implies that after k'dei dibur he must return and bless — Mahari Levi siman 47, Leket Yosher vol. 2 siman 149; and in Ginat Veradim klal 1 siman 19 he wrote he need not return and bless — see Magen Avraham and Yad Aharon.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ג",
  `<b>They drink.</b> It appears here that three things are required — others drink, and his intent, etc.; but in Darkei Moshe it appears that if his intent was to drink other wine even without others with him he need not bless, and specifically if he did not interrupt until he drank wine; and if his intent was not to drink other wine he must bless, and the others for whom wine was before them fulfill through his blessing even though it was a berachah levatallah — see Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  3,
  "_",
  `<b>Of Torah.</b> And in Tur he wrote that even me'ein shalosh on the seven species is d'oraisa; therefore one who is uncertain should eat more of that species and bless and fulfill also regarding his uncertainty. Taz — see Leket Yosher vol. 1 siman 143.`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 12, per Rambam chapter 8 Laws of Blessings.`);
patch(bhg, "beer-hagolah", 1, "ב", `Rashi and Tosafot there, and other poskim.`);
patch(bhg, "beer-hagolah", 2, "_", `Rif, per explanation of Rosh, and so Mordekhai in the name of Rambam.`);
patch(bhg, "beer-hagolah", 3, "_", `Rambam there.`);

patch(
  gra,
  "beur-hagra",
  1,
  "א",
  `<b>Seif 1, he took, etc.</b> Rambam and explained per Rashi's explanation, and learned from this that the same applies to the reverse, and the question is lenient; nevertheless it requires study why he omitted the main law, and also one could explain this; and already Raavad and others challenged, and see chapter 1 of five [units of] Keriat Shema that it is very strained.`,
);
patch(gra, "beur-hagra", 1, "ב", `<b>Or, etc.</b> To exclude Rambam's responsum and Magen Avraham.`);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>And some say, etc.</b> Gemara there per Rashi's explanation, and the question is lenient as Rif wrote.`,
);
patch(gra, "beur-hagra", 1, "ד", `<b>And all the more so, etc.</b> Gemara there.`);
patch(gra, "beur-hagra", 2, "א", `<b>Seif 2, he took, etc.</b> Per Rif and per Rosh there.`);
patch(
  gra,
  "beur-hagra",
  2,
  "ב",
  `<b>And within k'dei dibur.</b> Tosafot there s.v. lav, etc., and likewise for Rif — certainly after k'dei dibur it is nothing and there is no distinction between Rif and Tosafot except that for Tosafot specifically when he knows it is Yom Tov — then the beginning of his blessing was proper per their view that they explain stringently; but for Rif it is not required.`,
);
patch(gra, "beur-hagra", 2, "ג", `<b>And if, etc.</b> Per view of Rabbenu Tam in siman 206 seif 6 — see Magen Avraham.`);
patch(
  gra,
  "beur-hagra",
  3,
  "_",
  `<b>Seif 3, all, etc.</b> That all blessings are d'rabbanan except Birkat HaMazon, as written chapter 1 law 1; and further we learned, etc., and there doubt, etc., and Tosafot 35a s.v. ela, etc., and s.v. lefanav, etc., except there 40 that me'ein shalosh is d'oraisa, and so there 44a, and Rashba; but Rambam's view is that all this is asmakhta, since initially he had to strain to learn from "kama" and "kerem," and likewise the baraita that derives from "kodesh chagigot" — from which we learn there is no d'oraisa in the seven species.`,
);

patch(bhc, "biur-halacha", 2, "_", biurHalacha2);

patch(
  csf,
  "chatam-sofer",
  1,
  "_",
  `Seif 3, all the blessings. See in She'eltot of R' Acha Gaon parashat Yitro siman 52 who holds that me'ein shalosh is d'oraisa; and see in She'ilta deShalom who expanded on this law and brings more poskim who hold thus — see there [from the Gaon, may his merit shield us].`,
);

patch(cs, "chokhmat-shlomo", 1, "_", chokhmatShlomo1);

patch(
  dm,
  "dagul-merevavah",
  1,
  "_",
  `And it is not comparable to a cup of beer, for there the cup is in his hand and his thought is evident.`,
);
patch(dm, "dagul-merevavah", 2, "_", `Here too it discusses that the spices are in his hand, as above.`);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>[Levush] The same law when he concluded in drinking, etc.</b> And he thought it was wine, etc. It is difficult: below siman 487 he wrote after he knows it is Yom Tov — it implies if he did not know he has not fulfilled. Granted regarding Shulchan Aruch one may say it discusses likewise that he knew it was wine but erred in speech, and so explained Magen Avraham and so I found in Prisha; but on Levush it is astonishing, and more astonishing on them that they did not notice this difficulty. And further I wonder: if Shulchan Aruch discusses with knowledge it is difficult — behold an a fortiori from the first part regarding water, that he opened intending to say shehakol and concluded borei peri haGefen that he has fulfilled; all the more so if he corrects within k'dei dibur and says shehakol he has fulfilled — but certainly Shulchan Aruch also discusses without knowledge. And what Magen Avraham challenged, that he should have written in the name of "some say," is not difficult at all, for it refers above to "some say" that if he took, etc. And the main difficulty from siman 487 — one may say he holds regarding prayer to be stricter than blessings, for a doubt we rule leniently because of berachah levatallah, which is not so in prayer. Further one may say Shulchan Aruch there used a settled term for what all agree on — with knowledge and without knowledge he relied here; or he used Tosafot's language in Berachot daf 13 who wrote thus even for R' Yehudah who is strict, but in truth for us he has fulfilled even if he did not know. With this the astonishment of Maadanei Melech daf 9 is well resolved, in what Rosh challenges Rashi from opening in Yotzer Or — see there; it appears to me one may explain the baraita with knowledge who erred in speech, that even for R' Yehudah who is strict per Rashi's explanation he admits in this — think well.`,
);
patch(
  er,
  "eliyah-rabbah",
  2,
  "_",
  `(2) <b>[Levush] And some say further, etc., or water, etc.</b> Bach and acharonim wrote that specifically regarding beer that comes from the vine; but regarding beer of barley it is obvious he has not fulfilled — and if so, all the more so regarding water he has not fulfilled — see there. And Rambam chapter 8 of Laws of Blessings wrote that the same law applies if ground fruits were before him and he began the blessing intending to say borei peri haAdamah and erred and said borei peri haEtz — we do not make him repeat; and likewise if a dish of grain was before him and he opened intending to say borei minei mezonot and erred and said haMotzi — he has fulfilled, until here. And the reason he wrote in Lechem Mishneh: the conclusion of the blessing is not a lie — for beer from the vine is [called such], and likewise for ground fruits "fruit of the tree" is called thus, for according to R' Yehudah wheat is a species of tree; and likewise for a dish of grain it is not a lie when he said haMotzi, for grain is called bread; but if the conclusion of the blessing is a lie he has not fulfilled. Mishpat Tzedek wrote: one who after the wine blessing says borei meorei ha'esh and remembers and concludes on spices must return and bless borei meorei ha'esh and not on spices, since at the time of the blessing he directed toward spices; but when he intended for fire he has fulfilled and blesses afterward on spices.`,
);
patch(
  er,
  "eliyah-rabbah",
  3,
  "_",
  `(3) <b>[Levush] Since he blessed, etc.</b> In Darkei Moshe it is explained that even though the blessing was not to exempt others, if he intended to drink from it he need not return and bless when he drinks; and the same law when he did not intend to drink if it was to exempt others. And see in seif 7 what he expanded wondering on Beit Yosef and Rama who did not mention that Maharai disagrees — it is not difficult, for Maharai discusses when he did not intend to drink; and one may wonder on him, for at the end of siman 471 it is explained as his own words — Maharai discusses thus — and see siman 206 sk 10. Aruchat Chayim wrote an incident where one blessed Birkat HaMazon on a cup of water and thought it was wine; there was no cup before those reclining and only a pitcher remained, and they ruled he must bless borei peri haGefen if he wants to drink wine afterward, after saying Baruch shem kevod malchuto le'olam va'ed on the berachah levatallah, for neither he nor they intended to drink except from this cup — until here; and see above siman 182 sk 9, and it requires study.`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) [Seif 1] He took a cup of beer or of water, etc. This is from Rambam chapter 8 Laws of Blessings; there it is written only "a cup of beer," and Maran added "or of water." However, on the main law Raavad there disagrees and wrote we follow only what he uttered with his mouth. And so Bach: the view of Rashi and Rif and Rosh and Rashba and most geonim is he has not fulfilled and must return and bless — and so Taz sk 1. Magen Avraham sk 1, Be'er Heitev letter 2, and letter 1 — therefore, since there is a dispute and it requires study, safek berachot lehakel: if he remembered within k'dei dibur after saying borei peri haGefen, one may also say shehakol nihyeh bidvaro — with this he fulfills according to most poskim, as written in seif 2; and if he did not remember within k'dei dibur he should bless the entire blessing properly in his heart.`,
);
patch(
  kh,
  "kaf-hachayyim",
  2,
  "_",
  `(2) There — Rambam wrote: and likewise if ground fruits were before him and he began the blessing intending to say borei peri haAdamah and erred and said borei peri haEtz — we do not make him repeat. And likewise if a dish of grain was before him and he opened intending to say borei minei mezonot and erred and said haMotzi — he has fulfilled, because when he mentioned the Name and kingship, which are the essence of the blessing, he intended only the blessing fitting for that species — end of his words. And the reason he wrote there in Lechem Mishneh: even though this is not the proper blessing for it, it is not a lie, for ground fruits are called fruit of the tree, as written in chapter 2 of Kessef Mishneh that for R' Yehudah wheat is a species of tree; and likewise for a dish of grain when he said haMotzi it is not a lie, for grain is called bread; but if he says a lie he has not fulfilled — see end of his words. And they brought this in Be'er Heitev letter 2 and in Aleph HaChayim letter 1, who wrote that also in these disputes we make him repeat — see end of his words. However, we already wrote in the previous letter: since there is a dispute, if he remembered within k'dei dibur he should also finish the conclusion of the blessing required for that food; and if he did not remember within k'dei dibur he should return and bless that blessing properly in his heart.`,
);
patch(
  kh,
  "kaf-hachayyim",
  3,
  "_",
  `(3) There — "some say" that if he took, etc. He wrote in the language of "some say" because according to Rambam he has not fulfilled because his intent was to say improperly, and so he wrote in Kessef Mishneh chapter 1 of Keriat Shema. Magen Avraham sk 2, and Magen Avraham wrote: but the main point is he has fulfilled. And so Aleph HaChayim letter 2: the main point is he has fulfilled. And so wrote Avodat HaTzedakah letter 1: even though this "some say" appears to contradict his earlier words, nevertheless in both he ruled he does not return, because each explanation has support in the method of the Talmud — safek berachot lehakel — end of his words. And so Nahar Shalom letter 2: Maran's view is to rule leniently in both.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "א",
  `(sk 1) Or, etc. — regarding beer that comes from the vine. And he wrote there on Proverbs "Wine and beer do not drink" — meaning it is not a species of wine but a species of beer made from grape husks and skins or wine lees and the like; and he wrote there: even though generically it is called "shekhar," nevertheless automatically it is understood that the Talmud and Rambam discuss grape beer; for people do not err between barley beer and wine, and certainly he speaks of the present case.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ב",
  `(sk 1) And even per Rashi, etc. — meaning: this law explained in Shulchan Aruch seif 1 and seif 2 is an unresolved question not resolved in Berachot daf 12, and most poskim (except Tosafot) took the question leniently because of safek berachot lehakel. Only Rashi's text was as written in seif 1 in the name of "some say" — the intent was improper and the utterance proper; Rif and Rosh's text: the question was as in seif 2 — the beginning of the conclusion was improper and the end proper; therefore Magen Avraham wrote "and even per Rashi, etc." — meaning: not according to Rif's method, for it is not mentioned at all in the Talmud to follow intent. If so, from where does he write that if the utterance was improper he has fulfilled because his intent was proper — for according to Rif we do not follow intent at all; even per Rashi, where the Talmud was uncertain whether we follow intent — since it was not resolved we rule leniently; therefore if he said improperly and the intent was proper we follow the intent. And this is what Magen Avraham wrote: this too is not so — we need not discuss except where he said properly, etc. — meaning: perhaps to follow intent stringently; but in Rambam's case to follow intent leniently — we have not heard this.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "א",
  `(sk 2) And "some say," etc. He wrote in the language of "some say" — meaning this "some say" which is Rashi's view disagrees with the first law which is Rambam's words, as Magen Avraham wrote in the previous sk; nevertheless, it is not for this reason he wrote "some say" language to say they disagree with law 1 — for if so, "some say" would be that he does not fulfill here except specifically if he took, etc., and opened intending borei peri haGefen and remembered, etc., from the outset; rather one view — Rambam — disagrees with Rashi's law on this.`,
);
patch(
  mh,
  "machatzit-hashekel",
  2,
  "ב",
  `<b>But, etc.</b> As stated in sk 1 — we do not follow intent at all.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "א",
  `(sk 3) He took, etc. — even though he said properly, nevertheless he wrote the language of "some say" that Rambam disagrees and holds we follow intent even though the utterance was proper; all the more so here where Rambam disagreed.`,
);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "ב",
  `<b>But if he thought, etc.</b> Meaning: do not err — Magen Avraham did not prove that Shulchan Aruch discusses that he knew it was water; for if he did not know, Rambam disagrees and he should have written "some say." Heaven forbid that nevertheless for us, who do not hold like Rambam as in sk 1, even if he did not know he has fulfilled — Magen Avraham wrote this is not so: apart from Rambam, without knowledge he has not fulfilled according to many poskim.`,
);

const PATCH_COUNT = 36;
console.log(`ok siman 209 part1of2 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-209-part1of2.json",
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
