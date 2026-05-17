/**
 * Map `seif-NNN.json` layer keys (Sefaria commentary titles) → filesystem slug under simanim/…/seif-…/<slug>/.
 * Shared by export-seif-hebrew.mjs and OC001 bundle extract.
 */
export const LAYER_KEY_TO_SLUG = {
  mechaber: "mechaber",
  "Ateret Zekenim on Shulchan Arukh, Orach Chayim": "ateret-zekenim",
  "Ba'er Hetev on Shulchan Arukh, Orach Chayim": "baer-heitev",
  "Be'er HaGolah on Shulchan Arukh, Orach Chayim": "beer-hagolah",
  "Beur HaGra on Shulchan Arukh, Orach Chayim": "beur-hagra",
  "Biur Halacha": "biur-halacha",
  "Chatam Sofer on Shulchan Arukh, Orach Chayim": "chatam-sofer",
  "Chokhmat Shlomo on Shulchan Arukh, Orach Chayim": "chokhmat-shlomo",
  "Chok Yaakov on Shulchan Arukh, Orach Chayim": "chok-yaakov",
  "Dagul MeRevava on Shulchan Arukh, Orach Chayim": "dagul-merevavah",
  "Eliyah Rabbah on Shulchan Arukh, Orach Chayim": "eliyah-rabbah",
  "Eshel Avraham on Shulchan Arukh, Orach Chayim": "eshel-avraham",
  "Kaf HaChayim on Shulchan Arukh, Orach Chayim": "kaf-hachayim",
  "Kol Yaakov on Shulchan Arukh": "kol-yaakov",
  "Levushei Serad on Shulchan Arukh, Orach Chayim": "levushei-serad",
  "Machatzit HaShekel on Orach Chayim": "machatzit-hashekel",
  "Magen Avraham": "magen-avraham",
  "Mishnah Berurah": "mishnah-berurah",
  "Netiv Chayim on Shulchan Arukh, Orach Chayim": "netiv-chayim",
  "Peri Megadim on Orach Chayim": "peri-megadim",
  "Rabbi Akiva Eiger on Shulchan Arukh, Orach Chayim": "rabbi-akiva-eiger",
  "Sha'arei Teshuvah on Shulchan Arukh, Orach Chayim": "shaarei-teshuvah",
  "Turei Zahav on Shulchan Arukh, Orach Chayim": "turei-zahav",
  "Yad Ephraim on Shulchan Arukh, Orach Chayim": "yad-ephraim",
};

export function slugFromLayerKey(key) {
  if (LAYER_KEY_TO_SLUG[key]) return LAYER_KEY_TO_SLUG[key];
  return key
    .replace(/ on Shulchan Arukh,? Orach Chayim/gi, "")
    .replace(/ on Shulchan Arukh/gi, "")
    .replace(/ on Orach Chayim/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

/** OC001 `output/<slug>/` folder names that differ from layer slug (import wiring). */
const OC001_FOLDER_SLUG_OVERRIDES = {
  "kaf-hachayim": "kaf-hachayyim",
};

/** Folder name under `newtry/OC_001/output/` for this layer key. */
export function oc001OutputSlugFromLayerKey(layerKey) {
  const base = slugFromLayerKey(layerKey);
  return OC001_FOLDER_SLUG_OVERRIDES[base] ?? base;
}
