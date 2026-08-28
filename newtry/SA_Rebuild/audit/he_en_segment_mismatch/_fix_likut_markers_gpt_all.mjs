/**
 * Normalize Likut marker prefixes in HE_HAS_MORE_LIKUT_SPLIT GPT results.
 *
 * For kit HE slots starting with (ליקוט), ensure EN starts with "(Likkut) "
 * by replacing wrong variant prefixes (Collection, Supplement, etc.)
 * or prepending when missing. Updates segments[].en and en_segments[].
 *
 *   node _fix_likut_markers_gpt_all.mjs
 *   node _fix_likut_markers_gpt_all.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GPT_OUT = path.join(__dirname, "HE_HAS_MORE_LIKUT_SPLIT_GPT_RESULT_ALL.json");
const KIT_FULL = path.join(__dirname, "HE_HAS_MORE_LIKUT_SPLIT_KIT.json");

const LIKUT_HE_RE = /^\(ליקוט\)/;
const LIKUT_EN_OK_RE = /^\(Likkut\)/i;
const WRONG_EN_PREFIX_RE = /^\([^)]+\)\s*/;

function stripHtml(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikutHe(heSeg) {
  return LIKUT_HE_RE.test(stripHtml(heSeg));
}

function enHasLikutMarker(en) {
  return LIKUT_EN_OK_RE.test(stripHtml(en));
}

function fixLikutMarker(enSeg) {
  const plain = stripHtml(enSeg);
  if (LIKUT_EN_OK_RE.test(plain)) {
    return { text: enSeg, changed: false, action: "already_ok" };
  }

  if (WRONG_EN_PREFIX_RE.test(plain)) {
    const oldPrefix = plain.match(WRONG_EN_PREFIX_RE)[0].trim();
    const restPlain = plain.replace(WRONG_EN_PREFIX_RE, "");
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

function loadKitById() {
  const kit = JSON.parse(fs.readFileSync(KIT_FULL, "utf8"));
  return new Map(kit.cases.map((c) => [c.id, c]));
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (!fs.existsSync(GPT_OUT)) {
    console.error("GPT result not found:", GPT_OUT);
    process.exit(1);
  }
  if (!fs.existsSync(KIT_FULL)) {
    console.error("Kit not found:", KIT_FULL);
    process.exit(1);
  }

  const kitById = loadKitById();
  const gptCases = JSON.parse(fs.readFileSync(GPT_OUT, "utf8"));
  const report = {
    scannedAt: new Date().toISOString(),
    dryRun,
    casesTouched: 0,
    slotsFixed: 0,
    fixes: [],
  };

  for (const gptCase of gptCases) {
    const kitCase = kitById.get(gptCase.id);
    if (!kitCase) continue;

    const heSegs = kitCase.he_segments || [];
    let caseChanged = false;

    for (let i = 0; i < heSegs.length; i++) {
      if (!isLikutHe(heSegs[i])) continue;

      const segEn = gptCase.segments?.[i]?.en;
      const legacyEn = gptCase.en_segments?.[i];
      const current = segEn ?? legacyEn ?? "";

      if (enHasLikutMarker(current)) continue;

      const { text, changed, action } = fixLikutMarker(current);
      if (!changed) continue;

      if (gptCase.segments?.[i]) gptCase.segments[i].en = text;
      if (Array.isArray(gptCase.en_segments)) gptCase.en_segments[i] = text;

      caseChanged = true;
      report.slotsFixed++;
      report.fixes.push({
        id: gptCase.id,
        slot: i,
        action,
        before: stripHtml(current).slice(0, 80),
        after: stripHtml(text).slice(0, 80),
      });
    }

    if (caseChanged) report.casesTouched++;
  }

  if (!dryRun) {
    fs.writeFileSync(GPT_OUT, JSON.stringify(gptCases, null, 2) + "\n", "utf8");
  }

  const auditPath = path.join(__dirname, "HE_HAS_MORE_LIKUT_MARKER_FIX_REPORT.json");
  fs.writeFileSync(auditPath, JSON.stringify(report, null, 2) + "\n", "utf8");

  console.log(
    JSON.stringify(
      {
        dryRun,
        casesTouched: report.casesTouched,
        slotsFixed: report.slotsFixed,
        wrote: dryRun ? null : GPT_OUT,
        audit: auditPath,
      },
      null,
      2
    )
  );
}

main();
