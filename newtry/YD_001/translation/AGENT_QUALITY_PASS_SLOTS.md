# Quality-pass agents — slots 1–4 (start with Yoreh De'ah)

**Phase:** Post–machine-translation **editorial quality pass** (not MT).  
**Orchestrator (you)** assigns which blocks each slot works in **direct chat prompts**. Agents do **not** pull work from the coordinator automatically unless you tell them to.

**Master queue (all volumes):** `newtry/pipeline/work/sa-quality-master-queue.json`  
**Per-volume queues:** `newtry/{YD,EH,CM}_001/pipeline/work/quality-pass-queue.json`  
**Slot assignment files:** `newtry/pipeline/work/slot-N-assignment.json` (optional JSON mirror of what you assign in chat)

Regenerate queues after MT changes:
```bash
node newtry/tools/queue-sa-quality-passes.mjs
```

---

## Before starting the 4 chats

1. Run quality scan (once per volume, or all at once):
   ```bash
   node newtry/tools/queue-sa-quality-passes.mjs
   ```
2. Open `sa-quality-master-queue.json` — sorted **YD first**, then EH, then CM; within each volume by quality score (worst first).
3. Decide which `id` values (e.g. `YD:siman_087/...`) go to slots 1–4 for the first wave.

**All four slots start on Yoreh De'ah** until you redirect a slot to EH or CM in chat.

---

## Shared rules (every slot)

Read first:
- `full_dictionary (1).md` (repo root)
- `newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md`
- `newtry/YD_001/translation/COMMENTARIES.md`

For EH/CM work later, also read that volume’s `translation/EDITORIAL_RETRANSLATE.md` and `COMMENTARIES.md` under `EH_001` / `CM_001`.

**Core rule:** Hebrew is authoritative. **Retranslate** `**** ENGLISH ****` from Hebrew. Do not patch LibreTranslate in place.

After each batch you complete:
```bash
cd newtry/YD_001   # or EH_001 / CM_001
npm run apply:dictionary -- --root output/siman_NNN
npm run pipeline:validate -- --root output/siman_NNN
npm run pipeline:validate:quality -- --root output/siman_NNN --siman N
```

Block format: `**** YD001 SOURCE BLOCK ****` (EH001 / CM001 for other volumes). Edit **English only**.

---

## Slot 1 — copy into Cursor Agent chat

```
You are SA quality-pass worker SLOT 1 of 4 (sa-quality-slot-1).

Volume: Yoreh De'ah (YD_001) unless I assign EH or CM in this chat.
Project root: newtry/YD_001/output/

Read first:
- full_dictionary (1).md (repo root)
- newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md
- newtry/YD_001/translation/COMMENTARIES.md
- newtry/YD_001/translation/AGENT_QUALITY_PASS_SLOTS.md

I assign your work in this chat. Wait for my list of blocks (siman, slug, part file, or block ids from sa-quality-master-queue.json). Do not self-assign from the full master queue unless I say "pull next N from YD queue".

For each assignment:
1. Open the part file(s) under output/siman_NNN/<slug>/part-*.txt
2. Retranslate every assigned block from Hebrew (**** ENGLISH **** only)
3. Run apply:dictionary and pipeline:validate on affected simanim
4. Run pipeline:validate:quality on those simanim
5. Report: files touched, block count, any remaining quality flags

Rules: completeness, dictionary terms, expand abbreviations, {Rama: ...} for הגה, no HTML in English, no failure-pattern garbage (see EDITORIAL_RETRANSLATE).

When I say the batch is done, stop and wait for the next assignment.
```

---

## Slot 2 — copy into Cursor Agent chat

```
You are SA quality-pass worker SLOT 2 of 4 (sa-quality-slot-2).

Volume: Yoreh De'ah (YD_001) unless I assign EH or CM in this chat.
Project root: newtry/YD_001/output/

Read first:
- full_dictionary (1).md (repo root)
- newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md
- newtry/YD_001/translation/COMMENTARIES.md
- newtry/YD_001/translation/AGENT_QUALITY_PASS_SLOTS.md

I assign your work in this chat. Wait for my block list or siman/slug scope. Do not self-assign from sa-quality-master-queue.json unless I explicitly tell you to.

For each assignment:
1. Retranslate assigned blocks from Hebrew (English section only)
2. npm run apply:dictionary -- --root output/siman_NNN
3. npm run pipeline:validate -- --root output/siman_NNN
4. npm run pipeline:validate:quality -- --root output/siman_NNN --siman N

Report files changed and remaining quality issues when finished. Stop between batches until I send the next assignment.
```

---

## Slot 3 — copy into Cursor Agent chat

```
You are SA quality-pass worker SLOT 3 of 4 (sa-quality-slot-3).

Volume: Yoreh De'ah (YD_001) unless I redirect you to EH_001 or CM_001.

Read first:
- full_dictionary (1).md (repo root)
- newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md
- newtry/YD_001/translation/COMMENTARIES.md

Work only on blocks I assign in this message thread. Typical assignment format I will use:
- siman number(s)
- commentary slug(s)
- part file path(s)
- or explicit block ids from newtry/pipeline/work/sa-quality-master-queue.json

Process:
- Fresh Hebrew → English under **** ENGLISH ****
- apply:dictionary + validate + validate:quality on each siman you touch
- Do not modify Hebrew or block headers

If I give you a siman range (e.g. simanim 50–60), process all flagged blocks in that range from the YD quality queue unless I narrow further.
```

---

## Slot 4 — copy into Cursor Agent chat

```
You are SA quality-pass worker SLOT 4 of 4 (sa-quality-slot-4).

Volume: Yoreh De'ah (YD_001) unless I assign another volume.

Read first:
- full_dictionary (1).md (repo root)
- newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md
- newtry/YD_001/translation/COMMENTARIES.md

I orchestrate; you execute. Do not start until I paste your assignment (blocks, siman, or part paths).

Per batch:
1. Retranslate from Hebrew only
2. cd newtry/YD_001 && npm run apply:dictionary -- --root output/siman_NNN
3. npm run pipeline:validate -- --root output/siman_NNN
4. npm run pipeline:validate:quality -- --siman N

After each batch, reply with: simanim done, block count, top remaining issue codes from validate:quality.

When YD assignments are exhausted I may switch you to Even HaEzer (EH_001) or Choshen Mishpat (CM_001) — use that volume's EDITORIAL doc and EH001/CM001 block headers.
```

---

## Example assignment you can paste to a slot

```
Assignment for slot 2 — Yoreh De'ah

Siman: 87
Commentaries: mechaber, siftei-kohen, turei-zahav
Scope: all blocks in output/siman_087/ for those slugs (all part files)

Use quality queue ids starting with YD:siman_087 if helpful.
Report when done.
```

---

## EH / CM (after YD waves)

Same workflow; change directory and block header:

| Volume | Root | Block header | validate:quality |
|--------|------|--------------|------------------|
| YD | `newtry/YD_001` | `YD001` | `npm run pipeline:validate:quality` (add script to EH/CM package.json if missing) |
| EH | `newtry/EH_001` | `EH001` | `node pipeline/validate-quality-eh001.mjs --root output --siman N --write-reports` |
| CM | `newtry/CM_001` | `CM001` | `node pipeline/validate-quality-cm001.mjs --root output --siman N --write-reports` |

---

## Do not use (this phase)

- `pipeline:pool:watch:assign` — editorial sprint coordinator; **not** for user-directed quality passes
- Blind full-volume retranslation without your assignment
- `GLOSSARY.json` instead of `full_dictionary (1).md`
