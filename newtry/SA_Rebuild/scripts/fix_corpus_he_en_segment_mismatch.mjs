/**
 * Auto-fix HE/EN <br>-segment mismatches by preferring Copy2 corpus
 * when it has a matching segment count for the truncated side.
 *
 * Does NOT republish from TXT. Corpus-only.
 *
 *   node fix_corpus_he_en_segment_mismatch.mjs --dry-run
 *   node fix_corpus_he_en_segment_mismatch.mjs --apply --volume yd1
 *   node fix_corpus_he_en_segment_mismatch.mjs --apply --volumes oc1,yd1,cm1
 *
 * After --apply, rebundle affected simanim with bundle-corpus.mjs --simanim …
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_LIVE = path.resolve(__dirname, "../../..");
const REPO_C2 = path.resolve(REPO_LIVE, "../shulchan-aruch-clean - Copy (2)");

const LIVE_CORPUS = path.join(
  REPO_LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const C2_CORPUS = path.join(
  REPO_C2,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const OUT_DIR = path.join(
  REPO_LIVE,
  "newtry/SA_Rebuild/audit/he_en_segment_mismatch"
);

const ALL_VOLUMES = ["oc1", "yd1", "eh1", "cm1"];

function parseArgs(argv) {
  const out = {
    apply: false,
    volumes: ["oc1", "yd1", "cm1"],
    slug: null,
    maxFixes: Infinity,
    maxSimanim: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--apply") out.apply = true;
    else if (a === "--dry-run") out.apply = false;
    else if (a === "--volume") out.volumes = [next()];
    else if (a === "--volumes")
      out.volumes = next()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--slug") out.slug = next();
    else if (a === "--max-fixes") out.maxFixes = parseInt(next(), 10);
    else if (a === "--max-simanim") out.maxSimanim = parseInt(next(), 10);
    else if (a === "--live-corpus") out.liveCorpus = path.resolve(next());
    else if (a === "--c2-corpus") out.c2Corpus = path.resolve(next());
  }
  out.liveCorpus = out.liveCorpus || LIVE_CORPUS;
  out.c2Corpus = out.c2Corpus || C2_CORPUS;
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

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return "";
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

function classify(heParts, enParts, heRaw, enRaw) {
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

function listSimanDirs(volRoot) {
  if (!fs.existsSync(volRoot)) return [];
  return fs
    .readdirSync(volRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^siman\d+$/i.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10));
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
      yield { seif: e.name, slug: s.name, slugDir: path.join(seifDir, s.name) };
    }
  }
}

/**
 * Choose a fix from Copy2:
 * - If live mismatched and C2 HE+EN already match → copy both from C2 (prefer)
 * - Else if live EN good multi and C2 HE matches that count → copy HE
 * - Else if live HE good multi and C2 EN matches that count → copy EN
 */
