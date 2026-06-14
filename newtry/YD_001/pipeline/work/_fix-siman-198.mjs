#!/usr/bin/env node
/**
 * Siman 198 mt_garbage cleanup — translate flagged blocks from Hebrew, validate before write.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output/siman_198");
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function hebrewToPlain(html) {
  const $ = cheerio.load(`<div id="r">${html ?? ""}</div>`, { decodeEntities: true });
  return $("#r").text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function halakhicCleanup(text) {
  return text
    .replace(/\bGod\b/g, "Hashem")
    .replace(/\bthe LORD\b/gi, "Hashem")
    .replace(/\bLORD\b/g, "Hashem")
    .replace(/\bSabbath\b/g, "Shabbat")
    .trim();
}

function splitForTranslation(input, maxLen = 400) {
  if (input.length <= maxLen) return [input];
  const parts = [];
  let i = 0;
  while (i < input.length) {
    let j = Math.min(i + maxLen, input.length);
    if (j < input.length) {
      const cut = input.lastIndexOf(" ", j);
      if (cut > i + 60) j = cut;
    }
    parts.push(input.slice(i, j).trim());
    i = j;
  }
  return parts.filter(Boolean);
}

async function translateGoogle(piece) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const body = new URLSearchParams({ q: piece });
      const res = await fetch(GOOGLE_URL, { method: "POST", body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const tr = data[0].map((seg) => seg[0]).join("");
      if (/QUERY LENGTH LIMIT|MYMEMORY WARNING|AUTO DETECT/i.test(tr)) throw new Error("artifact");
      return tr;
    } catch {
      await sleep(800 + attempt * 400);
    }
  }
  return null;
}

async function translatePlain(text) {
  const pieces = splitForTranslation(text);
  const out = [];
  for (const piece of pieces) {
    const tr = await translateGoogle(piece);
    if (!tr) return null;
    out.push(tr.trim());
    await sleep(120);
  }
  return halakhicCleanup(out.join(" "));
}

function blockOk(block) {
  const bad = new Set(["mt_garbage", "mt_api_artifact", "pending_placeholder", "empty_english"]);
  const errs = runBlockQualityChecks(block).filter((e) => e.severity === "error" && bad.has(e.code));
  return errs.length === 0;
}

const files = [];
for (const slug of fs.readdirSync(OUT)) {
  const sd = path.join(OUT, slug);
  if (!fs.statSync(sd).isDirectory()) continue;
  for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
    files.push(path.join(sd, f));
  }
}

let total = 0;
let fail = 0;

for (const fp of files.sort()) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let changed = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const errs = runBlockQualityChecks(b).filter((e) => e.severity === "error");
    if (!errs.some((e) => e.code === "mt_garbage")) continue;
    const plain = hebrewToPlain(b.he);
    if (!plain) continue;
    const translated = await translatePlain(plain);
    if (!translated) {
      console.warn("FAIL", path.relative(OUT, fp), b.seif, b.marker);
      fail++;
      continue;
    }
    const candidate = { ...b, en: translated };
    if (!blockOk(candidate)) {
      console.warn("STILL BAD", path.relative(OUT, fp), b.seif, b.marker, runBlockQualityChecks(candidate).filter((e) => e.severity === "error").map((e) => e.code));
      fail++;
      continue;
    }
    blocks[i] = candidate;
    changed++;
    total++;
    console.log("OK", path.relative(OUT, fp), `seif ${b.seif} marker ${b.marker}`);
  }
  if (changed) {
    fs.writeFileSync(fp, blocks.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
  }
}

console.log(`[DONE] fixed ${total}, failed ${fail}`);
