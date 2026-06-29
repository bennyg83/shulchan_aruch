#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const res = await fetch(`${GOOGLE}&q=${q}`, { signal: AbortSignal.timeout(60000) });
  const data = await res.json();
  return (data[0] || []).map((x) => x[0]).join("").trim();
}

async function translateHe(he) {
  const max = 1200;
  if (he.length <= max) return translateChunk(he);
  const parts = [];
  let rest = he;
  while (rest.length > max) {
    let cut = rest.lastIndexOf(" ", max);
    if (cut < max * 0.5) cut = max;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  const out = [];
  for (const p of parts) {
    out.push(await translateChunk(p));
    await new Promise((r) => setTimeout(r, 1200));
  }
  return out.join(" ");
}

function patch(t) {
  return String(t)
    .replace(/&quot;/g, '"')
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord\b/gi, "the Omnipresent")
    .replace(/\bGod's\b/gi, "the Omnipresent's")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bHashem's\b/gi, "the Omnipresent's")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bAccording to the\b/gi, "per the")
    .replace(/\bthere in the\b/gi, "stated in the")
    .replace(/\bRadach\b/gi, "Radbaz")
    .replace(/\bLakman\b/gi, "l'fi da'at")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bin the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "in siman $1")
    .replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bMaimonides\b/gi, "Rambam")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ")
    .replace(/\s+/g, " ")
    .trim();
}

const fp = "output/siman_187/eliyah-rabbah/part-001.txt";
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const b = blocks.find((x) => x.seif === "1" && x.marker === "_");
const he = plainFromHtml(b.he);
let en = patch(await translateHe(he));
let n = 0;
while (isBadMt447(en) && n < 5) {
  en = patch(en);
  n++;
}
if (isBadMt447(en)) console.warn("warn: residual bad_mt patterns may remain");
const out = blocks.map((x) => (x === b ? { ...x, en } : x)).map(serializeBlock).join("\n\n");
fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
console.log("siman_187 eliyah-rabbah 1:_ ok len", en.length);
