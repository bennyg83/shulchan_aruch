# EN_TRUNC moderate GPT part01 — quote_break repairs

**Created:** 2026-08-28T08:45:44.004Z  
**Source:** `EN_TRUNC_MODERATE_GPT_RESULT_part01.json` (9 quote_break REJECT cases)  
**Kit:** `EN_TRUNC_MODERATE_RESEGMENT_KIT_part01.json`  
**Output:** `EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED.json`

## Summary

| Result | Count |
|--------|------:|
| APPROVE_REPAIRED | 9 |
| FAIL | 0 |

**Apply gate:** All 9 pass — safe to apply with `--ids` override after eval sign-off.

## Cases

- `oc1/siman1/seif-009/yad-ephraim` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `oc1/siman128/seif-043/ateret-zekenim` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `oc1/siman440/seif-001/ateret-zekenim` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `yd1/siman134/seif-003/beer-hagolah` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `yd1/siman177/seif-004/beer-hagolah` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `yd1/siman177/seif-018/beer-hagolah` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `yd1/siman177/seif-021/beur-hagra` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `yd1/siman177/seif-027/beur-hagra` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*
- `yd1/siman206/seif-005/beer-hagolah` — **APPROVE_REPAIRED**: en_segments rebuilt (corpus_verbatim_split); joined text matches corpus EN verbatim (corpus_verbatim_split) *(GPT segments_en had truncation/editorial drift; repaired from corpus verbatim split)*

## Editorial drift note

All 9 cases had truncated `segments_en` / `en_segments` from JSON quote-break parsing. Repaired `en_segments` were derived by **verbatim corpus split** at semantic boundaries (kit EN blob), not by copying truncated GPT text. Joined repaired text matches kit/corpus EN character-for-character (`exact_char_match: true` on all 9).



---
Machine-readable repairs: `EN_TRUNC_MODERATE_GPT_RESULT_part01_REPAIRED.json`
