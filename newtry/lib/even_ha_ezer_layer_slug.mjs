/**
 * Even HaEzer — Sefaria layer key → output slug
 */
export const LAYER_KEY_TO_SLUG = {
  "mechaber": "mechaber",
  "Ba'er_Hetev_on_Shulchan_Arukh,_Even_HaEzer": "baer-hetev-on-shulchan-arukh-even-haezer",
  "Be'er_HaGolah_on_Shulchan_Arukh,_Even_HaEzer": "beer-hagolah-on-shulchan-arukh-even-haezer",
  "Beit_Meir_on_Shulchan_Arukh,_Even_HaEzer": "beit-meir-on-shulchan-arukh-even-haezer",
  "Beit_Shmuel": "beit-shmuel",
  "Beur_HaGra_on_Shulchan_Arukh,_Even_HaEzer": "beur-hagra-on-shulchan-arukh-even-haezer",
  "Chokhmat_Shlomo_on_Shulchan_Arukh,_Even_HaEzer": "chokhmat-shlomo-on-shulchan-arukh-even-haezer",
  "Ezer_MiKodesh_on_Shulchan_Arukh,_Even_HaEzer": "ezer-mikodesh-on-shulchan-arukh-even-haezer",
  "Pitchei_Teshuva_on_Shulchan_Arukh,_Even_HaEzer": "pitchei-teshuva-on-shulchan-arukh-even-haezer",
  "Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Even_HaEzer": "rabbi-akiva-eiger-on-shulchan-arukh-even-haezer",
  "Turei_Zahav_on_Shulchan_Arukh,_Even_HaEzer": "turei-zahav-on-shulchan-arukh-even-haezer",
};

export function slugFromLayerKey(key) {
  if (LAYER_KEY_TO_SLUG[key]) return LAYER_KEY_TO_SLUG[key];
  return key
    .replace(/ on Shulchan Arukh,? Even HaEzer/gi, "")
    .replace(/ on Shulchan Arukh/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function outputSlugFromLayerKey(layerKey) {
  return slugFromLayerKey(layerKey);
}

export const eh001OutputSlugFromLayerKey = outputSlugFromLayerKey;
