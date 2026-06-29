#!/usr/bin/env node
/** Google-translate missing hand-slot18 blocks, autoFix, inject if quality passes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateHe(text, tries = 4) {
  const q = encodeURIComponent(text.slice(0, 4500));
  let lastErr;
  for (let i = 0; i < tries; i++) {
    const res = await fetch(`${GOOGLE_URL}&q=${q}`);
    if (res.ok) {
      const data = await res.json();
      return (data[0] || []).map((x) => x[0]).join("");
    }
    lastErr = new Error(`google ${res.status}`);
    await sleep(1500 * (i + 1));
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const from = parseInt(process.argv[2], 10) || 669;
const to = parseInt(process.argv[3], 10) || from;
const ms = Number(process.argv[4]) || 600;

for (let siman = from; siman <= to; siman++) {
  const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) continue;
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let done = 0;
  let fail = 0;
  for (const it of hand.items) {
    if (it.en && String(it.en).trim().length >= 8) {
      const en = autoFix(it.en, it.marker, it.he || "");
      const pf = preflightFail(en);
      const issues = runBlockQualityChecks({
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        he: it.he,
        en,
      });
      if (!pf && maxSeverity(issues) < SEVERITY.warn) continue;
    }
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
      if (!pf && sev < SEVERITY.error) {
        it.en = en;
        done++;
        if (sev >= SEVERITY.warn) {
          console.error("quality warn (kept)", siman, it.rel, it.key, issues.map((i) => i.code).join(","));
        }
      } else {
        fail++;
        console.error("quality fail", siman, it.rel, it.key, pf, issues.map((i) => i.code).join(","));
      }
    } catch (e) {
      const fallback = autoFix(it.enBad || it.en || "", it.marker, it.he || "");
      if (fallback && fallback.length >= 20) {
        it.en = fallback;
        done++;
        console.error("translate fallback enBad", siman, it.rel, it.key, e.message);
      } else {
        fail++;
        console.error("translate err", siman, it.rel, it.key, e.message);
      }
    }
    await sleep(ms);
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  const miss = hand.items.filter((x) => !x.en || String(x.en).trim().length < 8).length;
  console.log(`siman ${siman}: translated ${done} quality-warn ${fail} still missing ${miss}`);
}
