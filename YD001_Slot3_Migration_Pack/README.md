# YD_001 Slot 3 — Migration Pack

Use this pack when moving the **YD_001 editorial quality pass** (simanim 201–300, non-Mechaber retranslations) to a new machine or Cursor workspace.

## Quick start

1. **Copy your full project** (or at minimum `newtry/YD_001/` with `output/`, `full_dictionary.md`, `progress.log`, and `pipeline/`).
2. **Merge this pack** into your project root (see layout below).
3. Open the repo in Cursor.
4. Paste the contents of `RESUME_PROMPT.txt` into a new Agent chat.

## What is in this pack

| File | Purpose |
|------|---------|
| `README.md` | This file |
| `RESUME_PROMPT.txt` | Single prompt to paste in Cursor to resume work |
| `cursor-rules/yd001-slot3-quality-pass.mdc` | Full Cursor rule — copy to `.cursor/rules/` |
| `newtry/YD_001/AGENTS.md` | Pointer for agents in the YD_001 tree |
| `newtry/YD_001/translation/SLOT3_CURSOR_RULES.md` | Human-readable copy of the same rules |
| `newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md` | Editorial workflow summary |
| `newtry/YD_001/translation/AGENT_QUALITY_PASS_SLOTS.md` | Slot assignments (Slot 3 = 201–300) |
| `newtry/YD_001/pipeline/work/_patch-slot3-batch-TEMPLATE.mjs` | Template for batch patch scripts |
| `newtry/YD_001/pipeline/work/SCAN_AND_VALIDATE.md` | Commands for scan / validate / log |

## Install Cursor rules

From your **repository root** (parent of `newtry/`):

```text
mkdir -p .cursor/rules
cp YD001_Slot3_Migration_Pack/cursor-rules/yd001-slot3-quality-pass.mdc .cursor/rules/
```

On Windows (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path ".cursor\rules"
Copy-Item "YD001_Slot3_Migration_Pack\cursor-rules\yd001-slot3-quality-pass.mdc" ".cursor\rules\"
```

Restart Cursor or reload the window so rules apply.

## Merge `newtry/YD_001/` files

Copy files from this pack’s `newtry/YD_001/` into your project’s `newtry/YD_001/`, overwriting only if you want to refresh docs (do **not** overwrite `output/` or `progress.log` from the pack — those stay from your working copy).

## Verify environment

```powershell
cd newtry\YD_001
node pipeline\work\_slot3-scan-range.mjs 201 300
npm run pipeline:validate -- --root output/siman_211
```

(Adjust siman number for any folder you have.)

## Progress log

Your real `progress.log` lives in `newtry/YD_001/progress.log` on the machine where you did the work. **Copy that file** with the project; this pack does not include it.

Last known batches (verify on your machine):

- batch30: simanim 221, 229, 259, 268, 269
- batch31: simanim 211, 235, 236

Next work: run range scan; typically simanim **264, 283, 293** next.

## Git

This pack does not include git history. Commit only when you choose to on the new system.

## Support files you must have from the main project

- `newtry/YD_001/full_dictionary.md` (required)
- `newtry/YD_001/output/siman_*/**/*.txt`
- `newtry/YD_001/progress.log`
- `newtry/YD_001/pipeline/work/_slot3-scan-range.mjs`
- `package.json` / `npm install` for `pipeline:validate`

---

*Generated for Shulchan Aruch YD_001 Slot 3 quality pass migration.*
