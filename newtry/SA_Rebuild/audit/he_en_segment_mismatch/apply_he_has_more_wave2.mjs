/**
 * HE_HAS_MORE Wave2: apply split_en cases from ChatGPT review.
 * Splits EN at validated internal markers only; HE untouched.
 *
 *   node apply_he_has_more_wave2.mjs --dry-run
 *   node apply_he_has_more_wave2.mjs --apply
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../../..");
const CORPUS_ROOT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const REVIEW = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW.json");
const EVAL = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json");
const PACK = path.join(__dirname, "HE_HAS_MORE_PACK.json");

/** Strong EN split heads — must match visible marker in segment text. */
const MARKER_RE =
  /\((?:Likut|Collected(?:\s+note)?|Supplement|ליקוט)\)/gi;

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

function joinSegments(segs) {
  return segs.join("<br />\n") + (segs.length ? "\n" : "");
}

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

function findInternalMarkers(seg) {
  const markers = [];
  const re = new RegExp(MARKER_RE.source, MARKER_RE.flags);
  let m;
  while ((m = re.exec(seg)) !== null) {
    if (m.index > 0) markers.push({ index: m.index, text: m[0] });
  }
  return markers;
}

function enHasSplitCue(seg) {
  const cues = [];
  if (/Likut|ליקוט|ליקוטי/i.test(seg)) cues.push("likut");
  if (/Collected/i.test(seg)) cues.push("collected");
  if (/Supplement/i.test(seg)) cues.push("supplement");
  return cues;
}

function splitSegmentAtMarkers(seg, markerPositions) {
  const sorted = [...markerPositions].sort((a, b) => a - b);
  const parts = [];
  let last = 0;
  for (const pos of sorted) {
    const chunk = seg.slice(last, pos).trim();
    if (chunk) parts.push(chunk);
    last = pos;
  }
  const tail = seg.slice(last).trim();
  if (tail) parts.push(tail);
  return parts.length ? parts : [seg];
}

function planSplits(hints, heSegs, enSegs, enSegments) {
  const deficit = heSegs - enSegs;
  if (deficit <= 0) {
    return { tier: "SKIP", reason: "already_matched_or_en_more", enAfter: enSegs };
  }
  if (!Array.isArray(hints) || hints.length === 0) {
    return { tier: "HOLD", reason: "missing_split_hints", enAfter: enSegs };
  }

  const hintedIndices = new Set(hints.map((h) => h.en_index));
  const markersBySeg = new Map();
  for (const idx of hintedIndices) {
    if (idx < 0 || idx >= enSegments.length) {
      return { tier: "HOLD", reason: `en_index_oob:${idx}`, enAfter: enSegs };
    }
    const seg = enSegments[idx];
    const internal = findInternalMarkers(seg);
    if (internal.length === 0) {
      return {
        tier: "HOLD",
        reason: `no_internal_marker_at_en[${idx}]`,
        enAfter: enSegs,
        segPreview: seg.slice(0, 120),
        cues: enHasSplitCue(seg),
      };
    }
    markersBySeg.set(idx, internal);
  }

  const splitPlan = [];
  for (const [segIdx, markers] of markersBySeg) {
    for (const mk of markers) {
      splitPlan.push({
        segIndex: segIdx,
        markerText: mk.text,
        markerPos: mk.index,
      });
    }
  }

  const enAfter = enSegs + splitPlan.length;
  if (enAfter > heSegs) {
    return {
      tier: "HOLD",
      reason: `too_many_markers enAfter=${enAfter}>heSegs=${heSegs}`,
      enAfter,
      splitPlan,
    };
  }
  if (enAfter < heSegs) {
    return {
      tier: "HOLD",
      reason: `insufficient_markers enAfter=${enAfter}<heSegs=${heSegs} deficit=${deficit} hints=${hints.length}`,
      enAfter,
      splitPlan,
      soft: "SPLIT_MAY_NEED_MULTI_PIECE",
    };
  }

  const weak = splitPlan.filter((s) => {
    const seg = enSegments[s.segIndex];
    const cues = enHasSplitCue(seg);
    return !cues.some((c) =>
      ["likut", "collected", "supplement"].includes(c)
    );
  });
  if (weak.length > 0) {
    return {
      tier: "HOLD",
      reason: `weak_marker_cues count=${weak.length}`,
      enAfter,
      splitPlan,
    };
  }

  return {
    tier: "APPLY",
    reason: "clear_markers_exact_count",
    enAfter,
    splitPlan,
  };
}

