# Content fix flags (manual queue)

**Status:** open flags only — **not fixed yet**.  
**Flagged:** 2026-08-30  
**Verified on:** main `69a00626c2`  
**Note:** Segment-alignment / resegment work ≠ content quality. These are **retranslate / HE cleanup** items.

Machine-readable twin: [`CONTENT_FIX_FLAGS.json`](./CONTENT_FIX_FLAGS.json)  
Also mirrored under [`../he_en_content_mismatch/MANUAL_QUEUE.json`](../he_en_content_mismatch/MANUAL_QUEUE.json).

---

## Open flags

### 1. `cm1-shach-1-1-mt-garbage-he-json-leak`

| Field | Value |
|--------|--------|
| **Ref** | CM Shach 1:1 |
| **Volume** | `cm1` |
| **Path** | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/cm1/siman1/seif-001/siftei-kohen/` |
| **Kind** | content-mismatch / retranslate |
| **Severity** | high |
| **Status** | open |
| **Sizes** | EN 1192 B · HE 1082 B |

**Symptoms**

- First EN segment is MT garbage: `"In this time, Danny's dinliness is circumcised and circumcised."`
- HE has JSON-array / bracket leak around lemmas, e.g. `["<b> בזמן הזה דני' הדייני' כו' </b> ..."]`
- Head lemma corrupted in EN (`דני' הדייני'` → Danny's dinliness; nonsense “circumcised”).

**Recommended action**

1. Rewrite EN from HE for all segments.  
2. Clean HE leak (strip stringified `["..."]` wrappers; keep plain HTML).  
3. Do **not** close as a segment-count-only fix.

---

### 2. `oc1-mechaber-244-1-cut-en-rama-display`

| Field | Value |
|--------|--------|
| **Ref** | OC Mechaber 244:1 |
| **Volume** | `oc1` |
| **Path** | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/siman244/seif-001/mechaber/` *(verified)* |
| **Kind** | content-mismatch / retranslate or complete from HE |
| **Severity** | high |
| **Status** | open |
| **Sizes** | EN 1268 B · HE 3231 B · ratio ≈ **0.39** |

**Symptoms**

- HE is full: siman title + פוסק עם העכו״ם seif, mid-seif `<small>הגה …</small>` Rama, then חוץ לתחום continuation, ending with צאן לדיר + `(ע"ל סי' תקל"ז סעיף י"ד)`.
- EN is truncated / incomplete vs HE; ends abruptly after a mangled sheep-to-pen clause.
- Duplicate Rama prefix: `{Rama: RAMA: ...}`.
- Rama appears **after** the sheep clause in EN; in HE the gloss sits **earlier** (after the in-techum prohibition / before outside-techum permission).

**EN ending (sample)**

> …and the non-Jews that enter sheep belonging to Jews to pen of his field. `{Rama: RAMA: And even if the Jew lives among non-Jews, …}`

**Recommended action**

1. Complete or retranslate EN from HE.  
2. Single `{Rama: …}` wrapper; no `RAMA:` duplicate.  
3. Restore HE order for Rama + full צאן לדיר / סי׳ תקלו cross-ref.  
4. Do **not** treat segment work as sufficient content QA.

---

### 3. `oc1-netiv-chayim-244-5-mt-garbage`

| Field | Value |
|--------|--------|
| **Ref** | OC Netiv Chayim 244:5 |
| **Volume** | `oc1` |
| **Path** | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/siman244/seif-005/netiv-chayim/` *(verified)* |
| **Kind** | content-mismatch / mt_garbage / retranslate |
| **Severity** | high |
| **Status** | open |
| **Sizes** | EN 111 B · HE 152 B |
| **In OC_CONTENT_SCAN_2026-08-30?** | **No** (not in flagged list; scan has other netiv-chayim mt_garbage e.g. 310:1, not 244:5) |
| **Mechaber kit?** | No — commentary; tracked in `OC_COMMENTARY_MT_GARBAGE_MANUAL.json` |

**Symptoms**

- EN is classic MT garbage vs HE.
- `שם` → "(name)"; `דבשלמא` → "Honeylma"; `עכו"ם` → "Czechs" / "UN"; `בקיבולת` → "capacity"; `כצ"ל` → "as a captain".

**HE (current)**

> <small>(שם)</small> דבשלמא כששוכר העכו"ם בקיבולת או השכיר לעכו"ם על חדש או חצי הוא נוטל כצ"ל:

**EN (current — confirmed on disk)**

> (name) Honeylma, when the Czechs are in capacity or rented to the UN on a new or half, he takes as a captain:

**Recommended action**

1. Retranslate EN from HE.  
2. Do **not** put in `OC_MECHABER_CUT_EN_KIT`.  
3. Do **not** close as a segment-count-only fix.

---

## Queue hygiene

When fixing: set `status` → `fixed`, add `fixed_at` + commit SHA in JSON; strike or move section here to a “Fixed” heading.


---

---

## GPT fix kits (2026-08-30)

See [`OC_GPT_KITS_INDEX.md`](./OC_GPT_KITS_INDEX.md).

| Zip | Cases | Parts |
|-----|------:|------:|
| `zips/01_OC_MECHABER_CUT_EN_GPT_KIT.zip` | 120 | 11 |
| `zips/02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT.zip` | 266 | 47 |


