/**
 * EN_TRUNC Wave1 — apply split_en to wave1_strict_ids (24 cases).
 * Inserts <br /> before validated internal markers; EN text unchanged; HE untouched.
 *
 *   node apply_en_trunc_wave1.mjs --dry-run
 *   node apply_en_trunc_wave1.mjs --apply
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
const EVAL = path.join(__dirname, "EN_TRUNC_PACK_ALL_REVIEW_EVAL.json");
const PACK = path.join(__dirname, "EN_TRUNC_PACK.json");

/** Parenthetical note markers — split before marker (Wave2 / eval convention). */
const NOTE_MARKER_RE =
  /\((?:Likut|Collected(?:\s+note)?|Supplement|Anthology|Collection)\)/gi;

/** Sentence-boundary transition heads (after . ! ?). */
const TRANSITION_RE =
  /(?<=[.!?]\s+)(?:There:|Ibid\.|Regarding |In siman |But |However |On the contrary|Through speech\.|And some say|If a child |The same responsum|Also what he wrote|And further |It further |However all |Abridgment of|Under responsibility|Sema\. )|(?<=\n\n)(?:In the head )/g;

const PRIORITY = {
  note_marker: 100,
  bold_open: 80,
  transition: 60,
  num_paren: 40,
};

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

function visuallyEmpty(html) {
  const t = String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return t.length === 0;
}

function findBoldOpens(html) {
  const re = /<b\b[^>]*>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    if (m.index > 0) out.push({ index: m.index, type: "bold_open", text: m[0] });
  }
  return out;
}

function findNoteMarkers(html) {
  const out = [];
  const re = new RegExp(NOTE_MARKER_RE.source, NOTE_MARKER_RE.flags);
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m.index > 0) out.push({ index: m.index, type: "note_marker", text: m[0] });
  }
  // Bare colon forms (Beur HaGra often uses "Likut:" without parens)
  const bare = /(?:^|[.!?]\s+|\n\n+)(Likut|Collection|Collected|Supplement|Anthology):/gi;
  while ((m = bare.exec(html)) !== null) {
    const idx = m.index + m[0].indexOf(m[1]);
    if (idx > 0) out.push({ index: idx, type: "note_marker", text: m[0].trim() });
  }
  return out;
}

function findTransitions(html) {
  const out = [];
  const re = new RegExp(TRANSITION_RE.source, TRANSITION_RE.flags);
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({ index: m.index, type: "transition", text: m[0].trim() });
  }
  return out;
}

/** Numbered note at paragraph start: newline + optional space + (N) */
function findNumParenStarts(html) {
  const out = [];
  const re = /(?:^|\n\n+)\s*(\(\d+\))/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const idx = m.index + m[0].indexOf(m[1]);
    if (idx > 0) out.push({ index: idx, type: "num_paren", text: m[1] });
  }
  return out;
}

function dedupeCandidates(candidates) {
  const byIndex = new Map();
  for (const c of candidates) {
    const existing = byIndex.get(c.index);
    if (!existing || PRIORITY[c.type] > PRIORITY[existing.type]) {
      byIndex.set(c.index, c);
    }
  }
  return [...byIndex.values()].sort((a, b) => a.index - b.index);
}

function findAllCandidates(enRaw) {
  return dedupeCandidates([
    ...findNoteMarkers(enRaw),
    ...findBoldOpens(enRaw),
    ...findTransitions(enRaw),
    ...findNumParenStarts(enRaw),
  ]);
}

function splitAtPositions(enRaw, positions) {
  const sorted = [...positions].sort((a, b) => a - b);
  const parts = [];
  let last = 0;
  for (const pos of sorted) {
    const chunk = enRaw.slice(last, pos).trim();
    if (chunk) parts.push(chunk);
    last = pos;
  }
  const tail = enRaw.slice(last).trim();
  if (tail) parts.push(tail);
  return parts;
}

