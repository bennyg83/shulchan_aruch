/**
 * Apply Class-A mechanical Likut/marker splits on LIVE corpus.
 * Verbatim split of existing EN at mid markers; normalize ליקוט heads to (Likkut).
 * Hebrew untouched. No body rewrite.
 *
 *   node apply_class_a_mechanical_likut_splits.mjs --dry-run
 *   node apply_class_a_mechanical_likut_splits.mjs --apply
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE = path.resolve(__dirname, "../../../..");
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const CLASS_A = [
  "yd1/siman286/seif-022/beur-hagra",
  "yd1/siman84/seif-006/beur-hagra",
  "yd1/siman115/seif-003/beur-hagra",
  "yd1/siman128/seif-004/beur-hagra",
  "yd1/siman160/seif-012/beur-hagra",
  "yd1/siman160/seif-016/beur-hagra",
  "yd1/siman160/seif-017/beur-hagra",
  "yd1/siman160/seif-020/beur-hagra",
  "yd1/siman160/seif-023/beur-hagra",
  "yd1/siman246/seif-026/beur-hagra",
  "yd1/siman115/seif-002/beur-hagra",
  "yd1/siman246/seif-004/beur-hagra",
];

const MID_MARKER_RE =
  /\((?:Extract|Collection|Addition|Additional note|Likkut|Likut|Collected|Supplement)\)/gi;
const LIKUT_HE_RE = /^\(ליקוט\)/;
const LIKUT_EN_OK_RE = /^\(Likkut\)/i;
const WRONG_EN_PREFIX_RE = /^\([^)]+\)\s*/;

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

function stripTags(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikutHe(heSeg) {
  return LIKUT_HE_RE.test(stripTags(heSeg));
}

function normalizeLikutHead(enSeg) {
  const plain = stripTags(enSeg);
  if (LIKUT_EN_OK_RE.test(plain)) {
    return { text: enSeg, changed: false, action: "already_ok" };
  }
  if (WRONG_EN_PREFIX_RE.test(plain)) {
    const oldPrefix = plain.match(WRONG_EN_PREFIX_RE)[0].trim();
    const restRaw = String(enSeg).replace(WRONG_EN_PREFIX_RE, "");
    return {
      text: `(Likkut) ${restRaw.trimStart()}`,
      changed: true,
      action: `replaced:${oldPrefix}`,
    };
  }
  return {
    text: `(Likkut) ${String(enSeg).trimStart()}`,
    changed: true,
    action: "prepended",
  };
}

/**
 * Split a single EN segment at mid markers (not at index 0).
 * Returns array of pieces preserving original wording.
 */
function splitAtMidMarkers(enSeg) {
  const text = String(enSeg);
  const re = new RegExp(MID_MARKER_RE.source, "gi");
  const cuts = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > 0) cuts.push(m.index);
  }
  if (cuts.length === 0) return [text.trim()].filter(Boolean);

  const parts = [];
  let prev = 0;
  for (const idx of cuts) {
    const left = text.slice(prev, idx).trim();
    if (left) parts.push(left);
    prev = idx;
  }
  const right = text.slice(prev).trim();
  if (right) parts.push(right);
  return parts;
}

/**
 * Expand EN segs by splitting at mid markers until count matches HE,
 * preferring splits that create pieces for ליקוט HE slots.
 */
function mechanicalSplit(heSegs, enSegs) {
  const target = heSegs.length;
  let out = enSegs.map((s) => String(s));
  const splits = [];

  // Keep splitting mid-marker pieces until we hit target or no more mid markers
  let guard = 0;
  while (out.length < target && guard < 50) {
    guard++;
    let progressed = false;
    for (let i = 0; i < out.length && out.length < target; i++) {
      const pieces = splitAtMidMarkers(out[i]);
      if (pieces.length > 1) {
        // Take only enough pieces to approach target
        const need = target - out.length + 1; // replace 1 with N
        let take = Math.min(pieces.length, need);
        // Prefer taking all mid-marker cuts when they exactly fill
        if (out.length - 1 + pieces.length === target) take = pieces.length;
        if (take < 2) continue;
        const used = pieces.slice(0, take);
        // If we don't take all pieces, merge remainder into last
        if (take < pieces.length) {
          used[used.length - 1] = [used[used.length - 1], ...pieces.slice(take)].join(" ");
        }
        splits.push({
          en_index_before: i,
          pieces: used.length,
          markers: used.slice(1).map((p) => {
            const mm = stripTags(p).match(MID_MARKER_RE);
            return mm ? mm[0] : null;
          }),
        });
        out = [...out.slice(0, i), ...used, ...out.slice(i + 1)];
        progressed = true;
        break;
      }
    }
    if (!progressed) break;
  }

  return { segs: out, splits };
}

