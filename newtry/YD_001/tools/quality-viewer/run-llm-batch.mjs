#!/usr/bin/env node
/**
 * Run local Qwen validator (llama-server :8080) on YD mechaber blocks.
 *
 *   node run-llm-batch.mjs --all              # all YD mechaber (+ embedded Rema) blocks
 *   node run-llm-batch.mjs --pending          # heuristic failures first
 *   node run-llm-batch.mjs --quality-pass     # simanim logged as mechaber quality-pass
 *   node run-llm-batch.mjs --siman 114
 *   node run-llm-batch.mjs --from 114 --to 116
 *   node run-llm-batch.mjs --limit 20
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { scanMechaberQuality, loadProgressMeta } from "./scan-mechaber-quality.mjs";
import { loadLlmCacheMap, upsertLlmCache, summarizeLlmCache } from "./llm-cache.mjs";
import { buildValidationItem, callValidator, checkLlmServer, loadLlmConfig } from "./llm-validator.mjs";

const VIEWER_ROOT = path.dirname(fileURLToPath(import.meta.url));
const LOCK_FILE = path.join(VIEWER_ROOT, "cache", "llm-batch.lock");

function acquireLock() {
  fs.mkdirSync(path.dirname(LOCK_FILE), { recursive: true });
  if (fs.existsSync(LOCK_FILE)) {
    const owner = fs.readFileSync(LOCK_FILE, "utf8").trim();
    console.error(`[ERROR] Another LLM batch is running (pid ${owner}). Stop it first.`);
    process.exit(1);
  }
  fs.writeFileSync(LOCK_FILE, String(process.pid));
  const release = () => {
    try {
      if (fs.existsSync(LOCK_FILE) && fs.readFileSync(LOCK_FILE, "utf8").trim() === String(process.pid)) {
        fs.unlinkSync(LOCK_FILE);
      }
    } catch {
      /* ignore */
    }
  };
  process.on("exit", release);
  process.on("SIGINT", () => {
    release();
    process.exit(130);
  });
  process.on("SIGTERM", () => {
    release();
    process.exit(143);
  });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    pending: false,
    qualityPass: false,
    all: false,
    siman: null,
    from: null,
    to: null,
    limit: Infinity,
    force: false,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--pending":
        opts.pending = true;
        break;
      case "--quality-pass":
        opts.qualityPass = true;
        break;
      case "--all":
        opts.all = true;
        break;
      case "--siman":
        opts.siman = Number(args[++i]);
        break;
      case "--from":
        opts.from = Number(args[++i]);
        break;
      case "--to":
        opts.to = Number(args[++i]);
        break;
      case "--limit":
        opts.limit = Number(args[++i]);
        break;
      case "--force":
        opts.force = true;
        break;
    }
  }
  return opts;
}

function simanimCount(opts) {
  const progress = loadProgressMeta();
  const scan = scanMechaberQuality();
  let simanim = scan.simanim;
  if (opts.qualityPass) simanim = simanim.filter((s) => progress.qualityPassSimanim.has(s.siman));
  if (opts.siman) simanim = simanim.filter((s) => s.siman === opts.siman);
  if (opts.from != null) simanim = simanim.filter((s) => s.siman >= opts.from);
  if (opts.to != null) simanim = simanim.filter((s) => s.siman <= opts.to);
  if (opts.pending) simanim = simanim.filter((s) => s.status !== "pass");
  return simanim.length;
}

function collectItems(opts) {
  const progress = loadProgressMeta();
  const scan = scanMechaberQuality();
  let simanim = scan.simanim;
  if (opts.qualityPass) {
    simanim = simanim.filter((s) => progress.qualityPassSimanim.has(s.siman));
  } else if (!opts.all && !opts.siman && opts.from == null && opts.to == null && !opts.pending) {
    console.error("[ERROR] Pick a scope: --all, --quality-pass, --pending, --siman, or --from/--to");
    process.exit(1);
  }
  if (opts.siman) simanim = simanim.filter((s) => s.siman === opts.siman);
  if (opts.from != null) simanim = simanim.filter((s) => s.siman >= opts.from);
  if (opts.to != null) simanim = simanim.filter((s) => s.siman <= opts.to);
  if (opts.pending) simanim = simanim.filter((s) => s.status !== "pass");

  const items = [];
  for (const row of simanim) {
    const detail = scanMechaberQuality({ siman: row.siman });
    const blocks = detail.simanim[0]?.blocks ?? [];
    for (const b of blocks) {
      if (opts.pending && b.passed) continue;
      items.push(
        buildValidationItem({
          siman: row.siman,
          relPath: b.relPath,
          seif: b.seif,
          marker: b.marker,
          hePlain: b.heFull,
          enPlain: b.enFull,
        })
      );
    }
  }
  return items.slice(0, opts.limit);
}

async function main() {
  acquireLock();
  const opts = parseArgs();
  const config = loadLlmConfig();
  const server = await checkLlmServer(config);
  if (!server.ok) {
    console.error("[ERROR] Local LLM not reachable at", config.server_url);
    console.error(server.error || `status ${server.status}`);
    process.exit(1);
  }
  console.log("[OK] LLM server:", config.server_url);

  const cache = loadLlmCacheMap();
  const items = collectItems(opts);
  const pending = items.filter((item) => opts.force || !cache.has(item.id));
  console.log(`[SCOPE] YD mechaber + embedded Rema — ${simanimCount(opts)} simanim`);
  console.log(`[QUEUE] ${pending.length} to validate (${items.length} total, ${items.length - pending.length} cached)`);

  let done = 0;
  for (const item of pending) {
    done++;
    process.stdout.write(`[${done}/${pending.length}] ${item.id} … `);
    try {
      const result = await callValidator(item, config);
      upsertLlmCache(result);
      console.log(`${result.label} (${result.confidence}) escalate=${result.escalate}`);
    } catch (err) {
      console.log(`FAIL: ${err.message}`);
      upsertLlmCache({
        id: item.id,
        label: "D",
        confidence: 0,
        reason: String(err.message).slice(0, 160),
        flags: ["possible meaning issue"],
        escalate: true,
        clean: false,
        validatedAt: new Date().toISOString(),
      });
    }
  }

  const summary = summarizeLlmCache(loadLlmCacheMap());
  console.log("\n[DONE]", JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
