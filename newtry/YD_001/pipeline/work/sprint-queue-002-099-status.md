# Sprint queue 002–099 — status

Generated: 2026-06-16T16:52:00Z

## Queue artifacts

| File | Purpose |
|------|---------|
| `work_queue.json` | 98 simanim queued (2–99) |
| `pipeline/work/sprint-plan-002-099.json` | 313 work units, 11,800 warn-level blocks |
| `pipeline/work/active-sprint-plan.json` | Copy of active plan |
| `checklist-output/claude-aligned-002-099.json` | Error-level scan (claude-aligned) |

## Claude-aligned scan (error level)

| Status | Count | Notes |
|--------|-------|-------|
| **PASS** | 95 | Simanim 002–008, 010–082, 084–097 |
| **FAIL** | 3 | 096, 098, 099 |
| **Fixed this session** | 009, 083, 084 | Logged `editorial CLEAN (claude-aligned)` |

## Remaining error blocks (preflight)

| Siman | Errors | Primary issue |
|-------|--------|---------------|
| 096 | 106 | `hebrew_in_english` — Baer Heitev, Shach hybrid MT |
| 098 | 171 | `hebrew_in_english` (164), `mt_garbage` (7) |
| 099 | 118 | `mt_garbage` (28), `hebrew_in_english` (90) |

## Workflow (quality + editorial only — no MT)

**Do not** run `_corpus-retranslate-errors.mjs`, Google Translate, LibreTranslate, or MyMemory.

1. **Preflight:** `validate-quality-yd001.mjs` + `validate-siman-claude-aligned.mjs`
2. **Batch:** `build-editorial-siman-batch.mjs --scope quality --min-severity error`
3. **Translate:** fresh from Hebrew in batch markdown or `_apply-*.mjs` patches
4. **Advance:** `sprint-worker.mjs`
5. **Final gate** + manual grep sweep

## Next steps (worker order)

1. Siman **096** — editorial batches (`batch-editorial-siman-096-part1of3.md`, parts 2–3)
2. Siman **098** — same editorial workflow
3. Siman **099** — same editorial workflow
4. Re-run: `node pipeline/validate-siman-claude-aligned.mjs --from 2 --to 99 --write-reports`

## Skip rule

Simanim passing both validators → `[SKIP]` per `AGENT_SPRINT_WORKER.md`. Do not re-edit warn-only `marker_label_mismatch` unless assigned.
