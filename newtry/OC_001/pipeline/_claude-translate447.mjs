#!/usr/bin/env node
/** Batch-translate bad MT for siman 447 part N → siman447-partN.json (resume-safe). */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PART_SLUGS = {
  1: [
    "mechaber",
    "mishnah-berurah",
    "machatzit-hashekel",
    "magen-avraham",
    "turei-zahav",
    "beer-hagolah",
    "baer-heitev",
  ],
  2: ["chok-yaakov", "beur-hagra", "peri-megadim"],
  3: [
    "biur-halacha",
    "ateret-zekenim",
    "chatam-sofer",
    "dagul-merevavah",
    "eliyah-rabbah",
    "eshel-avraham",
    "kaf-hachayyim",
    "netiv-chayim",
    "rabbi-akiva-eiger",
    "shaarei-teshuvah",
    "yad-ephraim",
    "chokhmat-shlomo",
  ],
};

const BAD = [
  /pending/i,
  /Lord'?s Prayer/i,
  /Hashem/i,
  /\bHametz\b/,
  /\bChametz\b/,
  /Rema:\s*Rema:/i,
  /Gloss-/i,
  /Reichah Milsah/i,
  /with Hashem/i,
  /&quot;/,
  /there in the/i,
  /hand recoils/i,
  /first dish/i,
  /allocated/i,
  /Shield of Abraham/i,
  /Saturday/i,
  /her age/i,
  /the craft/i,
  /Darbanan/i,
  /\bleaven\b/i,
  /chometz/i,
  /\bYom tov\b/,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-–—.:,'"]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

function resolveClaudeCmd() {
  if (process.env.CLAUDE_CLI_CMD) return process.env.CLAUDE_CLI_CMD;
  const r = spawnSync(process.platform === "win32" ? "where" : "which", ["claude"], {
    encoding: "utf8",
  });
  return (r.stdout || "").split(/\r?\n/).find((l) => l.trim())?.trim() || "claude";
}

function extractJson(text) {
  const t = String(text).trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return JSON.parse(fence[1].trim());
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) return JSON.parse(t.slice(start, end + 1));
  return JSON.parse(t);
}

function translateBatch(claude, items) {
  const payload = items.map(({ key, he }) => ({ key, he: plainFromHtml(he).slice(0, 8000) }));
  const prompt = `You are a halachic Hebrew-to-English translator for Shulchan Aruch Orach Chayim siman 447 (chametz mixtures on Pesach).

Rules:
- Translate every word. No omissions. No commentary.
- Rama glosses (הגה): wrap as {Rama: ...} with curly braces only.
- Expand Hebrew abbreviations in English.
- Use "chametz" not Hametz/leaven; "kli rishon", "kli sheini", "yad soledes bo", "d'oraisa", "d'rabbanan", "l'chatchila", "b'dieved", "muktzeh", etc.
- Note markers: Hebrew א → (1), ב → (2), etc. in English.
- Output ONLY a JSON object: keys are the "key" field, values are English strings. No markdown outside JSON.

INPUT:
${JSON.stringify(payload, null, 2)}`;

  const r = spawnSync(claude, ["--print"], {
    cwd: ROOT,
    encoding: "utf8",
    input: prompt,
    timeout: 20 * 60 * 1000,
    maxBuffer: 50 * 1024 * 1024,
    shell: process.platform === "win32",
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });
  if (r.status !== 0) {
    throw new Error(
      `status=${r.status} stderr=${(r.stderr || "").slice(0, 300)} stdout=${(r.stdout || "").slice(0, 300)}`
    );
  }
  return extractJson(r.stdout);
}

const partNum = Number(process.argv[2]);
if (!PART_SLUGS[partNum]) {
  console.error("Usage: node _claude-translate447.mjs <1|2|3>");
  process.exit(1);
}

const exportPath = path.join(__dirname, "he447-export.json");
const outPath = path.join(__dirname, `siman447-part${partNum}.json`);
const exported = JSON.parse(fs.readFileSync(exportPath, "utf8"));
const slugs = new Set(PART_SLUGS[partNum]);
const hand = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf8")) : {};

const queue = [];
for (const [hk, v] of Object.entries(exported)) {
  const slug = hk.split("/")[0];
  if (!slugs.has(slug)) continue;
  if (slug === "mechaber" || slug === "beer-hagolah") continue;
  if (hand[hk] && !isBad(hand[hk])) continue;
  if (!isBad(v.en || "")) continue;
  queue.push({ key: hk, he: v.he, en: v.en });
}

console.log(`part${partNum} queue`, queue.length, "existing hand", Object.keys(hand).length);
const claude = resolveClaudeCmd();
const BATCH = Number(process.env.OC447_BATCH_SIZE || 4);

for (let i = 0; i < queue.length; i += BATCH) {
  const batch = queue.slice(i, i + BATCH);
  const missing = batch.filter((b) => !hand[b.key] || isBad(hand[b.key]));
  if (!missing.length) continue;
  console.log(`batch ${i / BATCH + 1}/${Math.ceil(queue.length / BATCH)} keys`, missing.map((x) => x.key).join(", "));
  const got = translateBatch(claude, missing);
  for (const b of missing) {
    const en = got[b.key];
    if (!en || en.length < 4) {
      console.error("empty for", b.key);
      continue;
    }
    hand[b.key] = en.trim();
  }
  fs.writeFileSync(outPath, JSON.stringify(hand, null, 2) + "\n");
}

console.log("wrote", outPath, "keys", Object.keys(hand).length);
