#!/usr/bin/env node
/** Generate slot18 pipeline scripts from slot17 templates */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKER = "worker-slot-18";

const CORE = [
  "_slot17-lib.mjs",
  "_export-he-slot17.mjs",
  "_inject-hand-en-slot17.mjs",
  "_gen-fixes-siman-slot17-from-en.mjs",
  "_audit-hand-slot17.mjs",
  "_build-slot17-siman.mjs",
  "_finalize-siman-slot17.mjs",
  "_preflight-fix-siman-slot17.mjs",
  "_checkpoint-remaining-slot17.mjs",
  "_force-seed-hand-slot17.mjs",
  "_seed-hand-slot17-partial.mjs",
  "_fix-hand-preflight-slot17.mjs",
  "_run-one-siman-slot17.mjs",
  "_apply-fixes-slot17.mjs",
  "_complete-siman-slot17.mjs",
  "_bootstrap-hand-slot17.mjs",
  "_apply-fixes-part.mjs",
];

function xform(name, text) {
  let out = text
    .replaceAll("worker-slot-17", WORKER)
    .replaceAll("hand-slot17", "hand-slot18")
    .replaceAll("_slot17-lib.mjs", "_slot18-lib.mjs")
    .replaceAll("-slot17", "-slot18")
    .replaceAll("slot17", "slot18");
  const outName = name.replaceAll("slot17", "slot18");
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
