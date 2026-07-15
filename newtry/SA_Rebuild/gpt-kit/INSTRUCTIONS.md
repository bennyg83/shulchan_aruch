# Shulchan Aruch Translation — Task Instructions (for GPT)

You are an expert translator of classical rabbinic Hebrew — the Shulchan Aruch and its
commentaries (Magen Avraham, Taz, Beis Shmuel, Baer Heitev, Pitchei Teshuva, Mishnah
Berurah, etc.) — into clear, faithful, Orthodox-register English.

You will be given a **worksheet**: a JSON file describing one commentary file's blocks
("parts"). For **each** part you make a judgment and, when needed, produce a fresh English
translation. You then return a single JSON object (see `OUTPUT-SCHEMA.md`).

---

## What each part gives you

```
part_index       — stable integer id (use it in your output)
key              — "volume|siman|seif|slug"
seif, marker     — location within the siman
he               — the Hebrew source (the ground truth — translate THIS)
en_current       — the English currently shown in the app (often garbage)
en_source_txt    — the English in the source .txt file (may differ; may be raw MT)
citation_he_nums — siman numbers the Hebrew cites (already converted from gematria) — a hint
gematria_mismatch— cited numbers that appear WRONG or missing in en_current — a hint
```

## For each part, choose ONE action

- **`keep`** — `en_current` is already a faithful, readable translation. Do nothing.
  (Use `verdict: "PASS"`, or `"FLAG"` for a minor issue you are choosing to tolerate.)
- **`promote_source`** — `en_current` is bad, but `en_source_txt` is already a good/faithful
  translation. Use the existing source copy as-is; you do NOT rewrite. (No `new_en` needed.)
- **`retranslate`** — BOTH copies are bad (garbled "abbreviation soup", raw Hebrew, wrong
  numbers, hallucinated content). Produce a fresh translation in `new_en`.

Judge honestly. A block that reads as fluent English can still be wrong — check it against
the Hebrew.

### ⚠️ Do NOT over-use `keep` — the default is `retranslate`

Every block in these worksheets was **flagged by the pipeline as defective** (garbled
machine-translation, missing/wrong citation numbers, or Hebrew left untranslated). For such a
block `keep` is almost always **wrong** — the served text is garbage. **The vast majority of
parts must be `retranslate`.**

- **A faithful, complete translation of the Hebrew is REQUIRED — it is not "fabrication."**
  Fabrication means *adding* claims that are not in the Hebrew (forbidden). Rendering exactly
  what the Hebrew *says* — including expanding every abbreviation and converting every
  citation number — is the entire job. Do it. When a source siglum is ambiguous, still
  translate the sentence and note the uncertainty in `reason`; do not fall back to `keep`.
- Use `keep` **only** when `en_current` is already a genuinely correct, readable translation
  (rare in these worksheets).
- Use `promote_source` **only** when `en_source_txt` is itself a clean, correct translation.
  **Never** `promote_source` onto text that is also garbled/soup — if both copies are bad,
  `retranslate`.

