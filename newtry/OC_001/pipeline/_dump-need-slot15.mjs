#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot15-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

for (const siman of simanim) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`), "utf8")
  );
  const need = [];
  for (const it of hand.items) {
    if (it.en) continue;
    const fp = path.join(OUT, `siman_${siman}`, it.rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    let en = autoFix(b?.en ?? it.enBad ?? "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en,
    });
    if (pf || maxSeverity(issues) >= SEVERITY.warn) {
      need.push({
        rel: it.rel,
        key: it.key,
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        pf,
        issues: issues.map((i) => i.code),
        hePlain: it.hePlain,
        enBad: (b?.en ?? it.enBad ?? "").slice(0, 200),
      });
    }
  }
  const out = path.join(__dirname, "work", `need-dump-slot15-${siman}.json`);
  fs.writeFileSync(out, JSON.stringify(need, null, 2) + "\n", "utf8");
  console.log("siman", siman, "need", need.length, "->", out);
}
