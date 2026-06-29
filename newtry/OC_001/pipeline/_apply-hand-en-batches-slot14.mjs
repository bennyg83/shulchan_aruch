#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const batches = [
  "_hand-en-slot14-529-540-batch0.mjs",
  "_hand-en-slot14-529-540-batch1.mjs",
  "_hand-en-slot14-529-540-batch2.mjs",
  "_hand-en-slot14-529-540-batch3.mjs",
];

/** Latin-1 mojibake of UTF-8 Hebrew letters → proper UTF-8 */
function demojibake(s) {
  if (!s || /^[\x00-\x7F_]+$/.test(s)) return s;
  try {
    return Buffer.from(s, "latin1").toString("utf8");
  } catch {
    return s;
  }
}

function parseBatchKey(batchKey) {
  const pipe = batchKey.lastIndexOf("|");
  const rel = batchKey.slice(0, pipe);
  const sk = batchKey.slice(pipe + 1);
  const colon = sk.indexOf(":");
  return {
    rel,
    seif: sk.slice(0, colon),
    marker: sk.slice(colon + 1),
  };
}

function itemMatches(it, rel, seif, marker) {
  if (it.rel !== rel || String(it.seif) !== String(seif)) return false;
  const m = it.marker ?? "_";
  return (
    m === marker ||
    demojibake(m) === marker ||
    it.key === `${seif}:${marker}` ||
    demojibake(it.key) === `${seif}:${marker}`
  );
}

const allT = {};
for (const f of batches) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  const { T } = await import(pathToFileURL(p).href + "?v=" + Date.now());
  Object.assign(allT, T);
}

/** Siman-specific overrides (same rel|key in multiple simanim) */
const SIMAN_OVERRIDES = {
  538: {
    "netiv-chayim/part-001.txt|1:_":
      "(Magen Avraham seif 1) He wrote in the name of the Rosh that we do not say as Taz suggests, etc. It is explained: there the Rosh's intent—since R' Huna and R' Chiya dispute, and halachah follows R' Huna over R' Chiya as explained in Rosh that they did not know which is R' Huna and which is R' Chiya, and each saw one on one side—because they did not know how R' Huna held they ruled stringently; not so here.",
  },
};

for (const siman of simanim) {
  const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const overrides = SIMAN_OVERRIDES[siman] || {};
  let n = 0;
  for (const [batchKey, en] of Object.entries(allT)) {
    const { rel, seif, marker } = parseBatchKey(batchKey);
    const it = hand.items.find((x) => itemMatches(x, rel, seif, marker));
    if (!it) continue;
    const okey = `${rel}|${it.key}`;
    if (overrides[okey] !== undefined) {
      it.en = overrides[okey];
      n++;
      continue;
    }
    if (overrides[batchKey] !== undefined) {
      it.en = overrides[batchKey];
      n++;
      continue;
    }
    it.en = en;
    n++;
  }
  for (const [k, en] of Object.entries(overrides)) {
    const { rel, seif, marker } = parseBatchKey(k);
    const it = hand.items.find((x) => itemMatches(x, rel, seif, marker));
    if (it && !allT[k]) {
      it.en = en;
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log(`siman ${siman}: merged ${n}`);
}
