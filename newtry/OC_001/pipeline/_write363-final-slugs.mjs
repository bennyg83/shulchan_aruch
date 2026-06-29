#!/usr/bin/env node
/** Write final _en363-slugs JSON for peri-megadim, yad-ephraim, chokhmat-shlomo */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { PMG } from "./_363-pmg-en-data.mjs";
import { YAD_EXTRA, CHOKH_EXTRA } from "./_363-yad-chokh-en-data.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugDir = path.join(dir, "_en363-slugs");

const { T: CHOKH_BASE } = await import(
  pathToFileURL(path.join(dir, "_build363-translations.mjs")).href + `?t=${Date.now()}`
);

function writeSlug(slug, obj) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, `_${slug.replace(/-/g, "_")}363-he.json`), "utf8"));
  const keys = Object.keys(he);
  const missing = keys.filter((k) => !(k in obj));
  if (missing.length) {
    console.error(`${slug}: missing ${missing.length}: ${missing.join(", ")}`);
    process.exit(1);
  }
  const out = {};
  for (const k of keys) out[k] = obj[k];
  fs.writeFileSync(path.join(slugDir, `${slug}.json`), JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`${slug}.json: ${keys.length} keys`);
}

// peri-megadim
writeSlug("peri-megadim", PMG);

// yad-ephraim: existing partial + extra
const yadExisting = JSON.parse(fs.readFileSync(path.join(slugDir, "yad-ephraim.json"), "utf8"));
writeSlug("yad-ephraim", { ...yadExisting, ...YAD_EXTRA });

// chokhmat-shlomo: keys 1-4 from build363 + 5-6 extra
const chokh = {
  "1:_": CHOKH_BASE["chokhmat-shlomo:1:_"],
  "2:_": CHOKH_BASE["chokhmat-shlomo:2:_"],
  "3:_": CHOKH_BASE["chokhmat-shlomo:3:_"],
  "4:_": CHOKH_BASE["chokhmat-shlomo:4:_"],
  ...CHOKH_EXTRA,
};
writeSlug("chokhmat-shlomo", chokh);

console.log("All final slug JSON files written.");
