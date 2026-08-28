/**
 * DRY-RUN ONLY — classify en_has_more_segments for safe EN continuation rejoin.
 * Does NOT write corpus. Writes reports under this audit folder.
 *
 *   node dry_run_en_rejoin_continuations.mjs
 *   node dry_run_en_rejoin_continuations.mjs --corpus-root <dir>
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../../..");
const DEFAULT_CORPUS = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const OUT_DIR = __dirname;
const ALL_VOLUMES = ["oc1", "yd1", "eh1", "cm1"];

function parseArgs(argv) {
  const out = { corpusRoot: DEFAULT_CORPUS, volumes: ALL_VOLUMES.slice() };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--corpus-root") out.corpusRoot = path.resolve(next());
    else if (a === "--volume") out.volumes = [next()];
    else if (a === "--volumes")
      out.volumes = next()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
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

function stripTags(html) {
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

function visuallyEmpty(html) {
  return stripTags(html).length === 0;
}

function classifyMismatch(heParts, enParts, heRaw, enRaw) {
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

/** Strip leading HTML/markdown wrappers for head detection. */
function plainHead(seg) {
  let s = String(seg ?? "").trim();
  // unwrap leading <b>...</b> or **...** for inspection but keep original for markers
  const plain = stripTags(s);
  return { raw: s, plain };
}

function hasLeadingBoldLemma(raw) {
  const t = String(raw).trim();
  if (/^<b[\s>]/i.test(t)) return true;
  if (/^\*\*[^*\n]{1,120}\*\*/.test(t)) return true;
  if (/^<strong[\s>]/i.test(t)) return true;
  return false;
}

function hasNumberedMarker(plain) {
  // (1) 1. 1) א) (א) seif katan N
  if (/^\(\d{1,3}\)\s/.test(plain)) return true;
  if (/^\d{1,3}[.)]\s/.test(plain)) return true;
  if (/^\([\u05d0-\u05ea]{1,3}\)\s/.test(plain)) return true;
  if (/^[\u05d0-\u05ea]{1,3}[.)]\s/.test(plain)) return true;
  if (/^seif\s+katan\s+\d+/i.test(plain)) return true;
  if (/^\(collected note\)/i.test(plain)) return true;
  return false;
}

function startsLowercaseContinuation(plain) {
  if (!plain) return true;
  const c = plain[0];
  // Latin lowercase or conjunction-ish
  if (/[a-z]/.test(c)) return true;
  return false;
}

function looksLikeContinuationCue(plain) {
  const cues =
    /^(and |or |for |as |this |that |which |when |where |with |without |because |however |nevertheless |therefore |also |even |only |see |so |thus |then |there |these |those |it |its |he |she |they |we |of |to |in |on |from |by |at |after |before |if |but |not |nor |yet |the fact |at first |likewise |similarly |accordingly |namely |i\.e\.|e\.g\.)/i;
  return cues.test(plain);
}

/**
 * Classify one EN segment head.
 * Returns { strength: 'strong'|'weak', reasons: string[] }
 */
