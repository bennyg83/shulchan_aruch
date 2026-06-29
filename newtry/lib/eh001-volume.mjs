/**
 * EH001 volume constants — single source for paths, siman range, commentary order.
 */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const WORKSPACE = path.resolve(__dirname, "..", "..");

export const VOLUME = "EH";
export const VOLUME_LABEL = "Even HaEzer";
export const SIMAN_MIN = 1;
export const SIMAN_MAX = 178;
export const BLOCK_START = "**** EH001 SOURCE BLOCK ****";
export const PROJECT_ID = "EH001";

export const EH001_ROOT = path.join(WORKSPACE, "newtry", "EH_001");
export const EH001_OUTPUT = path.join(EH001_ROOT, "output");
export const EH001_PIPELINE_WORK = path.join(EH001_ROOT, "pipeline", "work");

export const PUBLIC_CORPUS_EH1 = path.join(
  WORKSPACE,
  "newtry",
  "OC_Mobile",
  "oc318-mobile-reader",
  "public",
  "corpus",
  "eh1"
);

/** Canonical folder order under each `output/siman_NNN/` (agents + publish). */
export const COMMENTARY_ORDER = [
  { slug: "mechaber", title: "Mechaber + Rema", tier: "primary" },
  { slug: "beit-shmuel", title: "Beit Shmuel", tier: "major" },
  { slug: "turei-zahav", title: "Turei Zahav (Taz)", tier: "major" },
  { slug: "baer-hetev", title: "Ba'er Hetev", tier: "standard" },
  { slug: "beer-hagolah", title: "Be'er HaGolah", tier: "standard" },
  { slug: "beur-hagra", title: "Biur HaGRA", tier: "long" },
  { slug: "pitchei-teshuva", title: "Pitchei Teshuva", tier: "standard" },
  { slug: "rabbi-akiva-eiger", title: "Rabbi Akiva Eiger (EH)", tier: "standard" },
  { slug: "ezer-mikodesh", title: "Ezer MiKodesh", tier: "standard" },
  { slug: "beit-meir", title: "Beit Meir", tier: "standard" },
  { slug: "chokhmat-shlomo", title: "Chokhmat Shlomo", tier: "standard" },
];

export const COMMENTARY_SLUGS = COMMENTARY_ORDER.map((c) => c.slug);

export function slugSortIndex(slug) {
  const i = COMMENTARY_SLUGS.indexOf(slug);
  return i >= 0 ? i : 999;
}
