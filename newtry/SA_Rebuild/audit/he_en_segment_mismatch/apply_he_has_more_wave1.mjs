/**
 * HE_HAS_MORE Wave1: apply 62 non-Likut merge_groups (strict_merge_ids).
 * Joins HE segments within each group with spaces; groups joined with <br />.
 * EN untouched. Verifies heSegs === enSegs after each apply.
 *
 *   node apply_he_has_more_wave1.mjs --dry-run
 *   node apply_he_has_more_wave1.mjs --apply
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
const EVAL = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json");
const REVIEW = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW.json");

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

/** Same split as rejoin_oversplit_he / oc-web-reader. */
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
    return null;
  }
}

function validateGroups(groups, heN, enN) {
  if (!Array.isArray(groups) || groups.length !== enN) {
    return `groups.length ${groups?.length} !== enSegs ${enN}`;
  }
  const flat = [];
  for (let gi = 0; gi < groups.length; gi++) {
    const g = groups[gi];
    if (!Array.isArray(g) || g.length === 0) return `empty group at ${gi}`;
    for (let i = 0; i < g.length; i++) {
      const idx = g[i];
      if (!Number.isInteger(idx) || idx < 0 || idx >= heN) {
        return `bad index ${idx} in group ${gi}`;
      }
      if (flat.length && idx !== flat[flat.length - 1] + 1) {
        return `non-contiguous at group ${gi}: ${idx} after ${flat[flat.length - 1]}`;
      }
      flat.push(idx);
    }
  }
  if (
    flat.length !== heN ||
    flat[0] !== 0 ||
    flat[flat.length - 1] !== heN - 1
  ) {
    return `partition incomplete: got [${flat.join(",")}] for heN=${heN}`;
  }
  return null;
}

/** Join selected HE parts with spaces; groups with <br /> (mirror curated EN). */
function applyGroups(heSegs, groups) {
  return groups
    .map((g) => g.map((i) => heSegs[i].trim()).filter(Boolean).join(" "))
    .join("<br />\n");
}

function parseArgs(argv) {
  const out = { apply: false };
  for (const a of argv) {
    if (a === "--apply") out.apply = true;
    else if (a === "--dry-run") out.apply = false;
  }
  return out;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const evalj = JSON.parse(fs.readFileSync(EVAL, "utf8"));
  const review = JSON.parse(fs.readFileSync(REVIEW, "utf8"));
  const byId = new Map(review.map((r) => [r.id, r]));
  const ids = evalj.refined?.strict_merge_ids;
  if (!Array.isArray(ids) || ids.length !== 62) {
    console.error(
      `Expected 62 strict_merge_ids, got ${ids?.length ?? "missing"}`
    );
    process.exit(1);
  }

  // Safety: never include Likut / beur-hagra glued merges
  const likut = new Set(evalj.refined?.likut_merge_ids || []);
  const applied = [];
  const skipped = [];
  const failed = [];
  const affected = { oc1: new Set(), yd1: new Set(), cm1: new Set() };

  console.log(
    `[he-has-more-wave1] mode=${opts.apply ? "APPLY" : "DRY-RUN"} ids=${ids.length}`
  );

  for (const id of ids) {
    if (likut.has(id) || id.includes("/beur-hagra")) {
      failed.push({ id, reason: "excluded_likut_or_beur_hagra" });
      console.log(`FAIL ${id}: excluded (Likut/beur-hagra)`);
      continue;
    }
    const r = byId.get(id);
    if (!r || r.action !== "merge_groups" || !Array.isArray(r.merge_groups)) {
      failed.push({
        id,
        reason: "missing_review_merge_groups",
        action: r?.action,
      });
      console.log(`FAIL ${id}: no merge_groups in review`);
      continue;
    }
    const groups = r.merge_groups;
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const heRaw = readText(hePath);
    const enRaw = readText(enPath);
    if (heRaw == null || enRaw == null) {
      failed.push({ id, reason: "missing_file", hePath, enPath });
      console.log(`FAIL ${id}: missing file`);
      continue;
    }
    const heSegs = splitHtmlByBrSegments(heRaw);
    const enSegs = splitHtmlByBrSegments(enRaw);
    const heN = heSegs.length;
    const enN = enSegs.length;

    if (heN === enN) {
      skipped.push({ id, reason: "already_matched", heSegs: heN, enSegs: enN });
      console.log(`SKIP ${id}: already heSegs=enSegs=${heN}`);
      continue;
    }

    const verr = validateGroups(groups, heN, enN);
    if (verr) {
      failed.push({
        id,
        reason: "bad_groups",
        detail: verr,
        heSegs: heN,
        enSegs: enN,
      });
      console.log(`FAIL ${id}: ${verr}`);
      continue;
    }

    const joined = applyGroups(heSegs, groups);
    const afterHe = splitHtmlByBrSegments(joined);
    if (afterHe.length !== enN) {
      failed.push({
        id,
        reason: "post_verify_mismatch",
        heSegsBefore: heN,
        heSegsAfter: afterHe.length,
        enSegs: enN,
      });
      console.log(
        `FAIL ${id}: after join heSegs=${afterHe.length} !== enSegs=${enN}`
      );
      continue;
    }

    if (opts.apply) {
      fs.writeFileSync(
        hePath,
        joined.endsWith("\n") ? joined : joined + "\n",
        "utf8"
      );
    }

    const [vol, siman] = id.split("/");
    if (affected[vol]) affected[vol].add(siman);

    const row = {
      id,
      heSegsBefore: heN,
      heSegsAfter: afterHe.length,
      enSegs: enN,
      groups,
      applied: opts.apply,
      notes: r.notes || null,
    };
    applied.push(row);
    console.log(
      `${opts.apply ? "APPLIED" : "WOULD_APPLY"} ${id}: he ${heN}→${afterHe.length} (=en ${enN})`
    );
  }

  const bySlug = {};
  for (const row of applied) {
    const slug = row.id.split("/").pop();
    bySlug[slug] = (bySlug[slug] || 0) + 1;
  }

  const summary = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    corpusRoot: CORPUS_ROOT,
    wave: "HE_HAS_MORE_WAVE1",
    source: {
      eval: "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json#refined.strict_merge_ids",
      review: "HE_HAS_MORE_PACK_ALL_REVIEW.json",
      excluded: "likut_merge_ids / all beur-hagra Likut glued merges",
    },
    joinRule:
      "HE segments within group joined with spaces; groups with <br />\\n; EN untouched",
    counts: {
      allowlist: ids.length,
      applied: applied.length,
      skipped: skipped.length,
      failed: failed.length,
    },
    bySlug,
    affectedSimanim: {
      oc1: [...affected.oc1].sort(
        (a, b) => parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10)
      ),
      yd1: [...affected.yd1].sort(
        (a, b) => parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10)
      ),
      cm1: [...affected.cm1].sort(
        (a, b) => parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10)
      ),
    },
    applied,
    skipped,
    failed,
  };

  const outJson = path.join(__dirname, "he_has_more_wave1_apply_log.json");
  fs.writeFileSync(outJson, JSON.stringify(summary, null, 2) + "\n", "utf8");

  const affPath = path.join(__dirname, "he_has_more_wave1_affected_simanim.json");
  fs.writeFileSync(
    affPath,
    JSON.stringify(summary.affectedSimanim, null, 2) + "\n",
    "utf8"
  );

  console.log(
    `\n[summary] applied=${applied.length} skipped=${skipped.length} failed=${failed.length}`
  );
  console.log(`[log] ${outJson}`);
  if (failed.length) process.exitCode = 1;
}

main();
