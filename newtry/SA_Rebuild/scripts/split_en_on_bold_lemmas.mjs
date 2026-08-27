/**
 * Part 2 bucket 1 — split glued EN on bold lemma heads where safe.
 *
 * For en_truncated_vs_multi_he (enSegs===1, heSegs>=2) where EN is one blob but
 * contains <b>…</b> lemma heads that align 1:1 with HE <br> segments, insert
 * <br /> before each bold lemma (except the first) so enSegs === heSegs.
 *
 * Hard gates (ALL):
 *   1. heSegs >= 2, enSegs === 1  (v1: enSegs===1 only)
 *   2. Count of EN <b>…</b> lemma starts === heSegs
 *   3. Default: each HE seg starts with <b>; EN starts with <b>
 *      With --relax-he-bold-heads: drop HE bold-headed requirement.
 *      If first HE seg is not bold-headed, also allow EN non-bold prefix
 *      (first EN bold maps mid-first-seg, matching HE).
 *   4. HE must not contain **** ENGLISH **** or similar corruption
 *   5. Do not empty-pad
 *   6. Do not touch when bold count ≠ heSegs
 *   7. Modify en.html only
 *   8. Skip content-offset (unless relaxed as in #3)
 *
 * Usage:
 *   node split_en_on_bold_lemmas.mjs --dry-run --volumes oc1,yd1,cm1
 *   node split_en_on_bold_lemmas.mjs --apply --volumes oc1,yd1,cm1
 *   node split_en_on_bold_lemmas.mjs --apply --relax-he-bold-heads --volumes oc1,yd1,cm1
 *
 * After --apply: rebundle affected simanim only (BUNDLE_CONCURRENCY=1).
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
const OUT_DIR = path.join(
  REPO,
  "newtry/SA_Rebuild/audit/he_en_segment_mismatch"
);

const ALL_VOLUMES = ["oc1", "yd1", "eh1", "cm1"];

function parseArgs(argv) {
  const out = {
    apply: false,
    volumes: ["oc1", "yd1", "cm1"],
    slug: null,
    maxFixes: Infinity,
    maxSimanim: null,
    corpusRoot: CORPUS_ROOT,
    sampleLimit: 40,
    relaxHeBoldHeads: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--apply") out.apply = true;
    else if (a === "--dry-run") out.apply = false;
    else if (a === "--relax-he-bold-heads") out.relaxHeBoldHeads = true;
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
    else if (a === "--sample-limit") out.sampleLimit = parseInt(next(), 10);
    else if (a === "--help" || a === "-h") {
      console.log(`Split glued EN on bold lemmas (Part 2 bucket 1).

  --dry-run (default) | --apply
  --relax-he-bold-heads  allow HE segs that do not all start with <b>
                         (also allows EN non-bold prefix when first HE seg
                         is not bold-headed)
  --volume oc1 | --volumes oc1,yd1,cm1
  --slug <slug>  --max-fixes N  --max-simanim N
  --corpus-root <dir>`);
      process.exit(0);
    }
  }
  return out;
}

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

/** Same split as oc-web-reader zipHeEnSegments / scan_corpus_he_en_segment_mismatch. */
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

/** Opening <b> tags (lemma starts). Does not count </b>. */
function findBoldOpens(html) {
  const re = /<b\b[^>]*>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    out.push({ index: m.index, tag: m[0] });
  }
  return out;
}

/** Extract inner text of each <b>…</b> pair (non-greedy, top-level style). */
function boldLemmaTexts(html) {
  const out = [];
  const re = /<b\b[^>]*>([\s\S]*?)<\/b>/gi;
  let m;
  while ((m = re.exec(html))) {
    out.push(visibleText(m[1]).slice(0, 80));
  }
  return out;
}

function heLooksCorrupted(heRaw) {
  const s = String(heRaw ?? "");
  if (/[*]{2,}\s*ENGLISH\s*[*]{2,}/i.test(s)) return true;
  if (/[*]{4}\s*ENGLISH\s*[*]{4}/i.test(s)) return true;
  if (/SOURCE BLOCK|END BLOCK/i.test(s)) return true;
  // Latin-heavy HE is suspicious but not always corruption; gate on ENGLISH marker mainly
  return false;
}

/**
 * Content-offset / mid-essay: EN should open on a bold lemma with little
 * preceding visible prose. Substantial non-bold prefix ⇒ skip.
 */
