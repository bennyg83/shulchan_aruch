/**
 * Scan corpus he.html / en.html pairs for CONTENT misalignment
 * (wrong EN paired with correct HE) even when <br> segment counts match.
 *
 * Motivating case — YD 4:2 rabbi-akiva-eiger-yd (fixed in 19200cd199):
 *   HE: (ש"ך סק"ג) <b>אי שמעינן.</b> …   (Shach seif-katan 3, short)
 *   EN: **(siman 4 Taz seif 2) And not like Beit Yosef, etc.** …  (different note)
 * Segment scanner missed it (both 1 segment).
 *
 * Usage:
 *   node scan_corpus_he_en_content_mismatch.mjs
 *   node scan_corpus_he_en_content_mismatch.mjs --volume yd1
 *   node scan_corpus_he_en_content_mismatch.mjs --volumes oc1,yd1 --slug rabbi-akiva-eiger-yd
 *   node scan_corpus_he_en_content_mismatch.mjs --min-score 2 --sample-limit 80
 *
 * Windows-safe: sequential volumes, no git, no parallel rg.
 *
 * Writes:
 *   newtry/SA_Rebuild/audit/he_en_content_mismatch/<vol>_report.json
 *   newtry/SA_Rebuild/audit/he_en_content_mismatch/ALL_volumes.json
 *   newtry/SA_Rebuild/audit/he_en_content_mismatch/SUMMARY.md
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../..");
const DEFAULT_CORPUS = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const OUT_DIR = path.join(REPO, "newtry/SA_Rebuild/audit/he_en_content_mismatch");

const ALL_VOLUMES = ["oc1", "yd1", "eh1", "cm1"];

/** Hebrew letter-value for seif-katan / note labels (simple gematria 1–400). */
const HEB_LETTER_VAL = {
  א: 1,
  ב: 2,
  ג: 3,
  ד: 4,
  ה: 5,
  ו: 6,
  ז: 7,
  ח: 8,
  ט: 9,
  י: 10,
  כ: 20,
  ך: 20,
  ל: 30,
  מ: 40,
  ם: 40,
  נ: 50,
  ן: 50,
  ס: 60,
  ע: 70,
  פ: 80,
  ף: 80,
  צ: 90,
  ץ: 90,
  ק: 100,
  ר: 200,
  ש: 300,
  ת: 400,
};

/** Canonical commentator ids used for HE↔EN head comparison. */
const COMMENTATOR_CANON = {
  shach: "shach",
  "siftei-kohen": "shach",
  "siftei kohen": "shach",
  taz: "taz",
  "turei-zahav": "taz",
  "turei zahav": "taz",
  "magen-avraham": "magen-avraham",
  "magen avraham": "magen-avraham",
  "magen avrohom": "magen-avraham",
  ma: "magen-avraham",
  "beit-yosef": "beit-yosef",
  "beit yosef": "beit-yosef",
  "beth yosef": "beit-yosef",
  by: "beit-yosef",
  rama: "rama",
  rema: "rama",
  bach: "bach",
  "peri-megadim": "peri-megadim",
  "peri megadim": "peri-megadim",
  pmg: "peri-megadim",
  "mishna-berurah": "mishna-berurah",
  "mishnah berurah": "mishna-berurah",
  "mishna berurah": "mishna-berurah",
  mb: "mishna-berurah",
  gra: "gra",
  "vilna gaon": "gra",
  "biur-halacha": "biur-halacha",
  "biur halacha": "biur-halacha",
  tur: "tur",
  rambam: "rambam",
  ramban: "ramban",
  rashba: "rashba",
  ran: "ran",
  tosafot: "tosafot",
  "baer-heitev": "baer-heitev",
  "beer heitev": "baer-heitev",
  "beer-hagolah": "beer-hagolah",
  "pri-chadash": "pri-chadash",
  "pri chadash": "pri-chadash",
};

