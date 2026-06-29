#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { spawnSync } from "child_process";
import { autoFix } from "./_slot16-lib.mjs";
import { BY_SIMAN as REST } from "./_fixes-need-rest-615-622.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function loadFixes(fp) {
  if (!fs.existsSync(fp)) return {};
  return import(pathToFileURL(fp).href).then((m) => m.FIXES || {});
}

async function main() {
  for (let s = 613; s <= 622; s++) {
    let fixes = {};
    const a = path.join(__dirname, `_fixes-siman${s}-need-slot16.mjs`);
    const b = path.join(__dirname, `_fixes-siman${s}-slot16.mjs`);
    if (fs.existsSync(a)) Object.assign(fixes, (await loadFixes(a)) || {});
    if (REST[s]) Object.assign(fixes, REST[s]);
    if (Object.keys(fixes).length === 0) continue;

    const handPath = path.join(__dirname, "work", `hand-slot16-siman-${s}.json`);
    const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
    let n = 0;
    for (const it of hand.items) {
      const en = fixes[it.rel]?.[it.key];
      if (en) {
        it.en = autoFix(en, it.marker, it.he || "");
        n++;
      }
    }
    fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
    console.log(`siman ${s} injected ${n}`);
  }
}

main();
