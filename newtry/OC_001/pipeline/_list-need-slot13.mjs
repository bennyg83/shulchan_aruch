#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot13-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const siman of simanim) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`), "utf8")
  );
  const need = [];
  for (const it of hand.items) {
    let en = it.en || autoFix(it.enBad || "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en,
    });
    const sev = maxSeverity(issues);
    if (!it.en || pf || sev >= SEVERITY.warn) {
      need.push({
        rel: it.rel,
        key: it.key,
        marker: it.marker,
        pf,
        issues: issues.map((i) => i.code),
        hePlain: it.hePlain,
        enBad: (it.enBad || "").slice(0, 100),
        en: it.en ? en.slice(0, 100) : null,
      });
    }
  }
  console.log(JSON.stringify({ siman, need: need.length, items: need }, null, 2));
}
