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

const az = "output/siman_207/ateret-zekenim/part-001.txt";
const bh = "output/siman_207/baer-heitev/part-001.txt";
const bhg = "output/siman_207/beer-hagolah/part-001.txt";
const gra = "output/siman_207/beur-hagra/part-001.txt";
const er = "output/siman_207/eliyah-rabbah/part-001.txt";
const kh = "output/siman_207/kaf-hachayyim/part-001.txt";
const mh = "output/siman_207/machatzit-hashekel/part-001.txt";
const ma = "output/siman_207/magen-avraham/part-001.txt";
const mc = "output/siman_207/mechaber/part-001.txt";
const mb = "output/siman_207/mishnah-berurah/part-001.txt";
const pm = "output/siman_207/peri-megadim/part-001.txt";
const st = "output/siman_207/shaarei-teshuvah/part-001.txt";
const tz = "output/siman_207/turei-zahav/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `After-blessing, etc. One should say "al kol mah shebara" without the vav, and not "ve'al kol mah shebara" — and so it is written in all the books, and so it is in the Gemara chapter 35; and what Tosafot said is not the text of the blessing. And likewise in the Ashkenazi rite it is very precise that he wrote only "al kol," and the vav is a scribal error (Maharshal, my teacher, in Bach). One who forgot to bless the after-blessing until he relieved himself should precede with the blessing Asher Yatzar (Maharshal in responsum siman 90).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `<b>These.</b> The same law applies if he ate and drank me'ein shalosh. If he is in doubt whether he ate a k'zayit of fruits within kedei achilat pras — in Halakot Gedolot chapter 2 siman 313 he ruled that he blesses Borei Nefashot, and Yad Aharon disagrees and ruled that he should not bless.`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `<b>Chay ha'olamim.</b> The text of the blessing: "Blessed are You, Hashem our God, King of the universe, Who creates many souls and their needs, for everything that You created to sustain in them the soul of every living being — blessed is the Life of the worlds." "Chay" is pointed with tzeirei because it is connected [to "ha'olamim"], and so wrote Tosafot at the end of Tamid. (And in Eliyahu Rabbah he testified that he heard that he retracted, and so he wrote in siman (57) [54].)`,
);

patch(bhg, "beer-hagolah", 1, "א", `Berachot 44.`);
patch(
  bhg,
  "beer-hagolah",
  1,
  "ב",
  `R' Yerucham in the name of the responsum of Rashba, and the students of R' Yonah in the name of Rambam.`,
);

patch(gra, "beur-hagra", 1, "א", `<b>1. Outside, etc.</b> As written at the beginning of siman 204.`);
patch(gra, "beur-hagra", 1, "ב", `<b>And so, etc.</b> See Tosafot there, and as above.`);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>And if he ate, etc.</b> As in the first blessing, as written in his words — except when their blessings are equal; and so in the remazim and in Aruch on Magen Avraham 1 s.v. "bevirkoteihan," etc.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ד",
  `<b>And the blessing, etc.</b> See Tosafot 37a s.v. "Borei," etc., and in Yerushalmi he concludes "Baruch Atah Hashem chay ha'olamim," and so too Rosh — but Teshurat HaRi wrote that since in our Gemara it was not mentioned, one should conclude without the Name; and the view of Rosh is essential, and so in Rokeach. And see in Tur and Magen Avraham the text, etc., and what he said to say "shebarata" in the second person — it does not exist; rather the essential [form] is to say "shebara." And so is the language of the Gemara there 37a, and so in Rosh chapter 6 siman 8 and in the remazim there, and so in Bahir. And what is written in Eiruvin 14b "shebarata" is a scribal error, for the Gemara brings there a mishnah from Berachot 44a, and in that conclusion of the words of R' Tarfon there is only "vechisronam" and not "al kol"; and what Magen Avraham wrote in the name of Tosafot at the end of Tamid to say "chay" with tzeirei — so is essential.`,
);

