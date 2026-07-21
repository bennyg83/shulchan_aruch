/**
 * gpt-apply-batch-fast.mjs — same as gpt-apply-batch.mjs, but IN-PROCESS.
 *
 * gpt-apply-batch spawns THREE node processes per chunk (emit + remap + apply),
 * i.e. ~3×N subprocesses. On Windows the process-startup cost dominates and a
 * few-hundred-chunk batch takes 20-40 min. This inlines the exact logic of all
 * three — worksheet build (retranslate-blocks emit), validation gates
 * (remap-gpt-output), and byte-stable splice + manifest/log (retranslate-blocks
 * apply) — reusing the same provenance-config helpers, so the source writes and
 * audit outputs are identical. No subprocesses → the same batch runs in seconds.
 *
 * Per chunk it builds the worksheet FRESH (capturing current file hashes) then
 * applies immediately, exactly as the spawn version re-emits before each apply,
 * so multiple chunks of one source file splice cleanly in order.
 *
 * Writes: source .txt splices, retranslated-parts.csv, retranslation-log.jsonl,
 * gpt-review.csv — identical to the spawn pipeline. Usage:
 *   node tools/gpt-apply-batch-fast.mjs --replies <dir>
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { pathToFileURL } from "url";
import {
  VOLUMES, NEWTRY, brSegs, checkCitationNumbers, extractHebrewCitationNumbers,
  processEnglishPure, spliceEnglishSections, hebrewLeakRuns, stripTags,
  GARBAGE_RE, soupScore, SOUP_THRESHOLD, extractEnglishCitationNumbers, PLACEHOLDER_RE, FILLER_RE,
} from "./provenance-config.mjs";

const argv = process.argv.slice(2);
const arg = (n) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : null; };
const repliesDir = arg("replies");
if (!repliesDir) { console.error("usage: gpt-apply-batch-fast.mjs --replies <dir>"); process.exit(1); }

const AUDIT_OUT = path.join(NEWTRY, "SA_Rebuild", "audit");
const CORPUS_OUT = path.join(NEWTRY, "SA_Rebuild", "corpus");
const RESOLVED_MANIFEST = path.join(AUDIT_OUT, "retranslated-parts.csv");
const RETRANS_LOG = path.join(AUDIT_OUT, "retranslation-log.jsonl");
const REVIEW_CSV = path.join(AUDIT_OUT, "gpt-review.csv");
const pad3 = (n) => String(n).padStart(3, "0");
const read = (p) => fs.readFileSync(p, "utf8");
const exists = (p) => { try { return fs.existsSync(p); } catch { return false; } };
const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex");
const csvEscape = (s) => { s = String(s ?? ""); return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const normWs = (s) => stripTags(String(s ?? "")).replace(/\s+/g, " ").trim().toLowerCase();
const REGISTER_TELL = /\bthe Lord\b|\bYahweh\b/i;

let FILLER_TEXTS = new Set();
try { FILLER_TEXTS = new Set(JSON.parse(read(path.join(AUDIT_OUT, "filler-texts.json"))).texts ?? []); } catch {}

let WORKLIST_KEYS = new Set();
try {
  for (const line of read(path.join(AUDIT_OUT, "retranslation-worklist.csv")).split("\n").slice(1)) {
    if (!line.trim()) continue; const c = line.split(",");
    WORKLIST_KEYS.add(`${c[0]}|${c[1]}|${c[2]}|${c[3]}`);
  }
} catch {}

const libCache = new Map();
async function libFor(vol) { if (!libCache.has(vol)) libCache.set(vol, await import(pathToFileURL(VOLUMES[vol].blockLib).href)); return libCache.get(vol); }
function sourceSlugDir(vol, siman, slug) {
  const root = VOLUMES[vol].sourceRoot;
  const padded = path.join(root, `siman_${pad3(siman)}`);
  const base = exists(padded) ? padded : path.join(root, `siman_${siman}`);
  return path.join(base, slug);
}
const corpusEnPath = (vol, siman, seif, slug) => path.join(CORPUS_OUT, vol, `siman${siman}`, `seif-${pad3(seif)}`, slug, "en.html");

/** Build the range-limited worksheet in-process (mirrors retranslate-blocks emit). */
function buildWorksheet(lib, vol, siman, slug, lo, hi) {
  const dir = sourceSlugDir(vol, siman, slug);
  let pfs; try { pfs = fs.readdirSync(dir).filter((f) => /^part-\d+\.txt$/i.test(f)).sort(); } catch { return null; }
  if (!pfs.length) return null;
  const fileHashes = {}; const parts = [];
  for (const pf of pfs) {
    const raw = read(path.join(dir, pf));
    fileHashes[pf] = sha1(raw);
    let blocks; try { blocks = lib.parseBlocksInFile(raw); } catch { continue; }
    blocks.forEach((b, i) => parts.push({ ...b, part_file: pf, file_part_index: i }));
  }
  if (!parts.length) return null;
  const bySeif = new Map();
  for (const p of parts) {
    const se = parseInt(String(p.seif).match(/\d+/)?.[0] ?? "", 10);
    if (!Number.isFinite(se) || se < lo || se > hi) continue;
    if (!bySeif.has(se)) bySeif.set(se, []);
    bySeif.get(se).push(p);
  }
  const wsParts = [];
  for (const [seif, group] of bySeif) {
    const enPath = corpusEnPath(vol, siman, seif, slug);
    const corpusEn = exists(enPath) ? read(enPath) : "";
    const segs = brSegs(corpusEn);
    const aligned = corpusEn !== "" && segs.length === group.length;
    group.forEach((p, gi) => {
      const enCurrent = aligned ? segs[gi] : p.en;
      const cit = checkCitationNumbers(p.he, enCurrent);
      wsParts.push({
        part_index: wsParts.length, key: `${vol}|${siman}|${seif}|${slug}`, seif, marker: p.marker,
        part_file: p.part_file, file_part_index: p.file_part_index, aligned,
        in_worklist: WORKLIST_KEYS.has(`${vol}|${siman}|${seif}|${slug}`),
        citation_he_nums: extractHebrewCitationNumbers(p.he), gematria_mismatch: cit.mismatched,
        he: p.he, en_current: enCurrent, en_source_txt: p.en,
      });
    });
  }
  if (!wsParts.length) return null;
  return { volume: vol, siman, slug, dir, file_hashes: fileHashes, english_hdr: lib.ENGLISH_HDR, block_end: lib.BLOCK_END, parts: wsParts };
}

