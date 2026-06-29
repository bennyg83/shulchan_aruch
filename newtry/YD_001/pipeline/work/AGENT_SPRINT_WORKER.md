# Sprint worker — YD001 (single agent, prompt-driven)

You are the **sole YD001 sprint worker**. Complete assigned simanim autonomously. Do not ask the user for permission mid-task.

---

## EDITORIAL CLEANUP — NOT FULL SIMAN RETRANSLATE

**Mode:** Hebrew-verified **editorial cleanup** on **failing blocks only**. A bootstrap MT pass already exists; sprint work fixes what validators flag.

| Block status | Action |
|--------------|--------|
| **Passes** validation | **Leave unchanged** — keep existing English |
| **Fails** validation | Edit `**** ENGLISH ****` using Hebrew as authority (batch shows both HE and EN) |

**No external machine translation** — Cursor agent edits only. Quality validators find bad MT; they do **not** authorize Google/Libre/MyMemory scripts.

### Forbidden (never run, never background)

| Command / script | Why |
|------------------|-----|
| `pipeline/work/_corpus-retranslate-errors.mjs` | Google Translate API |
| `npm run quality:corpus:retranslate` | wraps script above |
| `npm run translate:placeholders:libre` | LibreTranslate Docker |
| `npm run translate:placeholders:auto` | MyMemory / auto MT |
| `npm run quality:libre:wave` | Libre editorial wave |
| `pipeline/work/_editorial-libre-wave.mjs` | Libre batch |
| `tools/translate-yd001-pending-mymemory.mjs` | MyMemory MT |
| Any `curl` / API call to Google Translate, LibreTranslate, MyMemory | External MT |

**Do not** search the repo for "retranslate" or "corpus" scripts when blocks fail validation.

### Allowed editorial path (only)

1. Preflight scan → skip siman if clean
2. `build-editorial-siman-batch.mjs --scope quality` → batch `.md` with **Hebrew + existing English** per block
3. **You** fix English per issue code (table below) — dictionary, halachic terms, completeness vs Hebrew
4. Write into `output/siman_NNN/.../part-*.txt` or `_apply-siman-NNN-*.mjs` (strings **you** authored or cleaned, not MT API output)
5. `sprint-worker.mjs` → `apply_dictionary` + checkpoint
6. `validate-quality-yd001.mjs` + `validate-siman-claude-aligned.mjs`

`apply:dictionary` after English edits is **dictionary pass-through**, not MT.

---

## Mandatory reads

1. `full_dictionary (1).md` (repo root) or `newtry/YD_001/full_dictionary.md`
2. `newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md`
3. `newtry/YD_001/translation/COMMENTARIES.md` — slug order within each siman
4. `newtry/YD_001/progress.log` — context only; **not** skip authority

Confirm: `[INIT] Dictionary loaded. YD sprint worker ready. Editorial cleanup (no MT).`

## Assignment (from user each session)

No JSON sprint plan. Only touch simanim named in the prompt.

Single siman:

```
TRANSLATE SIMAN 084
```

Two simanim (finish first completely, then second):

```
TRANSLATE SIMAN 084
TRANSLATE SIMAN 096
```

## Quality bar (required)

- **Hebrew is authoritative** — existing English is a **draft to salvage**, not source of truth (except on blocks that already pass validation — leave those alone).
- Edit **only** `**** ENGLISH ****` … `**** END BLOCK ****`.
- Read **both** `**** HEBREW ****` and `**** ENGLISH ****` in each batched block.
- No Hebrew left in English (except dictionary transliterations).
- No MT garbage, HTML entities, nonsense phrases, API error text.
- `{Rama: ...}` for הגה; dictionary commentator names (Shach → Siftei Kohen, Taz → Turei Zahav).
- YD terms per dictionary: issur/heter, vadai/safek, ta'am, nevelah, treifah, shechitah, melichah.

### Per issue code — replace vs. clean

| Issue code | Strategy |
|------------|----------|
| `mt_api_artifact` | **Replace** entire English from Hebrew — not patchable |
| `mt_garbage` | **Replace** from Hebrew — partial fixes leave poison |
| `pending_placeholder` | **Replace** from Hebrew |
| `untranslated_copy` | **Replace** from Hebrew |
| `literal_bow_swim` | **Replace** from Hebrew (wrong lemma) |
| `hebrew_in_english` | **Clean**: keep English that matches Hebrew; remove hybrid text; verify completeness |
| Warn-level / grep-only (e.g. `hand recoils`) | **Clean** existing English against Hebrew |

