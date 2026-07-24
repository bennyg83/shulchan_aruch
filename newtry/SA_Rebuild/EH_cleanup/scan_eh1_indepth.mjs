/**
 * In-depth EH1 quality scan (Even HaEzer corpus).
 * Mirrors YD/OC `scan_oc1_indepth.mjs`: register tells, garbage MT, HebrewLeak,
 * foreign-religion scrap, placeholders/empty, plus light layout/orphan checks.
 *
 * Scans public/corpus/eh1 en.html files (canonical simanN/seif-N/slug/en.html only;
 * bundles and non-canonical paths are excluded from content checks and reported
 * separately under layout).
 *
 * Usage (from this folder or any cwd):
 *   node scan_eh1_indepth.mjs
 *   node scan_eh1_indepth.mjs --corpus "C:/path/to/corpus/eh1"
 *
 * Writes under `../audit/eh1_indepth_YYYY-MM-DD_*`.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = path.resolve(__dirname, "../audit");
const TOOLS = path.resolve(__dirname, "../../OC_Mobile/oc318-mobile-reader/tools");

function parseArgs(argv) {
  const out = { corpus: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--corpus" && argv[i + 1]) {
      out.corpus = path.resolve(argv[++i]);
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const CORPUS = args.corpus
  ? args.corpus
  : path.resolve(__dirname, "../../OC_Mobile/oc318-mobile-reader/public/corpus/eh1");

const stamp = new Date().toISOString().slice(0, 10);
const prefix = path.join(AUDIT, `eh1_indepth_${stamp}`);

const { GARBAGE_RE, hebrewLeakRuns, stripTags, PLACEHOLDER_RE } = await import(
  pathToFileURL(path.join(TOOLS, "provenance-config.mjs")).href
);

const LORD = /\bthe Lord\b/i;
const YAHWEH = /\bYahweh\b/i;
const BIBLE = /\bthe Bible\b/i;
const PSALMS = /\bPsalms?\b/i;
const PASSOVER = /\bPassover\b/i;
const BAPTISM = /\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b/i;
const SEVERE =
  /\bYahweh\b|\bthe Bible\b|\bchurch(?:es)?\b|mosque|\bchrist(?:ian|ianity)?\b|\bislam(?:ic)?\b|gospel|crucifix|vatican|trinity|koran|qur['’]?an|\ballah\b|muhammad|\bjesus\b|cathedral|buddh\w*|\bhindu\w*|\bkrishna\b|\bthe pope\b|\bmecca\b|ramadan|\bimams?\b|minaret|caliph/gi;
const FOREIGN =
  /\bchurch|mosque|christ|islam|gospel|crucifix|vatican|trinity|koran|qur|allah|muhammad|jesus|cathedral|buddh|hindu|krishna|pope|mecca|ramadan|imam|minaret|caliph/i;
const MUSLIM = /\bmuslims?\b/i;
const EMDASH = /[—–]|\-\-/;
const MOJIBAKE = /[A-Za-z]\?[a-z]|�|Ã[\x80-\xBF]/;
const CANON_EN = /siman(\d+)\/seif-(\d+)\/([^/]+)\/en\.html$/i;

function isChallahFp(term, plain, index) {
  if (!/allah/i.test(term)) return false;
  const ctx = plain.slice(Math.max(0, index - 40), index + 50);
  return /[HhḤḥ]allah|challah|ḥallah/i.test(ctx);
}

function collectSevere(plain) {
  const terms = [];
  let m;
  SEVERE.lastIndex = 0;
  while ((m = SEVERE.exec(plain)) !== null) {
    if (isChallahFp(m[0], plain, m.index)) continue;
    if (!terms.some((x) => x.toLowerCase() === m[0].toLowerCase())) terms.push(m[0]);
  }
  return terms;
}

const stats = {
  enFiles: 0,
  empty: 0,
  placeholders: 0,
  garbage: 0,
  registerLord: 0,
  yahweh: 0,
  bible: 0,
  psalms: 0,
  passover: 0,
  baptism: 0,
  hebrewLeak: 0,
  severe: 0,
  foreign: 0,
  muslim: 0,
  emdash: 0,
  mojibake: 0,
  simanim: new Set(),
};

const layout = {
  unexpectedTopLevel: [],
  nonCanonicalEn: [],
  enWithoutHe: [],
  heWithoutEn: [],
  emptySeifDirs: [],
  bundlesPresent: false,
  bundleFiles: 0,
};

const rows = {
  garbage: [],
  lord: [],
  yahweh: [],
  bible: [],
  psalms: [],
  passover: [],
  baptism: [],
  hebrewLeak: [],
  severe: [],
  foreign: [],
  muslim: [],
  emdash: [],
  mojibake: [],
  placeholders: [],
  empty: [],
};

const bySlug = {};
const garbageTerms = {};
const severeTerms = {};

function bumpSlug(slug, key) {
  if (!bySlug[slug]) bySlug[slug] = {};
  bySlug[slug][key] = (bySlug[slug][key] || 0) + 1;
}

function scanLayoutRoot() {
  if (!fs.existsSync(CORPUS)) return;
  for (const name of fs.readdirSync(CORPUS)) {
    const p = path.join(CORPUS, name);
    const st = fs.statSync(p);
    if (!st.isDirectory()) continue;
    if (name === "bundles") {
      layout.bundlesPresent = true;
      layout.bundleFiles = countFiles(p);
      continue;
    }
    if (!/^siman\d+$/i.test(name)) {
      layout.unexpectedTopLevel.push(name);
    }
  }
}

function countFiles(d) {
  let n = 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) n += countFiles(p);
    else n++;
  }
  return n;
}

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      // skip bundles tree entirely for content + pairing
      const relDir = path.relative(CORPUS, p).split(path.sep).join("/");
      if (relDir === "bundles" || relDir.startsWith("bundles/")) continue;
      walk(p);
      continue;
    }

    const norm = p.split(path.sep).join("/");
    const rel = path.relative(CORPUS, p).split(path.sep).join("/");

    if (e.name === "en.html" || e.name === "he.html") {
      const parent = path.dirname(p);
      const hasEn = fs.existsSync(path.join(parent, "en.html"));
      const hasHe = fs.existsSync(path.join(parent, "he.html"));
      const mPair = rel.match(/siman(\d+)\/seif-(\d+)\/([^/]+)\/(en|he)\.html$/i);
      if (mPair) {
        const base = {
          siman: +mPair[1],
          seif: +mPair[2],
          slug: mPair[3],
          path: rel.replace(/\/(en|he)\.html$/i, "/"),
        };
        if (e.name === "en.html" && !hasHe) layout.enWithoutHe.push({ ...base, path: rel });
        if (e.name === "he.html" && !hasEn) layout.heWithoutEn.push({ ...base, path: rel });
      }
    }

    if (e.name !== "en.html") continue;

    const m = norm.match(CANON_EN);
    if (!m) {
      layout.nonCanonicalEn.push(rel);
      continue;
    }

    const siman = +m[1];
    const seif = +m[2];
    const slug = m[3];
    stats.enFiles++;
    stats.simanim.add(siman);
    const raw = fs.readFileSync(p, "utf8");
    const pl = stripTags(raw).replace(/\s+/g, " ").trim();
    const base = { siman, seif, slug, path: rel };

    if (!pl) {
      stats.empty++;
      rows.empty.push(base);
      bumpSlug(slug, "empty");
      continue;
    }
    if (PLACEHOLDER_RE.test(pl) || /translation pending/i.test(pl)) {
      stats.placeholders++;
      rows.placeholders.push(base);
      bumpSlug(slug, "placeholder");
    }

    const g = pl.match(GARBAGE_RE);
    if (g) {
      stats.garbage++;
      rows.garbage.push({ ...base, term: g[0] });
      garbageTerms[g[0]] = (garbageTerms[g[0]] || 0) + 1;
      bumpSlug(slug, "garbage");
    }

    if (LORD.test(pl)) {
      stats.registerLord++;
      rows.lord.push(base);
      bumpSlug(slug, "theLord");
    }
    if (YAHWEH.test(pl)) {
      stats.yahweh++;
      rows.yahweh.push(base);
      bumpSlug(slug, "yahweh");
    }
    if (BIBLE.test(pl)) {
      stats.bible++;
      rows.bible.push(base);
      bumpSlug(slug, "bible");
    }
    if (PSALMS.test(pl)) {
      stats.psalms++;
      rows.psalms.push(base);
      bumpSlug(slug, "psalms");
    }
    if (PASSOVER.test(pl)) {
      stats.passover++;
      rows.passover.push(base);
      bumpSlug(slug, "passover");
    }
    if (BAPTISM.test(pl)) {
      stats.baptism++;
      rows.baptism.push({ ...base, term: (pl.match(BAPTISM) || [])[0] });
      bumpSlug(slug, "baptism");
    }

    const leaks = hebrewLeakRuns(pl);
    if (leaks.length) {
      stats.hebrewLeak++;
      rows.hebrewLeak.push({ ...base, leaks: leaks.slice(0, 5) });
      bumpSlug(slug, "hebrewLeak");
    }

    const sev = collectSevere(pl);
    if (sev.length) {
      stats.severe++;
      rows.severe.push({ ...base, terms: sev });
      for (const t of sev) severeTerms[t] = (severeTerms[t] || 0) + 1;
      bumpSlug(slug, "severe");
    }
    if (FOREIGN.test(pl)) {
      const fm = pl.match(FOREIGN);
      if (fm && !isChallahFp(fm[0], pl, fm.index)) {
        stats.foreign++;
        rows.foreign.push({ ...base, term: fm[0] });
        bumpSlug(slug, "foreign");
      }
    }
    if (MUSLIM.test(pl)) {
      stats.muslim++;
      rows.muslim.push(base);
      bumpSlug(slug, "muslim");
    }
    if (EMDASH.test(raw)) {
      stats.emdash++;
      rows.emdash.push(base);
      bumpSlug(slug, "emdash");
    }
    if (MOJIBAKE.test(pl)) {
      stats.mojibake++;
      rows.mojibake.push(base);
      bumpSlug(slug, "mojibake");
    }
  }
}

/** Flag seif dirs with no slug children (orphan/stale shells). */
function scanEmptySeifs() {
  if (!fs.existsSync(CORPUS)) return;
  for (const sim of fs.readdirSync(CORPUS)) {
    if (!/^siman\d+$/i.test(sim)) continue;
    const simPath = path.join(CORPUS, sim);
    for (const seif of fs.readdirSync(simPath)) {
      if (!/^seif-\d+$/i.test(seif)) continue;
      const seifPath = path.join(simPath, seif);
      let slugs = [];
      try {
        slugs = fs
          .readdirSync(seifPath, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);
      } catch {
        continue;
      }
      if (slugs.length === 0) {
        layout.emptySeifDirs.push(`${sim}/${seif}`);
      }
    }
  }
}

