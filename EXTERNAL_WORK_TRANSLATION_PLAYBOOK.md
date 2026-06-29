# Standalone halachic translation playbook

Use this when you are **not** translating Shulchan Aruch, but you want the **same workflow** Benny uses: Hebrew JSON by chapter → block files → machine translation (MT) → house dictionary → Cursor agents for editorial pass.

**You need from Benny (or this repo):**

| File | Purpose |
|------|---------|
| `full_dictionary (1).md` | Authoritative halachic terms, abbreviations, commentator names |
| This playbook | Process + prompts |
| Optional: `halachic_translation_living_cursor_guide.md` | Deeper rules (validation markers, gematria, etc.) |

**Core rule (non‑negotiable):** Hebrew is authoritative. If English is wrong, retranslate from Hebrew — do not “fix” broken English in place.

---

## 1. What your source data should look like

Assume a **raw JSON** export: Hebrew only, split by **chapter** (not siman/seif unless your work uses those). No commentaries in this example.

```json
{
  "title": "My Work",
  "chapters": [
    {
      "chapter": 1,
      "title_he": "פרק א",
      "sections": [
        { "id": "1", "hebrew": "טקסט עברי של הפסקה הראשונה..." },
        { "id": "2", "hebrew": "פסקה שנייה..." }
      ]
    },
    {
      "chapter": 2,
      "sections": [
        { "id": "1", "hebrew": "..." }
      ]
    }
  ]
}
```

Adapt field names (`sections` vs `paragraphs`, `hebrew` vs `text`) — the pipeline only needs: **chapter number** + **stable section id** + **Hebrew string**.

---

## 2. Project layout (create once)

Pick a short project id, e.g. `MW001` (My Work 001).

```text
my-work-001/
  package.json
  full_dictionary.md          ← copy of Benny's full_dictionary (1).md
  source/
    raw.json                  ← your Hebrew JSON
  tools/
    json-to-blocks.mjs        ← you write or adapt (see §3)
    apply-dictionary.mjs      ← copy/adapt from YD_001 apply_dictionary_*.mjs
    translate-pending-mt.mjs  ← copy/adapt from translate-yd001-pending-mymemory.mjs
  block_lib.mjs               ← BLOCK_START + parse/serialize (see §4)
  output/
    chapter_001/
      mechaber/
        part-001.txt
    chapter_002/
      mechaber/
        part-001.txt
  translation/
    EDITORIAL_RETRANSLATE.md  ← project-specific notes (title, tone)
    AGENT_WORKER.md           ← slot prompts (§8)
  docker/
    libretranslate/
      docker-compose.yml      ← copy from OC_001 or YD_001
  pipeline/
    work/
      coordinator-assignments.json
```

**Folder naming:** use `chapter_NNN` (three digits) instead of `siman_NNN`. Everything else can mirror the SA pipeline.

**Commentaries:** if you truly have none, use a single slug folder: `mechaber/` under each chapter.

---

## 3. Step A — JSON → block files

Write `tools/json-to-blocks.mjs` that:

1. Reads `source/raw.json`.
2. For each chapter, writes `output/chapter_NNN/mechaber/part-PPP.txt`.
3. Splits long chapters into multiple `part-*.txt` files (e.g. max ~40 blocks per part) so agents do not hit context limits.
4. Emits one **block** per section (see §4).

**English placeholder** until MT/editorial:

```text
English translation pending — replace after editing this block (keep Hebrew above intact).
```

Run once after JSON is ready:

```bash
node tools/json-to-blocks.mjs
```

---

## 4. Block file format (required)

Agents and scripts key off these markers. Use a **project-specific** first line so tools do not confuse your work with OC/YD:

```text
**** MW001 SOURCE BLOCK ****
slug: mechaber
seif: 1
marker: _
**** HEBREW ****
[Hebrew paragraph — plain text or light HTML]
**** ENGLISH ****
[MT or agent replaces ONLY this section]
**** END BLOCK ****
```

| Field | Your work (chapters only) |
|-------|-----------------------------|
| `slug` | Always `mechaber` (or one slug per “layer” if you add layers later) |
| `seif` | Section id from JSON (`1`, `2`, …) |
| `marker` | `_` unless you have sub-clauses (א, ב, …) |