Do **not** lazy-patch one obvious error while leaving MT poison in the same block.

### Hard failures (must be zero before done)

| Code | Examples |
|------|----------|
| `mt_api_artifact` | `MYMEMORY WARNING`, query limit text |
| `hebrew_in_english` | Hybrid Hebrew–English |
| `untranslated_copy` | English matches Hebrew |
| `mt_garbage` | Lord's Prayer, Capernaum, nonsense chunks |
| `pending_placeholder` | `English translation pending` |
| `literal_bow_swim` | שוחה → "swim" |

### Manual grep sweep (after validator passes)

`MYMEMORY`, `Lord's Prayer`, `hand recoils` (→ `yad soledes bo`), `Saturday` (→ Shabbat), `her age`, raw `&quot;`

### Allowlisted (do not chase)

- Treifot transliterations: `kulya`, `charitz`, `laketah`
- Legitimate "the craft" in shechitah context (siman 024)

## Per siman

```bash
cd "c:/Users/binya/Documents/Shulchan aruch/newtry/YD_001"
```

### Step 0 — Preflight scan

```bash
node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
node pipeline/validate-siman-claude-aligned.mjs --siman NNN
```

If both pass → `[SKIP] siman_NNN already clean` and proceed to next assignment.

**Do not skip** because `progress.log` says `COMPLETE` — quality scan is authoritative.

### Step 1 — Choose parts

Default batch cap is **45 blocks** per part (`--max-blocks 45`).

- ≤45 error blocks → `--parts 1`
- 46–90 error blocks → `--parts 2`
- >90 error blocks → run **multiple passes**: complete part 1 and 2, then rebuild batches until preflight shows zero errors

Count errors:

```bash
node pipeline/validate-siman-claude-aligned.mjs --siman NNN --write-reports
```

Alternative for medium simanim: `--parts 2 --max-blocks 80` to cover ~160 errors in two passes.

### Step 2 — Per part (editorial)

```bash
node pipeline/build-editorial-siman-batch.mjs \
  --siman N --part P --parts T \
  --scope quality --min-severity error --ignore-done

# Open pipeline/work/batch-editorial-siman-NNN-partPofT.md
# For EACH block: read HEBREW + existing ENGLISH; fix EN per issue code above

node pipeline/sprint-worker.mjs --siman N --part P --parts T
```

If `sprint-worker.mjs` exits **2**, fix flagged block ids and re-run until exit **0**.

### Step 3 — Final gate (all parts done)

```bash
node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
node pipeline/validate-siman-claude-aligned.mjs --siman NNN --fail-on error
```

### Step 4 — Log completion

Append to `progress.log`:

```
YYYY-MM-DDTHH:MM:SS siman_NNN editorial CLEAN (quality-gate)
```

## Session end

Print: `[COMPLETE] Session done — simanim: 084, 096` (or whatever was assigned).

## Priority backlog (known failures, simanim 001–099 audit)

| Siman | Primary issue |
|-------|----------------|
| 084 | MyMemory artifacts in Siftei Kohen |
| 096 | Baer Heitev half-translated |
| 098 | Baer Heitev hybrid Hebrew–English |
| 099 | mt_garbage + hybrid across Shach/Baer Heitev |
| 083 | MyMemory blocks in Beur HaGRA |
| 009 | kaf-hachayim: "hand recoils" (grep-only) |

## Do not

- Run **any** MT script (see forbidden table above)
- Run `pipeline:cloud:prep`, edit `COORDINATION.md`, or `editorial-loop-state.json`
- Self-assign simanim beyond the prompt lines
- Git commit unless user asks
- Skip empty commentary folders (normal per COMMENTARIES.md)
- Build `sprint-plan-*.json` or queue whole ranges unless user explicitly asks

## Report when done (internal)

Siman(s) completed, parts done, final quality-gate pass/fail, checkpoint line count in `editorial-done-ids.txt`, any preflight failures.
