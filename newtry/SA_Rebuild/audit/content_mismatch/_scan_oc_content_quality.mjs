/**
 * OC1 content-quality scan — cut/truncated Mechaber EN, Rama issues,
 * MT failure patterns, HTML/JSON leaks, title-only EN.
 *
 * Seed case: oc1/siman244/seif-001/mechaber
 *
 * Usage (from repo root or this dir):
 *   node newtry/SA_Rebuild/audit/content_mismatch/_scan_oc_content_quality.mjs
 *   node _scan_oc_content_quality.mjs --slugs mechaber
 *   node _scan_oc_content_quality.mjs --slugs mechaber,rama --max-simanim 50
 *
 * Writes under this directory:
 *   OC_CONTENT_SCAN_YYYY-MM-DD.json
 *   OC_CONTENT_SCAN_YYYY-MM-DD.md
 *   OC_MECHABER_CUT_EN_KIT.json
 *   OC_MECHABER_CUT_EN_KIT.zip (if manageable)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../../..");
const CORPUS_OC1 = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1"
);
const OUT_DIR = __dirname;
const SCAN_DATE = "2026-08-30";

const SEED_ID = "oc1/siman244/seif-001/mechaber";

/** EN/HE plain-char ratio below this → cut candidate (HE denser; EN usually longer). */
const CUT_RATIO_STRICT = 0.55;
const CUT_RATIO_LOOSE = 0.75;
const MIN_HE_CHARS_FOR_CUT = 120;
const MIN_HE_CHARS_TITLE = 80;
const TITLE_EN_MAX = 90;
const KIT_MAX_CASES = 120;
const ZIP_MAX_CASES = 120;

