# Agent quality pass — slot assignments (YD_001)

Orchestrator divides simanim across parallel agents. **This pack documents Slot 3.**

## Slot 3

| Field | Value |
|-------|--------|
| Siman range | **201–300** |
| Commentators | **Non-Mechaber only** (all slugs except `mechaber`) |
| Work type | Editorial retranslation (fix bad English from Hebrew) |
| Block header | `**** YD001 SOURCE BLOCK ****` |

## Other slots (reference only — do not work outside your slot)

| Slot | Typical range | Notes |
|------|----------------|-------|
| 1 | (per orchestrator) | — |
| 2 | (per orchestrator) | — |
| **3** | **201–300** | **You are here** |
| 4+ | (per orchestrator) | — |

Confirm current boundaries in the live repo’s `translation/AGENT_QUALITY_PASS_SLOTS.md` if the orchestrator updated them.

## Session assignment format

Orchestrator or user may say:

```text
TRANSLATE SIMAN (continue Slot 3 — batch32 for simanim 264, 283, 293)
```

Or simply: **keep going** — agent scans 201–300 and takes the next highest-hit simanim.

## Progress

Log format in `progress.log`:

```text
2026-05-28T20:57:04 siman_211 slot3-batch31 6 blocks DONE
```

Do not mark `siman_NNN COMPLETE` unless the entire siman (all commentators in scope) is done; this pass often logs per batch.
