#!/usr/bin/env node
/** Merge siman453-part{1,2,3}.json + cite + mechaber → _fixes-siman453-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite453 } from "./lib/translate-cite-453.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt453.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/gi, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven(ing|ed|s)?\b/gi, (m) => m.replace(/leaven/i, "chametz"))
    .replace(/&quot;/g, '"')
    .replace(/\bkitniyiot\b/gi, "kitniyot")
    .trim();
}

const MECHABER = {
  "mechaber/1:main":
    "The laws of wheat and grinding them for matzot. And it contains 9 seifim: These are the things through which one fulfills the obligation of matzah — in wheat, barley, spelt, oats, and rye {Rama: (and the practice is to take wheat initially (Maharil))} — but not in rice and other types of kitniyot; and these also do not come to chametz, and it is permitted to make a cooked dish from them: {Rama: And some forbid (Tur and Hagahot Maimoniot chapter 5 and Mordechai on chapter Kol Sha'ah), and the practice in Ashkenaz is to be stringent, and one should not change; however it is obvious that they do not forbid b'dieved if they fell into the cooked dish; and likewise it is permitted to light with oils made from them, and they do not forbid if they fell into the cooked dish; and likewise it is permitted to keep types of kitniyot in the house (Terumat HaDeshen siman 113); and dill seed (Maharil) and anise and coriander are not types of kitniyot, and it is permitted to eat them on Pesach — so it appears to me}.",
  "mechaber/2:main":
    "One who makes dough from wheat and rice — if it has the taste of grain, one fulfills his obligation with it on Pesach.",
  "mechaber/3:main":
    "If they did not separate from the wheat the mouse-eaten [portions], it is of no concern: {Rama: And likewise if they did not separate from it the grain that sprouted; however one must see that all of this is not so much that there is not sixty against it from the permitted — (Hagahot Maimoniot in the name of Sma\"k and Terumat HaDeshen siman 114)}.",
  "mechaber/4:main":
    "The wheat with which one makes matzah for the mitzvah — it is good to guard them so that water not fall on them from the time of harvest, or at least from the time of grinding; and in a time of duress it is permitted to buy flour from the marketplace.",
  "mechaber/5:main":
    "Nowadays it is forbidden to moisten — whether wheat or barley.",
  "mechaber/6:main":
    "Sacks in which one places flour all year — if one wants to place flour in them [for Pesach] and launder them well — one must untie before laundering all the stitching in them at the corners, or if they are patched.",
  "mechaber/7:main":
    "When transporting sacks that have flour from the mill — it is forbidden to place them on an animal without a saddle or thick hide under the sack: {Rama: And likewise one should be careful l'chatchila not to place many sacks with flour one upon another in a place where it is possible (Mordechai on end of Elu Overin)}.",
  "mechaber/8:main":
    "The practice is to pick [clean] the millstones because sometimes they place moist grain in them for fine flour; and the practice is that the first flour ground after the picking — one guards it until after the festival: {Rama: And men of action are accustomed to go themselves to the place of the millstones to see themselves the grinding of their flour (Mordechai)}.",
  "mechaber/9:main":
    "One must grind the wheat a day or two before kneading; and if they ground on the eve of Pesach — some say it is forbidden to knead matzah with it that day, because at the time of grinding the flour is hot and heats the water and the dough is prone to chametz.",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman453-part1.json", "siman453-part2.json", "siman453-part3.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, `output/siman_453/${slug}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => `output/siman_453/${slug}/${f}`);
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
        if (!en && slug === "beer-hagolah") en = translateCite453(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman453-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 453 part ${partNum} — wheat / matzah / kitniyot */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
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
if (r1.missing.length) console.log("MISSING_P1", r1.missing.join(", "));
if (r2.missing.length) console.log("MISSING_P2", r2.missing.join(", "));
if (r3.missing.length) console.log("MISSING_P3", r3.missing.join(", "));
