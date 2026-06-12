/**
 * Heuristic quality checks for YD001 English blocks (post-MT / pre-editorial).
 */

export const SEVERITY = /** @type {const} */ ({
  error: 3,
  warn: 2,
  info: 1,
});

/** @typedef {{ code: string, severity: keyof typeof SEVERITY, message: string, detail?: string }} QualityIssue */

const MT_ARTIFACT_RE =
  /QUERY LENGTH LIMIT|MYMEMORY WARNING|INVALID SOURCE LANGUAGE|AUTO DETECT|ERR:INVALID|EXAMPLE:\s*SOURCE/i;

const PLACEHOLDER_RE = /^English translation pending/i;

/** Known Libre / chunk-failure garbage (siman 113 and similar). */
const MT_GARBAGE_PHRASE_RE =
  /\bCapernaum\b|\bthe rest of the hole\b|\bLord['\u2019]s Prayer\b|\bHashem['\u2019]s promise to Abraham and Hashem\b|\bISIS\b|\bmonkey before\b|\blive in a fish\b|\bin a ovary\b|\bmiddle of KW\b|\bnot to be sent\b|\bfor the purpose of debiting\b|\bmemoting itself\b|\bthe demons do not belong\b|\bHashem['\u2019]s Word\b|\bHoly Qur['\u2019]an\b|\bthe psalmist\b/i;

const HTML_ENTITY_LEAK_RE = /&quot;|&amp;lt;|&amp;gt;/;

/** Hebrew discusses bowing (שוחה/כריעה); English wrongly says swim — common Libre mistake. */
function bowSwimMismatch(hePlain, enPlain) {
  const heBow = /שוח|כריע|השתח|זקיפ|כורע|משתח/i.test(hePlain);
  const enSwim = /\b(swim|swimming|swam|swims)\b/i.test(enPlain);
  return heBow && enSwim;
}

/** Mishnah Berurah markers א ב ג — English label should match (not wrong letter). */
function markerLabelMismatch(marker, enPlain) {
  const mk = String(marker ?? "_").trim();
  if (!/^[א-ת]$/.test(mk)) return false;
  const head = enPlain.slice(0, 12);
  if (head.includes(`(${mk})`)) return false;
  const wrong = head.match(/^\(([א-ת])\)/);
  if (wrong && wrong[1] !== mk) return true;
  const wrongLatin = head.match(/^\(([a-z])\)/i);
  if (wrongLatin && wrongLatin[1] !== mk) return true;
  return enPlain.length > 20 && !head.includes(mk);
}

