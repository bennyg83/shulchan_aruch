/**
 * YD001 volume constants — single source for paths, siman range, commentary order.
 */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const WORKSPACE = path.resolve(__dirname, "..", "..");

export const VOLUME = "YD";
export const VOLUME_LABEL = "Yoreh De'ah";
export const SIMAN_MIN = 1;
export const SIMAN_MAX = 403;
export const BLOCK_START = "**** YD001 SOURCE BLOCK ****";
export const PROJECT_ID = "YD001";

export const YD001_ROOT = path.join(WORKSPACE, "newtry", "YD_001");
export const YD001_OUTPUT = path.join(YD001_ROOT, "output");
export const YD001_PIPELINE_WORK = path.join(YD001_ROOT, "pipeline", "work");

export const SEFARIA_YD = path.join(WORKSPACE, "Sefaria Pulls", "shulchan-arukh", "Yoreh_Deah");
export const SEFARIA_YD_TOOLS = path.join(SEFARIA_YD, "tools");
export const SEFARIA_YD_SIMANIM = path.join(SEFARIA_YD, "simanim");

export const PUBLIC_CORPUS_YD1 = path.join(
  WORKSPACE,
  "newtry",
  "OC_Mobile",
  "oc318-mobile-reader",
  "public",
  "corpus",
  "yd1"
);

export const DICTIONARY_PATH = path.join(WORKSPACE, "full_dictionary (1).md");

/** Canonical folder order under each `output/siman_NNN/` (agents + checklist). */
export const COMMENTARY_ORDER = [
  { slug: "mechaber", title: "Mechaber + Rema", tier: "primary" },
  { slug: "siftei-kohen", title: "Siftei Kohen (Shach)", tier: "major" },
  { slug: "turei-zahav", title: "Turei Zahav (Taz)", tier: "major" },
  { slug: "baer-heitev", title: "Ba'er Hetev", tier: "standard" },
  { slug: "beer-hagolah", title: "Be'er HaGolah", tier: "standard" },
  { slug: "beur-hagra", title: "Biur HaGRA", tier: "long" },
  { slug: "pitchei-teshuva", title: "Pitchei Teshuva", tier: "standard" },
  { slug: "peleti", title: "Peleti", tier: "standard" },
  { slug: "yad-avraham", title: "Yad Avraham", tier: "standard" },
  { slug: "yad-ephraim", title: "Yad Ephraim", tier: "standard" },
  { slug: "rabbi-akiva-eiger-yd", title: "Rabbi Akiva Eiger (YD)", tier: "standard" },
  { slug: "nekudot-hakesef", title: "Nekudot HaKesef", tier: "standard" },
  { slug: "peri-megadim-yd", title: "Peri Megadim (YD)", tier: "standard" },
  { slug: "kaf-hachayim", title: "Kaf HaChayim (YD)", tier: "standard" },
  { slug: "kereti", title: "Kereti", tier: "standard" },
  { slug: "mateh-yehonatan", title: "Mateh Yehonatan", tier: "optional" },
  { slug: "kol-yaakov", title: "Kol Yaakov", tier: "optional" },
  { slug: "tiferet-yisrael", title: "Tiferet Yisrael", tier: "optional" },
  { slug: "torat-hashlamim", title: "Torat HaShlamim", tier: "optional" },
  { slug: "chiddushei-hilkhot-niddah", title: "Chiddushei Hilkhot Niddah", tier: "optional" },
];

export const COMMENTARY_SLUGS = COMMENTARY_ORDER.map((c) => c.slug);

export function slugSortIndex(slug) {
  const i = COMMENTARY_SLUGS.indexOf(slug);
  return i >= 0 ? i : 999;
}
