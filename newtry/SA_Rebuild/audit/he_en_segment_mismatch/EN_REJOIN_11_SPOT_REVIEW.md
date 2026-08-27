# EN rejoin — 11 eligible spot-review (dry-run)

**Date:** 2026-08-27  
**Source dry-run:** `EN_REJOIN_CONTINUATIONS_DRY_RUN.md` / `en_rejoin_continuations_dry_run.json` (scanned 2026-08-27T18:24:01Z)  
**Corpus (LIVE, read-only):** `newtry/OC_Mobile/oc318-mobile-reader/public/corpus`  
**Gate under review:** `strongEnHeads === heSegs` (`strong_heads_match_heSegs`)

**Nothing applied to corpus. No git.**

## Method

For each of the 11 eligible rows: load proposed `groups` from the dry-run JSON; open LIVE `he.html` + `en.html`; compare HE note lemmas / br-boundaries to EN heads; judge whether proposed contiguous merges glue only true continuations.

## Totals

| Verdict | Count |
|---------|------:|
| APPROVE | 1 |
| HOLD | 0 |
| REJECT | 10 |

**Recommendation:** Do **not** build a blanket apply script for all `strong_heads_match_heSegs` rows. If an apply path is built, gate it to an **explicit allowlist** (currently only the 1 APPROVE path below). Several REJECTS have an obvious *alternate* correct grouping — those need a separate curated plan, not the dry-run proposal.

---

## Per-case table

| # | Path | he/en | Proposed groups | Verdict | Reason |
|---|------|------:|-----------------|---------|--------|
| 1 | `oc1/siman32/seif-005/yad-ephraim` | 2/4 | `[[0],[1,2,3]]` | **APPROVE** | E1–E3 are one continuous ס"ק כ"ג note (צ"ע / mem / bet); E0 alone matches H0. |
| 2 | `oc1/siman128/seif-003/turei-zahav` | 2/3 | `[[0],[1,2]]` | **REJECT** | E2 bold lemma = H1 והלוי יצוק מים; plan glues distinct note. Correct: `[[0,1],[2]]` (E1=Tur is mid-H0). |
| 3 | `oc1/siman137/seif-004/peri-megadim` | 4/5 | `[[0],[1],[2,3],[4]]` | **REJECT** | E3 **If**=H2 אם; E2=H1 ולענין — must not merge. Correct: `[[0,1],[2],[3],[4]]`. |
| 4 | `yd1/siman245/seif-006/beur-hagra` | 4/8 | `[[0,1],[2,3,4],[5],[6,7]]` | **REJECT** | Lemmas E0–E3 then bodies E4–E7 (non-contiguous); plan glues distinct Gra lemmas. Contiguous rejoin cannot fix. |
| 5 | `yd1/siman331/seif-034/beur-hagra` | 2/4 | `[[0,1,2],[3]]` | **REJECT** | Glues האומר (E0) with וי"א (E1); also E2–E3 are broken MT. |
| 6 | `yd1/siman371/seif-001/turei-zahav` | 3/4 | `[[0,1],[2],[3]]` | **REJECT** | Glues H0 בנקב with H1 וכל דבר המקבל טומאה. Correct: `[[0],[1],[2,3]]` (E3=ומעשה inside H2). |
| 7 | `cm1/siman71/seif-017/beur-hagra` | 3/4 | `[[0],[1,2],[3]]` | **REJECT** | Glues H1 heirs note with H2 ומקבלי מתנה. Correct: `[[0],[1],[2,3]]` (E3=ליקוט pair inside H2). |
| 8 | `cm1/siman146/seif-008/ketzot-hachoshen` | 2/5 | `[[0,1,2],[3,4]]` | **REJECT** | E4 starts H1 אינו צריך למחות; E3 still H0. Correct: `[[0,1,2,3],[4]]`. |
| 9 | `cm1/siman157/seif-012/ketzot-hachoshen` | 3/4 | `[[0],[1],[2,3]]` | **REJECT** | E2=H1 Yerushalmi; E3=H2 Rambam resolve — must not merge. Correct: `[[0,1],[2],[3]]`. |
| 10 | `cm1/siman273/seif-014/ketzot-hachoshen` | 3/4 | `[[0],[1,2],[3]]` | **REJECT** | Glues H1 Lechem Mishneh with H2 ולענ"ד. Correct: `[[0],[1],[2,3]]`. |
| 11 | `cm1/siman411/seif-001/beur-hagra` | 8/9 | `[[0,1],[2],[3],[4],[5],[6],[7],[8]]` | **REJECT** | Glues distinct Gra lemmas H0 או לא הפקירן + H1 או שהניחם. (If fixing: consider merging E3+E4 into H3’s two ליקוט heads — not what was proposed.) |

---

## APPROVE detail (only)

### `oc1/siman32/seif-005/yad-ephraim`

- **HE:** H0 `(בש"ע סעיף ה') אם אפשר…`; H1 `ס"ק כ"ג אפילו מחק הטפה…` continuing through ולכאורה צ"ע / mem / bet-drop.
- **EN:** E0 ↔ H0; E1 opens ס"ק כ"ג; E2–E3 are unmarked continuations of the same note (no new note markers).
- **Merge `[[0],[1,2,3]]`:** true continuation glue only; after rejoin EN note count = 2 = HE; no numbered-note collision.

---

## Failure mode of the automated gate

`strongEnHeads === heSegs` is **necessary but not sufficient**. Common failure:

1. A **true new-note head** is classified **weak** (e.g. leading “And …”, “If …”, continuation cues) while a **mid-note** or **prior-note** head is strong → greedy grouping attaches the new note to the previous group.
2. **Non-contiguous** lemma/body splits (Gra stubs) produce accidental strong-head counts that match `heSegs` without recoverable contiguous merges.
3. Alternate correct groups often exist (see REJECT reasons) but differ from the dry-run proposal — do not auto-apply without path-level allowlist / corrected group map.

---

## Apply-script recommendation

| Option | Advice |
|--------|--------|
| Auto-apply all 11 eligible | **No** |
| Apply APPROVE-only allowlist (1 path) | **Optional / low risk** if desired |
| Apply REJECT rows with “Correct:” groups above | **Only** after a second curated review pass + explicit corrected-group JSON — not via the dry-run proposal as-is |
| yd1/245, yd1/331 | **Out of scope** for contiguous EN rejoin; need editorial/retranslate or non-contiguous repair |

**Explicit:** nothing was applied to the LIVE corpus in this spot-review.

**Applied (2026-08-27):** APPROVE-only allowlist — joined EN `[[0],[1,2,3]]` on `oc1/siman32/seif-005/yad-ephraim` (enSegs 4→2).
