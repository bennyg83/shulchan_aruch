/**
 * Rebuild HE_HAS_MORE_OFFSET_REMAINING parts without segment truncation;
 * refresh parent meta/prompt, BUILD, MD, and numbered zip.
 *
 *   node _rebuild_offset_kit_no_trunc.mjs
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
const KIT = "HE_HAS_MORE_OFFSET_REMAINING";
const ZIP_NAME = "08_HE_HAS_MORE_OFFSET_REMAINING.zip";

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function writeAtomic(filePath, text) {
  const tmp = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, text, "utf8");
  fs.renameSync(tmp, filePath);
}

const PROMPT_ADDITION = `CORPUS TEXT: he_segments[] and en_segments[] are COMPLETE from live corpus (no truncation). If alignment remains ambiguous after review, mark needs_human with a short reason.`;

function syncPrompt(mdText, fullPack) {
  const m = mdText.match(/```\n([\s\S]*?)\n```/);
  if (!m) throw new Error("No prompt block in MD");
  let prompt = m[1];
  prompt = prompt.replace(
    /INPUTS: HE_HAS_MORE_OFFSET_REMAINING\.json \(or one part\) \+ full_dictionary\.md/,
    "INPUTS: HE_HAS_MORE_OFFSET_REMAINING.json (full parent pack — attach even when reviewing one part) + full_dictionary.md"
  );
  if (!prompt.includes("CORPUS TEXT:")) {
    prompt = prompt.replace(
      /CONTEXT: Residual he_has_more \(true_offset_editorial\) not in likut\/editorial kits\.\n/,
      `CONTEXT: Residual he_has_more (true_offset_editorial) not in likut/editorial kits.\n${PROMPT_ADDITION}\n\n`
    );
  }
  const newMd = mdText.replace(/```\n[\s\S]*?\n```/, `\`\`\`\n${prompt}\n\`\`\``);
  fullPack.meta.prompt = prompt;
  fullPack.meta.instructions_for_reviewer = prompt.split("\n");
  return { newMd, prompt };
}

function cleanCase(c) {
  const { segments_truncated_in_part, full_text_in_parent_pack, ...rest } = c;
  return rest;
}

function buildPartJson(meta, cases, chunkIndex, chunkTotal, caseOffset) {
  return JSON.stringify(
    {
      meta: {
        ...meta,
        chunk_index: chunkIndex,
        chunk_total: chunkTotal,
        case_offset: caseOffset,
        cases_in_chunk: cases.length,
        parent_pack: `${KIT}.json`,
        parent_sha256: meta.parent_sha256,
        note: "Full segment text — no truncation",
      },
      cases,
    },
    null,
    2
  );
}

// --- load full parent pack ---
const fullPath = path.join(AUDIT, `${KIT}.json`);
const fullPack = JSON.parse(fs.readFileSync(fullPath, "utf8").replace(/^\uFEFF/, ""));
const cases = fullPack.cases.map(cleanCase);
const fullJson = JSON.stringify({ meta: fullPack.meta, cases }, null, 2);
writeAtomic(fullPath, fullJson);
const fullSha = sha256(fullJson);
const fullBytes = Buffer.byteLength(fullJson, "utf8");
fullPack.meta.parent_sha256 = fullSha;

// --- sync MD prompt ---
const mdPath = path.join(AUDIT, `${KIT}.md`);
let mdText = fs.readFileSync(mdPath, "utf8");
const { newMd } = syncPrompt(mdText, fullPack);
writeAtomic(fullPath, JSON.stringify({ meta: fullPack.meta, cases }, null, 2));

// --- rebuild one part per case (full text) ---
const partInfos = [];
for (let i = 0; i < cases.length; i++) {
  const chunkIndex = i + 1;
  const partMeta = { ...fullPack.meta, parent_sha256: fullSha };
  const text = buildPartJson(partMeta, [cases[i]], chunkIndex, cases.length, i);
  const bytes = Buffer.byteLength(text, "utf8");
  const name = `${KIT}_part${String(chunkIndex).padStart(2, "0")}.json`;
  writeAtomic(path.join(AUDIT, name), text);
  partInfos.push({
    part: chunkIndex,
    file: name,
    cases: 1,
    case_offset: i,
    bytes,
    sha256: sha256(text),
    exceeds_hard_cap: bytes > 85000,
  });
}

// remove stale parts
for (let n = cases.length + 1; n <= 99; n++) {
  const stale = path.join(AUDIT, `${KIT}_part${String(n).padStart(2, "0")}.json`);
  if (fs.existsSync(stale)) fs.unlinkSync(stale);
}

const maxPartBytes = Math.max(...partInfos.map((p) => p.bytes));
const overCapParts = partInfos.filter((p) => p.exceeds_hard_cap).length;

const partTable = partInfos
  .map(
    (p) =>
      `| ${p.part} | \`${p.file}\` | ${p.cases} | ${p.case_offset} | ${p.bytes.toLocaleString()} | \`${p.sha256.slice(0, 12)}…\` | ${p.exceeds_hard_cap ? "over cap" : ""} |`
  )
  .join("\n");

const updatedMd = newMd
  .replace(
    /- Parts:.*\n/,
    "- Parts: one case per part; **full** segment text (no truncation; may exceed 85k target)\n- Zip includes **full parent** `HE_HAS_MORE_OFFSET_REMAINING.json` plus all parts\n"
  )
  .replace(
    /\| Part \| File[\s\S]*?(?=## ChatGPT prompt)/,
    `| Part | File | Cases | Offset | Bytes | SHA (prefix) | Note |
|------|------|------:|-------:|------:|--------------|------|
${partTable}

${overCapParts ? `\\* ${overCapParts} part(s) exceed 85k target — full segment text preserved (no truncation).` : ""}

`
  )
  .replace(
    /- Full kit:.*\n/,
    `- Full kit: [\`${KIT}.json\`](./${KIT}.json) (${fullBytes.toLocaleString()} bytes, SHA \`${fullSha.slice(0, 12)}…\`)\n`
  );
writeAtomic(mdPath, updatedMd);

const buildSummary = {
  kit: KIT,
  mode: fullPack.meta.mode,
  purpose: fullPack.meta.purpose,
  cases: cases.length,
  parts: partInfos.length,
  max_part_bytes: maxPartBytes,
  full_bytes: fullBytes,
  full_sha256: fullSha,
  path: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${KIT}.json`,
  md: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/${KIT}.md`,
  parts_detail: partInfos,
  rebuild_note: "2026-08-28 — removed segment truncation; full text in parts + parent JSON in zip",
};
writeAtomic(path.join(AUDIT, `${KIT}_BUILD.json`), JSON.stringify(buildSummary, null, 2));

// --- zip ---
const zipFiles = [
  `${KIT}.md`,
  `${KIT}.json`,
  ...partInfos.map((p) => p.file),
  "full_dictionary.md",
];
const staging = path.join(ZIPS_DIR, `.staging_${ZIP_NAME}`);
if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging, { recursive: true });
for (const f of zipFiles) {
  const src = f === "full_dictionary.md" ? DICT_SRC : path.join(AUDIT, f);
  fs.copyFileSync(src, path.join(staging, f));
}
const zipPath = path.join(ZIPS_DIR, ZIP_NAME);
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
const ps = `Compress-Archive -Path '${staging.replace(/'/g, "''")}\\*' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`;
execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: "pipe" });
fs.rmSync(staging, { recursive: true, force: true });
const zipBytes = fs.statSync(zipPath).size;

// also unnumbered alias for harden script compatibility
const aliasPath = path.join(ZIPS_DIR, `${KIT}.zip`);
fs.copyFileSync(zipPath, aliasPath);

console.log(JSON.stringify({ buildSummary, zipPath, zipBytes, zipFiles }, null, 2));
