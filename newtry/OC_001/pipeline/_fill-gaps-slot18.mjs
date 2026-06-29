#!/usr/bin/env node
/** Fill only missing/low-quality keys in slot18-translations.json; preserve tr_670/tr_short. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(__dirname, "work");
const NEED = JSON.parse(fs.readFileSync(path.join(WORK, "slot18-need-all.json"), "utf8"));
const OUT = path.join(WORK, "slot18-translations.json");
const QUALITY_PARTS = ["tr_670.json", "tr_short.json", "tr_671.json"].map((f) =>
  path.join(WORK, f)
);

const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";
const CHUNK = 1200;

const GLOSS = [
  [/Shield of Abraham/gi, "Magen Avraham"],
  [/Golden Rows/gi, "Taz"],
  [/House of Joseph/gi, "Beit Yosef"],
  [/Mishna Brurah/gi, "Mishna Berurah"],
  [/Mishnah Brurah/gi, "Mishna Berurah"],
  [/Saturday/gi, "Shabbat"],
  [/\bGod\b/g, "Hashem"],
  [/\bLord\b/g, "Hashem"],
  [/Hanukkah/gi, "Chanukah"],
  [/Hanukah/gi, "Chanukah"],
  [/CChanukah/g, "Chanukah"],
  [/Holy Qur'an/gi, "Tanach"],
  [/Hashem's Prayer/gi, "Hashem"],
  [/According to the/gi, ""],
];

function hasBadHebrew(en) {
  return /(?<![(\[])[\u0590-\u05FF](?![)\]])/.test(en);
}

function isGood(en) {
  const t = (en || "").trim();
  if (t.length < 20) return false;
  if (preflightFail(t)) return false;
  if (/Lord's Prayer|Capernaum|CChanukah|Holy One of the Holy/i.test(t)) return false;
  if (hasBadHebrew(t)) return false;
  return true;
}

function dedupeChunkSeam(text) {
  const t = plainFromHtml(text);
  const minLen = 55;
  for (let len = Math.min(100, Math.floor(t.length / 2)); len >= minLen; len -= 8) {
    for (let i = 0; i <= t.length - len * 2; i++) {
      const slice = t.slice(i, i + len);
      const next = t.indexOf(slice, i + len);
      if (next !== -1 && next - (i + len) < 12) {
        return t.slice(0, next) + t.slice(next + len);
      }
    }
  }
  return text;
}

async function translateHe(text) {
  const parts = [];
  for (let i = 0; i < text.length; i += CHUNK) {
    const slice = text.slice(i, i + CHUNK);
    const q = encodeURIComponent(slice);
    const res = await fetch(`${GOOGLE}&q=${q}`);
    if (!res.ok) throw new Error(`google ${res.status}`);
    const data = await res.json();
    parts.push((data[0] || []).map((x) => x[0]).join(""));
    await new Promise((r) => setTimeout(r, 350));
  }
  return parts.join(" ");
}

function polish(en) {
  let t = en;
  for (const [re, rep] of GLOSS) t = t.replace(re, rep);
  return dedupeChunkSeam(t);
}

let out = {};
if (fs.existsSync(OUT)) {
  try {
    out = JSON.parse(fs.readFileSync(OUT, "utf8"));
  } catch {
    out = {};
  }
}
for (const p of QUALITY_PARTS) {
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [sim, items] of Object.entries(data)) {
    out[sim] = { ...(out[sim] || {}), ...items };
  }
}

const MANUAL = {
  "681|beer-hagolah/part-001.txt|2:_": "Terumat HaDeshen siman 60.",
  "689|beer-hagolah/part-001.txt|4:_": "Orach Chayim.",
  "692|beer-hagolah/part-001.txt|4:_": "Terumat HaDeshen.",
};

let filled = 0;
let skipped = 0;
for (const sim of Object.keys(NEED).sort((a, b) => Number(a) - Number(b))) {
  if (!out[sim]) out[sim] = {};
  for (const it of NEED[sim]) {
    const k = `${it.rel}|${it.key}`;
    const mk = (it.key.split(":")[1] || "_").trim();
    const manualKey = `${sim}|${k}`;
    if (MANUAL[manualKey]) {
      out[sim][k] = MANUAL[manualKey];
      continue;
    }
    if (isGood(out[sim][k])) {
      skipped++;
      continue;
    }
    const src = plainFromHtml(it.hePlain || it.he || "");
    process.stdout.write(`${sim} ${k} (${src.length}) … `);
    let en = await translateHe(src);
    en = polish(en);
    en = autoFix(en, mk, it.he || "");
    out[sim][k] = en;
    filled++;
    console.log(isGood(en) ? "ok" : `warn ${preflightFail(en) || "qc"}`, en.length);
    fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
  }
}
const total = Object.values(NEED).reduce((n, arr) => n + arr.length, 0);
const have = Object.keys(NEED).reduce((n, sim) => {
  return (
    n +
    NEED[sim].filter((it) => {
      const k = `${it.rel}|${it.key}`;
      return (out[sim] || {})[k]?.length >= 15;
    }).length
  );
}, 0);
console.log("filled", filled, "skipped good", skipped, "have", have, "/", total);
