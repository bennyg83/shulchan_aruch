/**
 * Scripted vocabulary pass ONLY.
 * Parses pipe-table rows from OC318_Vocabulary_Corrections.md — not OC318_Translation_Rules_Addendum_for_Cursor.md
 * (contextual / review rules must not be blindly find-replaced).
 */
const fs = require("fs");
const path = require("path");

const VOCABULARY_CORRECTIONS_MD = "OC318_Vocabulary_Corrections.md";
const FULL_DICTIONARY_MD = "full_dictionary (1).md";

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseCorrectionPairs(mdText) {
  const pairs = [];
  const lines = mdText.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("---")) {
      continue;
    }
    const cells = trimmed
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean);
    if (cells.length < 2) {
      continue;
    }
    if (
      cells[0].toLowerCase().includes("wrong (google translate)") ||
      cells[1].toLowerCase() === "correct"
    ) {
      continue;
    }
    // Skip accidental trailing junk (non-table rows)
    if (cells[0].startsWith("}") || cells[0].startsWith("print(")) {
      continue;
    }
    pairs.push({ wrong: cells[0], correct: cells[1] });
  }
  return pairs;
}

function containsHebrew(s) {
  return /[\u0590-\u05FF]/.test(s);
}

function isCommonBadToken(token) {
  const t = token.trim().toLowerCase();
  // Too-short tokens and stopwords are dangerous in a global find/replace pass.
  if (t.length < 3) {
    return true;
  }
  // Avoid replacing extremely common English function words.
  const stop = new Set([
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "in",
    "on",
    "as",
    "at",
    "by",
    "for",
    "from",
    "with",
    "without",
    "into",
    "over",
    "under",
    "after",
    "before",
    "this",
    "that",
    "these",
    "those",
    "it",
    "its",
    "he",
    "his",
    "she",
    "her",
    "they",
    "them",
    "their",
    "one",
    "who"
  ]);
  return stop.has(t);
}

function isSafeTechnicalPhrase(token) {
  const t = token.trim();
  if (!/[A-Za-z0-9]/.test(t)) {
    return false;
  }
  if (containsHebrew(t)) {
    return false;
  }
  if (isCommonBadToken(t)) {
    return false;
  }
  // Avoid single generic English nouns that appear widely in prose.
  // We only want technical terms / transliterations / set phrases here.
  const lower = t.toLowerCase();
  const technicalHints = [
    "bishul",
    "melacha",
    "shabbos",
    "kli ",
    "kli-",
    "yad ",
    "soled",
    "mitzamek",
    "maachal",
    "drusai",
    "d'or",
    "d'r",
    "rabbinic",
    "torah",
    "siman",
    "seif",
    "taz",
    "magen",
    "rashi",
    "tosaf"
  ];
  return technicalHints.some((h) => lower.includes(h));
}

const ALLOWED_PAREN_CORRECT = new Set([
  "there is a prohibition of cooking after cooking (for liquids that cooled)",
  "there is no prohibition of cooking after cooking (for fully cooked items)",
  "b'chedi she'ya'asu — the time it would have taken to perform the act (delay required after Shabbos violation by non-Jew)"
]);

function isAcceptableCorrectRendering(correct) {
  const c = (correct || "").trim();
  if (!c) {
    return false;
  }
  const lower = c.toLowerCase();
  // Allow specific parenthetical clarifiers (whitelist).
  if (ALLOWED_PAREN_CORRECT.has(lower)) {
    return true;
  }
  // Otherwise, do NOT inject long glosses into running English.
  // (These belong in a glossary, not in every paragraph.)
  if (c.includes("—") || c.includes("(") || c.includes(")")) {
    return false;
  }
  return true;
}

function splitCommaAlternatives(s) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

/**
 * Parse full_dictionary (1).md into deterministic {wrong, correct} pairs.
 *
 * We ingest:
 * - 2-column tables: wrong → correct
 * - 3+ column tables where column 2 lists permutations/variants and column 3 is the preferred English
 *
 * Safety filters:
 * - Ignore "wrong" tokens containing Hebrew
 * - Require ASCII letters/numbers in "wrong"
 */
