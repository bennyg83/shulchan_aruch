#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY, plainFromHtml } from "./lib/quality-checks.mjs";

const simanim = [552, 553, 554, 555, 556, 557, 558];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = [];

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
      out.push({
        siman,
        rel: it.rel,
        key: it.key,
        marker: it.marker,
        slug: it.slug,
        seif: it.seif,
        he: it.he,
        hePlain: plainFromHtml(it.he),
      });
    }
  }
}
const p = path.join(__dirname, "work", "need-he-552-558.json");
fs.writeFileSync(p, JSON.stringify(out, null, 2));
console.log("wrote", p, "count", out.length);
