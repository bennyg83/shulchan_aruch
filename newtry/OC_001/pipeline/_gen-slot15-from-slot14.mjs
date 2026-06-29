#!/usr/bin/env node
/** Generate slot15 pipeline scripts from slot14 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-15";

const CORE = [
  "_slot14-lib.mjs",
  "_export-he-slot14.mjs",
  "_inject-hand-en-slot14.mjs",
  "_gen-fixes-siman-slot14-from-en.mjs",
  "_audit-hand-slot14.mjs",
  "_build-slot14-siman.mjs",
  "_finalize-siman-slot14.mjs",
  "_preflight-fix-siman-slot14.mjs",
  "_checkpoint-remaining-slot14.mjs",
  "_force-seed-hand-slot14.mjs",
  "_seed-hand-slot14-partial.mjs",
  "_fix-hand-preflight-slot14.mjs",
  "_run-one-siman-slot14.mjs",
  "_apply-fixes-slot14.mjs",
  "_complete-siman-slot14.mjs",
  "_bootstrap-hand-slot14.mjs",
  "_apply-fixes-part.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-14", WORKER)
    .replaceAll("hand-slot14", "hand-slot15")
    .replaceAll("_slot14-lib.mjs", "_slot15-lib.mjs")
    .replaceAll("-slot14", "-slot15")
    .replaceAll("slot14", "slot15");
  const outName = name.replaceAll("slot14", "slot15");
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
