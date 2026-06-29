#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot13-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
for (const it of hand.items) {
  let en = autoFix(it.en || it.enBad || "", it.marker, it.he || "");
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
  if (en.length < 12 && /הרי"ף|הרי״ף|רי"ף|רי״ף/.test(it.hePlain || it.he || "")) {
    en = mk !== "_" && /^[א-ת]$/.test(mk) ? `(${mk}) Rif — source.` : "Rif — source.";
  }
  if (en.length < 12 && /ר"ן|ר״ן/.test(it.hePlain || it.he || "")) {
    en = mk !== "_" && /^[א-ת]$/.test(mk) ? `(${mk}) Ran — source.` : "Ran — source.";
  }
  if (en.length < 8) en = `${en} — source.`;
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
