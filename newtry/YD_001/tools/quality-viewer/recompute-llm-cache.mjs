#!/usr/bin/env node
/** Recompute escalate/clean on cached LLM rows after logic or prompt fixes. */
import { loadLlmCacheMap, writeLlmCacheMap } from "./llm-cache.mjs";
import { isLlmClean, shouldEscalate, normalizeFlags } from "./llm-validator.mjs";

const map = loadLlmCacheMap();
let updated = 0;
for (const [id, row] of map) {
  const label = String(row.label ?? "D").toUpperCase();
  const confidence = Number(row.confidence ?? 0);
  const reason = String(row.reason ?? "");
  const flags = normalizeFlags(row.flags ?? [], label, confidence, reason);
  const escalate = shouldEscalate(label, confidence, flags, reason);
  const clean = isLlmClean(label, confidence, flags, escalate, reason);
  if (
    row.escalate !== escalate ||
    row.clean !== clean ||
    JSON.stringify(row.flags) !== JSON.stringify(flags)
  ) {
    map.set(id, { ...row, flags, escalate, clean });
    updated++;
  }
}
writeLlmCacheMap(map);
console.log(`[OK] Recomputed ${updated} of ${map.size} cached reviews`);
