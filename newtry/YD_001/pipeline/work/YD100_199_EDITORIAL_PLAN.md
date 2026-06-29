# YD001 Editorial Cleanup — Simanim 100–199

**Method:** Same as simanim 096–099 (per-commentary patch scripts, Hebrew authority, no external MT).

## Per-siman workflow

1. **Preflight** — quality scan is authoritative (ignore stale `progress.log COMPLETE`):
   ```bash
   node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
   node pipeline/validate-siman-claude-aligned.mjs --siman NNN --fail-on error
   ```
2. If **0 errors** → `[SKIP]` + corpus publish + log `siman_NNN editorial CLEAN (quality-gate)`.
3. If **errors** → per failing commentary:
   - `pipeline/work/_patch-siman-NNN-{slug}.mjs` (+ optional `_tr-NNN-{slug}.mjs`)
   - Use `_patch-siman-098-group-c-utils.mjs` for `patchFile()` helper
   - **Never** run `_patch-siman-NNN-translations.mjs` or `_patch-siman-NNN.mjs` garbage runners
4. `npm run apply:dictionary -- --root output/siman_NNN`
5. Both validators must pass (0 errors)
6. `pipeline/work/_reapply-siman-NNN-editorial.mjs` when multiple slugs patched
7. **Corpus publish** (required for web reader):
   ```bash
   cd newtry/OC_Mobile/oc318-mobile-reader
   node scripts/publish-yd001-siman.mjs --siman N
   node scripts/bundle-corpus-yd1.mjs --siman N
   ```
8. Grep sweep: `MYMEMORY`, `Lord's Prayer`, `hand recoils`, `Saturday`, raw `&quot;`

## Progress log (2026-06-17)

| Siman | Status | Notes |
|-------|--------|-------|
| 100 | CLEAN (skip) | 85/85 |
| 101 | CLEAN (skip) | 158/158 |
| 102 | **DONE** | JSON unwrap siftei-kohen (15 blocks) |
| 103 | CLEAN (skip) | 144/144 |
| 104 | CLEAN (skip) | 73/73 |
| 105 | **DONE** | JSON unwrap siftei-kohen (42) + kulya→hind leg in beur-hagra/siftei-kohen |
| 106 | **DONE** | 36 MYMEMORY blocks retranslated (10 slugs) |
| 107 | **DONE** | 45 MYMEMORY blocks retranslated (12 slugs) |
| 108 | **DONE** | 165 editorial blocks retranslated (13 slugs; mechaber clean) |
| 109 | **DONE** | 64 editorial blocks retranslated (13 slugs; mechaber clean) |
| 110 | **DONE** | 66 JSON unwrap + 10 HTML/translate fix |
| 111 | **DONE** | 19 JSON unwrap siftei-kohen |
| 112–113, 117–120 | **DONE** | JSON unwrap siftei-kohen only |
| 114 | **DONE** | 115 blocks retranslated (13 slugs) |
| 115 | **DONE** | 104 blocks retranslated (11 slugs) |
| 116 | **DONE** | 71 blocks retranslated (12 slugs) |
| 117–120 | **DONE** | JSON unwrap siftei-kohen only |
| 121 | **DONE** | 90 blocks retranslated (10 slugs) |
| 122 | **DONE** | 91 blocks retranslated (10 slugs) |
| 123 | **DONE** | 96 blocks retranslated (10 slugs) |
| 124 | **DONE** | 132 blocks retranslated (10 slugs) |
| 125 | **DONE** | 96 blocks retranslated (10 slugs) |
| 126–130 | **DONE** | editorial (221 blocks total) |
| 131–140 | **DONE** | editorial (321 blocks total) |
| 141–145 | **DONE** | editorial (155 blocks total) |
| 146–165 | **DONE** | editorial (450 blocks total) |
| 166–175 | **DONE** | editorial (320 blocks; siman 169 merged into 168 per standard SA numbering) |
| 176–190 | **DONE** | editorial (758 blocks; partial batches) |
| 191–199 | **DONE** | editorial (355 blocks) |
| **100–199** | **COMPLETE** | quality-gate pass (199 simanim; 169 merged into 168) |

**Reusable helper:** `pipeline/work/_unwrap-json-english-siman.mjs --siman N`


| Status | Count | Notes |
|--------|-------|-------|
| **CLEAN** | 4 | 100, 101, 103, 104 |
| **FAIL** | 95 | ~3,972 error blocks total (historical scan; now complete) |
| **MERGED** | 1 | siman **169** → content in `output/siman_168/` (קסח–קסט) |

**Total blocks in range:** 11,512

**Note:** Shulchan Aruch often combines adjacent simanim (e.g. 168–169 ribbis via gentile). No separate `siman_169` folder is expected.

## Priority order (one siman at a time, sequential 100→199)

Process in siman number order. Skip clean simanim after preflight only.

### Tier A — Small fixes (≤20 errors) — quick wins after 100–104

102 (13), 136 (6), 140 (5), 150 (5), 171 (5), 144 (1), 152 (7), 167 (7), 147 (8), 149 (10), 153 (10), 178 (11), 165 (12), 143 (13), 191 (13), 117 (14), 180 (14), 113 (15), 164 (15), 186 (16), 183 (9), 156 (4), 176 (13), 111 (19), 128 (21), 120 (24), 174 (25), 192 (26), 145 (29), 188 (30), 170 (31), 119 (32), 130 (33), 106 (36), 118 (39), 195 (40), 172 (41), 105 (42), 132 (45), 161 (47), 179 (47), 162 (39), 107 (45), 122 (91), 121 (90), 123 (96), 160 (100), 115 (104), 168 (110), 114 (115), 187 (93), 198 (95), 196 (61), 109 (64), 135 (66), 110 (73), 199 (41), 157 (38), 166 (22), 155 (22), 112 (22), 131 (23), 125 (96), 126 (57), 127 (54), 129 (56), 141 (55), 142 (54), 173 (55), 138 (44), 139 (32), 137 (32), 148 (19), 151 (26), 185 (27), 146 (28), 194 (35), 184 (66), 124 (132), 189 (152), 190 (152), 177 (89), 108 (165)

### Tier B — Large simanim (>150 errors)

108 (165), 124 (132), 110 (73), 168 (110), 189 (152), 190 (152), 177 (89), 198 (95), 105 (42)

### Merged simanim (not blockers)

- **Siman 169:** Merged into **siman 168** (`קסח–קסט`, 27 seifim). Standard in Shulchan Aruch; corpus path is `output/siman_168/` only.

## Patch file conventions

```
pipeline/work/_patch-siman-NNN-{slug}.mjs   # runner
pipeline/work/_tr-NNN-{slug}.mjs            # T object (optional, large slugs)
pipeline/work/_reapply-siman-NNN-editorial.mjs
```

Keys: `seif#marker` (e.g. `1#א`, `4#main`).

## Session assignment format

```
TRANSLATE SIMAN 102
```

One siman per session unless user assigns two explicitly.

## Do not

- External MT (Google/Libre/MyMemory/corpus-retranslate)
- `_patch-siman-NNN-translations.mjs` garbage imports
- Skip corpus publish after clean pass
