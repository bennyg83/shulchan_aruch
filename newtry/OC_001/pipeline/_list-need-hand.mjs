#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) simanim.push(559, 560, 561, 562, 563);

for (const s of simanim) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot14-siman-${s}.json`), "utf8")
  );
  const need = [];
  for (const it of hand.items) {
    const fp = path.join(OUT, `siman_${s}`, it.rel);
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
      need.push({
        rel: it.rel,
        key: it.key,
        slug: it.slug,
        seif: it.seif,
        marker: it.marker || "_",
        he: it.he,
        pf,
        issues: issues.map((i) => i.code),
      });
    }
  }
  fs.writeFileSync(
    path.join(__dirname, "work", `need-he-${s}.json`),
    JSON.stringify(need, null, 2) + "\n",
    "utf8"
  );
  console.log(`siman ${s}: need ${need.length} / ${hand.items.length}`);
}
