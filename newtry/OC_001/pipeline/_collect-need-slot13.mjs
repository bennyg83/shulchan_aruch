#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot13-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const out = [];

for (const siman of simanim) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`), "utf8")
  );
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
      out.push({
        siman,
        rel: it.rel,
        key: it.key,
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        pf,
        issues: issues.map((i) => i.code),
        hePlain: it.hePlain,
        enBad: (it.enBad || en).slice(0, 300),
      });
    }
  }
}

const outPath = path.join(__dirname, "work", "slot13-need-all.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log("need blocks:", out.length);
