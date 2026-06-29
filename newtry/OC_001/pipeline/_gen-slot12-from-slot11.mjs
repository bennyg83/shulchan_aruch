#!/usr/bin/env node
/** Generate slot12 pipeline scripts from slot11 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-12";

const CORE = [
  "_slot11-lib.mjs",
  "_export-he-slot11.mjs",
  "_inject-hand-en-slot11.mjs",
  "_gen-fixes-siman-slot11-from-en.mjs",
  "_audit-hand-slot11.mjs",
  "_build-slot11-siman.mjs",
  "_finalize-siman-slot11.mjs",
  "_preflight-fix-siman-slot11.mjs",
  "_checkpoint-remaining-slot11.mjs",
  "_force-seed-hand-slot11.mjs",
  "_seed-hand-slot11-partial.mjs",
  "_fix-hand-preflight-slot11.mjs",
  "_run-one-siman-slot11.mjs",
  "_apply-fixes-slot11.mjs",
  "_complete-siman-slot11.mjs",
  "_build-fixes-slot11.mjs",
  "_gen-fixes-from-hand-slot11.mjs",
  "_merge-hand-slot11.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-11", WORKER)
    .replaceAll("hand-slot11", "hand-slot12")
    .replaceAll("_slot11-lib.mjs", "_slot12-lib.mjs")
    .replaceAll("-slot11", "-slot12")
    .replaceAll("slot11", "slot12");
  const outName = name.replaceAll("slot11", "slot12");
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