function isContentOffset(enRaw, boldOpens) {
  if (!boldOpens.length) return { offset: true, reason: "no_bold" };
  const first = boldOpens[0].index;
  const prefix = enRaw.slice(0, first);
  const prefixVis = visibleText(prefix);
  // Allow tiny leading whitespace/punctuation only
  if (prefixVis.length > 12) {
    return { offset: true, reason: "non_bold_prefix", prefixLen: prefixVis.length };
  }
  // Must start near a bold tag (after optional BOM/whitespace already stripped)
  if (!/^\s*<b\b/i.test(enRaw) && prefixVis.length > 0) {
    return { offset: true, reason: "does_not_start_with_bold" };
  }
  return { offset: false };
}

/**
 * Insert <br /> before each bold open except the first, when not already
 * preceded by a <br>. Never invents empty segments.
 */
function insertBrBeforeBoldLemmas(enRaw, boldOpens) {
  if (boldOpens.length < 2) return enRaw;
  // Build from end so indices stay valid
  let out = enRaw;
  for (let i = boldOpens.length - 1; i >= 1; i--) {
    const idx = boldOpens[i].index;
    const before = out.slice(0, idx);
    const trimmedEnd = before.replace(/(?:\s|<(?!br\b)[^>]*>)*$/gi, "");
    if (/<br\s*\/?>$/i.test(trimmedEnd)) continue;
    out = before + "<br />\n" + out.slice(idx);
  }
  return out;
}