function classifyEnHead(seg, index) {
  const { raw, plain } = plainHead(seg);
  const reasons = [];
  if (!plain || plain.length < 2) {
    return { strength: "weak", reasons: ["empty_or_tiny"] };
  }

  let strongScore = 0;
  if (hasLeadingBoldLemma(raw)) {
    strongScore += 2;
    reasons.push("bold_lemma");
  }
  if (hasNumberedMarker(plain)) {
    strongScore += 2;
    reasons.push("numbered_or_note_marker");
  }
  // Hebrew letter note head at start of plain (rare in EN)
  if (/^[\u05d0-\u05ea]\s/.test(plain)) {
    strongScore += 1;
    reasons.push("hebrew_letter_head");
  }
  // Title-ish: capital letter + short lemma-like before colon/dash
  if (/^[A-Z]/.test(plain) && !looksLikeContinuationCue(plain)) {
    strongScore += 1;
    reasons.push("capital_start");
  }

  let weakScore = 0;
  if (startsLowercaseContinuation(plain)) {
    weakScore += 2;
    reasons.push("lowercase_start");
  }
  if (looksLikeContinuationCue(plain) && !hasNumberedMarker(plain)) {
    weakScore += 2;
    reasons.push("continuation_cue");
  }
  if (index > 0 && /^[,.;:]/.test(plain)) {
    weakScore += 3;
    reasons.push("mid_punct_start");
  }

  // First segment is always treated as a head (must start a group)
  if (index === 0) {
    return { strength: "strong", reasons: [...reasons, "first_segment"] };
  }

  if (strongScore >= 2 && weakScore < 2) {
    return { strength: "strong", reasons };
  }
  if (weakScore >= 2 && strongScore < 2) {
    return { strength: "weak", reasons };
  }
  if (strongScore > weakScore) {
    return { strength: "strong", reasons: [...reasons, "tiebreak_strong"] };
  }
  if (weakScore > strongScore) {
    return { strength: "weak", reasons: [...reasons, "tiebreak_weak"] };
  }
  // Ambiguous mid-strength: treat as weak for merge eligibility but flag
  return { strength: "weak", reasons: [...reasons, "ambiguous_default_weak"] };
}

function countHeBoldLemmas(heParts) {
  let n = 0;
  for (const p of heParts) {
    if (hasLeadingBoldLemma(p) || /<b[\s>]/i.test(p) || /^\*\*/.test(p.trim())) n++;
  }
  return n;
}

function countHeNoteMarkers(heParts) {
  let n = 0;
  for (const p of heParts) {
    const plain = stripTags(p);
    if (
      /^\([\u05d0-\u05ea\d]{1,3}\)/.test(plain) ||
      /^[\u05d0-\u05ea]{1,3}[.)\s]/.test(plain) ||
      /<b[\s>]/i.test(p)
    ) {
      n++;
    }
  }
  return n;
}

/**
 * Propose merges: greedily attach consecutive weak segs to previous strong head
 * until en count == heN, preferring to merge weakest chains.
 *
 * Returns { status, mergedGroups, plan, reasons }
 */