function parseFullDictionaryPairs(mdText) {
  const pairs = [];
  const lines = mdText.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("---")) {
      continue;
    }

    const cells = trimmed
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean);

    if (cells.length < 2) {
      continue;
    }

    // Skip header rows (best-effort)
    const c0 = (cells[0] || "").toLowerCase();
    const c1 = (cells[1] || "").toLowerCase();
    const c2 = (cells[2] || "").toLowerCase();
    if (
      c0.includes("abbreviation") ||
      c0.includes("google translate output") ||
      c0.includes("hebrew") ||
      c1.includes("hebrew full form") ||
      c1.includes("permutations") ||
      c1.includes("variants") ||
      c2.includes("correct english") ||
      c1 === "correct" ||
      c2 === "correct"
    ) {
      continue;
    }

    // 2-column: wrong → correct
    if (cells.length === 2) {
      const wrong = cells[0];
      const correct = cells[1];
      // Ignore instructional mapping rows (e.g. "(כ) → (20)")
      if (wrong.includes("→") || correct.includes("→")) {
        continue;
      }
      if (containsHebrew(wrong)) {
        continue;
      }
      if (!/[A-Za-z0-9]/.test(wrong)) {
        continue;
      }
      if (!isSafeTechnicalPhrase(wrong)) {
        continue;
      }
      if (!isAcceptableCorrectRendering(correct)) {
        continue;
      }
      pairs.push({ wrong, correct });
      continue;
    }

    // 3+ columns: term | permutations | correct
    const permutationsRaw = cells[1] || "";
    const correct = cells[2] || "";
    if (!permutationsRaw || !correct) {
      continue;
    }
    if (permutationsRaw.includes("→") || correct.includes("→")) {
      continue;
    }

    if (!isAcceptableCorrectRendering(correct)) {
      continue;
    }

    const commaParts = splitCommaAlternatives(permutationsRaw);
    for (const part of commaParts) {
      for (const wrong of splitAlternatives(part)) {
        if (!wrong) {
          continue;
        }
        if (containsHebrew(wrong)) {
          continue;
        }
        if (!/[A-Za-z0-9]/.test(wrong)) {
          continue;
        }
        if (!isSafeTechnicalPhrase(wrong)) {
          continue;
        }
        pairs.push({ wrong, correct });
      }
    }
  }

  return pairs;
}

/**
 * Split "a / b / c" into parts. Table uses " / " as delimiter between alternatives.
 */
function splitAlternatives(s) {
  if (!s.includes(" / ")) {
    return [s.trim()];
  }
  return s
    .split(" / ")
    .map((x) => x.trim())
    .filter(Boolean);
}

/**
 * Expand one vocabulary row into { wrong, replace } pairs.
 * When counts match: pairwise. When one correct: all wrong map to it.
 * When wrong length is a multiple of correct length: cycle (e.g. 4 wrong, 2 correct).
 */
function expandRow(wrongRaw, correctRaw) {
  const wrongParts = splitAlternatives(wrongRaw);
  const correctParts = splitAlternatives(correctRaw);
  const out = [];

  if (wrongParts.length === correctParts.length) {
    for (let i = 0; i < wrongParts.length; i += 1) {
      out.push({ wrong: wrongParts[i], replace: correctParts[i] });
    }
    return out;
  }

  if (correctParts.length === 1) {
    for (const w of wrongParts) {
      out.push({ wrong: w, replace: correctParts[0] });
    }
    return out;
  }

  if (
    wrongParts.length > correctParts.length &&
    wrongParts.length % correctParts.length === 0
  ) {
    for (let i = 0; i < wrongParts.length; i += 1) {
      out.push({
        wrong: wrongParts[i],
        replace: correctParts[i % correctParts.length]
      });
    }
    return out;
  }

  for (const w of wrongParts) {
    out.push({ wrong: w, replace: correctParts[0] });
  }
  return out;
}

