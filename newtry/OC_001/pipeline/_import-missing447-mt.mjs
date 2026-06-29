#!/usr/bin/env node
/** Draft-translate he447-missing-p{1,2,3}.json → siman447-part{N}.json via Google gtx */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = Number(process.argv[2] || 0);
const parts = part ? [part] : [1, 2, 3];

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateHe(text) {
  const q = encodeURIComponent(text.slice(0, 4500));
  const url = `${GOOGLE_URL}&q=${q}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (r.status === 429) {
      await new Promise((res) => setTimeout(res, 3000 * (attempt + 1)));
      continue;
    }
    if (!r.ok) throw new Error(`translate ${r.status}`);
    const data = await r.json();
    return (data[0] || []).map((x) => x[0]).join("").trim();
  }
  throw new Error("translate 429 exhausted");
}

function sanitizeEn(en) {
  return en
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bHametz\b/g, "chametz")
    .replace(/\bchometz\b/gi, "chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bHashem\b/g, "")
    .replace(/\bLord'?s Prayer\b/gi, "")
    .replace(/\bRema:\s*/g, "{Rama: ")
    .replace(/\bRama:\s*Rama:/g, "{Rama:")
    .replace(/(\{Rama:[^}]+)\)(?!\})/g, "$1}")
    .trim();
}

for (const pn of parts) {
  const missPath = path.join(__dirname, `he447-missing-p${pn}.json`);
  if (!fs.existsSync(missPath)) {
    console.log(`part${pn}: no missing file`);
    continue;
  }
  const missing = JSON.parse(fs.readFileSync(missPath, "utf8"));
  const handPath = path.join(__dirname, `siman447-part${pn}.json`);
  const hand = fs.existsSync(handPath) ? JSON.parse(fs.readFileSync(handPath, "utf8")) : {};
  let n = 0;
  for (let i = 0; i < missing.length; i++) {
    const { key, he } = missing[i];
    if (hand[key] && !isBadMt447(hand[key])) continue;
    const plain = plainFromHtml(he);
    if (!plain.trim()) continue;
    process.stdout.write(`part${pn} ${i + 1}/${missing.length} ${key}\n`);
    try {
      const en = sanitizeEn(await translateHe(plain));
      if (en.length >= 12) {
        hand[key] = en;
        n++;
        fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");
      }
    } catch (e) {
      console.error("fail", key, e.message);
    }
    await new Promise((r) => setTimeout(r, 2500));
  }
  console.log(`part${pn}: wrote ${n} entries, total ${Object.keys(hand).length}`);
}
