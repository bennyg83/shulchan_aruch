/**
 * Downloads Sefaria Export merged Hebrew JSON for Shulchan Arukh (and HaRav).
 * Mechaber files keep full HTML strings, including inline <i data-commentator="..."> hooks.
 *
 * Run: node download_shulchan_arukh_export.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname);
const BOOKS_URL =
  "https://raw.githubusercontent.com/Sefaria/Sefaria-Export/master/books.json";

const SA_DIR = path.join(ROOT, "shulchan-arukh");
const HARAV_DIR = path.join(ROOT, "shulchan-arukh-harav");

const MECHABER_TITLES = new Set([
  "Shulchan Arukh, Orach Chayim",
  "Shulchan Arukh, Yoreh De'ah",
  "Shulchan Arukh, Even HaEzer",
  "Shulchan Arukh, Choshen Mishpat",
  "Shulchan Arukh, Introduction",
]);

const TITLE_TO_SEFER = {
  "Shulchan Arukh, Orach Chayim": "Orach_Chayim",
  "Shulchan Arukh, Yoreh De'ah": "Yoreh_Deah",
  "Shulchan Arukh, Even HaEzer": "Even_HaEzer",
  "Shulchan Arukh, Choshen Mishpat": "Choshen_Mishpat",
  "Shulchan Arukh, Introduction": "Introduction",
};

const TUR_REGEX =
  /Orach Chayim|Orach Chaim|Yoreh De'ah|Yoreh Deah|Even HaEzer|Choshen Mishpat/i;

/** @type {Record<string, string[]>} */
const COMMENTARY_TUR_FALLBACK = {
  "Beit Shmuel": ["Even_HaEzer"],
  "Biur Halacha": ["Orach_Chayim"],
  "Chelkat Mechokek": ["Choshen_Mishpat"],
  "Kol Yaakov on Shulchan Arukh": ["Orach_Chayim", "Yoreh_Deah"],
  "Magen Avraham": ["Orach_Chayim"],
  "Mishnah Berurah": ["Orach_Chayim"],
  "Urim VeTumim, Tumim": ["Choshen_Mishpat"],
  "Urim VeTumim, Urim": ["Choshen_Mishpat"],
};

function slug(s) {
  return String(s)
    .replace(/[<>:"/\\|?*]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

/** @param {string} title */
function resolveSeferFolders(title) {
  const folders = new Set();
  const t = title || "";
  if (/Orach Chayim|Orach Chaim/i.test(t)) folders.add("Orach_Chayim");
  if (/Yoreh De'ah|Yoreh Deah/i.test(t)) folders.add("Yoreh_Deah");
  if (/Even HaEzer/i.test(t)) folders.add("Even_HaEzer");
  if (/Choshen Mishpat/i.test(t)) folders.add("Choshen_Mishpat");
  if (folders.size) return [...folders];
  if (COMMENTARY_TUR_FALLBACK[title]) return [...COMMENTARY_TUR_FALLBACK[title]];
  return ["_unclassified"];
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": "download_shulchan_arukh_export/1" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} ${url}`);
  return res.json();
}

async function downloadBinary(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": "download_shulchan_arukh_export/1" } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} ${url}`);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function main() {
  const catalog = await fetchJson(BOOKS_URL);
  const books = catalog.books || [];
  const rows = books.filter(
    (b) => b.language === "Hebrew" && b.versionTitle === "merged" && b.json_url
  );

  const tasks = [];

  for (const b of rows) {
    const cats = b.categories || [];
    const title = b.title || "";

    if (cats.includes("Shulchan Arukh HaRav")) {
      const dir = path.join(HARAV_DIR, slug(title));
      tasks.push({
        label: `HaRav: ${title}`,
        dest: path.join(dir, "merged.json"),
        url: b.json_url,
      });
      continue;
    }

    if (!cats.includes("Shulchan Arukh")) continue;

    if (MECHABER_TITLES.has(title)) {
      const sefer = TITLE_TO_SEFER[title];
      const dest = path.join(SA_DIR, sefer, "mechaber", "merged.json");
      tasks.push({ label: `Mechaber: ${title}`, dest, url: b.json_url });
      continue;
    }

    if (!cats.includes("Commentary") && title !== "Peri Megadim on Orach Chayim") {
      continue;
    }

    const sefers = resolveSeferFolders(title);
    const cslug = slug(title);
    for (const sefer of sefers) {
      const dest = path.join(SA_DIR, sefer, "commentaries", cslug, "merged.json");
      tasks.push({ label: `${title} -> ${sefer}`, dest, url: b.json_url });
    }
  }

  await fs.mkdir(SA_DIR, { recursive: true });
  await fs.mkdir(HARAV_DIR, { recursive: true });

  let ok = 0;
  let fail = 0;
  for (const t of tasks) {
    try {
      await downloadBinary(t.url, t.dest);
      ok++;
      console.log("OK", t.label);
    } catch (e) {
      fail++;
      console.error("FAIL", t.label, String(e && e.message ? e.message : e));
    }
  }

  console.log(`\nDone. ${ok} saved, ${fail} failed. Root: ${ROOT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
