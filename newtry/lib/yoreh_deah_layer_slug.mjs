/**
 * Map `seif-NNN.json` layer keys (Sefaria commentary titles) → filesystem slug under YD001 output.
 * Aligned with `sa-preprocess.mjs` YD commentary slugs where applicable.
 */
export const LAYER_KEY_TO_SLUG = {
  mechaber: "mechaber",
  "Ba'er Hetev on Shulchan Arukh, Yoreh De'ah": "baer-heitev",
  "Be'er HaGolah on Shulchan Arukh, Yoreh De'ah": "beer-hagolah",
  "Beur HaGra on Shulchan Arukh, Yoreh De'ah": "beur-hagra",
  "Chiddushei Hilkhot Niddah on Shulchan Arukh, Yoreh De'ah": "chiddushei-hilkhot-niddah",
  "Kaf HaChayim on Shulchan Arukh, Yoreh De'ah": "kaf-hachayim",
  "Kereti on Shulchan Arukh, Yoreh De'ah": "kereti",
  "Kol Yaakov on Shulchan Arukh": "kol-yaakov",
  "Mateh Yehonatan on Shulchan Arukh, Yoreh De'ah": "mateh-yehonatan",
  "Nekudot HaKesef on Shulchan Arukh, Yoreh De'ah": "nekudot-hakesef",
  "Peleti on Shulchan Arukh, Yoreh De'ah": "peleti",
  "Peri Megadim on Yoreh De'ah": "peri-megadim-yd",
  "Pitchei Teshuva on Shulchan Arukh, Yoreh De'ah": "pitchei-teshuva",
  "Rabbi Akiva Eiger on Shulchan Arukh, Yoreh De'ah": "rabbi-akiva-eiger-yd",
  "Siftei Kohen on Shulchan Arukh, Yoreh De'ah": "siftei-kohen",
  "Tiferet Yisrael on Shulchan Arukh, Yoreh De'ah": "tiferet-yisrael",
  "Torat HaShlamim on Shulchan Arukh, Yoreh De'ah": "torat-hashlamim",
  "Turei Zahav on Shulchan Arukh, Yoreh De'ah": "turei-zahav",
  "Yad Avraham on Shulchan Arukh, Yoreh Deah": "yad-avraham",
  "Yad Ephraim on Shulchan Arukh, Yoreh De'ah": "yad-ephraim",
};

export function slugFromLayerKey(key) {
  if (LAYER_KEY_TO_SLUG[key]) return LAYER_KEY_TO_SLUG[key];
  return key
    .replace(/ on Shulchan Arukh,? Yoreh De'?ah/gi, "")
    .replace(/ on Yoreh De'?ah/gi, "")
    .replace(/ on Shulchan Arukh/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

/** Folder name under `newtry/YD_001/output/` for this layer key. */
export function yd001OutputSlugFromLayerKey(layerKey) {
  return slugFromLayerKey(layerKey);
}
