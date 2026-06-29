#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const outPath = path.join(__dirname, "work", "slot13-need-fixes.json");
const fixes = JSON.parse(fs.readFileSync(outPath, "utf8"));
const dict = fs.readFileSync(path.join(OC_ROOT, "full_dictionary.md"), "utf8").slice(0, 8000);

const jobs = [
  { siman: 518, rel: "turei-zahav/part-001.txt", seif: "4", marker: "_" },
  { siman: 518, rel: "turei-zahav/part-001.txt", seif: "8", marker: "_" },
];

function claude() {
  const r = spawnSync(process.platform === "win32" ? "where" : "which", ["claude"], { encoding: "utf8" });
  return (r.stdout || "").split(/\r?\n/).find((l) => l.trim())?.trim() || "claude";
}
function extractJson(t) {
  const s = String(t).trim();
  const f = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (f) return JSON.parse(f[1].trim());
  const a = s.indexOf("{");
  const b = s.lastIndexOf("}");
  return JSON.parse(s.slice(a, b + 1));
}

const cmd = claude();
for (const job of jobs) {
  const fp = path.join(OC_ROOT, "output", `siman_${job.siman}`, job.rel);
  const b = parseBlocksInFile(fs.readFileSync(fp, "utf8")).find(
    (x) => String(x.seif) === job.seif && String(x.marker || "_") === job.marker
  );
  const he = plainFromHtml(b.he);
  const key = `${job.siman}|${job.rel}|${job.seif}:${job.marker}`;
  console.log("translating", key, "chars", he.length);
  const prompt = `Translate this Taz (Turai Zahav) commentary on OC siman ${job.siman} to English. COMPLETE translation, every word. Halachic terms. Expand abbreviations. No Lord/Capernaum. Plain text only.

Dictionary excerpt:
${dict}

Return ONLY JSON: {"en": "<full english translation>"}

HEBREW:
${he}`;

  const r = spawnSync(cmd, ["--print"], {
    cwd: OC_ROOT,
    input: prompt,
    encoding: "utf8",
    timeout: 35 * 60 * 1000,
    maxBuffer: 100 * 1024 * 1024,
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    console.error("fail", key, r.stderr?.slice(0, 500));
    process.exit(1);
  }
  const got = extractJson(r.stdout);
  fixes[key] = got.en || got[key] || Object.values(got)[0];
  fs.writeFileSync(outPath, JSON.stringify(fixes, null, 2) + "\n", "utf8");
  console.log("ok", key, fixes[key].length);
}
