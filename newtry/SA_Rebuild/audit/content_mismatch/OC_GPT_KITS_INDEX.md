# OC_GPT_KITS_INDEX

External AI kits for **OC content-quality** fixes (cut EN / MT garbage). **Audit only — no corpus apply.**

**Built:** 2026-08-31T07:41:43.967Z  
Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/`  
Scan: [`OC_CONTENT_SCAN_2026-08-30.json`](./OC_CONTENT_SCAN_2026-08-30.json)  
Flags: [`CONTENT_FIX_FLAGS.json`](./CONTENT_FIX_FLAGS.json)

## Active kits

| Kit | Cases | Parts | Max part bytes | SHA-256 (prefix) | Zip |
|-----|------:|------:|---------------:|------------------|-----|
| `01_OC_MECHABER_CUT_EN_GPT_KIT` | 120 | 11 | 84,371 | `6677f2e7e406…` | [`zips/01_OC_MECHABER_CUT_EN_GPT_KIT.zip`](./zips/01_OC_MECHABER_CUT_EN_GPT_KIT.zip) |
| `02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT` | 266 | 47 | 158,281 | `8f84a43d7ec2…` | [`zips/02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT.zip`](./zips/02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT.zip) |

### 01 — Mechaber cut-EN
- Source: [`OC_MECHABER_CUT_EN_KIT.json`](./OC_MECHABER_CUT_EN_KIT.json) (120 cases, full HE+EN)
- Mode: fresh_translate / complete from HE; fix `{Rama: RAMA:}`; restore post-Rama clauses
- Seed: `oc1/siman244/seif-001/mechaber`

### 02 — Commentary MT garbage
- Scan `mt_garbage` (260) + manual Netiv Chayim 244:5
- IDs already in kit 01 excluded (dedupe)
- Mode: discard MT; fresh_translate from HE
- Parts cover **all** included cases (no text truncation)

## Zip contents (each)

- Hardened prompt MD (`*_GPT_KIT.md`)
- Parent JSON (`*_GPT_KIT.json`)
- Part JSON(s) `*_partNN.json` (≤85k target)
- `full_dictionary.md` (from repo `full_dictionary (1).md`)

## Deferred

- Rama-heavy tracks (`rama_he_hagah_unreflected`, `rama_spurious`, etc.) — not in these kits

## Full local clean refresh?

**No** — kits are audit packaging only; corpus unchanged.

## Related

- [`CONTENT_FIX_FLAGS.md`](./CONTENT_FIX_FLAGS.md)
- [`OC_COMMENTARY_MT_GARBAGE_MANUAL.json`](./OC_COMMENTARY_MT_GARBAGE_MANUAL.json)
