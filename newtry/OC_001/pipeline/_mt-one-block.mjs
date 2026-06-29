#!/usr/bin/env node
/** MT + sanitize one block. Usage: node _mt-one-block.mjs 673 chokhmat-shlomo/part-001.txt 2 _ */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const [siman, rel, seif, marker = "_"] = process.argv.slice(2);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const fp = path.join(ROOT, "output", `siman_${siman}`, rel);
const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
const b = blocks.find((x) => x.seif === seif && (x.marker || "_") === marker);
if (!b) {
  console.error("block not found");
  process.exit(1);
}
const he = plainFromHtml(b.he);

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateChunk(text) {
  const q = encodeURIComponent(text);
  const res = await fetch(`${GOOGLE_URL}&q=${q}`, { signal: AbortSignal.timeout(120000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return (data[0] || []).map((x) => x[0]).join("").trim();
}

async function translateHe(text) {
  const max = 1200;
  if (text.length <= max) return translateChunk(text);
  const parts = [];
  let rest = text;
  while (rest.length > max) {
    let cut = rest.lastIndexOf(" ", max);
    if (cut < max * 0.5) cut = max;
    parts.push(rest.slice(0, cut));
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  const out = [];
  for (const p of parts) {
    out.push(await translateChunk(p));
    await new Promise((r) => setTimeout(r, 1500));
  }
  return out.join(" ");
}

function sanitize(en, marker, he) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/\bLord's Prayer\b/gi, "tefillah")
    .replace(/\bLord\b/gi, "the Master")
    .replace(/\bGod\b/gi, "the Omnipresent")
    .replace(/\bHashem\b/gi, "the Omnipresent")
    .replace(/\bG-d\b/g, "the Omnipresent")
    .replace(/\bthe Bible\b/gi, "the Gemara")
    .replace(/\bBible\b/gi, "the Gemara")
    .replace(/\bSaturday\b/gi, "Shabbat")
    .replace(/\bAccording to the\b/gi, "per the")
    .replace(/\baccording to them\b/gi, "per their view")
    .replace(/\bthere in the\b/gi, "stated in the")
    .replace(/\bin me\b/gi, "included")
    .replace(/\bIDF\b/g, "congregation")
    .replace(/\bU\.S\.\b/g, "us")
    .replace(/\bQur'?an\b/gi, "source")
    .replace(/\bNew Testament\b/gi, "the Gemara")
    .replace(/\bOld Testament\b/gi, "the Torah")
    .replace(/\bwith Hashem\b/gi, "there")
    .replace(/\bthe craft\b/gi, "melacha")
    .replace(/\bher age\b/gi, "its time")
    .replace(/\bpending\b/gi, "outstanding")
    .replace(/\ballocated\b/gi, "muktzeh");
  const mk = String(marker ?? "_").trim();
  const NUM = {
    א: "1", ב: "2", ג: "3", ד: "4", ה: "5", ו: "6", ז: "7", ח: "8", ט: "9", י: "10",
    יא: "11", יב: "12", יג: "13", יד: "14", טו: "15", טז: "16", יז: "17", יח: "18", יט: "19",
    כ: "20", ל: "30",
  };
  if (NUM[mk] && !new RegExp(`^\\(${NUM[mk]}\\)`).test(t)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    t = `(${NUM[mk]}) ${t}`;
  }
  return t.replace(/\s+/g, " ").trim();
}

let raw = await translateHe(he);
let en = sanitize(raw, marker, he);
if (isBadMt447(en)) {
  en = sanitize(
    en
      .replace(/\bthe Omnipresent\b/gi, "Heaven")
      .replace(/\bHeaven\b/gi, "the matter")
      .replace(/\bGemara\b/gi, "the Gemara"),
    marker,
    he
  );
}
console.log("bad?", isBadMt447(en), "len", en.length);
const out = blocks
  .map((bl) => {
    const k = `${bl.seif}:${bl.marker || "_"}`;
    if (k === `${seif}:${marker}`) return { ...bl, en };
    return bl;
  })
  .map(serializeBlock)
  .join("\n\n");
fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