export function plainFromHtml(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countHebrewChars(s) {
  return (String(s).match(/[\u0590-\u05FF]/g) || []).length;
}

function normalizeCompare(s) {
  return plainFromHtml(s)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Libre chunk seams: same long substring twice with little gap between. */
function hasChunkSeamDuplicate(text) {
  const t = plainFromHtml(text);
  const minLen = 55;
  if (t.length < minLen * 2 + 20) return false;
  for (let len = Math.min(100, Math.floor(t.length / 2)); len >= minLen; len -= 8) {
    for (let i = 0; i <= t.length - len * 2; i++) {
      const slice = t.slice(i, i + len);
      if (slice.length < minLen) continue;
      const next = t.indexOf(slice, i + len);
      if (next !== -1 && next - (i + len) < 12) return true;
    }
  }
  return false;
}

function htmlTagBalance(html) {
  const tags = String(html ?? "").match(/<\/?[a-z][a-z0-9]*\b[^>]*>/gi) || [];
  const stack = [];
  const voidTags = new Set([
    "br",
    "hr",
    "img",
    "meta",
    "link",
    "input",
    "col",
    "area",
    "base",
    "embed",
    "source",
    "track",
    "wbr",
  ]);
  for (const raw of tags) {
    const closing = raw.startsWith("</");
    const name = (closing ? raw.slice(2) : raw.slice(1)).replace(/[/>].*$/, "").trim().toLowerCase();
    if (!name || voidTags.has(name)) continue;
    if (closing) {
      if (stack.length && stack[stack.length - 1] === name) stack.pop();
      else return false;
    } else if (!raw.endsWith("/>")) stack.push(name);
  }
  return stack.length === 0;
}

/**
 * @param {{ slug: string, seif: string|number, marker: string, he: string, en: string }} block
 * @returns {QualityIssue[]}
 */
export function runBlockQualityChecks(block) {
  const issues = /** @type {QualityIssue[]} */ ([]);
  const en = String(block.en ?? "").trim();
  const he = String(block.he ?? "").trim();
  const enPlain = plainFromHtml(en);
  const hePlain = plainFromHtml(he);

  if (!en || PLACEHOLDER_RE.test(en)) {
    issues.push({
      code: "pending_placeholder",
      severity: "error",
      message: "English is still the placeholder",
    });
    return issues;
  }

  if (!enPlain) {
    issues.push({
      code: "empty_english",
      severity: "error",
      message: "English section has no visible text",
    });
    return issues;
  }

  if (MT_ARTIFACT_RE.test(en)) {
    issues.push({
      code: "mt_api_artifact",
      severity: "error",
      message: "Machine-translation API error text in English",
    });
  }

  const heInEn = countHebrewChars(enPlain);
  if (heInEn >= 12 || (hePlain.length > 30 && heInEn / enPlain.length > 0.2)) {
    issues.push({
      code: "hebrew_in_english",
      severity: "error",
      message: `Hebrew characters in English (${heInEn})`,
    });
  } else if (heInEn >= 4) {
    issues.push({
      code: "hebrew_in_english",
      severity: "warn",
      message: `Some Hebrew left in English (${heInEn} chars)`,
    });
  }

  if (hePlain.length > 25 && enPlain.length > 25) {
    const nh = normalizeCompare(he);
    const ne = normalizeCompare(en);
    if (nh.length > 20 && nh === ne) {
      issues.push({
        code: "untranslated_copy",
        severity: "error",
        message: "English matches Hebrew (likely untranslated)",
      });
    }
  }

  if (hePlain.length > 60) {
    const ratio = enPlain.length / hePlain.length;
    if (ratio < 0.1) {
      issues.push({
        code: "suspicious_short",
        severity: "warn",
        message: `English much shorter than Hebrew (${Math.round(ratio * 100)}% length)`,
      });
    } else if (ratio > 4.5) {
      issues.push({
        code: "suspicious_long",
        severity: "info",
        message: `English much longer than Hebrew (${Math.round(ratio * 100)}% length)`,
      });
    }
  }

  if (en.includes("<") && !htmlTagBalance(en)) {
    issues.push({
      code: "broken_html",
      severity: "warn",
      message: "Unbalanced HTML tags in English",
    });
  }

  if (hasChunkSeamDuplicate(en)) {
    issues.push({
      code: "chunk_seam_duplicate",
      severity: "warn",
      message: "Adjacent repeated phrase (possible Libre chunk seam)",
    });
  }

  if (/\bGod\b/.test(enPlain) || /\bLORD\b/i.test(enPlain)) {
    issues.push({
      code: "divine_name_style",
      severity: "info",
      message: 'Uses "God" or "LORD" — prefer "Hashem" per house style',
    });
  }

  if (/\bSabbath\b/i.test(enPlain)) {
    issues.push({
      code: "shabbat_style",
      severity: "info",
      message: 'Uses "Sabbath" — house style prefers "Shabbat"',
    });
  }

  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(en)) {
    issues.push({
      code: "control_chars",
      severity: "warn",
      message: "Control characters in English",
    });
  }

  if (MT_GARBAGE_PHRASE_RE.test(enPlain)) {
    issues.push({
      code: "mt_garbage",
      severity: "error",
      message: "Nonsense or biblical stray phrase (failed MT chunk)",
    });
  }

  if (HTML_ENTITY_LEAK_RE.test(en)) {
    issues.push({
      code: "html_entity_leak",
      severity: "warn",
      message: "Raw HTML entities (&quot; etc.) in English",
    });
  }

  if (bowSwimMismatch(hePlain, enPlain)) {
    issues.push({
      code: "literal_bow_swim",
      severity: "error",
      message: 'Hebrew bowing (שוחה/כריעה) rendered as "swim" — re-translate or edit',
    });
  }

  if (markerLabelMismatch(block.marker, enPlain)) {
    issues.push({
      code: "marker_label_mismatch",
      severity: "warn",
      message: `Marker ${block.marker} does not match opening label in English`,
    });
  }

  if (
    hePlain.length > 40 &&
    enPlain.length > 40 &&
    !issues.some((i) => i.code === "untranslated_copy")
  ) {
    const heWords = new Set(hePlain.split(/\s+/).filter((w) => w.length > 2));
    const enWords = enPlain.split(/\s+/).filter((w) => w.length > 2);
    const overlap =
      enWords.filter((w) => heWords.has(w)).length / Math.max(1, enWords.length);
    if (overlap > 0.55 && countHebrewChars(hePlain) > 15) {
      issues.push({
        code: "overliteral",
        severity: "warn",
        message: "English shares many tokens with Hebrew (over-literal MT)",
      });
    }
  }

  return issues;
}

/** Lower score = worse. 100 = clean. */
export function scoreBlock(issues) {
  let score = 100;
  for (const i of issues) {
    if (i.severity === "error") score -= 35;
    else if (i.severity === "warn") score -= 12;
    else score -= 4;
  }
  return Math.max(0, score);
}

export function maxSeverity(issues) {
  let max = 0;
  for (const i of issues) {
    max = Math.max(max, SEVERITY[i.severity] ?? 0);
  }
  return max;
}

export function severityLabel(level) {
  if (level >= SEVERITY.error) return "error";
  if (level >= SEVERITY.warn) return "warn";
  return level > 0 ? "info" : "ok";
}
