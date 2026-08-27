/**
 * Apply curated EN merge_groups allowlist (space-join, like yad-ephraim d4f6ef2c06).
 * Edits only en.html. Verifies enSegs === heSegs after each apply.
 *
 *   node apply_en_rejoin_curated.mjs --dry-run
 *   node apply_en_rejoin_curated.mjs --apply
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

/** Already applied — log as skipped (prior). */
const ALREADY_DONE = new Set(["oc1/siman32/seif-005/yad-ephraim"]);

/**
 * Curated allowlist: path → merge_groups (EN indices).
 * Corrections 271 / 486 / 340 use verified plans (not raw AI).
 */
const ALLOWLIST = [
  // Part1 AGREE
  ["oc1/siman1/seif-001/biur-halacha", [[0], [1], [2, 3, 4, 5, 6, 7], [8], [9]]],
  ["oc1/siman27/seif-006/machatzit-hashekel", [[0, 1], [2, 3, 4], [5]]],
  ["oc1/siman51/seif-007/machatzit-hashekel", [[0], [1, 2], [3], [4]]],
  ["oc1/siman128/seif-003/turei-zahav", [[0, 1], [2]]],
  ["oc1/siman137/seif-004/peri-megadim", [[0, 1], [2], [3], [4]]],
  [
    "oc1/siman272/seif-007/beur-hagra",
    [[0, 1, 2, 3, 4, 5, 6, 7, 8], [9]],
  ],
  // Part1 correction
  [
    "oc1/siman271/seif-013/biur-halacha",
    [[0], [1, 2, 3], [4, 5, 6, 7, 8]],
    { correction: true, note: "NOT AI [[0],[1,2,3,4],[5..8]]" },
  ],
  // Parts2–4 AGREE
  ["oc1/siman273/seif-005/machatzit-hashekel", [[0, 1], [2], [3], [4], [5]]],
  ["oc1/siman299/seif-001/beur-hagra", [[0], [1], [2, 3]]],
  ["oc1/siman422/seif-002/biur-halacha", [[0], [1, 2, 3]]],
  ["oc1/siman466/seif-005/biur-halacha", [[0, 1, 2, 3, 4, 5], [6]]],
  ["oc1/siman467/seif-016/beur-hagra", [[0], [1, 2, 3]]],
  [
    "oc1/siman484/seif-001/turei-zahav",
    [[0], [1], [2, 3, 4, 5, 6, 7, 8, 9, 10]],
  ],
  ["oc1/siman490/seif-009/beur-hagra", [[0], [1], [2], [3, 4, 5], [6]]],
  ["oc1/siman524/seif-001/peri-megadim", [[0], [1, 2]]],
  ["oc1/siman581/seif-001/turei-zahav", [[0, 1, 2, 3], [4], [5], [6]]],
  ["oc1/siman585/seif-001/beur-hagra", [[0], [1, 2, 3, 4]]],
  [
    "oc1/siman638/seif-002/beur-hagra",
    [[0, 1], [2], [3], [4], [5], [6], [7], [8], [9], [10]],
  ],
  ["oc1/siman668/seif-001/beur-hagra", [[0], [1, 2]]],
  ["oc1/siman687/seif-002/turei-zahav", [[0, 1, 2, 3, 4], [5]]],
  ["yd1/siman198/seif-039/beur-hagra", [[0], [1, 2, 3, 4, 5]]],
  // Parts2–4 correction
  [
    "oc1/siman486/seif-001/beur-hagra",
    [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [14], [15, 16, 17]],
    { correction: true, note: "NOT AI [[0..12],[13],[14..17]]" },
  ],
  // Parts5–7 AGREE (exclude 334:45)
  ["yd1/siman371/seif-001/turei-zahav", [[0], [1], [2, 3]]],
  [
    "cm1/siman39/seif-003/beur-hagra",
    [
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6],
      [7],
      [8],
      [9],
      [10, 11],
      [12],
      [13],
      [14],
      [15],
      [16],
    ],
  ],
  ["cm1/siman42/seif-005/beur-hagra", [[0], [1], [2], [3, 4], [5]]],
  [
    "cm1/siman45/seif-012/beur-hagra",
    [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9, 10]],
  ],
  [
    "cm1/siman50/seif-001/urim-vetumim-tumim",
    [[0], [1], [2], [3], [4], [5], [6, 7]],
  ],
  ["cm1/siman71/seif-017/beur-hagra", [[0], [1], [2, 3]]],
  ["cm1/siman72/seif-016/beur-hagra", [[0], [1, 2]]],
  [
    "cm1/siman78/seif-001/beur-hagra",
    [
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [6, 7],
      [8],
      [9],
      [10],
      [11],
      [12],
      [13],
      [14],
      [15],
      [16],
      [17],
      [18],
    ],
  ],
  ["cm1/siman81/seif-023/beur-hagra", [[0], [1], [2], [3, 4]]],
  ["cm1/siman146/seif-008/ketzot-hachoshen", [[0, 1, 2, 3], [4]]],
  ["cm1/siman157/seif-012/ketzot-hachoshen", [[0, 1], [2], [3]]],
  ["cm1/siman195/seif-001/ketzot-hachoshen", [[0], [1, 2, 3, 4]]],
  ["cm1/siman204/seif-002/beur-hagra", [[0], [1, 2]]],
  ["cm1/siman212/seif-007/ketzot-hachoshen", [[0], [1, 2, 3, 4]]],
  // Parts8–10 AGREE + correction
  ["cm1/siman216/seif-013/ketzot-hachoshen", [[0], [1, 2]]],
  ["cm1/siman250/seif-003/ketzot-hachoshen", [[0], [1], [2, 3, 4, 5, 6, 7]]],
  [
    "cm1/siman252/seif-002/ketzot-hachoshen",
    [[0, 1, 2, 3, 4], [5, 6], [7, 8, 9, 10]],
  ],
  ["cm1/siman269/seif-004/ketzot-hachoshen", [[0], [1], [2, 3, 4, 5]]],
  ["cm1/siman273/seif-014/ketzot-hachoshen", [[0], [1], [2, 3]]],
  [
    "cm1/siman388/seif-007/ketzot-hachoshen",
    [[0], [1], [2], [3, 4], [5], [6]],
  ],
  [
    "cm1/siman411/seif-001/beur-hagra",
    [[0], [1], [2], [3, 4], [5], [6], [7], [8]],
  ],
  [
    "cm1/siman340/seif-003/ketzot-hachoshen",
    [[0], [1, 2, 3, 4, 5, 6, 7, 8]],
    { correction: true, note: "NOT AI [[0..4],[5..8]]" },
  ],
];

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

