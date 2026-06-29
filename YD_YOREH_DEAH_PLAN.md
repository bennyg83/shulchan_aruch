# Yoreh De'ah — translation project plan

**Status:** **`newtry/YD_001/`** is scaffolded as an **OC_001 mirror** (402 simanim extracted, full pipeline + agent docs). See **`newtry/YD_001/PIPELINE_YD001.md`** and `npm run pipeline:structure-check`.

---

## 1. Scope

| Item | Value |
|------|--------|
| **Chelek** | Yoreh De'ah (YD) |
| **Simanim** | **1–403** (`sa-preprocess.mjs` `SECTION_CONFIG.YD`) |
| **House rules** | Same as OC: `full_dictionary (1).md`, `halachic_translation_living_cursor_guide.md`, `translation/EDITORIAL_RETRANSLATE.md` (copy to YD_001) |
| **Target apps** | `oc318-mobile-reader` / `oc-web-reader` pattern → **`yd1`** corpus (new) |

YD-specific commentaries (already in `sa-preprocess.mjs`):

- **Shach** (`siftei-kohen`), **Taz** (`turei-zahav`), **Pitchei Teshuva**, **Peleti**, **Yad Avraham**, **Peri Megadim (YD)**, **Rabbi Akiva Eiger (YD)**, plus shared OC slugs where present (Magen Avraham, Gra, etc. — verify per siman from bundle).

---

## 2. Current repo state (audit)

| Asset | OC | YD |
|-------|----|----|
| Sefaria folder | `Orach_Chayim/` — **697** `simanim/` | `Yoreh_Deah/` — **403** `simanim/` (Phase A complete) |
| `sa-preprocess` section | Used | **Configured**; pilot run on siman 1 (`output/YD/siman_001/`) |
| Editorial tree | `newtry/OC_001/output/` | `newtry/YD_001/output/` (Phase B bootstrap) |
| Mobile corpus | `public/corpus/oc1/` | **None** |
| Pipeline | `OC_001/pipeline/` (pool, orchestrator, editorial) | **Reuse after clone** |

**Blocker:** Canonical Hebrew bundles for YD must exist before extract/editorial (same policy as `SOURCES_POLICY.md` for OC).

---

## 3. Recommended phases

### Phase A — Sefaria infrastructure (no LLM)

1. Obtain / build **per-siman JSON** under `Sefaria Pulls/shulchan-arukh/Yoreh_Deah/simanim/NNN/`  
   - Mirror OC: `meta.json`, `seif-NNN.json`, commentary layers, `export-seif-hebrew.mjs` slices.  
   - **Option 1:** Generalize `Orach_Chayim/tools/rebuild-by-siman.mjs` → `Yoreh_Deah/tools/` (or shared `shulchan-arukh/tools/rebuild-by-siman.mjs --section YD`).  
   - **Option 2:** Run `node sa-preprocess.mjs --section YD --all` **only after** bundle root has `Yoreh_Deah/simanim/*/seif-*.json`.

2. Pilot rebuild: **simanim 1–3** (structure + commentary list validation).

3. Full rebuild: **1–403** (batch job; log failures).

**Deliverable:** `Yoreh_Deah/simanim/` populated; `annotate-manifest-include-in-reader.mjs` adapted for YD.

### Phase B — `YD_001` editorial project (clone OC_001)

Create `newtry/YD_001/` parallel to `newtry/OC_001/`:

