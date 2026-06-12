import fs from "fs";
import path from "path";
import { scanMechaberQuality } from "./scan-mechaber-quality.mjs";
import {
  buildValidationItem,
  callValidator,
  checkLlmServer,
  loadLlmConfig,
} from "./llm-validator.mjs";
import { loadLlmCacheMap, summarizeLlmCache, upsertLlmCache } from "./llm-cache.mjs";

let runningJob = null;

export async function getLlmStatus() {
  const config = loadLlmConfig();
  const server = await checkLlmServer(config);
  const cache = summarizeLlmCache();
  return {
    server,
    model: config.model,
    serverUrl: config.server_url,
    cache,
    job: runningJob,
  };
}

function collectBlocks({ siman, pending, limit }) {
  const scan = scanMechaberQuality();
  let simanim = scan.simanim;
  if (siman) simanim = simanim.filter((s) => s.siman === siman);
  if (pending) simanim = simanim.filter((s) => s.status !== "pass");

  const items = [];
  for (const row of simanim) {
    const detail = scanMechaberQuality({ siman: row.siman });
    for (const b of detail.simanim[0]?.blocks ?? []) {
      if (pending && b.passed) continue;
      items.push({ block: b, siman: row.siman });
    }
  }
  return items.slice(0, limit ?? items.length);
}

export async function runLlmValidationJob(opts, onProgress) {
  if (runningJob) throw new Error("LLM validation already running");

  const config = loadLlmConfig();
  const server = await checkLlmServer(config);
  if (!server.ok) {
    throw new Error(`Local LLM unreachable at ${config.server_url}`);
  }

  const cache = loadLlmCacheMap();
  const queue = collectBlocks(opts).filter(({ block }) => !cache.has(block.id) || opts.force);
  runningJob = {
    startedAt: new Date().toISOString(),
    total: queue.length,
    done: 0,
    scope: opts,
  };

  try {
    for (const { block, siman } of queue) {
      runningJob.current = block.id;
      const item = buildValidationItem({
        siman,
        relPath: block.relPath,
        seif: block.seif,
        marker: block.marker,
        hePlain: block.heFull,
        enPlain: block.enFull,
      });
      let result;
      try {
        result = await callValidator(item, config);
      } catch (err) {
        result = {
          id: item.id,
          label: "D",
          confidence: 0,
          reason: String(err.message).slice(0, 160),
          flags: ["possible meaning issue"],
          escalate: true,
          clean: false,
          validatedAt: new Date().toISOString(),
        };
      }
      upsertLlmCache(result);
      runningJob.done++;
      onProgress?.({ type: "block", result, job: { ...runningJob } });
    }
    const summary = summarizeLlmCache();
    onProgress?.({ type: "done", summary, job: { ...runningJob } });
    return { reviewed: queue.length, summary };
  } finally {
    runningJob = null;
  }
}

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}
