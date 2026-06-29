#!/usr/bin/env node
/**
 * Retranslate blocks with Heaven-sanitize fallout (≥4 "Heaven" or bad_mt).
 * No God/Lord→Heaven replacements in sanitize.
 * Usage: node pipeline/_mt-retranslate-heaven-siman.mjs 135
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";
import { preflightFail } from "./_slot18-lib.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("usage: node _mt-retranslate-heaven-siman.mjs N");
  process.exit(1);
}

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const url = `${GOOGLE_URL}&q=${q}`;
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (res.status === 429) {
        await sleep(5000 * (i + 1));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return (data[0] || []).map((x) => x[0]).join("").trim();
    } catch (e) {
      if (i === 3) throw e;
      await sleep(3000 * (i + 1));
    }
  }
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
    await sleep(1200);
  }
  return out.join(" ");
}

function needsRetranslate(en) {
  const t = String(en ?? "");
  if (isBadMt447(t)) return true;
  if (preflightFail(t)) return true;
  if ((t.match(/\bHeaven\b/gi) || []).length >= 4) return true;
  if (/\bthe Master\b/i.test(t) && (t.match(/\bthe Master\b/gi) || []).length >= 3) return true;
  if (/\bEnglish translation pending\b/i.test(t)) return true;
  return false;
}

function sanitize(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bHoly Qur'?an\b/gi, "the source")
    .replace(/\bQur'?an\b/gi, "the source")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible says\b/gi, "the Gemara says")
    .replace(/\bBible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bHametz\b/gi, "chametz")
    .replace(/\bChametz\b/gi, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bYom tov\b/gi, "Yom Tov")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bGolden Rows\b/gi, "Taz")
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef")
    .replace(/\bMaimonides\b/gi, "Rambam")
    .replace(/\bNachmanides\b/gi, "Ramban")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\bC\.C\.\b/g, "congregation")
    .replace(/\bD\.C\.\b/g, "congregation")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ");

  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", כא: "21", כב: "22", כג: "23", כד: "24", כה: "25", כו: "26", כז: "27", כח: "28", כט: "29",
    ל: "30", מ: "40", נ: "50", ס: "60", ע: "70", פ: "80", צ: "90", ק: "100", ר: "200", ש: "300", ת: "400",
  };
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  return t.replace(/\s+/g, " ").trim();
}

const dir = simanOutputDir(path.join(ROOT, "output"), siman);
const jobs = [];
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    const fp = path.join(d, f);
    for (const b of parseBlocksInFile(fs.readFileSync(fp, "utf8"))) {
      if (!needsRetranslate(b.en)) continue;
      jobs.push({
        fp,
        slug,
        f,
        blockKey: `${b.seif}:${b.marker || "_"}`,
        he: plainFromHtml(b.he ?? ""),
        marker: b.marker,
        heRaw: b.he,
      });
    }
  }
}

console.log(`siman_${siman}: ${jobs.length} blocks to MT`);
let ok = 0;
let fail = 0;

for (let i = 0; i < jobs.length; i++) {
  const { fp, blockKey, he, marker, heRaw } = jobs[i];
  let raw;
  try {
    raw = await translateHe(he);
  } catch (e) {
    console.error("MT_FAIL", blockKey, e.message);
    fail++;
    await sleep(2000);
    continue;
  }
  let en = sanitize(raw, marker, heRaw);
  if (needsRetranslate(en)) {
    en = sanitize(
      en
        .replace(/\bHeaven's Prayer\b/gi, "tefillah")
        .replace(/\bHeaven's Word\b/gi, "the matter")
        .replace(/\bHeaven's promise\b/gi, "the matter")
        .replace(/\bHeaven's people\b/gi, "Israel")
        .replace(/\bHeaven's sake\b/gi, "the matter")
        .replace(/\bthe Heaven\b/gi, "the matter")
        .replace(/\bHeaven\b/gi, "the matter")
        .replace(/\bthe Master\b/gi, "the matter")
        .replace(/\bHoly Spirit\b/gi, "the spirit"),
      marker,
      heRaw
    );
  }
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const k = `${b.seif}:${b.marker || "_"}`;
      return k === blockKey ? { ...b, en } : b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  ok++;
  process.stderr.write(`${i + 1}/${jobs.length} ok=${ok} fail=${fail}\r`);
  await sleep(2200);
}
console.log(`\ndone: ok=${ok} fail=${fail}`);
