# Shulchan Aruch — multisection monorepo strategy

**Repo:** [bennyg83/shulchan_aruch](https://github.com/bennyg83/shulchan_aruch)  
**Live site (today):** [GitHub Pages — Orach Chayim reader](https://bennyg83.github.io/shulchan_aruch/)  
**Long-term goal:** Full Shulchan Aruch (OC, YD, EH, CM) in web + mobile, dictionary-consistent English.

---

## Volumes and code locations

| Volume | Hebrew | Code | Simanim | Git branch | Mobile corpus (target) |
|--------|--------|------|---------|------------|-------------------------|
| Orach Chayim | אורח חיים | `newtry/OC_001` | 697 | `main` | `corpus/oc1` ✅ live |
| Yoreh De'ah | יורה דעה | `newtry/YD_001` | 403 | `yd-cleanup` | `corpus/yd1` |
| Even HaEzer | אבן העזר | `newtry/EH_001` | 178 | `eh-development` | `corpus/eh1` |
| Choshen Mishpat | חושן משפט | `newtry/CM_001` | 427 | `cm-development` | `corpus/cm1` |

**Shared glossary:** `full_dictionary (1).md` (repo root) — mandatory for every editorial pass.

---

## Branch model

```
main                 ← OC production, Pages deploy, shared docs, mobile oc1
├── yd-cleanup       ← YD translation + quality cleanup (active)
├── eh-development   ← EH translation + quality cleanup
└── cm-development   ← CM translation + quality cleanup
```

| Branch | Merges to `main` | Triggers GitHub Pages |
|--------|------------------|------------------------|
| `main` | — | **Yes** (OC web reader only) |
| `yd-cleanup` | Per-siman PRs when quality gate passes | **No** |
| `eh-development` | Per-siman PRs when quality gate passes | **No** |
| `cm-development` | Per-siman PRs when quality gate passes | **No** |

**Worker PR branches** (optional): `yd/cleanup-siman-110` → PR into `yd-cleanup`.

### What belongs on `main`

- `docs/` (this file and branch guides)
- `.github/workflows/` (Pages deploy, section quality gates)
- `newtry/OC_001/`, `newtry/OC_Mobile/` (live OC)
- `full_dictionary (1).md`
- **Not** bulk `YD_001/output/`, `EH_001/output/`, `CM_001/output/` until gated merge

### What belongs on section branches

- Entire `newtry/{YD,EH,CM}_001/` tree including `output/`, `pipeline/`, `progress.log`
- Section `BRANCH.md`, `pipeline/work/COORDINATION.md`, `AGENT_WORKER_PROMPT.md`

---

## Translation pipeline (every volume)

Same four phases for OC, YD, EH, CM:

| Phase | What | Tooling |
|-------|------|---------|
| **0 Bootstrap** | Hebrew blocks from Sefaria bundles | `npm run bootstrap:*-simanim` |
| **1 Machine translation** | First-pass English | LibreTranslate (`npm run libre:up`, `translate:placeholders:libre`) |
| **1b Dictionary** | Term normalization | `npm run apply:dictionary` |
| **2 Editorial** | Retranslate from Hebrew; ignore bad MT | Cursor cloud agents / `quality:worker:*` / pool coordinator |
| **3 Validate** | Heuristic quality gate | `npm run pipeline:validate:quality` |
| **4 Publish** | Reader JSON bundles | Section `publish:siman` → `public/corpus/{oc1,yd1,eh1,cm1}` |

**Rule:** Hebrew is authoritative. Dictionary is mandatory. Do not patch MT garbage in place.

---

## GitHub Actions

| Workflow | Branch | Purpose |
|----------|--------|---------|
| `deploy-gh-pages.yml` | `main` only | Build OC web reader → Pages |
| `sa-yd-quality-gate.yml` | `yd-cleanup`, `yd/**` PRs | Validate YD on touched paths |
| `sa-eh-quality-gate.yml` | `eh-development`, `eh/**` PRs | Validate EH |
| `sa-cm-quality-gate.yml` | `cm-development`, `cm/**` PRs | Validate CM |

Pages deploy uses **sparse checkout** of `oc-web-reader` + `corpus/oc1` only — section branch pushes do not affect the live site.

---

## End state — GitHub Pages

**Today:** Single-volume OC reader at `/shulchan_aruch/`.

**Target:**

- Volume switcher (OC / YD / EH / CM) in `newtry/OC_Mobile/oc-web-reader`
- Each volume loads `public/corpus/{oc1,yd1,eh1,cm1}/catalog.json` + bundles
- Deploy workflow extended to include published corpora (or submodule/LFS strategy)
- Only **quality-gated** simanim merged to `main` corpus paths

---

## End state — mobile (APK / iOS)

**Today:** `oc318-mobile-reader` ships `corpus/oc1` (~697 simanim).

**Target:**

- Same reader shell; catalog lists all four volumes
- Optional per-volume APK slices or full SA build
- Offline bundles mirror web corpus layout
- CI: existing `build-standalone-apk.yml` / `build-standalone-ios.yml` extended when `yd1`/`eh1`/`cm1` land on `main`

---

## Cursor cloud agents

1. Checkout section branch (`yd-cleanup`, etc.).
2. Claim row in `pipeline/work/COORDINATION.md`.
3. Read `pipeline/work/AGENT_WORKER_PROMPT.md` + `full_dictionary (1).md`.
4. Edit `output/siman_NNN/...` — English only.
5. `npm run apply:dictionary` → validate → PR to section branch.

---

## Merge checklist (section → main)

- [ ] Siman passes `pipeline:validate:quality` at error level
- [ ] `apply:dictionary` run
- [ ] Publish slice to `corpus/{volume}` (separate PR to `main`)
- [ ] No accidental edits to `corpus/oc1` or Pages workflow

---

## Quick links

- [YD branch guide](branches/yd-cleanup.md)
- [EH branch guide](branches/eh-development.md)
- [CM branch guide](branches/cm-development.md)
- [OC pipeline](../OC_ORACH_CHAYIM_PIPELINE.md)
