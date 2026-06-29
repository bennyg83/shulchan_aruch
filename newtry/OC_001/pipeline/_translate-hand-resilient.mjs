#!/usr/bin/env node
/** Translate hand JSON one block at a time (shortest first), stdin claude, retries. */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot12-lib.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const slot = process.env.SLOT || "slot12";
const handPath = path.join(__dirname, "work", `hand-${slot}-siman-${siman}.json`);

const FAIL_RE =
  /Lord's Prayer|Hashem's Word|Hashem's promise|Gloss:|Saturday|Shield of Abraham|Aboriginally|follicles|IDF|According to the/i;

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = hand.items
  .filter((it) => !it.en || !String(it.en).trim())
  .sort((a, b) => (a.hePlain?.length || 0) - (b.hePlain?.length || 0));

// Reuse high-quality prior English when present
for (const it of hand.items) {
  if (it.en) continue;
  const bad = String(it.enBad || "").trim();
  if (bad.length > 40 && !FAIL_RE.test(bad) && !/Hashem's Prayer/.test(bad)) {
    it.en = autoFix(bad, it.marker, it.he || "");
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");

const still = hand.items.filter((it) => !it.en);
console.log("siman", siman, "need translate", still.length, "reused", hand.items.length - still.length - need.length);

const SYSTEM = `Translate ONE Hebrew halacha block to English for Shulchan Aruch OC siman ${siman}.
Rules: every word; {Rama: ...} for glosses; expand abbreviations; Magen Avraham, Taz, Rambam, etc.; kezayit, matzah, d'oraisa, d'rabbanan.
Return ONLY the English translation text, nothing else. No JSON. No markdown.`;

function claudeOne(hePlain) {
  const prompt = `${SYSTEM}\n\nHebrew:\n${hePlain}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const r = spawnSync(process.platform === "win32" ? "claude.cmd" : "claude", ["--print"], {
      encoding: "utf8",
      timeout: 600000,
      cwd: OC_ROOT,
      input: prompt,
      maxBuffer: 20 * 1024 * 1024,
      shell: process.platform === "win32",
    });
    if (r.status === 0 && (r.stdout || "").trim()) return (r.stdout || "").trim();
    console.error(`  attempt ${attempt} failed:`, (r.stderr || r.stdout || "").slice(0, 200));
  }
  throw new Error("claude failed after retries");
}

let done = 0;
for (const it of still) {
  process.stdout.write(`${it.rel} ${it.key} (${it.hePlain.length}) … `);
  it.en = autoFix(claudeOne(it.hePlain), it.marker, it.he || "");
  done++;
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
}
console.log("translated", done);
