#!/usr/bin/env node
/** Build siman 219 slot5 batch3 FIXES from current editorial queue */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES as B2 } from "./_siman219-slot5-batch2-data.mjs";
import { MANUAL } from "./_gen-siman219-remaining-fixes.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const queue = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "editorial-queue-siman-219.json"), "utf8")
);

const MT_PATTERNS = [
  /\bAccording to the\b/i,
  /\bthere in the\b/i,
  /&quot;/,
  /&amp;/,
  /&lt;/,
  /&gt;/,
];

function autoFix(en, marker) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
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
  t = t.replace(/\baccording to the\b/gi, "per the");
  return t.replace(/\s+/g, " ").trim();
}

function blockKey(seif, marker) {
  return `${seif}:${marker || "_"}`;
}

function preflightFail(en) {
  if (!en || en.length < 8) return "too_short";
  for (const re of MT_PATTERNS) if (re.test(en)) return re.source;
  if (/\bShield of Abraham\b/i.test(en)) return "anglicized_ma";
  if (/\bGolden Rows\b/i.test(en)) return "anglicized_taz";
  if (/\bHouse of Joseph\b/i.test(en)) return "anglicized_by";
  return null;
}

const FIXES = {};
for (const it of queue.items) {
  const rel = it.file.replace(/^siman_219\//, "");
  const key = blockKey(it.seif, it.marker);
  const fp = path.join(OUT, it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  let en = MANUAL[rel]?.[key] ?? B2[rel]?.[key] ?? b?.en ?? "";
  en = autoFix(en, it.marker);
  if (!FIXES[rel]) FIXES[rel] = {};
  FIXES[rel][key] = en;
}

let count = 0;
const fails = [];
for (const it of queue.items) {
  const rel = it.file.replace(/^siman_219\//, "");
  const key = blockKey(it.seif, it.marker);
  const en = FIXES[rel][key];
  count++;
  const pf = preflightFail(en);
  if (pf) fails.push({ rel, key, pf, en: en.slice(0, 80) });
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: "",
    en,
  });
  const bad = issues.filter((x) => x.code === "mt_garbage" || x.code === "html_entity_leak");
  if (bad.length) fails.push({ rel, key, pf: bad.map((x) => x.code).join(","), en: en.slice(0, 80) });
}

const outPath = path.join(__dirname, "_siman219-slot5-batch3-data.mjs");
const body = `/** worker-slot-5 — siman 219 editorial batch 3 fixes (${count} blocks) */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
console.log("wrote", outPath, count, "blocks");
console.log("preflight/quality fails:", fails.length);
if (fails.length) console.log(JSON.stringify(fails.slice(0, 10), null, 2));