/** Tolerant JSON extraction (mirrors remap-gpt-output). */
function extractJson(text) {
  let t = text.replace(/^﻿/, "").trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i); if (fence) t = fence[1].trim();
  const start = t.indexOf("{"); if (start < 0) throw new Error("no JSON object");
  let depth = 0, inStr = false, esc = false;
  for (let i = start; i < t.length; i++) { const c = t[i];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; }
    else if (c === '"') inStr = true; else if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return JSON.parse(t.slice(start, i + 1)); } }
  throw new Error("unbalanced JSON");
}

/** Validate a GPT reply against a worksheet → decisions (mirrors remap-gpt-output gates). */
function remapReply(gpt, ws, reviewRows) {
  const gptByIndex = new Map((gpt.parts || []).map((p) => [p.part_index, p]));
  const decisions = { worksheet: ws.wsName, judged_by: "gpt (remapped)", parts: [] };
  let hardReject = 0, soft = 0;
  const addReview = (wp, issue, detail) => { reviewRows.push([ws.wsName, wp.part_index, wp.key, wp.seif, issue, detail].map(csvEscape).join(",")); soft++; };
  const reject = (wp, base) => { decisions.parts.push({ ...base, action: "keep" }); hardReject++; };
  for (const wp of ws.parts) {
    const g = gptByIndex.get(wp.part_index);
    if (!g) { decisions.parts.push({ part_index: wp.part_index, verdict: "FLAG", tags: ["partial"], reason: "missing from GPT output", action: "keep" }); continue; }
    const action = g.action ?? g.decision ?? "keep";
    const base = { part_index: wp.part_index, verdict: g.verdict ?? "FAIL", tags: g.tags ?? [], reason: g.reason ?? "" };
    if (action === "retranslate") {
      if (typeof g.new_en !== "string" || !g.new_en.trim()) { reject(wp, base); continue; }
      const plain = stripTags(processEnglishPure(g.new_en, wp.slug ?? ws.slug).en);
      if (PLACEHOLDER_RE.test(plain)) { reject(wp, base); continue; }
      if (FILLER_RE.test(plain)) { reject(wp, base); continue; }
      if (FILLER_TEXTS.has(normWs(g.new_en))) { reject(wp, base); continue; }
      if (normWs(g.new_en) === normWs(wp.en_current) || normWs(g.new_en) === normWs(wp.en_source_txt)) { reject(wp, base); continue; }
      if (hebrewLeakRuns(plain).length) { reject(wp, base); continue; }
      if (GARBAGE_RE.test(plain)) { reject(wp, base); continue; }
      if (REGISTER_TELL.test(plain)) { reject(wp, base); continue; }
      if (soupScore(plain) >= SOUP_THRESHOLD) { reject(wp, base); continue; }
      const enNums = extractEnglishCitationNumbers(g.new_en);
      const missing = (wp.citation_he_nums || []).filter((n) => !enNums.includes(n));
      if (missing.length) addReview(wp, "missing_citation", `he cites ${missing.join("|")}`);
      const heLen = stripTags(wp.he).replace(/\s+/g, "").length, enLen = plain.replace(/\s+/g, "").length;
      if (heLen > 100 && (enLen / heLen < 0.4 || enLen / heLen > 4)) addReview(wp, "length_ratio", (enLen / heLen).toFixed(2));
      decisions.parts.push({ ...base, action: "retranslate", new_en: g.new_en });
    } else if (action === "promote_source") {
      const src = String(wp.en_source_txt ?? "");
      const plain = stripTags(processEnglishPure(src, wp.slug ?? ws.slug).en);
      if (!src.trim() || hebrewLeakRuns(plain).length || GARBAGE_RE.test(plain) || REGISTER_TELL.test(plain) || soupScore(plain) >= SOUP_THRESHOLD) { reject(wp, base); continue; }
      decisions.parts.push({ ...base, action: "promote_source" });
    } else { decisions.parts.push({ ...base, action: "keep" }); }
  }
  return { decisions, hardReject, soft };
}