| OC_001 | YD_001 |
|--------|--------|
| `oc001_block_lib.mjs` | `yd001_block_lib.mjs` (or shared `newtry/lib/oc_block_lib.mjs`) |
| `extract_oc001_from_sefaria_bundle.mjs` | `extract_yd001_from_sefaria_bundle.mjs` (`--bundle-root …/Yoreh_Deah`) |
| `apply_dictionary_oc001.mjs` | `apply_dictionary_yd001.mjs` (same glossary file) |
| `output/siman_NNN/` | same layout |
| `pipeline/*` | copy + rename paths; `master-pipeline-plan.json` for YD |
| `translation/EDITORIAL_RETRANSLATE.md` | copy + YD examples (issur/vadai, ta'am, etc.) |

**Deliverable:** `npm run bootstrap:yd-simanim -- --from 1 --to 403 --skip-existing` extracts Hebrew + placeholders.

### Phase C — Pilot translation (human + 4 workers)

1. **Simanim 1–5** — full editorial pass (validate commentary set, block size, quality checks).  
2. **One “hard” siman** mid-corpus (e.g. **87** melicha or **115** basar b'chalav) — stress test length and cross-refs.  
3. Publish pilot to **`public/corpus/yd1/siman1`** … via adapted `publish-yd-siman.mjs`.

**Gate:** 0 quality errors on pilot; dictionary pass clean; HTML presentation pass on English.

### Phase D — Production editorial (pool)

Same machinery as OC:

1. `sprint-plan-yd-1-403.json` (or waves: 1–100, 101–200, …).  
2. Pool coordinator + 4 workers.  
3. `finish-siman` / `editorial-loop-state.json` per siman.  
4. Publish cadence: user-controlled (default **no** GH Pages until asked, same as OC 105+).

**Estimated scale:** ~403 simanim; block count TBD after extract (OC averages ~100–200 blocks/siman for dense simanim; YD may differ).

### Phase E — Mobile / web reader

1. `catalog.json` + `seif-index.json` for YD volume.  
2. Corpus path `yd1` in Vite apps (or multi-volume selector: OC | YD).  
3. Reuse `corpus.js` + `includeInReader` manifest rules.

---

## 4. Parallel work with OC (now)

| Track | Owner | Notes |
|-------|--------|------|
| **OC 105–200** | Pool coordinator #5 | Current `finishThrough: 200`; do not split attention |
| **YD planning** | Planning docs + Phase A scripts | No YD workers until OC tick is healthy |
| **YD Phase A** | Can start **without** LLM once Sefaria source path is confirmed | Does not compete with OC workers |

**Suggested trigger to start YD extract:** OC `phase: oc_complete` for scoped **200** *or* user explicitly requests YD pilot while OC continues.

---

## 5. Commands (planned — not all implemented yet)

```bash
# Phase A — preprocess (after bundles exist)
cd "Sefaria Pulls/shulchan-arukh"
node sa-preprocess.mjs --section YD --siman 1 --from 1 --to 9 --dry-run
node sa-preprocess.mjs --section YD --all

# Phase B — bootstrap (future YD_001)
cd newtry/YD_001
npm run bootstrap:yd-simanim -- --from 1 --to 403 --skip-existing

# Phase C — editorial (future)
npm run pipeline:pool:tick --workers 4
```

---

## 6. Open questions (resolve before Phase B)

1. **Where does YD Hebrew come from today?** Sefaria API pull, existing `merged.json` elsewhere, or export from another tool?  
2. **Shared vs forked pipeline code** — monorepo `newtry/pipeline-lib/` vs copy `OC_001/pipeline`?  
3. **Reader UX** — separate app, volume toggle, or combined catalog?  
4. **Sefaria English** for Mechaber/Rama on YD — same import path as OC?  
5. **Glossary gaps** — YD terms (treif, nevelah, chametz, kashrus agencies) in `full_dictionary (1).md` — audit before bulk.

---

## 7. Next planning actions

- [x] Confirm Sefaria YD bundle source / run first `rebuild-by-siman` pilot for siman 1  
- [x] Scaffold `newtry/YD_001/` (package.json, extract, pipeline, translation/, CLAUDE.md, docker)  
- [x] Commentary framework: `translation/COMMENTARIES.md` + `newtry/lib/yd001-volume.mjs`  
- [x] Publish/MT tools under `Yoreh_Deah/tools/`  
- [ ] Sprint plan JSON for waves 6–403 (`pipeline/work/sprint-plan-6-403.json`)  
- [ ] Web reader volume toggle (OC | YD) after pilot `yd1` publish

---

## 8. File references

- `Sefaria Pulls/shulchan-arukh/sa-preprocess.mjs` — `SECTION_CONFIG.YD`, YD commentary slugs  
- `newtry/OC_001/` — template for YD_001  
- `OC_ORACH_CHAYIM_PIPELINE.md` — end-to-end map to copy for YD  
- `newtry/OC_001/translation/MASTER_PIPELINE.md` — pool/orchestrator pattern  
- `pipeline/work/master-pipeline-plan.json` — OC active scope (`finishThrough: 200`)
