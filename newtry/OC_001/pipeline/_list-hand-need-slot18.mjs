#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`), "utf8")
);
const need = [];
for (const it of hand.items) {
  const en = autoFix(it.en || "", it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  if (!it.en || !String(it.en).trim() || pf || maxSeverity(issues) >= SEVERITY.error) {
    need.push({ rel: it.rel, key: it.key, marker: it.marker, hePlain: it.hePlain || it.he });
  }
}
console.log(JSON.stringify(need, null, 2));
