#!/usr/bin/env node
/**
 * Siman 334 mt_garbage cleanup — retranslate flagged blocks from Hebrew, validate before write.
 * Patches **** ENGLISH **** only.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import * as cheerio from "cheerio";
import { parseBlocksInFile, serializeBlock } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output/siman_334");
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function hebrewToPlain(html) {
  const $ = cheerio.load(`<div id="r">${html ?? ""}</div>`, { decodeEntities: true });
  return $("#r").text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function halakhicCleanup(text) {
  return text
    .replace(/\bGod\b/g, "Hashem")
    .replace(/\bthe LORD\b/gi, "Hashem")
    .replace(/\bLORD\b/g, "Hashem")
    .replace(/\bSabbath\b/g, "Shabbat")
    .replace(/\bLord['\u2019]s Prayer\b/gi, "")
    .replace(/\bHashem['\u2019]s Word\b/gi, "")
    .replace(/\bHoly Qur['\u2019]an\b/gi, "Rambam")
    .replace(/\bCapernaum\b/gi, "")
    .replace(/\bthe psalmist\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function splitForTranslation(input, maxLen = 450) {
  if (input.length <= maxLen) return [input];
  const parts = [];
  let i = 0;
  while (i < input.length) {
    let j = Math.min(i + maxLen, input.length);
    if (j < input.length) {
      const cut = input.lastIndexOf(" ", j);
      if (cut > i + 80) j = cut;
    }
    parts.push(input.slice(i, j).trim());
    i = j;
  }
  return parts.filter(Boolean);
}

async function translateGoogle(piece) {
  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      const body = new URLSearchParams({ q: piece });
      const res = await fetch(GOOGLE_URL, { method: "POST", body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data[0].map((seg) => seg[0]).join("");
    } catch (err) {
      const waitMs = String(err).includes("429") ? 15000 + attempt * 3000 : 1500 + attempt * 500;
      await sleep(waitMs);
    }
  }
  return null;
}

async function translatePlain(text) {
  const pieces = splitForTranslation(text);
  const out = [];
  for (const piece of pieces) {
    const tr = await translateGoogle(piece);
    if (!tr) return null;
    out.push(tr.trim());
    await sleep(1200);
  }
  return halakhicCleanup(out.join(" "));
}

function stillGarbage(block) {
  return runBlockQualityChecks(block).some((e) => e.code === "mt_garbage");
}

async function main() {
  const files = [];
  for (const slug of fs.readdirSync(OUT)) {
    const sd = path.join(OUT, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      files.push(path.join(sd, f));
    }
  }

  let total = 0;
  let failed = 0;

  for (const fp of files.sort()) {
    const raw = fs.readFileSync(fp, "utf8");
    const blocks = parseBlocksInFile(raw);
    let changed = 0;

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (!stillGarbage(b)) continue;
      const plain = hebrewToPlain(b.he);
      if (!plain) {
        console.warn("NO HEBREW", path.relative(OUT, fp), b.seif, b.marker);
        failed++;
        continue;
      }
      let translated = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        translated = await translatePlain(plain);
        if (!translated) continue;
        const trial = { ...b, en: escapeHtml(translated) };
        if (!stillGarbage(trial)) break;
        translated = null;
      }
      if (!translated) {
        console.warn("FAIL", path.relative(OUT, fp), `seif ${b.seif} marker ${b.marker}`);
        failed++;
        continue;
      }
      blocks[i] = { ...b, en: escapeHtml(translated) };
      changed++;
      console.log("OK", path.relative(OUT, fp), `seif ${b.seif} marker ${b.marker}`);
    }

    if (changed) {
      fs.writeFileSync(fp, blocks.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
      total += changed;
    }
  }

  spawnSync(process.execPath, [path.join(ROOT, "apply_dictionary_yd001.mjs"), "--root", "output/siman_334"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  console.log(`[DONE] siman 334 MT cleanup — ${total} blocks patched, ${failed} failed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
