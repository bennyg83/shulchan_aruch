#!/usr/bin/env node
/** Inject EN map into hand-slot12 JSON */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { autoFix } from "./_slot12-lib.mjs";

const siman = Number(process.argv[2]);
const mapPath = process.argv[3];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
const { EN } = await import(pathToFileURL(path.resolve(mapPath)).href + "?v=" + Date.now());
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let n = 0;
const miss = [];
for (const it of hand.items) {
  const k = `${it.rel}|${it.key}`;
  if (EN[k]) {
    it.en = autoFix(EN[k], it.marker, it.he || "");
    n++;
  } else miss.push(k);
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("injected", n, "missing", miss.length);
if (miss.length) {
  console.error(miss.slice(0, 10).join("\n"));
  process.exit(1);
}
