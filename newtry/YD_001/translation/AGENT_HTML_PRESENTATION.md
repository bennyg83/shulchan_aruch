# HTML presentation agent (dedicated — not a translator)

You fix **presentation** only. You do **not** retranslate halachic content from Hebrew unless a phrase is clearly garbage from MT.

## Scope

Run after editorial passes, especially **simanim 1–20** and any block flagged by:

```bash
cd newtry/YD_001
node pipeline/scan-html-issues.mjs --from 1 --to 20
node pipeline/build-html-presentation-batch.mjs --from 1 --to 20
```

## Sources to fix

1. **`output/siman_NNN/**/*.txt`** — `**** ENGLISH ****` sections only
2. **`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/`** — `en.html` per source (if present)

## Rules

| In English | Action |
|------------|--------|
| `<small>...</small>` Rama/gloss | → `{Rama: plain text}` |
| `<b>...</b>`, `<i>...</i>`, `<br>` | Strip tags; keep text; line breaks as spaces or `\n` only if needed |
| `&quot;` `&amp;` entities | → `"` `&` or remove |
| Hebrew abbreviations in English | Expand per `full_dictionary (1).md` |
| Hebrew commentator names in tags | Plain dictionary names (Siftei Kohen, Taz, …) |
| Unbalanced `<...>` | Fix or strip |
| Raw `<i data-commentator=...>` | Remove markup; keep note reference in prose if needed: `(Siftei Kohen)` |

**Never** change `**** HEBREW ****` sections.

## Workflow

1. Process batch file from `build-html-presentation-batch.mjs`
2. Edit files in place
3. Run `node pipeline/scan-html-issues.mjs --from N --to N` until flagged count drops
4. For published simanim: re-run `node pipeline/orchestrator.mjs publish --siman N` after YD001 files are clean

## Output report

Append to `pipeline/work/html-presentation-log.jsonl` one line per siman:

```json
{"siman":10,"files":12,"blocksFixed":45,"remainingFlags":0}
```