function insertBrAtPositions(enRaw, positions) {
  const sorted = [...new Set(positions)].sort((a, b) => b - a);
  let out = enRaw;
  for (const pos of sorted) {
    const before = out.slice(0, pos);
    if (/<br\s*\/?>\s*$/i.test(before.replace(/\s+$/, ""))) continue;
    out = before + "<br />\n" + out.slice(pos);
  }
  return out;
}

function* combinations(arr, k, start = 0, acc = []) {
  if (acc.length === k) {
    yield acc.slice();
    return;
  }
  for (let i = start; i <= arr.length - (k - acc.length); i++) {
    acc.push(arr[i]);
    yield* combinations(arr, k, i + 1, acc);
    acc.pop();
  }
}

function comboScore(candidates, comboIndices) {
  let score = 0;
  for (const idx of comboIndices) {
    const c = candidates.find((x) => x.index === idx);
    score += PRIORITY[c?.type] || 0;
  }
  return score;
}

function chooseSplitPlan(enRaw, candidates, heSegs) {
  const needed = heSegs - 1;
  if (needed <= 0) {
    return { tier: "SKIP", reason: "already_matched_or_en_more", splitPlan: [] };
  }
  if (candidates.length < needed) {
    return {
      tier: "HOLD",
      reason: `insufficient_markers found=${candidates.length} need=${needed}`,
      splitPlan: [],
      candidates: candidates.length,
    };
  }

  const indices = candidates.map((c) => c.index);
  let best = null;
  let bestScore = -1;
  let combCount = 0;
  const maxComb = 8000;

  for (const combo of combinations(indices, needed)) {
    combCount++;
    if (combCount > maxComb) break;
    const sorted = [...combo].sort((a, b) => a - b);
    const segs = splitAtPositions(enRaw, sorted);
    if (segs.length !== heSegs) continue;
    if (segs.some((s) => visuallyEmpty(s))) continue;
    const score = comboScore(candidates, sorted);
    if (score > bestScore) {
      bestScore = score;
      best = sorted;
    }
  }

  if (!best) {
    return {
      tier: "HOLD",
      reason: `no_valid_combo candidates=${candidates.length} need=${needed}`,
      splitPlan: [],
    };
  }

  return {
    tier: "APPLY",
    reason:
      candidates.length === needed
        ? "exact_marker_count"
        : combCount > maxComb
          ? "greedy_best_priority"
          : "best_priority_combo",
    splitPlan: best.map((idx) => {
      const c = candidates.find((x) => x.index === idx);
      return { index: idx, type: c?.type, text: c?.text };
    }),
  };
}

function planAndVerify(enRaw, heSegs) {
  const candidates = findAllCandidates(enRaw);
  const plan = chooseSplitPlan(enRaw, candidates, heSegs);
  if (plan.tier !== "APPLY") return { ...plan, candidates: candidates.length };

  const positions = plan.splitPlan.map((s) => s.index);
  const afterRaw = insertBrAtPositions(enRaw, positions);
  const afterSegs = splitHtmlByBrSegments(afterRaw);

  if (afterSegs.length !== heSegs) {
    return {
      tier: "HOLD",
      reason: `post_plan_count_mismatch enAfter=${afterSegs.length} heSegs=${heSegs}`,
      splitPlan: plan.splitPlan,
      candidates: candidates.length,
    };
  }
  if (afterSegs.some((s) => visuallyEmpty(s))) {
    return {
      tier: "HOLD",
      reason: "empty_segment_after_split",
      splitPlan: plan.splitPlan,
      candidates: candidates.length,
    };
  }

  return {
    tier: "APPLY",
    reason: plan.reason,
    splitPlan: plan.splitPlan,
    afterRaw,
    afterSegs,
    candidates: candidates.length,
  };
}

