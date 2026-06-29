#!/usr/bin/env node
/**
 * Run one sprint pool unit end-to-end: translate queue blocks → sprint-worker finish.
 *
 *   node pipeline/pool-worker-run.mjs --unit siman-128-part6of23
 *
 * Backends (OC001_POOL_BACKEND or auto-detect):
 *   ollama     — LAN/local Ollama (no Cursor API)
 *   claude-cli — `claude --print` via Pro subscription (no API key)
 *   cursor     — CURSOR_API_KEY + @cursor/sdk
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");

const SYSTEM = `You are a halachic Hebrew-to-English translator for Shulchan Aruch Orach Chayim.
Rules:
- Translate every word from the Hebrew. No omissions, no summaries, no commentary of your own.
- Use the house dictionary at repo root full_dictionary (1).md for terms and commentator names.
- Rama glosses (הגה): wrap as {Rama: ...}.
- Expand Hebrew abbreviations in English.
- Output ONLY the English translation. No labels, no markdown fences.`;

function parseUnitId(unitId) {
  const m = unitId.match(/^siman-(\d+)-part(\d+)of(\d+)$/);
  if (!m) throw new Error(`Bad unit id: ${unitId}`);
  return {
    siman: parseInt(m[1], 10),
    part: parseInt(m[2], 10),
    parts: parseInt(m[3], 10),
    unitId,
  };
}

function parseArgs() {
  let unitId = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--unit" && a[i + 1]) unitId = a[++i];
  }
  if (!unitId) throw new Error("Usage: --unit siman-NNN-partPofT");
  return parseUnitId(unitId);
}

function stripModelNoise(text) {
  let t = String(text ?? "").trim();
  t = t.replace(/^```[\w]*\n?/m, "").replace(/\n?```$/m, "").trim();
  const think = t.match(/[\s\S]*?<\/think>\s*/i);
  if (think) t = t.slice(think.index + think[0].length).trim();
  if (/^(translation|english):\s*/i.test(t)) t = t.replace(/^(translation|english):\s*/i, "");
  return t.trim();
}