/** Extra halachic phrase fixes (longest first). Not from the markdown table. */
const EXTRA_PHRASE_RULES = [
  ["the thing on which work was done", "the item on which melacha was performed"],
  ["enjoyment of Shabbos work", "benefit from melacha performed on Shabbos"],
  ["who did work on Shabbos", "who performed melacha on Shabbos"],
  ["does work on Shabbos", "performs melacha on Shabbos"],
  ["did work on Shabbos", "performed melacha on Shabbos"],
  ["to do work on Shabbos", "to perform melacha on Shabbos"],
  ["to do work on the Sabbath", "to perform melacha on Shabbos"],
  ["do work on the Sabbath", "perform melacha on Shabbos"],
  ["one shift of work", "one of the melachos"],
  ["fine for all works", "penalty for all melachos"],
  ["for all works that", "for all melachos that"],
  ["do this work", "perform this melacha"],
  ["to do this work", "to perform this melacha"],
  ["Shabbos work", "Shabbos melacha"],
  ["does work", "performs melacha"],
  ["did work", "performed melacha"],
  ["of Shabbos work", "of Shabbos melacha"],
  ["or did Do not work", "or performed another melacha"],
  ["finished work", "completed melacha"],
  ["a finished work", "completed melacha"],
  ["the end of their work", "the completion of their melacha"],
  ["Completion of their work", "Completion of their melacha"],
  ["end of their work", "end of their melacha"],
  ["end of your work", "completion of the melacha"],
  ["goldsmith's work", "goldsmith's melacha"],
  ["he did not work anything with his hands", "he did not perform any melacha with his hands"],
  ["does not work anything with his hands", "does not perform any melacha with his hands"],
  ["it becomes a finished work", "it constitutes completed melacha"],
  ["is a finished work", "is completed melacha"],
  ["everything that is a finished work", "everything that is completed melacha"],
  ["their rejection is the end of their work", "their rinsing completes their melacha"],
  ["this is the end of your work", "this completes the melacha"],
  ["the enjoyment of Shabbos work", "benefit from melacha done on Shabbos"],
  ["sufficient to do this work if", "sufficient to perform this melacha if"],
  ["enjoyment of Shabbos melacha", "benefit from melacha on Shabbos"],
  [" (tour)", " (Tur)"],
  ["(tour)", "(Tur)"],
  // Rashba + סימן (gematria chapter numbers): GT mangled as "Barsha'a… sign (KA'A)"
  [
    "He is never allowed. The meaning of Barsha'a is a sign (KA'A)",
    "Forbidden to him forever. It implies according to Rashba, chapter (171) [175], that the pot is likewise forbidden"
  ],
  // עיין לעיל סימן … סעיף — GT: "look at the above sign … section …" (ש״ז misread for רמ״ז = 247)
  [
    "look at the above sign 77 section 20.",
    "see above, siman 247, seif 20."
  ],
  [
    "look at the above sign 77 section 20",
    "see above, siman 247, seif 20"
  ],
  [
    "look at the above sign R.D.",
    "see above, chapter 254"
  ],
  [
    "look at the above sign R.D.}",
    "see above, chapter 254}"
  ],
  [
    "see above, chapter R.D.",
    "see above, chapter 254"
  ],
  // Pipeline §10 — GT mangling מכת מרדות / יד סולדת
  [
    "must be struck with a mutiny",
    "is subject to makkat mardut (rabbinic lashes)"
  ],
  [
    "It is the hand is scalded bo",
    "It is yad soledet bo"
  ],
  // כ״ה רד״ך בית כ״ו ח״ב — Radbach (not Radbaz / רדב״ז)
  [
    "[25 Radbaz Beit 26 12]:",
    "[Radbach (R. David ben Chaim HaKohen of Corfu), vol. 26, pt. 2]:"
  ],
  [
    "[25 Radbaz Beit 26 12]",
    "[Radbach (R. David ben Chaim HaKohen of Corfu), vol. 26, pt. 2]"
  ],
  [
    "not b'chedi she'ya'asu do except",
    "we do not require bichdei sheyeasu except"
  ],
  [
    "not bichdei sheyeasu do except",
    "we do not require bichdei sheyeasu except"
  ],
  [
    "and God by forgetfulness.",
    "and likewise one who forgets (hahu hadin)."
  ]
];

function buildRulesFromPairs(pairs) {
  const flat = [];
  for (const p of pairs) {
    flat.push(...expandRow(p.wrong, p.correct));
  }

  const rules = flat.map(({ wrong, replace }) => ({
    wrong,
    replace,
    regex: new RegExp(`\\b${escapeRegex(wrong)}\\b`, "gi"),
    len: wrong.length
  }));

  rules.sort((a, b) => b.len - a.len);
  return rules;
}

function buildExtraRules() {
  const rules = EXTRA_PHRASE_RULES.map(([wrong, replace]) => ({
    wrong,
    replace,
    regex: new RegExp(escapeRegex(wrong), "gi"),
    len: wrong.length
  }));
  rules.sort((a, b) => b.len - a.len);
  return rules;
}

