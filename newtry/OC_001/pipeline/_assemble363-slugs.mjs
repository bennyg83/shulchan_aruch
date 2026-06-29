#!/usr/bin/env node
/** Assemble missing _en363-slugs JSON for siman 363 batch A */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { GRA_REST } from "./_363-beur-hagra-en-rest.mjs";
import { KAF } from "./_363-p2-kaf.mjs";
import { MHS_A } from "./_363-p2-mhs-a.mjs";
import { MHS_B } from "./_363-p2-mhs-b.mjs";
import { YAD_EXTRA, CHOKH_EXTRA } from "./_363-yad-chokh-en-data.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(dir, "_en363-slugs");

function stripPrefix(obj, slug) {
  const p = `${slug}:`;
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k.startsWith(p) ? k.slice(p.length) : k] = v;
  }
  return out;
}

function loadGraPartial() {
  const src = fs.readFileSync(path.join(dir, "_gen363-beur-hagra-slugs.mjs"), "utf8");
  const T = {};
  for (const m of src.matchAll(/"([^"]+)"\s*:\s*(?:"([^"]*(?:\\.[^"]*)*)"|`([\s\S]*?)`)/g)) {
    if (m.index < src.indexOf("const T =")) continue;
    if (src.indexOf("};", m.index) < m.index) break;
    T[m[1]] = m[2] ?? m[3];
  }
  if (T["8:b"]) {
    T["8:ב"] = T["8:b"];
    delete T["8:b"];
  }
  return { ...T, ...GRA_REST };
}

function loadChokhmat() {
  const src = fs.readFileSync(path.join(dir, "_build363-translations.mjs"), "utf8");
  const T = {};
  for (const m of src.matchAll(/"chokhmat-shlomo:([^"]+)"\s*:\s*`([\s\S]*?)`,/g)) {
    T[m[1]] = m[2];
  }
  return { ...T, ...CHOKH_EXTRA };
}

function loadEliyah() {
  const src = fs.readFileSync(path.join(dir, "_gen363-slot5-en.mjs"), "utf8");
  const m = src.match(/"eliyah-rabbah":\s*\{([\s\S]*?)\n  \},/);
  if (!m) throw new Error("eliyah-rabbah DATA not found");
  const T = {};
  for (const e of m[1].matchAll(/"([^"]+)"\s*:\s*`([\s\S]*?)`/g)) T[e[1]] = e[2];
  return T;
}

function writeSlug(slug, obj, heFile) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const keys = Object.keys(he);
  const missing = keys.filter((k) => !(k in obj));
  if (missing.length) {
    console.error(`${slug}: missing ${missing.length}: ${missing.slice(0, 5).join(", ")}...`);
    process.exit(1);
  }
  const out = {};
  for (const k of keys) out[k] = obj[k];
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`${slug}.json: ${keys.length} keys`);
  return keys.length;
}

let total = 0;
total += writeSlug("beur-hagra", loadGraPartial(), "_beur_hagra363-he.json");
total += writeSlug("chokhmat-shlomo", loadChokhmat(), "_chokhmat_shlomo363-he.json");
total += writeSlug("eliyah-rabbah", loadEliyah(), "_eliyah_rabbah363-he.json");
total += writeSlug("kaf-hachayyim", stripPrefix(KAF, "kaf-hachayyim"), "_kaf_hachayyim363-he.json");
total += writeSlug(
  "machatzit-hashekel",
  stripPrefix({ ...MHS_A, ...MHS_B }, "machatzit-hashekel"),
  "_machatzit_hashekel363-he.json"
);

// Merge yad-ephraim keys 13-18 if not already present
const yadPath = path.join(outDir, "yad-ephraim.json");
const yad = JSON.parse(fs.readFileSync(yadPath, "utf8"));
let yadUpdated = false;
for (const [k, v] of Object.entries(YAD_EXTRA)) {
  if (!(k in yad)) {
    yad[k] = v;
    yadUpdated = true;
  }
}
if (yadUpdated) {
  fs.writeFileSync(yadPath, JSON.stringify(yad, null, 2) + "\n", "utf8");
  console.log(`yad-ephraim.json: updated to ${Object.keys(yad).length} keys`);
}

console.log(`Wrote ${total} keys across 5 slugs`);
