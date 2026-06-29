#!/usr/bin/env node
/** Try autoFix(enBad) for need blocks; report which still fail quality */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot15-lib.mjs";
import {
  runBlockQualityChecks,
  maxSeverity,
  SEVERITY,
} from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "need-slot15-577-588.json"), "utf8")
);
const FIXES = {};
let ok = 0,
  fail = 0;
for (const it of need) {
  if (it.siman === 577) continue;
  let en = autoFix(it.enBad || it.en || "", it.key.split(":")[1] || "_", it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.rel.split("/")[0],
    seif: it.key.split(":")[0],
    marker: it.key.split(":")[1] || "_",
    he: it.he,
    en,
  });
  const sev = maxSeverity(issues);
  if (!pf && sev < SEVERITY.warn) {
    if (!FIXES[it.rel]) FIXES[it.rel] = {};
    FIXES[it.rel][it.key] = en;
    ok++;
  } else {
    fail++;
    console.log("FAIL", it.siman, it.rel, it.key, pf, issues.map((i) => i.code).join(","));
  }
}
const out = path.join(__dirname, "_fixes-need-autofix-slot15.mjs");
fs.writeFileSync(
  out,
  `/** auto-generated partial fixes */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`,
  "utf8"
);
console.log("ok", ok, "fail", fail, "wrote", out);
