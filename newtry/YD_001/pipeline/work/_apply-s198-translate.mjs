#!/usr/bin/env node
/** Retranslate remaining siman 198 mt_garbage blocks from Hebrew. */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output/siman_198");
const TMP = path.join(ROOT, "pipeline/work/_s198-translate-in.txt");

function hebrewToPlain(html) {
  const $ = cheerio.load(`<div id="r">${html ?? ""}</div>`, { decodeEntities: true });
  return $("#r").text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function translateHe(text) {
  fs.writeFileSync(TMP, text, "utf8");
  return execSync(
    `python3 -c "from deep_translator import GoogleTranslator; print(GoogleTranslator(source='iw', target='en').translate(open('${TMP}').read()), end='')"`,
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
  ).trim();
}

function blockOk(block) {
  const bad = new Set(["mt_garbage", "mt_api_artifact", "pending_placeholder", "empty_english"]);
  return !runBlockQualityChecks(block).some((e) => e.severity === "error" && bad.has(e.code));
}

const files = [];
for (const slug of fs.readdirSync(OUT)) {
  const sd = path.join(OUT, slug);
  if (!fs.statSync(sd).isDirectory()) continue;
  for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
    files.push(path.join(sd, f));
  }
}

let ok = 0;
let fail = 0;
const failed = [];

for (const fp of files.sort()) {
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  let changed = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const errs = runBlockQualityChecks(b).filter((e) => e.severity === "error");
    if (!errs.some((e) => e.code === "mt_garbage")) continue;
    const plain = hebrewToPlain(b.he);
    if (!plain) continue;
    let translated;
    try {
      translated = translateHe(plain);
      execSync("sleep 0.15");
    } catch (e) {
      console.warn("TRANSLATE ERR", path.relative(OUT, fp), b.seif, b.marker, e.message);
      fail++;
      failed.push(`${path.relative(OUT, fp)}|${b.seif}|${b.marker}`);
      continue;
    }
    const candidate = { ...b, en: translated };
    if (!blockOk(candidate)) {
      console.warn("STILL BAD", path.relative(OUT, fp), b.seif, b.marker);
      fail++;
      failed.push(`${path.relative(OUT, fp)}|${b.seif}|${b.marker}`);
      continue;
    }
    blocks[i] = candidate;
    changed++;
    ok++;
    console.log("OK", path.relative(OUT, fp), `seif ${b.seif} marker ${b.marker}`);
  }
  if (changed) {
    fs.writeFileSync(fp, blocks.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
  }
}

console.log(`[DONE] fixed ${ok}, failed ${fail}`);
if (failed.length) console.log(failed.join("\n"));
