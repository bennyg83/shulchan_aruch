#!/usr/bin/env node
/** Translate quality-flagged blocks (slot11 remaining) via Claude CLI → work/slot11-quality-fixes.json */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const remPath = path.join(__dirname, "work", "slot11-quality-remaining2.json");
const outPath = path.join(__dirname, "work", "slot11-quality-fixes.json");

const SIMAN_RULES = {
  446: "chametz found during Pesach (covering, burning, muktzeh on yom tov)",
  447: "chametz mixtures on Pesach (bitul, taam, sixty)",
  448: "chametz of gentile/Jew after Pesach passed",
  451: "kashering vessels for Pesach",
  452: "kashering vessels (absorption, hagalah)",
};

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

function itemKey(it) {
  const slug = it.file.split("/")[0];
  return `${slug}/${it.seif}:${it.marker || "_"}`;
}

function translateBatch(claude, siman, items) {
  const topic = SIMAN_RULES[siman] || "Orach Chayim halacha";
  const payload = items.map(({ key, he }) => ({ key, he: he.slice(0, 12000) }));
  const prompt = `You are a halachic Hebrew-to-English translator for Shulchan Aruch Orach Chayim siman ${siman} (${topic}).

Rules:
- Translate every word. No omissions. No commentary. No headers.
- Rama glosses (הגה): wrap as {Rama: ...} with curly braces only.
- Expand Hebrew abbreviations in English (מ״א = Magen Avraham, שו״ע = Shulchan Aruch, etc.).
- Use: chametz, kli rishon, kli sheini, yad soledes bo, d'oraisa, d'rabbanan, l'chatchila, b'dieved, muktzeh, melacha.
- Commentator names: Magen Avraham, Taz, Rambam, Ran, Bach, Shach — never anglicize.
- Note markers in Hebrew (א) → (1), (ב) → (2) at start when present.
- No Hebrew letters in output. No "X X X" placeholders. No Lord's Prayer / Hashem's Word garbage.
- Output ONLY JSON: keys are "key" field, values are English strings.

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
    throw new Error(
      `status=${r.status} stderr=${(r.stderr || "").slice(0, 400)} stdout=${(r.stdout || "").slice(0, 400)}`
    );
  }
  return extractJson(r.stdout);
}

const rem = JSON.parse(fs.readFileSync(remPath, "utf8"));
const hand = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf8")) : {};
const claude = resolveClaudeCmd();
const BATCH = Number(process.env.SLOT11_Q_BATCH || 3);

for (const [simanStr, items] of Object.entries(rem)) {
  const siman = Number(simanStr);
  if (!items.length) continue;
  const base = path.join(OC_ROOT, "output", `siman_${String(siman).padStart(3, "0")}`);
  const queue = [];
  for (const it of items) {
    const k = itemKey(it);
    if (hand[k] && hand[k].length > 40 && !/X X X|Lord's Prayer|Hashem's Word|\. \. \./.test(hand[k])) continue;
    const fp = path.join(base, it.file);
    const b = parseBlocksInFile(fs.readFileSync(fp, "utf8")).find(
      (x) => String(x.seif) === String(it.seif) && String(x.marker || "_") === String(it.marker || "_")
    );
    if (!b) {
      console.error("missing block", siman, k);
      continue;
    }
    queue.push({ key: k, he: plainFromHtml(b.he), rel: it.file, blockKey: `${it.seif}:${it.marker || "_"}` });
  }
  console.log(`siman ${siman} queue ${queue.length}`);
  for (let i = 0; i < queue.length; i += BATCH) {
    const batch = queue.slice(i, i + BATCH);
    console.log(`  batch ${Math.floor(i / BATCH) + 1} ${batch.map((x) => x.key).join(", ")}`);
    const got = translateBatch(claude, siman, batch);
    for (const b of batch) {
      const en = got[b.key];
      if (!en || en.length < 10) {
        console.error("  empty", b.key);
        continue;
      }
      hand[b.key] = en.trim();
    }
    fs.writeFileSync(outPath, JSON.stringify(hand, null, 2) + "\n");
  }
}

console.log("wrote", outPath, "keys", Object.keys(hand).length);
