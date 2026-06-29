#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { t as mech } from "./mech361-en.mjs";
import { t as bh } from "./bh361-en.mjs";
import { t as beer } from "./beer361-en.mjs";
import { t as gra } from "./gra361-en.mjs";
import { t as biur } from "./biur361-en.mjs";
import { t as er } from "./er361-en.mjs";
import { t as kaf } from "./kaf361-en.mjs";
import { t as mh } from "./mh361-en.mjs";
import { t as ma } from "./ma361-en.mjs";
import { t as mb } from "./mb361-en.mjs";
import { t as pm } from "./pm361-en.mjs";
import { t as taz } from "./taz361-en.mjs";
import { t as rae } from "./rae361-en.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugMap = {
  "_baer_heitev361-he.json": { slug: "baer-heitev", t: bh },
  "_beer_hagolah361-he.json": { slug: "beer-hagolah", t: beer },
  "_beur_hagra361-he.json": { slug: "beur-hagra", t: gra },
  "_biur_halacha361-he.json": { slug: "biur-halacha", t: biur },
  "_eliyah_rabbah361-he.json": { slug: "eliyah-rabbah", t: er },
  "_kaf_hachayyim361-he.json": { slug: "kaf-hachayyim", t: kaf },
  "_machatzit_hashekel361-he.json": { slug: "machatzit-hashekel", t: mh },
  "_magen_avraham361-he.json": { slug: "magen-avraham", t: ma },
  "_mishnah_berurah361-he.json": { slug: "mishnah-berurah", t: mb },
  "_peri_megadim361-he.json": { slug: "peri-megadim", t: pm },
  "_rabbi_akiva_eiger361-he.json": { slug: "rabbi-akiva-eiger", t: rae },
  "_turei_zahav361-he.json": { slug: "turei-zahav", t: taz },
};

const small = {};
let errors = [];

for (const [file, { slug, t }] of Object.entries(slugMap)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) {
    if (!(k in t)) errors.push(`missing in ${slug}: ${k}`);
    else small[`${slug}:${k}`] = t[k];
  }
  for (const k of Object.keys(t)) {
    if (!(k in he)) errors.push(`extra in ${slug}: ${k}`);
  }
}

for (const k of Object.keys(mech)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, "_mechaber361-he.json"), "utf8"));
  if (Object.keys(mech).length !== Object.keys(he).length) errors.push("mechaber key count mismatch");
  for (const hk of Object.keys(he)) if (!(hk in mech)) errors.push(`missing mechaber: ${hk}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}
function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const [k, v] of Object.entries(obj)) lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  lines.push("};");
  fs.writeFileSync(path.join(dir, name), lines.join("\n") + "\n", "utf8");
}

emit(small, "small361-en.mjs");
console.log(`small361-en.mjs: ${Object.keys(small).length} keys`);
console.log(`mechaber: ${Object.keys(mech).length}, total: ${Object.keys(small).length + Object.keys(mech).length}`);
