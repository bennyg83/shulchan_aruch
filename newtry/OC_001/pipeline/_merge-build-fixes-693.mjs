#!/usr/bin/env node
/** Merge siman693-part{1,2,3}.json + cite + mechaber → _fixes-siman693-part{1,2,3}.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite454 as translateCite } from "./lib/translate-cite-454.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3 } from "./_analyze-bad-mt693.mjs";

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
    .replace(/\bcauldron\b/gi, "kettle")
    .trim();
}

async function loadHand() {
  const mech = await import(pathToFileURL(path.join(__dirname, "mech693-en.mjs")).href);
  const hand = {};
  for (const [k, en] of Object.entries(mech.t || {})) hand[`mechaber/${k}`] = en;
  for (const f of ["siman693-part1.json", "siman693-part2.json", "siman693-part3.json"]) {
    const fp = path.join(__dirname, f);
    if (fs.existsSync(fp)) Object.assign(hand, JSON.parse(fs.readFileSync(fp, "utf8")));
  }
  return hand;
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function listPartFiles(slug) {
  const dir = path.join(ROOT, `output/siman_693/${slug}`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".txt"))
    .sort()
    .map((f) => `output/siman_693/${slug}/${f}`);
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
        if (!en && slug === "beer-hagolah") en = translateCite(b.he);
        if (!en) {
          const cur = b.en || "";
          if (!isBad(cur)) en = sanitizeEn(cur);
        }
        if (!en) missing.push(hk);
        else fixes[file][k] = en;
      }
    }
  }
  const outPath = path.join(__dirname, `_fixes-siman693-part${partNum}.mjs`);
  fs.writeFileSync(
    outPath,
    `/** siman 693 part ${partNum} — Pesach */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  return { fixes, missing };
}

const hand = await loadHand();
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
if (miss) process.exit(1);
