#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { PART1, PART2, PART3, partOf } from "./_analyze-bad-mt452.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exp = JSON.parse(fs.readFileSync(path.join(__dirname, "he452-export.json"), "utf8"));

function stripHtml(h) {
  return h
    .replace(/<small>([\s\S]*?)<\/small>/gi, " $1 ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function ramaFromSmall(h) {
  const m = h.match(/<small>([\s\S]*?)<\/small>/gi);
  if (!m) return null;
  return m.map((s) => s.replace(/<\/?small>/gi, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
}

const out = {};
for (const [k, v] of Object.entries(exp)) {
  const pn = partOf(k.split("/")[0]);
  if (!pn) continue;
  out[k] = {
    part: pn,
    bad: isBad(v.en),
    he_plain: stripHtml(v.he),
    rama: ramaFromSmall(v.he),
    en_cur: v.en,
  };
}
fs.writeFileSync(path.join(__dirname, "he452-dump.json"), JSON.stringify(out, null, 2) + "\n");
console.log("dumped", Object.keys(out).length);
