# OC 001 — translation queue (Siman 1, Sefaria bundles)

Hebrew blocks come from **`Sefaria Pulls/shulchan-arukh/Orach_Chayim/simanim/001/seif-NNN.json`** (seifim **1–9**), via `npm run extract` → **`output/manifest.json`**.

Work **strictly in order** where a commentary has blocks. For each row: translate every `**** ENGLISH ****` block under `**** HEBREW ****` in the listed file(s), keeping Hebrew unchanged unless you intend a source correction.

**After any English change**, run the house glossary (mandatory): from `newtry/OC_001`, `npm run apply:dictionary` (uses workspace root `full_dictionary (1).md`). Preview with `npm run apply:dictionary:dry`.

**Regenerate Hebrew blocks** after bundle updates: `npm run extract` (overwrites `output/` from JSON). Legacy HTML file **`OC_001.html`** is optional only (`npm run extract:legacy-html`); do **not** use it as canonical source.

| Step | Commentary | Slug | File(s) | Blocks (siman 1, seif 1–9) |
|------|------------|------|---------|---------------------------|
| 1 | Mechaber and Rama | `mechaber` | `mechaber/part-001.txt` | 9 |
| 2 | Ateret Zekeinim | `ateret-zekenim` | `ateret-zekenim/part-001.txt` | 5 |
| 3 | Baer Hetev | `baer-heitev` | `baer-heitev/part-001.txt` | 9 |
| 4 | Be’er HaGolah | `beer-hagolah` | `beer-hagolah/part-001.txt` | 9 |
| 5 | Biur HaGRA | `beur-hagra` | `beur-hagra/part-001.txt` | 33 |
| 6 | Biur Halacha | `biur-halacha` | `biur-halacha/part-001.txt` | 4 |
| 7 | Chatam Sofer | `chatam-sofer` | `chatam-sofer/part-001.txt` | 2 |
| 8 | Chokhmat Shlomo | `chokhmat-shlomo` | `chokhmat-shlomo/part-001.txt` | 2 |
| — | Chok Yaakov | `chok-yaakov` | *(no file — empty in bundle for this range)* | 0 |
| 9 | Dagul Merevavah | `dagul-merevavah` | `dagul-merevavah/part-001.txt` | 1 |
| 10 | Eliyah Rabbah | `eliyah-rabbah` | `eliyah-rabbah/part-001.txt` | 9 |
| 11 | Eshel Avraham | `eshel-avraham` | `eshel-avraham/part-001.txt` | 4 |
| 12 | Kaf HaChayyim | `kaf-hachayyim` | `kaf-hachayyim/part-001.txt` | 9 |
| — | Kol Yaakov | `kol-yaakov` | *(no file — empty in bundle for this range)* | 0 |
| 13 | Levushei Serad | `levushei-serad` | `levushei-serad/part-001.txt` | 3 |
| 14 | Machatzit HaShekel | `machatzit-hashekel` | `machatzit-hashekel/part-001.txt` | 11 |
| 15 | Magen Avraham | `magen-avraham` | `magen-avraham/part-001.txt` | 9 |
| 16 | Mishnah Berurah | `mishnah-berurah` | `mishnah-berurah/part-001.txt` | 9 |
| 17 | Netiv Chayim | `netiv-chayim` | `netiv-chayim/part-001.txt` | 3 |
| 18 | Pri Megadim | `peri-megadim` | `peri-megadim/part-001.txt` | 8 |
| 19 | Rabbi Akiva Eiger | `rabbi-akiva-eiger` | `rabbi-akiva-eiger/part-001.txt` | 6 |
| 20 | Shaarei Teshuvah | `shaarei-teshuvah` | `shaarei-teshuvah/part-001.txt` | 7 |
| 21 | Turei Zahav (Taz) | `turei-zahav` | `turei-zahav/part-001.txt` | 8 |
| 22 | Yad Ephraim | `yad-ephraim` | `yad-ephraim/part-001.txt` | 9 |

**Batch JSON helper (optional):** Build an array of English strings in **exact block order** (same as top-to-bottom in the part file), save as `tools/translations-<slug>.mjs` exporting `export default [ ... ]`, then:

`node -e "import t from './tools/translations-mechaber.mjs'; import fs from 'fs'; fs.writeFileSync('tools/tmp.json', JSON.stringify(t));"`

`node tools/fill-placeholders-from-json.mjs output/mechaber/part-001.txt tools/tmp.json`
