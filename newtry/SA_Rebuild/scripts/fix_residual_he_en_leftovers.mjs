/**
 * Residual thin-EN / multi-HE leftovers after bold-lemma split (d0a3d4c305).
 *
 * Phases (in order; each supports --dry-run / --apply):
 *   A — Repair HE with leaked **** ENGLISH **** / SOURCE BLOCK markers
 *   B — Alternate EN split markers when delimiter count === heSegs
 *   C — Copy2 better EN (or HE) when segment counts align
 *   D — Tiny stub HE fold (≤~15 visible chars middle labels)
 *   E — Write RESIDUAL_MANUAL_QUEUE.md for remaining failures
 *
 * Usage:
 *   node fix_residual_he_en_leftovers.mjs --phase A --dry-run --volumes yd1
 *   node fix_residual_he_en_leftovers.mjs --phase A --apply --volumes yd1
 *   node fix_residual_he_en_leftovers.mjs --phase B --dry-run --volumes oc1,yd1,cm1
 *   node fix_residual_he_en_leftovers.mjs --phase C --dry-run --volumes oc1,yd1,cm1
 *   node fix_residual_he_en_leftovers.mjs --phase D --dry-run --volumes oc1,yd1,cm1
 *   node fix_residual_he_en_leftovers.mjs --phase E --volumes oc1,yd1,cm1
 *   node fix_residual_he_en_leftovers.mjs --phase all --dry-run --volumes oc1,yd1,cm1
 *
 * Writes he.html / en.html only (never TXT republish). Logs every path.
 * After --apply: rebundle affected simanim (BUNDLE_CONCURRENCY=1).
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../..");
const CORPUS_ROOT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const C2_CORPUS = path.join(
  "C:/Users/binya/Documents/shulchan-aruch-clean - Copy (2)",
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const OUT_DIR = path.join(
  REPO,
  "newtry/SA_Rebuild/audit/he_en_segment_mismatch"
);

const ALL_VOLUMES = ["oc1", "yd1", "cm1", "eh1"];
const CORRUPT_RE =
  /\*{2,}\s*ENGLISH\s*\*{2,}|\*{2,}\s*HEBREW\s*\*{2,}|SOURCE\s+BLOCK|END\s+BLOCK/i;
const ENGLISH_SPLIT_RE = /\*{2,}\s*ENGLISH\s*\*{2,}\s*/i;

function parseArgs(argv) {
  const out = {
    apply: false,
    phase: "A",
    volumes: ["oc1", "yd1", "cm1"],
    slug: null,
    maxFixes: Infinity,
    maxSimanim: null,
    corpusRoot: CORPUS_ROOT,
    c2Root: C2_CORPUS,
    sampleLimit: 30,
    stubMaxChars: 15,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--apply") out.apply = true;
    else if (a === "--dry-run") out.apply = false;
    else if (a === "--phase") out.phase = String(next()).toUpperCase();
    else if (a === "--volume") out.volumes = [next()];
    else if (a === "--volumes")
      out.volumes = next()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--slug") out.slug = next();
    else if (a === "--max-fixes") out.maxFixes = parseInt(next(), 10);
    else if (a === "--max-simanim") out.maxSimanim = parseInt(next(), 10);
    else if (a === "--corpus-root") out.corpusRoot = path.resolve(next());
    else if (a === "--c2-root") out.c2Root = path.resolve(next());
    else if (a === "--stub-max-chars")
      out.stubMaxChars = parseInt(next(), 10);
    else if (a === "--help" || a === "-h") {
      console.log(`fix_residual_he_en_leftovers.mjs — phases A–E
  --phase A|B|C|D|E|all
  --dry-run (default) | --apply
  --volumes oc1,yd1,cm1
  --slug <slug> --max-fixes N --max-simanim N`);
      process.exit(0);
    }
  }
  return out;
}

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return "";
  }
}

function writeText(p, s) {
  fs.writeFileSync(p, s, "utf8");
}

function visuallyEmpty(html) {
  const t = String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.length === 0;
}

