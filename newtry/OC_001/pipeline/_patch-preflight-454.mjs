#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function patchText(s) {
  return s
    .replace(/\bleavening\b/gi, "becoming chametz")
    .replace(/\bleavens\b/gi, "causes chimutz")
    .replace(/\bleavened\b/gi, "became chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/curses Hashem/gi, "reviles")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/\bdepending\b/gi, "contingent")
    .replace(/\bpending\b/gi, "outstanding");
}

for (const n of [1, 2, 3]) {
  const p = path.join(__dirname, `_fixes-siman454-part${n}.mjs`);
  let txt = fs.readFileSync(p, "utf8");
  const m = txt.match(/export const fixes = ([\s\S]+);\s*$/);
  if (!m) throw new Error("parse " + p);
  const fixes = JSON.parse(m[1]);
  for (const file of Object.keys(fixes)) {
    for (const k of Object.keys(fixes[file])) {
      fixes[file][k] = patchText(fixes[file][k]);
    }
  }
  fs.writeFileSync(
    p,
    `/** siman 454 part ${n} — matzah types (preflight patch) */\nexport const fixes = ${JSON.stringify(fixes, null, 2)};\n`
  );
  console.log("patched", p);
}
