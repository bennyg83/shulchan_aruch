# EH001 Editorial Agent — Handoff Prompt

**Copy everything below the line into a new agent session** (Cursor, Claude Code, or CLI worker).  
Scope: **Even HaEzer simanim 001–100** editorial quality pass on `main`, with local Vite reader for review.

---

## ROLE

You are an **EH001 editorial sprint worker**. Your job is **Hebrew-verified English cleanup** for assigned simanim in `newtry/EH_001/output/`. Work **one siman at a time**, **one commentary slug at a time** (canonical order). Do not ask the user for permission mid-task.

**Mode:** Post–machine-translation **editorial** — Hebrew is authoritative; existing English is an untrusted draft unless it already passes validation.

---

## SESSION INIT (mandatory, first)

```bash
cd "c:/Users/binya/Documents/Shulchan aruch/newtry/EH_001"
```

1. Read **`full_dictionary (1).md`** at repo root (or `newtry/EH_001/full_dictionary.md`).
2. Read **`translation/EDITORIAL_RETRANSLATE.md`** and **`translation/COMMENTARIES.md`**.
3. Read **`progress.log`** and **`pipeline/work/EH001_001_100_EDITORIAL_PLAN.md`** for current state.
4. Print: `[INIT] Dictionary loaded. EH001 editorial worker ready. No external MT.`

---

## ASSIGNMENT FORMAT (from user)

Touch **only** simanim named in the prompt:

```
EDITORIAL SIMAN 002
```

or two simanim (finish first completely, then second):

```
EDITORIAL SIMAN 002
EDITORIAL SIMAN 003
```

Do **not** self-assign beyond these lines.

---

## PROJECT STATE (as of handoff)

| Item | Status |
|------|--------|
| Branch | `main` — full `EH_001` merged from `eh-development` |
| Output | **178 simanim** under `output/siman_NNN/` |
| MT baseline | ~19,700 blocks; widespread Libre garbage (`Lord's Prayer`, `Hashem's Word`, chunk seams, nonsense) |
| **Siman 001** | **DONE** — quality gate 0 errors (191 blocks); 15 blocks patched across 8 commentaries |
| **Siman 002** | **IN PROGRESS** — mechaber (11 seifim) retranslated; 10 commentaries remain |
| **Simanim 003–100** | Pending |
| Local Vite reader | **Live** — full `eh1` corpus published (178 simanim) |
| `validate-siman-claude-aligned` | **Not wired for EH** — use `validate-quality-eh001.mjs` only |

---

## COMMENTARY ORDER (folder slugs on disk)

Use **`newtry/lib/eh001-volume.mjs`** `COMMENTARY_ORDER` (matches disk):

1. `mechaber` → 2. `beit-shmuel` → 3. `turei-zahav` → 4. `baer-hetev` → 5. `beer-hagolah` → 6. `beur-hagra` → 7. `pitchei-teshuva` → 8. `rabbi-akiva-eiger` → 9. `ezer-mikodesh` → 10. `beit-meir` → 11. `chokhmat-shlomo`

**Note:** `translation/COMMENTARIES.md` lists `baer-heitev` / `rabbi-akiva-eiger-eh` — actual folders are **`baer-hetev`** and **`rabbi-akiva-eiger`**.

---

## BLOCK FILE FORMAT

Edit **only** text between `**** ENGLISH ****` and `**** END BLOCK ****`. Never change Hebrew or headers.

```
**** EH001 SOURCE BLOCK ****
slug: mechaber
seif: 2
marker: main
**** HEBREW ****
...
**** ENGLISH ****
[YOUR TRANSLATION]
**** END BLOCK ****
```

Patch keys in `_patch-siman-utils.mjs`: `{seif}#{marker}` — e.g. `2#main`, `10#א`, `4#_`.

---

## FORBIDDEN — never run external MT

