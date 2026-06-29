#!/usr/bin/env node
/** One-time: clone slot6 worker scripts → slot7 (hand-slot7, _slot7-lib, etc.) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAIRS = [
  ["_slot6-lib.mjs", "_slot7-lib.mjs"],
  ["_export-he-slot6.mjs", "_export-he-slot7.mjs"],
  ["_preflight-fix-siman-slot6.mjs", "_preflight-fix-siman-slot7.mjs"],
  ["_build-slot6-siman.mjs", "_build-slot7-siman.mjs"],
  ["_checkpoint-remaining-slot6.mjs", "_checkpoint-remaining-slot7.mjs"],
  ["_finalize-siman-slot6.mjs", "_finalize-siman-slot7.mjs"],
  ["_run-slot6-siman-loop.mjs", "_run-slot7-siman-loop.mjs"],
  ["_seed-hand-en-autofix-slot6.mjs", "_seed-hand-en-autofix-slot7.mjs"],
  ["_inject-hand-en-slot6.mjs", "_inject-hand-en-slot7.mjs"],
  ["_autofix-hand-slot6.mjs", "_autofix-hand-slot7.mjs"],
  ["_audit-hand-slot6.mjs", "_audit-hand-slot7.mjs"],
  ["_seed-hand-slot6-partial.mjs", "_seed-hand-slot7-partial.mjs"],
  ["_inject-hand-json-slot6.mjs", "_inject-hand-json-slot7.mjs"],
  ["_force-seed-hand-slot6.mjs", "_force-seed-hand-slot7.mjs"],
  ["_fix-hand-preflight-slot6.mjs", "_fix-hand-preflight-slot7.mjs"],
  ["_mark-siman-slot6-complete.mjs", "_mark-siman-slot7-complete.mjs"],
  ["_run-siman-slot6.mjs", "_run-siman-slot7.mjs"],
  ["_autofill-hand-slot6.mjs", "_autofill-hand-slot7.mjs"],
];

function xform(text) {
  return text
    .replace(/worker-slot-6/g, "worker-slot-7")
    .replace(/hand-slot6/g, "hand-slot7")
    .replace(/_slot6-lib/g, "_slot7-lib")
    .replace(/slot6/g, "slot7")
    .replace(/Slot6/g, "Slot7");
}

for (const [src, dst] of PAIRS) {
  const sp = path.join(__dirname, src);
  const dp = path.join(__dirname, dst);
  if (!fs.existsSync(sp)) {
    console.warn("skip missing", src);
    continue;
  }
  fs.writeFileSync(dp, xform(fs.readFileSync(sp, "utf8")), "utf8");
  console.log("wrote", dst);
}