function applySplitPlan(enSegments, splitPlan) {
  const bySeg = new Map();
  for (const sp of splitPlan) {
    if (!bySeg.has(sp.segIndex)) bySeg.set(sp.segIndex, []);
    bySeg.get(sp.segIndex).push(sp.markerPos);
  }
  const result = [...enSegments];
  for (const segIdx of [...bySeg.keys()].sort((a, b) => b - a)) {
    const parts = splitSegmentAtMarkers(result[segIdx], bySeg.get(segIdx));
    result.splice(segIdx, 1, ...parts);
  }
  return result;
}

function writeAuditMd(summary) {
  const mdPath = path.join(__dirname, "HE_HAS_MORE_WAVE2_SPLIT_EN_APPLY.md");
  const lines = [
    "# HE_HAS_MORE Wave 2 — split_en APPLY audit",
    "",
    `**Date:** ${summary.scannedAt}`,
    `**Mode:** ${summary.mode}`,
    `**Prior eval:** commit \`45d28aa325\` — 56 split_en (41 clear markers; 15 weak/no marker)`,
    `**Wave1 done:** \`07b4315ea5\` (62 merges)`,
    "",
    "## Summary",
    "",
    "| Tier | Count |",
    "|------|-------|",
    `| Applied | ${summary.counts.applied} |`,
    `| Held | ${summary.counts.held} |`,
    `| Failed | ${summary.counts.failed} |`,
    `| Skipped (already matched) | ${summary.counts.skipped} |`,
    "",
    "## Split rule",
    "",
    summary.splitRule,
    "",
    "## Applied",
    "",
  ];
  if (summary.applied.length === 0) lines.push("_None._");
  else {
    for (const a of summary.applied) {
      const markers = (a.splitPlan || [])
        .map((s) => `en[${s.segIndex}] ${s.markerText}`)
        .join("; ");
      lines.push(
        `- \`${a.id}\` — en ${a.enSegsBefore}→${a.enSegsAfter} (=he ${a.heSegs}); ${markers}`
      );
    }
  }
  lines.push("", "## Held", "");
  if (summary.held.length === 0) lines.push("_None._");
  else {
    for (const h of summary.held) {
      lines.push(
        `- \`${h.id}\` — **${h.reason}** (he=${h.heSegs} en=${h.enSegsBefore} deficit=${h.deficit} hints=${JSON.stringify(h.hints)}${h.soft?.length ? ` soft=${h.soft.join(",")}` : ""})`
      );
    }
  }
  if (summary.failed.length) {
    lines.push("", "## Failed", "");
    for (const f of summary.failed) lines.push(`- \`${f.id}\` — ${f.reason}`);
  }
  lines.push(
    "",
    "## Affected simanim (yd1)",
    "",
    summary.affectedSimanim.yd1.map((s) => `- ${s}`).join("\n") || "_None_",
    ""
  );
  fs.writeFileSync(mdPath, lines.join("\n") + "\n", "utf8");
  console.log(`[audit] ${mdPath}`);
}

