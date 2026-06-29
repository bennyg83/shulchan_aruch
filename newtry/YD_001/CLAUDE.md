# CLAUDE.md — Shulchan Aruch Translation Project (YD001)

## AUTOMATIC SESSION INITIALIZATION

At the start of every session, before doing anything else:

1. Read `full_dictionary.md` from the current working directory (or repo root `full_dictionary (1).md`).
2. Read `progress.log` from the current working directory.
3. Read `translation/COMMENTARIES.md` for slug order.
4. Confirm: `[INIT] Dictionary loaded. Progress log read. YD001 ready.`

If `full_dictionary.md` is missing in cwd, use `../../full_dictionary (1).md` from repo root.

---

## PROJECT CONTEXT

**Volume:** Yoreh De'ah (YD), simanim **1–403**.

Source blocks: `output/siman_NNN/<commentary>/part-*.txt`.

Each block has Hebrew and English. Replace English entirely from Hebrew.

**Commentators (canonical order):** see `translation/COMMENTARIES.md` — mechaber first, then Shach (`siftei-kohen`), Taz (`turei-zahav`), then remaining slugs.

---

## TRANSLATION RULES

See `translation/EDITORIAL_RETRANSLATE.md` and repo `halachic_translation_living_cursor_guide.md`.

**YD001 blocks:** Edit only text between `**** ENGLISH ****` and `**** END BLOCK ****`. Never change Hebrew or headers.

---

## SESSION WORKFLOW

### Sprint worker (preferred — local, single agent)

User assigns simanim each session. Follow **`pipeline/work/AGENT_SPRINT_WORKER.md`**:

```
TRANSLATE SIMAN 084
```

Cleanup mode: quality-scoped batches + `sprint-worker.mjs` + quality validation gate. **Editorial only — no MT scripts.** See also `pipeline/work/SPRINT_PROMPT_TEMPLATE.md`.

### Self-loop worker (slot 1–4)

See `translation/AGENT_SELF_LOOP_WORKER.md`.

### Whole siman (manual fallback)

```
TRANSLATE SIMAN 1
```

1. List all `.txt` under `output/siman_001/` in commentary order.
2. Retranslate every block from Hebrew.
3. `npm run apply:dictionary -- --root output/siman_001`
4. `npm run pipeline:validate -- --root output/siman_001`
5. Log `siman_001 COMPLETE` to `progress.log`.

---

## COORDINATION

- **Worker #5:** `npm run pipeline:pool:watch:assign` (Node coordinator, not an LLM).
- **Publish:** from `Sefaria Pulls/.../Yoreh_Deah`: `node tools/publish-yd-siman.mjs --siman N`

### Bootstrap MT only (NOT sprint worker)

First-pass placeholder fill for **new** simanim only — **never** use on sprint / editorial cleanup:

```bash
npm run libre:up
npm run translate:placeholders:libre -- --root output/siman_NNN
```

Sprint workers must use `pipeline/work/AGENT_SPRINT_WORKER.md` (Cursor editorial, no MT).

---

## FAILURE PATTERNS

Retranslate if English still has: Hebrew letters, `English translation pending`, raw MT garbage, wrong issur/heter terms, anglicized Shach/Taz names, etc.
