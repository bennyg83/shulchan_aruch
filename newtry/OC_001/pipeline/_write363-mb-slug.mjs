#!/usr/bin/env node
/** Write _en363-slugs/mishnah-berurah.json from part3 T3 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const { T3 } = await import(
  pathToFileURL(path.join(dir, "_363-translations-data-part3.mjs")).href + `?t=${Date.now()}`
);

const he = JSON.parse(
  fs.readFileSync(path.join(dir, "_mishnah_berurah363-he.json"), "utf8")
);
const prefix = "mishnah-berurah:";
const out = {};
const missing = [];

for (const k of Object.keys(he)) {
  const full = `${prefix}${k}`;
  if (!(full in T3)) missing.push(full);
  else out[k] = T3[full];
}

if (missing.length) {
  console.error(`Missing ${missing.length}:`, missing.slice(0, 10));
  process.exit(1);
}

const slugPath = path.join(dir, "_en363-slugs", "mishnah-berurah.json");
fs.writeFileSync(slugPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`mishnah-berurah.json: ${Object.keys(out).length} keys`);