function visibleText(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function hasHebrewLetters(s) {
  return /[\u0590-\u05FF]/.test(s || "");
}

function hasLatinLetters(s) {
  return /[A-Za-z]/.test(s || "");
}

function sha256(s) {
  return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}

function bump(obj, key, n = 1) {
  obj[key] = (obj[key] || 0) + n;
}

function classify(heParts, enParts, heRaw, enRaw) {
  const heN = heParts.length;
  const enN = enParts.length;
  const heEmpty = visuallyEmpty(heRaw);
  const enEmpty = visuallyEmpty(enRaw);
  if (heEmpty && enEmpty) return null;
  if (heEmpty && !enEmpty) return { kind: "he_missing", heN: 0, enN };
  if (!heEmpty && enEmpty) return { kind: "en_missing", heN, enN: 0 };
  if (heN === enN) return null;
  if (heN === 1 && enN > 1) return { kind: "he_truncated_vs_multi_en", heN, enN };
  if (enN === 1 && heN > 1) return { kind: "en_truncated_vs_multi_he", heN, enN };
  if (enN > heN) return { kind: "en_has_more_segments", heN, enN };
  return { kind: "he_has_more_segments", heN, enN };
}

function heLooksCorrupted(heRaw) {
  return CORRUPT_RE.test(String(heRaw ?? ""));
}

/**
 * Strip leaked ENGLISH block markers + English prose; keep Hebrew resumes.
 */
function stripEnglishCorruption(heRaw) {
  let s = String(heRaw ?? "");
  // Drop SOURCE / END / HEBREW block markers if present (rare)
  s = s.replace(/\*{2,}\s*SOURCE\s+BLOCK[^*\n]*\*{2,}/gi, "");
  s = s.replace(/\*{2,}\s*END\s+BLOCK\s*\*{2,}/gi, "");
  s = s.replace(/\*{2,}\s*HEBREW\s*\*{2,}\s*/gi, "");

  if (!ENGLISH_SPLIT_RE.test(s) && !/\*{2,}\s*ENGLISH\s*\*{2,}/i.test(s)) {
    return { ok: !heLooksCorrupted(s), he: s, method: "noop" };
  }

  const parts = s.split(/\*{2,}\s*ENGLISH\s*\*{2,}\s*/i);
  const heChunks = [];
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    if (i === 0) {
      const t = p.trim();
      if (t) heChunks.push(t);
      continue;
    }
    // Skip English prefix until Hebrew resumes (prefer <b>…Hebrew)
    let resume = null;
    const boldHe = p.match(/<b\b[^>]*>[\s\S]*?[\u0590-\u05FF]/);
    if (boldHe) {
      resume = p.slice(boldHe.index);
    } else {
      const idx = p.search(/[\u0590-\u05FF]/);
      if (idx >= 0) {
        const before = p.slice(Math.max(0, idx - 20), idx);
        if (
          /(?:^|[\n>]|\))\s*$/.test(before) ||
          /<br\s*\/?>\s*$/i.test(p.slice(0, idx).trimEnd()) ||
          idx < 40
        ) {
          resume = p.slice(idx);
        } else {
          const rest = p.slice(idx);
          const m2 = rest.match(
            /(?:<br\s*\/?>|\n)\s*(?:<b\b[^>]*>)?[^<]*[\u0590-\u05FF]/i
          );
          if (m2) {
            const abs = idx + m2.index;
            const slice = p.slice(abs);
            const start = slice.search(/<b\b|[\u0590-\u05FF]/i);
            resume = p.slice(abs + Math.max(0, start));
          }
        }
      }
    }
    if (resume) {
      // Drop leading <br> left over from EN tail
      resume = resume.replace(/^(?:\s|<br\s*\/?>)+/gi, "").trim();
      if (resume) heChunks.push(resume);
    }
  }

  // Rejoin HE lemmas with <br> — ENGLISH blocks were the original separators
  let fixed = heChunks.join("<br />\n");
  fixed = fixed.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  fixed = fixed.replace(/^(?:\s|<br\s*\/?>)+/gi, "");
  fixed = fixed.replace(/(?:\s|<br\s*\/?>)+$/gi, "");
  fixed = normalizeBrRuns(fixed).trim();

  if (visuallyEmpty(fixed) || !hasHebrewLetters(fixed)) {
    return { ok: false, he: fixed, method: "strip_failed_empty" };
  }
  if (heLooksCorrupted(fixed)) {
    return { ok: false, he: fixed, method: "strip_still_corrupt" };
  }
  // Reject if Latin still dominates (failed strip)
  const vis = visibleText(fixed);
  const latin = (vis.match(/[A-Za-z]/g) || []).length;
  const heb = (vis.match(/[\u0590-\u05FF]/g) || []).length;
  if (latin > 80 && latin > heb * 0.5) {
    return { ok: false, he: fixed, method: "strip_latin_heavy", latin, heb };
  }
  return { ok: true, he: fixed, method: "strip_english_markers", latin, heb };
}

function listSimanDirs(volRoot) {
  return fs
    .readdirSync(volRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^siman\d+$/i.test(e.name))
    .map((e) => e.name)
    .sort(
      (a, b) =>
        parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10)
    );
}

