/**
 * Validate + apply CM1 retranslate kit replies → source TXT English blocks.
 *
 *   node apply_cm1_retranslate_replies.mjs --replies <dir>
 *   node apply_cm1_retranslate_replies.mjs --replies <dir> --dry-run
 *   node apply_cm1_retranslate_replies.mjs --replies <dir> --worksheets <kit/worksheets>
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CM_OUT = path.resolve(__dirname, "../../CM_001/output");

const args = process.argv.slice(2);
function arg(name, def = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
}
const repliesDir = arg("--replies");
const worksheetsDir = arg("--worksheets", null);
const dry = args.includes("--dry-run");
const ignoreSeifMismatch = args.includes("--ignore-seif-mismatch");

const DIRTY_RE =
  /\bthe Lord\b|Lord['']?s Prayer|Hashem['']?s Word|Hashem['']?s people|\bPassover\b|\bPsalms?\b|\bthe Bible\b|\bYahweh\b|\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b|Capernaum|hand recoils|Saturday|Don['']?t fuck|soundtrack from Darren|And thou, Capernaum|apostle|New Testament|\bchurch(?:es)?\b|crucifix|\bislam(?:ic)?\b|koran|qur['']?an|gospel|vatican|trinity/i;
const HEBREW_LEAK = /[\u0590-\u05FF]{2,}/;
const BLOCK_START = "**** CM001 SOURCE BLOCK ****";
const BLOCK_END = "**** END BLOCK ****";
const HEBREW_HDR = "**** HEBREW ****";
const ENGLISH_HDR = "**** ENGLISH ****";

function collectReplyFiles(d) {
  const out = [];
  function walk(p) {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const fp = path.join(p, e.name);
      if (e.isDirectory()) walk(fp);
      else if (/\.reply\.json$/i.test(e.name) && !/example\.reply\.json$/i.test(e.name)) out.push(fp);
    }
  }
  walk(d);
  return out.sort();
}

function parseBlocks(raw) {
  const text = String(raw).replace(/\r\n/g, "\n");
  const re = /^\*{4}\s*CM001 SOURCE BLOCK\s*\*{4}\s*$/m;
  const parts = text.split(re);
  const preamble = parts[0] ?? "";
  const blocks = [];
  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    const endM = seg.match(/^\*{4}\s*END BLOCK\s*\*{4}\s*$/m);
    let body = seg;
    let after = "";
    if (endM) {
      const idx = endM.index;
      body = seg.slice(0, idx);
      after = seg.slice(idx + endM[0].length);
    }
    const slug = (body.match(/^slug:\s*(.+)$/m) || [])[1]?.trim() || "";
    const seif = Number((body.match(/^seif:\s*(\d+)/m) || [])[1] || 0);
    const marker = (body.match(/^marker:\s*(.*)$/m) || [])[1]?.trim() || "_";
    const heM = body.match(/\*{4}\s*HEBREW\s*\*{4}\r?\n?([\s\S]*?)\*{4}\s*ENGLISH\s*\*{4}/);
    const enM = body.match(/\*{4}\s*ENGLISH\s*\*{4}\r?\n?([\s\S]*)$/);
    blocks.push({
      slug,
      seif,
      marker,
      he: heM ? heM[1].replace(/\s+$/, "") : "",
      en: enM ? enM[1].replace(/\s+$/, "") : "",
      after,
    });
  }
  return { preamble, blocks };
}

function serializeBlocks(preamble, blocks) {
  let out = preamble || "";
  for (const b of blocks) {
    out += [
      BLOCK_START,
      `slug: ${b.slug}`,
      `seif: ${b.seif}`,
      `marker: ${b.marker}`,
      HEBREW_HDR,
      b.he,
      ENGLISH_HDR,
      b.en,
      BLOCK_END,
      "",
      "",
    ].join("\n");
  }
  return out.replace(/\n+$/, "\n");
}

function resolveSourcePath(p) {
  if (p.source_txt_path && fs.existsSync(p.source_txt_path)) return p.source_txt_path;
  // synthesize from CM_OUT
  if (p.siman != null && p.slug && p.part_file) {
    const syn = path.join(
      CM_OUT,
      `siman_${String(p.siman).padStart(3, "0")}`,
      p.slug,
      p.part_file
    );
    if (fs.existsSync(syn)) return syn;
  }
  return p.source_txt_path || null;
}

function residualFlags(en) {
  const flags = [];
  if (!en || !String(en).trim()) flags.push("empty");
  if (DIRTY_RE.test(en || "")) flags.push("dirty_re");
  if (HEBREW_LEAK.test(en || "")) flags.push("hebrewLeak");
  return flags;
}

if (!repliesDir || !fs.existsSync(repliesDir)) {
  console.error("Required: --replies <dir>");
  process.exit(1);
}

const wsByName = new Map();
if (worksheetsDir && fs.existsSync(worksheetsDir)) {
  for (const f of fs.readdirSync(worksheetsDir).filter((n) => n.endsWith(".json"))) {
    wsByName.set(f.replace(/\.json$/i, ""), JSON.parse(fs.readFileSync(path.join(worksheetsDir, f), "utf8")));
  }
}

const files = collectReplyFiles(repliesDir);
let ok = 0;
let fail = 0;
let wroteButFlags = 0;
let seifMismatchIgnored = 0;
const report = [];
const touchedFiles = new Map(); // path -> {preamble, blocks} mutated

for (const f of files) {
  let j;
  try {
    j = JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    fail++;
    report.push({ file: path.basename(f), status: "fail", reason: "bad json: " + e.message });
    continue;
  }
  const base = path.basename(f).replace(/\.reply\.json$/i, "");
  const ws = wsByName.get(base) || null;
  if (worksheetsDir && !ws) {
    report.push({ file: path.basename(f), status: "warn", reason: "no matching worksheet" });
  }
  if (ws && Array.isArray(ws.parts) && Array.isArray(j.parts) && ws.parts.length !== j.parts.length) {
    fail++;
    report.push({
      file: path.basename(f),
      status: "fail",
      reason: `parts length mismatch ws=${ws.parts.length} reply=${j.parts.length}`,
    });
    continue;
  }

  for (const p of j.parts || []) {
    const action = p.action || p.decision || "";
    if (action && !/retranslate/i.test(String(action))) {
      report.push({ file: path.basename(f), part_index: p.part_index, status: "skipped", reason: action });
      continue;
    }
    const en = typeof p.new_en === "string" ? p.new_en.trim() : "";
    const srcPath = resolveSourcePath(p);
    const idx = Number(p.part_index_in_file);
    if (!srcPath || !fs.existsSync(srcPath) || !Number.isFinite(idx) || idx < 0 || !en) {
      fail++;
      report.push({
        file: path.basename(f),
        part_index: p.part_index,
        status: "fail",
        reason: !en ? "empty new_en" : !srcPath || !fs.existsSync(srcPath) ? "missing source" : "bad part_index_in_file",
        srcPath,
        idx,
      });
      continue;
    }

    // identity check vs worksheet when available
    if (ws && ws.parts[p.part_index]) {
      const w = ws.parts[p.part_index];
      const mismatches = [];
      for (const k of ["slug", "siman", "seif", "part_file", "part_index_in_file"]) {
        if (w[k] != null && p[k] != null && String(w[k]) !== String(p[k])) mismatches.push(k);
      }
      if (mismatches.length) {
        fail++;
        report.push({
          file: path.basename(f),
          part_index: p.part_index,
          status: "fail",
          reason: "identity mismatch: " + mismatches.join(","),
        });
        continue;
      }
    }

    if (!touchedFiles.has(srcPath)) {
      const parsed = parseBlocks(fs.readFileSync(srcPath, "utf8"));
      touchedFiles.set(srcPath, parsed);
    }
    const doc = touchedFiles.get(srcPath);
    if (idx >= doc.blocks.length) {
      fail++;
      report.push({
        file: path.basename(f),
        part_index: p.part_index,
        status: "fail",
        reason: `part_index_in_file ${idx} out of range (${doc.blocks.length})`,
        srcPath,
      });
      continue;
    }
    const block = doc.blocks[idx];
    // seif labels on CM PT often diverge from kit seif (note vs Mechaber seif).
    // Index + path remain the identity; mismatch is fail unless explicitly ignored.
    if (p.seif && block.seif && Number(p.seif) !== Number(block.seif)) {
      if (!ignoreSeifMismatch) {
        fail++;
        report.push({
          file: path.basename(f),
          part_index: p.part_index,
          status: "fail",
          reason: `seif mismatch reply=${p.seif} block=${block.seif}`,
          srcPath,
          idx,
        });
        continue;
      }
      seifMismatchIgnored++;
    }
    block.en = en;
    const flags = residualFlags(en);
    if (flags.length) {
      wroteButFlags++;
      report.push({
        file: path.basename(f),
        part_index: p.part_index,
        siman: p.siman,
        seif: p.seif,
        status: "wrote_but_still_flags",
        flags,
        srcPath,
        idx,
      });
    } else {
      ok++;
      report.push({
        file: path.basename(f),
        part_index: p.part_index,
        siman: p.siman,
        seif: p.seif,
        status: dry ? "ok_dry" : "ok",
        srcPath,
        idx,
      });
    }
  }
}

if (!dry) {
  for (const [srcPath, doc] of touchedFiles) {
    fs.writeFileSync(srcPath, serializeBlocks(doc.preamble, doc.blocks), "utf8");
  }
}

const outReport = path.join(__dirname, "cm1_retranslate_apply_report.json");
fs.mkdirSync(path.dirname(outReport), { recursive: true });
fs.writeFileSync(
  outReport,
  JSON.stringify(
    {
      dry,
      repliesDir,
      ignore_seif_mismatch: ignoreSeifMismatch,
      reply_files: files.length,
      ok,
      fail,
      wrote_but_still_flags: wroteButFlags,
      seif_mismatch_ignored: seifMismatchIgnored,
      files_touched: touchedFiles.size,
      report,
    },
    null,
    2
  )
);

console.log({
  reply_files: files.length,
  ok,
  fail,
  wrote_but_still_flags: wroteButFlags,
  seif_mismatch_ignored: seifMismatchIgnored,
  files_touched: touchedFiles.size,
  dry,
  report: outReport,
});
if (fail) process.exitCode = 2;