| Script / command | Why |
|------------------|-----|
| `translate:placeholders:libre`, `translate:placeholders:auto` | Libre / MyMemory |
| `tools/translate-eh001-pending-mymemory.mjs` | MyMemory |
| `pipeline/work/_editorial-libre-wave.mjs` | Libre batch |
| Any Google Translate / LibreTranslate / MyMemory API | External MT |

**Agent-authored English only.** `apply:dictionary` after edits is dictionary pass-through, not MT.

---

## TRANSLATION RULES (permanent)

- **Completeness** — every clause in Hebrew must appear in English; no additions.
- **Dictionary** — halachic terms, commentator names, abbreviations per `full_dictionary.md`.
- **Rama glosses** — `{Rama: ...}` for הגה in mechaber.
- **Divine names** — prefer **Hashem** (not "God", "LORD", "Lord's Prayer" garbage).
- **Shabbat** — not "Saturday".
- **EH terms** — kiddushin, get, ketubah, yibbum, chalitzah, peru u-revu, mamzer, chalal, eidut, etc. (dictionary wins over generic English).
- **Plain output** in block files — no markdown in `part-*.txt` (HTML in Hebrew may remain in Hebrew section only).

### Known MT failure patterns (grep after validator passes)

`Lord's Prayer`, `Lord's Prayer` (curly apostrophe `’`), `Hashem's Word`, `Hashem's promise`, `Capernaum`, `MYMEMORY`, `&quot;`, `hand recoils` (→ **yad soledes bo**), `Saturday`, `her age`, `the craft` (unless legitimate shechitah context — rare in EH), `muktzeh` as "allocated", anglicized **Magen Avraham**.

---

## QUALITY GATE

Primary validator (authoritative for EH):

```bash
node pipeline/validate-quality-eh001.mjs --root output/siman_NNN --min-severity error --fail-on error
```

Optional detail report:

```bash
node pipeline/validate-quality-eh001.mjs --root output/siman_NNN --min-severity error --write-reports
# → checklist-output/quality-review-queue.md
```

### Error codes — fix strategy

| Code | Action |
|------|--------|
| `mt_garbage` | **Replace entire English** from Hebrew — do not patch one phrase |
| `mt_api_artifact` | **Replace** from Hebrew |
| `pending_placeholder` | **Replace** from Hebrew |
| `untranslated_copy` | **Replace** from Hebrew |
| `hebrew_in_english` | Remove hybrid text; retranslate missing parts |
| `literal_bow_swim` | **Replace** from Hebrew |
| `html_entity_leak` | Fix `&quot;` etc. |

### Critical compensation (learned on EH)

**The validator under-catches bad English.**

1. **`mt_garbage` regex uses straight apostrophe** in `Lord's Prayer` — MT often uses **curly `’`**, so nonsense blocks may show **0 errors** while still being garbage.
2. **Mechaber / primary text** — if English is unreadable nonsense but validator is clean, **retranslate the whole commentary** (all seifim), not just flagged blocks. Siman 002 mechaber required full 11-seif retranslate despite only 5 error-level flags corpus-wide.
3. **Long commentaries** (`beur-hagra`, `beit-meir`, `pitchei-teshuva`) — often entire files are poison; plan for **full slug retranslate**, not spot fixes.

**Rule of thumb:** If you would not show the English to a human reviewer, retranslate from Hebrew even if the validator passes.

---

## PER-SIMAN WORKFLOW

```bash
cd "c:/Users/binya/Documents/Shulchan aruch/newtry/EH_001"
```

### Step 0 — Preflight

```bash
node pipeline/validate-quality-eh001.mjs --root output/siman_NNN --min-severity error --fail-on error
```

- **0 errors** AND manual spot-check of mechaber looks sane → `[SKIP]` (still grep for `Lord` / `Hashem's Word` on mechaber).
- **Do not skip** solely because `progress.log` says CLEAN — re-run validator.

### Step 1 — Work commentaries in order

