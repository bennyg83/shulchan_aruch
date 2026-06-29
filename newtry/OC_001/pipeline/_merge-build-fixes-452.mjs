#!/usr/bin/env node
/** Merge siman452-part{1,2,3}.json + cite + mechaber → _fixes-siman452-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite452 } from "./lib/translate-cite-452.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt452.mjs";

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
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/&quot;/g, '"')
    .replace(/\bscour(ing|ed|s)?\b/gi, (m) => m.replace(/scour/i, "kasher"))
    .trim();
}

const MECHABER = {
  "mechaber/1:main":
    "The time for hagalah of vessels. And it contains 7 seifim: One should be careful to kasher before the fifth hour so that one need not be particular whether the vessels are ben yomo or not {Rama: (or whether there is sixty in the water against the vessel one is kashering or not) (Tur)} and similarly if one kasher vessels whose absorption is slight together with vessels whose absorption is great, and similarly if one leaves the vessels in the pot too long or does not leave them so long, and similarly so that one need not be careful that the water cease boiling from their heat: {Rama: However many dispute and hold that hagalah accomplishes nothing if the water is not boiling (and likewise is implied from the Rosh and Semag and Terumat HaDeshen siman 131 and Agur and Tur siman 105); therefore one should be careful even before the time of its prohibition that they not cease boiling from their heat all the time one is kashering (in my humble opinion)} and that one not insert the vessels until the water boils, and similarly so that one need not kasher the large pot in which one kashered first and last: {Rama: And if he did not kasher before the time of prohibition he may kasher until Pesach, for then chametz is in any amount and hagalah does not help since it returns and reabsorbs; but it is permitted to libun a vessel during Pesach (in my humble opinion and responsum of Rashba); and when one kasher before Pesach after the sixth hour one must be careful in all the matters mentioned that one need not be careful in them before the sixth hour}.",
  "mechaber/2:main":
    "One should be careful not to kasher meat vessels and dairy vessels together unless one of them is not ben yomo: {Rama: (And certainly a forbidden-food vessel; therefore the practice is not to kasher any ben yomo vessel)}.",
  "mechaber/3:main":
    "One should not place many vessels inside a vessel and kasher them together {Rama: (if they touch one another)}.",
  "mechaber/4:main":
    "If one kasher with tongs one should rotate the vessel, for otherwise at the place of the tongs the boiling water does not reach.",
  "mechaber/5:main":
    "One may not kasher in the hot springs of Tiberias even vessels whose law is like kli sheini, because it is not heat born of fire — as it absorbs so it expels: what it absorbed through heat born of fire it expels through heat born of fire. {Rama: However if one used it only in Tiberias waters one may kasher in them (Beit Yosef in the name of Acharonim). One may not kasher in any liquid except water; however b'dieved hagalah helps in any liquid (Beit Yosef in the name of Acharonim). If one kashered many vessels in a pot until from the great expulsion of the vessels the water became like broth, one may kasher no more in that water (Ran on chapter Kol HaBasar)}.",
  "mechaber/6:main":
    "A large vessel that cannot be inserted into another vessel because of its size — one makes a lip of clay around its mouth so it fills well and the water reaches its lip, and fills it with water and boils it; or one takes a white-hot stone or burning torch and throws it inside while boiling and thereby the water boils more and rises to its lip.",
  "mechaber/7:main":
    "The practice is to rinse the vessel in cold water immediately after hagalah.",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman452-part1.json", "siman452-part2.json", "siman452-part3.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, `output/siman_452/${slug}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => `output/siman_452/${slug}/${f}`);
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
        if (!en && slug === "beer-hagolah") en = translateCite452(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman452-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 452 part ${partNum} — hagalas kelim / time of hagalah */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
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
if (r1.missing.length) console.log("MISSING_P1", r1.missing.slice(0, 20).join(", "));
if (r2.missing.length) console.log("MISSING_P2", r2.missing.slice(0, 20).join(", "));
if (r3.missing.length) console.log("MISSING_P3", r3.missing.slice(0, 20).join(", "));
