/**
 * scan-qwen-progress.mjs
 * Reads qwen-pass.log + tagged output files to produce live progress data
 * for the quality viewer's Qwen Pass panel.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const VIEWER_ROOT = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT     = path.resolve(VIEWER_ROOT, "../..");
const OUTPUT_ROOT = path.join(YD_ROOT, "output");
const QWEN_LOG    = path.join(YD_ROOT, "qwen-pass.log");
const PROG_LOG    = path.join(YD_ROOT, "progress.log");

const TOTAL_ERROR_SIMANIM = 268;   // from quality report
const TOTAL_ERROR_BLOCKS  = 5341;  // from quality report

// Parse a qwen-pass tag line from a file header
// "# qwen-pass: <ISO>  model: <m>  siman: <n>  file: <f>  fixed: <a>/<b>"
function parseTagLine(line) {
  const ts     = line.match(/qwen-pass:\s*(\S+)/)?.[1] ?? null;
  const siman  = parseInt(line.match(/siman:\s*(\d+)/)?.[1] ?? "0");
  const fixed  = parseInt(line.match(/fixed:\s*(\d+)/)?.[1] ?? "0");
  const total  = parseInt(line.match(/\/(\d+)/)?.[1] ?? "0");
  const file   = line.match(/file:\s*(\S+)/)?.[1] ?? "";
  return { ts, siman, fixed, total, file };
}

/** Scan every output txt file for a qwen-pass tag header line. Cached by mtime. */
let _fileCache = new Map();   // relPath -> { mtime, tag }

function scanTaggedFiles() {
  if (!fs.existsSync(OUTPUT_ROOT)) return [];

  const results = [];
  const simanDirs = fs.readdirSync(OUTPUT_ROOT)
    .filter(d => /^siman_\d+$/.test(d))
    .sort();

  for (const simanDir of simanDirs) {
    const simanPath = path.join(OUTPUT_ROOT, simanDir);
    let commentaries;
    try { commentaries = fs.readdirSync(simanPath); } catch { continue; }

    for (const slug of commentaries) {
      const partPath = path.join(simanPath, slug, "part-001.txt");
      if (!fs.existsSync(partPath)) continue;

      const mtime = fs.statSync(partPath).mtimeMs;
      const relPath = `${simanDir}/${slug}/part-001.txt`;

      const cached = _fileCache.get(relPath);
      if (cached && cached.mtime === mtime) {
        if (cached.tag) results.push(cached.tag);
        continue;
      }

      // Read only the first line
      let firstLine = "";
      try {
        const fd = fs.openSync(partPath, "r");
        const buf = Buffer.alloc(256);
        const n = fs.readSync(fd, buf, 0, 256, 0);
        fs.closeSync(fd);
        firstLine = buf.slice(0, n).toString("utf8").split("\n")[0];
      } catch { /* skip */ }

      if (firstLine.startsWith("# qwen-pass:")) {
        const tag = { relPath, mtime, ...parseTagLine(firstLine) };
        _fileCache.set(relPath, { mtime, tag });
        results.push(tag);
      } else {
        _fileCache.set(relPath, { mtime, tag: null });
      }
    }
  }
  return results;
}

/** Read last N lines of qwen-pass.log */
function readQwenLog(maxLines = 60) {
  if (!fs.existsSync(QWEN_LOG)) return [];
  const raw = fs.readFileSync(QWEN_LOG, "utf8");
  return raw.split("\n").filter(Boolean).slice(-maxLines);
}

/** Parse progress.log for qwen-pass DONE entries */
function loadQwenProgressEntries() {
  if (!fs.existsSync(PROG_LOG)) return [];
  const entries = [];
  for (const line of fs.readFileSync(PROG_LOG, "utf8").split("\n")) {
    if (line.includes("qwen-pass DONE")) {
      const ts    = line.match(/^(\S+)/)?.[1] ?? "";
      const siman = parseInt(line.match(/siman_(\d+)/)?.[1] ?? "0");
      const fixed = parseInt(line.match(/\((\d+) blocks/)?.[1] ?? "0");
      if (siman) entries.push({ ts, siman, fixed });
    }
  }
  return entries;
}

export function scanQwenProgress() {
  const taggedFiles  = scanTaggedFiles();
  const logLines     = readQwenLog(80);
  const doneEntries  = loadQwenProgressEntries();

  // Aggregate per-siman stats from tagged files
  const bySimanMap = new Map();
  let totalFixed = 0;
  for (const f of taggedFiles) {
    if (!bySimanMap.has(f.siman)) bySimanMap.set(f.siman, { siman: f.siman, files: 0, fixed: 0, ts: f.ts });
    const row = bySimanMap.get(f.siman);
    row.files++;
    row.fixed += f.fixed;
    if (f.ts > row.ts) row.ts = f.ts;
    totalFixed += f.fixed;
  }

  const doneSimanim = new Set(doneEntries.map(e => e.siman));
  const taggedSimanim = [...bySimanMap.values()].sort((a, b) => a.siman - b.siman);

  // Detect currently-active siman from last log line
  let activeSiman = null;
  for (let i = logLines.length - 1; i >= 0; i--) {
    const m = logLines[i].match(/siman_(\d+)/);
    if (m) { activeSiman = parseInt(m[1]); break; }
  }

  // Parse overall progress line if present
  const progressPct = TOTAL_ERROR_BLOCKS > 0
    ? Math.round((totalFixed / TOTAL_ERROR_BLOCKS) * 1000) / 10
    : 0;

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      targetSimanim: TOTAL_ERROR_SIMANIM,
      targetBlocks:  TOTAL_ERROR_BLOCKS,
      doneSimanim:   doneSimanim.size,
      taggedFiles:   taggedFiles.length,
      fixedBlocks:   totalFixed,
      pct:           progressPct,
    },
    activeSiman,
    simanim:    taggedSimanim,
    doneSet:    [...doneSimanim],
    logLines:   logLines.slice(-40).reverse(),
  };
}