Implement `block_lib.mjs` with `BLOCK_START = "**** MW001 SOURCE BLOCK ****"` plus `parseBlocksInFile` / `serializeBlock` (copy from `newtry/YD_001/yd001_block_lib.mjs` and rename).

---

## 5. Step B — Machine translation (LibreTranslate)

### 5.1 Docker (first time)

From `my-work-001/`:

```bash
npm run libre:up
# or: docker compose -f docker/libretranslate/docker-compose.yml up -d
```

- Image: `libretranslate/libretranslate:latest`
- Port: **5000**
- Env: `LT_LOAD_ONLY=en,he` (Hebrew → English only)
- **First start** downloads models — can take several minutes. Wait until healthcheck passes.

```bash
curl http://localhost:5000/languages
```

You should see `he` and `en`.

### 5.2 MT script behavior

Your `translate-pending-mt.mjs` should:

1. Walk `output/chapter_*/**/*.txt`.
2. Parse blocks; skip if English is already “good” (not placeholder / not flagged pending).
3. Strip HTML from Hebrew for the API; send chunks to `POST http://localhost:5000/translate` with `source=he`, `target=en`.
4. Write result **only** under `**** ENGLISH ****` (never overwrite Hebrew).
5. Log progress per chapter/part.

**Run full corpus MT:**

```bash
set LIBRE_URL=http://localhost:5000
node tools/translate-pending-mt.mjs --root output
```

**Pilot first:** one chapter only:

```bash
node tools/translate-pending-mt.mjs --root output/chapter_001
```

MT is **draft quality** — expect calques, wrong halachic terms, and garbage on abbreviations. That is normal; the dictionary pass and agents fix it.

---

## 6. Step C — Dictionary pass (mandatory after MT)

Point the apply script at the same dictionary Benny uses:

```bash
node tools/apply-dictionary.mjs --root output/chapter_001
node tools/apply-dictionary.mjs --root output
```

This normalizes terms using `full_dictionary.md` (abbreviations, Shach/Taz-style names if they appear, issur/heter, etc.). It does **not** replace full editorial retranslation.

**Order:** MT → **dictionary** → editorial agents → validate.

---

## 7. Step D — Validation (optional but recommended)

If you copied Benny’s pipeline scripts, run structure/validate on a chapter:

```bash
npm run pipeline:validate -- --root output/chapter_001
```

Otherwise, manually check:

- Every block has Hebrew + English + `**** END BLOCK ****`
- No HTML left in English
- No empty English sections
- Halachic terms match dictionary where applicable

---

## 8. Editorial agents (4 Cursor slots)

### 8.1 Coordinator (who assigns work)

**Simple start (no Node pool):** maintain `pipeline/work/coordinator-assignments.json`:

```json
{
  "complete": false,
  "slots": [
    { "slot": 1, "unitId": "chapter-003-part1of2", "batchPath": "output/chapter_003/mechaber/part-001.txt" },
    { "slot": 2, "unitId": "chapter-005-part1of1", "batchPath": "output/chapter_005/mechaber/part-001.txt" },
    { "slot": 3, "unitId": null, "batchPath": null },
    { "slot": 4, "unitId": null, "batchPath": null }
  ]
}
```

Update `unitId` / `batchPath` when a worker finishes (or run Benny’s `pool-coordinator-watch --assign-only` if you cloned the full `pipeline/` from `YD_001`).

### 8.2 Open four Agent chats (once)

In Cursor, open **4** Composer/Agent sessions. Paste the prompt below into each, changing `SLOT` to **1**, **2**, **3**, **4**.

---

## 9. Copy-paste agent prompt (per slot)

Replace `MW001`, paths, and slot number.

