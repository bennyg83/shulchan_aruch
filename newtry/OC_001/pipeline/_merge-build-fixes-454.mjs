#!/usr/bin/env node
/** Merge siman454-part{1,2,3}.json + cite + mechaber → _fixes-siman454-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite454 } from "./lib/translate-cite-454.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt454.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bleavening\b/gi, "chimutz")
    .replace(/\bleavens\b/gi, "causes chimutz")
    .replace(/\bleavened\b/gi, "became chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bhametz\b/gi, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/curses Hashem/gi, "reviles the Name")
    .replace(/\bHashem\b/g, "the Name")
    .replace(/&quot;/g, '"')
    .trim();
}

const MECHABER = {
  "mechaber/1:main":
    "With which matzah one does not fulfill his obligation. And it contains 4 seifim: One does not fulfill with bread of sovin nor with bread of mursan; rather one kneads the dough with sovin and mursan that are in it and fulfills with it; and one fulfills with matzah of the cleanest fine flour, and we do not say this is not lechem oni: {Rama: And it is good l'chatchila not to make the matzah excessively wide so that it is like an ashisha (Mahariv).}",
  "mechaber/2:main":
    "Dough for dogs: when the shepherds eat from it, one fulfills with it; if not, one does not fulfill, because it is not meshumar l'shem matzah: {Rama: Thus is Rambam; but some say the reason is it is not called bread when shepherds do not eat from it, and this appears to be the ikar (Tur YD 330 and Rash on Challah ch. 1).}",
  "mechaber/3:main":
    "There is none nowadays who knows how to perform chalita; therefore every type of chalita is forbidden.",
  "mechaber/4:main":
    "A person does not fulfill with stolen matzah. When is this said? When he stole matzah; but if he stole wheat or flour and made matzah, he fulfills, for he acquired it through shinui and he owes him only money {Rama: (and regarding blessing see above siman 649)}.",
};

function loadHand() {
  const hand = { ...MECHABER };
  for (const f of ["siman454-part1.json", "siman454-part2.json", "siman454-part3.json"]) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) Object.assign(hand, JSON.parse(fs.readFileSync(p, "utf8")));
  }
  const handEn = path.join(__dirname, "_hand-en-454.json");
  if (fs.existsSync(handEn)) Object.assign(hand, JSON.parse(fs.readFileSync(handEn, "utf8")));
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, `output/siman_454/${slug}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => `output/siman_454/${slug}/${f}`);
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
        if (!en && slug === "beer-hagolah") en = translateCite454(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman454-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 454 part ${partNum} — matzah types */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
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
if (miss) {
  if (r1.missing.length) console.log("MISSING_P1", r1.missing.join(", "));
  if (r2.missing.length) console.log("MISSING_P2", r2.missing.join(", "));
  if (r3.missing.length) console.log("MISSING_P3", r3.missing.join(", "));
  process.exit(1);
}
