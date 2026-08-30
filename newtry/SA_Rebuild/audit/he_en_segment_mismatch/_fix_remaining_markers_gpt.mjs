/**
 * Normalize Beer (° ) and Likut marker prefixes in _REMAINING GPT results.
 *
 * Only mutates EN prefix when HE slot is Beer degree / Likut and EN lacks
 * an accepted marker. Does not rewrite body text.
 * Then re-evals locally (src patched to local GPT_RESULT — no Downloads overwrite).
 *
 *   node _fix_remaining_markers_gpt.mjs
 *   node _fix_remaining_markers_gpt.mjs --dry-run
 *   node _fix_remaining_markers_gpt.mjs --kit EN_TRUNC_MODERATE_REMAINING
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { REMAINING_KITS } from "./eval_remaining_gpt_all.mjs";
import {
  enStartsWithMarker,
  getProposedEn,
  isBeerHagolahDegree,
  isLikut,
  loadKitCases,
  stripHtml,
} from "./_eval_remaining_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;

const WRONG_PAREN_PREFIX_RE = /^\([^)]+\)\s*/;
const MEANING_PREFIX_RE = /^Meaning[:,]?\s*/i;

function loadGptPaths(kit) {
  const repaired = path.join(AUDIT, `${kit}_GPT_RESULT_REPAIRED.json`);
  const gpt = path.join(AUDIT, `${kit}_GPT_RESULT.json`);
  // Prefer GPT_RESULT when present (fresh reupload / post-marker). Only fall
  // back to REPAIRED if GPT_RESULT is missing.
  return {
    primary: fs.existsSync(gpt) ? gpt : repaired,
    gpt,
    repaired: fs.existsSync(repaired) ? repaired : null,
  };
}

function setSlotEn(gptCase, i, text) {
  if (gptCase.segments?.[i]) gptCase.segments[i].en = text;
  if (Array.isArray(gptCase.en_segments) && gptCase.en_segments.length > i) {
    gptCase.en_segments[i] = text;
  }
  if (Array.isArray(gptCase.corrected_en) && gptCase.corrected_en.length > i) {
    gptCase.corrected_en[i] = text;
  }
  if (Array.isArray(gptCase.segments_en) && gptCase.segments_en.length > i) {
    gptCase.segments_en[i] = text;
  }
}

function fixBeerMarker(enSeg) {
  const plain = stripHtml(enSeg);
  if (/^\(°\)/.test(plain)) {
    return { text: enSeg, changed: false, action: "already_ok" };
  }
  if (enStartsWithMarker(plain, "°")) {
    if (MEANING_PREFIX_RE.test(plain)) {
      const restRaw = String(enSeg).replace(MEANING_PREFIX_RE, "");
      return {
        text: `(°) ${restRaw.trimStart()}`,
        changed: true,
        action: "replaced:Meaning",
      };
    }
    const restRaw = String(enSeg).replace(/^\(?°\)?\s*/i, "");
    return {
      text: `(°) ${restRaw.trimStart()}`,
      changed: true,
      action: "normalized_degree",
    };
  }
  if (WRONG_PAREN_PREFIX_RE.test(plain)) {
    const oldPrefix = plain.match(WRONG_PAREN_PREFIX_RE)[0].trim();
    const restRaw = String(enSeg).replace(WRONG_PAREN_PREFIX_RE, "");
    return {
      text: `(°) ${restRaw.trimStart()}`,
      changed: true,
      action: `replaced:${oldPrefix}`,
    };
  }
  return {
    text: `(°) ${String(enSeg).trimStart()}`,
    changed: true,
    action: "prepended",
  };
}

