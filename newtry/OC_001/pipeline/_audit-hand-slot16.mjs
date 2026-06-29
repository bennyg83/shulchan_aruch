#!/usr/bin/env node
/** Audit hand-slot16: which items need real translation vs pass quality */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot16-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot16-siman-${siman}.json`), "utf8")
);

let ok = 0;
let need = 0;
const needList = [];
for (const it of hand.items) {
  const fp = path.join(OUT, `siman_${siman}`, it.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  let en = it.en || autoFix(b?.en ?? it.enBad ?? "", it.marker, it.he || "");
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
    need++;
    needList.push({
      rel: it.rel,
      key: it.key,
      pf,
      issues: issues.map((i) => i.code),
      hePlain: it.hePlain?.slice(0, 120),
      en: en.slice(0, 80),
    });
  } else ok++;
}
console.log(JSON.stringify({ siman, total: hand.items.length, ok, need }, null, 2));
if (process.argv[3] === "--list") {
  console.log(JSON.stringify(needList, null, 2));
}
