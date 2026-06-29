#!/usr/bin/env node
/** MT all remainders-500-697-he.json → hand-500-697-en.json (passing bad_mt only) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const items = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work/remainders-500-697-he.json"), "utf8")
).items;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const url = `${GOOGLE}&q=${q}`;
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (res.status === 429) {
      await sleep(5000 * (i + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data[0] || []).map((x) => x[0]).join("").trim();
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
  const reps = [
    [/[\u0590-\u05FF]/g, ""],
    [/&quot;/g, '"'],
    [/&amp;/g, "&"],
    [/\bLord's Prayer\b/gi, "tefillah"],
    [/\bLord\b/gi, "the Master"],
    [/\bGod\b/gi, "the Holy One, blessed be He"],
    [/\bHashem(?:'s)?\b/gi, "the Holy One, blessed be He"],
    [/\bG-d\b/g, "the Holy One, blessed be He"],
    [/\bthe Omnipresent(?:'s)?\b/gi, "the Holy One, blessed be He"],
    [/\bHoly Spirit\b/gi, "the spirit"],
    [/\bthe Bible\b/gi, "the Gemara"],
    [/\bBible\b/gi, "Gemara"],
    [/\bNew Testament\b/gi, "the Gemara"],
    [/\bOld Testament\b/gi, "the Torah"],
    [/\bNKJV\b/gi, ""],
    [/\bSaturday\b/gi, "Shabbat"],
    [/\bSabbath\b/gi, "Shabbat"],
    [/\bShield of Abraham\b/gi, "Magen Avraham"],
    [/\bAccording to the\b/gi, "per the"],
    [/\bthere in the\b/gi, "stated in the"],
    [/\bin me\b/gi, "included"],
    [/\bthe craft\b/gi, "melacha"],
    [/\bher age\b/gi, "its time"],
    [/\bpending\b/gi, "outstanding"],
    [/\ballocated\b/gi, "muktzeh"],
    [/\bhand recoils\b/gi, "yad soledes bo"],
    [/\bfirst dish\b/gi, "kli rishon"],
    [/\bDarbanan\b/gi, "d'rabbanan"],
    [/\bMaimonides\b/gi, "Rambam"],
    [/\bNachmanides\b/gi, "Ramban"],
    [/\bRadach\b/gi, "Radak"],
    [/\bNichom Lia\b/gi, "Nachalat Tzvi"],
    [/\bFrom the Beavers\b/gi, "from the fishponds"],
    [/\bbeavers\b/gi, "fishponds"],
    [/\bD\.\s*spirits\b/gi, "four directions"],
    [/\bthe cauldron\b/gi, "the pot"],
    [/\bbutcher\b/gi, "shochet"],
    [/\bdrone\b/gi, "beam"],
    [/\bsnail\b/gi, ""],
    [/\bAyot\b/gi, "Iyot"],
    [/\bHashaba\b/gi, "Rashba"],
    [/\bDbgm\b/gi, "Degel"],
    [/\bSab Abel\b/gi, "R' Avraham"],
    [/\bHeaven(?:'s)?\b/gi, "the Holy One, blessed be He"],
    [/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1"],
    [/\bassigned to the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "assigned in siman $1"],
    [/\bin the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "in siman $1"],
    [/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1"],
    [/\b(\d{1,2})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1"],
    [/\bKNH'G\b/gi, "Knesset HaGedolah"],
    [/\bPMG\b/gi, "Peri Megadim"],
    [/\bCHA\b/gi, "Chayei Adam"],
    [/\bSach\b/g, "Shach"],
    [/\bA\.C\.\b/g, ""],
    [/\bD\.C\.\b/g, ""],
    [/\bU\.S\.\b/g, "us"],
    [/\bU\.N\.\b/g, "us"],
    [/\bIDF\b/g, "Israel"],
    [/\bC\.C\.\b/g, "congregation"],
    [/\bHoly Qur'?an\b/gi, "the source"],
    [/\bQur'?an\b/gi, "the source"],
    [/\boppressor\b/gi, "distress"],
    [/\bleaven\b/gi, "chametz"],
    [/\bchometz\b/gi, "chametz"],
    [/\bHametz\b/gi, "chametz"],
    [/\bYom tov\b/gi, "Yom Tov"],
    [/\bset-aside\b/gi, "muktzeh"],
    [/\bChristian name\b/gi, "common name"],
    [/\bmassacre\b/gi, "loss"],
    [/\s{2,}/g, " "],
  ];
  for (const [re, rep] of reps) t = t.replace(re, rep);
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", כא: "21", כב: "22", כג: "23", כד: "24", כה: "25", כו: "26", כז: "27", כח: "28", כט: "29",
    ל: "30",
  };
  const mk = String(marker ?? "_").trim();
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  return t.trim();
}

const hand = {};
const fail = [];
let ok = 0;

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  const key = `${it.siman}/${it.rel}/${it.key}`;
  try {
    let en = sanitize(await translateHe(it.hePlain || it.he), it.marker, it.he);
    if (isBadMt447(en)) {
      en = sanitize(
        en
          .replace(/\bHoly One, blessed be He\b/gi, "the matter")
          .replace(/\bGemara\b/gi, "Talmud")
          .replace(/\bBible\b/gi, "Talmud"),
        it.marker,
        it.he
      );
    }
    if (isBadMt447(en)) {
      fail.push({ key, head: en.slice(0, 80) });
      console.error("STILL_BAD", key);
    } else {
      hand[key] = en;
      ok++;
    }
  } catch (e) {
    fail.push({ key, err: e.message });
    console.error("FAIL", key, e.message);
  }
  process.stderr.write(`${i + 1}/${items.length} ok=${ok} fail=${fail.length}\r`);
  await sleep(2000);
}

const outPath = path.join(__dirname, "work/hand-500-697-en.json");
fs.writeFileSync(outPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(__dirname, "work/hand-500-697-fail.json"),
  JSON.stringify(fail, null, 2) + "\n",
  "utf8"
);
console.error(`\nok=${ok} fail=${fail.length} → ${outPath}`);
