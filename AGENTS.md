# AGENTS.md — Shulchan Aruch Translation Project (OC001)

## AUTOMATIC SESSION INITIALIZATION

At the start of every session, before doing anything else:
1. Read `full_dictionary.md` from the current working directory into your active context
2. Read `progress.log` from the current working directory to identify already-completed simanim
3. Confirm initialization by printing: `[INIT] Dictionary loaded. Progress log read. Ready.`

If `full_dictionary.md` is not found, stop and print: `[ERROR] full_dictionary.md not found in current directory. Cannot proceed.`
If `progress.log` does not exist, create it as an empty file and continue.

---

## PROJECT CONTEXT

Source blocks live under `output/siman_NNN/<commentary>/part-*.txt` (junction from `cli_workspace/`).
Each block has Hebrew and English. Replace English entirely from Hebrew.

**Commentators (canonical order within each siman):**
mechaber → rama → tur → beit-yosef → darkei-moshe → taz → magen-avraham → shach → bach → gra → peri-megadim → mishna-berurah → biur-halacha → shulchan-aruch-kpeshuta → chayei-adam → other

---

## TRANSLATION RULES — PERMANENT

See the full rule set in the zip `AGENTS.md` (R1–R10): completeness, no additions, dictionary halachic terms, commentator names, abbreviations, numbers, `{Rama: ...}` glosses, Aramaic, connectives, plain output only.

**OC001 block files:** Edit only text between `**** ENGLISH ****` and `**** END BLOCK ****`. Never change Hebrew or headers.

---

## SESSION WORKFLOW — WHOLE SIMANIM (NO BLOCK BATCHING)

The orchestrator assigns **one or two complete simanim** per session. Process every `.txt` file in each assigned siman folder under `output/`. Do not wait for block-level prompts.

### Assignment format

Single siman:
```
TRANSLATE SIMAN 101
```

Two simanim (finish first completely, then second):
```
TRANSLATE SIMAN 101
TRANSLATE SIMAN 102
```

Folder paths: `output/siman_101/`, `output/siman_102/`, etc.

### Per siman

1. If `progress.log` already has `siman_NNN COMPLETE`, print `[SKIP]` and skip that siman only.
2. List all `.txt` files; sort by canonical commentator order.
3. For each file: parse all blocks, retranslate English from Hebrew, write file back.
4. Log each file and `siman_NNN COMPLETE` to `progress.log`.

### After all assigned simanim

Print `[COMPLETE] Session done — simanim: 101, 102` (or whatever was assigned).
Do not self-assign simanim beyond the assignment lines.

---

## COORDINATION

- Lanes: `local` (Cursor subagents), `cli` (Codex CLI, **Pro auth in `~/.Codex/`** — no API key). Optional `api` lane is not used in this project.
- Only touch simanim named in your assignment.
- **Test scope (current):** simanim **101, 102, 103, 104** only.

---

## FAILURE PATTERNS

Retranslate if you see: her age, the craft, Lord's Prayer, Saturday, hand recoils, first dish, muktzeh as "allocated", Magen Avraham anglicized, etc. (full list in project `AGENTS.md` from Codex zip).