function planFix(liveHe, liveEn, c2He, c2En) {
  const lHe = splitHtmlByBrSegments(liveHe);
  const lEn = splitHtmlByBrSegments(liveEn);
  const cHe = splitHtmlByBrSegments(c2He);
  const cEn = splitHtmlByBrSegments(c2En);
  const liveCls = classify(lHe, lEn, liveHe, liveEn);
  if (!liveCls) return null;

  const c2Cls = classify(cHe, cEn, c2He, c2En);

  // Prefer HE-only restores so cleaned live EN is never overwritten from Copy2.
  // Restore truncated HE from C2 to match live EN count
  if (
    (liveCls.kind === "he_truncated_vs_multi_en" ||
      liveCls.kind === "en_has_more_segments" ||
      liveCls.kind === "he_missing") &&
    cHe.length === lEn.length &&
    cHe.length > lHe.length &&
    !visuallyEmpty(c2He)
  ) {
    return {
      strategy: "restore_he_from_c2_match_live_en",
      live: liveCls,
      c2: { heN: cHe.length, enN: cEn.length },
      actions: [{ file: "he.html", from: "c2", text: c2He }],
    };
  }

  // Copy2 HE+EN aligned and HE is fuller than live — copy HE only
  if (!c2Cls && cHe.length === cEn.length && cHe.length > 0) {
    if (c2He !== liveHe && !visuallyEmpty(c2He) && cHe.length >= lEn.length && cHe.length > lHe.length) {
      return {
        strategy: "c2_aligned_he_only",
        live: liveCls,
        c2: { heN: cHe.length, enN: cEn.length },
        actions: [{ file: "he.html", from: "c2", text: c2He }],
      };
    }
  }

  // Restore truncated EN from C2 to match live HE count
  if (
    (liveCls.kind === "en_truncated_vs_multi_he" ||
      liveCls.kind === "he_has_more_segments" ||
      liveCls.kind === "en_missing") &&
    cEn.length === lHe.length &&
    cEn.length > lEn.length &&
    !visuallyEmpty(c2En)
  ) {
    return {
      strategy: "restore_en_from_c2_match_live_he",
      live: liveCls,
      c2: { heN: cHe.length, enN: cEn.length },
      actions: [{ file: "en.html", from: "c2", text: c2En }],
    };
  }

  // C2 HE matches C2 EN and is better than live (even if live EN differs)
  if (!c2Cls && cHe.length > 1 && cHe.length === cEn.length) {
    if (cHe.length > lHe.length && !visuallyEmpty(c2He) && c2He !== liveHe) {
      return {
        strategy: "prefer_c2_he_aligned",
        live: liveCls,
        c2: { heN: cHe.length, enN: cEn.length },
        actions: [{ file: "he.html", from: "c2", text: c2He }],
      };
    }
  }

  return { strategy: "unfixable_from_c2", live: liveCls, c2: { heN: cHe.length, enN: cEn.length }, actions: [] };
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function processVolume(vol, opts) {
  const liveRoot = path.join(opts.liveCorpus, vol);
  const c2Root = path.join(opts.c2Corpus, vol);
  const result = {
    volume: vol,
    mismatched: 0,
    fixable: 0,
    applied: 0,
    unfixable: 0,
    byStrategy: {},
    affectedSimanim: new Set(),
    samples: [],
  };

  if (!fs.existsSync(liveRoot)) {
    result.error = "live_missing";
    return result;
  }

  const simans = listSimanDirs(liveRoot);
  let simanCount = 0;

  for (const simanName of simans) {
    if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
    simanCount++;
    const simanNum = parseInt(simanName.replace(/\D/g, ""), 10);
    const liveSiman = path.join(liveRoot, simanName);

    for (const { seif, slug, slugDir } of walkSlugDirs(liveSiman)) {
      if (opts.slug && slug !== opts.slug) continue;
      if (result.applied + result.fixable >= opts.maxFixes && !opts.apply) {
        /* still count? stop early for dry-run speed after enough samples */
      }
      if (opts.apply && result.applied >= opts.maxFixes) return result;

      const liveHePath = path.join(slugDir, "he.html");
      const liveEnPath = path.join(slugDir, "en.html");
      const liveHe = readText(liveHePath);
      const liveEn = readText(liveEnPath);
      const lHe = splitHtmlByBrSegments(liveHe);
      const lEn = splitHtmlByBrSegments(liveEn);
      const liveCls = classify(lHe, lEn, liveHe, liveEn);
      if (!liveCls) continue;

      result.mismatched++;
      const rel = path.join(simanName, seif, slug);
      const c2Slug = path.join(c2Root, simanName, seif, slug);
      const c2He = readText(path.join(c2Slug, "he.html"));
      const c2En = readText(path.join(c2Slug, "en.html"));
      const plan = planFix(liveHe, liveEn, c2He, c2En);

      if (!plan || !plan.actions.length) {
        result.unfixable++;
        result.byStrategy.unfixable_from_c2 = (result.byStrategy.unfixable_from_c2 || 0) + 1;
        if (result.samples.length < 30) {
          result.samples.push({
            path: `${vol}/${rel.replace(/\\/g, "/")}`,
            strategy: plan?.strategy || "unfixable_from_c2",
            live: plan?.live || liveCls,
            c2: plan?.c2,
          });
        }
        continue;
      }

      result.fixable++;
      result.byStrategy[plan.strategy] = (result.byStrategy[plan.strategy] || 0) + 1;
      result.affectedSimanim.add(simanNum);

      if (result.samples.length < 40) {
        result.samples.push({
          path: `${vol}/${rel.replace(/\\/g, "/")}`,
          strategy: plan.strategy,
          live: plan.live,
          c2: plan.c2,
          files: plan.actions.map((a) => a.file),
        });
      }

      if (opts.apply) {
        for (const act of plan.actions) {
          const dest = path.join(slugDir, act.file);
          ensureDir(path.dirname(dest));
          fs.writeFileSync(dest, act.text.replace(/\r\n/g, "\n"), "utf8");
        }
        result.applied++;
      }
    }
  }

  result.affectedSimanim = [...result.affectedSimanim].sort((a, b) => a - b);
  return result;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  ensureDir(OUT_DIR);
  console.log(`[fix] live=${opts.liveCorpus}`);
  console.log(`[fix] c2=${opts.c2Corpus}`);
  console.log(`[fix] mode=${opts.apply ? "APPLY" : "DRY-RUN"} volumes=${opts.volumes.join(",")}`);

  if (!fs.existsSync(opts.c2Corpus)) {
    console.error("[fix] Copy2 corpus missing:", opts.c2Corpus);
    process.exit(1);
  }

  const all = [];
  for (const vol of opts.volumes) {
    if (!ALL_VOLUMES.includes(vol)) continue;
    console.log(`[fix] ${vol}…`);
    const t0 = Date.now();
    const r = processVolume(vol, opts);
    console.log(
      `[fix] ${vol}: mismatched=${r.mismatched} fixable=${r.fixable} applied=${r.applied} unfixable=${r.unfixable} (${Date.now() - t0}ms)`
    );
    console.log(`[fix] ${vol} strategies`, r.byStrategy);
    console.log(`[fix] ${vol} affected simanim: ${r.affectedSimanim.length}`);
    all.push(r);
  }

  const outPath = path.join(
    OUT_DIR,
    opts.apply ? "fix_apply_log.json" : "fix_dry_run.json"
  );
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        at: new Date().toISOString(),
        apply: opts.apply,
        results: all.map((r) => ({
          ...r,
          // keep arrays
        })),
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  console.log(`[fix] log → ${outPath}`);

  if (opts.apply) {
    const simanimByVol = {};
    for (const r of all) {
      if (r.affectedSimanim?.length) simanimByVol[r.volume] = r.affectedSimanim;
    }
    fs.writeFileSync(
      path.join(OUT_DIR, "fix_affected_simanim.json"),
      JSON.stringify(simanimByVol, null, 2) + "\n",
      "utf8"
    );
    console.log("[fix] wrote fix_affected_simanim.json — rebundle those simanim next");
  }
}

main();