function proposeRejoin(enParts, heN, headMeta) {
  const excess = enParts.length - heN;
  if (excess <= 0) {
    return { status: "skip", reason: "no_excess", plan: [] };
  }

  const strongIdx = [];
  const weakIdx = [];
  for (let i = 0; i < headMeta.length; i++) {
    if (headMeta[i].strength === "strong") strongIdx.push(i);
    else weakIdx.push(i);
  }

  // Prefer: # strong heads === heN → each strong starts a group; weaks attach to prior
  const preferAlign = strongIdx.length === heN;

  // Build initial groups: start new group on strong, else append to last
  const groups = [];
  for (let i = 0; i < enParts.length; i++) {
    const isStrong = headMeta[i].strength === "strong";
    if (i === 0 || (isStrong && preferAlign)) {
      groups.push([i]);
    } else if (isStrong && !preferAlign) {
      // start new unless we already have heN groups and still need to absorb excess
      if (groups.length < heN) groups.push([i]);
      else groups[groups.length - 1].push(i);
    } else {
      // weak → append to previous
      if (!groups.length) groups.push([i]);
      else groups[groups.length - 1].push(i);
    }
  }

  // If preferAlign and groups === heN, good
  if (groups.length === heN) {
    const plan = groups
      .map((g, gi) => (g.length > 1 ? { group: gi, mergeIndices: g } : null))
      .filter(Boolean);
    // Safety: do not glue two numbered markers into one group
    for (const g of groups) {
      const numbered = g.filter((i) =>
        hasNumberedMarker(stripTags(enParts[i]))
      );
      if (numbered.length > 1) {
        return {
          status: "unsafe",
          reason: "would_glue_distinct_numbered_notes",
          strongHeads: strongIdx.length,
          groups,
          plan,
        };
      }
    }
    return {
      status: "eligible",
      reason: preferAlign
        ? "strong_heads_match_heSegs"
        : "greedy_weak_attach_match",
      strongHeads: strongIdx.length,
      groups,
      plan,
    };
  }

  // If too many groups, merge adjacent groups that look like weak-only tails
  // (second group starts with weak — shouldn't happen if we attach weaks)
  // Or: too few groups — cannot invent splits; skip
  if (groups.length < heN) {
    return {
      status: "unsafe",
      reason: "under_grouped_cannot_split",
      strongHeads: strongIdx.length,
      groups,
      plan: [],
    };
  }

  // Too many groups: need to merge (groups.length - heN) adjacent pairs.
  // Prefer merging a group whose head is weak / ambiguous into previous.
  let g = groups.map((x) => x.slice());
  const mergeOps = [];
  while (g.length > heN) {
    // Find best merge boundary: prefer where right group's first idx is weak
    let best = -1;
    let bestScore = -Infinity;
    for (let i = 1; i < g.length; i++) {
      const rightFirst = g[i][0];
      const meta = headMeta[rightFirst];
      let score = 0;
      if (meta.strength === "weak") score += 5;
      if (meta.reasons.includes("continuation_cue")) score += 3;
      if (meta.reasons.includes("lowercase_start")) score += 3;
      if (meta.reasons.includes("ambiguous_default_weak")) score += 1;
      if (hasNumberedMarker(stripTags(enParts[rightFirst]))) score -= 10;
      if (hasLeadingBoldLemma(enParts[rightFirst])) score -= 8;
      // Prefer smaller right group
      score -= g[i].length * 0.1;
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    }
    if (best < 1 || bestScore < 0) {
      return {
        status: "unsafe",
        reason: "ambiguous_no_safe_merge_boundary",
        strongHeads: strongIdx.length,
        groups: g,
        plan: mergeOps,
        bestScore,
      };
    }
    // Check numbered glue
    const leftNums = g[best - 1].filter((i) =>
      hasNumberedMarker(stripTags(enParts[i]))
    ).length;
    const rightNums = g[best].filter((i) =>
      hasNumberedMarker(stripTags(enParts[i]))
    ).length;
    if (leftNums + rightNums > 1 && leftNums > 0 && rightNums > 0) {
      return {
        status: "unsafe",
        reason: "would_glue_distinct_numbered_notes",
        strongHeads: strongIdx.length,
        groups: g,
        plan: mergeOps,
      };
    }
    mergeOps.push({
      mergeGroupInto: best - 1,
      fromGroup: best,
      indices: [...g[best - 1], ...g[best]],
    });
    g[best - 1] = [...g[best - 1], ...g[best]];
    g.splice(best, 1);
  }

  if (g.length !== heN) {
    return {
      status: "unsafe",
      reason: "post_merge_count_mismatch",
      strongHeads: strongIdx.length,
      groups: g,
      plan: mergeOps,
    };
  }

  const plan = g
    .map((grp, gi) => (grp.length > 1 ? { group: gi, mergeIndices: grp } : null))
    .filter(Boolean);

  return {
    status: "eligible",
    reason:
      strongIdx.length === heN
        ? "strong_heads_match_heSegs_after_collapse"
        : "greedy_boundary_merge_to_heSegs",
    strongHeads: strongIdx.length,
    groups: g,
    plan,
  };
}

function applyGroupsToSegments(enParts, groups) {
  return groups.map((idxs) =>
    idxs
      .map((i) => enParts[i].trim())
      .filter(Boolean)
      .join(" ")
  );
}

function preview(s, n = 80) {
  const p = stripTags(s);
  return p.length > n ? p.slice(0, n) : p;
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

function listSimanDirs(volRoot) {
  if (!fs.existsSync(volRoot)) return [];
  return fs
    .readdirSync(volRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^siman\d+$/i.test(e.name))
    .map((e) => e.name)
    .sort(
      (a, b) =>
        parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10)
    );
}