const HE_ABBREV_TO_CANON = [
  { re: /ש["״]ך|שו["״]ך/g, id: "shach" },
  { re: /ט["״]ז/g, id: "taz" },
  { re: /מ["״]א(?![\u0590-\u05FF])/g, id: "magen-avraham" },
  { re: /ב["״]י(?![\u0590-\u05FF])/g, id: "beit-yosef" },
  { re: /רמ["״]א/g, id: "rama" },
  { re: /ב["״]ח/g, id: "bach" },
  { re: /פמ["״]ג/g, id: "peri-megadim" },
  { re: /מ["״]ב(?![\u0590-\u05FF])/g, id: "mishna-berurah" },
  { re: /גר["״]א/g, id: "gra" },
  { re: /ביאור\s*הלכה|ביאו"ה/g, id: "biur-halacha" },
  { re: /סמ["״]ע/g, id: "sema" },
  { re: /ט["״]ח|טורי\s*זהב/g, id: "taz" },
];

const EN_NAME_PATTERNS = [
  { re: /\bShach\b|\bSiftei\s+Kohen\b/i, id: "shach" },
  { re: /\bTaz\b|\bTurei\s+Zahav\b/i, id: "taz" },
  { re: /\bMagen\s+Avraham\b|\bMagen\s+Avrohom\b|\bMagen\s+Avraham\b/i, id: "magen-avraham" },
  { re: /\bBeit\s+Yosef\b|\bBeth\s+Yosef\b/i, id: "beit-yosef" },
  { re: /\bRama\b|\bRema\b/i, id: "rama" },
  { re: /\bBach\b/i, id: "bach" },
  { re: /\bPeri\s+Megadim\b|\bPri\s+Megadim\b/i, id: "peri-megadim" },
  { re: /\bMishna(?:h)?\s+Berurah\b/i, id: "mishna-berurah" },
  { re: /\bGra\b|\bVilna\s+Gaon\b/i, id: "gra" },
  { re: /\bBiur\s+Halacha\b|\bBeiur\s+Halacha\b/i, id: "biur-halacha" },
  { re: /\bBeer\s+Heitev\b|\bBaer\s+Heitev\b/i, id: "baer-heitev" },
  { re: /\bPri\s+Chadash\b|\bPeri\s+Chadash\b/i, id: "pri-chadash" },
];

function parseArgs(argv) {
  const out = {
    corpusRoot: DEFAULT_CORPUS,
    volumes: ALL_VOLUMES.slice(),
    slug: null,
    maxSimanim: null,
    sampleLimit: 60,
    minScore: 2,
    keepAllHits: false,
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
    else if (a === "--min-score") out.minScore = parseFloat(next(), 10);
    else if (a === "--keep-all-hits") out.keepAllHits = true;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scan_corpus_he_en_content_mismatch.mjs [options]
  --corpus-root <dir>   corpus parent (contains oc1/yd1/eh1/cm1)
  --volume <id>         one of: oc1 yd1 eh1 cm1
  --volumes a,b         subset of volumes
  --slug <slug>         only this commentary slug
  --max-simanim <n>     stop after N siman folders per volume
  --sample-limit <n>    samples kept per volume (default 60)
  --min-score <n>       minimum score to flag (default 2)
  --keep-all-hits       keep every hit in JSON (not only samples)`);
      process.exit(0);
    }
  }
  return out;
}

function stripTags(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function visuallyEmpty(html) {
  return stripTags(html).length === 0;
}

function hasHebrewLetters(s) {
  return /[\u0590-\u05FF]/.test(s || "");
}

function hasLatinLetters(s) {
  return /[A-Za-z]/.test(s || "");
}

function hebLettersToInt(letters) {
  if (!letters) return null;
  const clean = String(letters).replace(/[^א-ת]/g, "");
  if (!clean) return null;
  let n = 0;
  for (const ch of clean) {
    if (!(ch in HEB_LETTER_VAL)) return null;
    n += HEB_LETTER_VAL[ch];
  }
  return n > 0 ? n : null;
}

function extractBoldHe(html) {
  const m = String(html ?? "").match(/<b[^>]*>([\s\S]*?)<\/b>/i);
  return m ? stripTags(m[1]) : null;
}

function extractBoldEn(html) {
  // Markdown-style **lemma** common in corpus EN
  const md = String(html ?? "").match(/^\s*\*\*([^*]+)\*\*/);
  if (md) return md[1].trim();
  const m = String(html ?? "").match(/<b[^>]*>([\s\S]*?)<\/b>/i);
  return m ? stripTags(m[1]) : null;
}

/** Leading parenthetical / label before body. */
function extractHeHeadLabel(html) {
  const raw = String(html ?? "").trim();
  // (ש"ך סק"ג) or (סי"ד ט"ז סק"ב)
  const m = raw.match(/^\s*\(([^)]{1,80})\)/);
  if (m) return m[1];
  // bare leading abbr before <b>
  const m2 = raw.match(/^\s*((?:ש["״]ך|ט["״]ז|מ["״]א|ב["״]י|רמ["״]א|ב["״]ח)[^\s<]{0,20})/);
  return m2 ? m2[1] : null;
}

function extractEnHeadLabel(html) {
  const bold = extractBoldEn(html);
  if (bold) {
    const m = bold.match(/^\(([^)]{1,100})\)/);
    if (m) return m[1];
    return bold.slice(0, 120);
  }
  const plain = stripTags(html).slice(0, 160);
  const m = plain.match(/^\(([^)]{1,100})\)/);
  return m ? m[1] : null;
}

function commentatorsInHeHead(headText) {
  const found = new Set();
  if (!headText) return found;
  const slice = String(headText).slice(0, 120);
  for (const { re, id } of HE_ABBREV_TO_CANON) {
    re.lastIndex = 0;
    if (re.test(slice)) found.add(id);
  }
  return found;
}

function commentatorsInEnHead(headText) {
  const found = new Set();
  if (!headText) return found;
  const slice = String(headText).slice(0, 160);
  for (const { re, id } of EN_NAME_PATTERNS) {
    if (re.test(slice)) found.add(id);
  }
  return found;
}

function extractHeSeifKatan(html) {
  const head = String(html ?? "").slice(0, 200);
  // סק"ג / סק״ג / ס"ק ג / סק' ג
  const patterns = [
    /ס["״]?ק["״']\s*([א-ת]{1,4})/,
    /ס["״]ק\s*([א-ת]{1,4})/,
    /סעיף\s*קטן\s*([א-ת]{1,4})/,
  ];
  for (const re of patterns) {
    const m = head.match(re);
    if (m) return hebLettersToInt(m[1]);
  }
  return null;
}

function extractEnSeifKatan(headLabel) {
  if (!headLabel) return null;
  const s = String(headLabel);
  // Prefer "Commentator seif N" / "seif-katan N" over bare "seif N" when ambiguous
  const patterns = [
    /seif[-\s]?katan\s*(\d+)/i,
    /(?:Shach|Taz|Bach|Rama|Rema|Gra|Magen\s+Avraham|Beit\s+Yosef|Siftei\s+Kohen|Peri\s+Megadim|Mishna(?:h)?\s+Berurah)\s+seif\s*(\d+)/i,
    /\bsk\s*(\d+)\b/i,
    /\bs\.?\s*k\.?\s*(\d+)\b/i,
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m) return parseInt(m[1], 10);
  }
  // Bare "seif N" only if head looks like a note label (starts with seif / paren)
  const bare = s.match(/^\s*(?:siman\s+\d+\s+)?(?:[A-Za-z][A-Za-z\s]+)?seif\s*(\d+)/i);
  if (bare) return parseInt(bare[1], 10);
  return null;
}

function extractEnClaimedSiman(headLabel) {
  if (!headLabel) return null;
  const s = String(headLabel).trim();
  // Only treat as "this note belongs to siman N" when the head OPENS with it
  // (YD 4:2 bug: "(siman 4 Taz seif 2) …"). Ignore body citations like
  // "as below siman 76" / "Responsa X, siman 119".
  const m = s.match(/^\(?\s*siman\s+(\d+)\b/i);
  return m ? parseInt(m[1], 10) : null;
}

function extractEnClaimedFolderSeif(headLabel) {
  // "siman 4 Taz seif 2" → seif is usually seif-katan, NOT folder seif.
  // Only treat as folder-seif claim when phrased like "seif 2]" kaf-hachayim style
  // or "Mechaber seif N" — skip for scoring path mismatch unless explicit.
  if (!headLabel) return null;
  const m = String(headLabel).match(/\[seif\s+(\d+)\]/i);
  return m ? parseInt(m[1], 10) : null;
}

function normalizeFingerprint(html) {
  return stripTags(html)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 400);
}

function fingerprintHash(norm) {
  return crypto.createHash("sha1").update(norm || "").digest("hex").slice(0, 16);
}

function lemmaTokenSet(lemma) {
  if (!lemma) return new Set();
  const tokens = stripTags(lemma)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !/^(and|the|etc|not|like|for|with|from|that|this|seif|siman)$/i.test(t));
  return new Set(tokens);
}

function scorePair(ctx) {
  const {
    heRaw,
    enRaw,
    simanNum,
    seifNum,
  } = ctx;

  const flags = [];
  let score = 0;

  if (visuallyEmpty(heRaw) || visuallyEmpty(enRaw)) {
    return { score: 0, flags, skip: true };
  }

  const hePlain = stripTags(heRaw);
  const enPlain = stripTags(enRaw);
  const heLen = hePlain.length;
  const enLen = enPlain.length;

  const heLabel = extractHeHeadLabel(heRaw);
  const enLabel = extractEnHeadLabel(enRaw);
  const heBold = extractBoldHe(heRaw);
  const enBold = extractBoldEn(enRaw);

  const heComms = commentatorsInHeHead(heLabel || heRaw.slice(0, 100));
  const enComms = commentatorsInEnHead(enLabel || enBold || enPlain.slice(0, 160));

  const heSk = extractHeSeifKatan(heRaw);
  const enSk = extractEnSeifKatan(enLabel || enBold || "");
  const enSiman = extractEnClaimedSiman(enLabel || enBold || "");
  const enFolderSeif = extractEnClaimedFolderSeif(enLabel || enBold || "");

  // --- Cross-commentator contradiction (RAE pattern primary signal) ---
  if (heComms.size && enComms.size) {
    let overlap = false;
    for (const c of heComms) {
      if (enComms.has(c)) overlap = true;
    }
    if (!overlap) {
      flags.push({
        kind: "cross_commentator",
        weight: 3,
        he: [...heComms],
        en: [...enComms],
      });
      score += 3;
    }
  }

  // --- Seif-katan number mismatch (when both present) ---
  if (heSk != null && enSk != null && heSk !== enSk) {
    flags.push({ kind: "seif_katan_mismatch", weight: 2, heSk, enSk });
    score += 2;
  }

  // --- EN claims wrong siman vs folder ---
  if (enSiman != null && simanNum != null && enSiman !== simanNum) {
    flags.push({
      kind: "en_wrong_siman",
      weight: 3,
      enSiman,
      pathSiman: simanNum,
    });
    score += 3;
  }

  // --- EN [seif N] vs folder seif ---
  if (enFolderSeif != null && seifNum != null && enFolderSeif !== seifNum) {
    flags.push({
      kind: "en_wrong_folder_seif",
      weight: 2,
      enSeif: enFolderSeif,
      pathSeif: seifNum,
    });
    score += 2;
  }

  // --- Length imbalance (tiny HE + long EN, or vice versa) ---
  if (heLen > 0 && enLen > 0) {
    const ratio = enLen / heLen;
    if (heLen <= 120 && enLen >= 600 && ratio >= 8) {
      flags.push({
        kind: "length_he_tiny_en_long",
        weight: 2,
        heLen,
        enLen,
        ratio: Math.round(ratio * 10) / 10,
      });
      score += 2;
    } else if (enLen <= 80 && heLen >= 600 && heLen / enLen >= 8) {
      flags.push({
        kind: "length_en_tiny_he_long",
        weight: 2,
        heLen,
        enLen,
        ratio: Math.round((heLen / enLen) * 10) / 10,
      });
      score += 2;
    } else if (ratio >= 20 || ratio <= 1 / 20) {
      flags.push({
        kind: "length_extreme_ratio",
        weight: 1,
        heLen,
        enLen,
        ratio: Math.round(ratio * 100) / 100,
      });
      score += 1;
    }
  }

  // --- Lemma / opening label soft mismatch ---
  // If both have bold lemmas and token overlap is empty, soft flag.
  // Stronger if combined with other signals (already scored separately).
  if (heBold && enBold) {
    const heTok = lemmaTokenSet(heBold);
    const enTok = lemmaTokenSet(enBold);
    if (heTok.size >= 1 && enTok.size >= 1) {
      let shared = 0;
      for (const t of heTok) {
        // Hebrew vs Latin rarely share tokens — don't require shared text.
        // Instead: if EN bold contains a commentator claim AND HE bold is pure lemma
        // (no paren), that's normal for RAE. Soft-flag only when EN bold has NO
        // shared latinized content AND heads already disagree on commentator —
        // handled above. Here: flag "lemma_present_both" mismatch when EN head
        // has a different seif-katan or commentator already flagged, add soft.
        if (enTok.has(t)) shared++;
      }
      // Cross-script lemmas won't share tokens; use presence of conflicting
      // parenthetical claims instead.
      if (shared === 0 && (heLabel || enLabel) && flags.some((f) => f.kind === "cross_commentator" || f.kind === "seif_katan_mismatch")) {
        flags.push({
          kind: "lemma_head_conflict",
          weight: 1,
          heBold: heBold.slice(0, 80),
          enBold: enBold.slice(0, 80),
        });
        score += 1;
      }
    }
  }

  // Explicit head-label mismatch: HE paren names X, EN paren names Y (already covered)
  // Also: HE has (ש"ך…) while EN bold claims "(siman N Other seif M)"
  if (heComms.size && enComms.size === 0 && enLabel && /\bsiman\s+\d+/i.test(enLabel)) {
    // EN claims a siman-scoped note without naming overlapping commentator —
    // often still OK; only bump if seif-katan also mismatches or length bad.
    if (heSk != null && enSk != null && heSk !== enSk) {
      // already scored
    }
  }

  // --- Hebrew letters leaked into EN ---
  if (hasHebrewLetters(enPlain)) {
    // Ignore rare intentional Hebrew in EN; flag if substantial
    const hebCount = (enPlain.match(/[\u0590-\u05FF]/g) || []).length;
    if (hebCount >= 8) {
      flags.push({ kind: "en_hebrew_leak", weight: 1, hebCount });
      score += 1;
    }
  }

  // --- Unrelated keyword sniff when length already imbalanced ---
  if (flags.some((f) => f.kind.startsWith("length_"))) {
    const heHasIdol = /עבודת\s*כוכבים|תקרובת/.test(hePlain);
    const enHasIdol = /idol\s*worship|avodah\s*zarah|offering/i.test(enPlain);
    const heHasShechitah = /שחט|שחיט/.test(hePlain);
    const enHasShechitah = /slaughter|shechit/i.test(enPlain);
    // If tiny HE mentions something EN doesn't at all, soft add
    if (heLen <= 150 && heHasIdol && !enHasIdol && enLen > 200) {
      flags.push({ kind: "keyword_theme_mismatch", weight: 1, theme: "idol_worship" });
      score += 1;
    } else if (heLen <= 150 && heHasShechitah && !enHasShechitah && enLen > 200) {
      flags.push({ kind: "keyword_theme_mismatch", weight: 1, theme: "shechitah" });
      score += 1;
    }
  }

  return {
    score,
    flags,
    skip: false,
    meta: {
      heLen,
      enLen,
      heLabel: heLabel ? heLabel.slice(0, 80) : null,
      enLabel: enLabel ? enLabel.slice(0, 100) : null,
      heBold: heBold ? heBold.slice(0, 80) : null,
      enBold: enBold ? enBold.slice(0, 100) : null,
      heComms: [...heComms],
      enComms: [...enComms],
      heSk,
      enSk,
      enSiman,
    },
  };
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
      yield {
        seifDirName: e.name,
        slug: s.name,
        slugDir: path.join(seifDir, s.name),
      };
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

function isRaeSlug(slug) {
  return /^rabbi-akiva-eiger/i.test(slug || "");
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
    rae: { pairs: 0, issues: 0, hits: [] },
    samples: [],
    hits: opts.keepAllHits ? [] : undefined,
  };

  if (!fs.existsSync(volRoot)) {
    report.error = "volume_missing";
    return report;
  }

  const simans = listSimanDirs(volRoot);
  let simanCount = 0;

  // First pass: collect cells for duplicate-EN detection + content scoring
  /** @type {Array<object>} */
  const cells = [];

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
      if (isRaeSlug(slug)) report.rae.pairs++;

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

      const seifNum = parseInt(seifDirName.replace(/\D/g, ""), 10);
      const rel = path.relative(opts.corpusRoot, slugDir).split(path.sep).join("/");
      const enFp = fingerprintHash(normalizeFingerprint(enRaw));
      const heFp = fingerprintHash(normalizeFingerprint(heRaw));

      cells.push({
        volume: vol,
        siman: simanNum,
        seif: seifDirName,
        seifNum,
        slug,
        slugDir,
        path: rel,
        heRaw,
        enRaw,
        enFp,
        heFp,
        enNorm: normalizeFingerprint(enRaw),
        heNorm: normalizeFingerprint(heRaw),
      });
    }
  }

  // Duplicate EN: same EN fingerprint under multiple seifs for same slug+siman, HE differs
  /** @type {Map<string, object[]>} */
  const dupGroups = new Map();
  for (const c of cells) {
    if (!c.enNorm || c.enNorm.length < 40) continue;
    const key = `${c.siman}||${c.slug}||${c.enFp}`;
    if (!dupGroups.has(key)) dupGroups.set(key, []);
    dupGroups.get(key).push(c);
  }
  /** @type {Set<string>} path keys that are duplicate-EN suspects */
  const dupPaths = new Set();
  for (const [, group] of dupGroups) {
    if (group.length < 2) continue;
    const heFps = new Set(group.map((g) => g.heFp));
    if (heFps.size < 2) continue; // same EN and same HE → likely intentional copy, skip
    for (const g of group) dupPaths.add(g.path);
  }

  for (const c of cells) {
    const scored = scorePair({
      heRaw: c.heRaw,
      enRaw: c.enRaw,
      simanNum: c.siman,
      seifNum: c.seifNum,
    });
    if (scored.skip) continue;

    let { score, flags, meta } = scored;

    if (dupPaths.has(c.path)) {
      flags = flags.concat([
        {
          kind: "duplicate_en_across_seifs",
          weight: 3,
          enFp: c.enFp,
        },
      ]);
      score += 3;
    }

    if (score < opts.minScore || flags.length === 0) continue;

    const kinds = flags.map((f) => f.kind);
    report.issues++;
    for (const k of kinds) {
      report.byKind[k] = (report.byKind[k] || 0) + 1;
    }
    if (!report.bySlug[c.slug]) report.bySlug[c.slug] = { issues: 0, byKind: {} };
    report.bySlug[c.slug].issues++;
    for (const k of kinds) {
      report.bySlug[c.slug].byKind[k] = (report.bySlug[c.slug].byKind[k] || 0) + 1;
    }

    const hit = {
      volume: vol,
      siman: c.siman,
      seif: c.seif,
      slug: c.slug,
      path: c.path,
      score,
      kinds,
      flags,
      meta,
      heBytes: Buffer.byteLength(c.heRaw, "utf8"),
      enBytes: Buffer.byteLength(c.enRaw, "utf8"),
      heHasHebrew: hasHebrewLetters(c.heRaw),
      enHasLatin: hasLatinLetters(c.enRaw),
      isRae: isRaeSlug(c.slug),
    };

    if (isRaeSlug(c.slug)) {
      report.rae.issues++;
      if (report.rae.hits.length < 40) report.rae.hits.push(hit);
    }

    if (opts.keepAllHits) report.hits.push(hit);
    if (report.samples.length < opts.sampleLimit) report.samples.push(hit);
  }

  report.simanimScanned = simanCount;
  report.duplicateEnGroups = [...dupGroups.values()].filter((g) => {
    if (g.length < 2) return false;
    return new Set(g.map((x) => x.heFp)).size >= 2;
  }).length;

  return report;
}

function writeSummary(reports) {
  const lines = [
    "# HE/EN content mismatch scan",
    "",
    `Scanned at: ${new Date().toISOString()}`,
    "",
    "Flags likely **wrong-EN-for-HE** pairs even when `<br>` segment counts match",
    "(YD 4:2 Rabbi Akiva Eiger pattern: Shach HE paired with Taz EN).",
    "",
    "Heuristics: cross-commentator head, seif-katan mismatch, EN wrong siman,",
    "duplicate EN across seifs, length imbalance, lemma conflict, EN Hebrew leak.",
    "",
    "| Volume | Pairs | Issues | RAE pairs | RAE issues | Top kinds |",
    "|--------|------:|-------:|----------:|-----------:|-----------|",
  ];

  for (const r of reports) {
    const kinds = Object.entries(r.byKind || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([k, n]) => `${k}(${n})`)
      .join(", ");
    lines.push(
      `| ${r.volume} | ${r.pairs ?? 0} | ${r.issues ?? 0} | ${r.rae?.pairs ?? 0} | ${r.rae?.issues ?? 0} | ${kinds || r.error || "—"} |`
    );
  }

  const totalRaeIssues = reports.reduce((n, r) => n + (r.rae?.issues || 0), 0);
  const totalIssues = reports.reduce((n, r) => n + (r.issues || 0), 0);
  lines.push(
    "",
    `**Totals:** ${totalIssues} issues across volumes; **rabbi-akiva-eiger\\*** issues: ${totalRaeIssues}.`,
    ""
  );

  // YD 4:2 RAE callout
  lines.push("## YD 4:2 rabbi-akiva-eiger check", "");
  let yd42 = null;
  for (const r of reports) {
    if (r.volume !== "yd1") continue;
    yd42 = (r.rae?.hits || []).find(
      (h) => h.siman === 4 && h.seif === "seif-002" && isRaeSlug(h.slug)
    );
    const any42 = (r.samples || [])
      .concat(r.rae?.hits || [])
      .filter((h) => h.siman === 4 && h.seif === "seif-002" && isRaeSlug(h.slug));
    if (any42.length) yd42 = any42[0];
  }
  if (yd42) {
    lines.push(
      `- **STILL FLAGGED:** \`yd1/siman4/seif-002\` score=${yd42.score} kinds=${yd42.kinds.join(", ")}`
    );
  } else {
    lines.push(
      "- **Clean:** `yd1/siman4/seif-002/rabbi-akiva-eiger*` did **not** flag (expected after fix 19200cd199)."
    );
  }
  lines.push("");

  lines.push("## RAE hits (all volumes)", "");
  let raeListed = 0;
  for (const r of reports) {
    for (const h of r.rae?.hits || []) {
      raeListed++;
      lines.push(
        `- \`${h.path}\` score=${h.score} — ${h.kinds.join(", ")}` +
          (h.meta?.heLabel || h.meta?.enLabel
            ? ` | HE:(${h.meta.heLabel || "—"}) EN:(${h.meta.enLabel || "—"})`
            : "")
      );
    }
  }
  if (!raeListed) lines.push("_No RAE content-mismatch hits._");
  lines.push("");

  lines.push("## By slug (issues ≥ 1)", "");
  for (const r of reports) {
    if (!r.bySlug || !Object.keys(r.bySlug).length) continue;
    lines.push(`### ${r.volume}`, "");
    const rows = Object.entries(r.bySlug).sort((a, b) => b[1].issues - a[1].issues);
    lines.push("| Slug | Issues | Kinds |", "|------|-------:|-------|");
    for (const [slug, info] of rows.slice(0, 40)) {
      const kinds = Object.entries(info.byKind)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([k, n]) => `${k}:${n}`)
        .join(", ");
      lines.push(`| ${slug} | ${info.issues} | ${kinds} |`);
    }
    if (rows.length > 40) lines.push(`| … | ${rows.length - 40} more slugs | |`);
    lines.push("");
  }

  lines.push("## Top samples (by score)", "");
  for (const r of reports) {
    if (!r.samples?.length) continue;
    lines.push(`### ${r.volume}`, "");
    const sorted = [...r.samples].sort((a, b) => b.score - a.score);
    for (const s of sorted.slice(0, 25)) {
      lines.push(
        `- \`${s.path}\` **score=${s.score}** ${s.kinds.join(", ")}` +
          ` (${s.heBytes}B / ${s.enBytes}B)` +
          (s.meta?.heLabel ? ` HE«${s.meta.heLabel}»` : "") +
          (s.meta?.enLabel ? ` EN«${s.meta.enLabel}»` : "")
      );
    }
    lines.push("");
  }

  fs.writeFileSync(path.join(OUT_DIR, "SUMMARY.md"), lines.join("\n") + "\n", "utf8");
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  // Default: keep all hits in per-volume JSON for audit usefulness
  if (opts.keepAllHits === false) opts.keepAllHits = true;
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`[scan-content] corpusRoot=${opts.corpusRoot}`);
  console.log(`[scan-content] volumes=${opts.volumes.join(",")} minScore=${opts.minScore}`);

  const reports = [];
  for (const vol of opts.volumes) {
    if (!ALL_VOLUMES.includes(vol)) {
      console.warn(`[scan-content] skip unknown volume ${vol}`);
      continue;
    }
    console.log(`[scan-content] scanning ${vol}…`);
    const t0 = Date.now();
    const report = scanVolume(vol, opts);
    const ms = Date.now() - t0;
    reports.push(report);
    const outPath = path.join(OUT_DIR, `${vol}_report.json`);
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n", "utf8");
    console.log(
      `[scan-content] ${vol}: pairs=${report.pairs} issues=${report.issues} raeIssues=${report.rae?.issues ?? 0} simanim=${report.simanimScanned ?? 0} (${ms}ms) → ${outPath}`
    );
  }

  const combined = {
    scannedAt: new Date().toISOString(),
    corpusRoot: opts.corpusRoot,
    minScore: opts.minScore,
    volumes: reports.map((r) => ({
      volume: r.volume,
      pairs: r.pairs,
      issues: r.issues,
      byKind: r.byKind,
      rae: {
        pairs: r.rae?.pairs ?? 0,
        issues: r.rae?.issues ?? 0,
        hitPaths: (r.rae?.hits || []).map((h) => h.path),
      },
      duplicateEnGroups: r.duplicateEnGroups,
      error: r.error,
    })),
    raeTotalIssues: reports.reduce((n, r) => n + (r.rae?.issues || 0), 0),
    totalIssues: reports.reduce((n, r) => n + (r.issues || 0), 0),
  };
  fs.writeFileSync(path.join(OUT_DIR, "ALL_volumes.json"), JSON.stringify(combined, null, 2) + "\n", "utf8");
  writeSummary(reports);
  console.log(`[scan-content] SUMMARY → ${path.join(OUT_DIR, "SUMMARY.md")}`);
  console.log(
    `[scan-content] done totalIssues=${combined.totalIssues} raeIssues=${combined.raeTotalIssues}`
  );
}

main();
