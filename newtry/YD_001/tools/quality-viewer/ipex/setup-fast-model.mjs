#!/usr/bin/env node
/**
 * Download Qwen2.5-3B-Instruct Q4_K_M for the fast validation profile.
 *   node ipex/setup-fast-model.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getProfile } from "./lib/ipex-config.mjs";

const profile = getProfile("fast");
const dest = profile.modelPath;

async function download(url, outPath) {
  console.log("[DOWNLOAD]", url);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
  const total = Number(res.headers.get("content-length") || 0);
  const reader = res.body.getReader();
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total) {
      const pct = Math.round((received / total) * 100);
      process.stdout.write(`\r  ${pct}% (${Math.round(received / 1e6)} MB)`);
    }
  }
  process.stdout.write("\n");
  fs.writeFileSync(outPath, Buffer.concat(chunks.map((c) => Buffer.from(c))));
}

async function main() {
  if (fs.existsSync(dest)) {
    console.log("[SKIP] Fast model already present:");
    console.log(" ", dest);
    return;
  }
  if (!profile.downloadUrl) {
    throw new Error("No downloadUrl configured for fast profile");
  }
  await download(profile.downloadUrl, dest);
  console.log("[OK]", dest);
}

main().catch((err) => {
  console.error("[ERROR]", err.message || err);
  process.exit(1);
});