function bump(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function processVolume(vol, corpusRoot) {
  const volRoot = path.join(corpusRoot, vol);
  const out = {
    volume: vol,
    cases: [],
    byStatus: {},
    bySlug: {},
    byReason: {},
  };
  if (!fs.existsSync(volRoot)) {
    out.error = "missing";
    return out;
  }

  for (const simanName of listSimanDirs(volRoot)) {
    const siman = parseInt(simanName.replace(/\D/g, ""), 10);
    const simanDir = path.join(volRoot, simanName);
    for (const { seif, slug, slugDir } of walkSlugDirs(simanDir)) {
      const hePath = path.join(slugDir, "he.html");
      const enPath = path.join(slugDir, "en.html");
      if (!fs.existsSync(hePath) && !fs.existsSync(enPath)) continue;
      const heRaw = fs.existsSync(hePath)
        ? fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "")
        : "";
      const enRaw = fs.existsSync(enPath)
        ? fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "")
        : "";
      const heParts = splitHtmlByBrSegments(heRaw);
      const enParts = splitHtmlByBrSegments(enRaw);
      const cls = classifyMismatch(heParts, enParts, heRaw, enRaw);
      if (!cls || cls.kind !== "en_has_more_segments") continue;

      const headMeta = enParts.map((seg, i) => classifyEnHead(seg, i));
      const heBold = countHeBoldLemmas(heParts);
      const heNotes = countHeNoteMarkers(heParts);
      const strongHeads = headMeta.filter((h) => h.strength === "strong").length;
      const proposal = proposeRejoin(enParts, cls.heN, headMeta);

      let afterSegs = null;
      let afterPreviews = null;
      if (proposal.status === "eligible" && proposal.groups) {
        const joined = applyGroupsToSegments(enParts, proposal.groups);
        afterSegs = joined.length;
        afterPreviews = joined.map((s) => preview(s, 80));
        if (afterSegs !== cls.heN) {
          proposal.status = "unsafe";
          proposal.reason = "after_join_count_ne_he";
        }
      }

      // Prefer flag when strong heads align with heSegs or he bold count
      const alignHint =
        strongHeads === cls.heN
          ? "strong_eq_heSegs"
          : strongHeads === heBold && heBold === cls.heN
            ? "strong_eq_heBold_eq_heSegs"
            : strongHeads === heNotes && heNotes === cls.heN
              ? "strong_eq_heNotes"
              : "no_head_align";

      // Strict eligible gate: count match + strongEnHeads === heSegs + each
      // group starts with a strong head. Everything else → unsafe/review.
      if (proposal.groups && proposal.groups.length === cls.heN) {
        const groupsOk = proposal.groups.every(
          (g) => headMeta[g[0]]?.strength === "strong"
        );
        const numberedGlue = proposal.groups.some((g) => {
          const nums = g.filter((i) =>
            hasNumberedMarker(stripTags(enParts[i]))
          );
          return nums.length > 1;
        });
        if (
          strongHeads === cls.heN &&
          groupsOk &&
          !numberedGlue &&
          afterSegs === cls.heN
        ) {
          proposal.status = "eligible";
          proposal.reason = "strong_heads_match_heSegs";
        } else if (proposal.status === "eligible") {
          proposal.status = "unsafe";
          proposal.reason = numberedGlue
            ? "would_glue_distinct_numbered_notes"
            : strongHeads !== cls.heN
              ? "greedy_or_unaligned_strong_heads"
              : "group_not_starting_strong";
        }
      }

      const row = {
        path: `${vol}/${simanName}/${seif}/${slug}`,
        volume: vol,
        siman,
        seif,
        slug,
        heSegs: cls.heN,
        enSegs: cls.enN,
        excess: cls.enN - cls.heN,
        strongEnHeads: strongHeads,
        heBoldLemmas: heBold,
        heNoteMarkers: heNotes,
        alignHint,
        status: proposal.status,
        reason: proposal.reason,
        plan: proposal.plan || [],
        groups: proposal.groups || null,
        enHeadMeta: headMeta.map((h, i) => ({
          i,
          strength: h.strength,
          reasons: h.reasons,
          preview: preview(enParts[i], 80),
        })),
        enBefore: enParts.map((s) => preview(s, 80)),
        enAfter: afterPreviews,
        afterSegs,
      };

      out.cases.push(row);
      bump(out.byStatus, row.status);
      bump(out.byReason, row.reason || "none");
      if (!out.bySlug[slug]) out.bySlug[slug] = { total: 0, eligible: 0, unsafe: 0, skip: 0 };
      out.bySlug[slug].total++;
      out.bySlug[slug][row.status] = (out.bySlug[slug][row.status] || 0) + 1;
    }
  }
  return out;
}

