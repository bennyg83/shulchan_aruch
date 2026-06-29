#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { HAND } from "./hand691-missing.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "_hand-en-691.json");
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
Object.assign(hand, HAND);
delete hand["mechaber/4:main"];
delete hand["mechaber/6:main"];
delete hand["mechaber/8:main"];

for (const [k, v] of Object.entries(hand)) {
  hand[k] = v
    .replace(/\bHashem\b/g, "the Holy One blessed be He")
    .replace(/Tur — source\./g, "Tur")
    .replace(/A Tur — source\./g, "Tur");
}

fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n");

const mechPath = path.join(__dirname, "mech691-en.mjs");
let mechBody = fs.readFileSync(mechPath, "utf8");
if (!mechBody.includes('"4:main"')) {
  mechBody = `/** OC siman 691 — mechaber */\nexport const t = ${JSON.stringify(
    {
      "4:main": HAND["mechaber/4:main"],
      "6:main": HAND["mechaber/6:main"],
      "8:main": HAND["mechaber/8:main"],
    },
    null,
    2
  )};\n`;
  fs.writeFileSync(mechPath, mechBody);
}
console.log("merged", Object.keys(HAND).length, "keys into hand691");
