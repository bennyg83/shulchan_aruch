/**
 * Scan CM1 mobile corpus en.html for residual MT garbage.
 *   node scan_cm1_corpus_mt.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../OC_Mobile/oc318-mobile-reader/public/corpus/cm1"
);
const OUT = path.join(__dirname, "cm1_corpus_mt_scan.json");

const PATTERNS = [
  { id: "the_Lord", re: /\bthe Lord\b/i },
  { id: "lords_prayer", re: /Lord['\u2019]s Prayer/i },
  { id: "hashems_word", re: /Hashem['\u2019]s Word/i },
  { id: "hashems_son", re: /Hashem['\u2019]s Son/i },
  { id: "hashems_people", re: /Hashem['\u2019]s people/i },
  { id: "the_bible", re: /\bthe Bible\b/i },
  { id: "yahweh", re: /\bYahweh\b/i },
  { id: "passover", re: /\bPassover\b/i },
  { id: "psalms", re: /\bPsalms?\b/i },
  { id: "new_testament", re: /New Testament/i },
  { id: "gospel", re: /\bgospel\b/i },
  { id: "church", re: /\bchurch(?:es)?\b/i },
  { id: "baptism", re: /\bbaptis(?:m|t|mal|ms)?\b|\bbaptiz(?:e|ed|es|ing)?\b/i },
  { id: "capernaum", re: /Capernaum/i },
  { id: "hand_recoils", re: /hand recoils/i },
  { id: "saturday", re: /\bSaturday\b/i },
  { id: "her_age", re: /\bher age\b/i },
  { id: "the_craft", re: /\bthe craft\b/i },
  { id: "first_dish", re: /\bfirst dish\b/i },
  { id: "pending", re: /English translation pending/i },
  { id: "mymemory", re: /MYMEMORY|QUERY LENGTH LIMIT/i },
  { id: "quran", re: /\b(?:koran|qur['\u2019]an)\b/i },
  { id: "apostle", re: /\bapostle\b/i },
  { id: "crucifix", re: /crucifix/i },
  { id: "islam", re: /\bislam(?:ic)?\b/i },
  { id: "vatican", re: /vatican/i },
  { id: "trinity", re: /\btrinity\b/i },
  { id: "abu_dhabi", re: /Abu Dhabi/i },
  { id: "click_here", re: /click here/i },
  { id: "hebrew_leak", re: /[\u0590-\u05FF]{2,}/ },
];

function* walkEn(dir) {
  const ents = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "bundles") continue;
      yield* walkEn(p);
    } else if (e.name === "en.html") {
      yield p;
    }
  }
}

if (!fs.existsSync(CORPUS)) {
  console.error("corpus missing", CORPUS);
  process.exit(1);
}

const bySlug = new Map();
const byPattern = new Map();
const samples = [];
let files = 0;
let dirty = 0;
let empty = 0;

for (const p of walkEn(CORPUS)) {
  files++;
  const rel = path.relative(CORPUS, p).split(path.sep).join("/");
  const parts = rel.split("/");
  const siman = parts[0];
  const seif = parts[1];
  const slug = parts[2];
  const en = fs.readFileSync(p, "utf8");
  if (!en.trim()) {
    empty++;
    continue;
  }
  const hits = [];
  for (const pat of PATTERNS) {
    if (pat.re.test(en)) hits.push(pat.id);
  }
  if (!hits.length) continue;
  dirty++;
  if (!bySlug.has(slug)) bySlug.set(slug, { dirty: 0, patterns: {} });
  const st = bySlug.get(slug);
  st.dirty++;
  for (const h of hits) {
    st.patterns[h] = (st.patterns[h] || 0) + 1;
    byPattern.set(h, (byPattern.get(h) || 0) + 1);
  }
  if (samples.length < 50) {
    samples.push({
      siman,
      seif,
      slug,
      hits,
      preview: en.replace(/\s+/g, " ").slice(0, 200),
    });
  }
}

const report = {
  generated_at: new Date().toISOString(),
  corpus: CORPUS,
  en_html_files: files,
  dirty_files: dirty,
  empty_files: empty,
  clean_files: files - dirty - empty,
  by_pattern: Object.fromEntries([...byPattern.entries()].sort((a, b) => b[1] - a[1])),
  by_slug: [...bySlug.entries()]
    .map(([slug, v]) => ({ slug, dirty: v.dirty, patterns: v.patterns }))
    .sort((a, b) => b.dirty - a.dirty),
  samples,
};
fs.writeFileSync(OUT, JSON.stringify(report, null, 2), "utf8");
console.log(
  JSON.stringify(
    {
      en_html_files: files,
      dirty_files: dirty,
      empty_files: empty,
      by_pattern: report.by_pattern,
      by_slug: report.by_slug.map((r) => ({ slug: r.slug, dirty: r.dirty })),
      report: OUT,
    },
    null,
    2
  )
);
