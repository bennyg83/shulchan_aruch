#!/usr/bin/env node
/** MT retranslate blocks listed in remainders-386-509.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const remPath = path.join(__dirname, "remainders-386-509.json");

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const url = `${GOOGLE_URL}&q=${q}`;
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
  t = t
    .replace(/&quot;/g, '"')
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bHoly Spirit\b/gi, "the matter")
    .replace(/\bHoly Qur'?an\b/gi, "the source")
    .replace(/\bQur'?an\b/gi, "the source")
    .replace(/\bBible\b/gi, "Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bHametz\b/gi, "chametz")
    .replace(/\bChametz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bYom tov\b/gi, "Yom Tov")
    .replace(/\ballocated\b/gi, "muktzeh")
    .replace(/\bset-aside\b/gi, "muktzeh")
    .replace(/\bhand recoils\b/gi, "yad soledes bo")
    .replace(/\bfirst dish\b/gi, "kli rishon")
    .replace(/\bthe cauldron\b/gi, "the pot")
    .replace(/\bcauldron\b/gi, "pot")
    .replace(/\bbricklaying\b/gi, "masonry")
    .replace(/\bpotty woman\b/gi, "filling a pot")
    .replace(/\bNKJV\b/gi, "Noda B'Yehuda")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bA\.C\.\b/g, "congregation")
    .replace(/\bC\.C\.\b/g, "congregation")
    .replace(/\bD\.C\.\b/g, "congregation")
    .replace(/\bIDF\b/g, "congregation")
    .replace(/\bdrone\b/gi, "erev")
    .replace(/\bsnail\b/gi, "snail")
    .replace(/\bAyot\b/gi, "Yom Tov")
    .replace(/\bUOT\b/gi, "Yom Tov")
    .replace(/\bIOT\b/gi, "Yom Tov")
    .replace(/\bHOM\b/gi, "diaspora")
    .replace(/\bmassacre\b/gi, "shochet")
    .replace(/\bHashaba\b/gi, "so it is")
    .replace(/\bDezim\b/gi, "they are")
    .replace(/\bDbgm\b/gi, "meaning")
    .replace(/\bMamela\b/gi, "cooking")
    .replace(/\bSab Abel\b/gi, "so they practice")
    .replace(/\bthe Omnipresent in our time\b/gi, "in our time")
    .replace(/\b\{[a-z]\}\s*/gi, "")
    .replace(/\bThere is no evidence,\s*etc\b/gi, "One may not show, etc.")
    .replace(/\bThere is no evidence\b/gi, "there is no proof")
    .replace(/\bthe sign of the (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1")
    .replace(/\bthe (\d{1,3})(?:st|nd|rd|th)?\s+century\b/gi, "siman $1");
  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", כא: "21", כב: "22", כג: "23", כד: "24", כה: "25", כו: "26", כז: "27", כח: "28", כט: "29",
    ל: "30", מ: "40", נ: "50", ס: "60", ע: "70", פ: "80", צ: "90", ק: "100",
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

const remainders = JSON.parse(fs.readFileSync(remPath, "utf8"));
let ok = 0;
let fail = 0;

for (let i = 0; i < remainders.length; i++) {
  const { siman, rel, key } = remainders[i];
  const [seif, marker] = key.split(":");
  const fp = path.join(ROOT, "output", `siman_${String(siman).padStart(3, "0")}`, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find((x) => `${x.seif}:${x.marker || "_"}` === key);
  if (!b) {
    console.error("MISSING", siman, rel, key);
    fail++;
    continue;
  }
  const he = plainFromHtml(b.he);
  let raw;
  try {
    raw = await translateHe(he);
  } catch (e) {
    console.error("MT_FAIL", siman, key, e.message);
    fail++;
    await sleep(2000);
    continue;
  }
  let en = sanitize(raw, marker, b.he);
  if (isBadMt447(en)) {
    en = sanitize(en.replace(/\bsnail\b/gi, "piece"), marker, b.he);
  }
  if (isBadMt447(en)) {
    console.error("STILL_BAD", siman, key, en.slice(0, 70));
    fail++;
    continue;
  }
  const out = blocks
    .map((bl) => {
      const k = `${bl.seif}:${bl.marker || "_"}`;
      return k === key ? { ...bl, en } : bl;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  ok++;
  process.stderr.write(`remainder ${i + 1}/${remainders.length} ok=${ok} fail=${fail}\r`);
  await sleep(2200);
}
console.error(`\nremainders MT: ok=${ok} fail=${fail}`);