function pickExamples(allCases, n = 8) {
  const eligible = allCases.filter((c) => c.status === "eligible");
  const unsafe = allCases.filter((c) => c.status === "unsafe");
  const picks = [];
  // diverse eligible
  for (const c of eligible) {
    if (picks.length >= Math.min(5, n)) break;
    if (picks.some((p) => p.path === c.path)) continue;
    picks.push(c);
  }
  for (const c of unsafe) {
    if (picks.length >= n) break;
    if (picks.some((p) => p.path === c.path)) continue;
    picks.push(c);
  }
  // fill from remaining
  for (const c of allCases) {
    if (picks.length >= n) break;
    if (picks.some((p) => p.path === c.path)) continue;
    picks.push(c);
  }
  return picks;
}

function writeMd(summary, examples, outPath) {
  const lines = [
    "# EN continuation rejoin — DRY-RUN",
    "",
    `Scanned at: ${summary.scannedAt}`,
    `Corpus: \`${summary.corpusRoot}\``,
    "",
    "**Nothing applied to corpus.**",
    "",
    "## Counts",
    "",
    `| Metric | Count |`,
    `|--------|------:|`,
    `| en_has_more_segments (total) | ${summary.total} |`,
    `| eligible (safe dry-run) | ${summary.eligible} |`,
    `| unsafe | ${summary.unsafe} |`,
    `| skip | ${summary.skip} |`,
    "",
    "## By volume",
    "",
    "| Volume | Total | Eligible | Unsafe | Skip |",
    "|--------|------:|---------:|-------:|-----:|",
  ];
  for (const v of summary.byVolume) {
    lines.push(
      `| ${v.volume} | ${v.total} | ${v.eligible} | ${v.unsafe} | ${v.skip} |`
    );
  }
  lines.push("", "## Top slugs", "", "| Slug | Total | Eligible | Unsafe |", "|------|------:|---------:|-------:|");
  for (const s of summary.topSlugs) {
    lines.push(
      `| ${s.slug} | ${s.total} | ${s.eligible || 0} | ${s.unsafe || 0} |`
    );
  }
  lines.push("", "## Example rows", "");
  for (const ex of examples) {
    lines.push(`### \`${ex.path}\` — **${ex.status}** (${ex.reason})`);
    lines.push("");
    lines.push(
      `- heSegs=${ex.heSegs} enSegs=${ex.enSegs} excess=${ex.excess}; strongEnHeads=${ex.strongEnHeads}; alignHint=${ex.alignHint}`
    );
    lines.push(`- Proposed groups: \`${JSON.stringify(ex.groups)}\``);
    lines.push("- EN before:");
    ex.enBefore.forEach((p, i) => {
      const st = ex.enHeadMeta[i]?.strength || "?";
      lines.push(`  - [${i}|${st}] ${p}`);
    });
    if (ex.enAfter) {
      lines.push("- EN after (proposed):");
      ex.enAfter.forEach((p, i) => lines.push(`  - [${i}] ${p}`));
    }
    lines.push("");
  }
  lines.push("## Recommendation", "", summary.recommendation, "");
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log(`[dry-run-en-rejoin] corpus=${opts.corpusRoot}`);
  console.log(`[dry-run-en-rejoin] volumes=${opts.volumes.join(",")}`);
  console.log(`[dry-run-en-rejoin] mode=DRY-RUN (no corpus writes)`);

  const reports = [];
  for (const vol of opts.volumes) {
    console.log(`[dry-run-en-rejoin] scanning ${vol}…`);
    const t0 = Date.now();
    const r = processVolume(vol, opts.corpusRoot);
    reports.push(r);
    console.log(
      `[dry-run-en-rejoin] ${vol}: cases=${r.cases.length} byStatus=${JSON.stringify(r.byStatus)} (${Date.now() - t0}ms)`
    );
  }

  const allCases = reports.flatMap((r) => r.cases);
  const eligible = allCases.filter((c) => c.status === "eligible").length;
  const unsafe = allCases.filter((c) => c.status === "unsafe").length;
  const skip = allCases.filter((c) => c.status === "skip").length;

  const byVolume = reports.map((r) => ({
    volume: r.volume,
    total: r.cases.length,
    eligible: r.byStatus.eligible || 0,
    unsafe: r.byStatus.unsafe || 0,
    skip: r.byStatus.skip || 0,
    bySlug: r.bySlug,
    byReason: r.byReason,
  }));

  const slugAgg = {};
  for (const c of allCases) {
    if (!slugAgg[c.slug])
      slugAgg[c.slug] = { slug: c.slug, total: 0, eligible: 0, unsafe: 0, skip: 0 };
    slugAgg[c.slug].total++;
    slugAgg[c.slug][c.status] = (slugAgg[c.slug][c.status] || 0) + 1;
  }
  const topSlugs = Object.values(slugAgg).sort((a, b) => b.total - a.total);

  let recommendation;
  if (eligible === 0) {
    recommendation =
      "HOLD — no safe eligible rejoins under strict strong-head===heSegs gate. Existing `rejoin_oversplit_en.mjs` only covers heSegs===1 (0 of these 59). Do not apply.";
  } else if (eligible / Math.max(allCases.length, 1) < 0.35) {
    recommendation = `SELECTIVE HOLD — ${eligible}/${allCases.length} pass strict strong-head alignment. Review those ${eligible} before any apply. Remaining are unsafe/ambiguous (greedy collapse or under-grouped). Existing rejoin_oversplit_en.mjs cannot apply these (requires heSegs===1); need a NEW apply script gated on strong_heads_match_heSegs only.`;
  } else {
    recommendation = `CONDITIONAL APPLY (strict subset) — ${eligible}/${allCases.length} eligible under strong_heads===heSegs. Existing rejoin_oversplit_en.mjs is insufficient; new apply path required. Do not auto-apply greedy/unaligned cases.`;
  }

  const summary = {
    scannedAt: new Date().toISOString(),
    mode: "dry-run",
    corpusRoot: opts.corpusRoot,
    total: allCases.length,
    eligible,
    unsafe,
    skip,
    byVolume,
    topSlugs,
    byReason: allCases.reduce((m, c) => {
      bump(m, c.reason || "none");
      return m;
    }, {}),
    recommendation,
    note: "Nothing applied to corpus. Existing rejoin_oversplit_en.mjs only handles heSegs===1.",
  };

  const examples = pickExamples(allCases, 8);
  const exampleRows = examples.map((ex) => ({
    path: ex.path,
    status: ex.status,
    reason: ex.reason,
    heSegs: ex.heSegs,
    enSegs: ex.enSegs,
    excess: ex.excess,
    strongEnHeads: ex.strongEnHeads,
    alignHint: ex.alignHint,
    groups: ex.groups,
    plan: ex.plan,
    enBefore: ex.enBefore,
    enAfter: ex.enAfter,
    enHeadMeta: ex.enHeadMeta,
  }));

  const jsonPath = path.join(OUT_DIR, "en_rejoin_continuations_dry_run.json");
  const mdPath = path.join(OUT_DIR, "EN_REJOIN_CONTINUATIONS_DRY_RUN.md");
  fs.writeFileSync(
    jsonPath,
    JSON.stringify({ summary, examples: exampleRows, allCases }, null, 2) + "\n",
    "utf8"
  );
  writeMd(summary, exampleRows, mdPath);

  console.log(`\n[dry-run-en-rejoin] TOTAL en_has_more=${summary.total}`);
  console.log(
    `[dry-run-en-rejoin] eligible=${eligible} unsafe=${unsafe} skip=${skip}`
  );
  console.log(`[dry-run-en-rejoin] wrote ${jsonPath}`);
  console.log(`[dry-run-en-rejoin] wrote ${mdPath}`);
  console.log(`[dry-run-en-rejoin] ${recommendation}`);
}

main();
