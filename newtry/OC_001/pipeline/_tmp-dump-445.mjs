#!/usr/bin/env node
import fs from "fs";
const need = fs.readFileSync("pipeline/_445-need-keys.txt", "utf8").trim().split("\n");
const j = JSON.parse(fs.readFileSync("pipeline/he445-export.json", "utf8"));
for (const k of need) {
  const v = j[k];
  if (!v) { console.log("MISSING", k); continue; }
  const he = v.he.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  console.log("\n###", k);
  console.log("HE:", he.slice(0, 500) + (he.length > 500 ? "..." : ""));
  console.log("EN:", (v.en || "").slice(0, 120));
}