/** Fix accidental literal "melacha / melachos" left by old buggy replacement. */
function cleanupSlashedMelacha(text) {
  let out = text;

  const specific = [
    [/One of the other melacha \/ melachos/gi, "One of the other melachos"],
    [/One of the Shabbos melacha \/ melachos/gi, "One of the melachos"],
    [/Unlike most melacha \/ melachos/gi, "Unlike most melachos"],
    [/\(b\) From other melacha \/ melachos/gi, "(b) Of the other melachos"],
    [/one of all the melacha \/ melachos/gi, "one of all the melachos"],
    [
      /All this is a melacha \/ melachos by Torah law/gi,
      "All this applies to a Torah-level melacha"
    ],
    [/in a melacha \/ melachos from rabbinic/gi, "in a rabbinic melacha"],
    [
      /forbidden as a melacha \/ melachos by Torah law/gi,
      "forbidden like a Torah-level melacha"
    ],
    [/prohibited melacha \/ melachos/gi, "prohibited melachos"],
    [
      /\(11\) Other melacha \/ melachos - the Rama/gi,
      "(11) Another melacha — the Rama"
    ],
    [/Completion of a melacha \/ melachos/gi, "Completion of a melacha"],
    [/the melacha \/ melachos of cooking is finished/gi, "the melacha of cooking is complete"],
    [/end of a melacha \/ melachos/gi, "end of a melacha"],
    [
      /it does a melacha \/ melachos and when/gi,
      "it performs a melacha and when"
    ],
    [/no melacha \/ melachos at all/gi, "no melacha at all"],
    [/the melacha \/ melachos of dyeing/gi, "the melacha of dyeing"],
    [/dyer's melacha \/ melachos/gi, "dyer's melacha"],
    [/In the dyer's melacha \/ melachos/gi, "In the dyer's melacha"],
    [/point of this melacha \/ melachos is/gi, "point of this melacha is"],
    [/does the melacha with their hands/gi, "does the melacha with his hands"]
  ];

  for (const [re, rep] of specific) {
    out = out.replace(re, rep);
  }

  out = out.replace(/\bmelacha \/ melachos\b/g, "melachos");

  out = out.replace(
    /\brabbinic \/ rabbinic \/ d'rabbanan/gi,
    "rabbinic / d'rabbanan"
  );
  out = out.replace(
    /\brabbinic \/ rabbinic \/ rabbinic/gi,
    "rabbinic / d'rabbanan"
  );

  return out;
}

function applyRuleSet(text, rules) {
  let out = text;
  for (const rule of rules) {
    out = out.replace(rule.regex, rule.replace);
  }
  return out;
}

function fixEnglish(text, vocabRules, extraRules) {
  // Apply longest specific fixes first so vocab rows cannot split cross-reference phrases.
  let   out = applyRuleSet(text, extraRules);
  out = applyRuleSet(out, vocabRules);
  out = cleanupSlashedMelacha(out);
  // Remove hidden directionality / zero-width controls that break regex matching and readability.
  out = out.replace(/[\u200b\u200e\u200f\u202a-\u202e\u2060\u00ad\ufeff]/g, "");

  // --- Post-pass corruption fixes (dictionary ingestion safety net) ---
  // Undo "of"→"poultry" corruption in the common phrase "one of the other".
  out = out.replace(/\bone poultry the other\b/gi, "one of the other");
  out = out.replace(/\bOne poultry the other\b/g, "One of the other");
  out = out.replace(/\bpoultry the other\b/gi, "of the other");

  // Undo "of"→"poultry" when it lands before articles (common corruption).
  out = out.replace(/\bpoultry\s+the\b/gi, "of the");
  out = out.replace(/\bpoultry\s+a\b/gi, "of a");
  out = out.replace(/\bpoultry\s+an\b/gi, "of an");
  out = out.replace(/\bpoultry\s+all\b/gi, "of all");
  out = out.replace(/\bpoultry\s+this\b/gi, "of this");
  out = out.replace(/\bpoultry\s+that\b/gi, "of that");

  // Undo "(כ) → ((כ) → (20))" style artifacts by collapsing to the numeric.
  out = out.replace(
    /\(\s*[^)]+\s*\)\s*→\s*\(\(\s*[^)]+\s*\)\s*→\s*\((\d+)\)\)\)/g,
    "($1)"
  );

  // If the arrow form appears without the extra parens, still collapse it.
  out = out.replace(/\(\s*[^)]+\s*\)\s*→\s*\((\d+)\)/g, "($1)");

  // Remove runaway nested glosses like: "melacha (forbidden Shabbos ...)" repeated many times.
  out = out.replace(
    /\bmelacha\s*\(forbidden Shabbos melacha\s*\(forbidden Shabbos labor\)\)\s*/gi,
    "melacha "
  );
  out = out.replace(/\bmelacha\s*\(forbidden Shabbos labor\)\s*/gi, "melacha ");
  out = out.replace(/\bmelacha\s*\(forbidden Shabbos melacha\s*\)\s*/gi, "melacha ");
  out = out.replace(/\bmelacha\s*\(forbidden Shabbos melacha\s*\)\s*\)/gi, "melacha");

  // Collapse common "non-a a a Jew" / "a a a a Jew" garbage back to intended terms.
  out = out.replace(/\bnon-a(?:\s+a)+\s+Jew\b/gi, "non-Jew");
  out = out.replace(/\bnon-a\s+Jew\b/gi, "non-Jew");
  out = out.replace(/\ba(?:\s+a)+\s+Jew\b/gi, "a Jew");
  out = out.replace(/\ba(?:\s+a)+\s+healthy person\b/gi, "a healthy person");

  // Collapse stuttered repeats introduced by overlapping replacements.
  out = out.replace(/\b(halachic)(?:\s+\1\b)+/gi, "halachic");
  out = out.replace(/\b(unintentionally)(?:\s+—\s+\1)+/gi, "unintentionally");
  out = out.replace(/\b(intentionally)(?:\s+—\s+\1)+/gi, "intentionally");
  out = out.replace(/\bone who acts(?:\s+one who acts)+\b/gi, "one who acts");
  out = out.replace(/\bbeing(?:\s+being)+\b/gi, "being");
  out = out.replace(/\bTalmudic(?:\s+Talmudic)+\b/gi, "Talmudic");
  out = out.replace(/\britual(?:\s+ritual)+\b/gi, "ritual");
  out = out.replace(/\bperson(?:\s+person)+\b/gi, "person");
  out = out.replace(/\blaw(?:\s+law)+\b/gi, "law");
  out = out.replace(/\bby(?:\s+by)+\b/gi, "by");

  // Generic runaway-repeat collapsers (aggressive; intended for already-corrupted text).
  // Collapse word runs: "cooked cooked cooked cooked ..." -> "cooked"
  out = out.replace(/\b([A-Za-z][A-Za-z'’.-]{1,})\b(?:\s+\1\b){3,}/gi, "$1");
  // Collapse dash repeats: "chatas — chatas — chatas ..." -> "chatas"
  out = out.replace(/\b([A-Za-z][A-Za-z'’.-]{2,})\b(?:\s*[—–-]\s*\1\b){2,}/gi, "$1");
  // Collapse repeated parentheticals: "(of cooking broth) (of cooking broth) ..." -> "(of cooking broth)"
  out = out.replace(/\(([A-Za-z][A-Za-z0-9\s'’.-]{0,60})\)(?:\s+\(\1\)){1,}/g, "($1)");
  // Collapse repeated bigrams: "he he he..." is already handled by word-run, but keep for cases with punctuation.
  out = out.replace(/\b([A-Za-z][A-Za-z'’.-]{1,})\s+([A-Za-z][A-Za-z'’.-]{1,})\b(?:\s+\1\s+\2\b){3,}/gi, "$1 $2");

  // Collapse repeated "term — gloss" chains for key glossary items.
  out = out.replace(
    /\bmaachal ben Drusai\s*—\s*minimally edible(?:\s*—\s*minimally edible)+\b/gi,
    "maachal ben Drusai — minimally edible"
  );
  out = out.replace(
    /\bmitzamek v'yafeh lo\s*—\s*continued cooking improves it(?:\s*—\s*continued cooking improves it)+\b/gi,
    "mitzamek v'yafeh lo — continued cooking improves it"
  );
  out = out.replace(
    /\bmitzamek v'ra lo\s*—\s*continued cooking harms it(?:\s*—\s*continued cooking harms it)+\b/gi,
    "mitzamek v'ra lo — continued cooking harms it"
  );
  out = out.replace(
    /\bb'dieved\s*—\s*after the fact(?:\s*—\s*b'dieved\s*—\s*after the fact)+\b/gi,
    "b'dieved — after the fact"
  );
  out = out.replace(
    /\bb'dieved\s*—\s*after the fact(?:\s*—\s*after the fact)+\b/gi,
    "b'dieved — after the fact"
  );
  // Handle pathological alternations like: "b'dieved — after the fact — after the fact — b'dieved — after the fact ..."
  out = out.replace(
    /\bb'dieved\s*—\s*after the fact(?:\s*—\s*(?:b'dieved\s*—\s*)?after the fact)+\b/gi,
    "b'dieved — after the fact"
  );
  out = out.replace(
    /\bcontinued cooking improves it\s*\(continued cooking improves it\)/gi,
    "continued cooking improves it"
  );
  out = out.replace(
    /\bcontinued cooking harms it\s*\(continued cooking harms it\)/gi,
    "continued cooking harms it"
  );
  out = out.replace(
    /\bchatas(?:\s*[—–-]\s*chatas)+\s*—\s*sin offering\b/gi,
    "chatas — sin offering"
  );

  // Fix doubled closing parens from our collapse rules, e.g. "(2))" → "(2)".
  out = out.replace(/\((\d+)\)\)+/g, "($1)");

  // Remove noisy injected glossary glosses that should not appear inline.
  out = out.replace(/\s*\(the primary vessel\s*—[^)]*\)/gi, "");
  out = out.replace(/\s*\(the secondary vessel\s*—[^)]*\)/gi, "");
  out = out.replace(/\s*\(the tertiary vessel[^)]*\)/gi, "");
  out = out.replace(/\s*\(no liquid present\)/gi, "");
  out = out.replace(/\s*\(no broth present\)/gi, "");
  out = out.replace(/\s*\(by by by by by rabbinic law law law law law prohibition\)/gi, "");
  out = out.replace(/\s*\(by by by rabbinic law law law\)/gi, "");

  // Fix lingering “poultry …” artifacts that came from the bad “of→poultry” substitutions.
  out = out.replace(/\bpoultry cooking\b/gi, "cooking");
  out = out.replace(
    /\bpoultry\b\s+(?=Shabbos|Rashi|Yom|Eruvin|Tosafos|Abaye|Ze’eiri|orlah|terumah|proof|the|a|an)/gi,
    ""
  );
  // If "poultry" appears as a stray prefix before ordinary words, drop it.
  out = out.replace(/\bpoultry\s+(?=[a-z])/g, "");
  out = out.replace(/\bpoultry\s+(?=[A-Z])/g, "");
  out = out.replace(/\bamount poultry time\b/gi, "amount of time");
  out = out.replace(/\bthe taste\s+since\b/gi, "the reason is that since");

  // Collapse repeated parenthetical glosses.
  out = out.replace(/(\s*\(for kashering meat\))+/gi, " (for kashering meat)");
  out = out.replace(/(\s*\(overrides most prohibitions\))+/gi, " (overrides most prohibitions)");
  out = out.replace(/(\s*\(toldos ha'or\))+/gi, " (toldos ha'or)");
  // Some paragraphs include hidden bidi marks; treat them as whitespace for de-duping.
  const BIDI = "[\\s\\u200e\\u200f\\u202a-\\u202e]*";
  out = out.replace(new RegExp(`\\(Aramaic\\)(?:${BIDI}\\(Aramaic\\))+`, "gi"), "(Aramaic)");
  out = out.replace(new RegExp(`(?:${BIDI}\\(Aramaic\\))+`, "gi"), " (Aramaic)");

  // Collapse runaway dictionary gloss sequences that were injected earlier.
  // Example: "terumah — priestly portion of produce — terumah — priestly portion of produce — ..."
  out = out.replace(/\bterumah\s+of\s+produce\b/gi, "terumah");
  // Drop the injected gloss text (keep the headword "terumah").
  out = out.replace(
    new RegExp(`${BIDI}[—–-]${BIDI}priestly portion of produce(?:\\s+of\\s+produce)*`, "gi"),
    ""
  );
  out = out.replace(/\bpriestly portion of produce(?:\s+of\s+produce)*/gi, "");
  // Collapse the specific known "terumah — terumah — ..." corruption.
  out = out.replace(/\bterumah\b(?:\s*[—–-]\s*terumah\b){2,}/gi, "terumah");
  out = out.replace(/\bterumah\s+produce\b/gi, "terumah");
  out = out.replace(/\bproduce(?:\s+produce)+\b/gi, "produce");
  out = out.replace(/\bshogeg\s*—\s*unintentionally\b/gi, "shogeg — unintentionally");
  out = out.replace(/\bmeizid\s*—\s*intentionally\b/gi, "meizid — intentionally");
  out = out.replace(
    /\b(meizid\s*—\s*intentionally)(?:\s*—\s*intentionally)+\b/gi,
    "$1"
  );

  // Fix a couple of mangled tokens created by earlier bad replacements.
  out = out.replace(/\bnamehuda\b/g, "name R. Yehuda");
  out = out.replace(/\bR\.\s*Yeand\b/g, "R. Yehuda, and");

  // Normalize a few common dictionary-driven oddities.
  out = out.replace(/\bhand-recoiling sun\b/gi, "hand-recoiling heat");
  out = out.replace(/\bdegree\s+sun\b/gi, "degree of heat");
  out = out.replace(/\bin context\s+uncooked meat\b/gi, "in the context of raw meat");

  // Reduce verbose poskim gloss chains.
  out = out.replace(
    /\bposkim\s*—\s*halachic decisors\s*—\s*halachic poskim\b/gi,
    "poskim"
  );
  out = out.replace(
    /\bposkim\b(?:\s*—\s*halachic decisors\b|\s*—\s*halachic poskim\b)+/gi,
    "poskim"
  );
  out = out.replace(
    /\bhalachic decisors\b(?:\s*—\s*halachic decisors\b|\s*—\s*halachic poskim\b)+/gi,
    "poskim"
  );

  // Collapse repeated "yad soledet bo — ..." chains and remove stray "cooking" after it.
  out = out.replace(/(?:yad soledet bo\s*—\s*){2,}/gi, "yad soledet bo — ");
  out = out.replace(/\byad soledes bo\b/gi, "yad soledet bo");
  out = out.replace(/\byad soledet bo\s*—\s*yad soledet bo(?:\s*—\s*yad soledet bo)+/gi, "yad soledet bo");
  out = out.replace(/\byad soledet bo\s+cooking\b/gi, "yad soledet bo");

  // Fix duplicated words from overlap.
  out = out.replace(/\bthere is there is\b/gi, "there is");

  // Prefer “hot water” over “cooking water”.
  out = out.replace(/\bcooking water\b/gi, "hot water");

  // "cauldron" appears in OC318_Vocabulary_Corrections.md but is skipped when OC318_DICT_ONLY is set
  // (vocab table not applied) — normalize here for קדרה / dye-vat contexts.
  out = out.replace(/\bcauldrons\b/gi, "pots");
  out = out.replace(/\bcauldron\b/gi, "pot");

  // At this point, "poultry" is never a correct token in OC318 English; it only appears due to corruption.
  out = out.replace(/\bpoultry\b/gi, "");
  out = out.replace(/\s{2,}/g, " ");
  out = out.replace(/\s+([,.;:])/g, "$1");

  // Vocabulary table maps `siman` → `chapter`; restore standard OC cross-ref for 247 after that pass.
  out = out.replace(/see above, chapter 247, seif 20/gi, "see above, siman 247, seif 20");
  // Same fix when the seif number had arrow artifacts.
  out = out.replace(/see above, chapter 247, seif\s*\(?20\)?/gi, "see above, siman 247, seif 20");
  // Also handle "seif (20)" and similar after arrow-collapsing.
  out = out.replace(/see above, chapter 247, seif\s*\(\s*20\s*\)/gi, "see above, siman 247, seif 20");

  // Remove leftover single-pass dictionary gloss fragments.
  out = out.replace(/\bmelacha\s*\(forbidden Shabbos melacha\s*\)\s*/gi, "melacha ");

  // Fix double-closing parens from collapsed arrow text.
  out = out.replace(/seif 20\)\./g, "seif 20.");
  out = out.replace(/seif 20\)\}/g, "seif 20}");
  out = out.replace(/seif 20\)\)/g, "seif 20)");

  // Normalize common citation label that got mangled into "chapter (2)".
  out = out.replace(/Lakutei Mahari'v chapter\s*\(?2\)?/gi, "Likkutei Mahari'v siman 2");
  out = out.replace(/Likkutei Mahari'v chapter\s*\(?2\)?/gi, "Likkutei Mahari'v siman 2");

  // Same table turns "this siman" into "this chapter" for בסימן זה citations; restore for Pardes herring note.
  out = out.replace(
    /in this chapter, in the name of Pardes/gi,
    "in this siman, in the name of Pardes"
  );

  out = out.replace(/\bworks\b/gi, "melachos");

  // Dictionary prefers the phrase "the hand is scalded", but our validator treats it as a soft marker.
  // Keep "yad soledet bo" as the canonical English term.
  out = out.replace(/\bthe hand is scalded\b/gi, "yad soledet bo");

  out = out.replace(/\byad soledet bo bo\b/gi, "yad soledet bo");
  out = out.replace(/\byad soledet\b(?!\s+bo\b)/gi, "yad soledet bo");

  // GT glitch: repeated parenthetical "(maliach hayashan)".
  out = out.replace(/(\s*\(maliach hayashan\))+/gi, " (malich yashan)");
  out = out.replace(/(\s*\(malich yashan\))+/gi, " (malich yashan)");

  return out;
}

function fixJsonFile(jsonPath, vocabRules, extraRules) {
  const fullPath = path.resolve(jsonPath);
  if (!fs.existsSync(fullPath)) {
    return false;
  }
  const obj = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  if (!obj || !Array.isArray(obj.seifim)) {
    return false;
  }

  for (const seif of obj.seifim) {
    const sources = seif.sources || {};
    for (const sourceName of Object.keys(sources)) {
      const source = sources[sourceName];
      if (source && typeof source.english === "string") {
        source.english = fixEnglish(source.english, vocabRules, extraRules);
      }
      if (source && Array.isArray(source.notes)) {
        for (const note of source.notes) {
          if (note && typeof note.english === "string") {
            note.english = fixEnglish(note.english, vocabRules, extraRules);
          }
        }
      }
    }
  }

  fs.writeFileSync(fullPath, JSON.stringify(obj, null, 2), "utf8");
  return true;
}

function main() {
  const correctionsPath = path.resolve(VOCABULARY_CORRECTIONS_MD);
  if (!fs.existsSync(correctionsPath)) {
    throw new Error(`${VOCABULARY_CORRECTIONS_MD} not found.`);
  }

  const dictOnly =
    process.env.OC318_DICT_ONLY === "1" ||
    process.env.OC318_DICT_ONLY === "true" ||
    process.env.OC318_DICT_ONLY === "yes";

  const pairs = parseCorrectionPairs(fs.readFileSync(correctionsPath, "utf8"));
  const vocabRules = dictOnly ? [] : buildRulesFromPairs(pairs);
  const extraRules = buildExtraRules();

  // Dictionary rules (if present) take precedence over older vocab rules.
  const dictPath = path.resolve(FULL_DICTIONARY_MD);
  let dictRules = [];
  if (fs.existsSync(dictPath)) {
    const dictPairs = parseFullDictionaryPairs(fs.readFileSync(dictPath, "utf8"));
    dictRules = buildRulesFromPairs(dictPairs);
  }

  const fixed1 = fixJsonFile(
    "data/oc318.full.json",
    [...dictRules, ...vocabRules],
    extraRules
  );
  const fixed2 = fixJsonFile(
    "data/oc318.full.anthropic.json",
    [...dictRules, ...vocabRules],
    extraRules
  );

  if (!fixed1 && !fixed2) {
    throw new Error("No target JSON files found to update.");
  }
  const targets = [fixed1 ? "data/oc318.full.json" : null, fixed2 ? "data/oc318.full.anthropic.json" : null]
    .filter(Boolean)
    .join(", ");

  if (dictRules.length > 0) {
    console.log(
      `Applied ${dictRules.length} dictionary + ${vocabRules.length} vocabulary + ${extraRules.length} extra rules to ${targets}${
        dictOnly ? " (OC318_DICT_ONLY enabled)" : ""
      }`
    );
  } else {
    console.log(
      `Applied ${vocabRules.length} vocabulary + ${extraRules.length} extra rules to ${targets}${
        dictOnly ? " (OC318_DICT_ONLY enabled)" : ""
      }`
    );
  }
}

main();