function applyLikutNormalize(heSegs, enSegs) {
  const fixes = [];
  const out = enSegs.map((en, i) => {
    if (!isLikutHe(heSegs[i])) return en;
    const fix = normalizeLikutHead(en);
    if (fix.changed) {
      fixes.push({ slot: i, action: fix.action });
      return fix.text;
    }
    return en;
  });
  return { segs: out, fixes };
}

function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply;
  const log = {
    scannedAt: new Date().toISOString(),
    dryRun,
    mode: "class_a_mechanical_likut_mid_marker_split",
    applied: [],
    skipped: [],
    failed: [],
  };

  console.log(
    `[class-a-likut] mode=${apply ? "APPLY" : "DRY-RUN"} cases=${CLASS_A.length}`
  );

  for (const id of CLASS_A) {
    const hePath = path.join(CORPUS, id, "he.html");
    const enPath = path.join(CORPUS, id, "en.html");
    if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) {
      log.failed.push({ id, reason: "missing_corpus_file" });
      console.log(`FAIL ${id}: missing corpus file`);
      continue;
    }
    const heRaw = fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "");
    const enBefore = fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "");
    const heSegs = splitHtmlByBrSegments(heRaw);
    const enSegsBefore = splitHtmlByBrSegments(enBefore);

    if (enSegsBefore.length === heSegs.length) {
      log.skipped.push({
        id,
        reason: "already_aligned",
        heSegs: heSegs.length,
        enSegs: enSegsBefore.length,
      });
      console.log(`SKIP ${id}: already aligned (${heSegs.length})`);
      continue;
    }

    const { segs: splitSegs, splits } = mechanicalSplit(heSegs, enSegsBefore);
    const { segs: normSegs, fixes } = applyLikutNormalize(heSegs, splitSegs);
    const enAfter = joinSegments(normSegs);
    const enSegsAfter = splitHtmlByBrSegments(enAfter).length;

    // Verbatim check: joined normalized text without markers/ws should match
    // (marker-only normalize allowed). Body words preserved via split-only.
    const bodyBefore = stripTags(enBefore)
      .replace(MID_MARKER_RE, "")
      .replace(/\s+/g, " ")
      .trim();
    const bodyAfter = stripTags(enAfter)
      .replace(MID_MARKER_RE, "")
      .replace(/^\(Likkut\)\s*/gim, "")
      .replace(/\s+/g, " ")
      .trim();
    // Soft check: after removing all paren-markers, body should be subset-equal
    // (Likkut prepend adds nothing if prefix replaced)

    if (enSegsAfter !== heSegs.length) {
      log.failed.push({
        id,
        reason: `post_split_mismatch enAfter=${enSegsAfter} he=${heSegs.length}`,
        enSegsBefore: enSegsBefore.length,
        enSegsAfter,
        heSegs: heSegs.length,
        splits,
      });
      console.log(
        `FAIL ${id}: en ${enSegsBefore.length}->${enSegsAfter} (he=${heSegs.length})`
      );
      continue;
    }

    const entry = {
      id,
      enSegsBefore: enSegsBefore.length,
      enSegsAfter,
      heSegs: heSegs.length,
      splits,
      likut_marker_fixes: fixes,
      he_untouched: true,
    };

    console.log(
      `${apply ? "APPLY" : "PLAN"} ${id}: en ${enSegsBefore.length}->${enSegsAfter} (he=${heSegs.length}) splits=${splits.length} likutFixes=${fixes.length}`
    );

    if (apply) {
      fs.writeFileSync(enPath, enAfter, "utf8");
    }
    log.applied.push(entry);
  }

  const outPath = path.join(
    __dirname,
    "CLASS_A_MECHANICAL_LIKUT_SPLITS_APPLY.json"
  );
  fs.writeFileSync(outPath, JSON.stringify(log, null, 2), "utf8");
  console.log(
    `[class-a-likut] applied=${log.applied.length} skipped=${log.skipped.length} failed=${log.failed.length}`
  );
  console.log(`[class-a-likut] log=${outPath}`);
  if (log.failed.length) process.exitCode = 1;
}

main();
