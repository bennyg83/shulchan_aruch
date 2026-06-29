#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const pairs = [
  ["gra362-en.mjs", "_beur_hagra362-he.json"],
  ["ma362-en.mjs", "_magen_avraham362-he.json"],
  ["mh362-en.mjs", "_machatzit_hashekel362-he.json"],
  ["taz362-en.mjs", "_turei_zahav362-he.json"],
  ["mb362-en.mjs", "_mishnah_berurah362-he.json"],
  ["biur362-en.mjs", "_biur_halacha362-he.json"],
  ["er362-en.mjs", "_eliyah_rabbah362-he.json"],
  ["kaf362-en.mjs", "_kaf_hachayyim362-he.json"],
  ["pm362-en.mjs", "_peri_megadim362-he.json"],
];

let ok = true;
for (const [enFile, heFile] of pairs) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const mod = await import(pathToFileURL(path.join(dir, enFile)).href);
  const enKeys = Object.keys(mod.t);
  const heKeys = Object.keys(he);
  if (enKeys.length !== heKeys.length) {
    console.error(`${enFile}: count ${enKeys.length}/${heKeys.length}`);
    ok = false;
  }
  for (const k of heKeys) {
    if (!(k in mod.t)) {
      console.error(`${enFile}: missing ${k}`);
      ok = false;
    }
  }
  for (const k of enKeys) {
    if (!(k in he)) {
      console.error(`${enFile}: extra ${k}`);
      ok = false;
    }
  }
  if (ok) console.log(`${enFile}: ${heKeys.length} keys OK`);
}
process.exit(ok ? 0 : 1);
