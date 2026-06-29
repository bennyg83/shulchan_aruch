#!/usr/bin/env node
/** Merge siman450-part{1,2}.json + cite + mechaber → _fixes-siman450-part{1,2}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite450 } from "./lib/translate-cite-450.mjs";

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
  "ateret-zekenim",
  "beur-hagra",
  "biur-halacha",
  "chatam-sofer",
  "chok-yaakov",
  "chokhmat-shlomo",
  "eliyah-rabbah",
  "eshel-avraham",
  "kaf-hachayyim",
  "levushei-serad",
  "peri-megadim",
  "rabbi-akiva-eiger",
  "yad-ephraim",
];

const MECHABER = {
  "mechaber/1:main":
    "The law of a Jew and a non-Jew who have a partnership. Contains 7 seifim. A Jew who borrowed a loaf from his fellow Jew before Pesach must repay it after Pesach; and there is a matter of theft if he does not repay it.",
  "mechaber/2:main":
    "A Jew who receives from a non-Jew interest-loaves every week — he should tell him before Pesach to give him during the week of Pesach flour or money; and since he stipulated thus with him, even though after Pesach he gives him chametz loaves in place of the flour and money, it is permitted.",
  "mechaber/3:main":
    "A Jew and a non-Jew who have an oven in partnership — he tells the non-Jew before Pesach: take yours for Pesach, and I will take mine afterwards.",
  "mechaber/4:main":
    "A Jew who had an oven and a non-Jew baked chametz in it on Pesach — even money is forbidden to receive as his wage, for it would be profiting from issurei hana'ah; and if he already received the money, it is permitted to benefit from it.",
  "mechaber/5:main":
    "There are those who permit renting his oven to a non-Jew on condition that he bake matzah in it; and if he bakes chametz in it, one is not concerned about it. {Rama: And likewise it is permitted to rent him a house to dwell in, even though he may later bring chametz into it. (Agur)}",
  "mechaber/6:main":
    "One may say to a servant on Pesach: take this dinar and buy and eat, even though he knows he will acquire chametz; but he should not tell him: go and eat and I will pay. There are those who permit even this, except if he gave the dinar beforehand or handed it over. {Rama: And it is forbidden to buy chametz for a non-Jew on Pesach, even with the non-Jew's money. (Rivash siman 41)}",
  "mechaber/7:main":
    "It is forbidden to rent utensils to a non-Jew on Pesach so that he cook chametz in them; but one may rent him a donkey to bring chametz on it. {Rama: And some permit heating water in chametz utensils and washing in them, and likewise other needs of benefit from chametz utensils; and such is the custom. (Tosafot perek Ein Ma'amidin; Mordechai perek Kol Sha'ah)}",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman450-part1.json", "siman450-part2.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function rel(slug) {
  return `output/siman_450/${slug}/part-001.txt`;
}

function buildPart(slugs, partNum, hand) {
  const fixes = {};
  const missing = [];
  for (const slug of slugs) {
    const file = rel(slug);
    const abs = path.join(ROOT, file.replace(/\//g, path.sep));
    if (!fs.existsSync(abs)) continue;
    const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
    fixes[file] = {};
    for (const b of blocks) {
      const k = keyFor(b);
      const hk = `${slug}/${k}`;
      let en = hand[hk];
      if (!en && slug === "beer-hagolah") en = translateCite450(b.he);
      if (!en) missing.push(hk);
      else fixes[file][k] = en;
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman450-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 450 part ${partNum} — Jew/non-Jew partnership */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  return { fixes, missing };
}

const hand = loadHand();
const r1 = buildPart(PART1, 1, hand);
const r2 = buildPart(PART2, 2, hand);
let n = 0;
for (const f of Object.values(r1.fixes)) n += Object.keys(f).length;
for (const f of Object.values(r2.fixes)) n += Object.keys(f).length;
console.log("HAND_KEYS", Object.keys(hand).length);
console.log("FIXED", n);
console.log("MISSING", r1.missing.length + r2.missing.length);
if (r1.missing.length) console.log("MISSING_P1", r1.missing.join(", "));
if (r2.missing.length) console.log("MISSING_P2", r2.missing.join(", "));
