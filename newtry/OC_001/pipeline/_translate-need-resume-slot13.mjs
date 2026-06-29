#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const items = JSON.parse(fs.readFileSync(path.join(__dirname, "work", "need-he-dump.json"), "utf8"));
const outPath = path.join(__dirname, "work", "slot13-need-fixes.json");
const fixes = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf8")) : {};
const dict = fs.readFileSync(path.join(__dirname, "..", "full_dictionary.md"), "utf8").slice(0, 12000);
const OC_ROOT = path.join(__dirname, "..");

const remaining = items.filter((it) => !fixes[`${it.siman}|${it.rel}|${it.key}`]);
console.log("remaining", remaining.length);

function resolveClaudeCmd() {
  const r = spawnSync(process.platform === "win32" ? "where" : "which", ["claude"], { encoding: "utf8" });
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
for (let i = 0; i < remaining.length; i++) {
  const it = remaining[i];
  const key = `${it.siman}|${it.rel}|${it.key}`;
  console.log(i + 1, key, "he len", it.hePlain.length);
  const prompt = `Translate ONE Shulchan Aruch OC block. Complete, no omissions. Expand abbreviations. Halachic terms. No Lord/Capernaum. Rama: {Rama: ...}. Markers: א=(1), ב=(2), etc. at start if note marker.

Dictionary excerpt:
${dict}

Return ONLY JSON: { "${key}": "<english>" }

HEBREW:
${it.hePlain}`;

  const r = spawnSync(claude, ["--print"], {
    cwd: OC_ROOT,
    encoding: "utf8",
    input: prompt,
    timeout: 25 * 60 * 1000,
    maxBuffer: 80 * 1024 * 1024,
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    console.error("fail", r.stderr?.slice(0, 200));
    continue;
  }
  try {
    const got = extractJson(r.stdout);
    Object.assign(fixes, got);
    fs.writeFileSync(outPath, JSON.stringify(fixes, null, 2) + "\n", "utf8");
    console.log("  ok", Object.keys(got)[0]?.slice(0, 40));
  } catch (e) {
    console.error("parse", e.message);
  }
}
console.log("done", Object.keys(fixes).length);