function* walkSlugDirs(simanDir) {
  let ents;
  try {
    ents = fs.readdirSync(simanDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of ents) {
    if (!e.isDirectory()) continue;
    if (!e.name.startsWith("seif-")) continue;
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

function processVolume(vol, opts) {
  const liveRoot = path.join(opts.corpusRoot, vol);
  const result = {
    volume: vol,
    scannedPairs: 0,
    candidateMismatches: 0,
    eligible: 0,
    applied: 0,
    skipped: 0,
    byKind: {},
    bySlug: {},
    bySkipReason: {},
    byHeSegs: {},
    affectedSimanim: new Set(),
    backups: [],
    eligibleSamples: [],
    skippedSamples: [],
  };

  if (!fs.existsSync(liveRoot)) {
    result.error = "live_missing";
    return result;
  }

  const simans = listSimanDirs(liveRoot);
  let simanCount = 0;

  for (const simanName of simans) {
    if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
    simanCount++;
    const siman = parseInt(simanName.replace(/\D/g, ""), 10);
    const liveSiman = path.join(liveRoot, simanName);

    for (const { seif, slug, slugDir } of walkSlugDirs(liveSiman)) {
      if (opts.slug && slug !== opts.slug) continue;
      if (opts.apply && result.applied >= opts.maxFixes) {
        result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
        result.simanimScanned = simanCount;
        return result;
      }
      if (!opts.apply && result.eligible >= opts.maxFixes) {
        result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
        result.simanimScanned = simanCount;
        return result;
      }

      const hePath = path.join(slugDir, "he.html");
      const enPath = path.join(slugDir, "en.html");
      if (!fs.existsSync(hePath) && !fs.existsSync(enPath)) continue;

      result.scannedPairs++;
      const liveHe = readText(hePath);
      const liveEn = readText(enPath);
      const lHe = splitHtmlByBrSegments(liveHe);
      const lEn = splitHtmlByBrSegments(liveEn);
      const cls = classify(lHe, lEn, liveHe, liveEn);

      // v1: only classic glued EN vs multi HE
      if (!cls || cls.kind !== "en_truncated_vs_multi_he") continue;
      if (cls.enN !== 1 || cls.heN < 2) continue;

      result.candidateMismatches++;
      bump(result.byKind, cls.kind);

      const rel = `${vol}/${simanName}/${seif}/${slug}`;
      const enRel = `${rel}/en.html`;

      const skip = (reason, extra = {}) => {
        result.skipped++;
        bump(result.bySkipReason, reason);
        if (result.skippedSamples.length < opts.sampleLimit) {
          result.skippedSamples.push({
            path: rel,
            kind: cls.kind,
            heSegs: cls.heN,
            enSegs: cls.enN,
            reason,
            ...extra,
          });
        }
      };

      if (!hasHebrewLetters(liveHe) || visuallyEmpty(liveHe)) {
        skip("he_empty_or_no_hebrew");
        continue;
      }
      if (visuallyEmpty(liveEn)) {
        skip("en_empty");
        continue;
      }
      if (heLooksCorrupted(liveHe)) {
        skip("he_corrupted_english_marker");
        continue;
      }

      const boldOpens = findBoldOpens(liveEn);
      const boldCount = boldOpens.length;
      const heBoldStarts = lHe.filter((s) => /^\s*<b\b/i.test(s)).length;

      if (boldCount !== cls.heN) {
        skip("bold_count_ne_heSegs", {
          boldCount,
          heSegs: cls.heN,
          heBoldStarts,
        });
        continue;
      }

      // Structural align: prefer HE segs that each open with <b>
      const heAllBoldHeaded = heBoldStarts === cls.heN;
      if (!heAllBoldHeaded && !opts.relaxHeBoldHeads) {
        skip("he_segs_not_all_bold_headed", {
          boldCount,
          heBoldStarts,
          heSegs: cls.heN,
        });
        continue;
      }

      // Content-offset: when first HE seg is not bold-headed, EN may have a
      // matching non-bold prefix before the first lemma (still 1:1 by bold count).
      const firstHeBoldHeaded = /^\s*<b\b/i.test(lHe[0] || "");
      const allowNonBoldPrefix =
        opts.relaxHeBoldHeads && !heAllBoldHeaded && !firstHeBoldHeaded;
      const off = isContentOffset(liveEn, boldOpens);
      if (off.offset && !allowNonBoldPrefix) {
        skip("content_offset", off);
        continue;
      }

      const fixed = insertBrBeforeBoldLemmas(liveEn, boldOpens);
      if (visuallyEmpty(fixed)) {
        skip("fix_would_empty_en");
        continue;
      }

      const newSegs = splitHtmlByBrSegments(fixed);
      if (newSegs.length !== cls.heN) {
        skip("fix_seg_count_mismatch", {
          expected: cls.heN,
          got: newSegs.length,
        });
        continue;
      }

      // No empty-pad: every new EN seg must be non-empty
      if (newSegs.some((s) => visuallyEmpty(s))) {
        skip("empty_pad_detected");
        continue;
      }

      const enHeads = boldLemmaTexts(liveEn);
      const heHeads = boldLemmaTexts(liveHe);

      result.eligible++;
      bump(result.bySlug, slug);
      bump(result.byHeSegs, String(cls.heN));
      result.affectedSimanim.add(siman);

      const backup = {
        path: enRel,
        sha256: sha256(liveEn),
        bytes: Buffer.byteLength(liveEn, "utf8"),
        preview: liveEn.replace(/\s+/g, " ").trim().slice(0, 220),
        kind: cls.kind,
        heSegs: cls.heN,
        enSegs: cls.enN,
        boldCount,
        enHeads: enHeads.slice(0, 8),
        heHeads: heHeads.slice(0, 8),
        strategy: allowNonBoldPrefix
          ? "split_en_br_before_bold_relax_he_heads"
          : "split_en_br_before_bold",
        relaxHeBoldHeads: !!opts.relaxHeBoldHeads,
        heAllBoldHeaded,
        allowNonBoldPrefix,
      };

      if (result.eligibleSamples.length < opts.sampleLimit) {
        result.eligibleSamples.push({
          ...backup,
          fixedPreview: fixed.replace(/\s+/g, " ").trim().slice(0, 280),
          fixedBytes: Buffer.byteLength(fixed, "utf8"),
          fixedSegs: newSegs.length,
        });
      }
      result.backups.push(backup);

      if (opts.apply) {
        const out = fixed.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        fs.writeFileSync(enPath, out.endsWith("\n") ? out : out + "\n", "utf8");
        result.applied++;
      }
    }
  }

  result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
  result.simanimScanned = simanCount;
  return result;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  ensureDir(OUT_DIR);

  console.log(
    `[split-en-bold] mode=${opts.apply ? "APPLY" : "DRY-RUN"} volumes=${opts.volumes.join(",")}` +
      (opts.relaxHeBoldHeads ? " relaxHeBoldHeads=1" : "")
  );
  console.log(`[split-en-bold] corpusRoot=${opts.corpusRoot}`);
  console.log(
    `[split-en-bold] policy: enSegs===1, heSegs>=2, enBoldOpens===heSegs, ` +
      (opts.relaxHeBoldHeads
        ? "HE bold-heads RELAXED (prefix OK if first HE not bold-headed)"
        : "HE segs bold-headed, no content-offset") +
      `, en.html only`
  );

  const reports = [];
  for (const vol of opts.volumes) {
    if (!ALL_VOLUMES.includes(vol)) {
      console.warn(`[split-en-bold] skip unknown volume ${vol}`);
      continue;
    }
    console.log(`\n[split-en-bold] scanning ${vol}…`);
    const t0 = Date.now();
    const r = processVolume(vol, opts);
    const ms = Date.now() - t0;
    reports.push(r);
    console.log(
      `[split-en-bold] ${vol}: candidates=${r.candidateMismatches} eligible=${r.eligible}` +
        (opts.apply ? ` applied=${r.applied}` : "") +
        ` skipped=${r.skipped} (${ms}ms)`
    );
    console.log(`  byKind: ${JSON.stringify(r.byKind)}`);
    console.log(`  bySlug: ${JSON.stringify(r.bySlug)}`);
    console.log(`  byHeSegs: ${JSON.stringify(r.byHeSegs)}`);
    console.log(`  bySkipReason: ${JSON.stringify(r.bySkipReason)}`);
    console.log(
      `  affectedSimanim(${r.affectedSimanim.length}): ${r.affectedSimanim.slice(0, 40).join(",")}${r.affectedSimanim.length > 40 ? "…" : ""}`
    );
    if (r.eligibleSamples?.length) {
      console.log(`  samples:`);
      for (const s of r.eligibleSamples.slice(0, 8)) {
        console.log(
          `    ${s.path} he=${s.heSegs} bold=${s.boldCount} heads=[${(s.enHeads || []).slice(0, 3).join(" | ")}]`
        );
      }
    }
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outName = opts.apply
    ? `en_bold_split_apply_log.json`
    : `en_bold_split_dry_run.json`;
  const outPath = path.join(OUT_DIR, outName);
  const payload = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    volumes: opts.volumes,
    policy: {
      kind: "en_truncated_vs_multi_he",
      enSegs: 1,
      heSegsMin: 2,
      boldCountMustEqualHeSegs: true,
      heSegsMustBeBoldHeaded: !opts.relaxHeBoldHeads,
      relaxHeBoldHeads: !!opts.relaxHeBoldHeads,
      skipContentOffset: !opts.relaxHeBoldHeads,
      modify: "en.html only",
      noEmptyPad: true,
      stubIgnore: false,
    },
    totals: {
      candidates: reports.reduce((n, r) => n + (r.candidateMismatches || 0), 0),
      eligible: reports.reduce((n, r) => n + (r.eligible || 0), 0),
      applied: reports.reduce((n, r) => n + (r.applied || 0), 0),
      skipped: reports.reduce((n, r) => n + (r.skipped || 0), 0),
    },
    reports,
  };
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`\n[split-en-bold] wrote ${outPath}`);

  const affected = {};
  for (const r of reports) {
    affected[r.volume] = r.affectedSimanim;
  }
  const affPath = path.join(OUT_DIR, "en_bold_split_affected_simanim.json");
  fs.writeFileSync(affPath, JSON.stringify(affected, null, 2), "utf8");
  console.log(`[split-en-bold] wrote ${affPath}`);

  if (opts.apply) {
    const bak = path.join(OUT_DIR, `en_bold_split_apply_log_${stamp}.json`);
    fs.writeFileSync(bak, JSON.stringify(payload, null, 2), "utf8");
    console.log(`[split-en-bold] backup log ${bak}`);
  }

  // Short markdown summary for the bucket
  const md = [
    "# Part 2 bucket 1 — EN bold-lemma split",
    "",
    `Mode: **${opts.apply ? "APPLY" : "DRY-RUN"}**`,
    `Scanned at: ${payload.scannedAt}`,
    "",
    `| Metric | Count |`,
    `|---|---:|`,
    `| Candidates (en_truncated) | ${payload.totals.candidates} |`,
    `| Eligible | ${payload.totals.eligible} |`,
    `| Applied | ${payload.totals.applied} |`,
    `| Skipped | ${payload.totals.skipped} |`,
    "",
    "## By volume",
    "",
  ];
  for (const r of reports) {
    md.push(
      `- **${r.volume}**: candidates=${r.candidateMismatches} eligible=${r.eligible}` +
        (opts.apply ? ` applied=${r.applied}` : "") +
        ` skipped=${r.skipped}`
    );
    md.push(`  - bySlug: \`${JSON.stringify(r.bySlug)}\``);
    md.push(`  - bySkipReason: \`${JSON.stringify(r.bySkipReason)}\``);
  }
  md.push("");
  const mdPath = path.join(
    OUT_DIR,
    opts.apply ? "EN_BOLD_SPLIT_APPLY.md" : "EN_BOLD_SPLIT_DRY_RUN.md"
  );
  fs.writeFileSync(mdPath, md.join("\n") + "\n", "utf8");
  console.log(`[split-en-bold] wrote ${mdPath}`);

  console.log(
    `\n[split-en-bold] TOTAL eligible=${payload.totals.eligible}` +
      (opts.apply
        ? ` applied=${payload.totals.applied}`
        : " (dry-run — re-run with --apply)")
  );
}

main();
