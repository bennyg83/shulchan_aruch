#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const q = JSON.parse(fs.readFileSync(path.join(__dirname, "he454-queue.json"), "utf8"));
const hand = fs.existsSync(path.join(__dirname, "_hand-en-454.json"))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, "_hand-en-454.json"), "utf8"))
  : {};

function sanitize(en) {
  return en
    .replace(/\bleavening\b/gi, "chimutz")
    .replace(/\breaches leavening\b/gi, "reaches chimutz")
    .replace(/\bleavens\b/gi, "causes chimutz")
    .replace(/\bleavened\b/gi, "became chametz")
    .replace(/\bleaven\b/gi, "chametz")
    .replace(/\bChametz\b/g, "chametz")
    .replace(/curses Hashem/gi, 'reviles the Name')
    .replace(/\bHashem\b/g, "the Name")
    .replace(/for spending and/gi, "for expenditure and")
    .replace(/&quot;/g, '"')
    .trim();
}

for (const [k, v] of Object.entries(q)) {
  let en = sanitize(v.en);
  if (isBadMt447(en)) {
    console.error("still bad:", k, BAD_MT_447.filter((r) => r.test(en)).map((r) => r.source));
    process.exit(1);
  }
  hand[k] = en;
}

fs.writeFileSync(path.join(__dirname, "_hand-en-454.json"), JSON.stringify(hand, null, 2) + "\n");
console.log("fixed", Object.keys(q).length, "keys");
