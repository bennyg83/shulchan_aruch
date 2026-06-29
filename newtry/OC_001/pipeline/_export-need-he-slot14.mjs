#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const all = [];

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
      const fp = path.join(OUT, `siman_${siman}`, it.rel);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      const b = blocks.find(
        (x) =>
          String(x.seif) === String(it.seif) &&
          String(x.marker || "_") === String(it.marker || "_")
      );
      all.push({
        siman,
        key: `${it.rel}|${it.key}`,
        rel: it.rel,
        blockKey: it.key,
        marker: it.marker,
        seif: it.seif,
        pf,
        issues: issues.map((i) => i.code),
        he: b?.he ?? it.he,
        hePlain: plainFromHtml(b?.he ?? it.he),
      });
    }
  }
}
const outPath = path.join(__dirname, "work", "slot14-need-he.json");
fs.writeFileSync(outPath, JSON.stringify(all, null, 2), "utf8");
console.log("wrote", all.length, "to", outPath);