patch(
  er,
  "eliyah-rabbah",
  1,
  "_",
  `(1) <b>[Levush] "Al kol," etc.</b> "[Al] kol mah shebarata" in the second person and not "[al] kol mah shebara" — (so write the codices) — and Magen Avraham; and so wrote Beit Yosef in the name of Teshurat HaRi, and so wrote Kolbo and Tzedah LaDerech and Avnei Nezer siman 190. And what Levush wrote "al kol," etc. — Rashal and Bach agreed on "al" without the vav; but in Maadanei Melech page 46 he wrote in the name of Tosafot that one must say "ve'al kol" with the vav, and concludes — and this is his language: and so it appears, and so is it in Tur and Teshurat HaRi — end of his language. In my humble opinion he did not examine carefully, for in the ancient text of the blessing they established "al" without the vav; only what he wrote at the end "ve'al" with the vav is their language, and they mean to say "and this 'al kol,' etc." And so I found explicitly in Kolbo page 19 in the name of Tosafot of Rabbeinu Yonah, and so explained Bach the words of Tosafot — and so is essential; and see siman 210 seif 2. And Lechem Chamudot and Malbushei Yom Tov wrote that one must say "chay ha'olamim" with tzeirei under the chet — and I already wrote in siman 57 that I heard he retracted.`,
);

patch(
  kh,
  "kaf-hachayyim",
  1,
  "_",
  `(1) <b>[Seif 1] Tree fruits except the five species, etc.</b> Borei Nefashot, etc. And if he ate apples and the like and afterward blessed on the tree — b'dieved he has fulfilled. And proof from what is written below siman 208 seif 13: if he ate from the seven species and apples, for he need not bless Borei Nefashot since they also fall under me'ein shalosh — see there. Birkei Yosef in She'eilot uTeshuvot letter 1 and in his book Mechaber letter 1. Maamar Mordekhai siman 208 letter 28. Sha'arei Teshuvah on this siman letter 1.`,
);

patch(
  mh,
  "machatzit-hashekel",
  1,
  "א",
  `<b>Magen Avraham, the text, etc.</b> He explains the text — see Taz; and likewise why they conclude without the Name — and he speaks from the words of Tur.`,
);
patch(
  mh,
  "machatzit-hashekel",
  1,
  "ב",
  `<b>The chet is pointed with tzeirei.</b> And see in the book Eliyahu Rabbah siman 54 that he wrote: I heard from a trustworthy man that the gaon Tosafot Yom Tov retracted and would say it with patach — end of his words.`,
);

patch(
  ma,
  "magen-avraham",
  1,
  "_",
  `The text of the blessing: "Blessed are You, Hashem our God, King of the universe, Who creates many souls and their needs, for everything that You created to sustain in them the soul of every living being — blessed is the Life of the worlds." And so in the codices to say "shebarata" in the second person. "Chay ha'olamim" — the chet is pointed with tzeirei because it is connected, and so in Tosafot at the end of Tamid. <b>One blessing.</b> The same law applies if he ate and drank.`,
);

patch(
  mc,
  "mechaber",
  1,
  "main",
  `<b>The law of the after-blessing on fruits. And it contains one seif:</b> (1) Tree fruits except the five species, and all ground fruits and vegetables (2) and everything whose growth is not from the earth — their after-blessing (3) is Borei Nefashot Rabot. And if he ate from all these species, from these he blesses (4) after all of them one blessing (5). And this blessing he concludes without the Name — that he conclude thus: Baruch chay ha'olamim.`,
);

patch(
  mb,
  "mishnah-berurah",
  1,
  "א",
  `(א) Tree fruits, etc. — And b'dieved, if he blessed on them "on the tree" and "on the fruit of the tree," he has fulfilled [Sha'arei Teshuvah].`,
);
patch(mb, "mishnah-berurah", 1, "ב", `(ב) And everything, etc. — A general rule in this: even water.`);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ג",
  `(ג) Borei Nefashot Rabot — The text of the blessing: "Blessed are You, Hashem our God, King of the universe, Who creates many souls and their needs, for everything that You created to sustain in them the soul of every living being — blessed is the Life of the worlds." And the chet is pointed with tzeirei because it is connected. And some say "shebarata," and it is a river that flows and its plain meaning [is as explained in poskim].`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ד",
  `(ד) After all of them, etc. — Meaning that he need not bless Borei Nefashot on each one individually, for it applies to all of them; and even if he ate and drank, he fulfills with one blessing. And if both together combine for the measure — see below siman 210 in Mishna Berurah. If he is in doubt whether he ate a k'zayit within kedei achilat pras, he need not bless Borei Nefashot.`,
);
patch(
  mb,
  "mishnah-berurah",
  1,
  "ה",
  `(ה) He concludes it without the Name — Some say that it is a long coin [form], and some say they enacted in it a short coin without a signature; therefore it is good that he conclude, but without the Name. And the view of the Gra is to conclude in it with the Name, as mentioned in Yerushalmi; nevertheless the world did not practice thus [Magen Giborim]. And the explanation of Borei Nefashot is explained in Tur: he gives Him, may He be blessed, praise for having created necessary things such as bread, and useful things even though they are not necessary such as fruits — on the necessary ones he says "vechisronam," and on all the rest he says "al kol mah shebara lehachayot," etc.`,
);

