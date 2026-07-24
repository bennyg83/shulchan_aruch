# EH1 in-depth quality scan

Analogous to `YD_cleanup/scan_oc1_indepth.mjs` (OC1) and the YD register/garbage kits.

## Run

From Copy (2) (or any machine with this tree):

```bash
cd "newtry/SA_Rebuild/EH_cleanup"
node scan_eh1_indepth.mjs
```

Optional corpus override:

```bash
node scan_eh1_indepth.mjs --corpus "C:/path/to/public/corpus/eh1"
```

Default corpus: `../../OC_Mobile/oc318-mobile-reader/public/corpus/eh1`

## Outputs

Dated prefix under `../audit/`:

- `eh1_indepth_YYYY-MM-DD_REPORT.md`
- `eh1_indepth_YYYY-MM-DD_summary.json`
- `eh1_indepth_YYYY-MM-DD_rows.json`
- `eh1_indepth_YYYY-MM-DD_layout.json`
- Per-category CSVs (`_lord`, `_garbage`, `_severe`, `_hebrewLeak`, `_baptism`, `_foreign`, …)

## What it checks

Content (canonical `simanN/seif-N/slug/en.html` only; **bundles excluded**):

- Placeholders / empty EN
- Garbage MT (`GARBAGE_RE` from `provenance-config.mjs`)
- Register tells: the Lord, Yahweh, the Bible, Psalms, Passover, baptism
- HebrewLeak
- Severe / foreign-religion scrap (with ḥallah→allah FP filter)
- Muslims (review bucket), em/en-dash, mojibake-ish

Layout:

- Unexpected top-level dirs (not `siman*` / `bundles`)
- Non-canonical `en.html` paths
- `en` without `he` / `he` without `en`
- Empty seif directories
- Bundles presence (counted, not content-scanned)

## Residual cleanup kit

After a clean scan pass, build the GPT kit from remaining actionable flags:

```bash
node build_eh1_cleanup_kit.mjs
# ? gpt_kit_eh1_cleanup/ (+ gpt_kit_eh1_cleanup.zip)
```

Apply replies:

```bash
node apply_eh1_cleanup_replies.mjs --replies <unzipped>/replies
```
