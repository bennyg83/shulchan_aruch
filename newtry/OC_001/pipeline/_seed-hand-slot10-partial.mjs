#!/usr/bin/env node
/** Seed hand-slot10 en from autoFix where preflight+quality pass; report rest */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot10-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot10-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let ok = 0;
const need = [];
for (const it of hand.items) {
  let en = autoFix(it.enBad || "", it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  const sev = maxSeverity(issues);
  if (pf || sev >= SEVERITY.warn) {
    need.push({ rel: it.rel, key: it.key, pf, issues: issues.map((i) => i.code) });
  } else {
    it.en = en;
    ok++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("siman", siman, "seeded", ok, "need manual", need.length);
if (need.length) console.log(JSON.stringify(need, null, 2));
