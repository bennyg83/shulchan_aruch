# CLAUDE.md — EH001 CLI workspace

This folder is the **working directory** for Claude Code / CLI agents on Even HaEzer.

## Setup (once per machine)

From repo root, ensure junction or copy so these exist **here**:

- `full_dictionary.md` → repo `full_dictionary (1).md`
- `output/` → `../output/`
- `progress.log` → `../progress.log`

PowerShell (junction):

```powershell
cd newtry/EH_001/cli_workspace
cmd /c mklink full_dictionary.md "..\..\..\full_dictionary (1).md"
cmd /c mklink /J output "..\output"
cmd /c mklink progress.log "..\progress.log"
```

## Read on every session

1. `full_dictionary.md`
2. `../translation/COMMENTARIES.md`
3. `../translation/EDITORIAL_RETRANSLATE.md`
4. `progress.log`

## Commands (from `newtry/EH_001`)

```bash
npm run pipeline:validate -- --root output/siman_001
npm run apply:dictionary -- --root output/siman_001
```
