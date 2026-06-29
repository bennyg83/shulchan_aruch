#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot16-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");

for (const siman of simanim) {
  const hand = JSON.parse(fs.readFileSync(path.join(WORK, `hand-slot16-siman-${siman}.json`), "utf8"));
  const items = [];
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
    if (pf || maxSeverity(issues) >= SEVERITY.warn) {
      items.push({
        rel: it.rel,
        key: it.key,
        slug: it.slug,
        issues: issues.map((i) => i.code),
        pf,
        hePlain: plainFromHtml(it.he || b?.he || ""),
      });
    }
  }
  const p = path.join(WORK, `need-export-siman-${siman}.json`);
  fs.writeFileSync(p, JSON.stringify({ siman, count: items.length, items }, null, 2) + "\n", "utf8");
  console.log("wrote", p, items.length);
}
