#!/usr/bin/env node
/** Merge siman447-part{1,2,3}.json + cite + mechaber → _fixes-siman447-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite447 } from "./lib/translate-cite-447.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PART1 = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];
const PART2 = [
  "chok-yaakov",
  "beur-hagra",
  "peri-megadim",
];
const PART3 = [
  "biur-halacha",
  "ateret-zekenim",
  "chatam-sofer",
  "dagul-merevavah",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "netiv-chayim",
  "rabbi-akiva-eiger",
  "shaarei-teshuvah",
  "yad-ephraim",
  "chokhmat-shlomo",
];

function isBad(en) {
  return isBadMt447(en);
}

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/Inferior leaven/gi, "chametz nokshah")
    .replace(/&quot;/g, '"')
    .replace(/כך נראה לי/g, "so it appears to me")
    .trim();
}

const MECHABER = {
  "mechaber/1:main":
    "The laws of chametz mixtures during Pesach. Contains 12 seifim. Chametz on Pesach forbids its mixture whether in its own kind or not in its own kind, in any amount, even for benefit: {Rama: And one must burn everything and it does not suffice to redeem the value of the chametz and sell the rest (Mordechai beginning of Pesachim and rulings of Maharai siman 104 and responsum of Mahari Brin). However, vessels in which it was cooked are permitted after Pesach and do not require breaking or hagalah (Da'at Emet and Tosafot perek Kol Sha'ah).} And the law of its mixture is like the law of other mixtures, except that what forbids in other mixtures less than sixty, chametz forbids in any amount; but if in another mixture one would not need sixty but only a peel or removal of the place, so too with chametz — hot with hot without gravy, a peel suffices as with other prohibitions; and likewise if a loaf of chametz touched a loaf of matzah and both are hot and nothing is bubbling, only the place of contact is forbidden, since it does not absorb more: {Rama: And properly reicha is a matter regarding a cooked dish that has chametz with other cooked dishes — some are lenient where it would be permitted with other prohibitions (Mordechai perek Kol Sha'ah); and some are stringent that in any case there is a minute amount (Hagahot Semak and Tosafot Avodah Zarah). And specifically where reicha applies; but in other prohibitions it is not a matter, as will be explained in Yoreh De'ah siman 108 with Heaven's help.}",
  "mechaber/2:main":
    "Chametz that became mixed from the sixth hour (and onward) until nightfall does not forbid in any amount; rather its law is like other prohibitions {Rama: (and taste for detriment is also permitted) (Da'at Emet according to all).}",
  "mechaber/3:main":
    "Wheat found on the eve of Pesach in a cooked chicken is permitted to nullify it in sixty; but if they heated the chicken on Pesach while the wheat was still inside, it returns to impart taste inside on Pesach and is in any amount: {Rama: However, in heating of kli sheini one need not be concerned (Hagahot Maimoniyot chapter 1); and some are stringent regarding kli sheini on Pesach, and it is good to be stringent if the hand reaches yad soledes bo, for otherwise it is not called kli sheini.}",
  "mechaber/4:main":
    "If chametz became mixed before Pesach and was nullified in sixty, it does not return and revive on Pesach to forbid in any amount; and there are those who disagree: {Rama: And we practice like the first view in every mixture that is moist in moist (Terumat HaDeshen siman 114). However, in a dry thing that was mixed, or where there is concern for mixtures such as bread that fell into wine — even though it was removed from there, it is forbidden on Pesach, for we are concerned perhaps crumbs remained that impart taste on Pesach (Beit Yosef in the name of responsum of Rashba).}",
  "mechaber/5:main":
    "Dry meat, cheese, and fish that were salted before Pesach and were not careful with them are permitted to eat them on Pesach; however, salted fish soaked in water on Pesach in a chametz vessel — one should be stringent to beware of them because they absorb on Pesach from the discharge of vessels and chametz on Pesach is in any amount: {Rama: And there are those who disagree and are stringent, and in these countries the custom is to be stringent l'chatchila not to eat cheeses, fish, and dry meat; but if one rinsed the meat three times before Pesach we are accustomed to eat it; and in intestines rinsing does not help, therefore we do not soak the dry butcher goods (Mahari Brin); and b'dieved one should not be stringent with these; but fat melted in a chametz vessel is forbidden by law if they were not careful at the time of making it from chametz and did not melt it in a chametz vessel that is ben yomo (Mordechai beginning of perek Kol Sha'ah and Semak and Hagahot Maimoniyot chapter 1); and likewise anything cooked in a chametz vessel such as cooked wine or preserves and the like is forbidden on Pesach; but on the last Yom Tov there is room to be lenient (rulings of Maharai siman 177); and the same law if a minute amount of these things became mixed into food — we are not stringent to forbid the mixture as explained above. Some are stringent to doubt wine vinegar that they doubt from it all year, for we are concerned perhaps they put into it from what remains of the meal and sometimes there are bread crumbs in it (Maharil); and in places where wine vinegar is not found I have not seen to be stringent in this. There are yet others who are stringent l'chatchila not to fill from wine and wine vinegar within thirty days before Pesach in a chametz vessel; and if they filled it within thirty days they are accustomed not to drink it on Pesach (responsum of Mahari Brin); and one who is lenient does not lose, all the more in a place where wine and vinegar are not commonly found — so it appears to me. A wine barrel whose staves were attached with dough — if within two months before Pesach it is still soft and imparts taste on Pesach and is forbidden to drink; and if they placed it before then it already dried and does not impart taste on Pesach and is permitted (Mordechai beginning of perek Kol Sha'ah and Semak and Hagahot Maimoniyot chapter 1); however, if there is a kezayit of dough in one place he is obligated to burn it even though it was made to strengthen (rulings of Maharai siman 149), as above siman 442 seif 7.}",
  "mechaber/6:main":
    "Salt that was placed in a mortar is permitted to salt meat with it on Pesach (because it does not discharge when cold).",
  "mechaber/7:main":
    "Unripe grapes that were crushed before Pesach in chametz mortars are permitted to eat on Pesach: {Rama: because it does not discharge when cold; and even if it was made on Pesach it is not forbidden if the vessel was clean; but if they cut it on Pesach with a chametz knife one should be stringent, for an ordinary knife is not presumed clean and there is concern for chametz adhering to it (Maharil); but if that thing became mixed into a cooked dish one need not be concerned and be stringent to forbid from doubt — so it appears to me.}",
  "mechaber/8:main":
    "Olives for which care was taken to cut them with a new knife — even if care was not taken to pickle them in a new pot — if it is not ben yomo, it is permitted according to all.",
  "mechaber/9:main":
    "Dry in dry: although in other prohibitions one in two nullifies, chametz in matzah — even in a thousand — is not nullified; and there are those who say chametz is like other prohibitions in this.",
  "mechaber/10:main":
    "Taste for detriment is permitted even on Pesach: {Rama: And there are those who are stringent, and such is the custom in these countries; and in a place where the custom is to be stringent, even any amount and taste for detriment is forbidden (Terumat HaDeshen siman 198).}",
  "mechaber/11:main":
    "Whether chametz that became mixed before Pesach and Passover passed over it, or it became mixed on Pesach and the entire Passover passed over it, or Passover passed over the chametz and it became mixed after Passover — it is nullified in sixty; and in less than sixty it suffices to cast the benefit of the prohibition into the Dead Sea (Hagahot Maimoniyot chapter 1).",
  "mechaber/12:main":
    "Chametz nokshah — even b'eyna — is not forbidden in benefit after Pesach; but periyosh items are full chametz and forbidden in benefit after Pesach: {Rama: Some refrain from playing on the table on Pesach with cards called kartin, for they are concerned perhaps crumbs of chametz nokshah in them will fall into food (Piskei Maharai siman 167).}",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman447-part1.json", "siman447-part2.json", "siman447-part3.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, `output/siman_447/${slug}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => `output/siman_447/${slug}/${f}`);
}

function buildPart(slugs, partNum, hand) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    for (const file of listPartFiles(slug)) {
      const abs = path.join(ROOT, file.replace(/\//g, path.sep));
      const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
      fixes[file] = fixes[file] || {};
      for (const b of blocks) {
        const k = keyFor(b);
        const hk = `${slug}/${k}`;
        let en = hand[hk];
        if (!en && slug === "beer-hagolah") en = translateCite447(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman447-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 447 part ${partNum} — chametz ta'aruvot on Pesach */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  return { fixes, missing };
}

const hand = loadHand();
const r1 = buildPart(PART1, 1, hand);
const r2 = buildPart(PART2, 2, hand);
const r3 = buildPart(PART3, 3, hand);
let n = 0;
for (const f of [r1, r2, r3]) {
  for (const x of Object.values(f.fixes)) n += Object.keys(x).length;
}
console.log("HAND_KEYS", Object.keys(hand).length);
console.log("FIXED", n);
const miss = r1.missing.length + r2.missing.length + r3.missing.length;
console.log("MISSING", miss);
if (r1.missing.length)
  console.log("MISSING_P1", r1.missing.length, r1.missing.slice(0, 15).join(", "));
if (r2.missing.length)
  console.log("MISSING_P2", r2.missing.length, r2.missing.slice(0, 15).join(", "));
if (r3.missing.length)
  console.log("MISSING_P3", r3.missing.length, r3.missing.slice(0, 15).join(", "));
