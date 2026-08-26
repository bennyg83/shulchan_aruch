# CM1 cleanup / GPT retranslate kits

## Source
`newtry/CM_001/output` (junction → `Downloads\Shulchan Aruch2\newtry\CM_001\output`).

## Validate + apply GPT replies
```bash
node apply_cm1_retranslate_replies.mjs --replies <dir> --worksheets <kit/worksheets>
# dry-run:
node apply_cm1_retranslate_replies.mjs --replies <dir> --worksheets <kit/worksheets> --dry-run
```

## Scan residual dirty
```bash
node scan_cm1_dirty.mjs
node scan_cm1_dirty.mjs --slug beur-hagra
```

## Build GPT kit series (≤100 simanim / zip)
```bash
node build_cm1_retranslate_kits.mjs --max-simanim 100
node build_cm1_retranslate_kits.mjs --only beur-hagra --max-simanim 100
```

- Skips **beer-hagolah** (Claude lane)
- Dirty = register/garbage MT + HebrewLeak + pending
- Output: `gpt_kits_cm1/` + `SERIES_INDEX.md`
- Handoff copy: `Downloads\cm1_gpt_kits_v2\`
