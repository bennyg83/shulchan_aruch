import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REVIEW =
  process.env.REVIEW ||
  path.join(__dirname, "EN_TRUNC_PACK_ALL_REVIEW.json");
const PACK = path.join(__dirname, "EN_TRUNC_PACK.json");
const OUT_JSON = path.join(__dirname, "EN_TRUNC_PACK_ALL_REVIEW_EVAL.json");
const OUT_MD = path.join(__dirname, "EN_TRUNC_PACK_ALL_REVIEW_EVAL.md");
const BOLD_LOG = path.join(__dirname, "en_bold_split_apply_log.json");
const CORPUS = path.join(
  path.resolve(__dirname, "../../../.."),
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const review = JSON.parse(fs.readFileSync(REVIEW, "utf8"));
const pack = JSON.parse(fs.readFileSync(PACK, "utf8"));
const byId = new Map(pack.cases.map((c) => [c.id, c]));
const packIds = pack.cases.map((c) => c.id);

const ALLOWED = new Set([
  "split_en",
  "needs_editorial",
  "needs_human",
  "skip",
]);

function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function preview(s, n = 90) {
  const t = stripHtml(s);
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function validateSplitEn(r, heSegs, enSegs) {
  const errs = [];
  if (enSegs !== 1) errs.push(`enSegs=${enSegs}!=1`);
  if (!Number.isInteger(r.proposed_split_count))
    errs.push("proposed_split_count_not_int");
  else if (r.proposed_split_count !== heSegs)
    errs.push(`split_count=${r.proposed_split_count}!=heSegs=${heSegs}`);
  if (!r.split_plan || typeof r.split_plan !== "string" || !r.split_plan.trim())
    errs.push("split_plan_missing");
  else if (/^Split the existing EN/i.test(r.split_plan) && r.split_plan.length < 120)
    errs.push("GENERIC_SPLIT_PLAN");
  return errs;
}

function enHasSplitCue(en, heSegs = 2) {
  const t = en || "";
  const cues = [];
  if (/<b>|<\/b>/.test(t)) cues.push("bold_tag");
  if (/\*\*/.test(t)) cues.push("md_bold");
  if (/Likut|Collected|Supplement|Anthology|Collection/i.test(t)) cues.push("note_marker");
  if (/\(\d+\)/.test(t)) cues.push("num_paren");
  if (/^There:|^Ibid\.|^Regarding |^In siman |^But |^However |^On the contrary/i.test(t))
    cues.push("lemma_open");
  const caps = t.match(/(?<=[.!?]\s+)(?:There:|Ibid\.|Regarding |In siman |But |However )/g);
  if (caps && caps.length >= 1) cues.push(`transitions:${caps.length}`);
  const sentCaps = t.match(/(?<=[.!?]\s+)[A-Z][a-z]/g);
  if (sentCaps && sentCaps.length >= heSegs - 1) cues.push(`sent_caps:${sentCaps.length}`);
  return cues;
}

function heLemmaOpen(heSeg) {
  const t = stripHtml(heSeg);
  const m = t.match(/^\(([^)]+)\)/);
  return m ? m[1] : null;
}

function enFindLemmaInText(en, lemma) {
  if (!lemma) return false;
  const plain = stripHtml(en).toLowerCase();
  const parts = lemma
    .replace(/["']/g, "")
    .split(/[.:,]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 4);
  return parts.some((p) => plain.includes(p.toLowerCase().slice(0, Math.min(p.length, 20))));
}

function estimateEnCoverage(c) {
  const enPlain = stripHtml(c.en_segments[0] || "");
  const hePlain = c.he_segments.map(stripHtml).join(" ");
  const ratio = enPlain.length / Math.max(hePlain.length, 1);
  const heWords = hePlain.split(/\s+/).length;
  const enWords = enPlain.split(/\s+/).length;
  return { ratio, heWords, enWords, enLen: enPlain.length, heLen: hePlain.length };
}

function classifySemantic(c, r, structErrs) {
  if (r.action !== "split_en") {
    if (r.action === "needs_editorial" || r.action === "needs_human" || r.action === "skip")
      return { cls: "hold", wave1: false, reason: r.action };
    return { cls: "reject", wave1: false, reason: "bad_action" };
  }
  if (structErrs.length) return { cls: "reject", wave1: false, reason: structErrs[0] };

  const en = c.en_segments[0] || "";
  const heSegs = c.heSegs;
  const cues = enHasSplitCue(en, heSegs);
  const cov = estimateEnCoverage(c);

  // Check HE lemma alignment for multi-seg
  const lemmaHits = [];
  for (let i = 1; i < heSegs; i++) {
    const lemma = heLemmaOpen(c.he_segments[i]);
    lemmaHits.push({ seg: i, lemma, found: enFindLemmaInText(en, lemma) });
  }
  const lemmaFound = lemmaHits.filter((h) => h.found).length;

  const flags = [];
  if (cov.ratio < 0.55) flags.push("LOW_EN_COVERAGE");
  if (cov.ratio < 0.85 && heSegs >= 3) flags.push("POSSIBLY_TRUNCATED_EN");
  if (cues.length === 0 && lemmaFound === 0) flags.push("NO_VISIBLE_CUES");
  if (structErrs.includes("GENERIC_SPLIT_PLAN")) flags.push("GENERIC_PLAN");

  // Wave1 criteria (conservative, like HE_HAS_MORE):
  // - structural OK
  // - EN appears complete enough (ratio >= 0.7 OR clear cues)
  // - at least one delimiter signal OR lemma transition found
  const hasDelimiters = cues.length > 0 || lemmaFound >= Math.max(1, heSegs - 2);
  const enCompleteEnough = cov.ratio >= 0.7 || hasDelimiters;

  if (!enCompleteEnough && cov.ratio < 0.55)
    return {
      cls: "hold",
      wave1: false,
      reason: "likely_truncated_not_splittable",
      cues,
      cov,
      lemmaHits,
      flags,
    };
  if (flags.includes("NO_VISIBLE_CUES") && heSegs >= 4)
    return {
      cls: "hold",
      wave1: false,
      reason: "weak_cues_multi_split",
      cues,
      cov,
      lemmaHits,
      flags,
    };
  if (flags.includes("GENERIC_PLAN") && !hasDelimiters)
    return {
      cls: "hold",
      wave1: false,
      reason: "generic_plan_no_cues",
      cues,
      cov,
      lemmaHits,
      flags,
    };
  if (hasDelimiters && enCompleteEnough)
    return {
      cls: "apply_ready",
      wave1: true,
      reason: "clear_delimiters",
      cues,
      cov,
      lemmaHits,
      flags,
    };
  if (heSegs === 2 && cov.ratio >= 0.75)
    return {
      cls: "apply_ready",
      wave1: true,
      reason: "binary_split_plausible",
      cues,
      cov,
      lemmaHits,
      flags,
    };
  return {
    cls: "hold",
    wave1: false,
    reason: "spot_review",
    cues,
    cov,
    lemmaHits,
    flags,
  };
}

// Bold split overlap (from apply log backups paths)
const boldAppliedIds = new Set([
  "oc1/siman132/seif-002/magen-avraham",
  "oc1/siman175/seif-001/magen-avraham",
]);
if (fs.existsSync(BOLD_LOG)) {
  const bl = JSON.parse(fs.readFileSync(BOLD_LOG, "utf8"));
  for (const rep of bl.reports || []) {
    for (const row of rep.backups || []) {
      const p = row.path || "";
      const m = p.match(/^(oc1|yd1|cm1)\/siman(\d+)\/seif-(\d+)\/([^/]+)\//);
      if (m) {
        boldAppliedIds.add(
          `${m[1]}/siman${parseInt(m[2], 10)}/seif-${String(parseInt(m[3], 10)).padStart(3, "0")}/${m[4]}`
        );
      }
    }
  }
}

const results = [];
const summary = {
  n: review.length,
  pack_n: pack.cases.length,
  id_order_match: true,
  missing_from_review: [],
  extra_ids: [],
  duplicate_ids: [],
  actions: {},
  by_volume: {},
  classify: { apply_ready: 0, hold: 0, reject: 0 },
  wave1: { apply_ready: 0, hold: 0, reject: 0 },
  structural: { split_checked: 0, split_pass: 0, split_fail: 0 },
  soft_flags: {},
  bold_overlap: 0,
  generic_plan_count: 0,
};

const seenIds = new Set();
for (let i = 0; i < review.length; i++) {
  const r = review[i];
  const flags = [];
  if (seenIds.has(r.id)) summary.duplicate_ids.push(r.id);
  seenIds.add(r.id);
  if (packIds[i] !== r.id) summary.id_order_match = false;
  const c = byId.get(r.id);
  if (!c) flags.push("ID_NOT_IN_PACK");

  const action = r.action;
  summary.actions[action] = (summary.actions[action] || 0) + 1;
  const vol = r.id.split("/")[0];
  summary.by_volume[vol] = (summary.by_volume[vol] || 0) + 1;

  const heSegs = c?.heSegs;
  const enSegs = c?.enSegs;
  let structErrs = [];

  if (action === "split_en") {
    summary.structural.split_checked++;
    structErrs = validateSplitEn(r, heSegs, enSegs);
    if (structErrs.length) summary.structural.split_fail++;
    else summary.structural.split_pass++;
    if (structErrs.includes("GENERIC_SPLIT_PLAN"))
      summary.generic_plan_count++;
  } else if (!ALLOWED.has(action)) {
    flags.push(`BAD_ACTION:${action}`);
  }

  const sem = classifySemantic(c, r, structErrs);
  let cls = sem.cls;
  if (flags.some((f) => f.startsWith("BAD_ACTION") || f === "ID_NOT_IN_PACK")) cls = "reject";

  summary.classify[cls]++;
  if (sem.wave1) summary.wave1.apply_ready++;
  else if (cls === "hold") summary.wave1.hold++;
  else summary.wave1.reject++;

  for (const f of sem.flags || []) {
    summary.soft_flags[f] = (summary.soft_flags[f] || 0) + 1;
  }

  const boldOverlap = boldAppliedIds.has(r.id);
  if (boldOverlap) summary.bold_overlap++;

  results.push({
    id: r.id,
    action,
    volume: vol,
    slug: c?.slug,
    heSegs,
    enSegs,
    proposed_split_count: r.proposed_split_count,
    classify: cls,
    wave1: sem.wave1,
    wave1_reason: sem.reason,
    structErrs,
    flags,
    soft: sem.flags || [],
    cues: sem.cues,
    coverage: sem.cov,
    lemmaHits: sem.lemmaHits,
    bold_already_applied: boldOverlap,
    notes: r.notes,
    split_plan: r.split_plan,
  });
}

for (const id of packIds) {
  if (!seenIds.has(id)) summary.missing_from_review.push(id);
}
summary.extra_ids = [...seenIds].filter((id) => !byId.has(id));

const applyReady = results.filter((r) => r.wave1);
const hold = results.filter((r) => r.classify === "hold");
const rejects = results.filter((r) => r.classify === "reject");

// Spot sample: diverse + failures + high split counts
function pickSpot(n = 20) {
  const ids = new Set();
  const buckets = new Map();
  for (const r of results) {
    const k = `${r.volume}|${r.slug}|${r.action}|${r.wave1}`;
    if (!buckets.has(k)) buckets.set(k, r.id);
  }
  for (const id of buckets.values()) ids.add(id);
  for (const r of applyReady.slice(0, 8)) ids.add(r.id);
  for (const r of hold.filter((x) => x.action === "split_en").slice(0, 5)) ids.add(r.id);
  for (const r of rejects.slice(0, 3)) ids.add(r.id);
  for (const r of results.filter((x) => x.heSegs >= 4 && x.action === "split_en").slice(0, 4))
    ids.add(r.id);
  return [...ids].slice(0, n).map((id) => {
    const r = results.find((x) => x.id === id);
    const c = byId.get(id);
    return {
      id,
      action: r.action,
      heSegs: r.heSegs,
      classify: r.classify,
      wave1: r.wave1,
      wave1_reason: r.wave1_reason,
      cues: r.cues,
      coverage_ratio: r.coverage?.ratio?.toFixed(2),
      notes: r.notes,
      en_preview: preview(c?.en_segments?.[0], 120),
      he0: preview(c?.he_segments?.[0], 80),
      he1: r.heSegs > 1 ? preview(c?.he_segments?.[1], 80) : null,
    };
  });
}

const spot = pickSpot(20);

const meta = {
  created: new Date().toISOString(),
  review: REVIEW,
  pack: PACK,
  purpose: "structural + semantic classify eval — NOT applied to corpus",
  gpt_was_dry_run: true,
  note: "ChatGPT review is advisory only; no EN_TRUNC corpus edits from this review yet",
  schema_keys: ["id", "action", "proposed_split_count", "split_plan", "notes"],
  classify_rules:
    "split_en: proposed_split_count===heSegs + non-empty split_plan; needs_editorial/human/skip=>hold; wave1 requires delimiter cues or strong 2-way coverage",
  recommendation: {
    do_not_blanket_apply: true,
    verdict: "spot_review_first",
    wave1_apply_ready: applyReady.length,
    wave1_criteria:
      "structural pass + EN coverage ratio>=0.7 (or clear bold/lemma/note markers) + visible split delimiters; conservative hold on generic GPT plans without cues",
    hold: hold.length,
    reject: rejects.length,
    bold_overlap_note:
      "Prior bold-lemma auto-split applied 4 corpus cells (2 strict + 2 relax); minimal overlap with EN_TRUNC pack",
  },
};

const evalDoc = { meta, summary, apply_ready_ids: applyReady.map((r) => r.id), hold_ids: hold.map((r) => r.id), rejects, spot, results };
fs.writeFileSync(OUT_JSON, JSON.stringify(evalDoc, null, 2));

// MD report
const md = `# EN_TRUNC_PACK ChatGPT review — evaluation

**Created:** ${meta.created}  
**Review:** \`${REVIEW}\`  
**Pack:** \`EN_TRUNC_PACK.json\` (215 cases)  
**Corpus:** \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/\`  
**Status:** GPT feedback was **dry-run / advisory only** — no EN_TRUNC review apply to corpus yet.

## Counts

| Metric | Count |
|--------|------:|
| Review cases | ${summary.n} |
| Pack cases | ${summary.pack_n} |
| ID coverage | ${summary.missing_from_review.length === 0 && summary.extra_ids.length === 0 ? "100%" : "MISMATCH"} |
| \`split_en\` | ${summary.actions.split_en || 0} |
| \`needs_editorial\` | ${summary.actions.needs_editorial || 0} |
| \`needs_human\` | ${summary.actions.needs_human || 0} |
| \`skip\` | ${summary.actions.skip || 0} |

## Classification (conservative)

| Tier | Count |
|------|------:|
| **Wave1 apply-ready** | ${applyReady.length} |
| Hold | ${hold.length} |
| Reject (structural) | ${rejects.length} |

## Wave1 criteria

${meta.recommendation.wave1_criteria}

## Structural validation

| Check | Pass | Fail |
|-------|-----:|-----:|
| split_en (\`proposed_split_count === heSegs\`) | ${summary.structural.split_pass} | ${summary.structural.split_fail} |
| Generic GPT split_plan (boilerplate) | — | ${summary.generic_plan_count} |

## Overlap with prior bold-lemma splits

Prior \`split_en_on_bold_lemmas.mjs\` applied **4** cells (oc1 magen-avraham 132:2, 175:1 + relax). Overlap with EN_TRUNC pack review ids: **${summary.bold_overlap}**. Re-applying bold split would not duplicate pack fixes; EN_TRUNC GPT splits are a separate lane.

## Soft flags (split_en)

${Object.entries(summary.soft_flags)
  .map(([k, v]) => `- \`${k}\`: ${v}`)
  .join("\n") || "(none)"}

## Recommendation

**${meta.recommendation.verdict.replace(/_/g, " ")}** — do not blanket-apply ${summary.actions.split_en || 0} GPT \`split_en\` proposals. GPT returned generic split plans without concrete cut indices; Wave1 subset (${applyReady.length}) needs tooling like HE_HAS_MORE Wave2 (marker-based \`<br />\` insert) after spot-check.

## Sample spot-checks (${spot.length})

${spot
  .map(
    (s) =>
      `- \`${s.id}\` — ${s.action} he=${s.heSegs} **${s.wave1 ? "wave1" : s.classify}** (${s.wave1_reason}) cues=[${(s.cues || []).join(",")}] cov=${s.coverage_ratio}`
  )
  .join("\n")}

## Sample fails / holds

${hold
  .filter((r) => r.action === "split_en")
  .slice(0, 8)
  .map(
    (r) =>
      `- \`${r.id}\` — ${r.wave1_reason} he=${r.heSegs} cov=${r.coverage?.ratio?.toFixed(2)} cues=[${(r.cues || []).join(",")}]`
  )
  .join("\n") || "(none)"}

---
Full machine eval: \`EN_TRUNC_PACK_ALL_REVIEW_EVAL.json\`
`;

fs.writeFileSync(OUT_MD, md);

console.log(JSON.stringify({ summary, wave1: applyReady.length, hold: hold.length, reject: rejects.length, generic_plan: summary.generic_plan_count, bold_overlap: summary.bold_overlap }, null, 2));
console.log("Wrote", OUT_JSON);
console.log("Wrote", OUT_MD);