/** Same split as dry_run / rejoin_oversplit_en / oc-web-reader. */
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

function validateGroups(groups, enN, heN) {
  if (!Array.isArray(groups) || groups.length !== heN) {
    return `groups.length ${groups?.length} !== heSegs ${heN}`;
  }
  const flat = [];
  for (let gi = 0; gi < groups.length; gi++) {
    const g = groups[gi];
    if (!Array.isArray(g) || g.length === 0) return `empty group at ${gi}`;
    for (let i = 0; i < g.length; i++) {
      const idx = g[i];
      if (!Number.isInteger(idx) || idx < 0 || idx >= enN) {
        return `bad index ${idx} in group ${gi}`;
      }
      if (flat.length && idx !== flat[flat.length - 1] + 1) {
        return `non-contiguous at group ${gi}: ${idx} after ${flat[flat.length - 1]}`;
      }
      flat.push(idx);
    }
  }
  if (flat.length !== enN || flat[0] !== 0 || flat[flat.length - 1] !== enN - 1) {
    return `partition incomplete: got [${flat.join(",")}] for enN=${enN}`;
  }
  return null;
}

/** Join selected EN parts with spaces (strip intervening <br>). */
function applyGroups(enSegs, groups) {
  return groups
    .map((g) => g.map((i) => enSegs[i].trim()).filter(Boolean).join(" "))
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
  const applied = [];
  const skipped = [];
  const failed = [];

  console.log(
    `[curated-en-rejoin] mode=${opts.apply ? "APPLY" : "DRY-RUN"} items=${ALLOWLIST.length}`
  );

  for (const entry of ALLOWLIST) {
    const [id, groups, meta] = entry;
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const enRaw = readText(enPath);
    const heRaw = readText(hePath);
    if (enRaw == null || heRaw == null) {
      failed.push({ id, reason: "missing_file", enPath, hePath });
      console.log(`FAIL ${id}: missing file`);
      continue;
    }
    const enSegs = splitHtmlByBrSegments(enRaw);
    const heSegs = splitHtmlByBrSegments(heRaw);
    const enN = enSegs.length;
    const heN = heSegs.length;

    if (ALREADY_DONE.has(id) || enN === heN) {
      skipped.push({
        id,
        reason: enN === heN ? "already_matched" : "already_done",
        heSegs: heN,
        enSegs: enN,
      });
      console.log(`SKIP ${id}: enSegs=${enN} heSegs=${heN}`);
      continue;
    }

    const verr = validateGroups(groups, enN, heN);
    if (verr) {
      failed.push({ id, reason: "bad_groups", detail: verr, heSegs: heN, enSegs: enN });
      console.log(`FAIL ${id}: ${verr}`);
      continue;
    }

    const joined = applyGroups(enSegs, groups);
    const afterEn = splitHtmlByBrSegments(joined);
    if (afterEn.length !== heN) {
      failed.push({
        id,
        reason: "post_verify_mismatch",
        heSegs: heN,
        enSegsBefore: enN,
        enSegsAfter: afterEn.length,
      });
      console.log(
        `FAIL ${id}: after join enSegs=${afterEn.length} !== heSegs=${heN}`
      );
      continue;
    }

    if (opts.apply) {
      fs.writeFileSync(enPath, joined.endsWith("\n") ? joined : joined + "\n", "utf8");
    }

    const row = {
      id,
      heSegs: heN,
      enSegsBefore: enN,
      enSegsAfter: afterEn.length,
      groups,
      correction: Boolean(meta?.correction),
      note: meta?.note || null,
      applied: opts.apply,
    };
    applied.push(row);
    console.log(
      `${opts.apply ? "APPLIED" : "WOULD_APPLY"} ${id}: en ${enN}→${afterEn.length} (=he ${heN})${meta?.correction ? " [CORRECTION]" : ""}`
    );
  }

  const summary = {
    scannedAt: new Date().toISOString(),
    mode: opts.apply ? "apply" : "dry-run",
    corpusRoot: CORPUS_ROOT,
    counts: {
      allowlist: ALLOWLIST.length,
      applied: applied.length,
      skipped: skipped.length,
      failed: failed.length,
    },
    applied,
    skipped,
    failed,
    correctionsUsed: applied
      .filter((r) => r.correction)
      .map((r) => ({ id: r.id, groups: r.groups, note: r.note })),
  };

  const outJson = path.join(__dirname, "en_rejoin_curated_apply_log.json");
  fs.writeFileSync(outJson, JSON.stringify(summary, null, 2) + "\n", "utf8");
  console.log(
    `\n[summary] applied=${applied.length} skipped=${skipped.length} failed=${failed.length}`
  );
  console.log(`[log] ${outJson}`);
  if (failed.length) process.exitCode = 1;
}

main();
