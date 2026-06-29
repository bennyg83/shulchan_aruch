#!/usr/bin/env node
/** Build trans-siman489-a.json from mech489-en.mjs + small489-en.mjs + hand JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { t as mech } from "./mech489-en.mjs";
import { t as small } from "./small489-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "hand-slot12-siman-489.json"), "utf8")
);
const SLUGS = new Set([
  "mechaber",
  "baer-heitev",
  "turei-zahav",
  "magen-avraham",
  "machatzit-hashekel",
  "eliyah-rabbah",
  "kaf-hachayyim",
  "ateret-zekenim",
]);

const trans = {};
const missing = [];

for (const it of hand.items) {
  if (!SLUGS.has(it.slug)) continue;
  const en =
    it.slug === "mechaber"
      ? mech[`${it.seif}:${it.marker === "main" ? "main" : it.marker || "_"}`]
      : small[`${it.slug}:${it.seif}:${it.marker || "_"}`];
  if (!en) {
    missing.push(`${it.slug}:${it.key}`);
    continue;
  }
  if (!trans[it.rel]) trans[it.rel] = {};
  trans[it.rel][it.key] = en;
}

const outPath = path.join(__dirname, "work", "trans-siman489-a.json");
fs.writeFileSync(outPath, JSON.stringify(trans, null, 2) + "\n", "utf8");
console.log("wrote", outPath, "files", Object.keys(trans).length, "blocks", Object.values(trans).reduce((n, o) => n + Object.keys(o).length, 0));
if (missing.length) {
  console.error("MISSING", missing.length, missing.slice(0, 20).join(", "));
  process.exit(1);
}
