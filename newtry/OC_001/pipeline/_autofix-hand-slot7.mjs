#!/usr/bin/env node
/** Apply autoFix to hand JSON en from current output; report preflight failures */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot7-lib.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _autofix-hand-slot7.mjs <siman>");

const handPath = path.join(__dirname, "work", `hand-slot7-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let pfFail = 0;
let qFail = 0;
for (const it of hand.items) {
  const rel = it.rel || it.file?.replace(/^siman_\d+\//, "");
  const file = it.file || `siman_${siman}/${rel}`;
  const fp = path.join(OUT, file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  let en = autoFix(b?.en ?? "", it.marker, b?.he ?? "");
  it.en = en;
  const pf = preflightFail(en);
  if (pf) {
    pfFail++;
    if (pfFail <= 8) console.log("PF", rel, it.key, pf, en.slice(0, 50));
  }
  const issues = runBlockQualityChecks({ slug: it.slug, seif: it.seif, marker: it.marker, he: b?.he ?? "", en });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error" || sev === "warn") {
    qFail++;
    if (qFail <= 5) console.log("Q", rel, it.key, issues.map((i) => i.code).join(","));
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("siman", siman, "items", hand.items.length, "preflight-fail", pfFail, "quality-warn+", qFail);
