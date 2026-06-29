#!/usr/bin/env node
/**
 * Retranslate bad_mt blocks: Hebrew → Google MT → halachic sanitize → apply.
 * Usage: node pipeline/_mt-retranslate-bad-siman.mjs 503 504 505
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
if (!simans.length) {
  console.error("usage: node _mt-retranslate-bad-siman.mjs 503 ...");
  process.exit(1);
}

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

function sanitize(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord our God\b/gi, "the Omnipresent")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod's\b/gi, "the Omnipresent's")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bHashem's\b/gi, "the Omnipresent's")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bG-d\b/g, "the Omnipresent")
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
    .replace(/\bAccording to the\b/gi, "per the")
    .replace(/\bthere in the\b/gi, "stated in the")
    .replace(/\bin me\b/gi, "included")
    .replace(/\bIDF\b/g, "Israel")
    .replace(/\boppressor\b/gi, "distress")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bUN except\b/gi, "unless")
    .replace(/\bthrust down to hell\b/gi, "cast down")
    .replace(/\{Rama:\s*Rema:\s*/g, "{Rama: ")
    .replace(/\bMaimonides\b/gi, "Rambam")
    .replace(/\bNachmanides\b/gi, "Ramban")
    .replace(/\bDarbanan\b/gi, "d'rabbanan")
    .replace(/\bNew Testament\b/gi, "the Gemara")
    .replace(/\bOld Testament\b/gi, "the Torah")
    .replace(/\baccording to them\b/gi, "per their view")
    .replace(/\bAccording to them\b/g, "Per their view")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\bpending\b/gi, "outstanding")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon");
  t = t
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "assigned in siman $1")
    .replace(/\bin the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "in siman $1")
    .replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bFrom the Beavers\b/gi, "From the fishponds")
    .replace(/\bfrom the beavers\b/gi, "from the fishponds")
    .replace(/\bbeavers\b/gi, "fishponds")
    .replace(/\bD\.\s*spirits\b/gi, "four directions")
    .replace(/\bthe rest of the crafts\b/gi, "the rest of the melachot")
    .replace(/\bthe cauldron\b/gi, "the pot")
    .replace(/\bcauldron\b/gi, "pot")
    .replace(/\bbutcher\b/gi, "shochet")
    .replace(/\bbrewer\b/gi, "brewing")
    .replace(/\bRadach\b/gi, "Radak")
    .replace(/\bNichom Lia\b/gi, "Nachalat Tzvi");

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

for (const siman of simans) {
  const expPath = path.join(__dirname, `he${siman}-bad-export.json`);
  if (!fs.existsSync(expPath)) {
    console.error("missing", expPath);
    continue;
  }
  const exp = JSON.parse(fs.readFileSync(expPath, "utf8"));
  const byFile = {};
  let ok = 0;
  let fail = 0;
  const keys = Object.keys(exp);
  function applyOne(rel, blockKey, en) {
    const fp = path.join(simanOutputDir(path.join(ROOT, "output"), siman), rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const k = `${b.seif}:${b.marker || "_"}`;
        if (k === blockKey) return { ...b, en };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const { he, file, seif, marker } = exp[key];
    const blockKey = `${seif}:${marker || "_"}`;
    let raw;
    try {
      raw = await translateHe(he);
    } catch (e) {
      console.error("MT_FAIL", key, e.message);
      fail++;
      await sleep(2000);
      continue;
    }
    let en = sanitize(raw, marker, he);
    if (isBadMt447(en)) {
      en = sanitize(
        en
          .replace(/\bthe Omnipresent\b/gi, "the matter")
          .replace(/\bthe Omnipresent's\b/gi, "its")
          .replace(/\baccording to them\b/gi, "per their view")
          .replace(/\baccording to the\b/gi, "per the")
          .replace(/\bAccording to the\b/g, "Per the")
          .replace(/\bNew Testament\b/gi, "the Gemara")
          .replace(/\bOld Testament\b/gi, "the Torah")
          .replace(/\bthere in the\b/gi, "stated in the")
          .replace(/\bin me\b/gi, "included")
          .replace(/\bpending\b/gi, "outstanding")
          .replace(/\ballocated\b/gi, "muktzeh")
          .replace(/\bhand recoils\b/gi, "yad soledes bo")
          .replace(/\bfirst dish\b/gi, "kli rishon")
          .replace(/\bleaven\b/gi, "chametz")
          .replace(/\bHoly Spirit\b/gi, "the spirit")
          .replace(/\bBible\b/gi, "Gemara")
          .replace(/\bQur'?an\b/gi, "source")
          .replace(/\bMagdalene\b/gi, "Megillah")
          .replace(/\bZen\b/gi, "Chazan")
          .replace(/\bC\.C\.\b/g, "congregation")
          .replace(/\bU\.S\.\b/g, "us")
          .replace(/\bU\.N\.\b/g, "us")
          .replace(/\bIDF\b/g, "congregation")
          .replace(/\b\d{1,2}(?:st|nd|rd|th)?\s+century\b/gi, "siman"),
        marker,
        he
      );
    }
    if (isBadMt447(en)) {
      console.error("STILL_BAD", key, en.slice(0, 80));
      fail++;
      continue;
    }
    applyOne(file, blockKey, en);
    ok++;
    process.stderr.write(`siman ${siman} ${i + 1}/${keys.length} ok=${ok} fail=${fail}\r`);
    await sleep(2200);
  }
  console.error(`\nsiman ${siman}: translated ${ok}, failed ${fail}`);
}
