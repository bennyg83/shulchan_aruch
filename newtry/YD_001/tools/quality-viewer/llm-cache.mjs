import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadLlmConfig } from "./llm-validator.mjs";

const VIEWER_ROOT = path.dirname(fileURLToPath(import.meta.url));

function cachePath() {
  const cfg = loadLlmConfig();
  const rel = cfg.cache_file || "cache/llm-reviewed.jsonl";
  return path.isAbsolute(rel) ? rel : path.join(VIEWER_ROOT, rel);
}

export function loadLlmCacheMap() {
  const fp = cachePath();
  const map = new Map();
  if (!fs.existsSync(fp)) return map;
  for (const line of fs.readFileSync(fp, "utf8").split("\n")) {
    const t = line.trim();
    if (!t) continue;
    try {
      const row = JSON.parse(t);
      if (row.id) map.set(row.id, row);
    } catch {
      /* skip bad line */
    }
  }
  return map;
}

export function appendLlmCache(row) {
  const fp = cachePath();
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.appendFileSync(fp, JSON.stringify(row) + "\n", "utf8");
}

export function upsertLlmCache(row) {
  const map = loadLlmCacheMap();
  map.set(row.id, row);
  writeLlmCacheMap(map);
}

export function writeLlmCacheMap(map) {
  const fp = cachePath();
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  const lines = [...map.values()].map((r) => JSON.stringify(r));
  fs.writeFileSync(fp, lines.join("\n") + (lines.length ? "\n" : ""), "utf8");
}

export function summarizeLlmCache(map = loadLlmCacheMap()) {
  const byLabel = { A: 0, B: 0, C: 0, D: 0 };
  let escalate = 0;
  let clean = 0;
  for (const row of map.values()) {
    byLabel[row.label] = (byLabel[row.label] || 0) + 1;
    if (row.escalate) escalate++;
    if (row.clean) clean++;
  }
  return {
    reviewed: map.size,
    byLabel,
    escalate,
    clean,
    pending: map.size - clean,
  };
}

export function getCachePath() {
  return cachePath();
}