/** Map parseBlocks file_part_index → ENGLISH-section ordinal used by spliceEnglishSections.
 * Needed when a part-*.txt has phantom blocks (SOURCE/END markers without ENGLISH). */
function englishOrdinalByFilePartIndex(raw, englishHdr) {
  const startRe = /\*{4}\s*[A-Z0-9]+ SOURCE BLOCK\s*\*{4}/g;
  const starts = [];
  let m;
  while ((m = startRe.exec(raw))) starts.push(m.index);
  const map = new Map();
  let ord = -1;
  for (let i = 0; i < starts.length; i++) {
    const chunk = raw.slice(starts[i], starts[i + 1] ?? raw.length);
    if (chunk.includes(englishHdr)) {
      ord++;
      map.set(i, ord);
    }
  }
  return map;
}

/** Splice retranslations into source + accumulate manifest/log (mirrors retranslate-blocks apply). */
function applyDecisions(ws, decisions, manifestRows, logRecords) {
  const vol = ws.volume;
  // hash guard
  for (const [pf, h] of Object.entries(ws.file_hashes)) {
    if (sha1(read(path.join(ws.dir, pf))) !== h) throw new Error(`source changed since build: ${pf}`);
  }
  const decByIndex = new Map(decisions.parts.map((d) => [d.part_index, d]));
  const spliceByFile = new Map();
  let retrans = 0;
  for (const wp of ws.parts) {
    const d = decByIndex.get(wp.part_index);
    const action = d?.action ?? "keep";
    if (action === "retranslate") {
      if (typeof d.new_en !== "string" || !d.new_en.trim()) continue;
      const { en, report } = processEnglishPure(d.new_en, wp.slug ?? ws.slug);
      if (report.leaks.length) continue;
      if (!spliceByFile.has(wp.part_file)) spliceByFile.set(wp.part_file, new Map());
      spliceByFile.get(wp.part_file).set(wp.file_part_index, en);
      manifestRows.push([vol, ws.siman, wp.seif, ws.slug, wp.marker, action, d.verdict ?? "PASS", (d.tags ?? []).join("|"), d.reason ?? ""].map(csvEscape).join(","));
      logRecords.push(JSON.stringify({ key: wp.key, marker: wp.marker, part_index: wp.part_index, verdict: d.verdict ?? "PASS", tags: d.tags ?? [], action, reason: d.reason ?? "", he: wp.he, old_en: wp.en_current, new_en: en, ts: new Date().toISOString() }));
      retrans++;
    } else if (action === "promote_source") {
      const { en, report } = processEnglishPure(wp.en_source_txt, wp.slug ?? ws.slug);
      if (report.leaks.length) continue;
      manifestRows.push([vol, ws.siman, wp.seif, ws.slug, wp.marker, action, d.verdict ?? "PASS", (d.tags ?? []).join("|"), d.reason ?? ""].map(csvEscape).join(","));
      logRecords.push(JSON.stringify({ key: wp.key, marker: wp.marker, part_index: wp.part_index, verdict: d.verdict ?? "PASS", tags: d.tags ?? [], action, reason: d.reason ?? "", he: wp.he, old_en: wp.en_current, new_en: en, ts: new Date().toISOString() }));
    }
  }
  for (const [pf, repl] of spliceByFile) {
    const full = path.join(ws.dir, pf);
    const raw = read(full);
    const ordMap = englishOrdinalByFilePartIndex(raw, ws.english_hdr);
    const mapped = new Map();
    for (const [fpi, en] of repl) {
      const ord = ordMap.get(fpi);
      if (ord == null) throw new Error(`splice ordinal missing in ${pf} for file_part_index ${fpi}`);
      mapped.set(ord, en);
    }
    const { text, replaced } = spliceEnglishSections(raw, { englishHdr: ws.english_hdr, blockEnd: ws.block_end }, mapped);
    if (replaced.length !== mapped.size) throw new Error(`splice mismatch in ${pf}: expected ${[...mapped.keys()].join(",")}, replaced ${replaced.join(",")}`);
    fs.writeFileSync(full, text, "utf8");
  }
  return retrans;
}