patch(
  pm,
  "peri-megadim",
  1,
  "_",
  `<b>Berachot.</b> Taz, Berachot 37a, in Tosafot s.v. "Borei" — see there. It appears at first glance that one who concludes "Baruch Atah Hashem chay ha'olamim" holds there are two blessings: they bless on that He created souls and their needs, and on what He created for enjoyment to sustain and to refresh the soul — they also bless "Baruch Atah Hashem chay ha'olamim." And one who does not conclude holds it is one blessing, and "vechisronam" is placed on "al kol mah shebarata," etc. — see the poskim; and there is no decisive ruling — one may read "bara" or "barata," and we hold: whoever changes from the coin that the Sages coined does not fulfill — where they said to extend he may not shorten, and to shorten he may not extend; that is, to conclude or not to conclude. But we rule in our Gemara, and nevertheless we conclude "Baruch" without the Name — then there is no stringency and it is not such a change, since he did not mention the Name it is not a conclusion. And practical difference: all blessings where they said not to conclude — if he concluded without the Name he has fulfilled and it is not a change from the coin the Sages coined, as we see here.`,
);

patch(
  st,
  "shaarei-teshuvah",
  1,
  "א",
  `<b>These.</b> Ba'er Heitev — and see in She'urei Berachah that he wrote: if he blessed on apples and the like the after-blessing "on the tree" and "on the fruit of the tree," he has fulfilled b'dieved; and proof from below siman 208 seif 13, etc. And there he brought the words of Rama in Alfasi Zuta: if he blessed the first blessing "on the tree" and "on the fruit of the tree" even before ordinary tree fruits that are not of the seven species — he has fulfilled. And in She'urei Berachah there he wrote that his words appear correct if he said only "on the tree" and "on the fruit of the tree"; but if he said the entire blessing in its full conclusion there is room to be in doubt — see there. And see in the name of Rama that his view is that if he blessed on water the first blessing Borei Nefashot he has not fulfilled — therefore he called them blessings of Borei Nefashot and not "nothing"; but in Beit Yosef siman 204 he wrote an incident of one who blessed first Borei Nefashot and afterward said shehakol, and brought there the words of Be'er Sheva and Eliyahu Rabbah regarding the blessing on Torah, and his view is that he need not return to bless neither the first nor the last; nevertheless he wrote that one must settle the matter for practice. And it appears that if he already ate or drank and blessed shehakol as an after-blessing — he should take fruit or water and bless before them properly, and afterward bless the after-blessing and intend to exempt the first eating or drinking as well, to remove himself from doubt; and see Radbaz siman 299 and siman 380. And if he blessed on bread "borei minei mezonot" — the view of Rama is that he has fulfilled; and in She'urei Berachah he brought in the name of R' Asher bar R' Chaim in Sefer HaPardes [manuscript] that he wrote that Ritva said he has not fulfilled, and so is the view of my teacher the Ra'ah; and likewise if he blessed on rice bread and "hamotzi" — he has not fulfilled — see there. And see there what he wrote the reason: since it became bread it is not called fruit at all but either bread or food. And if he blessed on bread "borei minei mezonot" — he has fulfilled — see there; and see above siman 167 and below siman 208.`,
);

patch(
  st,
  "shaarei-teshuvah",
  1,
  "ב",
  `<b>Chay</b> ha'olamim. See Ba'er Heitev; and see She'elat Ya'avetz that his view is also to say it with patach; and see in R' Yosef [Chayim] that he brought there the words of Mahari Chagiz in Sefer Etz Chaim at the end of Tamid, and at the end of his words he wrote that in the responsum of Mahari Ariel [manuscript] he wrote that one who says it with patach — according to grammar — is not mistaken — see there.`,
);

patch(
  tz,
  "turei-zahav",
  1,
  "_",
  `<b>Baruch chay ha'olamim.</b> The reason is that in our Gemara there is no conclusion at all, and in Yerushalmi there is "Baruch Atah Hashem chay ha'olamim" — therefore we conclude without the Name. And the explanation of Borei Nefashot is explained in Tur: he gives praise to Him, may He be blessed, for having created necessary things such as bread, and useful things even though they are not necessary such as fruits — on the necessary ones he says "vechisronam," and on the rest he says "al kol mah shebara lehachayot," etc.`,
);

const PATCH_COUNT = 24;
console.log(`ok siman 207 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(OC_ROOT, "pipeline/work/editorial-queue-siman-207.json");
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