function* walkSlugDirs(simanDir) {
  let ents;
  try {
    ents = fs.readdirSync(simanDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of ents) {
    if (!e.isDirectory() || !e.name.startsWith("seif-")) continue;
    const seifDir = path.join(simanDir, e.name);
    let slugs;
    try {
      slugs = fs.readdirSync(seifDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const s of slugs) {
      if (!s.isDirectory()) continue;
      yield {
        seif: e.name,
        slug: s.name,
        slugDir: path.join(seifDir, s.name),
      };
    }
  }
}

/* ───────────────────────────── Phase A ───────────────────────────── */

function phaseA(opts) {
  const result = {
    phase: "A",
    mode: opts.apply ? "apply" : "dry-run",
    volumes: {},
    totals: { scannedHe: 0, corrupt: 0, fixed: 0, skipped: 0 },
    byMethod: {},
    bySkipReason: {},
    affectedSimanim: {},
    backups: [],
    log: [],
    samples: [],
  };

  for (const vol of opts.volumes) {
    const volRes = {
      corrupt: 0,
      fixed: 0,
      skipped: 0,
      byMethod: {},
      bySkipReason: {},
      bySlug: {},
      affectedSimanim: new Set(),
      samples: [],
    };
    const liveRoot = path.join(opts.corpusRoot, vol);
    if (!fs.existsSync(liveRoot)) {
      result.volumes[vol] = { error: "missing" };
      continue;
    }
    let simanCount = 0;
    for (const simanName of listSimanDirs(liveRoot)) {
      if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
      simanCount++;
      const siman = parseInt(simanName.replace(/\D/g, ""), 10);
      for (const { seif, slug, slugDir } of walkSlugDirs(
        path.join(liveRoot, simanName)
      )) {
        if (opts.slug && slug !== opts.slug) continue;
        if (volRes.fixed >= opts.maxFixes) break;

        const hePath = path.join(slugDir, "he.html");
        if (!fs.existsSync(hePath)) continue;
        result.totals.scannedHe++;
        const liveHe = readText(hePath);
        if (!heLooksCorrupted(liveHe)) continue;

        volRes.corrupt++;
        result.totals.corrupt++;
        const rel = `${vol}/${simanName}/${seif}/${slug}`;
        const enPath = path.join(slugDir, "en.html");
        const liveEn = readText(enPath);
        const enSegs = splitHtmlByBrSegments(liveEn).length;

        let chosen = null;
        let method = null;
        let skipReason = null;

        const stripped = stripEnglishCorruption(liveHe);
        if (stripped.ok) {
          chosen = stripped.he;
          method = stripped.method;
        }

        // Prefer C2 when clean and (strip failed OR C2 seg count closer to EN
        // AND C2 has comparable/more Hebrew when strip thin)
        const c2HePath = path.join(opts.c2Root, vol, simanName, seif, slug, "he.html");
        const c2He = readText(c2HePath);
        const c2ok =
          c2He &&
          !heLooksCorrupted(c2He) &&
          hasHebrewLetters(c2He) &&
          !visuallyEmpty(c2He);

        if (c2ok) {
          const c2Segs = splitHtmlByBrSegments(c2He).length;
          const stripSegs = chosen
            ? splitHtmlByBrSegments(chosen).length
            : 0;
          const stripVis = chosen ? visibleText(chosen).length : 0;
          const c2Vis = visibleText(c2He).length;

          const c2MatchesEn = enSegs > 0 && c2Segs === enSegs;
          const stripMatchesEn = enSegs > 0 && stripSegs === enSegs;
          const stripMuchThinner = stripVis > 0 && c2Vis > stripVis * 1.5;

          if (!chosen) {
            chosen = c2He;
            method = "c2_he_restore";
          } else if (c2MatchesEn && !stripMatchesEn) {
            chosen = c2He;
            method = "c2_he_better_seg_match";
          } else if (
            stripMuchThinner &&
            c2Vis >= 40 &&
            Math.abs(c2Segs - enSegs) <= Math.abs(stripSegs - enSegs)
          ) {
            // Only if C2 isn't a tiny stub vs rich stripped multi-lemma
            // Actually: LIVE strip often richer than C2 — don't replace richer strip
            if (!(stripVis > c2Vis * 1.2 && stripSegs >= c2Segs)) {
              chosen = c2He;
              method = "c2_he_richer_than_strip";
            }
          }
        }

        if (!chosen) {
          skipReason = stripped.method || "no_clean_source";
          volRes.skipped++;
          result.totals.skipped++;
          bump(volRes.bySkipReason, skipReason);
          bump(result.bySkipReason, skipReason);
          const entry = {
            path: rel,
            action: "skip",
            reason: skipReason,
            heBytes: liveHe.length,
            enSegs,
          };
          result.log.push(entry);
          if (volRes.samples.length < opts.sampleLimit) volRes.samples.push(entry);
          continue;
        }

        if (chosen === liveHe || sha256(chosen) === sha256(liveHe)) {
          skipReason = "unchanged";
          volRes.skipped++;
          result.totals.skipped++;
          bump(volRes.bySkipReason, skipReason);
          continue;
        }

        const newSegs = splitHtmlByBrSegments(chosen).length;
        const entry = {
          path: rel,
          action: opts.apply ? "applied" : "would_apply",
          method,
          heBytesBefore: liveHe.length,
          heBytesAfter: chosen.length,
          heSegsBefore: splitHtmlByBrSegments(liveHe).length,
          heSegsAfter: newSegs,
          enSegs,
          matchedEn: enSegs > 0 && newSegs === enSegs,
        };

        volRes.fixed++;
        result.totals.fixed++;
        bump(volRes.byMethod, method);
        bump(result.byMethod, method);
        bump(volRes.bySlug, slug);
        volRes.affectedSimanim.add(siman);
        result.log.push(entry);
        if (volRes.samples.length < opts.sampleLimit) volRes.samples.push(entry);

        if (opts.apply) {
          const bakDir = path.join(OUT_DIR, "backups_residual");
          fs.mkdirSync(bakDir, { recursive: true });
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          const key = sha256(hePath).slice(0, 12);
          const bak = path.join(bakDir, `${stamp}_${key}_he.html`);
          fs.writeFileSync(bak, liveHe, "utf8");
          writeText(hePath, chosen);
          result.backups.push({ file: hePath, bak, method });
        }
      }
    }
    result.volumes[vol] = {
      ...volRes,
      affectedSimanim: [...volRes.affectedSimanim].sort((a, b) => a - b),
    };
    result.affectedSimanim[vol] = result.volumes[vol].affectedSimanim;
  }

  return result;
}

/* ───────────────────────────── Phase B ───────────────────────────── */

function findSplitPoints(enRaw, pattern) {
  /** Return indices where a new segment should start (not including 0). */
  const re =
    typeof pattern === "string" ? new RegExp(pattern, "gi") : pattern;
  const indices = [];
  let m;
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const r = new RegExp(re.source, flags);
  while ((m = r.exec(enRaw))) {
    if (m.index > 0) indices.push(m.index);
  }
  return indices;
}

function tryAlternateEnSplit(enRaw, heSegs, heParts = null) {
  if (heSegs < 2) return null;
  const candidates = [];

  // 0) Relaxed bold-lemma split: EN <b> opens === heSegs (HE need not all be bold-headed)
  {
    const boldOpens = [];
    const reB = /<b\b[^>]*>/gi;
    let m;
    while ((m = reB.exec(enRaw))) boldOpens.push({ index: m.index });
    if (boldOpens.length === heSegs && boldOpens.length >= 2) {
      const prefixVis = visibleText(enRaw.slice(0, boldOpens[0].index));
      if (prefixVis.length <= 12 && /^\s*<b\b/i.test(enRaw)) {
        let fixed = enRaw;
        for (let i = boldOpens.length - 1; i >= 1; i--) {
          const idx = boldOpens[i].index;
          const before = fixed.slice(0, idx);
          const trimmedEnd = before.replace(/(?:\s|<(?!br\b)[^>]*>)*$/gi, "");
          if (/<br\s*\/?>$/i.test(trimmedEnd)) continue;
          fixed = before + "<br />\n" + fixed.slice(idx);
        }
        const parts = splitHtmlByBrSegments(fixed);
        if (
          parts.length === heSegs &&
          parts.every((p) => !visuallyEmpty(p))
        ) {
          return { method: "bold_lemma_relaxed", fixed, parts };
        }
      }
    }
  }

  // 1) Markdown-style **a) / **א) / **1)
  {
    const re = /\*\*\s*(?:[a-zA-Z]|[0-9]+|[א-ת])\s*\)/g;
    const idxs = findSplitPoints(enRaw, re);
    if (idxs.length + 1 === heSegs) {
      candidates.push({ method: "md_star_letter_paren", idxs: [0, ...idxs] });
    }
  }

  // 1b) **(Collection) / **(word) markdown heads
  {
    const all = [];
    const re2 = /\*\*\([^)]{1,40}\)/g;
    let m;
    while ((m = re2.exec(enRaw))) all.push(m.index);
    if (all.length === heSegs && all[0] <= 12) {
      candidates.push({ method: "md_star_paren_title", idxs: all });
    }
  }

  // 2) Numbered (1) (2) … or (a) (b) … as segment heads
  {
    const reNum = /(?:^|[\n>]|\s)(\(\s*\d+\s*\))/g;
    const idxs = [];
    let m;
    while ((m = reNum.exec(enRaw))) {
      const abs = m.index + m[0].indexOf("(");
      if (abs > 0) idxs.push(abs);
      else if (abs === 0) {
        /* first head ok */
      }
    }
    // recount including start
    const all = [];
    const re2 = /\(\s*\d+\s*\)/g;
    while ((m = re2.exec(enRaw))) all.push(m.index);
    if (all.length === heSegs && all[0] <= 12) {
      candidates.push({
        method: "paren_numbers",
        idxs: all,
      });
    }
  }

  {
    const all = [];
    const re2 = /\(\s*[a-zA-Z]\s*\)/g;
    let m;
    while ((m = re2.exec(enRaw))) all.push(m.index);
    if (all.length === heSegs && all[0] <= 12) {
      candidates.push({ method: "paren_letters", idxs: all });
    }
  }

  // 3) Hebrew letter heads in EN: (א) (ב) or א) ב)
  {
    const all = [];
    const re2 = /\(\s*[א-ת]\s*\)/g;
    let m;
    while ((m = re2.exec(enRaw))) all.push(m.index);
    if (all.length === heSegs && all[0] <= 12) {
      candidates.push({ method: "paren_hebrew_letters", idxs: all });
    }
  }
  {
    const all = [];
    const re2 = /(?:^|[\n\s>])([א-ת]\s*\))/g;
    let m;
    const starts = [];
    while ((m = re2.exec(enRaw))) {
      const abs = m.index + m[0].indexOf(m[1]);
      starts.push(abs);
    }
    if (starts.length === heSegs && starts[0] <= 12) {
      candidates.push({ method: "bare_hebrew_letter_paren", idxs: starts });
    }
  }

  // 4) Partial <br> — only if already some br and we can complete safely
  // (handled lightly: if EN has brCount+1 < heSegs, don't invent)

  if (!candidates.length) return null;

  // Prefer first successful build with all non-empty segs
  for (const c of candidates) {
    const idxs = c.idxs.slice().sort((a, b) => a - b);
    if (idxs[0] !== 0) {
      // must start at 0 or very near
      if (idxs[0] > 12) continue;
      idxs.unshift(0);
      if (idxs.length !== heSegs) continue;
    }
    const parts = [];
    for (let i = 0; i < idxs.length; i++) {
      const start = idxs[i];
      const end = i + 1 < idxs.length ? idxs[i + 1] : enRaw.length;
      parts.push(enRaw.slice(start, end).trim());
    }
    if (parts.length !== heSegs) continue;
    if (parts.some((p) => visuallyEmpty(p))) continue;
    const fixed = parts.join("<br />\n");
    const got = splitHtmlByBrSegments(fixed);
    if (got.length !== heSegs) continue;
    if (got.some((p) => visuallyEmpty(p))) continue;
    return { method: c.method, fixed, parts: got };
  }
  return null;
}

