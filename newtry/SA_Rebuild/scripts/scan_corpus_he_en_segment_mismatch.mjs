/**
 * Scan corpus he.html / en.html pairs for bilingual segment mismatch.
 *
 * The web reader splits HE and EN on <br> and zips by index
 * (see oc-web-reader/src/lib/corpus.js zipHeEnSegments). When EN has
 * more <br>-separated notes than HE (or vice versa), later rows show
 * English-only or Hebrew-only even with both languages enabled —
 * e.g. YD 4:1 kaf-hachayim HE truncated to note א while EN had א–ז.
 *
 * Usage (from repo root or this folder):
 *   node scan_corpus_he_en_segment_mismatch.mjs
 *   node scan_corpus_he_en_segment_mismatch.mjs --volume yd1
 *   node scan_corpus_he_en_segment_mismatch.mjs --volume oc1 --max-simanim 50
 *   node scan_corpus_he_en_segment_mismatch.mjs --volumes oc1,yd1 --slug kaf-hachayim
 *
 * Safe on Windows: one volume at a time, no git/rg, low concurrency.
 *
 * Writes:
 *   newtry/SA_Rebuild/audit/he_en_segment_mismatch/<vol>_report.json
 *   newtry/SA_Rebuild/audit/he_en_segment_mismatch/SUMMARY.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../..");
const DEFAULT_CORPUS = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const OUT_DIR = path.join(REPO, "newtry/SA_Rebuild/audit/he_en_segment_mismatch");

const ALL_VOLUMES = ["oc1", "yd1", "eh1", "cm1"];

function parseArgs(argv) {
  const out = {
    corpusRoot: DEFAULT_CORPUS,
    volumes: ALL_VOLUMES.slice(),
    slug: null,
    maxSimanim: null,
    sampleLimit: 40,
    minDelta: 1,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--corpus-root") out.corpusRoot = path.resolve(next());
    else if (a === "--volume") out.volumes = [next()];
    else if (a === "--volumes")
      out.volumes = next()
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--slug") out.slug = next();
    else if (a === "--max-simanim") out.maxSimanim = parseInt(next(), 10);
    else if (a === "--sample-limit") out.sampleLimit = parseInt(next(), 10);
    else if (a === "--min-delta") out.minDelta = parseInt(next(), 10);
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scan_corpus_he_en_segment_mismatch.mjs [options]
  --corpus-root <dir>   corpus parent (contains oc1/yd1/eh1/cm1)
  --volume <id>         one of: oc1 yd1 eh1 cm1
  --volumes a,b         subset of volumes
  --slug <slug>         only this commentary slug
  --max-simanim <n>     stop after N siman folders per volume
  --sample-limit <n>    samples kept per volume (default 40)
  --min-delta <n>       minimum |heSegs-enSegs| to flag (default 1)`);
      process.exit(0);
    }
  }
  return out;
}

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

/** Same split as oc-web-reader zipHeEnSegments. */
function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function hasHebrewLetters(s) {
  return /[\u0590-\u05FF]/.test(s || "");
}

function hasLatinLetters(s) {
  return /[A-Za-z]/.test(s || "");
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

  if (heN === enN) {
    // Same count, but check empty-side zip holes (rare)
    let heOnly = 0;
    let enOnly = 0;
    for (let i = 0; i < heN; i++) {
      const hE = visuallyEmpty(heParts[i]);
      const eE = visuallyEmpty(enParts[i]);
      if (!hE && eE) heOnly++;
      if (hE && !eE) enOnly++;
    }
    if (heOnly || enOnly) {
      return { kind: "paired_empty_slots", heN, enN, heOnly, enOnly };
    }
    return null;
  }

  // Classic truncation: one blob HE vs many EN notes
  if (heN === 1 && enN > 1) return { kind: "he_truncated_vs_multi_en", heN, enN };
  if (enN === 1 && heN > 1) return { kind: "en_truncated_vs_multi_he", heN, enN };
  if (enN > heN) return { kind: "en_has_more_segments", heN, enN };
  return { kind: "he_has_more_segments", heN, enN };
}

