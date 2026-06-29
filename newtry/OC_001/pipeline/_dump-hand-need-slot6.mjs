#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot6-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot6-siman-${siman}.json`), "utf8")
);
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
  if (!it.en && (pf || sev >= SEVERITY.warn)) {
    console.log("\n===", it.rel, it.key, issues.map((i) => i.code).join(","), "===");
    console.log(it.hePlain);
  }
}
