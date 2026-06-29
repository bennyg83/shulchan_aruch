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
const needs = [];
for (const it of hand.items) {
  const en = it.en || autoFix(it.enBad ?? "", it.marker, it.he ?? "");
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
    needs.push({
      rel: it.rel,
      key: it.key,
      pf,
      issues: issues.map((i) => i.code),
      hePlain: (it.hePlain || "").slice(0, 200),
      en: en.slice(0, 120),
    });
  }
}
console.log(JSON.stringify({ siman, count: needs.length, needs }, null, 2));