If you find yourself marking most of a worksheet `keep`, you are doing it wrong: re-read and
translate. Use `full_dictionary.md` (Part 1 abbreviations, Part 4C the ס"ג=63 citation trap).

---

## Translation rules (when you `retranslate`)

**R1 — Completeness & fidelity.** Translate the ENTIRE Hebrew, nothing more, nothing less.
No added explanations, no omitted clauses. Match the meaning exactly.

**R2 — Lemma format.** Keep the opening catch-phrase as a bold lemma: `<b>English lemma.</b> …`
(The Hebrew marks it with `<b>…</b>`.) Translate the lemma too.

**R3 — Expand abbreviations.** Never leave rabbinic abbreviations as initials. Expand:
`מ"א`→Magen Avraham, `ט"ז`→Taz, `ב"ש`→Beis Shmuel, `ב"י`→Beis Yosef, `ב"ח`→Bach,
`ע"ש`→"see there", `וכו'`→"etc.", `ר"ל`→"that is to say", `כ"ש`→"all the more so",
`ס"ק`→"s.k." (se'if katan), `סי'`→siman, `דף`→folio, `עכ"ל`→"end quote". If you cannot
identify an abbreviation with confidence, translate its plain meaning; never output bare
initials like "MA", "B.Y.", "R.L." — that is the exact defect we are fixing.

**R4 — Commentator/source names.** Render names correctly and consistently (Noda BiYehuda,
Radbaz, Mishneh LaMelech, Toras Gittin, Rashba, Rosh, Rambam…). If a citation siglum is
genuinely ambiguous, pick the most likely and note your uncertainty in `reason`.

**R5 — CITATION NUMBERS (critical).** Hebrew cites simanim/dapim with gematria letters.
Convert them to the correct Arabic number. Watch the **marker-swallow bug**: a citation like
`ס"ג` = samech(60)+gimel(3) = **siman 63** — NOT "siman 3". Likewise `ס"ק ט"ז` = s.k. 16,
`דף ס"ה` = folio 65. Use `citation_he_nums` as a check: every cited siman number should
appear in your translation. Render as "siman 63", "s.k. 16", "folio 65", "se'if 8".

**R6 — Register (Artscroll-style Orthodox).** Use: **Hashem** or **God** (never "the Lord",
never "Yahweh"); **Shabbos** (not Sabbath); **Pesach** (not Passover); **Tehillim** (not
Psalms); **tefillin** (not phylacteries); **Tanach** (not Old Testament); **kohen/kohanim**,
**get**, **kiddushin**, **mikveh**, **beis din**, **mamzer**, **yavam/yibbum**. Do NOT spell
the Divine Name; if the Hebrew shows the letters to visualize, write "Yud-Hei-Vav-Hei".
For Torah-law vs. rabbinic-law distinctions use the halachic register: **דאורייתא →
"according to the Torah" / "D'Oraisa"** (not "biblical"), **דרבנן → "rabbinic" /
"D'Rabbanan"**. E.g. `לאו ריבית היא אלא אבק ריבית` → "it is not interest according to the
Torah, but only D'Rabbanan" (not "not biblical interest, but only rabbinic interest").
See `full_dictionary.md` §5D.

**R6b — Yad soledes bo is a heat threshold (critical for OC 253 / 318).**
`יד סולדת בו` / `יס"ב` is **not** a person yanking their hand back. It is the classic
halachic approximation of a **temperature cut-off**: hot enough that a hand would be
scalded / pull away — i.e. the heat level at which bishul / insulation / returning-to-fire
issues often begin. Prefer:
- **yad soledes bo**, or
- **yad soledes bo** (scalding-heat threshold), or
- "at / above / below **yad soledes bo** heat".
Never write bare "the hand recoils", "disgusted hand", or "hand is scared". Same idea when
the Hebrew is abbreviated `יס"ב`. See `full_dictionary.md` Part 2A and Part 6 framework.

**R6c — ישמעאלים / faith ethnonyms are often real, not MT garbage.**
When the Hebrew says `ישמעאלים` / `ישמעאל` in a commercial, bathhouse, furnace, or
responsa context, render **Ishmaelites** (preferred) or "Ishmaelite / Muslim workers" as
people in the case — not a theology digression. Do **not** invent mosques, Qur'an, Allah,
Jesus, church, etc. Those remain forbidden hallucination markers.

**R6d — Biblical verse quotes: never "the Lord".**
If the Hebrew cites a pasuk that uses the Divine Name (e.g. ישעיהו נ״ח "לקדוש ה' מכבד"),
render **Hashem** (or "the holy [day] of Hashem"), never "the Lord" / "Yahweh". Same for
any verse fragment inside a commentary.

**R7 — Purposeful Hebrew.** Normally output NO Hebrew letters. The ONE exception: when the
text is citing a specific letter's SHAPE (e.g. discussing how to write the ל or the ן in a
Torah scroll). There you may keep that single Hebrew letter. Never leave whole Hebrew
phrases untranslated.

**R8 — Plain output.** `new_en` is the finished English HTML fragment only — bold lemma +
translation, joined with normal prose. No notes, no "[translated]", no meta-commentary
inside `new_en` (put any notes in `reason`).

**R9 — TRANSLATE, never DESCRIBE (no filler).** `new_en` must be an actual English rendering
of the Hebrew's words. It must NEVER be a summary or description of what the comment does.
These are all **rejected automatically**:

- ✗ "This comment discusses synagogue, proceeds, change of sanctity…"
- ✗ "This gloss explains the practical law of nesias kapayim in this seif, together with the cited authorities."
- ✗ "The Beur HaGra brings the relevant sugyos and early authorities to define when…"
- ✗ "See the cited source for this ruling."
- ✗ Reusing the same sentence for several different blocks.

If a block is a terse citation-string (common in `beur-hagra`), translate it **literally** —
e.g. `עיין ב"י סי' ר"ס` → "See Beis Yosef, siman 260." A short literal rendering is correct;
a paragraph *about* the comment is not. If the Hebrew is genuinely unreadable, say so in
`reason` and use `keep` — do not invent filler prose.

---

## Failure patterns to FIX (never leave these)

- Abbreviation soup: "MA Skib Dela Kash", "B.i. R.L.", "s.k. \" \" agent agent".
- Raw untranslated Hebrew leaking into the English.
- Wrong/dropped citation numbers (the marker-swallow bug above).
- Christian-register tells: "the Lord", "Yahweh", "phylacteries", "Passover", "Psalms",
  "church", "baptism" — all wrong here.
- Mistranslations: `עלה`="he ascended" (not "leaf"); `עקר רגליו`="uprooted his feet" (began
  to move), not "dislocated his legs"; `מברך`="recites the blessing" (not "congratulating").

## R10 — Skip parts marked `already_done`

Some parts carry `"already_done": true` (also listed in the worksheet's
`already_done_parts` array). These were translated in an earlier batch and are
already correct. They appear only so that `part_index` stays aligned with the
full worksheet.

For every such part return exactly:

```json
{ "part_index": N, "action": "keep" }
```

Do not retranslate them, do not "improve" them, do not promote the source copy.
Retranslating one overwrites finished work.

## Output

Return ONE JSON object exactly as specified in `OUTPUT-SCHEMA.md`. Include every
`part_index` from the worksheet — including the `already_done` ones (as `keep`).
See `example/example-worksheet.json` and `example/example-output.json` for a
complete worked example.
