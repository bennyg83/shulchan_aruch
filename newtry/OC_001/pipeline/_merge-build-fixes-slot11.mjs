#!/usr/bin/env node
/** Build _fixes-simanNNN-slot11.mjs from export + hand + cite helpers */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function sanitizeEn(en) {
  return en
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bhametz\b/gi, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven(ing|ed|s)?\b/gi, "chametz")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

async function citeTranslate(slug, he) {
  if (slug !== "beer-hagolah") return null;
  const citePath = path.join(__dirname, `lib/translate-cite-${siman}.mjs`);
  if (fs.existsSync(citePath)) {
    const mod = await import(`./lib/translate-cite-${siman}.mjs`);
    const fn = mod[`translateCite${siman}`];
    if (fn) return fn(he);
  }
  const { translateCite454 } = await import("./lib/translate-cite-454.mjs");
  return translateCite454(he);
}

const exportPath = path.join(__dirname, `he${siman}-export.json`);
const handPath = path.join(__dirname, `_hand-en-${siman}.json`);
const exported = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const hand = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};

const dir = path.join(ROOT, `output/siman_${siman}`);
const relFixes = {};
const missing = [];

for (const slug of fs.readdirSync(dir).sort()) {
  const rel = `${slug}/part-001.txt`;
  const abs = path.join(dir, slug, "part-001.txt");
  if (!fs.existsSync(abs)) continue;
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  relFixes[rel] = {};
  for (const b of blocks) {
    const k = keyFor(b);
    const hk = `${slug}/${k}`;
    let en = hand[hk];
    if (!en) en = await citeTranslate(slug, b.he);
    if (!en) {
      const cur = exported[hk]?.en || b.en || "";
      if (!isBad(cur)) en = sanitizeEn(cur);
    }
    if (!en || isBad(en)) missing.push(hk);
    else relFixes[rel][k] = en;
  }
}

const outPath = path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`);
fs.writeFileSync(
  outPath,
  `/** siman ${siman} — worker-slot-11 */\nexport const FIXES = ${JSON.stringify(relFixes, null, 2)};\n`
);
let total = 0;
for (const f of Object.values(relFixes)) total += Object.keys(f).length;
console.log(`siman_${siman}: FIXED ${total} MISSING ${missing.length}`);
if (missing.length) {
  console.log(missing.slice(0, 30).join("\n"));
  process.exit(1);
}
