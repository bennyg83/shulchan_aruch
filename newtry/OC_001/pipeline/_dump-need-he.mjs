#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const need = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "work", "slot13-need-all.json"), "utf8")
);
const hand = JSON.parse(
  fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "work", `hand-slot13-siman-${siman}.json`),
    "utf8"
  )
);
for (const n of need.filter((x) => x.siman === siman)) {
  const it = hand.items.find((x) => x.rel === n.rel && x.key === n.key);
  console.log("---", n.rel, n.key, n.issues.join(","));
  console.log(it?.hePlain || n.hePlain);
  console.log();
}
