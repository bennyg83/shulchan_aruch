#!/usr/bin/env node
/** Generate slot14 pipeline scripts from slot13 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-14";

const CORE = [
  "_slot13-lib.mjs",
  "_export-he-slot13.mjs",
  "_inject-hand-en-slot13.mjs",
  "_gen-fixes-siman-slot13-from-en.mjs",
  "_audit-hand-slot13.mjs",
  "_build-slot13-siman.mjs",
  "_finalize-siman-slot13.mjs",
  "_preflight-fix-siman-slot13.mjs",
  "_checkpoint-remaining-slot13.mjs",
  "_force-seed-hand-slot13.mjs",
  "_seed-hand-slot13-partial.mjs",
  "_fix-hand-preflight-slot13.mjs",
  "_run-one-siman-slot13.mjs",
  "_apply-fixes-slot13.mjs",
  "_complete-siman-slot13.mjs",
  "_build-fixes-slot13.mjs",
  "_gen-fixes-from-hand-slot13.mjs",
  "_merge-hand-slot13.mjs",
  "_gen-fixes-hand-en-slot13.mjs",
  "_apply-hand-patches-output-slot13.mjs",
  "_run-simanim-slot13.mjs",
  "_finish-siman-slot13.mjs",
  "_bootstrap-hand-slot13.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-13", WORKER)
    .replaceAll("hand-slot13", "hand-slot14")
    .replaceAll("_slot13-lib.mjs", "_slot14-lib.mjs")
    .replaceAll("-slot13", "-slot14")
    .replaceAll("slot13", "slot14");
  const outName = name.replaceAll("slot13", "slot14");
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
