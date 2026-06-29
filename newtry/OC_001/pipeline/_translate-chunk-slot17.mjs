#!/usr/bin/env node
/** Chunked Google translate for long hand-slot17 items */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot17-lib.mjs";
import {
  runBlockQualityChecks,
  maxSeverity,
  SEVERITY,
  plainFromHtml,
} from "./lib/quality-checks.mjs";

function dedupeChunkSeam(text) {
  const t = plainFromHtml(text);
  const minLen = 55;
  for (let len = Math.min(100, Math.floor(t.length / 2)); len >= minLen; len -= 8) {
    for (let i = 0; i <= t.length - len * 2; i++) {
      const slice = t.slice(i, i + len);
      const next = t.indexOf(slice, i + len);
      if (next !== -1 && next - (i + len) < 12) {
        return t.slice(0, next) + t.slice(next + len);
      }
    }
  }
  return text;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";
let CHUNK = 1200;
const argv = process.argv.slice(2);
const chunkIdx = argv.indexOf("--chunk");
if (chunkIdx >= 0) {
  CHUNK = parseInt(argv[chunkIdx + 1], 10) || 1200;
}

async function translateHe(text) {
  const parts = [];
  for (let i = 0; i < text.length; i += CHUNK) {
    const slice = text.slice(i, i + CHUNK);
    const q = encodeURIComponent(slice);
    const res = await fetch(`${GOOGLE_URL}&q=${q}`);
    if (!res.ok) throw new Error(`google ${res.status}`);
    const data = await res.json();
    parts.push((data[0] || []).map((x) => x[0]).join(""));
    await new Promise((r) => setTimeout(r, 500));
  }
  return parts.join(" ");
}

const targets = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--chunk") {
    i++;
    continue;
  }
  targets.push(argv[i]);
}
if (!targets.length) {
  console.error("Usage: _translate-chunk-slot17.mjs 634:turei-zahav/part-001.txt:2:_ ...");
  process.exit(1);
}

for (const spec of targets) {
  const parts = spec.includes("|") ? spec.split("|") : null;
  const siman = parts ? parts[0] : spec.split(":")[0];
  const rel = parts ? parts[1] : spec.split(":").slice(1, -2).join(":");
  const key = parts ? parts[2] : spec.split(":").slice(-2).join(":");
  const handPath = path.join(__dirname, "work", `hand-slot17-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const it = hand.items.find((x) => x.rel === rel && x.key === key);
  if (!it) {
    console.error("not found", spec);
    continue;
  }
  const src = (it.hePlain || it.he || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  let en = await translateHe(src);
  en = en
    .replace(/\bShield of Abraham\b/gi, "Magen Avraham")
    .replace(/\bGolden Rows\b/gi, "Taz")
    .replace(/\bHouse of Joseph\b/gi, "Beit Yosef");
  en = dedupeChunkSeam(en);
  en = autoFix(en, it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  const sev = maxSeverity(issues);
  if (pf || sev >= SEVERITY.warn) {
    console.error("fail", spec, pf, issues.map((i) => i.code));
    continue;
  }
  it.en = en;
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok", spec, en.length);
}
