#!/usr/bin/env node
/** Generate slot16 pipeline scripts from slot15 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-16";

const CORE = [
  "_slot15-lib.mjs",
  "_export-he-slot15.mjs",
  "_inject-hand-en-slot15.mjs",
  "_gen-fixes-siman-slot15-from-en.mjs",
  "_audit-hand-slot15.mjs",
  "_build-slot15-siman.mjs",
  "_finalize-siman-slot15.mjs",
  "_preflight-fix-siman-slot15.mjs",
  "_checkpoint-remaining-slot15.mjs",
  "_force-seed-hand-slot15.mjs",
  "_seed-hand-slot15-partial.mjs",
  "_fix-hand-preflight-slot15.mjs",
  "_run-one-siman-slot15.mjs",
  "_apply-fixes-slot15.mjs",
  "_complete-siman-slot15.mjs",
  "_bootstrap-hand-slot15.mjs",
  "_apply-fixes-part.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-15", WORKER)
    .replaceAll("hand-slot15", "hand-slot16")
    .replaceAll("_slot15-lib.mjs", "_slot16-lib.mjs")
    .replaceAll("-slot15", "-slot16")
    .replaceAll("slot15", "slot16");
  const outName = name.replaceAll("slot15", "slot16");
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
