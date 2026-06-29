#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugDir = path.join(dir, "_en363-slugs");

const { T3 } = await import(pathToFileURL(path.join(dir, "_363-translations-data-part3.mjs")).href);
const SMALL = { ...T3 };

const slugCounts = {};
for (const file of fs.readdirSync(slugDir).filter((f) => f.endsWith(".json"))) {
  const slug = file.replace(/\.json$/, "");
  const tr = JSON.parse(fs.readFileSync(path.join(slugDir, file), "utf8"));
  slugCounts[slug] = Object.keys(tr).length;
  for (const [k, v] of Object.entries(tr)) SMALL[`${slug}:${k}`] = v;
}

const missingBySlug = {};
let totalExpected = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith("363-he.json") && !x.includes("mechaber"))) {
  const slug = f.replace(/^_/, "").replace(/363-he\.json$/, "").replace(/_/g, "-");
  const he = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const keys = Object.keys(he);
  totalExpected += keys.length;
  const miss = keys.filter((k) => !(`${slug}:${k}` in SMALL));
  if (miss.length) missingBySlug[slug] = miss;
}

console.log("Slug JSON counts:", slugCounts);
console.log("T3 (mishnah-berurah):", Object.keys(T3).length);
console.log("SMALL total:", Object.keys(SMALL).length, "expected:", totalExpected);
for (const [slug, miss] of Object.entries(missingBySlug).sort()) {
  console.log(`${slug}: missing ${miss.length}/${slugCounts[slug] || 0}+${(JSON.parse(fs.readFileSync(path.join(dir, `_${slug.replace(/-/g, "_")}363-he.json`), "utf8"))).length}`);
}