function main() {
  const opts = { apply: process.argv.includes("--apply") };
  const review = JSON.parse(fs.readFileSync(REVIEW, "utf8"));
  const evalDoc = JSON.parse(fs.readFileSync(EVAL, "utf8"));
  const pack = JSON.parse(fs.readFileSync(PACK, "utf8"));
  const packById = new Map(pack.cases.map((c) => [c.id, c]));
  const evalById = new Map(evalDoc.results.map((r) => [r.id, r]));

  const splitCases = review.filter((r) => r.action === "split_en");
  if (splitCases.length !== 56) {
    console.error(`Expected 56 split_en cases, got ${splitCases.length}`);
    process.exit(1);
  }

  const applied = [];
  const held = [];
  const failed = [];
  const skipped = [];
  const affected = { yd1: new Set() };

  console.log(
    `[he-has-more-wave2] mode=${opts.apply ? "APPLY" : "DRY-RUN"} cases=${splitCases.length}`
  );
  console.log("\n=== DRY-RUN / CLASSIFY ===\n");

  for (const r of splitCases) {
    const id = r.id;
    const ev = evalById.get(id);
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const heRaw = readText(hePath);
    const enRaw = readText(enPath);
    if (heRaw == null || enRaw == null) {
      failed.push({ id, reason: "missing_file" });
      console.log(`FAIL ${id}: missing corpus file`);
      continue;
    }

    const heSegsLive = splitHtmlByBrSegments(heRaw);
    const enSegsLive = splitHtmlByBrSegments(enRaw);
    const heSegs = heSegsLive.length;
    const enSegs = enSegsLive.length;

    if (heSegs === enSegs) {
      skipped.push({ id, reason: "already_matched", heSegs, enSegs });
      console.log(`SKIP ${id}: already heSegs=enSegs=${heSegs}`);
      continue;
    }

    const plan = planSplits(r.split_hints, heSegs, enSegs, enSegsLive);
    const row = {
      id,
      heSegs,
      enSegsBefore: enSegs,
      enSegsAfter: plan.enAfter,
      deficit: heSegs - enSegs,
      hints: (r.split_hints || []).map((h) => h.en_index),
      tier: plan.tier,
      reason: plan.reason,
      splitPlan: plan.splitPlan,
      soft: ev?.soft || [],
      notes: r.notes,
    };

    if (plan.tier === "APPLY") {
      const afterSegs = applySplitPlan(enSegsLive, plan.splitPlan);
      if (afterSegs.length !== heSegs) {
        failed.push({ ...row, reason: "post_apply_count_mismatch" });
        console.log(
          `FAIL ${id}: post-apply enSegs=${afterSegs.length} !== heSegs=${heSegs}`
        );
        continue;
      }
      const markers = plan.splitPlan.map(
        (s) => `en[${s.segIndex}]@${s.markerPos}="${s.markerText}"`
      );
      console.log(
        `APPLY ${id}: en ${enSegs}→${afterSegs.length} (=he ${heSegs}) splits=${plan.splitPlan.length}`
      );
      console.log(`  markers: ${markers.join("; ")}`);
      if (opts.apply) fs.writeFileSync(enPath, joinSegments(afterSegs), "utf8");
      const [vol, siman] = id.split("/");
      if (affected[vol]) affected[vol].add(siman);
      applied.push({ ...row, applied: opts.apply });
    } else if (plan.tier === "HOLD") {
      held.push(row);
      console.log(
        `HOLD ${id}: ${plan.reason} (he=${heSegs} en=${enSegs} enAfter=${plan.enAfter})`
      );
    } else {
      skipped.push(row);
    }
  }

  const summary = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    corpusRoot: CORPUS_ROOT,
    wave: "HE_HAS_MORE_WAVE2_SPLIT_EN",
    splitRule:
      "Insert <br /> before internal (Likut)|(Collected)|(Supplement) markers; EN text unchanged; HE untouched",
    counts: {
      total: splitCases.length,
      applied: applied.length,
      held: held.length,
      failed: failed.length,
      skipped: skipped.length,
    },
    affectedSimanim: {
      yd1: [...affected.yd1].sort(
        (a, b) =>
          parseInt(a.replace(/\D/g, ""), 10) -
          parseInt(b.replace(/\D/g, ""), 10)
      ),
    },
    applied,
    held,
    failed,
    skipped,
  };

  const outJson = path.join(__dirname, "he_has_more_wave2_apply_log.json");
  fs.writeFileSync(outJson, JSON.stringify(summary, null, 2) + "\n", "utf8");
  console.log(
    `\n[summary] applied=${applied.length} held=${held.length} failed=${failed.length} skipped=${skipped.length}`
  );
  writeAuditMd(summary);
}

main();
