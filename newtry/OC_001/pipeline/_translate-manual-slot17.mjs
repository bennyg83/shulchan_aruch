#!/usr/bin/env node
/** Google-translate manual-need hand-slot17 blocks, autoFix, inject if quality passes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot17-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateHe(text) {
  const q = encodeURIComponent(text.slice(0, 4500));
  const res = await fetch(`${GOOGLE_URL}&q=${q}`);
  if (!res.ok) throw new Error(`google ${res.status}`);
  const data = await res.json();
  return (data[0] || []).map((x) => x[0]).join("");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const from = parseInt(process.argv[2], 10) || 634;
const to = parseInt(process.argv[3], 10) || from;
const ms = Number(process.argv[4]) || 800;

for (let siman = from; siman <= to; siman++) {
  const handPath = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) continue;
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let done = 0;
  let fail = 0;
  for (const it of hand.items) {
    if (it.en && it.en.length >= 8) continue;
    const src = (it.hePlain || it.he || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!src) continue;
    try {
      let en = await translateHe(src);
      en = autoFix(en, it.marker, it.he || "");
      const pf = preflightFail(en);
      const issues = runBlockQualityChecks({
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        he: it.he,
        en,
      });
      const sev = maxSeverity(issues);
      if (!pf && sev < SEVERITY.warn) {
        it.en = en;
        done++;
      } else {
        fail++;
        console.error("quality fail", siman, it.rel, it.key, pf, issues.map((i) => i.code).join(","));
      }
    } catch (e) {
      fail++;
      console.error("translate err", siman, it.rel, it.key, e.message);
    }
    await sleep(ms);
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const miss = hand.items.filter((x) => !x.en || x.en.length < 8).length;
  console.log(`siman ${siman}: translated ${done} quality-fail ${fail} still missing ${miss}`);
}