function phaseB(opts) {
  const result = {
    phase: "B",
    mode: opts.apply ? "apply" : "dry-run",
    volumes: {},
    totals: { candidates: 0, fixed: 0, skipped: 0 },
    byMethod: {},
    bySkipReason: {},
    affectedSimanim: {},
    backups: [],
    log: [],
    spotChecks: [],
  };

  for (const vol of opts.volumes) {
    const volRes = {
      candidates: 0,
      fixed: 0,
      skipped: 0,
      byMethod: {},
      bySkipReason: {},
      affectedSimanim: new Set(),
      samples: [],
    };
    const liveRoot = path.join(opts.corpusRoot, vol);
    if (!fs.existsSync(liveRoot)) {
      result.volumes[vol] = { error: "missing" };
      continue;
    }
    let simanCount = 0;
    for (const simanName of listSimanDirs(liveRoot)) {
      if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
      simanCount++;
      const siman = parseInt(simanName.replace(/\D/g, ""), 10);
      for (const { seif, slug, slugDir } of walkSlugDirs(
        path.join(liveRoot, simanName)
      )) {
        if (opts.slug && slug !== opts.slug) continue;
        if (volRes.fixed >= opts.maxFixes) break;

        const hePath = path.join(slugDir, "he.html");
        const enPath = path.join(slugDir, "en.html");
        if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;

        const liveHe = readText(hePath);
        const liveEn = readText(enPath);
        if (heLooksCorrupted(liveHe)) continue; // Phase A should have cleaned
        const lHe = splitHtmlByBrSegments(liveHe);
        const lEn = splitHtmlByBrSegments(liveEn);
        const cls = classify(lHe, lEn, liveHe, liveEn);
        if (!cls || cls.kind !== "en_truncated_vs_multi_he") continue;
        if (cls.enN !== 1 || cls.heN < 2) continue;
        if (visuallyEmpty(liveEn) || visuallyEmpty(liveHe)) continue;

        volRes.candidates++;
        result.totals.candidates++;
        const rel = `${vol}/${simanName}/${seif}/${slug}`;

        const split = tryAlternateEnSplit(liveEn, cls.heN, lHe);
        if (!split) {
          volRes.skipped++;
          result.totals.skipped++;
          bump(volRes.bySkipReason, "no_matching_delimiter");
          bump(result.bySkipReason, "no_matching_delimiter");
          continue;
        }

        const entry = {
          path: rel,
          action: opts.apply ? "applied" : "would_apply",
          method: split.method,
          heSegs: cls.heN,
          enSegsBefore: 1,
          enSegsAfter: split.parts.length,
          previews: split.parts.map((p) => visibleText(p).slice(0, 60)),
        };

        volRes.fixed++;
        result.totals.fixed++;
        bump(volRes.byMethod, split.method);
        bump(result.byMethod, split.method);
        volRes.affectedSimanim.add(siman);
        result.log.push(entry);
        if (volRes.samples.length < opts.sampleLimit) volRes.samples.push(entry);
        if (result.spotChecks.length < 12) result.spotChecks.push(entry);

        if (opts.apply) {
          const bakDir = path.join(OUT_DIR, "backups_residual");
          fs.mkdirSync(bakDir, { recursive: true });
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          const key = sha256(enPath).slice(0, 12);
          const bak = path.join(bakDir, `${stamp}_${key}_en.html`);
          fs.writeFileSync(bak, liveEn, "utf8");
          writeText(enPath, split.fixed);
          result.backups.push({ file: enPath, bak, method: split.method });
        }
      }
    }
    result.volumes[vol] = {
      ...volRes,
      affectedSimanim: [...volRes.affectedSimanim].sort((a, b) => a - b),
    };
    result.affectedSimanim[vol] = result.volumes[vol].affectedSimanim;
  }
  return result;
}

