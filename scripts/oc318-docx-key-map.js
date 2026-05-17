/**
 * Map DOCX paragraph indices (non-empty paragraphs, 0-based enumerate) to JSON English setters.
 * Mirrors scripts/build-oc318-txt.js emission: each non-blank output line increments the counter.
 * Keys used by apply-oc318-line-corrections.js: docxParagraphIndex = nonBlankCountBeforeEnglish + offset.
 * Default offset 2 accounts for title + sources lines at the top of review DOCX exports.
 */
const SOURCE_ORDER = [
  "Mechaber and Rama",
  "Tur",
  "Magen Avraham",
  "Taz",
  "Be'er Heitev",
  "Biur Halacha",
  "Shulchan Aruch K'pshuto",
];

function hasValue(s) {
  return typeof s === "string" && s.trim().length > 0;
}

function normalizeNewlines(s) {
  return String(s).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function emitNonBlank(nbRef, text) {
  const t = normalizeNewlines(String(text)).trim();
  if (!t.length) return;
  nbRef.nb += 1;
}

/**
 * Walk the same logical lines as build-oc318-txt.js and invoke onEnglish before each English line is emitted.
 * @param {object} obj
 * @param {number} offset
 * @param {(ctx: { docxKey: number, set: (s: string) => void, preview: string, seif: number, source: string }) => void} onEnglish
 */
function walkEnglishParagraphs(obj, offset, onEnglish) {
  const nbRef = { nb: 0 };

  for (const seif of obj.seifim) {
    emitNonBlank(nbRef, `=== SEIF ${seif.number} ===`);
    emitNonBlank(nbRef, "");

    const sources = seif.sources || {};
    const mr = sources["Mechaber and Rama"];
    emitNonBlank(nbRef, "[Mechaber and Rama]");
    emitNonBlank(nbRef, mr.hebrew);

    const docxKey = nbRef.nb + offset;
    const preview = String(mr.english || "").slice(0, 72).replace(/\s+/g, " ");
    onEnglish({
      docxKey,
      set: (t) => {
        mr.english = t;
      },
      preview,
      seif: seif.number,
      source: "Mechaber and Rama",
    });
    emitNonBlank(nbRef, mr.english);

    for (const sourceName of SOURCE_ORDER.slice(1)) {
      const block = sources[sourceName];
      if (!block || !Array.isArray(block.notes) || block.notes.length === 0) continue;

      emitNonBlank(nbRef, `[${sourceName}]`);
      emitNonBlank(nbRef, "");

      for (const note of block.notes) {
        if (!note || !hasValue(note.hebrew) || !hasValue(note.english)) continue;
        emitNonBlank(nbRef, note.hebrew);

        const key = nbRef.nb + offset;
        const prev = String(note.english || "").slice(0, 72).replace(/\s+/g, " ");
        onEnglish({
          docxKey: key,
          set: (t) => {
            note.english = t;
          },
          preview: prev,
          seif: seif.number,
          source: sourceName,
        });
        emitNonBlank(nbRef, note.english);
      }
    }

    emitNonBlank(nbRef, "");
  }
}

/**
 * @param {object} obj parsed oc318.full.json
 * @param {number} offset added to non-blank count before each English line (default 2)
 * @returns {Map<number, { set: (s: string) => void }>}
 */
function buildDocxParagraphKeyToSetter(obj, offset) {
  /** @type {Map<number, { set: (s: string) => void }>} */
  const map = new Map();
  walkEnglishParagraphs(obj, offset, ({ docxKey, set }) => {
    map.set(docxKey, { set });
  });
  return map;
}

module.exports = {
  SOURCE_ORDER,
  hasValue,
  normalizeNewlines,
  walkEnglishParagraphs,
  buildDocxParagraphKeyToSetter,
};
