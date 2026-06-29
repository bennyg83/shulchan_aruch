#!/usr/bin/env node
/** Generate slot11 pipeline scripts from slot10 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-11";

const CORE = [
  "_slot10-lib.mjs",
  "_export-he-slot10.mjs",
  "_inject-hand-en-slot10.mjs",
  "_gen-fixes-siman-slot10-from-en.mjs",
  "_audit-hand-slot10.mjs",
  "_build-slot10-siman.mjs",
  "_finalize-siman-slot10.mjs",
  "_preflight-fix-siman-slot10.mjs",
  "_checkpoint-remaining-slot10.mjs",
  "_force-seed-hand-slot10.mjs",
  "_seed-hand-slot10-partial.mjs",
  "_fix-hand-preflight-slot10.mjs",
  "_run-one-siman-slot10.mjs",
  "_apply-fixes-slot10.mjs",
  "_complete-siman-slot10.mjs",
  "_build-fixes-slot10.mjs",
  "_gen-fixes-from-hand-slot10.mjs",
  "_merge-hand-slot10.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-10", WORKER)
    .replaceAll("hand-slot10", "hand-slot11")
    .replaceAll("_slot10-lib.mjs", "_slot11-lib.mjs")
    .replaceAll("-slot10", "-slot11")
    .replaceAll("slot10", "slot11");
  const outName = name.replaceAll("slot10", "slot11");
  return [outName, out];
}

for (const name of CORE) {
  const src = path.join(__dirname, name);
  if (!fs.existsSync(src)) {
    console.error("missing", name);
    continue;
  }
  const [outName, body] = xform(name, fs.readFileSync(src, "utf8"));
  fs.writeFileSync(path.join(__dirname, outName), body, "utf8");
  console.log("wrote", outName);
}

console.log("done");