/* ───────────────────────────── Phase C ───────────────────────────── */

function phaseC(opts) {
  const result = {
    phase: "C",
    mode: opts.apply ? "apply" : "dry-run",
    volumes: {},
    totals: { candidates: 0, fixed: 0, skipped: 0 },
    byMethod: {},
    bySkipReason: {},
    affectedSimanim: {},
    backups: [],
    log: [],
  };

  for (const vol of opts.volumes) {
    const volRes = {
      candidates: 0,
      fixed: 0,
      skipped: 0,
      byMethod: {},
      bySkipReason: {},
      affectedSimanim: new Set(),
      samples: [],
    };
    const liveRoot = path.join(opts.corpusRoot, vol);
    const c2Root = path.join(opts.c2Root, vol);
    if (!fs.existsSync(liveRoot)) {
      result.volumes[vol] = { error: "missing" };
      continue;
    }
    let simanCount = 0;
    for (const simanName of listSimanDirs(liveRoot)) {
      if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
      simanCount++;
      const siman = parseInt(simanName.replace(/\D/g, ""), 10);
      for (const { seif, slug, slugDir } of walkSlugDirs(
        path.join(liveRoot, simanName)
      )) {
        if (opts.slug && slug !== opts.slug) continue;
        if (volRes.fixed >= opts.maxFixes) break;

        const hePath = path.join(slugDir, "he.html");
        const enPath = path.join(slugDir, "en.html");
        const liveHe = readText(hePath);
        const liveEn = readText(enPath);
        const lHe = splitHtmlByBrSegments(liveHe);
        const lEn = splitHtmlByBrSegments(liveEn);
        const cls = classify(lHe, lEn, liveHe, liveEn);
        if (!cls) continue;
        // Focus residual mismatch kinds
        if (
          ![
            "en_truncated_vs_multi_he",
            "he_has_more_segments",
            "en_has_more_segments",
            "he_truncated_vs_multi_en",
          ].includes(cls.kind)
        )
          continue;

        volRes.candidates++;
        result.totals.candidates++;
        const rel = `${vol}/${simanName}/${seif}/${slug}`;
        const c2Dir = path.join(c2Root, simanName, seif, slug);
        const c2En = readText(path.join(c2Dir, "en.html"));
        const c2He = readText(path.join(c2Dir, "he.html"));
        if (!c2En && !c2He) {
          volRes.skipped++;
          result.totals.skipped++;
          bump(volRes.bySkipReason, "c2_missing");
          continue;
        }

        const c2EnSegs = splitHtmlByBrSegments(c2En).length;
        const c2HeSegs = splitHtmlByBrSegments(c2He).length;
        const liveHeSegs = lHe.length;
        const liveEnSegs = lEn.length;

        function contentOverlapOk(a, b, minHits = 3) {
          const av = visibleText(a).toLowerCase();
          const bv = visibleText(b).toLowerCase();
          if (!av || !bv) return false;
          // identical-ish
          if (av === bv) return true;
          // containment (allow minor HTML/whitespace drift)
          const aCore = av.replace(/\s+/g, " ");
          const bCore = bv.replace(/\s+/g, " ");
          if (aCore.includes(bCore) || bCore.includes(aCore)) return true;
          const toks = (s) =>
            s
              .split(/\W+/)
              .filter((t) => t.length > 3)
              .slice(0, 60);
          const setA = new Set(toks(av));
          let hit = 0;
          for (const t of toks(bv)) if (setA.has(t)) hit++;
          const need = Math.min(
            minHits,
            Math.max(2, Math.floor(Math.min(setA.size, 20) * 0.25))
          );
          return hit >= need;
        }

        let action = null; // {file:'en'|'he', content, method}

        // Prefer EN-only restore when C2 EN matches live HE segs
        if (
          c2En &&
          !visuallyEmpty(c2En) &&
          c2EnSegs === liveHeSegs &&
          c2EnSegs !== liveEnSegs &&
          sha256(c2En) !== sha256(liveEn) &&
          contentOverlapOk(liveEn, c2En, liveEnSegs === 1 ? 1 : 3)
        ) {
          const parts = splitHtmlByBrSegments(c2En);
          if (parts.every((p) => !visuallyEmpty(p))) {
            // thin live EN vs multi HE: allow weaker overlap
            const liveVis = visibleText(liveEn);
            const c2Vis = visibleText(c2En);
            const liveIsThin = liveEnSegs === 1 && liveHeSegs >= 2;
            if (liveIsThin || c2Vis.length >= liveVis.length * 0.8) {
              action = {
                file: "en",
                content: c2En,
                method: "c2_en_seg_match",
              };
            }
          }
        }

        // HE restore when C2 HE matches live EN segs — must be SAME commentary
        // content (overlap/containment), not a different essay or truncated stub.
        if (
          !action &&
          c2He &&
          !heLooksCorrupted(c2He) &&
          hasHebrewLetters(c2He) &&
          c2HeSegs === liveEnSegs &&
          c2HeSegs !== liveHeSegs &&
          sha256(c2He) !== sha256(liveHe)
        ) {
          const liveVis = visibleText(liveHe);
          const c2Vis = visibleText(c2He);
          const coverage = c2Vis.length / Math.max(1, liveVis.length);
          const sameContent = contentOverlapOk(liveHe, c2He, 4);
          // If C2 is a proper subset of live (fewer segs), dropped live segs
          // must be tiny stubs only — never drop substantive HE.
          let subsetOk = true;
          if (c2HeSegs < liveHeSegs) {
            const c2Norm = c2Vis.replace(/\s+/g, " ");
            const liveNorm = liveVis.replace(/\s+/g, " ");
            const contained =
              liveNorm.includes(c2Norm) || c2Norm.includes(liveNorm);
            if (!contained) subsetOk = false;
            else {
              // Identify live segs not represented in C2 text
              for (const seg of lHe) {
                const sv = visibleText(seg);
                if (!sv) continue;
                if (c2Norm.includes(sv.replace(/\s+/g, " ").slice(0, 40)))
                  continue;
                if (!isTinyStubSeg(seg, opts.stubMaxChars)) {
                  subsetOk = false;
                  break;
                }
              }
            }
          }
          if (sameContent && coverage >= 0.7 && subsetOk) {
            const parts = splitHtmlByBrSegments(c2He);
            if (parts.every((p) => !visuallyEmpty(p))) {
              action = {
                file: "he",
                content: c2He,
                method: "c2_he_seg_match",
              };
            }
          }
        }

        if (!action) {
          volRes.skipped++;
          result.totals.skipped++;
          bump(volRes.bySkipReason, "no_c2_improvement");
          bump(result.bySkipReason, "no_c2_improvement");
          continue;
        }

        const entry = {
          path: rel,
          action: opts.apply ? "applied" : "would_apply",
          method: action.method,
          file: action.file,
          kind: cls.kind,
          liveHeSegs,
          liveEnSegs,
          c2HeSegs,
          c2EnSegs,
        };
        volRes.fixed++;
        result.totals.fixed++;
        bump(volRes.byMethod, action.method);
        bump(result.byMethod, action.method);
        volRes.affectedSimanim.add(siman);
        result.log.push(entry);
        if (volRes.samples.length < opts.sampleLimit) volRes.samples.push(entry);

        if (opts.apply) {
          const target = action.file === "en" ? enPath : hePath;
          const prev = action.file === "en" ? liveEn : liveHe;
          const bakDir = path.join(OUT_DIR, "backups_residual");
          fs.mkdirSync(bakDir, { recursive: true });
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          const key = sha256(target).slice(0, 12);
          const bak = path.join(
            bakDir,
            `${stamp}_${key}_${action.file}.html`
          );
          fs.writeFileSync(bak, prev, "utf8");
          writeText(target, action.content);
          result.backups.push({ file: target, bak, method: action.method });
        }
      }
    }
    result.volumes[vol] = {
      ...volRes,
      affectedSimanim: [...volRes.affectedSimanim].sort((a, b) => a - b),
    };
    result.affectedSimanim[vol] = result.volumes[vol].affectedSimanim;
  }
  return result;
}

