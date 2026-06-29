#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { HAND as RAW } from "./_build-en378.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const queue = JSON.parse(
  fs.readFileSync(path.join(__dirname, "he378-queue.json"), "utf8")
);
const extra = {
  "baer-heitev/3:_":
    "The inner one — for it faces the outer one alone, and even though the outer one's eruv was placed in the inner one, it says to it: I sent you for my benefit, not to harm me.",
  "beur-hagra/4:_":
    "(ד) Seif 4. Many like one individual. 73a — father and son, etc., and see Rashi there.",
};
const hand = {};
for (const k of Object.keys(queue)) {
  if (RAW[k]) hand[k] = RAW[k];
  else if (extra[k]) hand[k] = extra[k];
  else console.error("MISSING", k);
}
const out = path.join(__dirname, "en378-hand.json");
fs.writeFileSync(out, JSON.stringify(hand, null, 2) + "\n");
console.log("keys", Object.keys(hand).length);