const FAILURE_PATTERNS = [
  { id: "danny", re: /\bDanny'?s?\b/i },
  { id: "dinliness", re: /\bdinliness\b/i },
  { id: "circumcised_wrong", re: /\bcircumcised\b/i },
  { id: "lords_prayer", re: /Lord'?s\s+Prayer/i },
  { id: "saturday", re: /\bSaturday\b/i },
  { id: "hand_recoils", re: /hand\s+recoils/i },
  { id: "disgusted_hand", re: /disgusted\s+hand/i },
  { id: "hand_scared", re: /hand\s+scared/i },
  { id: "the_craft", re: /\bthe\s+craft\b/i },
  { id: "her_age", re: /\bher\s+age\b/i },
  { id: "first_dish", re: /\bfirst\s+dish\b/i },
  { id: "second_dish", re: /\bsecond\s+dish\b/i },
  { id: "third_dish", re: /\bthird\s+dish\b/i },
  { id: "allocated_muktzeh", re: /\ballocated\b/i },
  { id: "hashems_word", re: /Hashem'?s\s+Word/i },
  { id: "glory_barbarism", re: /glory\s+of\s+the\s+barbarism/i },
  { id: "holy_person", re: /\bholy\s+person\b/i },
  { id: "the_beast", re: /\bthe\s+beast\b/i },
  { id: "darbanan", re: /\bDarbanan\b/ },
  { id: "ovary", re: /\bovary\b/i },
  { id: "murder_and_murder", re: /murder\s+and\s+murder/i },
  { id: "grows_and_goes", re: /grows\s+and\s+goes/i },
  { id: "to_the_world", re: /\bto\s+the\s+world\b/i },
  { id: "cold_spot", re: /cold\s+spot/i },
  { id: "eastern_crack", re: /eastern\s+crack/i },
  { id: "the_cauldron", re: /\bthe\s+cauldron\b/i },
  { id: "brewer", re: /\bbrewer\b/i },
  { id: "shabbat_nights", re: /Shabbat\s+nights/i },
  { id: "shield_of_abraham", re: /Shield\s+of\s+Abraham/i },
  { id: "golden_rows", re: /Golden\s+Rows/i },
  { id: "house_of_joseph", re: /House\s+of\s+Joseph/i },
  { id: "maimonides", re: /\bMaimonides\b/ },
  { id: "nachmanides", re: /\bNachmanides\b/ },
  { id: "nichom_lia", re: /Nichom\s+Lia/i },
  { id: "history_of_light", re: /history\s+of\s+(the\s+)?light/i },
  { id: "history_of_the_sun", re: /history\s+of\s+the\s+sun/i },
  { id: "i_shoot_at_a_fire", re: /I\s+shoot\s+at\s+a\s+fire/i },
  { id: "shrinking_and_good", re: /shrinking\s+and\s+good/i },
  { id: "english_pending", re: /English\s+translation\s+pending/i },
  { id: "capernaum", re: /\bCapernaum\b/i },
  { id: "passover_junk", re: /\bPassover\b/i },
  { id: "yahweh", re: /\bYahweh\b/i },
  { id: "the_bible", re: /\bthe\s+Bible\b/i },
  { id: "new_testament", re: /New\s+Testament/i },
  { id: "abu_dhabi", re: /Abu\s+Dhabi/i },
];

const MID_CLAUSE_END =
  /\b(and|or|the|a|an|of|to|for|with|that|which|who|when|if|but|as|in|on|by|from|into|than|then|also|even|whether|because|since|while|until|without|about|between|among|under|over|before|after|such|so|not|nor|yet)\s*[,:;]?\s*$/i;

function parseArgs(argv) {
  const out = {
    slugs: ["mechaber"], // default mechaber-first; expand via --slugs all
    maxSimanim: null,
    cutRatioStrict: CUT_RATIO_STRICT,
    cutRatioLoose: CUT_RATIO_LOOSE,
    includeAllSlugsCheap: true, // also scan non-mechaber for cheap flags only
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--slugs") {
      const v = next();
      out.slugs =
        v === "all"
          ? ["*"]
          : v.split(",").map((s) => s.trim()).filter(Boolean);
    } else if (a === "--max-simanim") out.maxSimanim = parseInt(next(), 10);
    else if (a === "--cut-ratio-strict")
      out.cutRatioStrict = parseFloat(next());
    else if (a === "--cut-ratio-loose") out.cutRatioLoose = parseFloat(next());
    else if (a === "--no-expand") out.includeAllSlugsCheap = false;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node _scan_oc_content_quality.mjs [options]
  --slugs mechaber|mechaber,rama|all
  --max-simanim N
  --cut-ratio-strict 0.55
  --cut-ratio-loose 0.75
  --no-expand`);
      process.exit(0);
    }
  }
  return out;
}

function stripHtml(html) {
  return String(html ?? "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function snippet(s, n = 160) {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n) + "…";
}

function hebrewCharCount(s) {
  return (String(s).match(/[\u0590-\u05FF]/g) || []).length;
}

function hebrewRatio(s) {
  const t = String(s ?? "").replace(/\s+/g, "");
  if (!t.length) return 0;
  return hebrewCharCount(t) / t.length;
}

function hasHagah(heHtml) {
  // <small>הגה… or bare הגה after punctuation/space
  if (/<small[^>]*>\s*הגה/i.test(heHtml)) return true;
  if (/(?:^|[>\s:;\.])הגה(?:\s|<)/.test(heHtml)) return true;
  const plain = stripHtml(heHtml);
  return /(?:^|[\s:;\.])הגה(?:\s|$)/.test(plain);
}

function countHagahBlocks(heHtml) {
  const small = (heHtml.match(/<small[^>]*>\s*הגה/gi) || []).length;
  if (small > 0) return small;
  const plain = stripHtml(heHtml);
  return (plain.match(/(?:^|[\s:;\.])הגה(?:\s|$)/g) || []).length;
}

function countRamaBraces(enPlain) {
  return (enPlain.match(/\{Rama\s*:/gi) || []).length;
}

function looksLikeTitleOnly(enPlain, hePlain) {
  if (!enPlain || enPlain.length > TITLE_EN_MAX) return false;
  if (hePlain.length < MIN_HE_CHARS_TITLE) return false;
  // Title-ish: short, often ends with colon or "sections" / seifim count
  const titleish =
    /:\s*$/.test(enPlain) ||
    /\b(sections?|seifim|laws?)\s*:?\s*$/i.test(enPlain) ||
    /^[^.]{10,90}$/.test(enPlain);
  // HE continues past a short title (has body after first colon / long text)
  const heBody = hePlain.length > enPlain.length * 2.5;
  return titleish && heBody;
}

function endsMidClause(enPlain) {
  if (!enPlain || enPlain.length < 40) return false;
  if (/[.!?]["']?\s*$/.test(enPlain)) return false;
  if (/\}]\s*$/.test(enPlain)) return false; // ends inside closed Rama ok-ish
  if (/[.!]}\s*$/.test(enPlain)) return false;
  // ends with open brace / incomplete
  if (/\{Rama:\s*$/i.test(enPlain)) return true;
  if (/\{\s*$/.test(enPlain)) return true;
  if (MID_CLAUSE_END.test(enPlain)) return true;
  // trailing conjunction without period
  if (/,(\s*\{Rama:)?\s*$/i.test(enPlain.replace(/\s*\{Rama:[\s\S]*$/, "")))
    return true;
  return false;
}

function detectLeaks(enRaw, enPlain) {
  const flags = [];
  // JSON / stringified-array dumps (Danny case style)
  if (/\[\s*"/.test(enRaw) || /\["/.test(enRaw)) flags.push("json_array_leak");
  if (/\\+"/.test(enRaw) && (enRaw.match(/\\+"/g) || []).length >= 3)
    flags.push("escaped_quote_spam");
  // HE hagah shell wrongly left in EN (corpus EN uses {Rama:} / Rema:, not <small>הגה)
  if (/<small[^>]*>\s*הגה/i.test(enRaw)) flags.push("he_hagah_html_in_en");
  // Bold/italic dumps that are mostly Hebrew (not empty note-anchor tags)
  const heInTags = [
    ...enRaw.matchAll(
      /<(?:b|i|strong|em|small)[^>]*>([\s\S]*?)<\/(?:b|i|strong|em|small)>/gi
    ),
  ];
  for (const m of heInTags) {
    const inner = m[1];
    if (hebrewRatio(stripHtml(inner)) > 0.4 && hebrewCharCount(inner) >= 8) {
      flags.push("hebrew_html_dump");
      break;
    }
  }
  // Hebrew letters in visible EN prose (ignore empty anchor tags already stripped)
  if (hebrewRatio(enPlain) > 0.18 && hebrewCharCount(enPlain) >= 12)
    flags.push("hebrew_in_en");
  const entityHits = (enRaw.match(/&(?:lt|gt|quot|#\d+|#x[0-9a-f]+);/gi) || [])
    .length;
  if (entityHits >= 3) flags.push("html_entities_leak");
  if (/\bnull\b|\bundefined\b|English translation pending/i.test(enPlain))
    flags.push("placeholder_leak");
  return flags;
}

/** Plain HE text after last <small>הגה…</small> block (Mechaber continuation). */
function hePostRamaPlain(heHtml) {
  const re = /<small[^>]*>\s*הגה[\s\S]*?<\/small>/gi;
  let lastEnd = -1;
  let m;
  while ((m = re.exec(heHtml)) !== null) lastEnd = m.index + m[0].length;
  if (lastEnd < 0) return "";
  return stripHtml(heHtml.slice(lastEnd));
}

/** EN text after the last closed {Rama:…} (or empty if Rama is terminal). */
function enPostRamaPlain(enPlain) {
  const re = /\{Rama\s*:[\s\S]*?\}/gi;
  let lastEnd = -1;
  let m;
  while ((m = re.exec(enPlain)) !== null) lastEnd = m.index + m[0].length;
  if (lastEnd < 0) {
    // Bare Rema: … — take after last Rema/Rama label clause roughly
    const bare = [...enPlain.matchAll(/\bRe?ma\s*:/gi)];
    if (!bare.length) return enPlain;
    const last = bare[bare.length - 1];
    return enPlain.slice(last.index).replace(/^\s*Re?ma\s*:[^]*?(?=\s+Re?ma\s*:|$)/i, "").trim();
  }
  return enPlain.slice(lastEnd).trim();
}

function extractHeSimanCrossRefs(hePlain) {
  // ע"ל סי' תקל"ז / סי׳ 244 / סי' תקמ"ה
  const refs = [];
  const re =
    /(?:ע["״]?ל\s*)?סי['׳"״]?\s*([א-ת"״']+|\d+)/g;
  let m;
  while ((m = re.exec(hePlain)) !== null) {
    refs.push(m[1].replace(/["״']/g, ""));
  }
  return refs;
}

function hebLettersToInt(s) {
  const map = {
    א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10,
    כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60, ע: 70,
    פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200, ש: 300, ת: 400,
  };
  let n = 0;
  for (const ch of s) {
    if (map[ch]) n += map[ch];
    else if (/\d/.test(ch)) return parseInt(s, 10) || null;
  }
  return n || null;
}

function detectMissingCrossRefs(hePlain, enPlain) {
  // Only explicit "see above siman" style refs
  const refs = [];
  const re =
    /ע["״]?ל\s*סי['׳"״]?\s*([א-ת"״']+|\d+)/g;
  let m;
  while ((m = re.exec(hePlain)) !== null) {
    refs.push(m[1].replace(/["״']/g, ""));
  }
  const missing = [];
  for (const r of refs) {
    const num = hebLettersToInt(r);
    if (!num || num < 1 || num > 999) continue;
    if (!enPlain.includes(String(num))) missing.push(num);
  }
  return [...new Set(missing)];
}

function detectRamaIssues(heHtml, enRaw, enPlain) {
  const issues = [];
  const heHas = hasHagah(heHtml);
  const heCount = heHas ? countHagahBlocks(heHtml) : 0;
  const ramaCount = countRamaBraces(enPlain);
  const hasBareRema = /\bRe?ma\s*:/.test(enPlain);

  if (/\{Rama:\s*RAMA\s*:/i.test(enPlain) || /\{Rama:\s*Rama\s*:/i.test(enPlain))
    issues.push("rama_duplicate_prefix");
  // ALL-CAPS RAMA: outside the duplicate-prefix pattern
  if (/\bRAMA\s*:/.test(enPlain) && !/\{Rama:\s*RAMA\s*:/i.test(enPlain))
    issues.push("rama_outside_braces");
  if (/\(Rama\s*:/i.test(enPlain) || /\[Rama\s*:/i.test(enPlain))
    issues.push("rama_wrong_wrapper");

  if (heHas && ramaCount === 0 && !hasBareRema)
    issues.push("rama_he_hagah_unreflected");
  else if (heHas && ramaCount === 0 && hasBareRema)
    issues.push("rama_bare_rema_not_braced"); // common corpus style; lower severity

  if (heHas && ramaCount > 0 && ramaCount < heCount)
    issues.push("rama_partial_missing");
  if (!heHas && ramaCount > 0) issues.push("rama_spurious");

  // Placement: HE continues after הגה, but EN's Rama is last (no/little post-Rama EN)
  const postHe = hePostRamaPlain(heHtml);
  const postEn = enPostRamaPlain(enPlain);
  if (postHe.length >= 60) {
    const postRatio = postHe.length > 0 ? postEn.length / postHe.length : 1;
    if (postEn.length < 40 || postRatio < 0.45) {
      issues.push("rama_placement_or_cut_post_rama");
    }
  }

  return { heHas, heCount, ramaCount, postHeLen: postHe.length, postEnLen: postEn.length, issues };
}

function detectFailures(enPlain) {
  const hits = [];
  for (const p of FAILURE_PATTERNS) {
    if (p.re.test(enPlain)) hits.push(p.id);
  }
  return hits;
}

function severityFor(kinds, scores) {
  let s = 0;
  for (const k of kinds) {
    if (k === "cut_en_strict") s += 8;
    else if (k === "cut_en_loose") s += 5;
    else if (k === "cut_post_rama") s += 7;
    else if (k === "rama_placement_or_cut_post_rama") s += 7;
    else if (k === "missing_cross_ref") s += 4;
    else if (k === "ends_mid_clause") s += 4;
    else if (k === "title_only") s += 7;
    else if (k === "rama_duplicate_prefix") s += 6;
    else if (k === "rama_he_hagah_unreflected") s += 6;
    else if (k === "rama_outside_braces") s += 4;
    else if (k === "rama_partial_missing") s += 4;
    else if (k === "rama_wrong_wrapper") s += 3;
    else if (k === "rama_bare_rema_not_braced") s += 1; // style debt, low
    else if (k === "mt_garbage") s += 9;
    else if (k === "html_json_leak") s += 8;
    else if (k === "hebrew_in_en") s += 5;
    else if (k === "seed_confirmed") s += 10;
    else s += 2;
  }
  s += Math.min(5, Math.round((scores.cut_deficit || 0) * 4));
  return s;
}

function walkCells(corpusRoot, opts) {
  const cells = [];
  const simanDirs = fs
    .readdirSync(corpusRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^siman\d+$/i.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      return na - nb;
    });

  let simanCount = 0;
  for (const siman of simanDirs) {
    if (opts.maxSimanim != null && simanCount >= opts.maxSimanim) break;
    simanCount++;
    const simanPath = path.join(corpusRoot, siman);
    let seifs;
    try {
      seifs = fs.readdirSync(simanPath, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const seifEnt of seifs) {
      if (!seifEnt.isDirectory() || !/^seif-/i.test(seifEnt.name)) continue;
      const seifPath = path.join(simanPath, seifEnt.name);
      let slugs;
      try {
        slugs = fs.readdirSync(seifPath, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const slugEnt of slugs) {
        if (!slugEnt.isDirectory()) continue;
        const slug = slugEnt.name;
        const fullPass =
          opts.slugs.includes("*") || opts.slugs.includes(slug);
        const cheapPass = opts.includeAllSlugsCheap && !fullPass;
        if (!fullPass && !cheapPass) continue;
        const cellPath = path.join(seifPath, slug);
        const hePath = path.join(cellPath, "he.html");
        const enPath = path.join(cellPath, "en.html");
        if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) continue;
        cells.push({
          id: `oc1/${siman}/${seifEnt.name}/${slug}`,
          slug,
          hePath,
          enPath,
          fullPass,
        });
      }
    }
  }
  return cells;
}

function analyzeCell(cell, opts) {
  const heRaw = fs.readFileSync(cell.hePath, "utf8");
  const enRaw = fs.readFileSync(cell.enPath, "utf8");
  const hePlain = stripHtml(heRaw);
  const enPlain = stripHtml(enRaw);
  const heChars = hePlain.length;
  const enChars = enPlain.length;
  const ratio = heChars > 0 ? enChars / heChars : enChars > 0 ? 99 : 1;

  const kinds = [];
  const scores = {
    en_he_ratio: Math.round(ratio * 1000) / 1000,
    he_chars: heChars,
    en_chars: enChars,
    cut_deficit: heChars > 0 ? Math.max(0, 1 - ratio) : 0,
  };
  const details = {};

  // Full analysis for mechaber (and explicitly requested slugs)
  if (cell.fullPass) {
    if (
      heChars >= MIN_HE_CHARS_FOR_CUT &&
      ratio < opts.cutRatioStrict &&
      enChars > 0
    ) {
      kinds.push("cut_en_strict");
    } else if (
      heChars >= MIN_HE_CHARS_FOR_CUT &&
      ratio < opts.cutRatioLoose &&
      enChars > 0
    ) {
      kinds.push("cut_en_loose");
    }
    if (enChars === 0 && heChars > 40) kinds.push("cut_en_strict");

    if (endsMidClause(enPlain) && heChars > enChars) {
      kinds.push("ends_mid_clause");
    }
    if (looksLikeTitleOnly(enPlain, hePlain)) kinds.push("title_only");
  }

  // Rama — especially important on mechaber; also cheap on all
  const rama = detectRamaIssues(heRaw, enRaw, enPlain);
  details.rama = {
    he_hagah: rama.heHas,
    he_hagah_count: rama.heCount,
    en_rama_braces: rama.ramaCount,
    post_rama_he_chars: rama.postHeLen,
    post_rama_en_chars: rama.postEnLen,
  };
  const strongRama = new Set([
    "rama_duplicate_prefix",
    "rama_outside_braces",
  ]);
  // Post-rama cut + unreflected hagah are meaningful mainly on mechaber (full pass)
  const fullOnlyRama = new Set([
    "rama_he_hagah_unreflected",
    "rama_placement_or_cut_post_rama",
    "rama_partial_missing",
    "rama_bare_rema_not_braced",
    "rama_spurious",
    "rama_wrong_wrapper",
  ]);
  for (const iss of rama.issues) {
    if (fullOnlyRama.has(iss) && !cell.fullPass) continue;
    if (!cell.fullPass && !strongRama.has(iss)) continue;
    kinds.push(iss);
    if (iss === "rama_placement_or_cut_post_rama") kinds.push("cut_post_rama");
  }

  // Missing HE cross-refs in EN (full pass — mechaber)
  if (cell.fullPass) {
    const missingRefs = detectMissingCrossRefs(hePlain, enPlain);
    if (missingRefs.length) {
      kinds.push("missing_cross_ref");
      details.missing_siman_refs = missingRefs;
    }
  }

  // MT garbage — all cells (cheap)
  const fails = detectFailures(enPlain);
  if (fails.length) {
    kinds.push("mt_garbage");
    details.failure_patterns = fails;
  }

  // Leaks — all cells
  const leaks = detectLeaks(enRaw, enPlain);
  if (leaks.length) {
    kinds.push("html_json_leak");
    details.leaks = leaks;
    if (leaks.includes("hebrew_in_en")) kinds.push("hebrew_in_en");
  }

  if (cell.id === SEED_ID) kinds.push("seed_confirmed");

  // Dedup kinds
  const uniqKinds = [...new Set(kinds)];
  if (!uniqKinds.length) return null;

  const severity = severityFor(uniqKinds, scores);
  return {
    id: cell.id,
    slug: cell.slug,
    kinds: uniqKinds,
    severity,
    scores,
    details,
    snippets: {
      he: snippet(hePlain, 220),
      en: snippet(enPlain, 220),
    },
    he_plain_full: null, // filled only for kit
    en_plain_full: null,
    he_html: null,
    en_html: null,
  };
}

function loadPriorFlags() {
  const candidates = [
    path.join(OUT_DIR, "CONTENT_FIX_FLAGS.json"),
    path.join(OUT_DIR, "CONTENT_FIX_FLAGS.md"),
  ];
  const prior = { path: null, entries: [] };
  for (const p of candidates) {
    if (!fs.existsSync(p)) continue;
    prior.path = p;
    if (p.endsWith(".json")) {
      try {
        const j = JSON.parse(fs.readFileSync(p, "utf8"));
        const arr = Array.isArray(j) ? j : j.flags || j.entries || [];
        prior.entries = arr;
      } catch {
        /* ignore */
      }
    }
    break;
  }
  return prior;
}

/** Fix prior-flag load: map path-style entries to corpus ids when present. */
function priorMentionsSeed(prior) {
  return prior.entries.some((e) => {
    const blob = JSON.stringify(e);
    return (
      blob.includes("siman244") ||
      blob.includes("244:1") ||
      blob.includes("244-1") ||
      blob.includes(SEED_ID)
    );
  });
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  console.log(`[SCAN] corpus=${CORPUS_OC1}`);
  console.log(
    `[SCAN] slugs=${opts.slugs.join(",")} expandCheap=${opts.includeAllSlugsCheap}`
  );

  if (!fs.existsSync(CORPUS_OC1)) {
    console.error(`[ERROR] corpus not found: ${CORPUS_OC1}`);
    process.exit(1);
  }

  const cells = walkCells(CORPUS_OC1, opts);
  console.log(`[SCAN] cells to read: ${cells.length}`);

  const flagged = [];
  let i = 0;
  for (const cell of cells) {
    i++;
    if (i % 2000 === 0) console.log(`[SCAN] progress ${i}/${cells.length}`);
    try {
      const hit = analyzeCell(cell, opts);
      if (hit) flagged.push(hit);
    } catch (e) {
      console.warn(`[WARN] ${cell.id}: ${e.message}`);
    }
  }

  flagged.sort((a, b) => b.severity - a.severity || a.id.localeCompare(b.id));

  // Merge prior CONTENT_FIX_FLAGS seed
  const prior = loadPriorFlags();
  let seedInList = flagged.some((f) => f.id === SEED_ID);
  if (!seedInList) {
    // force-analyze seed
    const seedPath = path.join(
      CORPUS_OC1,
      "siman244",
      "seif-001",
      "mechaber"
    );
    if (fs.existsSync(path.join(seedPath, "he.html"))) {
      const hit = analyzeCell(
        {
          id: SEED_ID,
          slug: "mechaber",
          hePath: path.join(seedPath, "he.html"),
          enPath: path.join(seedPath, "en.html"),
          fullPass: true,
        },
        opts
      );
      if (hit) {
        flagged.unshift(hit);
        seedInList = true;
      }
    }
  }
  // Ensure seed marked confirmed + merge prior-flag note
  for (const f of flagged) {
    if (f.id === SEED_ID) {
      if (!f.kinds.includes("seed_confirmed")) f.kinds.push("seed_confirmed");
      f.details = f.details || {};
      f.details.prior_flag =
        "CONTENT_FIX_FLAGS.json → oc1-mechaber-244-1-cut-en-rama-display (confirmed)";
      f.severity = severityFor(f.kinds, f.scores);
    }
  }
  // Drop ultra-low-signal bare-Rema-only rows from flagged list
  let bareOnlyCount = 0;
  for (let i = flagged.length - 1; i >= 0; i--) {
    const f = flagged[i];
    if (f.kinds.length === 1 && f.kinds[0] === "rama_bare_rema_not_braced") {
      bareOnlyCount++;
      flagged.splice(i, 1);
    }
  }
  flagged.sort((a, b) => b.severity - a.severity || a.id.localeCompare(b.id));

  const byKind = {};
  for (const f of flagged) {
    for (const k of f.kinds) byKind[k] = (byKind[k] || 0) + 1;
  }
  if (bareOnlyCount) byKind.rama_bare_rema_only_dropped = bareOnlyCount;

  const mechaberCut = flagged.filter(
    (f) =>
      f.slug === "mechaber" &&
      (f.kinds.includes("cut_en_strict") ||
        f.kinds.includes("cut_en_loose") ||
        f.kinds.includes("cut_post_rama") ||
        f.kinds.includes("rama_placement_or_cut_post_rama") ||
        f.kinds.includes("title_only") ||
        f.kinds.includes("ends_mid_clause"))
  );

  // High-priority kit: cut mechaber strict first, then loose+rama, seed always
  const kitIds = new Set();
  const kitCases = [];

  function addKit(f, priority) {
    if (kitIds.has(f.id)) return;
    if (kitCases.length >= KIT_MAX_CASES && f.id !== SEED_ID) return;
    kitIds.add(f.id);
    const hePath = path.join(REPO, "newtry/OC_Mobile/oc318-mobile-reader/public/corpus", f.id, "he.html");
    const enPath = path.join(REPO, "newtry/OC_Mobile/oc318-mobile-reader/public/corpus", f.id, "en.html");
    const heHtml = fs.readFileSync(hePath, "utf8");
    const enHtml = fs.readFileSync(enPath, "utf8");
    kitCases.push({
      id: f.id,
      slug: f.slug,
      priority,
      kinds: f.kinds,
      severity: f.severity,
      scores: f.scores,
      details: f.details,
      he_html: heHtml,
      en_html: enHtml,
      he_plain: stripHtml(heHtml),
      en_plain: stripHtml(enHtml),
      instruction:
        "Retranslate EN completely from HE. Preserve {Rama: ...} for הגה. No duplicate RAMA: prefix. Do not omit clauses after Rama. Edit EN only.",
    });
  }

  // Seed first
  const seed = flagged.find((f) => f.id === SEED_ID);
  if (seed) addKit(seed, "P0_seed");

  for (const f of mechaberCut.filter((x) => x.kinds.includes("cut_en_strict")))
    addKit(f, "P1_cut_strict");
  for (const f of mechaberCut.filter(
    (x) =>
      x.kinds.includes("cut_post_rama") ||
      x.kinds.includes("rama_placement_or_cut_post_rama")
  ))
    addKit(f, "P1_cut_post_rama");
  for (const f of mechaberCut.filter((x) => x.kinds.includes("title_only")))
    addKit(f, "P1_title_only");
  for (const f of mechaberCut.filter((x) => x.kinds.includes("cut_en_loose")))
    addKit(f, "P2_cut_loose");
  for (const f of flagged.filter(
    (x) =>
      x.slug === "mechaber" &&
      (x.kinds.includes("rama_duplicate_prefix") ||
        x.kinds.includes("rama_he_hagah_unreflected"))
  ))
    addKit(f, "P2_rama");

  const report = {
    meta: {
      date: SCAN_DATE,
      volume: "oc1",
      corpus: "newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1",
      seed: SEED_ID,
      seed_confirmed: seedInList,
      thresholds: {
        cut_ratio_strict: opts.cutRatioStrict,
        cut_ratio_loose: opts.cutRatioLoose,
        min_he_chars_for_cut: MIN_HE_CHARS_FOR_CUT,
      },
      cells_scanned: cells.length,
      flagged_count: flagged.length,
      mechaber_cut_candidates: mechaberCut.length,
      prior_flags_merged: prior.path
        ? {
            path: path.relative(REPO, prior.path).replace(/\\/g, "/"),
            count: prior.entries.length,
            seed_244_1_in_prior: priorMentionsSeed(prior),
          }
        : null,
      generated_at: new Date().toISOString(),
    },
    counts_by_kind: byKind,
    top_severity: flagged.slice(0, 40).map((f) => ({
      id: f.id,
      severity: f.severity,
      kinds: f.kinds,
      ratio: f.scores.en_he_ratio,
      en_chars: f.scores.en_chars,
      he_chars: f.scores.he_chars,
      en_snippet: f.snippets.en,
    })),
    flagged,
  };

  // Merge prior OC 244:1 note if present
  if (prior.entries.length) {
    report.meta.prior_flag_ids = prior.entries.map((e) => e.id || e.path).filter(Boolean);
  }

  const jsonPath = path.join(OUT_DIR, `OC_CONTENT_SCAN_${SCAN_DATE}.json`);
  const mdPath = path.join(OUT_DIR, `OC_CONTENT_SCAN_${SCAN_DATE}.md`);
  const kitPath = path.join(OUT_DIR, "OC_MECHABER_CUT_EN_KIT.json");

  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");

  const kit = {
    meta: {
      date: SCAN_DATE,
      purpose:
        "Highest-priority cut/incomplete Mechaber EN (+ related Rama) for GPT/editorial retranslate",
      seed: SEED_ID,
      seed_confirmed: seedInList,
      case_count: kitCases.length,
      note: "he_html/en_html/he_plain/en_plain are COMPLETE — no truncation",
    },
    prompt: `OC MECHABER CUT-EN FIX KIT (${SCAN_DATE})

For each case: replace EN entirely from HE.
Rules: completeness; no additions; {Rama: ...} for הגה (never {Rama: RAMA:}; never omit post-Rama Mechaber clauses); expand abbreviations; dictionary halachic terms; plain EN only.

Return JSON array: [{ "id": "...", "new_en": "..." }, ...]
`,
    cases: kitCases,
  };
  fs.writeFileSync(kitPath, JSON.stringify(kit, null, 2), "utf8");

  // Markdown summary
  const kindRows = Object.entries(byKind)
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `| ${k} | ${n} |`)
    .join("\n");

  const topRows = report.top_severity
    .slice(0, 25)
    .map(
      (t, idx) =>
        `| ${idx + 1} | ${t.severity} | \`${t.id}\` | ${t.kinds.join(", ")} | ${t.ratio} |`
    )
    .join("\n");

  const md = `# OC Content Quality Scan — ${SCAN_DATE}

## Scope
- Volume: **oc1** only
- Corpus: \`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/\`
- Pass: mechaber full analysis + cheap expand (MT/Rama/leaks) across other slugs
- Corpus not modified (scan + kit only)

## Seed
- \`${SEED_ID}\` — **${seedInList ? "CONFIRMED in flagged list" : "MISSING — investigate"}**
- Known: HE full; EN truncated/incomplete; \`{Rama: RAMA:\` duplicate; Rama placement / missing clauses

## Counts
| Metric | Value |
|--------|------:|
| Cells scanned | ${cells.length} |
| Flagged cells | ${flagged.length} |
| Mechaber cut-EN candidates | ${mechaberCut.length} |
| Kit cases (GPT-ready) | ${kitCases.length} |

## Counts by kind
| Kind | Count |
|------|------:|
${kindRows}

## Top severity (25)
| # | Sev | Id | Kinds | EN/HE ratio |
|--:|----:|----|-------|------------:|
${topRows}

## Outputs
- \`OC_CONTENT_SCAN_${SCAN_DATE}.json\`
- \`OC_CONTENT_SCAN_${SCAN_DATE}.md\`
- \`OC_MECHABER_CUT_EN_KIT.json\` (${kitCases.length} cases, full HE+EN)

## Next
Editorial/GPT pass on kit; do not apply until reviewed.
`;

  fs.writeFileSync(mdPath, md, "utf8");

  // Optional zip if manageable
  let zipPath = null;
  if (kitCases.length > 0 && kitCases.length <= ZIP_MAX_CASES) {
    zipPath = path.join(OUT_DIR, "OC_MECHABER_CUT_EN_KIT.zip");
    try {
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      // Prefer PowerShell Compress-Archive on Windows
      const ps = spawnSync(
        "powershell",
        [
          "-NoProfile",
          "-Command",
          `Compress-Archive -Path '${kitPath.replace(/'/g, "''")}' -DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`,
        ],
        { encoding: "utf8" }
      );
      if (ps.status !== 0) {
        console.warn("[WARN] zip failed:", ps.stderr || ps.stdout);
        zipPath = null;
      } else {
        console.log(`[OK] zip ${zipPath}`);
      }
    } catch (e) {
      console.warn("[WARN] zip error:", e.message);
      zipPath = null;
    }
  } else if (kitCases.length > ZIP_MAX_CASES) {
    console.log(
      `[INFO] skip zip: ${kitCases.length} cases > ${ZIP_MAX_CASES} (kit JSON only)`
    );
  }

  console.log(`[OK] wrote ${jsonPath}`);
  console.log(`[OK] wrote ${mdPath}`);
  console.log(`[OK] wrote ${kitPath} (${kitCases.length} cases)`);
  console.log(
    `[SUMMARY] flagged=${flagged.length} mechaber_cut=${mechaberCut.length} seed=${seedInList}`
  );
  console.log("[COUNTS]", JSON.stringify(byKind));
}

main();
