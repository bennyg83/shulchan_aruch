#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { FIXES_BY_SIMAN } from "./_hand684-696-en.mjs";
import { T as C1 } from "./hand691-en-chunk1.mjs";
import { T as C2 } from "./hand691-en-chunk2.mjs";
import { T as C3 } from "./hand691-en-chunk3.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function mergePartials(siman, hand) {
  const partial = FIXES_BY_SIMAN[siman] || {};
  for (const [file, blocks] of Object.entries(partial)) {
    const slug = file.replace(/\/part-.*$/, "");
    for (const [sk, en] of Object.entries(blocks)) {
      const key = `${slug}/${sk}`;
      if (key in hand) hand[key] = en;
    }
  }
  return hand;
}

function build691() {
  const bad = JSON.parse(
    fs.readFileSync(path.join(__dirname, "he691-bad-export.json"), "utf8")
  );
  const hand = { ...C1, ...C2, ...C3 };
  mergePartials(691, hand);
  const need = Object.keys(bad).filter((k) => !k.startsWith("mechaber/"));
  const missing = need.filter((k) => !hand[k]);
  const extra = Object.keys(hand).filter((k) => !need.includes(k));
  if (missing.length) {
    console.error("691 missing:", missing);
    process.exit(1);
  }
  const out = {};
  for (const k of need.sort()) out[k] = hand[k];
  fs.writeFileSync(
    path.join(__dirname, "_hand-en-691.json"),
    JSON.stringify(out, null, 2) + "\n"
  );
  console.log("691 hand keys:", Object.keys(out).length, "extra dropped:", extra.length);
}

function trim692() {
  const bad = JSON.parse(
    fs.readFileSync(path.join(__dirname, "he692-bad-export.json"), "utf8")
  );
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "_hand-en-692.json"), "utf8")
  );
  mergePartials(692, hand);
  const need = Object.keys(bad);
  const missing = need.filter((k) => !hand[k]);
  if (missing.length) {
    console.error("692 missing:", missing);
    process.exit(1);
  }
  const out = {};
  for (const k of need.sort()) out[k] = hand[k];
  fs.writeFileSync(
    path.join(__dirname, "_hand-en-692.json"),
    JSON.stringify(out, null, 2) + "\n"
  );
  console.log("692 hand keys:", Object.keys(out).length);
}

function verify693() {
  const bad = JSON.parse(
    fs.readFileSync(path.join(__dirname, "he693-bad-export.json"), "utf8")
  );
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "_hand-en-693.json"), "utf8")
  );
  mergePartials(693, hand);
  const need = Object.keys(bad);
  const missing = need.filter((k) => !hand[k]);
  if (missing.length) {
    console.error("693 missing:", missing);
    process.exit(1);
  }
  const out = {};
  for (const k of need.sort()) out[k] = hand[k];
  fs.writeFileSync(
    path.join(__dirname, "_hand-en-693.json"),
    JSON.stringify(out, null, 2) + "\n"
  );
  console.log("693 hand keys:", Object.keys(out).length);
}

build691();
trim692();
verify693();
