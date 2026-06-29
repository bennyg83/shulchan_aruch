#!/usr/bin/env node
/** Build FIXES for siman 219 remaining 134 blocks — auto-fix + manual overrides */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks, plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

/** @type {Record<string, Record<string, string>>} */
export const MANUAL = {
  "beur-hagra/part-001.txt": {
    "7:ב":
      "(ב) In Spain as well. Raavad — and so is the Ramban's view, and as written in Yerushalmi regarding traveler's prayer: R' Shimon bar Ba in the name of R' Chanina — all roads are presumed dangerous; R' Yanai when he would go to an inn they would remove him from his house etc.; and the Ra'ash disagrees and wrote that this was said only regarding traveler's prayer.",
    "7:ג": "(ג) And however etc. — as in traveler's prayer.",
    "7:ד": "(ד) And if etc. — Taz — likewise regarding traveler's prayer.",
    "8:א":
      "(א) Seif 68 for every etc. — as written in Yerushalmi there, R' Chanina son of R' Avahu in the name of R' Yehoshua ben Levi — all sick people are presumed in danger; see in Tosefta Arakhin.",
    "8:ב": "(ב) And there is no distinction etc. — Magen Avraham and so there.",
    "8:ג": "(ג) And some say etc. — Tosafot there and the Ra'ash, and in the dispute mentioned above that holds so.",
    "9:א":
      "(א) Seif 69 these etc. — for behold dangers from animals are because of lion and bandits. There.",
    "9:ב":
      "(ב) And some say etc. — from that it specifies these specifically, and the first version holds that it specifies these because they are more common in most places.",
  },
  "kaf-hachayyim/part-001.txt": {
    "8:_":
      "(8) [There] and one who was ill etc. — a sick person who recovered and doctors assessed that because of the illness he suffered he became a treifah in his internal organs — Petaḥ HaDvir ot 3 raised that he should bless without God's name and kingship — see there.",
    "9:_":
      "(9) Sick person — who recovered during his mourning should bless HaGomel before ten and does not go up to the Torah. Responsum Maharaf part 3 siman 479. Kaf HaChayim Yafeh LaPanim ot 5; Shadich Asudat HaDin laws of mourning ot 52; and it seems if less than three days of mourning remain he should wait until he completes his mourning days and then bless. And see below seif 6. However Who made a miracle for me — one does not bless during mourning days. Shadich there in name of Sefer Chayim BeYad siman 122 — see there.",
    "10:_":
      "(10) If — a bone became stuck in his throat and he was saved — whether he must bless HaGomel was asked on this in responsum Divrei Nehemiah and he concluded that in practice it requires study — see there. And Shadich brought it in Asudat HaDin laws of blessings siman 2 ot 14. And therefore one should bless without God's name and kingship. And so one who fell from a ladder and was concerned from pain of limbs and did not take to bed and was not ill and blessed without mentioning God's name and kingship — Rivash siman 336 and Radbaz part 3 siman 572, Ikkurei HaDin siman 10 ot 52.",
  },
  "machatzit-hashekel/part-001.txt": {
    "1:ב":
      "(ב) [Imprisoned.] Regarding capital matters. And in Sefer Ateret Zekenim thus: from language of Tur — implies even for money matters, unlike Magen Avraham — end quote; and so in Netiv Chayim at length thus: Tur was asked R' Yehuda Gaon why we did not say in order as written in the psalm and he answered that he wanted to list first those more dangerous — yordei hayam and desert travelers are more dangerous than illness for most sick people recover and an imprisoned person is often imprisoned for money and his danger is not so great — end quote; and in Netiv Chayim he wrote had the Magen Avraham not seen Tur's words he would not have filled his heart to disagree — end quote. In my humble opinion the Magen Avraham saw Tur's words and does not disagree with them; and what R' Yehuda Gaon wrote and imprisoned person is often for money — meaning as the Ra'ash wrote in chapter 1 of Bava Batra that whatever nations of the world innovate decrees and afflictions on Israel, even regarding those afflictions of food and drink — they collect all according to money, for their main intent is on money; until here. And if so what R' Yehuda Gaon wrote that imprisoned person is often for money — meaning even when imprisoned for capital matters, nevertheless the main intent of the imprisonment according to the majority was to collect money; and if so since one can strive through money, again there is not so much danger; and in such a case the Magen Avraham also agrees, since the main imprisonment is for capital matters he must bless; and what the Magen Avraham wrote regarding capital matters comes to exclude only if the imprisonment began for money — that they said immediately when seized for money he does not bless; and in this R' Yehuda Gaon also agrees.",
    "8:_":
      "(8) [And so practice and Bach etc.] And so ruled above siman 60 from the words and so ruled etc. — written in error and refers to above seif 5 that wrote in Shulchan Aruch if another blessed etc. and intended to fulfill etc. — implies he holds mitzvot require intention, and on this the Magen Avraham wrote that so ruled the Ravya above siman 60 seif 4 who wrote some say mitzvot do not require intention and some say they require intention and so is the halachah — end quote; behold he decided like those who say mitzvot require intention, unlike the Magen Avraham who challenged that here he states simply that intention is required and above siman 60 he brought two views; but in truth also in siman 60 he decided intention is required; however the Magen Avraham above siman 60 seif kaf gimmel wrote specifically for a d'oraisa mitzvah but for a d'rabbanan mitzvah intention is not required, Radbaz etc.; therefore the Magen Avraham's intent is not to explain the Ravya's words in Shulchan Aruch thus, for here it is rabbinic and nevertheless he ruled intention is required.",
    "9:_":
      "(9) [HaGomel etc.] Regarding siman 218 etc. — meaning specifically if he left the way of the world, others are not called a miracle to bless Who made a miracle for me at the place; and even so some say one does not bless HaGomel since he is not among these four that the Talmud counts.",
    "10:ב":
      "(ב) [And now practice etc.] And Turei Zahav in small seif 5 wrote that for illness and bedridden three days, according to all one must bless, for he needs to request mercy from others as we find Rava in Nedarim chapter Ein Bein HaMudar daf 39.",
  },
  "mishnah-berurah/part-001.txt": {
    "4:א":
      "(א) If another blessed — and although everywhere we hold the listener is like the responder and even without answering amen, as explained in siman 213 — here is different, for the blesser also was not obligated in this blessing but blesses as praise and thanksgiving for his fellow's salvation; therefore whoever did not answer amen did not fulfill [Tur in name of Ra'ash]; but all this is only according to his view that it is permitted to bless as praise and thanksgiving for his fellow's salvation even though not obligated; and see below in Biur Halacha s.v. and there is no etc. and in Sha'ar HaTziyun he wrote another reasoning that since the blesser does not intend to fulfill for him, therefore at least he must answer amen within the time of speech of the blesser — see there. And behold according to this reasoning, ostensibly everywhere too if he answered amen we do not require that he intend to fulfill for him; and in truth this is not so — see end of siman 213; and it is possible here it is preferable especially because it is impossible to intend to fulfill him in this formula, as we wrote in Sha'ar HaTziyun — see there; and in Chiddushei Rabbi Akiva Eiger he wrote another reason that here the law of listener like responder does not apply, for even if he said explicitly himself this blessing formula it would not help, for this blessing is said facing the one saved and is relevant only to a stranger thanking for his fellow's good; and therefore we require that he answer amen on his fellow's blessing — if so at least he also acknowledges God for bestowing good upon him; but without this it does not help at all — and this is very correct.",
    "9:ב":
      "(ב) All of them need etc. — and nevertheless when he reaches the place where the miracle was done he also blesses Who made a miracle for me at this place; and see in siman 218 seif 9 where there is a dispute whether he blesses Who made a miracle for me when saved through natural means [Magen Avraham].",
  },
  "peri-megadim/part-001.txt": {
    "2:ב":
      "(ב) [And know] At first it was difficult to me, for R' Yehuda HaChasid also holds b'dieved he does not fulfill with fewer than ten; and the Gemara's challenge and Rav Yehuda stood there — how did he fulfill, not so for those who hold b'dieved he fulfills — if so what is the challenge, and perforce on them how did they bless with fewer than ten — if so for those who hold he fulfills, there is also a stringency that another also does not bless with fewer than ten, and it was settled for me that the challenge is from Rav Yehuda who should not have intended to fulfill with amen even though b'dieved he answers amen, for it is an obligation as in siman 206 seif 2; nevertheless he should not have needed to intend to fulfill, for l'chatchila ten are required; and from here it is proven that the listener must intend; but the blesser seems that even though he did not intend, since they did not know this that he exempted them, as seems there in the Gemara — see there I saw again in Ateret Zekenim ot 9-10 he noted this. And Magen Avraham ot 4 on this.",
  },
  "rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "(1) [Magen Avraham seif 1] for his father's sin. See responsum called Lechem Todah that R' Yeshaya of Osman composed siman 5, that he raised a minor blesses.",
  },
  "turei-zahav/part-001.txt": {
    "4:א":
      "(א) [Blessed is the Merciful One King etc.] In Rabbenu Yonah it is written Blessed is Hashem King etc.; and he wrote further there, and it seems they can say it even with fewer than ten — end quote.",
  },
};

