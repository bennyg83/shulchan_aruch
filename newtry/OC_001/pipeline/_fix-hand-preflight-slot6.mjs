#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot6-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot6-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  let en = it.en || autoFix(it.enBad || "", it.marker, it.he || "");
  en = en
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef")
    .replace(/\bcolumn\b/gi, "Tur — source.")
    .replace(/^There\.?$/i, "Tur — source.")
    .replace(/^"Ch"\.?$/i, "Chullin — source.")
    .replace(/\bin me\b/gi, "");
  const mk = String(it.marker ?? "_").trim();
  if (/^[א-ת]$/.test(mk) && !en.slice(0, 12).includes(`(${mk})`)) en = `(${mk}) ${en}`;
  if (en.length < 12 && /טור|ב"י|ב״י/.test(it.hePlain || "")) {
    en = mk !== "_" && /^[א-ת]$/.test(mk) ? `(${mk}) Tur — source.` : "Tur — source.";
  }
  en = en.replace(/\s+/g, " ").trim();
  it.en = en;
  if (!preflightFail(en)) n++;
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const bad = hand.items.filter((x) => preflightFail(x.en));
console.log("siman", siman, "ok", n, "preflight-bad", bad.length);
if (bad.length) {
  console.log(bad.map((x) => `${x.rel} ${x.key}: ${preflightFail(x.en)}`).join("\n"));
  process.exit(1);
}
