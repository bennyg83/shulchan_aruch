# Slave cleanup (simanim 10–20)

**Inference:** Intel BennyGDev — `http://10.100.102.14:11434` — `qwen2.5:14b-instruct`  
**Daily on slave:** `powershell -ExecutionPolicy Bypass -File C:\oc001-slave\Start-OllamaServe.ps1`

This track is **draft-only**. Cloud editorial workers (siman 41+) still own `finish-siman`, publish, and release.

## Master commands

```bash
cd newtry/OC_001

# One batch (6 blocks) on siman 10
node pipeline/ollama-slave-draft.mjs --siman 10 --max-blocks 6

# Full loop 10–20 until quality queue empty
node pipeline/slave-cleanup-runner.mjs --from 10 --to 20

# Status: remaining quality blocks
node -e "import('./pipeline/slave-cleanup-runner.mjs')"
```

Checkpoint file: `pipeline/work/slave-cleanup-done-ids.txt` (does not affect editorial-done-ids).

After slave drafts: optional cloud pass on worst blocks, then `npm run pipeline:orchestrator:publish` for simanim 10–20 when ready.

## Env (master)

```
OC001_OLLAMA_URL=http://10.100.102.14:11434
OC001_OLLAMA_MODEL=qwen2.5:14b-instruct
```
