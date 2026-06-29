#!/usr/bin/env node
/** One-time: clone slot5 worker scripts → slot6 (hand-slot6, _slot6-lib, etc.) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAIRS = [
  ["_slot5-lib.mjs", "_slot6-lib.mjs"],
  ["_export-he-slot5.mjs", "_export-he-slot6.mjs"],
  ["_preflight-fix-siman-slot5.mjs", "_preflight-fix-siman-slot6.mjs"],
  ["_build-slot5-siman.mjs", "_build-slot6-siman.mjs"],
  ["_checkpoint-remaining-slot5.mjs", "_checkpoint-remaining-slot6.mjs"],
  ["_finalize-siman-slot5.mjs", "_finalize-siman-slot6.mjs"],
  ["_run-slot5-siman-loop.mjs", "_run-slot6-siman-loop.mjs"],
  ["_seed-hand-en-autofix.mjs", "_seed-hand-en-autofix-slot6.mjs"],
  ["_inject-hand-en.mjs", "_inject-hand-en-slot6.mjs"],
  ["_autofix-hand-slot5.mjs", "_autofix-hand-slot6.mjs"],
  ["_audit-hand-slot5.mjs", "_audit-hand-slot6.mjs"],
];

function xform(text) {
  return text
    .replace(/worker-slot-5/g, "worker-slot-6")
    .replace(/hand-slot5/g, "hand-slot6")
    .replace(/_slot5-lib/g, "_slot6-lib")
    .replace(/slot5/g, "slot6")
    .replace(/Slot5/g, "Slot6");
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