```text
You are MW001 editorial worker SLOT of 4 (mw-worker-SLOT). Work until the coordinator marks the project complete. Do not ask the user for permission between batches.

Read first (in order):
1. full_dictionary.md (project root) — authoritative for every halachic term and abbreviation
2. translation/EDITORIAL_RETRANSLATE.md
3. halachic_translation_living_cursor_guide.md (if present) — validation markers and retranslation rules

Core rule: Hebrew is authoritative. Translate fresh from Hebrew into **** ENGLISH **** only. Do not patch bad English in place.

LOOP:
1. Read pipeline/work/coordinator-assignments.json
2. Look at slots[SLOT-1] (slot number SLOT). If unitId or batchPath is null, wait 30 seconds and repeat.
3. If unitId equals your lastCompletedUnitId, wait 30 seconds and repeat.
4. Open batchPath (a part file under output/chapter_NNN/mechaber/).
5. For EVERY block in that file:
   - Read **** HEBREW ****
   - Replace **** ENGLISH **** with new translation
   - Use dictionary terms exactly where the dictionary defines them
   - Expand rosh teivot per dictionary; no unexplained Hebrew abbreviations in English
   - Plain prose: no HTML in English
6. Save the file.
7. Run dictionary on that chapter folder:
   node tools/apply-dictionary.mjs --root output/chapter_NNN
8. If you have a validator:
   npm run pipeline:validate -- --root output/chapter_NNN
   Fix until clean.
9. Tell the coordinator (or human) this unitId is done; set lastCompletedUnitId = unitId; go to step 1.

Stop only if: project complete flag is true, or a hard error persists after 3 retries on the same unit.

Do not use GLOSSARY.json or ad-hoc term lists instead of full_dictionary.md.
```

---

## 10. `translation/EDITORIAL_RETRANSLATE.md` (friend fills in)

Minimal template:

```markdown
# MW001 editorial re-translation

**Dictionary:** `full_dictionary.md` (project root). Consult for every halachic term.

**Source of truth:** `output/chapter_NNN/mechaber/part-*.txt`

**Work-specific notes:**
- Book title: …
- Transliterate X as …
- Chapter = JSON `chapter` field; seif = JSON section `id`

## Rules
- Completeness: every Hebrew sentence must appear in English.
- No additions: do not add explanations not in the Hebrew.
- Retranslate from Hebrew; do not edit MT English in place without checking Hebrew.
```

---

## 11. Example message to send your friend

You can copy this as-is:

> **Project:** Translate *[book name]* from Benny’s halachic pipeline.  
>  
> 1. Get `full_dictionary (1).md` and `EXTERNAL_WORK_TRANSLATION_PLAYBOOK.md`.  
> 2. Put your Hebrew JSON in `source/raw.json` (chapters → sections with `hebrew` text).  
> 3. Build `output/chapter_NNN/mechaber/part-*.txt` using the block format in the playbook (`**** MW001 SOURCE BLOCK ****` …).  
> 4. Start Docker LibreTranslate (`npm run libre:up`), run MT on `output/`, then **always** run `apply-dictionary.mjs` on the same tree.  
> 5. Open 4 Cursor Agent chats; paste the slot worker prompt from §9 of the playbook (slot 1–4).  
> 6. Assign chapters via `coordinator-assignments.json` (or ask Benny for the pool coordinator scripts from `YD_001`).  
>  
> **Quality bar:** English must come from Hebrew + dictionary, not from polishing MT alone.  
>  
> If stuck on block format or scripts, compare to `newtry/YD_001/output/siman_001/mechaber/part-001.txt` in Benny’s repo (same structure, different folder names).

---

## 12. How this maps to Benny’s SA repo

| Friend’s work | Benny’s SA pipeline |
|---------------|---------------------|
| `chapter_NNN` | `siman_NNN` |
| `mechaber/` only | `mechaber/`, `siftei-kohen/`, … |
| `MW001 SOURCE BLOCK` | `YD001` / `OC001` SOURCE BLOCK |
| `full_dictionary.md` | `full_dictionary (1).md` at repo root |
| `translate-pending-mt.mjs` | `translate-yd001-pending-mymemory.mjs` |
| 4 agent slots + coordinator JSON | `YD_001` `pipeline:pool:watch:assign` + `AGENT_SELF_LOOP_WORKER.md` |

If your friend clones the full monorepo, the fastest path is: copy `newtry/YD_001`, rename to `MW_001`, run `provision-volume-001`-style renames, and replace Sefaria/bootstrap with their JSON→blocks script — but the playbook above is enough without the whole repo.

---

## 13. Checklist

- [ ] JSON validated (chapters, ids, Hebrew non-empty)
- [ ] Blocks generated under `output/chapter_*/mechaber/`
- [ ] LibreTranslate up; pilot MT on `chapter_001`
- [ ] Full MT on `output/`
- [ ] Dictionary applied on entire `output/`
- [ ] `EDITORIAL_RETRANSLATE.md` filled for the specific book
- [ ] 4 agents running slot prompts
- [ ] Coordinator assigns next chapter/parts when a slot finishes
- [ ] Final validate pass on all chapters
