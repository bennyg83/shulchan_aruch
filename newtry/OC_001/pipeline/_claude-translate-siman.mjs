#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", `slot13-need-siman-${siman}.json`), "utf8")
);

const lines = need.items.map((it) => {
  const id = `${it.rel}|${it.key}`;
  return `ID: ${id}\nMARKER: ${it.marker}\nHEBREW:\n${it.hePlain || it.he}\n---`;
});

const prompt = `Translate each HEBREW block to English. Return ONLY a JSON object mapping each ID string to its English translation (no markdown fence).

Rules: translate every word; no additions; Magen Avraham, Taz, Beit Yosef, Rambam, Rashi; expand abbreviations; Arabic siman numbers; {Rama: ...}; Hebrew note markers as (א) etc.

${lines.join("\n")}`;

const promptPath = path.join(__dirname, "work", `_claude-prompt-siman-${siman}.txt`);
fs.writeFileSync(promptPath, prompt, "utf8");
const r = spawnSync("claude", ["-p"], {
  encoding: "utf8",
  maxBuffer: 80 * 1024 * 1024,
  shell: true,
  windowsHide: true,
  input: prompt,
});

if (r.error) {
  console.error("spawn error", r.error);
  process.exit(1);
}
if (r.status !== 0) {
  console.error("claude failed status", r.status);
  console.error(r.stderr?.slice(0, 2000) || r.stdout?.slice(0, 2000));
  process.exit(1);
}

let text = r.stdout.trim();
const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
if (fence) text = fence[1].trim();
const parsed = JSON.parse(text);

const fixes = {};
for (const it of need.items) {
  const id = `${it.rel}|${it.key}`;
  let en = parsed[id];
  if (!en) {
    console.error("missing", id, "keys:", Object.keys(parsed).slice(0, 5));
    process.exit(1);
  }
  if (!fixes[it.rel]) fixes[it.rel] = {};
  fixes[it.rel][it.key] = en;
}

const outPath = path.join(__dirname, "slot13-manual-506-515.json");
let all = {};
if (fs.existsSync(outPath)) all = JSON.parse(fs.readFileSync(outPath, "utf8"));
all[siman] = fixes;
fs.writeFileSync(outPath, JSON.stringify(all, null, 2) + "\n", "utf8");
console.log("OK siman", siman, need.count, "blocks");
