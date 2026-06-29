# Codex Task: EH001 Cleanup, Quality Pass, and Publish

## Repository root
All paths below are relative to: `C:\Users\binya\Documents\Shulchan aruch`

---

## CRITICAL — Path discipline

Do NOT write output to any other directory. The correct paths are:

| Layer | Correct path |
|---|---|
| TXT source (read + edit) | `newtry/EH_001/output/siman_NNN/<slug>/part-*.txt` |
| Corpus HTML (written by publish script) | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/eh1/simanN/seif-NNN/<slug>/en.html` |
| Bundles (written by bundle script) | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/eh1/bundles/` |
| Patch scripts | `newtry/EH_001/pipeline/work/` (read-only reference) |

Do NOT write corpus files into `newtry/EH_001/`, `Sefaria Pulls/`, or any other path.
Do NOT use `corpus/oc1/` or `corpus/yd1/` paths — this is `eh1` only.

---

## Scope

178 simanim (1–178) of Even HaEzer. Commentators per siman vary; see
`newtry/EH_001/output/siman_NNN/` for what exists.

**Typical commentators:** mechaber, beit-shmuel, beit-meir, beur-hagra, turei-zahav,
baer-hetev, beer-hagolah, chokhmat-shlomo, ezer-mikodesh, pitchei-teshuva, rabbi-akiva-eiger.

---

## Phase 1 — Apply existing patches for siman_001 (run first)

Pre-written clean translations exist as patch scripts. Apply them in order:

```bash
cd "C:\Users\binya\Documents\Shulchan aruch\newtry\EH_001"

# Root-level patches (run from EH_001 dir)
node _patch-siman-001-beit-meir-full.mjs
node _patch-siman-001-chokhmat-shlomo-full.mjs
node _patch-siman-001-ezer-mikodesh-full.mjs
node _patch-siman-001-rabbi-akiva-eiger-full.mjs

# Pipeline/work patches (run from EH_001 dir — they resolve paths from there via __dirname)
node pipeline/work/_patch-siman-001-beit-shmuel-full.mjs
node pipeline/work/_patch-siman-001-beur-hagra-full.mjs
node pipeline/work/_patch-siman-001-turei-zahav-full.mjs
node pipeline/work/_patch-siman-001-editorial.mjs
node pipeline/work/_patch-siman-001-baer-hetev-full.mjs
node pipeline/work/_patch-siman-001-beer-hagolah-full.mjs
node pipeline/work/_patch-siman-001-pitchei-teshuva-full.mjs
node pipeline/work/_patch-siman-001-mechaber-full.mjs
```

---

## Phase 2 — Scan and retranslate remaining TXT garbage

After applying patches, scan all 178 simanim for garbage patterns. Run the existing
scan script (already at repo root):

```bash
cd "C:\Users\binya\Documents\Shulchan aruch"
node _scan_eh_garbage.mjs
```

For every file that still reports hits:
1. Open the TXT file at `newtry/EH_001/output/siman_NNN/<slug>/part-*.txt`
2. Find every ENGLISH block that matches a garbage pattern
3. Retranslate that block from the Hebrew block above it (see translation rules below)
4. Write only between `**** ENGLISH ****` and `**** END BLOCK ****` — never change Hebrew or headers

### Garbage patterns to fix
Any English block containing:
- `Hashem's Word` / `Hashem's mercy` / `Hashem's people` / `Hashem's promise`
- `Lord's Prayer` (or encoding variant `Lordâ€™s Prayer`)
- `cursed in every season` / `shall be cursed by his husband`
- `I am reminded of Hashem`
- `KGB` / `terrorist` / `Starwork` / `Bible and the Bible`
- `M.M.M` / `D.D.D`
- `her age` (only if clearly nonsensical — the phrase "believed regarding her age" IS legitimate)
- `whites of the snail`
- Encoding artifacts: `â€™` / `â€œ` / `â€`

### Encoding artifacts (`html_entity_leak`)
If an ENGLISH block contains `&quot;` / `&amp;` / `&lt;` / `&gt;`:
- Replace `&quot;` → `"`, `&amp;` → `&`, `&lt;` → `<`, `&gt;` → `>`
- Do NOT remove `<unclear>` or `<unclear?>` markers — those are intentional

---

## Phase 3 — Quality pass (all 178 simanim, all commentators)

For each TXT file in `newtry/EH_001/output/`, read every ENGLISH block and evaluate:

**Fix if the translation is:**
- Gibberish or clearly machine-translated nonsense not caught by garbage patterns
- Missing halachic terminology that should come from the dictionary (see below)
- Using generic words where the dictionary mandates specific terms (e.g. "prohibited" instead of "assur", "permitted" instead of "mutar" — consult dictionary)
- Incomplete (cuts off mid-sentence, or is clearly shorter than the Hebrew warrants)
- A duplicate phrase at a seam (e.g. "The Beit Shmuel The Beit Shmuel")

**Do NOT change if the translation is:**
- Accurate but uses slightly different phrasing — only fix clear errors
- Already in the format `**lemma** — commentary text`
- A `{Rama: ...}` gloss (the `{Rama: ...}` wrapper is required and must stay)

### TXT block format
```
**** EH001 SOURCE BLOCK ****
slug: beit-shmuel
seif: 3
marker: א
**** HEBREW ****
[Hebrew — may contain HTML markup, do not touch]
**** ENGLISH ****
[REPLACE THIS LINE WITH TRANSLATION — nothing else]
**** END BLOCK ****
```

