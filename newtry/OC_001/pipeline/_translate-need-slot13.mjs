#!/usr/bin/env node
/** Translate need-he-dump.json blocks via Claude CLI → work/slot13-need-fixes.json */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inPath = path.join(__dirname, "work", "need-he-dump.json");
const outPath = path.join(__dirname, "work", "slot13-need-fixes.json");
const dictPath = path.join(__dirname, "..", "full_dictionary.md");

const items = JSON.parse(fs.readFileSync(inPath, "utf8"));
const dict = fs.readFileSync(dictPath, "utf8").slice(0, 12000);

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

const claude = resolveClaudeCmd();
const OC_ROOT = path.join(__dirname, "..");
const BATCH = Number(process.env.SLOT13_BATCH || 2);
const fixes = {};

function translateBatch(claude, chunk) {
  const payload = chunk.map((it) => ({
    key: `${it.siman}|${it.rel}|${it.key}`,
    marker: it.marker,
    he: it.hePlain.slice(0, 14000),
  }));
  const prompt = `Translate these Shulchan Aruch Orach Chayim editorial blocks from Hebrew to English.

RULES (mandatory):
- Complete word-for-word translation; no omissions.
- Expand ALL Hebrew abbreviations (מ\"א = Magen Avraham, ר\"ה = reshut harabbim, etc.).
- Use halachic terms: melacha, muktzeh, reshut harabbim, karmelit, d'oraisa, d'rabbanan, l'chatchila, b'dieved.
- Commentator names: Rashi, Rosh, Taz, Magen Avraham, Mishna Berurah — never anglicized.
- Rama glosses: {Rama: ...} only.
- Note markers: Hebrew letter markers in source become (1), (2) etc. at start when marker is א=1, ב=2, ג=3, ד=4, ה=5, ו=6, ז=7, ח=8, ט=9, י=10, etc. For "_" marker use no prefix unless text has {א} style — then use (1) for א.
- Plain text only; no HTML; no "Translation:" label.
- Never use: Lord, God, Sabbath, Shield of Abraham, Capernaum, allocated for muktzeh.
- siman citations: convert gematria to numbers (סי' תקי\"ח = siman 518).

Dictionary excerpt:
${dict}

Return ONLY JSON object: keys are the "key" field, values are English strings.

INPUT:
${JSON.stringify(payload, null, 2)}`;

  const r = spawnSync(claude, ["--print"], {
    cwd: OC_ROOT,
    encoding: "utf8",
    input: prompt,
    timeout: 25 * 60 * 1000,
    maxBuffer: 80 * 1024 * 1024,
    shell: process.platform === "win32",
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });
  if (r.status !== 0) {
    throw new Error(`claude status=${r.status} ${(r.stderr || "").slice(0, 300)}`);
  }
  return extractJson(r.stdout);
}

for (let i = 0; i < items.length; i += BATCH) {
  const chunk = items.slice(i, i + BATCH);
  console.log("batch", Math.floor(i / BATCH) + 1, chunk.map((x) => x.key).join(", "));
  const tr = translateBatch(claude, chunk);
  Object.assign(fixes, tr);
  fs.writeFileSync(outPath, JSON.stringify(fixes, null, 2) + "\n", "utf8");
  console.log("  got", Object.keys(tr).length, "total", Object.keys(fixes).length);
}

fs.writeFileSync(outPath, JSON.stringify(fixes, null, 2) + "\n", "utf8");
console.log("wrote", outPath, Object.keys(fixes).length);
