#!/usr/bin/env node
/** Seed hand-slot5 items[].en from autoFix(enBad) — reports failures */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot5-lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _seed-hand-en-autofix.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot5-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const fails = [];
let ok = 0;
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
  const bad = issues.filter((x) => x.severity === "error" || x.severity === "warn");
  if (pf || bad.length) {
    fails.push({ rel: it.rel, key: it.key, pf, bad: bad.map((x) => x.code), en: en.slice(0, 60) });
  } else {
    it.en = en;
    ok++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("siman", siman, "seeded ok", ok, "fails", fails.length);
if (fails.length) {
  console.log(JSON.stringify(fails.slice(0, 15), null, 2));
  process.exit(1);
}