function writeAuditMd(summary) {
  const mdPath = path.join(__dirname, "EN_TRUNC_WAVE1_APPLY.md");
  const lines = [
    "# EN_TRUNC Wave 1 — split_en APPLY audit",
    "",
    `**Date:** ${summary.scannedAt}`,
    `**Mode:** ${summary.mode}`,
    `**Strict tier:** ${summary.strictCount} ids from \`wave1_strict_ids\``,
    `**Prior live en_trunc:** ${summary.priorLiveEnTrunc ?? "215"}`,
    "",
    "## Summary",
    "",
    "| Tier | Count |",
    "|------|-------|",
    `| Applied | ${summary.counts.applied} |`,
    `| Skipped (already matched) | ${summary.counts.skipped} |`,
    `| Held | ${summary.counts.held} |`,
    `| Failed | ${summary.counts.failed} |`,
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
        .map((s) => `@${s.index} ${s.type} "${(s.text || "").slice(0, 40)}"`)
        .join("; ");
      lines.push(
        `- \`${a.id}\` — en ${a.enSegsBefore}→${a.enSegsAfter} (=he ${a.heSegs}); ${markers}`
      );
    }
  }
  lines.push("", "## Skipped", "");
  if (summary.skipped.length === 0) lines.push("_None._");
  else {
    for (const s of summary.skipped) {
      lines.push(`- \`${s.id}\` — **${s.reason}** (he=${s.heSegs} en=${s.enSegs})`);
    }
  }
  lines.push("", "## Held", "");
  if (summary.held.length === 0) lines.push("_None._");
  else {
    for (const h of summary.held) {
      lines.push(
        `- \`${h.id}\` — **${h.reason}** (he=${h.heSegs} en=${h.enSegsBefore} candidates=${h.candidates ?? "?"})`
      );
    }
  }
  if (summary.failed.length) {
    lines.push("", "## Failed", "");
    for (const f of summary.failed) {
      lines.push(`- \`${f.id}\` — ${f.reason}`);
    }
  }
  if (summary.postRescan) {
    lines.push(
      "",
      "## Post-apply rescan",
      "",
      `Live en_truncated_vs_multi_he: **${summary.postRescan.en_trunc}** (was ${summary.priorLiveEnTrunc})`
    );
  }
  fs.writeFileSync(mdPath, lines.join("\n") + "\n", "utf8");
  console.log(`[audit] ${mdPath}`);
}

function quickEnTruncCount(corpusRoot) {
  let count = 0;
  for (const vol of ["oc1", "yd1", "cm1"]) {
    const volRoot = path.join(corpusRoot, vol);
    if (!fs.existsSync(volRoot)) continue;
    for (const siman of fs.readdirSync(volRoot)) {
      const simanDir = path.join(volRoot, siman);
      if (!fs.statSync(simanDir).isDirectory()) continue;
      for (const seif of fs.readdirSync(simanDir)) {
        const seifDir = path.join(simanDir, seif);
        if (!fs.statSync(seifDir).isDirectory()) continue;
        for (const slug of fs.readdirSync(seifDir)) {
          const slugDir = path.join(seifDir, slug);
          if (!fs.statSync(slugDir).isDirectory()) continue;
          const he = readText(path.join(slugDir, "he.html"));
          const en = readText(path.join(slugDir, "en.html"));
          if (!he || !en) continue;
          const heN = splitHtmlByBrSegments(he).length;
          const enN = splitHtmlByBrSegments(en).length;
          if (enN === 1 && heN > 1) count++;
        }
      }
    }
  }
  return count;
}