if (!fs.existsSync(CORPUS)) {
  console.error("missing corpus", CORPUS);
  process.exit(1);
}
console.log("scanning", CORPUS);
scanLayoutRoot();
walk(CORPUS);
scanEmptySeifs();

// de-dupe pairing lists (walk visits both he and en)
function dedupePath(list) {
  const seen = new Set();
  return list.filter((r) => {
    const k = r.path;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
layout.enWithoutHe = dedupePath(layout.enWithoutHe);
layout.heWithoutEn = dedupePath(layout.heWithoutEn);

const summary = {
  generated_at: new Date().toISOString(),
  volume: "eh1",
  corpus: CORPUS,
  enFiles: stats.enFiles,
  simanim: stats.simanim.size,
  counts: {
    empty: stats.empty,
    placeholders: stats.placeholders,
    garbage: stats.garbage,
    theLord: stats.registerLord,
    Yahweh: stats.yahweh,
    theBible: stats.bible,
    Psalms: stats.psalms,
    Passover: stats.passover,
    baptism: stats.baptism,
    hebrewLeak: stats.hebrewLeak,
    severe_excl_challah_fp: stats.severe,
    foreign_excl_challah_fp: stats.foreign,
    muslim: stats.muslim,
    emdash: stats.emdash,
    mojibake: stats.mojibake,
  },
  layout: {
    unexpectedTopLevel: layout.unexpectedTopLevel.length,
    nonCanonicalEn: layout.nonCanonicalEn.length,
    enWithoutHe: layout.enWithoutHe.length,
    heWithoutEn: layout.heWithoutEn.length,
    emptySeifDirs: layout.emptySeifDirs.length,
    bundlesPresent: layout.bundlesPresent,
    bundleFiles: layout.bundleFiles,
  },
  garbage_term_histogram: Object.fromEntries(
    Object.entries(garbageTerms)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
  ),
  severe_term_histogram: Object.fromEntries(
    Object.entries(severeTerms)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
  ),
  top_slugs_by_defect: Object.entries(bySlug)
    .map(([slug, c]) => ({
      slug,
      theLord: c.theLord || 0,
      garbage: c.garbage || 0,
      severe: c.severe || 0,
      hebrewLeak: c.hebrewLeak || 0,
      baptism: c.baptism || 0,
      psalms: c.psalms || 0,
      passover: c.passover || 0,
      score:
        (c.theLord || 0) +
        (c.garbage || 0) +
        (c.severe || 0) +
        (c.hebrewLeak || 0) +
        (c.baptism || 0) +
        (c.psalms || 0) +
        (c.passover || 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.theLord - a.theLord)
    .slice(0, 25),
};

fs.mkdirSync(AUDIT, { recursive: true });
fs.writeFileSync(prefix + "_summary.json", JSON.stringify(summary, null, 2));
fs.writeFileSync(
  prefix + "_rows.json",
  JSON.stringify({ ...rows, layout }, null, 2)
);

function toCsv(list, extraCols = []) {
  const cols = ["siman", "seif", "slug", "path", ...extraCols];
  const esc = (s) => {
    const t = String(s ?? "");
    return /[",\r\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  };
  return (
    cols.join(",") +
    "\n" +
    list
      .map((r) =>
        cols
          .map((c) => {
            if (c === "leaks" || c === "terms") return esc(JSON.stringify(r[c] || []));
            return esc(r[c]);
          })
          .join(",")
      )
      .join("\n") +
    "\n"
  );
}

fs.writeFileSync(prefix + "_lord.csv", toCsv(rows.lord));
fs.writeFileSync(prefix + "_garbage.csv", toCsv(rows.garbage, ["term"]));
fs.writeFileSync(prefix + "_severe.csv", toCsv(rows.severe, ["terms"]));
fs.writeFileSync(prefix + "_hebrewLeak.csv", toCsv(rows.hebrewLeak, ["leaks"]));
fs.writeFileSync(prefix + "_baptism.csv", toCsv(rows.baptism, ["term"]));
fs.writeFileSync(prefix + "_bible.csv", toCsv(rows.bible));
fs.writeFileSync(prefix + "_psalms.csv", toCsv(rows.psalms));
fs.writeFileSync(prefix + "_passover.csv", toCsv(rows.passover));
fs.writeFileSync(prefix + "_yahweh.csv", toCsv(rows.yahweh));
fs.writeFileSync(prefix + "_placeholders.csv", toCsv(rows.placeholders));
fs.writeFileSync(prefix + "_foreign.csv", toCsv(rows.foreign, ["term"]));
fs.writeFileSync(prefix + "_empty.csv", toCsv(rows.empty));
fs.writeFileSync(
  prefix + "_layout.json",
  JSON.stringify(
    {
      unexpectedTopLevel: layout.unexpectedTopLevel,
      nonCanonicalEn: layout.nonCanonicalEn.slice(0, 500),
      enWithoutHe: layout.enWithoutHe.slice(0, 500),
      heWithoutEn: layout.heWithoutEn.slice(0, 500),
      emptySeifDirs: layout.emptySeifDirs.slice(0, 500),
      bundlesPresent: layout.bundlesPresent,
      bundleFiles: layout.bundleFiles,
    },
    null,
    2
  )
);

const md = `# EH1 in-depth quality scan — ${stamp}

**Volume:** Even HaEzer (\`eh1\`)  
**Corpus:** \`${CORPUS}\`  
**en.html files (canonical):** ${stats.enFiles.toLocaleString()} · **simanim:** ${stats.simanim.size}

## Counts

| Check | Count |
|------|------:|
| Placeholders | ${stats.placeholders} |
| Empty EN | ${stats.empty} |
| Garbage (GARBAGE_RE) | ${stats.garbage} |
| the Lord | ${stats.registerLord} |
| Yahweh | ${stats.yahweh} |
| the Bible | ${stats.bible} |
| Psalms | ${stats.psalms} |
| Passover | ${stats.passover} |
| baptism/baptize | ${stats.baptism} |
| HebrewLeak | ${stats.hebrewLeak} |
| Severe (excl ḥallah→allah FP) | ${stats.severe} |
| Foreign (excl challah FP) | ${stats.foreign} |
| Muslims (REVIEW) | ${stats.muslim} |
| Em/en-dash | ${stats.emdash} |
| Mojibake-ish | ${stats.mojibake} |

## Layout / orphan

| Check | Count |
|------|------:|
| Unexpected top-level dirs | ${layout.unexpectedTopLevel.length} |
| Non-canonical en.html | ${layout.nonCanonicalEn.length} |
| en without he | ${layout.enWithoutHe.length} |
| he without en | ${layout.heWithoutEn.length} |
| Empty seif dirs | ${layout.emptySeifDirs.length} |
| Bundles present | ${layout.bundlesPresent ? "yes" : "no"} (${layout.bundleFiles} files) |

## Top garbage terms
${
  Object.entries(garbageTerms)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([t, n]) => `- **${n}** \`${t}\``)
    .join("\n") || "_(none)_"
}

## Top severe terms
${
  Object.entries(severeTerms)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([t, n]) => `- **${n}** \`${t}\``)
    .join("\n") || "_(none)_"
}

## Top slugs (by defect score)
${
  summary.top_slugs_by_defect
    .slice(0, 15)
    .map(
      (s) =>
        `- **${s.slug}**: Lord ${s.theLord} · garbage ${s.garbage} · severe ${s.severe} · leak ${s.hebrewLeak} · baptism ${s.baptism} · Psalms ${s.psalms} · Passover ${s.passover}`
    )
    .join("\n") || "_(none)_"
}

## Artifacts
- \`${path.basename(prefix)}_summary.json\`
- \`${path.basename(prefix)}_rows.json\`
- \`${path.basename(prefix)}_layout.json\`
- CSV per category: \`_lord\`, \`_garbage\`, \`_severe\`, \`_hebrewLeak\`, \`_baptism\`, \`_foreign\`, …
`;

fs.writeFileSync(prefix + "_REPORT.md", md);
console.log(JSON.stringify({ counts: summary.counts, layout: summary.layout }, null, 2));
console.log("report", prefix + "_REPORT.md");
