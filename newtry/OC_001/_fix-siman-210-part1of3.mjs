import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { biurHalacha2 } from "./pipeline/work/_siman-210-p1-long-en.mjs";

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

const az = "output/siman_210/ateret-zekenim/part-001.txt";
const bh = "output/siman_210/baer-heitev/part-001.txt";
const bhg = "output/siman_210/beer-hagolah/part-001.txt";
const gra = "output/siman_210/beur-hagra/part-001.txt";
const bhc = "output/siman_210/biur-halacha/part-001.txt";
const csf = "output/siman_210/chatam-sofer/part-001.txt";

patch(
  az,
  "ateret-zekenim",
  1,
  "_",
  `He blesses first, etc. And not as one who says that for less than the required measure he does not bless at all, or as one who says that he blesses shehakol — rather he must bless the special blessing appropriate to it beforehand, even for any amount. Tosafot Berachot 39a s.v. batsar leih shiura, etc., and Tosafot ch. HaYashan 60a s.v. velo birekh lefanav, etc. — see there. Regarding one who tastes the dish, it is implied he need not bless until a revi'it; but if he wanted to bless, he may bless. But Tur wrote one should not bless on it until a revi'it, and likewise here — meaning it is forbidden to bless on it, for since it does not require a blessing it is a blessing in vain (Tur in Bach).`,
);
patch(
  az,
  "ateret-zekenim",
  2,
  "_",
  `And safek berachot, etc. — meaning one may be lenient when there are two opinions; therefore for less than a revi'it, even if he swallows, he need not bless; and if he spat out more than a revi'it, he does not bless (Mahari Mintz).`,
);

patch(
  bh,
  "baer-heitev",
  1,
  "א",
  `(א) <b>From a kezayit.</b> All foods combine for a kezayit; if one ate half a kezayit from the seven species and half a kezayit of something else, he blesses after them borei nefashot rabbot. Kenesset HaGedolah, and Magen Avraham wrote; and it appears to me the same applies to bread and something else. And all beverages combine for a revi'it; but food and drink do not combine — see siman 212; and likewise in Gan HaMelech siman 21. And broth poured over greens combines, for all accompaniments to food are food. And likewise bread soaked in beverage or wine. But meat gravy does not combine, for it is beverage. Magen Avraham. And if one ate a little and returned and ate a little — if he waited more than k'dei akhilat pras they do not combine for an after-blessing. And for drinking see siman 212 seif 6, and above siman 204 regarding drinking the kiddush cup of wine — as written there. If one ate less than the measure and went outside and returned to his place — he must bless again at the outset even on bread, for it does not require an after-blessing and its law is like other things; therefore there is room to study whether if he returned and ate less than the measure they combine, for it is like distraction (hesech ha-da'at); and it appears to me they combine (Magen Avraham). Something that had a kezayit in it and shrank and diminished below the measure — one does not bless after it; and if afterward it swelled again, one properly blesses after it. Gan HaMelech siman 122, and Yad Efraim.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ב",
  `(ב) <b>Revi'it.</b> Taz wrote: hot wine in our countries is not included in this — for even if one did not drink a revi'it he blesses the after-blessing, for we follow the drinking measure for most people. But Magen Avraham in siman 190 sk 4 wrote that even hot wine requires a revi'it measure, for they did not distinguish between one beverage and another — see there; and likewise Rav author of Beit Yaakov siman 57, and he refuted Taz's words there (and likewise ruled in Eliyah Rabbah). The measure of revi'it is an egg and a half: fill a wine vessel and place in it an egg and a half, and what overflows from it is a revi'it. And specifically with wine that is thick on top of the vessel and does not overflow much; but with water it overflows more — therefore do as written in siman 156, see there. (But in Eliyah Rabbah he brings in the name of Maharil and Shelah that one fills even with water — see there.) And Shelah wrote it is nearly two chicken egg shells full. And all measures are gauged with medium eggs. Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ג",
  `(ג) <b>As created.</b> It implies in Chullin 119 that one legume bean is called a beriah even though many grow on one stalk. A small fish is called a beriah. Chavot Yair siman 160.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ד",
  `(ד) <b>The pit.</b> And if he ate what is inside the pit it is called a beriah, for behold he ate what is fit to eat from it; and even if he ate the pit it is not called a beriah in something that is not normally eaten, such as an olive. But with grapes and pomegranates it is customary to eat the pit — see Magen Avraham.`,
);
patch(
  bh,
  "baer-heitev",
  1,
  "ה",
  `(ה) <b>Revi'it.</b> Above siman 190 we wrote: filling his cheeks suffices in a large cup, or even less than that if he drank most of the cup. Taz.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "א",
  `(א) <b>The cooked dish.</b> To know if it needs salt or spices — Rashi; see Magen Avraham in siman 567.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ב",
  `(ב) <b>Until a revi'it.</b> And even to taste from many pots is permitted; however, if his intent is to eat only a little, it is forbidden to do so many times, for this is full eating (Magen Avraham). And see in responsum Chavot Yair siman 160 and Yad Efraim.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ג",
  `(ג) <b>A blessing.</b> Even for any amount.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ד",
  `(ד) <b>And spits out.</b> For pleasure is not called pleasure except inside the stomach; if so, the same applies to swallowing and spitting — Magen Avraham. Room to study regarding those who place grass called tobacco or tutun into a pipe and light it and draw the smoke into their mouths and spit it out — room to study whether it is like taste and spit, which requires no blessing, or perhaps it is like smell, which requires a blessing; a fortiori here, where the body also benefits from it, for many are satiated from it as from eating and drinking — see siman 216 seif 13, Magen Avraham. And see responsum Halakhot Ketanot siman 101 that for tobacco one inhales through the nose — one need not bless on the smell.`,
);
patch(
  bh,
  "baer-heitev",
  2,
  "ה",
  `(ה) <b>To be lenient.</b> Magen Avraham wrote there is no doubt here: if he swallows he blesses even a little — see there; and see Ateret Zekenim.`,
);

patch(bhg, "beer-hagolah", 1, "א", `Tosafot Berachot beginning 31, Rambam ch. 3 Hilchot Berachot, Rosh, and Rashba there.`);
patch(
  bhg,
  "beer-hagolah",
  1,
  "ב",
  `Tosafot there, Rosh, Rashba, and R' Yona to equate Yerushalmi with our Talmud.`,
);
patch(bhg, "beer-hagolah", 1, "ג", `Tosafot in Sukkah 26 and Yoma 79.`);
patch(bhg, "beer-hagolah", 1, "ד", `Rosh in ch. 7 of Berachot.`);
patch(bhg, "beer-hagolah", 2, "א", `There 14 — from the implication of Rif.`);
patch(bhg, "beer-hagolah", 2, "ב", `Rambam ch. 1 Hilchot Berachot.`);
patch(bhg, "beer-hagolah", 2, "ג", `Tosafot in the name of R' Chananel and other poskim.`);

