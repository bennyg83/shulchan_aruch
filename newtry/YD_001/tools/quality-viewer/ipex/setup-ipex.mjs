#!/usr/bin/env node
/**
 * Download and extract IPEX-LLM portable llama.cpp for Windows (Intel GPU/SYCL).
 *   node ipex/setup-ipex.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const IPEX_ROOT = path.dirname(fileURLToPath(import.meta.url));
import { getActiveProfile, loadIpexConfig } from "./lib/ipex-config.mjs";
const cfg = loadIpexConfig();
const zipPath = path.join(IPEX_ROOT, cfg.zipName);
const extractDir = path.join(IPEX_ROOT, "runtime");

function findLlamaServer(dir) {
  if (!fs.existsSync(dir)) return null;
  const direct = path.join(dir, "llama-server.exe");
  if (fs.existsSync(direct)) return direct;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      const nested = findLlamaServer(p);
      if (nested) return nested;
    }
  }
  return null;
}

async function download(url, dest) {
  console.log(`[DOWNLOAD] ${url}`);
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
  fs.writeFileSync(dest, Buffer.concat(chunks.map((c) => Buffer.from(c))));
}

function extractZip(zip, dest) {
  fs.mkdirSync(dest, { recursive: true });
  if (process.platform === "win32") {
    const ps = spawnSync(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `Expand-Archive -LiteralPath '${zip.replace(/'/g, "''")}' -DestinationPath '${dest.replace(/'/g, "''")}' -Force`,
      ],
      { stdio: "inherit" }
    );
    if (ps.status !== 0) throw new Error("Expand-Archive failed");
    return;
  }
  const unzip = spawnSync("unzip", ["-o", zip, "-d", dest], { stdio: "inherit" });
  if (unzip.status !== 0) throw new Error("unzip failed");
}

async function main() {
  let server = findLlamaServer(extractDir);
  if (server) {
    console.log("[SKIP] IPEX runtime already present:");
    console.log(" ", server);
    return;
  }

  if (!fs.existsSync(zipPath)) {
    await download(cfg.downloadUrl, zipPath);
  } else {
    console.log("[SKIP] Zip already downloaded:", zipPath);
  }

  console.log("[EXTRACT]", extractDir);
  extractZip(zipPath, extractDir);
  server = findLlamaServer(extractDir);
  if (!server) {
    throw new Error("llama-server.exe not found after extract — check zip layout");
  }
  console.log("[OK] IPEX llama-server:", server);
  const profile = getActiveProfile();
  if (!fs.existsSync(profile.modelPath)) {
    console.warn(`[WARN] Active profile "${profile.name}" model not found:`);
    console.warn(" ", profile.modelPath);
    if (profile.name === "fast") {
      console.warn("Run: node ipex/setup-fast-model.mjs");
    }
  } else {
    console.log(`[OK] Active profile: ${profile.name} — ${profile.label}`);
    console.log("[OK] Model:", profile.modelPath);
  }
}

main().catch((err) => {
  console.error("[ERROR]", err.message || err);
  process.exit(1);
});
