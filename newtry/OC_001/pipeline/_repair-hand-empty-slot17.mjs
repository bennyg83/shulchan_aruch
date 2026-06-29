#!/usr/bin/env node
/** Re-seed items with empty en from enBad; report still empty */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot17-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const from = parseInt(process.argv[2], 10) || 634;
const to = parseInt(process.argv[3], 10) || from;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (let siman = from; siman <= to; siman++) {
  const p = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
  if (!fs.existsSync(p)) continue;
  const hand = JSON.parse(fs.readFileSync(p, "utf8"));
  let fixed = 0;
  const still = [];
  for (const it of hand.items) {
    if (it.en && it.en.length >= 8) continue;
    let en = autoFix(it.enBad || "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const sev = maxSeverity(
      runBlockQualityChecks({
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        he: it.he,
        en,
      })
    );
    if (!pf && sev < SEVERITY.warn) {
      it.en = en;
      fixed++;
    } else {
      still.push(`${it.rel} ${it.key}`);
    }
  }
  fs.writeFileSync(p, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: repaired ${fixed} still need ${still.length}`);
  if (still.length) still.forEach((s) => console.log(" ", s));
}
