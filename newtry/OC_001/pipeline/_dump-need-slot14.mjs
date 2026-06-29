#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const all = [];

for (const siman of simanim) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`), "utf8")
  );
  for (const it of hand.items) {
    const en = it.en || autoFix(it.enBad || "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en,
    });
    if (pf || maxSeverity(issues) >= SEVERITY.warn) {
      all.push({
        siman,
        rel: it.rel,
        key: it.key,
        marker: it.marker,
        pf,
        issues: issues.map((i) => i.code),
        hePlain: plainFromHtml(it.he),
        enBad: en.slice(0, 200),
      });
    }
  }
}
console.log(JSON.stringify(all, null, 2));
