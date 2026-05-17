/**
 * One-off / maintenance: build simanim/001/seif-NNN/translated-sources-manifest.json
 * from OC001 extract manifest (sourceOrder + block counts).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..", "..");
const ocManifest = path.join(ROOT, "newtry", "OC_001", "output", "manifest.json");
const simanDir = path.join(ROOT, "Sefaria Pulls", "shulchan-arukh", "Orach_Chayim", "simanim", "001");

const TITLE = {
  mechaber: "Mechaber + Rema",
  "ateret-zekenim": "Ateret Zekeinim",
  "baer-heitev": "Baer Hetev",
  "beer-hagolah": "Be'er HaGolah",
  "beur-hagra": "Biur HaGRA",
  "biur-halacha": "Biur Halacha",
  "chatam-sofer": "Chatam Sofer",
  "chokhmat-shlomo": "Chokhmat Shlomo",
  "chok-yaakov": "Chok Yaakov",
  "dagul-merevavah": "Dagul Merevavah",
  "eliyah-rabbah": "Eliyah Rabbah",
  "eshel-avraham": "Eshel Avraham",
  "kaf-hachayim": "Kaf HaChayyim",
  "kaf-hachayyim": "Kaf HaChayyim",
  "kol-yaakov": "Kol Yaakov",
  "levushei-serad": "Levushei Serad",
  "machatzit-hashekel": "Machatzit HaShekel",
  "magen-avraham": "Magen Avraham",
  "mishnah-berurah": "Mishnah Berurah",
  "netiv-chayim": "Netiv Chayim",
  "peri-megadim": "Pri Megadim",
  "rabbi-akiva-eiger": "Rabbi Akiva Eiger",
  "shaarei-teshuvah": "Shaarei Teshuvah",
  "turei-zahav": "Turei Zahav (Taz)",
  "yad-ephraim": "Yad Ephraim",
};

const LONG = new Set([
  "beur-hagra",
  "biur-halacha",
  "eliyah-rabbah",
  "mishnah-berurah",
  "kaf-hachayim",
  "kaf-hachayyim",
  "peri-megadim",
]);

function dataKey(slug) {
  return slug.replace(/-/g, "_");
}

const docBase = JSON.parse(fs.readFileSync(ocManifest, "utf8"));
const order = docBase.sourceOrder || [];

const sources = [];
for (const slug of order) {
  const srcEntry = (docBase.sources || []).find((s) => s.slug === slug);
  const blocks = srcEntry?.totalBlocks ?? 0;
  if (blocks === 0) continue;
  /** Sefaria / mobile corpus folders use `kaf-hachayim`; OC001 extract still labels `kaf-hachayyim`. */
  const corpusSlug = slug === "kaf-hachayyim" ? "kaf-hachayim" : slug;
  sources.push({
    slug: corpusSlug,
    title: TITLE[slug] || TITLE[corpusSlug] || slug,
    long: LONG.has(slug) || LONG.has(corpusSlug),
    dataKey: dataKey(corpusSlug),
  });
}

const manifestDoc = {
  schemaVersion: 1,
  siman: 1,
  seif: 1,
  description:
    "Prepared for translation pipeline. Slugs match folder names under this directory; aligned with Sefaria simanim/001 bundles and OC001 extract.",
  sources,
  hookToSlug: {
    "Be'er HaGolah": "beer-hagolah",
    "Turei Zahav": "turei-zahav",
    "Ba'er Hetev": "baer-heitev",
    "Sha'arei Teshuvah": "shaarei-teshuvah",
    "Mishnah Berurah": "mishnah-berurah",
    "Magen Avraham": "magen-avraham",
    "Ateret Zekenim": "ateret-zekenim",
  },
  excludedFromTranslatedReader: [
    {
      slug: "ateret-zekenim",
      reason: "English translation omitted by project policy for this siman.",
    },
    {
      slug: "chok-yaakov",
      reason: "No commentary text in Sefaria bundle for OC siman 1 (seifim 1–9).",
    },
    {
      slug: "kol-yaakov",
      reason: "No commentary text in Sefaria bundle for OC siman 1 (seifim 1–9).",
    },
  ],
};

const pad = (n) => String(n).padStart(3, "0");
for (let seif = 1; seif <= 9; seif++) {
  const doc = { ...manifestDoc, seif };
  const out = path.join(simanDir, `seif-${pad(seif)}`, "translated-sources-manifest.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(doc, null, 2) + "\n", "utf8");
  console.log("Wrote", path.relative(ROOT, out));
}