/* ───────────────────────────── Phase D ───────────────────────────── */

function isTinyStubSeg(seg, maxChars) {
  const v = visibleText(seg);
  if (!v) return true;
  // Never fold lemma-style / cross-ref Gra notes (כו' / כנ"ל)
  if (/כו['׳]/.test(v)) return false;
  if (/כנ["״']?ל/.test(v)) return false;
  if (/ע(?:ס|ב|מ|ש)["״']/.test(v)) return false; // עס"ג / עבה"ג / עמש"ש refs as sole note

  // Labels like (ג) / ג) / ג.
  if (/^\(?\s*[א-ת]\s*\)?\.?$/.test(v)) return true;
  if (/^\(?\s*\d+\s*\)?\.?$/.test(v)) return true;
  if (/^[א-ת]{1,3}\.?$/.test(v)) return true;
  // שם … / שם במשנה: / שם בגמ':
  if (/^[\(\[]?\s*שם\b/u.test(v) && v.length <= 24) return true;
  // ג) שם במשנה: / כ) שם ברייתא:
  if (/^[א-ת]\)\s*שם\b/u.test(v) && v.length <= 28) return true;
  // letter) short mishna/gemara pointer
  if (/^[א-ת]\)\s*(?:משנה|ברייתא|מימרא|אוקימתא|מבואר)/u.test(v) && v.length <= 28)
    return true;
  // Missing-notes markers
  if (/חסר/.test(v) && v.length <= 28) return true;
  // Pure source citation heads (beer-hagolah style), no lemma body
  if (
    v.length <= 20 &&
    /^(?:משנה|מנחות|שם משנה|הרשב|תוס|פ["״']?\d|מימרא|מסקנת)/u.test(v)
  )
    return true;
  return false;
}

function rejoinTinyStubs(heParts, enSegs, maxChars) {
  if (heParts.length < 2) return null;
  // Fold middle (and leading) stubs into adjacent body when that yields enSegs match
  // or when enSegs===1 (collapse all stubs into one)
  const parts = heParts.slice();

  if (enSegs === 1) {
    // Only fold if ALL pre-last are tiny stubs
    const pre = parts.slice(0, -1);
    if (!pre.every((p) => isTinyStubSeg(p, maxChars))) return null;
    if (isTinyStubSeg(parts[parts.length - 1], maxChars)) return null; // body must be real
    const joined = parts.join("<br />\n"); // keep labels but as single seg? 
    // Actually for enSegs===1 we need ONE segment — join without br
    const one = parts.join(" ");
    return { fixed: one, method: "fold_stubs_to_single", heSegsAfter: 1 };
  }

  // When enSegs > 1: fold only tiny middle stubs so count → enSegs
  if (parts.length <= enSegs) return null;
  const excess = parts.length - enSegs;
  // Greedily merge stub segments into following segment
  let merged = parts.slice();
  let folds = 0;
  let i = 0;
  while (i < merged.length - 1 && folds < excess + 2) {
    if (isTinyStubSeg(merged[i], maxChars) && i < merged.length - 1) {
      // merge stub into NEXT (preserve label at start of next)
      merged[i + 1] = merged[i] + " " + merged[i + 1];
      merged.splice(i, 1);
      folds++;
      if (merged.length === enSegs) break;
      continue;
    }
    i++;
  }
  if (merged.length !== enSegs) return null;
  if (merged.some((p) => visuallyEmpty(p))) return null;
  return {
    fixed: merged.join("<br />\n"),
    method: "fold_tiny_middle_stubs",
    heSegsAfter: merged.length,
    folds,
  };
}

function phaseD(opts) {
  const result = {
    phase: "D",
    mode: opts.apply ? "apply" : "dry-run",
    volumes: {},
    totals: { candidates: 0, fixed: 0, skipped: 0 },
    byMethod: {},
    bySkipReason: {},
    affectedSimanim: {},
    backups: [],
    log: [],
  };

  for (const vol of opts.volumes) {
    const volRes = {
      candidates: 0,
      fixed: 0,
      skipped: 0,
      byMethod: {},
      bySkipReason: {},
      affectedSimanim: new Set(),
      samples: [],
    };
    const liveRoot = path.join(opts.corpusRoot, vol);
    if (!fs.existsSync(liveRoot)) {
      result.volumes[vol] = { error: "missing" };
      continue;
    }
    let simanCount = 0;
    for (const simanName of listSimanDirs(liveRoot)) {
      if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
      simanCount++;
      const siman = parseInt(simanName.replace(/\D/g, ""), 10);
      for (const { seif, slug, slugDir } of walkSlugDirs(
        path.join(liveRoot, simanName)
      )) {
        if (opts.slug && slug !== opts.slug) continue;
        if (volRes.fixed >= opts.maxFixes) break;

        const hePath = path.join(slugDir, "he.html");
        const enPath = path.join(slugDir, "en.html");
        const liveHe = readText(hePath);
        const liveEn = readText(enPath);
        if (heLooksCorrupted(liveHe)) continue;
        const lHe = splitHtmlByBrSegments(liveHe);
        const lEn = splitHtmlByBrSegments(liveEn);
        const cls = classify(lHe, lEn, liveHe, liveEn);
        if (!cls) continue;
        if (
          cls.kind !== "en_truncated_vs_multi_he" &&
          cls.kind !== "he_has_more_segments"
        )
          continue;
        if (lHe.length <= lEn.length) continue;

        volRes.candidates++;
        result.totals.candidates++;
        const rel = `${vol}/${simanName}/${seif}/${slug}`;

        const fold = rejoinTinyStubs(lHe, lEn.length, opts.stubMaxChars);
        if (!fold) {
          volRes.skipped++;
          result.totals.skipped++;
          bump(volRes.bySkipReason, "no_high_confidence_stub_fold");
          bump(result.bySkipReason, "no_high_confidence_stub_fold");
          continue;
        }

        const entry = {
          path: rel,
          action: opts.apply ? "applied" : "would_apply",
          method: fold.method,
          kind: cls.kind,
          heSegsBefore: lHe.length,
          heSegsAfter: fold.heSegsAfter,
          enSegs: lEn.length,
          stubPreviews: lHe
            .filter((p) => isTinyStubSeg(p, opts.stubMaxChars))
            .map((p) => visibleText(p)),
        };
        volRes.fixed++;
        result.totals.fixed++;
        bump(volRes.byMethod, fold.method);
        bump(result.byMethod, fold.method);
        volRes.affectedSimanim.add(siman);
        result.log.push(entry);
        if (volRes.samples.length < opts.sampleLimit) volRes.samples.push(entry);

        if (opts.apply) {
          const bakDir = path.join(OUT_DIR, "backups_residual");
          fs.mkdirSync(bakDir, { recursive: true });
          const stamp = new Date().toISOString().replace(/[:.]/g, "-");
          const key = sha256(hePath).slice(0, 12);
          const bak = path.join(bakDir, `${stamp}_${key}_he.html`);
          fs.writeFileSync(bak, liveHe, "utf8");
          writeText(hePath, fold.fixed);
          result.backups.push({ file: hePath, bak, method: fold.method });
        }
      }
    }
    result.volumes[vol] = {
      ...volRes,
      affectedSimanim: [...volRes.affectedSimanim].sort((a, b) => a - b),
    };
    result.affectedSimanim[vol] = result.volumes[vol].affectedSimanim;
  }
  return result;
}

/* ───────────────────────────── Phase E ───────────────────────────── */

function phaseE(opts) {
  const issues = [];
  for (const vol of opts.volumes) {
    const reportPath = path.join(OUT_DIR, `${vol}_report.json`);
    if (!fs.existsSync(reportPath)) {
      issues.push({
        path: vol,
        kind: "scan_missing",
        reason: `No ${vol}_report.json — run scan first`,
      });
      continue;
    }
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    // Re-scan live for residual rather than trusting stale report when possible
    const liveRoot = path.join(opts.corpusRoot, vol);
    let simanCount = 0;
    for (const simanName of listSimanDirs(liveRoot)) {
      if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
      simanCount++;
      for (const { seif, slug, slugDir } of walkSlugDirs(
        path.join(liveRoot, simanName)
      )) {
        if (opts.slug && slug !== opts.slug) continue;
        const hePath = path.join(slugDir, "he.html");
        const enPath = path.join(slugDir, "en.html");
        const liveHe = readText(hePath);
        const liveEn = readText(enPath);
        const rel = `${vol}/${simanName}/${seif}/${slug}`;
        if (heLooksCorrupted(liveHe)) {
          issues.push({
            path: rel,
            kind: "he_corrupted_english_marker",
            reason: "Phase A could not clean",
            heSegs: splitHtmlByBrSegments(liveHe).length,
            enSegs: splitHtmlByBrSegments(liveEn).length,
          });
          continue;
        }
        const cls = classify(
          splitHtmlByBrSegments(liveHe),
          splitHtmlByBrSegments(liveEn),
          liveHe,
          liveEn
        );
        if (!cls) continue;
        issues.push({
          path: rel,
          kind: cls.kind,
          reason: "residual_after_phases_A_D",
          heSegs: cls.heN,
          enSegs: cls.enN,
          heBytes: liveHe.length,
          enBytes: liveEn.length,
        });
      }
    }
    // keep report meta
    void report;
  }

  const byKind = {};
  for (const i of issues) bump(byKind, i.kind);

  const md = [
    "# RESIDUAL MANUAL QUEUE",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Leftovers after residual phases A–D (no fake-fix).",
    "",
    `**Total:** ${issues.length}`,
    "",
    "## By kind",
    "",
    ...Object.entries(byKind)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `- ${k}: ${n}`),
    "",
    "## Queue",
    "",
    "| Path | Kind | HE segs | EN segs | Reason |",
    "|------|------|--------:|--------:|--------|",
    ...issues.map(
      (i) =>
        `| \`${i.path}\` | ${i.kind} | ${i.heSegs ?? ""} | ${i.enSegs ?? ""} | ${i.reason} |`
    ),
    "",
  ].join("\n");

  const outMd = path.join(OUT_DIR, "RESIDUAL_MANUAL_QUEUE.md");
  const outJson = path.join(OUT_DIR, "RESIDUAL_MANUAL_QUEUE.json");
  fs.writeFileSync(outMd, md, "utf8");
  fs.writeFileSync(
    outJson,
    JSON.stringify({ generatedAt: new Date().toISOString(), byKind, issues }, null, 2),
    "utf8"
  );

  return {
    phase: "E",
    total: issues.length,
    byKind,
    outMd,
    outJson,
  };
}

function mergeAffected(target, src) {
  for (const [vol, sims] of Object.entries(src || {})) {
    if (!target[vol]) target[vol] = new Set();
    for (const s of sims) target[vol].add(s);
  }
}

function writePhaseArtifacts(phaseResult) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const phase = phaseResult.phase;
  const jsonPath = path.join(
    OUT_DIR,
    `residual_phase_${phase}_${phaseResult.mode || "run"}.json`
  );
  const payload = JSON.parse(
    JSON.stringify(phaseResult, (_, v) => (v instanceof Set ? [...v] : v))
  );
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf8");
  // also timestamped
  fs.writeFileSync(
    path.join(
      OUT_DIR,
      `residual_phase_${phase}_${phaseResult.mode || "run"}_${stamp}.json`
    ),
    JSON.stringify(payload, null, 2),
    "utf8"
  );
  return jsonPath;
}

function writeAffectedSimanim(affected) {
  const out = {};
  for (const [vol, set] of Object.entries(affected)) {
    out[vol] = [...set].sort((a, b) => a - b);
  }
  const p = path.join(OUT_DIR, "residual_affected_simanim.json");
  fs.writeFileSync(p, JSON.stringify(out, null, 2), "utf8");
  // Also update fix_affected for rebundle helper compatibility
  const fixP = path.join(OUT_DIR, "fix_affected_simanim.json");
  fs.writeFileSync(fixP, JSON.stringify(out, null, 2), "utf8");
  return p;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log(
    `[residual] phase=${opts.phase} mode=${opts.apply ? "APPLY" : "DRY-RUN"} volumes=${opts.volumes.join(",")}`
  );

  const allAffected = {};
  const summary = { phases: {} };

  const runA = () => {
    console.log("[residual] Phase A — repair corrupted HE…");
    const r = phaseA(opts);
    summary.phases.A = {
      fixed: r.totals.fixed,
      corrupt: r.totals.corrupt,
      skipped: r.totals.skipped,
      byMethod: r.byMethod,
      bySkipReason: r.bySkipReason,
    };
    mergeAffected(allAffected, r.affectedSimanim);
    const p = writePhaseArtifacts(r);
    console.log(
      `[A] corrupt=${r.totals.corrupt} fixed=${r.totals.fixed} skipped=${r.totals.skipped} → ${p}`
    );
    return r;
  };

  const runB = () => {
    console.log("[residual] Phase B — alternate EN split markers…");
    const r = phaseB(opts);
    summary.phases.B = {
      candidates: r.totals.candidates,
      fixed: r.totals.fixed,
      skipped: r.totals.skipped,
      byMethod: r.byMethod,
      spotChecks: r.spotChecks?.length || 0,
    };
    mergeAffected(allAffected, r.affectedSimanim);
    const p = writePhaseArtifacts(r);
    console.log(
      `[B] candidates=${r.totals.candidates} fixed=${r.totals.fixed} skipped=${r.totals.skipped} → ${p}`
    );
    if (r.spotChecks?.length) {
      console.log("[B] spot-checks:");
      for (const s of r.spotChecks.slice(0, 8)) {
        console.log(`  - ${s.path} (${s.method}) segs=${s.enSegsAfter}`);
      }
    }
    return r;
  };

  const runC = () => {
    console.log("[residual] Phase C — Copy2 better EN/HE…");
    const r = phaseC(opts);
    summary.phases.C = {
      candidates: r.totals.candidates,
      fixed: r.totals.fixed,
      skipped: r.totals.skipped,
      byMethod: r.byMethod,
    };
    mergeAffected(allAffected, r.affectedSimanim);
    const p = writePhaseArtifacts(r);
    console.log(
      `[C] candidates=${r.totals.candidates} fixed=${r.totals.fixed} skipped=${r.totals.skipped} → ${p}`
    );
    return r;
  };

  const runD = () => {
    console.log("[residual] Phase D — tiny stub HE fold…");
    const r = phaseD(opts);
    summary.phases.D = {
      candidates: r.totals.candidates,
      fixed: r.totals.fixed,
      skipped: r.totals.skipped,
      byMethod: r.byMethod,
    };
    mergeAffected(allAffected, r.affectedSimanim);
    const p = writePhaseArtifacts(r);
    console.log(
      `[D] candidates=${r.totals.candidates} fixed=${r.totals.fixed} skipped=${r.totals.skipped} → ${p}`
    );
    return r;
  };

  const runE = () => {
    console.log("[residual] Phase E — manual queue…");
    const r = phaseE(opts);
    summary.phases.E = { total: r.total, byKind: r.byKind };
    console.log(`[E] queue=${r.total} → ${r.outMd}`);
    return r;
  };

  const phase = opts.phase;
  if (phase === "A" || phase === "ALL") runA();
  if (phase === "B" || phase === "ALL") runB();
  if (phase === "C" || phase === "ALL") runC();
  if (phase === "D" || phase === "ALL") runD();
  if (phase === "E" || phase === "ALL") runE();

  const affPath = writeAffectedSimanim(allAffected);
  summary.affectedSimanim = Object.fromEntries(
    Object.entries(allAffected).map(([k, v]) => [k, [...v].sort((a, b) => a - b)])
  );
  const sumPath = path.join(OUT_DIR, "RESIDUAL_PHASES_SUMMARY.json");
  fs.writeFileSync(
    sumPath,
    JSON.stringify({ ...summary, writtenAt: new Date().toISOString() }, null, 2),
    "utf8"
  );
  console.log(`[residual] affected → ${affPath}`);
  console.log(`[residual] summary → ${sumPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
