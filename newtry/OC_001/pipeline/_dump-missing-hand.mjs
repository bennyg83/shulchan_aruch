#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = parseInt(process.argv[2], 10);
const hand = JSON.parse(
  fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "work", `hand-slot5-siman-${siman}.json`),
    "utf8"
  )
);
for (const it of hand.items.filter((x) => !x.en)) {
  console.log("---", it.rel, it.key, "---");
  console.log(it.hePlain || it.he);
}
