#!/usr/bin/env node
/** Chunked Google translate for hand items still missing en */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";
const CHUNK = 1200;

async function translateHe(text) {
  const q = encodeURIComponent(text);
  const res = await fetch(`${GOOGLE_URL}&q=${q}`);
  if (!res.ok) throw new Error(`google ${res.status}`);
  const data = await res.json();
  return (data[0] || []).map((x) => x[0]).join("");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const lo = Number(process.argv[2]) || 670;
const hi = Number(process.argv[3]) || lo;

for (let siman = lo; siman <= hi; siman++) {
  const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) continue;
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let fixed = 0;
  for (const it of hand.items) {
    if (it.en && String(it.en).trim().length >= 8) continue;
    const src = (it.hePlain || it.he || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!src) continue;
    try {
      const parts = [];
      for (let i = 0; i < src.length; i += CHUNK) {
        parts.push(await translateHe(src.slice(i, i + CHUNK)));
        await sleep(500);
      }
      it.en = autoFix(parts.join(" "), it.marker, it.he || "");
      if (preflightFail(it.en) && src.length < 20) {
        it.en = autoFix(src.includes("ת") && src.includes("ה") ? "Tur" : src, it.marker, it.he || "");
      }
      fixed++;
      console.log("ok", siman, it.rel, it.key, it.en.length);
    } catch (e) {
      console.error("fail", siman, it.rel, it.key, e.message);
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const miss = hand.items.filter((x) => !x.en || String(x.en).trim().length < 8).length;
  console.log("siman", siman, "chunk-fixed", fixed, "still missing", miss);
}