Edit ONLY the lines between `**** ENGLISH ****` and `**** END BLOCK ****`.
The translation goes on one line (no internal newlines unless the Hebrew itself has `<br>` splits — see rule below).

---

## Translation rules (mandatory)

### 1. Dictionary compliance
Read `full_dictionary (1).md` from the **repository root** (`C:\Users\binya\Documents\Shulchan aruch\full_dictionary (1).md`) before translating. There is also a copy at `newtry/EH_001/full_dictionary.md` — the repo-root copy is authoritative. Use its terms for:
- All halachic concepts (issur, heter, mutar, assur, safek, vadai, onah, chalitzah, yibbum, kiddushin, get, chuppah, etc.)
- Commentator names (Rambam, Ramban, Tur, Beit Shmuel, Chelkat Mechokek, etc.)
- Abbreviations: expand ר"מ → Rambam, ב"י → Beit Yosef, ש"ך → Shach, etc.

### 2. Hebrew is authoritative
Translate fresh from Hebrew. Do not patch or preserve existing bad English. The Hebrew is the source of truth.

### 3. `{Rama: ...}` glosses
Whenever the Hebrew contains `הגה` or is clearly a Rama gloss (often in parentheses or after the Mechaber text), wrap it: `{Rama: ...translated text...}`.

### 4. `<br>` count matching
If the Hebrew block has N `<br>` tags inside it (not counting structural ones between blocks), the English must have exactly N `<br>` tags at the matching logical split points. This is critical for bilingual display alignment.

### 5. Bold lemmas
Commentary blocks typically start with a bold lemma quoting the opening words of the text being commented on. Format as: `**"opening words of the Hebrew lemma"** — commentary text.`

### 6. Aramaic
Translate Aramaic phrases (common in Talmudic citations) — do not leave them in Aramaic.

### 7. Numbers and simanim references
- Write out siman numbers: `siman 42`, not `ס"ב`
- Seif references: `seif 3`, not `ס"ג`
- After expanding, use the English form

### 8. Single-line output
Each block's English must be a single paragraph (no blank lines). Use ` — ` for clause separations where the Hebrew uses em-dash or long pauses.

---

## Phase 4 — Structural QA on TXT files

After translation, check these structural issues across all files:

### 4a. `</b><br>` in commentary headers (NON-mechaber/rama files)
Commentary English blocks that start with `<b>...</b><br>` are wrong — the `<br>` after `</b>` misaligns bilingual rows.
**Fix:** remove the `<br>` so it reads `<b>...</b> commentary text`.
**Exception:** mechaber and rama files DO require `<br>` after `</b>Seif N.</b>` — leave those alone.

### 4b. `Seif N —` prefix leakage
If any commentary block (non-mechaber) contains `Seif [0-9]` in the body text, remove it. That prefix belongs only in mechaber/rama files.

### 4c. Duplicate phrases
Scan for consecutive repeated words: e.g. `The Beit Shmuel The Beit Shmuel`. Remove the duplicate.

---

## Phase 5 — Validate TXT

```bash
cd "C:\Users\binya\Documents\Shulchan aruch\newtry\EH_001"
node pipeline/validate-quality-eh001.mjs --root output --min-severity error --fail-on error
```

Fix any remaining errors. Re-run until 0 errors.

---

## Phase 6 — Publish TXT → Corpus HTML

Run from `oc318-mobile-reader` directory:

```bash
cd "C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader"
node scripts/publish-eh001-siman.mjs --from 1 --to 178 --write-catalog
```

**This writes to:** `public/corpus/eh1/simanN/seif-NNN/<slug>/en.html` (and he.html)
**Do NOT** run publish-oc001-siman.mjs or publish-yd001-siman.mjs — those are different volumes.

---

## Phase 7 — Rebuild bundles

```bash
cd "C:\Users\binya\Documents\Shulchan aruch\newtry\OC_Mobile\oc318-mobile-reader"
node scripts/bundle-corpus-eh1.mjs
```

**This writes to:** `public/corpus/eh1/bundles/siman*.json`

---

## Phase 8 — Final corpus garbage check

```bash
cd "C:\Users\binya\Documents\Shulchan aruch"
node _scan_eh_garbage.mjs
```

Expected result: 0 files with hits (the `siman_142/mechaber` `<unclear>` entries and `siman_155/mechaber` "her age" are false positives — those are acceptable).

---

## Summary of correct paths (repeat for emphasis)

| What | Path |
|---|---|
| Read/edit TXT | `newtry/EH_001/output/siman_NNN/<slug>/part-*.txt` |
| DO NOT touch | `newtry/EH_001/checklist-output/` or `pipeline/work/` outputs |
| Corpus HTML output | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/eh1/` |
| Bundles output | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/eh1/bundles/` |
| Publish script | `newtry/OC_Mobile/oc318-mobile-reader/scripts/publish-eh001-siman.mjs` |
| Bundle script | `newtry/OC_Mobile/oc318-mobile-reader/scripts/bundle-corpus-eh1.mjs` |
| Validation | `newtry/EH_001/pipeline/validate-quality-eh001.mjs` |
| Garbage scan | `_scan_eh_garbage.mjs` (repo root) |
| Dictionary | `full_dictionary (1).md` (repo root) — authoritative |
