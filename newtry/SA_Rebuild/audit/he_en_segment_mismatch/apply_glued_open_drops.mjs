/**
 * Apply high-confidence GLUED OPEN drop_en_indices fixes (EN only).
 * Kit A: drop duplicate/orphan indices; Kit B 334:43: drop stubs keep bodies.
 *
 *   node apply_glued_open_drops.mjs --dry-run
 *   node apply_glued_open_drops.mjs --apply
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

/** id → drop_indices (0-based EN). Remaining EN kept as-is (1:1 with HE). */
const DROPS = [
  {
    id: "yd1/siman4/seif-004/yad-avraham",
    kit: "A",
    drop_indices: [2],
    note: "duplicate EN2 ≈ EN0+EN1",
  },
  {
    id: "yd1/siman37/seif-002/yad-avraham",
    kit: "A",
    drop_indices: [11],
    note: "orphan EN11 no HE match",
  },
  {
    id: "yd1/siman48/seif-004/yad-avraham",
    kit: "A",
    drop_indices: [3],
    note: "duplicate EN3 ≈ EN0–2",
  },
  {
    id: "yd1/siman61/seif-006/yad-avraham",
    kit: "A",
    drop_indices: [2],
    note: "duplicate EN2 ≈ EN0+EN1",
  },
  {
    id: "yd1/siman334/seif-043/baer-heitev",
    kit: "B",
    drop_indices: [0, 1, 2],
    note: "drop stubs; keep bodies EN3–5 only (not stub+space+body)",
  },
];

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
    return null;
  }
}

function dropIndices(segs, drop) {
  const dropSet = new Set(drop);
  return segs.filter((_, i) => !dropSet.has(i));
}

function joinSegs(segs) {
  return segs.join("<br />\n") + "\n";
}

function main() {
  const apply = process.argv.includes("--apply");
  const results = [];

  console.log(
    `[glued-open-drops] mode=${apply ? "APPLY" : "DRY-RUN"} n=${DROPS.length}`
  );
  console.log(`[corpus] ${CORPUS_ROOT}`);

  for (const row of DROPS) {
    const enPath = path.join(CORPUS_ROOT, row.id, "en.html");
    const hePath = path.join(CORPUS_ROOT, row.id, "he.html");
    const enRaw = readText(enPath);
    const heRaw = readText(hePath);
    if (enRaw == null || heRaw == null) {
      results.push({ ...row, ok: false, reason: "missing_file" });
      console.log(`FAIL ${row.id}: missing file`);
      continue;
    }
    const enSegs = splitHtmlByBrSegments(enRaw);
    const heSegs = splitHtmlByBrSegments(heRaw);
    const heN = heSegs.length;
    const enBefore = enSegs.length;

    const badDrop = row.drop_indices.find(
      (di) => !Number.isInteger(di) || di < 0 || di >= enBefore
    );
    if (badDrop !== undefined) {
      results.push({
        ...row,
        ok: false,
        reason: `bad_drop_index ${badDrop}`,
        heSegs: heN,
        enSegsBefore: enBefore,
      });
      console.log(`FAIL ${row.id}: bad drop index ${badDrop} (en=${enBefore})`);
      continue;
    }

    const kept = dropIndices(enSegs, row.drop_indices);
    const enAfter = kept.length;
    if (enAfter !== heN) {
      results.push({
        ...row,
        ok: false,
        reason: "post_drop_mismatch",
        heSegs: heN,
        enSegsBefore: enBefore,
        enSegsAfter: enAfter,
      });
      console.log(
        `FAIL ${row.id}: after drop en=${enAfter} !== he=${heN} (before en=${enBefore})`
      );
      continue;
    }

    const out = joinSegs(kept);
    const verify = splitHtmlByBrSegments(out);
    if (verify.length !== heN) {
      results.push({
        ...row,
        ok: false,
        reason: "post_write_verify_mismatch",
        heSegs: heN,
        enSegsBefore: enBefore,
        enSegsAfter: verify.length,
      });
      console.log(
        `FAIL ${row.id}: verify split en=${verify.length} !== he=${heN}`
      );
      continue;
    }

    if (apply) {
      fs.writeFileSync(enPath, out, "utf8");
    }

    const rec = {
      id: row.id,
      kit: row.kit,
      drop_indices: row.drop_indices,
      note: row.note,
      heSegs: heN,
      enSegsBefore: enBefore,
      enSegsAfter: enAfter,
      ok: true,
      applied: apply,
    };
    results.push(rec);
    console.log(
      `${apply ? "APPLIED" : "WOULD_APPLY"} ${row.id}: en ${enBefore}→${enAfter} (=he ${heN}) drop=[${row.drop_indices.join(",")}]`
    );
  }

  const summary = {
    scannedAt: new Date().toISOString(),
    mode: apply ? "apply" : "dry-run",
    corpusRoot: CORPUS_ROOT,
    counts: {
      planned: DROPS.length,
      ok: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
    },
    results,
  };
  const outJson = path.join(__dirname, "glued_open_apply_drops_log.json");
  fs.writeFileSync(outJson, JSON.stringify(summary, null, 2) + "\n", "utf8");
  console.log(
    `\n[summary] ok=${summary.counts.ok} failed=${summary.counts.failed}`
  );
  console.log(`[log] ${outJson}`);
  if (summary.counts.failed) process.exitCode = 1;
}

main();
