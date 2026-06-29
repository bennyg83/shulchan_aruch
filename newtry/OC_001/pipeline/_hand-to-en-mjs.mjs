#!/usr/bin/env node
/** Convert hand-slot11-siman-NNN.json → mechNNN-en.mjs + smallNNN-en.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slot = process.env.SLOT || "slot12";
const handPath = path.join(__dirname, "work", `hand-${slot}-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

const mech = {};
const small = {};

for (const it of hand.items) {
  if (!it.en) throw new Error(`missing en: ${it.rel} ${it.key}`);
  const marker = it.marker === "main" ? "main" : it.marker || "_";
  if (it.slug === "mechaber") {
    mech[`${it.seif}:${marker}`] = it.en;
  } else {
    small[`${it.slug}:${it.seif}:${marker}`] = it.en;
  }
}

const mechPath = path.join(__dirname, `mech${siman}-en.mjs`);
const smallPath = path.join(__dirname, `small${siman}-en.mjs`);

function writeMap(fp, varName, map, comment) {
  const lines = [`/** ${comment} (${Object.keys(map).length} keys) */`, `export const t = {`];
  for (const [k, v] of Object.entries(map)) {
    const esc = JSON.stringify(v);
    lines.push(`  ${JSON.stringify(k)}: ${esc},`);
  }
  lines.push("};", "");
  fs.writeFileSync(fp, lines.join("\n"), "utf8");
}

writeMap(mechPath, "t", mech, `OC siman ${siman} — mechaber`);
writeMap(smallPath, "t", small, `OC siman ${siman} — small commentators`);
console.log("wrote", mechPath, Object.keys(mech).length, "keys");
console.log("wrote", smallPath, Object.keys(small).length, "keys");