function autoFix(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ")
    .replace(/\bLord our God\b/g, "Hashem our God")
    .replace(/\bLord\b/g, "Hashem")
    .replace(/\bGod's\b/g, "Hashem's")
    .replace(/\bGod\b/g, "Hashem");
  const mk = String(marker ?? "_").trim();
  if (/^[א-ת]$/.test(mk)) {
    const head = t.slice(0, 14);
    if (!head.includes(`(${mk})`)) {
      t = t.replace(/^\(\d+\)\s*/, "");
      t = t.replace(/^\[[^\]]+\]\s*/, "");
      if (!t.slice(0, 12).includes(`(${mk})`)) t = `(${mk}) ${t}`;
    }
  }
  return t;
}

function blockKey(seif, marker) {
  return `${seif}:${marker || "_"}`;
}

function main() {
  const done = loadEditorialDoneIds(path.join(__dirname, "work"));
  const all = collectEditorialBlocks(OUT, 219, "all", "warn", done);
  const FIXES = {};
  for (const it of all) {
    const rel = it.file.replace(/^siman_219\//, "");
    const key = blockKey(it.seif, it.marker);
    const fp = path.join(OUT, it.file);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) => String(x.seif) === String(it.seif) && String(x.marker || "_") === String(it.marker || "_")
    );
    let en = MANUAL[rel]?.[key];
    if (!en) en = autoFix(b?.en ?? "", it.marker, b?.he ?? "");
    if (!FIXES[rel]) FIXES[rel] = {};
    FIXES[rel][key] = en;
  }
  const batches = [all.slice(0, 45), all.slice(45, 90), all.slice(90)];
  for (let i = 0; i < batches.length; i++) {
    const batchFixes = {};
    for (const it of batches[i]) {
      const rel = it.file.replace(/^siman_219\//, "");
      const key = blockKey(it.seif, it.marker);
      batchFixes[rel] = batchFixes[rel] || {};
      batchFixes[rel][key] = FIXES[rel][key];
    }
    const n = i + 2;
    const outPath = path.join(__dirname, `_siman219-slot5-batch${n}-data.mjs`);
    const body = `/** worker-slot-5 — siman 219 editorial batch ${n} fixes (${batches[i].length} blocks) */\nexport const FIXES = ${JSON.stringify(batchFixes, null, 2)};\n`;
    fs.writeFileSync(outPath, body, "utf8");
    console.log("wrote", outPath, batches[i].length, "blocks");
  }
  // quality check
  let warn = 0;
  for (const it of all) {
    const rel = it.file.replace(/^siman_219\//, "");
    const key = blockKey(it.seif, it.marker);
    const en = FIXES[rel][key];
    const issues = runBlockQualityChecks({ ...it, en, he: "" });
    const bad = issues.filter((x) => x.severity === "error" || x.severity === "warn");
    if (bad.length) warn++;
  }
  console.log("post-gen blocks with warn+ issues:", warn);
}

main();
