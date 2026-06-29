#!/usr/bin/env node
/** Generate slot13 pipeline scripts from slot12 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-13";

const CORE = [
  "_slot12-lib.mjs",
  "_export-he-slot12.mjs",
  "_inject-hand-en-slot12.mjs",
  "_gen-fixes-siman-slot12-from-en.mjs",
  "_audit-hand-slot12.mjs",
  "_build-slot12-siman.mjs",
  "_finalize-siman-slot12.mjs",
  "_preflight-fix-siman-slot12.mjs",
  "_checkpoint-remaining-slot12.mjs",
  "_force-seed-hand-slot12.mjs",
  "_seed-hand-slot12-partial.mjs",
  "_fix-hand-preflight-slot12.mjs",
  "_run-one-siman-slot12.mjs",
  "_apply-fixes-slot12.mjs",
  "_complete-siman-slot12.mjs",
  "_build-fixes-slot12.mjs",
  "_gen-fixes-from-hand-slot12.mjs",
  "_merge-hand-slot12.mjs",
  "_gen-fixes-hand-en-slot12.mjs",
  "_apply-hand-patches-output-slot12.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-12", WORKER)
    .replaceAll("hand-slot12", "hand-slot13")
    .replaceAll("_slot12-lib.mjs", "_slot13-lib.mjs")
    .replaceAll("-slot12", "-slot13")
    .replaceAll("slot12", "slot13");
  const outName = name.replaceAll("slot12", "slot13");
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
