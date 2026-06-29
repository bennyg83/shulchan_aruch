#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const raw = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "work", "need-slot16-all.json"), "utf8")
);
const compact = raw.map((x) => ({
  siman: x.siman,
  rel: x.rel,
  key: x.key,
  issues: x.issues,
  pf: x.pf,
  hePlain: (x.hePlain || "").slice(0, 500),
}));
fs.writeFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "work", "need-slot16-compact.json"),
  JSON.stringify(compact, null, 2)
);
console.log(compact.length, "items");
