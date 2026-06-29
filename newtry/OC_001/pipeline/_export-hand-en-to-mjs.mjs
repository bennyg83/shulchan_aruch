#!/usr/bin/env node
/** Export hand-slot11-siman-NNN.json en fields to mechNNN-en.mjs + smallNNN-en.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", "hand-slot11-siman-" + siman + ".json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

const mech = {};
const small = {};
let missing = 0;

for (const it of hand.items) {
  const marker = it.marker === "main" ? "main" : it.marker || "_";
  const en = String(it.en || "").trim();
  if (!en) {
    missing++;
    console.error("missing en:", it.rel, it.key);
    continue;
  }
  if (it.slug === "mechaber") mech[it.seif + ":" + marker] = en;
  else small[it.slug + ":" + it.seif + ":" + marker] = en;
}

function writeMap(fp, map, comment) {
  const lines = ["/** " + comment + " (" + Object.keys(map).length + " keys) */", "export const t = {"];
  for (const [k, v] of Object.entries(map)) {
    lines.push("  " + JSON.stringify(k) + ": " + JSON.stringify(v) + ",");
  }
  lines.push("};", "");
  fs.writeFileSync(fp, lines.join("\n"), "utf8");
}

writeMap(path.join(__dirname, "mech" + siman + "-en.mjs"), mech, "OC siman " + siman + " mechaber");
writeMap(path.join(__dirname, "small" + siman + "-en.mjs"), small, "OC siman " + siman + " small commentators");
console.log("mech", Object.keys(mech).length, "small", Object.keys(small).length, "missing", missing);
if (missing) process.exit(1);
