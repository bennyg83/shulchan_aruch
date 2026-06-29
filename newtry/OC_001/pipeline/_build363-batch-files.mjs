#!/usr/bin/env node
/** Split missing siman 363 items into batchB..batchP SMALL maps; merge _en363-slugs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const BATCH_SIZE = 45;
const LETTERS = "BCDEFGHIJKLMNOP".split("");

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function emitSmall(small, letter) {
  const fp = path.join(dir, `_siman363-batch${letter}-data.mjs`);
  const keys = Object.keys(small).sort((a, b) => a.localeCompare(b, "en"));
  const lines = [`/** OC siman 363 batch ${letter} — commentator blocks (${keys.length}) */`, "export const MECH = {};", "export const SMALL = {"];
  for (const k of keys) lines.push(`  ${JSON.stringify(k)}: \`${esc(small[k])}\`,`);
  lines.push("};", "");
  fs.writeFileSync(fp, lines.join("\n"), "utf8");
  return keys.length;
}

const missing = JSON.parse(fs.readFileSync(path.join(dir, "work/missing-slot9-siman-363.json"), "utf8"));
const done = {};
const slugDir = path.join(dir, "_en363-slugs");
if (fs.existsSync(slugDir)) {
  for (const f of fs.readdirSync(slugDir).filter((x) => x.endsWith(".json"))) {
    const slug = f.replace(".json", "");
    const tr = JSON.parse(fs.readFileSync(path.join(slugDir, f), "utf8"));
    for (const [k, v] of Object.entries(tr)) done[`${slug}:${k}`] = v;
  }
}

// Optional: load extra translations from _363-translations-extra.mjs
const extraFp = path.join(dir, "_363-translations-extra.mjs");
if (fs.existsSync(extraFp)) {
  const { T } = await import(`./_363-translations-extra.mjs?t=${Date.now()}`);
  Object.assign(done, T);
}

const still = missing.items.filter((i) => !done[i.key]);
console.log("done", Object.keys(done).length, "still", still.length);

const batches = [];
for (let i = 0; i < still.length; i += BATCH_SIZE) {
  batches.push(still.slice(i, i + BATCH_SIZE));
}

if (batches.length > LETTERS.length) {
  console.error(`Need ${batches.length} batches but only ${LETTERS.length} letters`);
  process.exit(1);
}

// batchB gets existing slug translations + first chunk of still-missing
let letterIdx = 0;
const slugSmall = {};
for (const [k, v] of Object.entries(done)) slugSmall[k] = v;
if (Object.keys(slugSmall).length) {
  const n = emitSmall(slugSmall, LETTERS[letterIdx++]);
  console.log(`batch${LETTERS[letterIdx - 1]}: ${n} (existing slugs)`);
}

for (const chunk of batches) {
  const small = {};
  for (const it of chunk) {
    if (done[it.key]) small[it.key] = done[it.key];
    else console.warn(`MISSING translation: ${it.key}`);
  }
  const letter = LETTERS[letterIdx++];
  const n = emitSmall(small, letter);
  console.log(`batch${letter}: ${n} blocks`);
}

// Remove unused batch files
for (const L of LETTERS.slice(letterIdx)) {
  const fp = path.join(dir, `_siman363-batch${L}-data.mjs`);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
}

console.log("total batches:", letterIdx);