patch(gra, "beur-hagra", 1, "א", `<b>Seif 1, one who eats, etc., whether.</b> As Rambam, and as written above siman 184.`);
patch(gra, "beur-hagra", 1, "ב", `<b>Whether.</b> 39a.`);
patch(
  gra,
  "beur-hagra",
  1,
  "ג",
  `<b>And one who drinks, etc.</b> For the measure of beverages everywhere is a revi'it, as written in several places.`,
);
patch(
  gra,
  "beur-hagra",
  1,
  "ד",
  `<b>He blesses first, etc.</b> Tosafot there, and likewise Rosh; and in the sugya, in the name of Yerushalmi, and they brought Tosafot also in Sukkah ch. 2 and in the last chapter of Yoma.`,
);
patch(gra, "beur-hagra", 1, "ה", `<b>And afterward, etc.</b> Rambam, and as above.`);
patch(gra, "beur-hagra", 1, "ו", `<b>And there are those who doubt, etc.</b> Tosafot there and there, and Beer HaGolah.`);
patch(
  gra,
  "beur-hagra",
  1,
  "ז",
  `<b>And it is not called, etc.</b> So Rashba in Yerushalmi mentioned discusses that he ate with the pit, unlike Rosh — see there. And there are further doubts, etc. — Tosafot there and there, see there.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "א",
  `<b>Seif 2, he need not, etc.</b> Rambam, who holds that what says "until a revi'it" applies also to a blessing; if so, it discusses swallowing — for if he spits out, he never blesses, as Rosh wrote there, for he had no benefit. And what R' Chananel wrote — that spitting out is mere affliction — and this is what he wrote "and even," etc.`,
);
patch(
  gra,
  "beur-hagra",
  2,
  "ב",
  `<b>And some say, etc.</b> This is the view of Tosafot there s.v. to'em, etc., and therefore, etc., and this is what he wrote "and then," etc. Rosh there.`,
);

patch(bhc, "biur-halacha", 2, "_", biurHalacha2);

patch(
  csf,
  "chatam-sofer",
  1,
  "_",
  `<small>On Taz sk 1</small> It appears to me: hot wine. NB: see in Magen Avraham siman 190 sk 10 and siman 272 seif 6; and see below.`,
);
patch(
  csf,
  "chatam-sofer",
  2,
  "_",
  `<small>There in Magen Avraham sk 9</small> Room to study regarding those who place. NB: see in Mor VeKetziah from the Gaon Mahari Emden zt"l that it is obvious to him one need not bless — see there regarding "taste" in Berachot and see there further details on lighting tobacco in a milk-fat candle as already written in Pri Chadash Yoreh De'ah siman 108; and likewise drawing tobacco is also permitted there inside [from the Gaon, may he live long].`,
);

const PATCH_COUNT = 31;
console.log(`ok siman 210 part1of3 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-210-part1of3.json",
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
