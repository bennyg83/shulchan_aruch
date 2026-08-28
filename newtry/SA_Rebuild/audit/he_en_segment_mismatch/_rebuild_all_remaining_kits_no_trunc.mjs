/**
 * Re-export _REMAINING kit parts (no segment truncation) and rebuild numbered zips
 * with full parent JSON. Does not rescan corpus or change case lists.
 *
 *   node _rebuild_all_remaining_kits_no_trunc.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const ZIPS_DIR = path.join(AUDIT, "zips");
const LIVE = path.resolve(AUDIT, "../../../..");
const DICT_SRC = path.join(LIVE, "full_dictionary (1).md");
const MAX_PART_BYTES = 85_000;

const KITS = [
  { num: "01", kit: "EN_MISSING_2_REMAINING" },
  { num: "02", kit: "EN_HAS_MORE_REMAINING" },
  { num: "03", kit: "EN_TRUNC_MODERATE_REMAINING" },
  { num: "04", kit: "BEER_DEGREE_SPLIT_REMAINING" },
  { num: "05", kit: "EN_TRUNC_REMAINING" },
  { num: "06", kit: "HE_HAS_MORE_LIKUT_REMAINING" },
  { num: "07", kit: "HE_HAS_MORE_LIKUT_MERGED_REMAINING" },
  { num: "08", kit: "HE_HAS_MORE_OFFSET_REMAINING" },
  { num: "09", kit: "EN_TRUNC_EDITORIAL_REMAINING" },
  { num: "10", kit: "HE_HAS_MORE_EDITORIAL_REMAINING" },
];

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function writeAtomic(filePath, text) {
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, text, "utf8");
  fs.renameSync(tmp, filePath);
}

function removeStaleParts(prefix, keepCount) {
  for (let n = keepCount + 1; n <= 99; n++) {
    const stale = path.join(AUDIT, `${prefix}_part${String(n).padStart(2, "0")}.json`);
    if (fs.existsSync(stale)) fs.unlinkSync(stale);
  }
}

function cleanCase(c) {
  const { segments_truncated_in_part, full_text_in_parent_pack, ...rest } = c;
  return rest;
}

function packCases(cases, packBaseName, packMetaBase, fullSha) {
  function buildPartJson(partCases, chunkIndex, chunkTotal, caseOffset) {
    return JSON.stringify(
      {
        meta: {
          ...packMetaBase,
          chunk_index: chunkIndex,
          chunk_total: chunkTotal,
          case_offset: caseOffset,
          cases_in_chunk: partCases.length,
          hard_cap_utf8_bytes: MAX_PART_BYTES,
          parent_pack: `${packBaseName}.json`,
          parent_sha256: fullSha,
          note: "Full segment text — no truncation",
        },
        cases: partCases,
      },
      null,
      2
    );
  }

  const chunks = [];
  let i = 0;
  while (i < cases.length) {
    let lo = 1;
    let hi = cases.length - i;
    let best = 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const bytes = Buffer.byteLength(
        buildPartJson(cases.slice(i, i + mid), 1, 1, i),
        "utf8"
      );
      if (bytes <= MAX_PART_BYTES) {
        best = mid;
        lo = mid + 1;
      } else hi = mid - 1;
    }
    if (best < 1) best = 1;
    let slice = cases.slice(i, i + best);
    let text = buildPartJson(slice, 1, 1, i);
    let bytes = Buffer.byteLength(text, "utf8");
    if (bytes > MAX_PART_BYTES && slice.length > 1) {
      while (slice.length > 1 && bytes > MAX_PART_BYTES) {
        slice.pop();
        text = buildPartJson(slice, 1, 1, i);
        bytes = Buffer.byteLength(text, "utf8");
      }
    }
    chunks.push({ cases: slice.slice(), offset: i, bytes });
    i += slice.length;
  }

  const partInfos = [];
  for (let idx = 0; idx < chunks.length; idx++) {
    const ch = chunks[idx];
    const chunkIndex = idx + 1;
    const text = buildPartJson(ch.cases, chunkIndex, chunks.length, ch.offset);
    const bytes = Buffer.byteLength(text, "utf8");
    const name = `${packBaseName}_part${String(chunkIndex).padStart(2, "0")}.json`;
    writeAtomic(path.join(AUDIT, name), text);
    partInfos.push({
      part: chunkIndex,
      file: name,
      cases: ch.cases.length,
      case_offset: ch.offset,
      bytes,
      sha256: sha256(text),
      exceeds_hard_cap: bytes > MAX_PART_BYTES,
    });
  }
  removeStaleParts(packBaseName, chunks.length);
  return partInfos;
}

function listKitPartFiles(kit) {
  return fs
    .readdirSync(AUDIT)
    .filter((f) => f.startsWith(`${kit}_part`) && f.endsWith(".json"))
    .sort();
}

function rebuildZip(zipName, files) {
  const zipPath = path.join(ZIPS_DIR, zipName);
  const staging = path.join(ZIPS_DIR, `.staging_${zipName}`);
  if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
  fs.mkdirSync(staging, { recursive: true });
  for (const f of files) {
    const src = f === "full_dictionary.md" ? DICT_SRC : path.join(AUDIT, f);
    if (!fs.existsSync(src)) throw new Error(`missing for zip: ${src}`);
    fs.copyFileSync(src, path.join(staging, f));
  }
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  const ps = `Compress-Archive -Path '${staging.replace(/'/g, "''")}\\*' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`;
  execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: "pipe" });
  fs.rmSync(staging, { recursive: true, force: true });
  return { zipPath, bytes: fs.statSync(zipPath).size, files };
}

function spotTruncationInParts(kit) {
  let hits = 0;
  for (const f of listKitPartFiles(kit)) {
    const t = fs.readFileSync(path.join(AUDIT, f), "utf8");
    if (/\[truncated/i.test(t)) hits++;
  }
  return hits;
}

if (!fs.existsSync(DICT_SRC)) {
  console.error(`[ERROR] Dictionary not found: ${DICT_SRC}`);
  process.exit(1);
}
fs.mkdirSync(ZIPS_DIR, { recursive: true });

const sizeTable = [];
const summaries = [];

for (const { num, kit } of KITS) {
  const zipName = `${num}_${kit}.zip`;
  const zipPath = path.join(ZIPS_DIR, zipName);
  const oldBytes = fs.existsSync(zipPath) ? fs.statSync(zipPath).size : 0;

  const fullPath = path.join(AUDIT, `${kit}.json`);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[skip] missing ${kit}.json`);
    continue;
  }
  const fullPack = JSON.parse(fs.readFileSync(fullPath, "utf8").replace(/^\uFEFF/, ""));
  const cases = (fullPack.cases ?? []).map(cleanCase);
  const fullMeta = { ...fullPack.meta };
  const fullJson = JSON.stringify({ meta: fullMeta, cases }, null, 2);
  writeAtomic(fullPath, fullJson);
  const fullSha = sha256(fullJson);
  fullMeta.parent_sha256 = fullSha;
  writeAtomic(fullPath, JSON.stringify({ meta: fullMeta, cases }, null, 2));

  const partInfos = packCases(cases, kit, fullMeta, fullSha);
  const maxPartBytes = Math.max(...partInfos.map((p) => p.bytes), 0);

  const buildPath = path.join(AUDIT, `${kit}_BUILD.json`);
  if (fs.existsSync(buildPath)) {
    const build = JSON.parse(fs.readFileSync(buildPath, "utf8"));
    build.parts = partInfos.length;
    build.max_part_bytes = maxPartBytes;
    build.full_bytes = Buffer.byteLength(fullJson, "utf8");
    build.full_sha256 = fullSha;
    build.parts_detail = partInfos;
    build.rebuild_note =
      "2026-08-28 — no segment truncation; parent JSON in numbered zip";
    writeAtomic(buildPath, JSON.stringify(build, null, 2));
  }

  const zipFiles = [
    `${kit}.md`,
    `${kit}.json`,
    ...partInfos.map((p) => p.file),
    "full_dictionary.md",
  ];
  const { bytes: newBytes } = rebuildZip(zipName, zipFiles);
  const alias = path.join(ZIPS_DIR, `${kit}.zip`);
  fs.copyFileSync(path.join(ZIPS_DIR, zipName), alias);

  const truncHits = spotTruncationInParts(kit);
  sizeTable.push({
    zip: zipName,
    oldBytes,
    newBytes,
    delta: newBytes - oldBytes,
    over500k: newBytes > 500_000,
    truncInParts: truncHits,
    parentInZip: true,
  });
  summaries.push({ kit, cases: cases.length, parts: partInfos.length, maxPartBytes });
  console.log(`[ok] ${zipName} ${oldBytes} -> ${newBytes} (${partInfos.length} parts)`);
}

// Update ZIPS_MANIFEST.md _REMAINING rows only
const manifestPath = path.join(ZIPS_DIR, "ZIPS_MANIFEST.md");
let manifest = fs.readFileSync(manifestPath, "utf8").replace(/\u0000/g, "");
manifest = manifest.replace(/Generated: [^\n]+/, `Generated: ${new Date().toISOString()}`);
manifest = manifest.replace(
  /Note: [^\n]+/,
  "Note: 2026-08-28 — all _REMAINING kits rebuilt; no segment truncation; parent JSON in each zip"
);

for (const row of sizeTable) {
  const kit = row.zip.replace(/^\d+_/, "").replace(/\.zip$/, "");
  const partList = [
    `${kit}.md`,
    `${kit}.json`,
    ...listKitPartFiles(kit),
    "full_dictionary.md",
  ];
  const line = `| \`${row.zip}\` | ${row.newBytes} | ${partList.join(", ")} |`;
  const re = new RegExp(`\\| \\\`${row.zip.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\\` \\|[^\\n]+\\n`);
  if (re.test(manifest)) manifest = manifest.replace(re, `${line}\n`);
  else {
    const insertAt = manifest.indexOf("| `07_HE_HAS_MORE_LIKUT_MERGED_REMAINING.zip`");
    if (insertAt !== -1) {
      const lineEnd = manifest.indexOf("\n", insertAt);
      manifest = `${manifest.slice(0, lineEnd + 1)}${line}\n${manifest.slice(lineEnd + 1)}`;
    }
  }
}

writeAtomic(manifestPath, manifest);

console.log("\n=== SIZE TABLE ===");
console.log(JSON.stringify(sizeTable, null, 2));
console.log("\n=== SUMMARIES ===");
console.log(JSON.stringify(summaries, null, 2));