// ── main loop ────────────────────────────────────────────────────────────
const replies = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith(".reply.json")) replies.push(p); } })(repliesDir);
replies.sort();
console.log(`[batch-fast] ${replies.length} reply files (in-process)\n`);

const nameRe = /^(oc1|yd1|eh1|cm1)_(\d+)_(.+?)(?:_s(\d+(?:-\d+)?))?\.reply\.json$/;
const manifestRows = [], logRecords = [], reviewRows = [];
const touched = new Map();
let ok = 0, retransTot = 0, rejectTot = 0, warnTot = 0; const fails = []; let mechSkip = 0;

for (const reply of replies) {
  const base = path.basename(reply);
  const m = base.match(nameRe);
  if (!m) { fails.push(`${base}: unparseable name`); continue; }
  const [, vol, siman, slug, range] = m;
  if (!VOLUMES[vol]) { fails.push(`${base}: unknown volume`); continue; }
  if (slug === "mechaber") { mechSkip++; continue; } // base text: never machine-ingest
  let lo = 1, hi = Infinity; if (range) { const rr = range.split("-"); lo = +rr[0]; hi = rr[1] ? +rr[1] : lo; }
  try {
    const lib = await libFor(vol);
    const ws = buildWorksheet(lib, vol, +siman, slug, lo, hi);
    if (!ws) { fails.push(`${base}: no source blocks`); continue; }
    ws.wsName = `${vol}_${siman}_${slug}_s${range}.json`;
    const gpt = extractJson(read(reply));
    const { decisions, hardReject, soft } = remapReply(gpt, ws, reviewRows);
    rejectTot += hardReject; warnTot += soft;
    retransTot += applyDecisions(ws, decisions, manifestRows, logRecords);
    if (!touched.has(vol)) touched.set(vol, new Set());
    touched.get(vol).add(siman);
    ok++;
  } catch (e) { fails.push(`${base}: ${String(e.message).slice(0, 140)}`); }
}

// flush audit outputs once
if (manifestRows.length) {
  if (!exists(RESOLVED_MANIFEST)) fs.writeFileSync(RESOLVED_MANIFEST, "volume,siman,seif,slug,marker,action,verdict,tags,reason\n", "utf8");
  fs.appendFileSync(RESOLVED_MANIFEST, manifestRows.join("\n") + "\n", "utf8");
}
if (logRecords.length) fs.appendFileSync(RETRANS_LOG, logRecords.join("\n") + "\n", "utf8");
if (reviewRows.length) {
  if (!exists(REVIEW_CSV)) fs.writeFileSync(REVIEW_CSV, "worksheet,part_index,key,seif,issue,detail\n", "utf8");
  fs.appendFileSync(REVIEW_CSV, reviewRows.join("\n") + "\n", "utf8");
}

if (mechSkip) console.log(`[batch] mechaber replies skipped (base-text policy): ${mechSkip}`);
  console.log(`[batch] applied ${ok}/${replies.length} chunks — ${retransTot} retranslate, ${rejectTot} hard-reject→keep, ${warnTot} soft-warn`);
if (fails.length) { console.log(`[batch] ${fails.length} failure(s):`); for (const f of fails) console.log(`  - ${f}`); }
console.log(`\n[batch] touched simanim:`);
for (const [vol, s] of touched) console.log(`  ${vol} --siman ${[...s].sort((a, b) => a - b).join(",")}`);
