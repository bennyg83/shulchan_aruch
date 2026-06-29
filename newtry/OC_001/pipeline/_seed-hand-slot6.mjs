#!/usr/bin/env node
/** Seed hand-slot6 items[].en from autoFix(enBad); write needsTranslate list */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot6-lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _seed-hand-slot6.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot6-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const needs = [];
let ok = 0;
for (const it of hand.items) {
  const en = autoFix(it.enBad || "", it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  const bad = issues.filter((x) => x.severity === "error" || x.severity === "warn");
  if (pf || bad.length) {
    needs.push({ rel: it.rel, key: it.key, pf, bad: bad.map((x) => x.code) });
  } else {
    it.en = en;
    ok++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const needsPath = path.join(__dirname, "work", `needs-slot6-siman-${siman}.json`);
fs.writeFileSync(needsPath, JSON.stringify({ siman, ok, needs }, null, 2) + "\n", "utf8");
console.log("siman", siman, "seeded ok", ok, "needs translate", needs.length);
process.exit(needs.length ? 1 : 0);
