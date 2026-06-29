#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const [k, v] of Object.entries(obj)) lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  lines.push("};");
  fs.writeFileSync(path.join(dir, name), lines.join("\n") + "\n", "utf8");
  console.log(`${name}: ${Object.keys(obj).length} keys`);
}

const files = [
  ["beer362-en.mjs", "_beer_hagolah362-he.json"],
  ["gra362-en.mjs", "_beur_hagra362-he.json"],
  ["ma362-en.mjs", "_magen_avraham362-he.json"],
  ["mh362-en.mjs", "_machatzit_hashekel362-he.json"],
  ["taz362-en.mjs", "_turei_zahav362-he.json"],
  ["bh362-en.mjs", "_baer_heitev362-he.json"],
  ["mb362-en.mjs", "_mishnah_berurah362-he.json"],
  ["biur362-en.mjs", "_biur_halacha362-he.json"],
  ["er362-en.mjs", "_eliyah_rabbah362-he.json"],
  ["kaf362-en.mjs", "_kaf_hachayyim362-he.json"],
  ["pm362-en.mjs", "_peri_megadim362-he.json"],
];

const mod = await import(pathToFileURL(path.join(dir, "_translations362-batchB.mjs")).href);

for (const [out, heFile] of files) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const heKeys = Object.keys(he);
  const slug = out.replace(/362-en\.mjs$/, "");
  const t = mod.translations[slug];
  if (!t) throw new Error(`missing translations for ${slug}`);
  const enKeys = Object.keys(t);
  if (enKeys.length !== heKeys.length) {
  console.error(`${out}: count ${enKeys.length}/${heKeys.length}`);
  const missing = heKeys.filter((k) => !(k in t));
  const extra = enKeys.filter((k) => !(k in he));
  if (missing.length) console.error("  missing:", missing);
  if (extra.length) console.error("  extra:", extra);
  throw new Error(`${out} key mismatch`);
  }
  emit(t, out);
}

import { pathToFileURL } from "url";
