#!/usr/bin/env node
/** Apply God/Heaven/Hashem/Bible/Saturday/Lord → house style on simanim 128,153,159,167,168,170 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const SIMANS = [128, 153, 159, 167, 168, 170];
const DIVINE_RE = /\b(Hashem|God|Heaven|Bible|Saturday|Lord|G-d)\b/i;

function patchEn(en, he = "") {
  let t = String(en ?? "").trim();
  t = t
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord our God\b/gi, "the Omnipresent")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod's\b/gi, "the Omnipresent's")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bG-d\b/g, "the Omnipresent")
    .replace(/\bHashem's\b/gi, "the Omnipresent's")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible says\b/gi, "the Gemara says")
    .replace(/\bBible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bSabbath\b/gi, "Shabbat")
    .replace(/\bHeaven's Prayer\b/gi, "tefillah")
    .replace(/\bHeaven's Word\b/gi, "the matter")
    .replace(/\bHeaven's promise\b/gi, "the matter")
    .replace(/\bHeaven's people\b/gi, "Israel")
    .replace(/\bHeaven's sake\b/gi, "the matter")
    .replace(/\bthe Heaven\b/gi, "there")
    .replace(/\bwith Heaven\b/gi, "there")
    .replace(/\bHeaven\b/gi, "there")
    .replace(/\bthe Master\b/gi, "the Omnipresent");
  if (/<small>הגה|הגה/.test(String(he)) && !/\{Rama:/.test(t)) {
    t = t.replace(/<small>\s*הגה\s*/gi, "{Rama: ");
    t = t.replace(/<\/small>/gi, "}");
  }
  return t.replace(/\s+/g, " ").trim();
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");
let patched = 0;

for (const siman of SIMANS) {
  const dir = simanOutputDir(OUT, siman);
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      let changed = false;
      const out = blocks.map((b) => {
        if (!DIVINE_RE.test(b.en || "")) return b;
        const en2 = patchEn(b.en, b.he);
        if (en2 !== b.en) {
          patched++;
          changed = true;
          return { ...b, en: en2 };
        }
        return b;
      });
      if (changed) {
        const text = out.map(serializeBlock).join("\n\n");
        fs.writeFileSync(fp, text.endsWith("\n") ? text : text + "\n", "utf8");
      }
    }
  }
}
console.log("divine patched blocks:", patched);