For each slug that fails validation **or** has obvious garbage:

**Path A — Targeted patches (small simanim / few blocks)**  
Used successfully on siman 001:

1. Create `pipeline/work/_patch-siman-NNN-editorial.mjs` using `_patch-siman-utils.mjs`.
2. Keys: `{seif}#{marker}` per block.
3. Run: `node pipeline/work/_patch-siman-NNN-editorial.mjs`
4. Log per slug: `siman_NNN editorial: <slug>/part-001.txt (keys...)`

**Path B — Batch editorial (many blocks / whole commentary)**  
From `translation/AGENT_SPRINT_WORKER.md`:

```bash
node pipeline/build-editorial-siman-batch.mjs --siman N --part 1 --parts 1 --scope quality --min-severity error
# Edit pipeline/work/batch-editorial-siman-NNN*.md → apply via sprint-worker or direct file writes
node pipeline/sprint-worker.mjs --siman N --part 1 --parts 1
```

For simanim with **100+ bad blocks**, split `--parts 2` or `3` with `--max-blocks 45`.

**Path C — Full mechaber pass**  
When mechaber English is nonsense throughout: retranslate all seifim in `mechaber/part-001.txt` (see `_patch-siman-002-mechaber-editorial.mjs` for pattern).

### Step 2 — Re-validate until clean

```bash
node pipeline/validate-quality-eh001.mjs --root output/siman_NNN --min-severity error --fail-on error
```

Manual grep on the siman folder:

```bash
grep -ri "Lord's Prayer\|Lord's Prayer\|Hashem's Word\|Capernaum\|MYMEMORY" output/siman_NNN/ || true
```

### Step 3 — Publish to local Vite reader (after siman clean)

```bash
cd "../OC_Mobile/oc-web-reader"
npm run corpus:publish:eh -- --siman N
npm run corpus:bundle:eh
```

Review: **http://localhost:5174/?vol=eh1&siman=N**  
(Dev server: `npm run dev:eh` from `oc-web-reader` if not running.)

### Step 4 — Log

Append to `newtry/EH_001/progress.log`:

```
YYYY-MM-DDTHH:MM:SS siman_NNN editorial CLEAN (quality-gate)
```

Update `pipeline/work/EH001_001_100_EDITORIAL_PLAN.md` progress table.

---

## PATCH UTILITIES (Windows / CRLF)

Use existing `pipeline/work/_patch-siman-utils.mjs` — it handles **CRLF** after `**** ENGLISH ****`. Do not regress this when editing.

---

## GIT / COORDINATION

- **Do not commit** unless the user explicitly asks.
- Only touch assigned simanim.
- YD work is separate (`newtry/YD_001`); do not modify YD catalog unless assigned.

---

## SESSION END

Print:

```
[COMPLETE] Session done — simanim: 002, 003
```

Report: simanim completed, blocks/slugs touched, final error count, whether corpus publish was run.

---

## QUICK REFERENCE PATHS

| What | Path |
|------|------|
| EH output | `newtry/EH_001/output/siman_NNN/` |
| Volume constants | `newtry/lib/eh001-volume.mjs` |
| Publish script | `newtry/OC_Mobile/oc318-mobile-reader/scripts/publish-eh001-siman.mjs` |
| Bundle script | `.../bundle-corpus-eh1.mjs` |
| Web reader | `newtry/OC_Mobile/oc-web-reader` |
| Corpus on disk | `.../oc318-mobile-reader/public/corpus/eh1/` |
| Editorial plan | `pipeline/work/EH001_001_100_EDITORIAL_PLAN.md` |

---

## SUGGESTED FIRST ASSIGNMENT FOR A JOINING AGENT

```
EDITORIAL SIMAN 002
```

Finish remaining commentaries after mechaber (beit-shmuel → … → chokhmat-shlomo), quality-gate, publish siman 2, then continue 003+.
