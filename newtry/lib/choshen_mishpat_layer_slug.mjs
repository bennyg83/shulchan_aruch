/**
 * Choshen Mishpat — Sefaria layer key → output slug
 */
export const LAYER_KEY_TO_SLUG = {
  "mechaber": "mechaber",
  "Ba'er_Hetev_on_Shulchan_Arukh,_Choshen_Mishpat": "baer-hetev-on-shulchan-arukh-choshen-mishpat",
  "Be'er_HaGolah_on_Shulchan_Arukh,_Choshen_Mishpat": "beer-hagolah-on-shulchan-arukh-choshen-mishpat",
  "Beur_HaGra_on_Shulchan_Arukh,_Choshen_Mishpat": "beur-hagra-on-shulchan-arukh-choshen-mishpat",
  "Chatam_Sofer_on_Shulchan_Arukh,_Choshen_Mishpat": "chatam-sofer-on-shulchan-arukh-choshen-mishpat",
  "Chelkat_Mechokek": "chelkat-mechokek",
  "Chokhmat_Shlomo_on_Shulchan_Arukh,_Choshen_Mishpat": "chokhmat-shlomo-on-shulchan-arukh-choshen-mishpat",
  "Haggahot_Imrei_Barukh_on_Shulchan_Arukh,_Choshen_Mishpat": "haggahot-imrei-barukh-on-shulchan-arukh-choshen-mishpat",
  "Kessef_HaKodashim_on_Shulchan_Arukh,_Choshen_Mishpat": "kessef-hakodashim-on-shulchan-arukh-choshen-mishpat",
  "Ketzot_HaChoshen_on_Shulchan_Arukh,_Choshen_Mishpat": "ketzot-hachoshen-on-shulchan-arukh-choshen-mishpat",
  "Me'irat_Einayim_on_Shulchan_Arukh,_Choshen_Mishpat": "meirat-einayim-on-shulchan-arukh-choshen-mishpat",
  "Netivot_HaMishpat,_Beurim_on_Shulchan_Arukh,_Choshen_Mishpat": "netivot-hamishpat-beurim-on-shulchan-arukh-choshen-mishpat",
  "Netivot_HaMishpat,_Hidushim_on_Shulchan_Arukh,_Choshen_Mishpat": "netivot-hamishpat-hidushim-on-shulchan-arukh-choshen-mishpat",
  "Pitchei_Teshuva_on_Shulchan_Arukh,_Choshen_Mishpat": "pitchei-teshuva-on-shulchan-arukh-choshen-mishpat",
  "Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Choshen_Mishpat": "rabbi-akiva-eiger-on-shulchan-arukh-choshen-mishpat",
  "Siftei_Kohen_on_Shulchan_Arukh,_Choshen_Mishpat": "siftei-kohen-on-shulchan-arukh-choshen-mishpat",
  "Turei_Zahav_on_Shulchan_Arukh,_Choshen_Mishpat": "turei-zahav-on-shulchan-arukh-choshen-mishpat",
  "Urim_VeTumim,_Tumim": "urim-vetumim-tumim",
  "Urim_VeTumim,_Urim": "urim-vetumim-urim",
};

export function slugFromLayerKey(key) {
  if (LAYER_KEY_TO_SLUG[key]) return LAYER_KEY_TO_SLUG[key];
  return key
    .replace(/ on Shulchan Arukh,? Choshen Mishpat/gi, "")
    .replace(/ on Shulchan Arukh/gi, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function outputSlugFromLayerKey(layerKey) {
  return slugFromLayerKey(layerKey);
}

export const cm001OutputSlugFromLayerKey = outputSlugFromLayerKey;
