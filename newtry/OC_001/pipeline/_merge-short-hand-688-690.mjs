#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { T688_SHORT } from "./_t688-short.mjs";
import { T690_SHORT } from "./_t690-short.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function merge(siman, extra) {
  const p = path.join(__dirname, `_hand-en-${siman}.json`);
  const prev = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
  const merged = { ...prev, ...extra };
  fs.writeFileSync(p, JSON.stringify(merged, null, 2) + "\n");
  console.log(`siman ${siman}: +${Object.keys(extra).length} -> ${Object.keys(merged).length} total`);
}

merge(688, T688_SHORT);
merge(690, T690_SHORT);
