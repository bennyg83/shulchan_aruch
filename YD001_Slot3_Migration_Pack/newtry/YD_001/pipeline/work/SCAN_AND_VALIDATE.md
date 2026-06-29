# Scan, validate, and log — Slot 3

Run all commands from: `newtry/YD_001/`

## Scan for bad English (failure patterns)

Full range (201–300):

```bash
node pipeline/work/_slot3-scan-range.mjs 201 300
```

Single siman:

```bash
node pipeline/work/_slot3-scan-range.mjs 264 264
```

Output lines look like:

```text
siman_264/beur-hagra/part-001.txt:3#א
```

Use `seif#marker` as patch keys.

## Apply batch patch

```bash
node pipeline/work/_patch-slot3-batch32.mjs
```

## Validate block file structure

```bash
npm run pipeline:validate -- --root output/siman_264
```

Expect: `OK — N file(s) checked under .../output/siman_264`

## Log progress (PowerShell)

```powershell
$ts = Get-Date -Format "yyyy-MM-ddTHH:mm:ss"
"$ts siman_264 slot3-batch32 6 blocks DONE" | Add-Content -Path progress.log -Encoding utf8
```

## Log progress (bash)

```bash
echo "$(date -Iseconds) siman_264 slot3-batch32 6 blocks DONE" >> progress.log
```

## Success criteria per siman

1. Scan for that siman: `[TOTAL] 0 blocks`
2. Validate: `OK`
3. Line appended to `progress.log`
