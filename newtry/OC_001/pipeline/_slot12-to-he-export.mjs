#!/usr/bin/env node
/** Build heNNN-bad-export.json from hand-slot12-siman-NNN.json for _mt-retranslate-bad-siman.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hand = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`), "utf8")
);
const exp = {};
for (const it of hand.items) {
  const id = `${it.slug}/${it.key}`;
  exp[id] = {
    he: plainFromHtml(it.hePlain || it.he || ""),
    en: it.enBad || "",
    file: it.rel,
    seif: it.seif,
    marker: it.marker === "_" ? "_" : it.marker,
  };
}
const out = path.join(__dirname, `he${siman}-bad-export.json`);
fs.writeFileSync(out, JSON.stringify(exp, null, 2) + "\n", "utf8");
console.log("wrote", out, Object.keys(exp).length);
