import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REVIEW = "c:/Users/binya/Downloads/HE_HAS_MORE_PACK_ALL_REVIEW.json";
const PACK = path.join(__dirname, "HE_HAS_MORE_PACK.json");
const EVAL = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json");

const review = JSON.parse(fs.readFileSync(REVIEW, "utf8"));
const pack = JSON.parse(fs.readFileSync(PACK, "utf8"));
const evalDoc = JSON.parse(fs.readFileSync(EVAL, "utf8"));
const byId = new Map(pack.cases.map((c) => [c.id, c]));
const revById = new Map(review.map((r) => [r.id, r]));
const evalById = new Map(evalDoc.results.map((r) => [r.id, r]));

function preview(s, n = 90) {
  const t = (s || "").replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function looksLikeContinuation(a, b) {
  // crude HE cues: starts lowercase continuation / ו / continuation particles / no new lemma head
  const b0 = (b || "").trim();
  const startsCont =
    /^(ו|דה|דהיינו|כלומר|פי'|פירוש|עכ"ל|עוד|היינו|אבל|אלא|מיהו|וגם|גם|כי|ש)/.test(b0);
  const aEndsMid = /[:,;־–—]$/.test((a || "").trim()) || /\.\.\.$/.test(a || "");
  const bHasLemmaHead = /^\([א-ת"'״׳0-9]+\)/.test(b0) || /^[א-ת]{1,4}"?[א-ת]\s/.test(b0);
  return { startsCont, aEndsMid, bHasLemmaHead };
}

function enHasSplitCue(en) {
  const t = en || "";
  const cues = [];
  if (/Likut|ליקוט|ליקוטי/i.test(t)) cues.push("likut");
  if (/<b>|<\/b>/.test(t)) cues.push("bold_tag");
  if (/\*\*/.test(t)) cues.push("md_bold");
  if (/\(\d+\)/.test(t)) cues.push("num_paren");
  if (/Note\s*\d|Seif\s*Katan|s\.v\.|sv\./i.test(t)) cues.push("note_label");
  if (/\[.*?\]/.test(t)) cues.push("bracket");
  if (/\n\n/.test(t)) cues.push("para_break");
  // multiple sentence-initial capitals after mid text
  const caps = t.match(/(?<=[.!?]\s+)[A-Z][a-z]/g);
  if (caps && caps.length >= 2) cues.push(`sent_caps:${caps.length}`);
  return cues;
}

// Curated sample across volumes/slugs + soft splits + editorial
const curated = [
  // oc1 merge
  "oc1/siman12/seif-001/ateret-zekenim",
  // yd1 merges
  "yd1/siman1/seif-001/beur-hagra",
  "yd1/siman35/seif-001/siftei-kohen",
  "yd1/siman87/seif-001/turei-zahav",
  // cm1 merges
  "cm1/siman1/seif-001/urim-vetumim-tumim",
  "cm1/siman12/seif-001/beur-hagra",
  "cm1/siman25/seif-001/beer-hagolah",
  "cm1/siman39/seif-001/meirat-einayim",
  // split_en yd1
  "yd1/siman105/seif-001/beur-hagra",
  "yd1/siman110/seif-001/beur-hagra",
  "yd1/siman123/seif-001/siftei-kohen",
  "yd1/siman130/seif-001/beur-hagra",
  // editorial holds
  "oc1/siman5/seif-001/ateret-zekenim",
  "yd1/siman2/seif-001/siftei-kohen",
  "cm1/siman3/seif-001/urim-vetumim-tumim",
];

// Fill from eval: diversify by (volume,slug,action)
function pickDiverse(n) {
  const buckets = new Map();
  for (const r of evalDoc.results) {
    const key = `${r.volume}|${r.slug}|${r.action}`;
    if (!buckets.has(key)) buckets.set(key, r.id);
  }
  return [...buckets.values()].slice(0, n);
}

const softIds = evalDoc.results
  .filter((r) => r.soft.some((s) => s.startsWith("SPLIT_MAY_NEED_MULTI")))
  .map((r) => r.id);

const sampleIds = [
  ...new Set([
    ...curated.filter((id) => byId.has(id)),
    ...softIds.slice(0, 5),
    ...pickDiverse(30),
  ]),
].slice(0, 28);

const spot = [];
for (const id of sampleIds) {
  const c = byId.get(id);
  const r = revById.get(id);
  const e = evalById.get(id);
  if (!c || !r) continue;
  const row = {
    id,
    action: r.action,
    classify: e.classify,
    heSegs: c.heSegs,
    enSegs: c.enSegs,
    deficit: c.heSegs - c.enSegs,
    soft: e.soft,
    notes: r.notes,
    judgment: null,
    detail: {},
  };

  if (r.action === "merge_groups") {
    const groups = r.merge_groups;
    const mergePairs = [];
    for (const g of groups) {
      if (g.length < 2) continue;
      for (let i = 0; i < g.length - 1; i++) {
        const a = c.he_segments[g[i]];
        const b = c.he_segments[g[i + 1]];
        const cue = looksLikeContinuation(a, b);
        mergePairs.push({
          indices: [g[i], g[i + 1]],
          cue,
          a: preview(a, 70),
          b: preview(b, 70),
        });
      }
    }
    row.detail = { groups, mergePairs, enPreviews: c.en_segments.map((s) => preview(s, 60)) };
    // heuristic judgment
    const suspicious = mergePairs.filter(
      (p) => p.cue.bHasLemmaHead && !p.cue.startsCont && !p.cue.aEndsMid
    );
    if (suspicious.length)
      row.judgment = "QUESTIONABLE_MERGE_possible_distinct_notes";
    else if (mergePairs.length === 0)
      row.judgment = "OK_trivial_partition";
    else row.judgment = "OK_plausible_continuation";
  } else if (r.action === "split_en") {
    const hints = r.split_hints || [];
    const hintDetails = hints.map((h) => {
      const en = c.en_segments[h.en_index] || "";
      return {
        en_index: h.en_index,
        note: h.note,
        cues: enHasSplitCue(en),
        en: preview(en, 100),
        enLen: en.length,
      };
    });
    row.detail = { hints: hintDetails };
    const weak = hintDetails.filter((h) => h.cues.length === 0);
    if (weak.length && e.soft.length)
      row.judgment = "WEAK_CUES_and_multi_piece_needed";
    else if (weak.length) row.judgment = "WEAK_VISIBLE_CUES_spotcheck";
    else if (e.soft.length) row.judgment = "OK_cues_but_needs_multi_piece_split";
    else row.judgment = "OK_clear_split_cues";
  } else {
    row.detail = {
      he0: preview(c.he_segments[0], 70),
      en0: preview(c.en_segments[0], 70),
    };
    row.judgment = "HOLD_as_labeled";
  }
  spot.push(row);
}

// counts of judgments
const jcounts = {};
for (const s of spot) jcounts[s.judgment] = (jcounts[s.judgment] || 0) + 1;

console.log("spot_n", spot.length);
console.log("judgments", jcounts);
console.log("\n=== SPOT CHECKS ===");
for (const s of spot) {
  console.log(
    "\n---",
    s.id,
    s.action,
    `he=${s.heSegs} en=${s.enSegs}`,
    s.judgment
  );
  console.log("notes:", s.notes);
  if (s.action === "merge_groups") {
    console.log("groups:", JSON.stringify(s.detail.groups));
    for (const p of s.detail.mergePairs.slice(0, 3)) {
      console.log(
        `  merge ${p.indices}: cue=${JSON.stringify(p.cue)}\n    A: ${p.a}\n    B: ${p.b}`
      );
    }
  } else if (s.action === "split_en") {
    for (const h of s.detail.hints) {
      console.log(
        `  en[${h.en_index}] cues=${h.cues.join(",") || "(none)"} note=${h.note}\n    ${h.en}`
      );
    }
    if (s.soft.length) console.log("  soft:", s.soft.join(" | "));
  }
}

const outPath = path.join(__dirname, "HE_HAS_MORE_PACK_ALL_REVIEW_SPOTCHECK.json");
fs.writeFileSync(
  outPath,
  JSON.stringify(
    {
      meta: { created: new Date().toISOString(), n: spot.length, judgments: jcounts },
      spot,
    },
    null,
    2
  )
);
console.log("\nWrote", outPath);

// Also list all soft multi-piece split ids
console.log("\nAll multi-piece soft splits:");
for (const id of softIds) {
  const c = byId.get(id);
  const r = revById.get(id);
  console.log(
    id,
    `deficit=${c.heSegs - c.enSegs}`,
    `hints=${r.split_hints.length}`,
    r.split_hints.map((h) => h.en_index)
  );
}
