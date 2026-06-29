#!/usr/bin/env node
/** Build siman442-part{1,2}.json from he442-export + hand overrides + cite helper */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { translateCite442 } from "./lib/translate-cite-442.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exportPath = path.join(__dirname, "he442-export.json");
const handPath = path.join(__dirname, "_hand-risky-442.json");

const PART1_SLUGS = new Set([
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
]);

const MECHABER = {
  "mechaber/1:main":
    "The law of chametz mixtures. Contains 11 seifim. A chametz mixture — one transgresses bal yera'eh and bal yimatzei on it, such as muryas, Babylonian kutach, Median beer, and all similar edible items. But something that contains a chametz mixture yet is unfit for eating — it is permitted to keep on Pesach, such as a tanners' vat into which one placed flour and hides: even if he placed them one hour before biur, it is permitted to keep it. If he did not place the hides but placed the flour three days before the time of biur, it is permitted to keep it, for it spoiled and became putrid within three days; if it did not spoil within three days he is obligated to destroy it. Likewise eye salves, bandages, plasters, and theriac into which chametz was placed — it is permitted to keep them on Pesach, for the form of the chametz is lost.",
  "mechaber/2:main":
    "Bread itself that became moldy and was disqualified from feeding to a dog, or a medicinal paste that spoiled — he is not obligated to destroy it.",
  "mechaber/3:main":
    "Garments that were laundered with wheat starch, and papers that were glued with chametz, and all similar cases — it is permitted to keep them on Pesach, for the form of the chametz does not remain. {Rama: Therefore it is permitted to paste papers on a window within thirty days before Pesach; and some are stringent if it is visible from outside (Terumat HaDeshen siman 110 and his rulings siman 149, and Mahariv).}",
  "mechaber/4:main":
    "Something into which chametz was mixed but is not human food at all, or is not food for every person — such as theriac and the like — even though it is permitted to keep it, it is forbidden to eat it until after Pesach; and even if it contains only the slightest amount of chametz, it is forbidden to eat it. {Rama: And below siman 447 seif 4 in the gloss it will be explained that some disagree and permit if it was nullified before Pesach, and so we hold.}",
  "mechaber/5:main":
    "Beer made from wheat and barley — one is obligated to destroy it. And likewise if one set cheeses with vinegar from barley beer or wheat beer — he is obligated to destroy them.",
  "mechaber/6:main":
    "It is customary to scrape walls and chairs that chametz touched, and they have basis to rely on; and if there is chametz in a crack that one cannot pick out after it, he should plaster a little clay over it.",
  "mechaber/7:main":
    "Dough in the cracks of a kneading trough — if there is a kezayit in one place he is obligated to destroy it; if not, if it was placed to strengthen broken pieces of the trough or to seal a hole in it, it is nullified in its minority; and if not he is obligated to destroy it.",
  "mechaber/8:main":
    "If there were two half-kezayit amounts in two places with a string of dough between them — we see: whenever if this string were removed they would be removed with it, he is obligated to destroy it; if not, he need not destroy it. When does this apply? In a trough; but in a house, even if when the string is removed they would not be removed with it, he is obligated to destroy it, because sometimes one gathers them together. If there was half a kezayit in the house and half a kezayit in the upper story, or half a kezayit in the house and half a kezayit in the portico, or half a kezayit in this house and half a kezayit in the inner house — since these half-kezayit amounts are attached to walls or beams or floors, he is not obligated to destroy them, but nullifies them in his heart and that suffices.",
  "mechaber/9:main":
    "Chametz that spoiled before its prohibition time and was disqualified from feeding to a dog, or that was burned in fire (before its time) (Ran) and was charred until it is unfit for a dog, or that was designated for sitting and plastered with clay — it is permitted to keep it on Pesach.",
  "mechaber/10:main":
    "Ink that was cooked with barley beer — it is permitted to write with it.",
  "mechaber/11:main":
    "Kneading troughs in which chametz is kneaded — one may not rely on washing them with hot water and scraping the chametz from them, for it is impossible to scrape them so that less than a kezayit total remains among them all, and the vessel combines them; therefore one must give them as a gift to a non-Jew until after Pesach, or plaster them with clay. And the same applies to dough in wooden vessels that cannot be removed. {Rama: And it is good to do so for all vessels in which flour is kept all year (Mahariv), and likewise for vessels in which bread is kept all year; and a cloth that lay on a sack of flour — shaking is not effective, and it requires laundering in order to use it on Pesach (Maharil).}",
};

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/[ḥḤ]/g, (c) => (c === "ḥ" ? "ch" : "Ch"))
    .replace(/Pesaḥ/g, "Pesach")
    .replace(/(\d+)\s+סעיפים/g, "$1 seifim")
    .replace(/&quot;/g, '"')
    .replace(/Siman\s+(\d+)/g, "siman $1")
    .trim();
}

function isBad(en) {
  return /Lord'?s Prayer|Hashem|&quot;|hand recoils|first dish|allocated|Saturday|her age|the craft|Morales|vinegar and so|English translation pending|Babylonian kutach|ḥametz|Pesaḥ|סעיפים|Schron|Quran|United States|fertilizer|Rock:|Pri?jash|Khrush|Capernaum|strike in|Darbanan/i.test(
    en
  );
}

async function loadHandModules() {
  const hand = fs.existsSync(handPath)
    ? JSON.parse(fs.readFileSync(handPath, "utf8"))
    : {};
  const mods = [
    "_hand442-mechaber.mjs",
    "_hand442-mishnah-berurah.mjs",
    "_hand442-machatzit-hashekel.mjs",
    "_hand442-magen-avraham.mjs",
    "_hand442-turei-zahav.mjs",
    "_hand442-baer-heitev.mjs",
    "_siman442-p2-a.mjs",
    "_siman442-p2-b.mjs",
    "_siman442-p2-c.mjs",
  ];
  for (const f of mods) {
    const p = path.join(__dirname, f);
    if (!fs.existsSync(p)) continue;
    const m = await import(pathToFileURL(p).href);
    Object.assign(hand, m.t || {}, m.chunkA || {}, m.chunkB || {}, m.chunkC || {});
  }
  return hand;
}

const exported = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const hand = await loadHandModules();

const part1 = {};
const part2 = {};
const fallback = [];
const missingHand = [];

for (const [hk, { he, en }] of Object.entries(exported)) {
  const slug = hk.split("/")[0];
  let out =
    MECHABER[hk] ||
    hand[hk] ||
    (slug === "beer-hagolah" ? translateCite442(he) : null);

  if (!out) {
    if (isBad(en)) {
      missingHand.push(hk);
      out = sanitizeEn(en);
    } else {
      out = sanitizeEn(en);
    }
  }

  if (PART1_SLUGS.has(slug)) part1[hk] = out;
  else part2[hk] = out;
}

fs.writeFileSync(
  path.join(__dirname, "siman442-part1.json"),
  JSON.stringify(part1, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(__dirname, "siman442-part2.json"),
  JSON.stringify(part2, null, 2) + "\n"
);
console.log("part1", Object.keys(part1).length, "part2", Object.keys(part2).length);
console.log("hand overrides", Object.keys(hand).length);
console.log("still bad/missing hand", missingHand.length);
if (missingHand.length) {
  fs.writeFileSync(
    path.join(__dirname, "_missing-hand-442.json"),
    JSON.stringify(missingHand, null, 2) + "\n"
  );
  console.log(missingHand.slice(0, 30).join("\n"));
}