function main() {
  const opts = { apply: process.argv.includes("--apply") };
  const evalDoc = JSON.parse(fs.readFileSync(EVAL, "utf8"));
  const pack = JSON.parse(fs.readFileSync(PACK, "utf8"));
  const packById = new Map(pack.cases.map((c) => [c.id, c]));
  const strictIds = evalDoc.wave1_strict_ids || [];

  if (strictIds.length !== 24) {
    console.warn(`Expected 24 wave1_strict_ids, got ${strictIds.length}`);
  }

  const applied = [];
  const held = [];
  const failed = [];
  const skipped = [];

  console.log(
    `[en-trunc-wave1] mode=${opts.apply ? "APPLY" : "DRY-RUN"} strict=${strictIds.length}`
  );
  console.log("\n=== CLASSIFY / APPLY ===\n");

  for (const id of strictIds) {
    const packCase = packById.get(id);
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const heRaw = readText(hePath);
    const enRaw = readText(enPath);

    if (heRaw == null || enRaw == null) {
      failed.push({ id, reason: "missing_file" });
      console.log(`FAIL ${id}: missing corpus file`);
      continue;
    }

    const heSegsLive = splitHtmlByBrSegments(heRaw).length;
    const enSegsLive = splitHtmlByBrSegments(enRaw).length;
    const heSegs = packCase?.heSegs ?? heSegsLive;

    if (heSegsLive === enSegsLive) {
      skipped.push({
        id,
        reason: "already_matched",
        heSegs: heSegsLive,
        enSegs: enSegsLive,
      });
      console.log(`SKIP ${id}: already heSegs=enSegs=${heSegsLive}`);
      continue;
    }

    if (enSegsLive !== 1) {
      skipped.push({
        id,
        reason: `enSegs=${enSegsLive}_not_single_blob`,
        heSegs: heSegsLive,
        enSegs: enSegsLive,
      });
      console.log(`SKIP ${id}: enSegs=${enSegsLive} (not en_trunc glue)`);
      continue;
    }

    const plan = planAndVerify(enRaw, heSegs);
    const row = {
      id,
      heSegs,
      enSegsBefore: enSegsLive,
      enSegsAfter: plan.afterSegs?.length ?? enSegsLive,
      tier: plan.tier,
      reason: plan.reason,
      splitPlan: plan.splitPlan,
      candidates: plan.candidates,
    };

    if (plan.tier === "APPLY") {
      console.log(
        `APPLY ${id}: en ${enSegsLive}→${plan.afterSegs.length} (=he ${heSegs}) splits=${plan.splitPlan.length} [${plan.reason}]`
      );
      for (const sp of plan.splitPlan) {
        console.log(`  @${sp.index} ${sp.type} "${(sp.text || "").slice(0, 50)}"`);
      }
      if (opts.apply) {
        const out = plan.afterRaw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        fs.writeFileSync(enPath, out.endsWith("\n") ? out : out + "\n", "utf8");
      }
      applied.push({ ...row, enSegsAfter: plan.afterSegs.length, applied: opts.apply });
    } else if (plan.tier === "HOLD") {
      held.push(row);
      console.log(
        `HOLD ${id}: ${plan.reason} (he=${heSegs} en=${enSegsLive} candidates=${plan.candidates})`
      );
    } else {
      skipped.push(row);
    }
  }

  let postRescan = null;
  if (opts.apply && applied.length > 0) {
    postRescan = { en_trunc: quickEnTruncCount(CORPUS_ROOT) };
  }

  const summary = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    corpusRoot: CORPUS_ROOT,
    wave: "EN_TRUNC_WAVE1_SPLIT_EN",
    strictCount: strictIds.length,
    strictIds,
    priorLiveEnTrunc: evalDoc.meta?.recommendation?.live_en_trunc_count ?? 215,
    splitRule:
      "Insert <br /> before internal (Likut|Collection|Collected|Supplement), <b> lemma, or transition (There:/Regarding/Ibid./Through speech./etc.); EN text unchanged; HE untouched; conservative hold if marker count ≠ heSegs−1",
    counts: {
      total: strictIds.length,
      applied: applied.length,
      held: held.length,
      failed: failed.length,
      skipped: skipped.length,
    },
    applied,
    held,
    failed,
    skipped,
    postRescan,
  };

  const outJson = path.join(__dirname, "en_trunc_wave1_apply_log.json");
  fs.writeFileSync(outJson, JSON.stringify(summary, null, 2) + "\n", "utf8");
  console.log(
    `\n[summary] applied=${applied.length} skipped=${skipped.length} held=${held.length} failed=${failed.length}`
  );
  writeAuditMd(summary);
}

main();