function fixLikutMarker(enSeg) {
  const plain = stripHtml(enSeg);
  // evalEditorial requires exact "(Likkut)" — Extract/Anthology still HOLD
  if (/^\(Likkut\)/i.test(plain)) {
    return { text: enSeg, changed: false, action: "already_ok" };
  }
  if (WRONG_PAREN_PREFIX_RE.test(plain)) {
    const oldPrefix = plain.match(WRONG_PAREN_PREFIX_RE)[0].trim();
    const restRaw = String(enSeg).replace(WRONG_PAREN_PREFIX_RE, "");
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

function fixKit(cfg, dryRun) {
  const { primary, gpt, repaired } = loadGptPaths(cfg.kit);
  if (!fs.existsSync(primary)) {
    return { kit: cfg.kit, num: cfg.num, skipped: true, reason: "no_gpt" };
  }

  const kitCases = loadKitCases(AUDIT, cfg.kit);
  const kitById = new Map(kitCases.map((c) => [c.id, c]));
  const gptCases = JSON.parse(
    fs.readFileSync(primary, "utf8").replace(/^\uFEFF/, "")
  );

  const report = {
    kit: cfg.kit,
    num: cfg.num,
    casesTouched: 0,
    slotsFixed: 0,
    beerSlots: 0,
    likutSlots: 0,
    fixes: [],
  };

  for (const gptCase of gptCases) {
    const kitCase = kitById.get(gptCase.id);
    if (!kitCase) continue;

    const heSegs = kitCase.he_segments || [];
    let caseChanged = false;

    for (let i = 0; i < heSegs.length; i++) {
      const he = heSegs[i];
      const before = getProposedEn(gptCase)[i] ?? "";

      if (isBeerHagolahDegree(he)) {
        const { text, changed, action } = fixBeerMarker(before);
        if (changed) {
          setSlotEn(gptCase, i, text);
          caseChanged = true;
          report.slotsFixed++;
          report.beerSlots++;
          report.fixes.push({
            id: gptCase.id,
            slot: i,
            kind: "beer",
            action,
            before: stripHtml(before).slice(0, 80),
            after: stripHtml(text).slice(0, 80),
          });
        }
      }

      const current = getProposedEn(gptCase)[i] ?? before;
      if (isLikut(he)) {
        const { text, changed, action } = fixLikutMarker(current);
        if (changed) {
          setSlotEn(gptCase, i, text);
          caseChanged = true;
          report.slotsFixed++;
          report.likutSlots++;
          report.fixes.push({
            id: gptCase.id,
            slot: i,
            kind: "likut",
            action,
            before: stripHtml(current).slice(0, 80),
            after: stripHtml(text).slice(0, 80),
          });
        }
      }
    }

    if (caseChanged) report.casesTouched++;
  }

  if (!dryRun) {
    const json = JSON.stringify(gptCases, null, 2) + "\n";
    // Always keep GPT_RESULT + REPAIRED in sync after marker pass
    fs.writeFileSync(gpt, json, "utf8");
    if (repaired) fs.writeFileSync(repaired, json, "utf8");
  }

  return report;
}

function runLocalEval(kitArg) {
  const args = [path.join(AUDIT, "eval_remaining_gpt_all.mjs"), "--reuse-local"];
  if (kitArg) args.push("--kit", kitArg);
  const r = spawnSync(process.execPath, args, {
    cwd: AUDIT,
    stdio: "inherit",
  });
  if (r.status) process.exit(r.status);
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const kitArg = process.argv.find((a, i) => process.argv[i - 1] === "--kit");
  const kits = kitArg
    ? REMAINING_KITS.filter((k) => k.kit === kitArg)
    : REMAINING_KITS;

  const beforeEvals = {};
  for (const cfg of kits) {
    const evalPath = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_EVAL.json`);
    if (fs.existsSync(evalPath)) {
      const ev = JSON.parse(fs.readFileSync(evalPath, "utf8"));
      beforeEvals[cfg.kit] = Object.fromEntries(
        (ev.results || []).map((r) => [
          r.id,
          { verdict: r.verdict, reason: r.reason },
        ])
      );
    }
  }

  const fixReports = [];
  for (const cfg of kits) {
    const report = fixKit(cfg, dryRun);
    fixReports.push(report);
    console.log(
      `[fix] ${cfg.kit}: cases=${report.casesTouched || 0} slots=${report.slotsFixed || 0} beer=${report.beerSlots || 0} likut=${report.likutSlots || 0}`
    );
  }

  if (dryRun) {
    const auditPath = path.join(AUDIT, "REMAINING_MARKER_FIX_REPORT.json");
    fs.writeFileSync(
      auditPath,
      JSON.stringify(
        { scannedAt: new Date().toISOString(), dryRun: true, kits: fixReports },
        null,
        2
      ) + "\n",
      "utf8"
    );
    console.log(JSON.stringify({ dryRun: true, audit: auditPath }, null, 2));
    return;
  }

  runLocalEval(kitArg);

  const flips = [];
  const stillHold = [];
  for (const cfg of kits) {
    const evalPath = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_EVAL.json`);
    const ev = JSON.parse(fs.readFileSync(evalPath, "utf8"));
    const before = beforeEvals[cfg.kit] || {};
    for (const row of ev.results || []) {
      const prev = before[row.id];
      if (prev?.verdict === "HOLD" && row.verdict === "APPROVE") {
        flips.push({
          kit: cfg.kit,
          id: row.id,
          from: prev.verdict,
          to: row.verdict,
          prevReason: prev.reason,
          reason: row.reason,
        });
      } else if (row.verdict === "APPROVE" && prev?.verdict === "HOLD") {
        // already handled
      } else if (row.verdict === "HOLD") {
        stillHold.push({ kit: cfg.kit, id: row.id, reason: row.reason });
      }
    }
  }

  const auditPath = path.join(AUDIT, "REMAINING_MARKER_FIX_REPORT.json");
  const summary = {
    scannedAt: new Date().toISOString(),
    dryRun: false,
    kits: fixReports,
    flipsHoldToApprove: flips,
    stillHold,
    counts: {
      slotsFixed: fixReports.reduce((a, x) => a + (x.slotsFixed || 0), 0),
      casesTouched: fixReports.reduce((a, x) => a + (x.casesTouched || 0), 0),
      flippedToApprove: flips.length,
      stillHold: stillHold.length,
    },
    flipsByKit: Object.fromEntries(
      kits.map((k) => [k.kit, flips.filter((f) => f.kit === k.kit).length])
    ),
    stillHoldByReason: stillHold.reduce((acc, h) => {
      acc[h.reason] = (acc[h.reason] || 0) + 1;
      return acc;
    }, {}),
  };
  fs.writeFileSync(auditPath, JSON.stringify(summary, null, 2) + "\n", "utf8");
  console.log(
    JSON.stringify(
      {
        dryRun: false,
        ...summary.counts,
        flipsByKit: summary.flipsByKit,
        stillHoldByReason: summary.stillHoldByReason,
        audit: auditPath,
      },
      null,
      2
    )
  );
}

main();
