# Pass: retranslate simanim 1–20 (after sprint reaches 100)

## Why

Simanim **10–20** (and some of **1–9**) were filled with LibreTranslate, Ollama slave drafts, or early passes. They often still have:

- Machine-translation phrasing
- **HTML in English** (`<small>`, `<b>`, `<i>`, `&quot;`, unexpanded glosses)
- Hebrew abbreviations left in English
- Lower dictionary discipline than simanim **21+**

## When this pass runs

**Trigger:** Pool coordinator sees `pass-plan-1-20-after-100.json` → `afterSiman100.enabled` AND sprint plan has **0 pending** units with `siman <= 100` (all units done or claimed only through 100).

Until then: keep **4 workers** on simanim **21–100** (gap-fill order).

## How to run (coordinator)

1. `node pipeline/pool-phase.mjs status`
2. When phase = `retranslate_1_20`:
   ```bash
   node pipeline/sprint-plan-to-100.mjs --from 1 --to 20 --max-blocks 40
   cp pipeline/work/sprint-plan-27-100.json pipeline/work/sprint-plan-1-20-pass.json
   ```
3. Optionally clear stale checkpoints for 1–20 only:
   ```bash
   node pipeline/reset-editorial-done.mjs --from 1 --to 20 --dry-run
   node pipeline/reset-editorial-done.mjs --from 1 --to 20
   ```
4. Resume normal `pool-coordinator.mjs tick --workers 4` using `sprint-plan-1-20-pass.json` (or merge into main plan).

## Worker rules (same as 21+)

- Read `EDITORIAL_RETRANSLATE.md` + `full_dictionary (1).md`
- **English output must be plain text** — no HTML tags, no `&quot;`, no raw Hebrew abbreviations
- `{Rama: ...}` for glosses; note markers as `(1)` not Hebrew letters
- `finish-siman` when 0 blocks remain

## After 1–20 editorial pass

Launch **one** dedicated agent per `AGENT_HTML_PRESENTATION.md` (corpus + mobile `en.html` if published).