function* walkSlugDirs(simanDir) {
  let ents;
  try {
    ents = fs.readdirSync(simanDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of ents) {
    if (!e.isDirectory()) continue;
    if (!e.name.startsWith("seif-")) continue;
    const seifDir = path.join(simanDir, e.name);
    let slugs;
    try {
      slugs = fs.readdirSync(seifDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const s of slugs) {
      if (!s.isDirectory()) continue;
      yield { seifDirName: e.name, slug: s.name, slugDir: path.join(seifDir, s.name) };
    }
  }
}

function listSimanDirs(volRoot) {
  return fs
    .readdirSync(volRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^siman\d+$/i.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => parseInt(a.replace(/\D/g, ""), 10) - parseInt(b.replace(/\D/g, ""), 10));
}

function scanVolume(vol, opts) {
  const volRoot = path.join(opts.corpusRoot, vol);
  const report = {
    volume: vol,
    corpusRoot: opts.corpusRoot,
    scannedAt: new Date().toISOString(),
    pairs: 0,
    issues: 0,
    byKind: {},
    bySlug: {},
    samples: [],
  };

  if (!fs.existsSync(volRoot)) {
    report.error = "volume_missing";
    return report;
  }

  const simans = listSimanDirs(volRoot);
  let simanCount = 0;

  for (const simanName of simans) {
    if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
    simanCount++;
    const simanNum = parseInt(simanName.replace(/\D/g, ""), 10);
    const simanDir = path.join(volRoot, simanName);

    for (const { seifDirName, slug, slugDir } of walkSlugDirs(simanDir)) {
      if (opts.slug && slug !== opts.slug) continue;

      const hePath = path.join(slugDir, "he.html");
      const enPath = path.join(slugDir, "en.html");
      if (!fs.existsSync(hePath) && !fs.existsSync(enPath)) continue;

      report.pairs++;
      let heRaw = "";
      let enRaw = "";
      try {
        if (fs.existsSync(hePath)) heRaw = fs.readFileSync(hePath, "utf8").replace(/^\uFEFF/, "");
      } catch {
        /* ignore */
      }
      try {
        if (fs.existsSync(enPath)) enRaw = fs.readFileSync(enPath, "utf8").replace(/^\uFEFF/, "");
      } catch {
        /* ignore */
      }

      const heParts = splitHtmlByBrSegments(heRaw);
      const enParts = splitHtmlByBrSegments(enRaw);
      const delta = Math.abs(heParts.length - enParts.length);
      if (delta < opts.minDelta && heParts.length === enParts.length) {
        const cls0 = classify(heParts, enParts, heRaw, enRaw);
        if (!cls0) continue;
      }

      const cls = classify(heParts, enParts, heRaw, enRaw);
      if (!cls) continue;
      if (
        (cls.kind === "en_has_more_segments" ||
          cls.kind === "he_has_more_segments" ||
          cls.kind === "he_truncated_vs_multi_en" ||
          cls.kind === "en_truncated_vs_multi_he") &&
        Math.abs(cls.heN - cls.enN) < opts.minDelta
      ) {
        continue;
      }

      report.issues++;
      report.byKind[cls.kind] = (report.byKind[cls.kind] || 0) + 1;
      if (!report.bySlug[slug]) report.bySlug[slug] = { issues: 0, byKind: {} };
      report.bySlug[slug].issues++;
      report.bySlug[slug].byKind[cls.kind] = (report.bySlug[slug].byKind[cls.kind] || 0) + 1;

      if (report.samples.length < opts.sampleLimit) {
        report.samples.push({
          volume: vol,
          siman: simanNum,
          seif: seifDirName,
          slug,
          kind: cls.kind,
          heSegments: cls.heN,
          enSegments: cls.enN,
          heOnlySlots: cls.heOnly || 0,
          enOnlySlots: cls.enOnly || 0,
          heBytes: Buffer.byteLength(heRaw, "utf8"),
          enBytes: Buffer.byteLength(enRaw, "utf8"),
          heHasHebrew: hasHebrewLetters(heRaw),
          enHasLatin: hasLatinLetters(enRaw),
          path: path.relative(opts.corpusRoot, slugDir).split(path.sep).join("/"),
        });
      }
    }
  }

  report.simanimScanned = simanCount;
  return report;
}

function writeSummary(reports) {
  const lines = [
    "# HE/EN segment mismatch scan",
    "",
    `Scanned at: ${new Date().toISOString()}`,
    "",
    "Flags when `<br>`-split HE and EN segment counts diverge (reader zip holes).",
    "",
    "| Volume | Pairs | Issues | Top kinds |",
    "|--------|------:|-------:|-----------|",
  ];

  for (const r of reports) {
    const kinds = Object.entries(r.byKind || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k, n]) => `${k}(${n})`)
      .join(", ");
    lines.push(
      `| ${r.volume} | ${r.pairs ?? 0} | ${r.issues ?? 0} | ${kinds || (r.error || "—")} |`
    );
  }

  lines.push("", "## By slug (issues ≥ 1)", "");
  for (const r of reports) {
    if (!r.bySlug || !Object.keys(r.bySlug).length) continue;
    lines.push(`### ${r.volume}`, "");
    const rows = Object.entries(r.bySlug).sort((a, b) => b[1].issues - a[1].issues);
    lines.push("| Slug | Issues | Kinds |", "|------|-------:|-------|");
    for (const [slug, info] of rows) {
      const kinds = Object.entries(info.byKind)
        .map(([k, n]) => `${k}:${n}`)
        .join(", ");
      lines.push(`| ${slug} | ${info.issues} | ${kinds} |`);
    }
    lines.push("");
  }

  lines.push("## Samples", "");
  for (const r of reports) {
    if (!r.samples?.length) continue;
    lines.push(`### ${r.volume}`, "");
    for (const s of r.samples) {
      lines.push(
        `- \`${s.path}\` — **${s.kind}** heSegs=${s.heSegments} enSegs=${s.enSegments} (${s.heBytes}B / ${s.enBytes}B)`
      );
    }
    lines.push("");
  }

  fs.writeFileSync(path.join(OUT_DIR, "SUMMARY.md"), lines.join("\n") + "\n", "utf8");
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`[scan] corpusRoot=${opts.corpusRoot}`);
  console.log(`[scan] volumes=${opts.volumes.join(",")}`);

  const reports = [];
  for (const vol of opts.volumes) {
    if (!ALL_VOLUMES.includes(vol)) {
      console.warn(`[scan] skip unknown volume ${vol}`);
      continue;
    }
    console.log(`[scan] scanning ${vol}…`);
    const t0 = Date.now();
    const report = scanVolume(vol, opts);
    const ms = Date.now() - t0;
    reports.push(report);
    const outPath = path.join(OUT_DIR, `${vol}_report.json`);
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n", "utf8");
    console.log(
      `[scan] ${vol}: pairs=${report.pairs} issues=${report.issues} simanim=${report.simanimScanned ?? 0} (${ms}ms) → ${outPath}`
    );
  }

  const combined = {
    scannedAt: new Date().toISOString(),
    corpusRoot: opts.corpusRoot,
    volumes: reports.map((r) => ({
      volume: r.volume,
      pairs: r.pairs,
      issues: r.issues,
      byKind: r.byKind,
      error: r.error,
    })),
  };
  fs.writeFileSync(path.join(OUT_DIR, "ALL_volumes.json"), JSON.stringify(combined, null, 2) + "\n", "utf8");
  writeSummary(reports);
  console.log(`[scan] SUMMARY → ${path.join(OUT_DIR, "SUMMARY.md")}`);

  const totalIssues = reports.reduce((n, r) => n + (r.issues || 0), 0);
  process.exitCode = totalIssues > 0 ? 0 : 0; // informational; do not fail CI unless wired later
}

main();