async function ollamaChat(url, model, userContent) {
  const res = await fetch(`${url.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userContent },
      ],
      stream: false,
      options: { temperature: 0.15, num_ctx: 16384 },
    }),
  });
  if (!res.ok) throw new Error(`Ollama HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  return stripModelNoise(j.message?.content ?? j.response ?? "");
}

function buildUserPrompt(item) {
  const hePlain = plainFromHtml(item.he || "");
  return [
    `Commentary slug: ${item.slug}`,
    `Seif: ${item.seif}`,
    `Marker: ${item.marker}`,
    "",
    "HEBREW:",
    hePlain.slice(0, 12000),
  ].join("\n");
}

async function translateWithCursorSdk(prompt) {
  const apiKey = process.env.CURSOR_API_KEY;
  if (!apiKey) return null;
  let Agent;
  try {
    ({ Agent } = await import("@cursor/sdk"));
  } catch {
    console.error("[worker] Install @cursor/sdk or set OC001_OLLAMA_URL");
    return null;
  }
  const model = process.env.CURSOR_SDK_MODEL || "composer-2.5";
  const result = await Agent.prompt(prompt, {
    apiKey,
    model: { id: model },
    local: { cwd: OC_ROOT },
  });
  if (result.status !== "completed" && result.status !== "success") {
    throw new Error(`Cursor agent status: ${result.status}`);
  }
  return stripModelNoise(result.result ?? "");
}

async function translateBlock(item, backend) {
  const prompt = buildUserPrompt(item);
  if (backend === "ide") {
    throw new Error("ide backend does not auto-translate");
  }
  if (backend === "cursor") {
    const en = await translateWithCursorSdk(
      `${SYSTEM}\n\n${prompt}\n\nTranslate the Hebrew above into English.`
    );
    if (!en || en.length < 8) throw new Error("empty Cursor translation");
    return en;
  }
  const url = process.env.OC001_OLLAMA_URL || "http://127.0.0.1:11434";
  const model =
    process.env.OC001_OLLAMA_MODEL_TRANSLATE ||
    process.env.OC001_OLLAMA_MODEL ||
    "qwen2.5:14b-instruct";
  const en = await ollamaChat(url, model, prompt);
  if (!en || en.length < 8) throw new Error("empty Ollama translation");
  return en;
}

function resolveClaudeCmd() {
  if (process.env.CLAUDE_CLI_CMD) return process.env.CLAUDE_CLI_CMD;
  const r = spawnSync(process.platform === "win32" ? "where" : "which", ["claude"], {
    encoding: "utf8",
  });
  const line = (r.stdout || "").split(/\r?\n/).find((l) => l.trim());
  return line?.trim() || "claude";
}

function translateWithClaudeCli(unitId, batchPath, siman, part, parts) {
  const claude = resolveClaudeCmd();
  const prompt = [
    `OC001 pool worker — complete unit ${unitId}.`,
    `Read full_dictionary (1).md and translation/EDITORIAL_RETRANSLATE.md.`,
    `Retranslate every block in this batch from Hebrew (English section only):`,
    batchPath,
    `When done, run: node pipeline/sprint-worker.mjs --siman ${siman} --part ${part} --parts ${parts}`,
  ].join("\n");
  const r = spawnSync(claude, ["--print", "--permission-mode", "acceptEdits", prompt], {
    cwd: OC_ROOT,
    encoding: "utf8",
    timeout: 60 * 60 * 1000,
    env: { ...process.env, PYTHONIOENCODING: "utf-8" },
  });
  if (r.status !== 0) {
    throw new Error((r.stderr || r.stdout || "claude cli failed").slice(0, 400));
  }
  return "claude-cli-handled";
}

function detectBackend() {
  const forced = (process.env.OC001_POOL_BACKEND || "").toLowerCase();
  if (forced === "ollama") return "ollama";
  if (forced === "claude-cli" || forced === "claude") return "claude-cli";
  if (forced === "cursor") return process.env.CURSOR_API_KEY ? "cursor" : null;
  if (forced === "ide" || forced === "manual") return "ide";
  if (process.env.OC001_OLLAMA_URL || process.env.OC001_POOL_USE_OLLAMA === "1") return "ollama";
  if (process.env.OC001_POOL_USE_CLAUDE_CLI === "1") return "claude-cli";
  if (process.env.CURSOR_API_KEY) return "cursor";
  return null;
}

function applyTranslations(queuePath) {
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const byFile = new Map();
  for (const it of queue.items || []) {
    const rel = it.file || it.relPath;
    if (!rel) continue;
    if (!byFile.has(rel)) byFile.set(rel, []);
    byFile.get(rel).push(it);
  }
  for (const [rel, items] of byFile) {
    const abs = path.isAbsolute(rel) ? rel : path.join(OC_ROOT, "output", rel.replace(/\\/g, "/"));
    if (!fs.existsSync(abs)) {
      console.error("Missing file:", abs);
      process.exit(1);
    }
    const raw = fs.readFileSync(abs, "utf8");
    const blocks = parseBlocksInFile(raw);
    const map = new Map(blocks.map((b) => [`${b.slug}\0${b.seif}\0${b.marker}`, b]));
    for (const it of items) {
      const k = `${it.slug}\0${it.seif}\0${it.marker}`;
      const b = map.get(k);
      if (!b) {
        console.error("Block not found:", rel, it.id);
        process.exit(1);
      }
      b.en = it.en;
    }
    const rebuilt = blocks.map((b) => serializeBlock(b)).join("\n\n").trimEnd() + "\n";
    fs.writeFileSync(abs, rebuilt, "utf8");
  }
}

async function main() {
  const { siman, part, parts, unitId } = parseArgs();
  const tag = String(siman).padStart(3, "0");
  const suffix = parts > 1 ? `-part${part}of${parts}` : "";
  const queuePath = path.join(WORK, `editorial-queue-siman-${tag}${suffix}.json`);
  const batchPath = path.join(WORK, `batch-editorial-siman-${tag}${suffix}.md`);

  if (!fs.existsSync(queuePath)) {
    console.error("Missing queue:", queuePath);
    process.exit(1);
  }

  const backend = detectBackend();
  if (!backend) {
    console.error(
      "No translation backend. Set OC001_POOL_BACKEND=ollama + OC001_OLLAMA_URL, or claude-cli, or CURSOR_API_KEY."
    );
    process.exit(1);
  }
  console.log(`[${unitId}] backend=${backend} queue=${path.basename(queuePath)}`);

  if (backend === "claude-cli") {
    translateWithClaudeCli(unitId, batchPath, siman, part, parts);
    const r = spawnSync(
      process.execPath,
      [
        path.join(__dirname, "sprint-worker.mjs"),
        "--siman",
        String(siman),
        "--part",
        String(part),
        "--parts",
        String(parts),
      ],
      { cwd: OC_ROOT, stdio: "inherit", env: { ...process.env, SPRINT_WORKER_ID: "claude-cli" } }
    );
    if (r.status !== 0) process.exit(r.status ?? 1);
    console.log(`[${unitId}] complete (claude-cli)`);
    return;
  }

  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const items = queue.items || [];
  let ok = 0;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const heM = (it.rawBlock || "").match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
    const slugM = (it.rawBlock || "").match(/^slug:\s*(.*)$/m);
    const seifM = (it.rawBlock || "").match(/^seif:\s*(.*)$/m);
    const markerM = (it.rawBlock || "").match(/^marker:\s*(.*)$/m);
    it.he = heM?.[1] ?? "";
    it.slug = it.slug || slugM?.[1]?.trim() || "";
    it.seif = it.seif || seifM?.[1]?.trim() || "";
    it.marker = it.marker || markerM?.[1]?.trim() || "_";
    if (!it.he.trim()) continue;
    process.stdout.write(`  [${i + 1}/${items.length}] ${it.id} … `);
    try {
      it.en = await translateBlock(it, backend);
      ok++;
      console.log("ok");
    } catch (e) {
      console.log("FAIL", e.message);
      process.exit(1);
    }
  }
  console.log(`Translated ${ok}/${items.length} blocks`);
  applyTranslations(queuePath);

  const r = spawnSync(
    process.execPath,
    [
      path.join(__dirname, "sprint-worker.mjs"),
      "--siman",
      String(siman),
      "--part",
      String(part),
      "--parts",
      String(parts),
    ],
    {
      cwd: OC_ROOT,
      stdio: "inherit",
      env: { ...process.env, SPRINT_WORKER_ID: process.env.SPRINT_WORKER_ID || "pool-worker" },
    }
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
  console.log(`[${unitId}] complete (batch: ${path.basename(batchPath)})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
