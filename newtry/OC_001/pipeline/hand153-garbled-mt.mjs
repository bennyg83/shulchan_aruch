#!/usr/bin/env node
/** MT garbled blocks from Hebrew → work/hand153-garbled.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { preflightFail } from "./_slot13-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "work", "hand153-garbled.json");
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const url = `${GOOGLE_URL}&q=${q}`;
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
    if (res.status === 429) {
      await sleep(5000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data[0] || []).map((x) => x[0]).join("").trim();
  }
  throw new Error("translate failed after retries");
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

function sanitize153(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\bMaga\b/gi, "Magen Avraham")
    .replace(/\bMagan\b/gi, "Magen")
    .replace(/\bM\.A\.\b/g, "Magen Avraham")
    .replace(/\bM\. A\. Sec\b/gi, "Magen Avraham s.k.")
    .replace(/\bSkala\b/gi, "s.k.")
    .replace(/\bSkad\b/gi, "s.k. 4")
    .replace(/\bBhak\b/gi, "beit haknesset")
    .replace(/\bBHC\b/g, "beit haknesset")
    .replace(/\bKhanas\b/gi, "beit haknesset")
    .replace(/\bBehkenas\b/gi, "beit haknesset")
    .replace(/\bBhakchi\b/gi, "beit haknesset")
    .replace(/\bHumshin\b/gi, "chumashim")
    .replace(/\bChomshin\b/gi, "chumashim")
    .replace(/\bPentacles\b/gi, "chumashim")
    .replace(/\bPanad\b/gi, "it appears")
    .replace(/\bAkal\b/g, "end of his words")
    .replace(/\bEkal\b/g, "end of his words")
    .replace(/\bDSL\b/g, "meaning")
    .replace(/\bKSHAL\b/g, "siman 152")
    .replace(/\bAAG\b/g, "end of his words")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod\b/gi, "Heaven")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bTorah scroll\b/gi, "sefer Torah")
    .replace(/\bChumash\b/gi, "chumash")
    .replace(/\bstudy hall\b/gi, "beit midrash")
    .replace(/\bsynagogue\b/gi, "beit haknesset")
    .replace(/\bseven distinguished men\b/gi, "seven good men of the city")
    .replace(/\b(\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bsection\s+(\d{1,3})\b/gi, "siman $1")
    .replace(/\bchapter\s+(\d{1,3})\b/gi, "siman $1");
  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", כא: "21", כב: "22", כג: "23", כד: "24", כה: "25", כו: "26", כז: "27", ל: "30", מ: "40", נ: "50",
  };
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/\bRema:\s*/gi, "{Rama: ");
  }
  return t.replace(/\s+/g, " ").trim();
}

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const start = Number(process.argv[2] || 0);
const limit = process.argv[3] ? Number(process.argv[3]) : data.items.length;
const slice = data.items.slice(start, start + limit);

let ok = 0;
let fail = 0;
for (let i = 0; i < slice.length; i++) {
  const it = slice[i];
  const idx = start + i;
  try {
    const raw = await translateHe(it.hePlain);
    let en = sanitize153(raw, it.marker, it.he);
    const pf = preflightFail(en);
    if (pf || isBadMt447(en)) {
      fail++;
      it.en = en;
      it._warn = pf || "bad_mt";
    } else {
      it.en = en;
      delete it._warn;
      ok++;
    }
  } catch (e) {
    console.error(`MT_FAIL ${idx} ${it.rel} ${it.key}:`, e.message);
    fail++;
  }
  process.stderr.write(`hand153-garbled-mt ${idx + 1}/${data.items.length} ok=${ok} fail=${fail}\r`);
  await sleep(1600);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");
console.error(`\nhand153-garbled-mt ${start}-${start + slice.length}: ok=${ok} fail=${fail}`);
