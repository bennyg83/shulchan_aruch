/**
 * Rebuild Orach Chayim from Sefaria merged.json files:
 * - One folder per siman: ../simanim/NNN/
 * - One JSON per seif: seif-SSS.json (mechaber HTML + extracted hooks + commentary slices)
 *
 * Run from this directory:
 *   node tools/rebuild-by-siman.mjs
 *   node tools/rebuild-by-siman.mjs --siman 1   # only simanim/001/seif-*.json + meta (needs existing _index.json)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const MECHABER = path.join(OC_ROOT, "mechaber", "merged.json");
const COMMENTARIES_DIR = path.join(OC_ROOT, "commentaries");
const OUT_ROOT = path.join(OC_ROOT, "simanim");

/** Pull main text grid from Sefaria merged shape (array or object with ""). */
function extractTextGrid(parsed) {
  const t = parsed?.text;
  if (!t) return null;
  if (Array.isArray(t)) return t;
  if (typeof t === "object" && Array.isArray(t[""])) return t[""];
  const keys = Object.keys(t).filter((k) => Array.isArray(t[k]));
  if (!keys.length) return null;
  const longest = keys.reduce((best, k) => {
    const a = t[k];
    const score = Array.isArray(a) ? a.length : 0;
    return score > best.score ? { key: k, score } : best;
  }, { key: keys[0], score: 0 });
  return t[longest.key] ?? null;
}

/** Normalize one "seif" cell: string, or array of strings (e.g. Biur HaGra), or nested arrays. */
function normalizeSeifCell(cell) {
  if (cell == null) return null;
  if (typeof cell === "string") return { kind: "html", html: cell };
  if (Array.isArray(cell)) {
    const flat = cell.map((x) => (typeof x === "string" ? x : JSON.stringify(x)));
    if (flat.length === 1) return { kind: "html", html: flat[0] };
    return { kind: "segments", segments: flat };
  }
  return { kind: "raw", value: cell };
}

const HOOK_RE = /<i\s+([^>]+?)\s*><\/i>/gi;

function parseDataAttrs(inner) {
  const attrs = {};
  const re = /([\w-]+)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(inner)) !== null) {
    attrs[m[1]] = m[2];
  }
  const loose = /([\w-]+)\s*=\s*([^\s>]+)/g;
  while ((m = loose.exec(inner)) !== null) {
    if (!attrs[m[1]]) attrs[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return attrs;
}

function extractHooks(html) {
  if (!html || typeof html !== "string") return [];
  const hooks = [];
  let m;
  const s = html;
  HOOK_RE.lastIndex = 0;
  while ((m = HOOK_RE.exec(s)) !== null) {
    const inner = m[1].trim();
    const attrs = parseDataAttrs(inner);
    let commentator = attrs["data-commentator"] ?? attrs.commentator ?? null;
    if (commentator === "Mishnah" && /Mishnah\s+Berurah/i.test(inner)) {
      commentator = "Mishnah Berurah";
    }
    hooks.push({
      commentator,
      label: attrs["data-label"] ?? attrs.label ?? null,
      order: attrs["data-order"] ?? attrs.order ?? null,
      raw: inner,
    });
  }
  return hooks;
}

/** Strip " on Shulchan …" suffix so merged.json titles match hook data-commentator strings */
function commentaryShortName(fullTitle) {
  const s = String(fullTitle ?? "");
  const i = s.search(/\s+on\s+/i);
  if (i === -1) return s.trim();
  return s.slice(0, i).trim();
}

/** Count inline mechaber hooks belonging to this commentary (used when grid rows are note-based, not seif-aligned). */
function countHooksForCommentary(mechHtml, commentaryTitle) {
  const want = commentaryShortName(commentaryTitle);
  if (!want) return 0;
  let n = 0;
  for (const h of extractHooks(mechHtml)) {
    const hc = h.commentator;
    if (!hc) continue;
    if (hc === want || commentaryTitle.startsWith(hc)) n++;
  }
  return n;
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function padSim(n) {
  return String(n).padStart(3, "0");
}

function padSeif(n) {
  return String(n).padStart(3, "0");
}

/** Optional `--siman N`: rebuild only that siman folder (does not rewrite other simanim or full _index.simanim). */
function parseOnlySimanArg(mechaberGridLength) {
  let onlySiman = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) onlySiman = Number(a[++i]);
  }
  if (onlySiman != null) {
    if (!Number.isFinite(onlySiman) || onlySiman < 1) {
      console.error("Invalid --siman (expect positive integer)");
      process.exit(1);
    }
    if (onlySiman > mechaberGridLength) {
      console.error("--siman out of range (max", mechaberGridLength, ")");
      process.exit(1);
    }
  }
  return onlySiman;
}

function main() {
  if (!fs.existsSync(MECHABER)) {
    console.error("Missing:", MECHABER);
    process.exit(1);
  }

  const mechaberDoc = loadJson(MECHABER);
  const mechaberGrid = extractTextGrid(mechaberDoc);
  if (!mechaberGrid || !Array.isArray(mechaberGrid)) {
    console.error("Could not parse mechaber text grid");
    process.exit(1);
  }

  const onlySiman = parseOnlySimanArg(mechaberGrid.length);

  const commentaryFiles = fs
    .readdirSync(COMMENTARIES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(COMMENTARIES_DIR, d.name, "merged.json"))
    .filter((p) => fs.existsSync(p));

  const commentaryData = [];
  for (const fp of commentaryFiles) {
    try {
      const doc = loadJson(fp);
      const grid = extractTextGrid(doc);
      commentaryData.push({
        path: fp,
        folder: path.basename(path.dirname(fp)),
        title: doc.title ?? path.basename(path.dirname(fp)),
        grid,
      });
    } catch (e) {
      console.warn("Skip (parse error):", fp, e.message);
    }
  }

  const simanCount = mechaberGrid.length;
  const index = {
    schemaVersion: 1,
    sefer: "Orach_Chayim",
    source: "Sefaria merged.json (Hebrew only)",
    siman_count: simanCount,
    commentaries: commentaryData.map((c) => ({ title: c.title, folder: c.folder })),
    simanim: [],
  };

  fs.mkdirSync(OUT_ROOT, { recursive: true });
  /** Remove prior bundle JSON only (not `seif-NNN/` export dirs) so rebuild works while dev servers have folders open */
  if (fs.existsSync(OUT_ROOT)) {
    const clearSeifJsonInDir = (simPath) => {
      if (!fs.existsSync(simPath)) return;
      for (const f of fs.readdirSync(simPath)) {
        if (/^seif-\d{3}\.json$/.test(f)) {
          try {
            fs.unlinkSync(path.join(simPath, f));
          } catch (_) {
            /* ignore */
          }
        }
      }
    };
    if (onlySiman != null) {
      clearSeifJsonInDir(path.join(OUT_ROOT, padSim(onlySiman)));
    } else {
      for (const ent of fs.readdirSync(OUT_ROOT, { withFileTypes: true })) {
        if (!ent.isDirectory()) continue;
        clearSeifJsonInDir(path.join(OUT_ROOT, ent.name));
      }
    }
  }

  const siFrom = onlySiman != null ? onlySiman - 1 : 0;
  const siTo = onlySiman != null ? onlySiman : simanCount;

  for (let si = siFrom; si < siTo; si++) {
    const simanNum = si + 1;
    const simDir = path.join(OUT_ROOT, padSim(simanNum));
    fs.mkdirSync(simDir, { recursive: true });

    const mechaberSeifim = mechaberGrid[si];
    const seifCount = Array.isArray(mechaberSeifim) ? mechaberSeifim.length : 0;
    if (onlySiman == null) index.simanim.push({ siman: simanNum, seif_count: seifCount });

    /** Per-commentary cursor into merged grid row when using hook-based merge */
    const commentaryCursor = Object.fromEntries(commentaryData.map((c) => [c.folder, 0]));

    /** Sum of inline hooks per commentary across all seifim in this siman (validates hook→segment pairing). */
    const hookSumByFolder = {};
    for (const c of commentaryData) {
      const row = c.grid?.[si];
      if (!row || !Array.isArray(row)) {
        hookSumByFolder[c.folder] = 0;
        continue;
      }
      let sum = 0;
      for (let k = 0; k < seifCount; k++) {
        const mh =
          typeof mechaberSeifim[k] === "string"
            ? mechaberSeifim[k]
            : Array.isArray(mechaberSeifim[k])
              ? mechaberSeifim[k].join("\n")
              : String(mechaberSeifim[k] ?? "");
        sum += countHooksForCommentary(mh, c.title);
      }
      hookSumByFolder[c.folder] = sum;
    }

    for (let ej = 0; ej < seifCount; ej++) {
      const seifNum = ej + 1;
      const mechHtml =
        typeof mechaberSeifim[ej] === "string"
          ? mechaberSeifim[ej]
          : Array.isArray(mechaberSeifim[ej])
            ? mechaberSeifim[ej].join("\n")
            : String(mechaberSeifim[ej] ?? "");

      const layers = {
        mechaber: {
          title: mechaberDoc.heTitle ?? mechaberDoc.title ?? "Mechaber",
          ...normalizeSeifCell(mechaberSeifim[ej]),
        },
      };

      for (const c of commentaryData) {
        const key = c.title;
        const row = c.grid && Array.isArray(c.grid[si]) ? c.grid[si] : null;
        let cell = null;

        if (!row) {
          layers[key] = null;
          continue;
        }

        const aligned = row.length === seifCount;
        const hookSum = hookSumByFolder[c.folder];
        const useHookMerge =
          !aligned && hookSum === row.length && hookSum > 0;

        if (aligned) {
          cell = row[ej];
        } else if (useHookMerge) {
          const n = countHooksForCommentary(mechHtml, c.title);
          const start = commentaryCursor[c.folder];
          const slice = row.slice(start, start + n);
          commentaryCursor[c.folder] += n;
          if (slice.length === 0) cell = null;
          else if (slice.length === 1) cell = slice[0];
          else cell = slice;
        } else {
          cell = ej < row.length ? row[ej] : null;
        }

        if (cell == null || cell === "") {
          layers[key] = null;
        } else {
          layers[key] = {
            title: c.title,
            source_folder: c.folder,
            ...normalizeSeifCell(cell),
          };
        }
      }

      const bundle = {
        schemaVersion: 1,
        siman: simanNum,
        seif: seifNum,
        hooks: extractHooks(mechHtml),
        layers,
      };

      fs.writeFileSync(
        path.join(simDir, `seif-${padSeif(seifNum)}.json`),
        JSON.stringify(bundle, null, 2),
        "utf8"
      );
    }

    for (const c of commentaryData) {
      const row = c.grid && Array.isArray(c.grid[si]) ? c.grid[si] : null;
      if (!row || row.length === seifCount) continue;
      const hookSum = hookSumByFolder[c.folder];
      const useHookMerge = hookSum === row.length && hookSum > 0;
      if (!useHookMerge) continue;
      const cur = commentaryCursor[c.folder];
      if (cur !== row.length) {
        console.warn(
          `Siman ${simanNum} · ${c.folder}: hook-merge consumed ${cur} segments, merged row length ${row.length}`
        );
      }
    }

    fs.writeFileSync(
      path.join(simDir, "meta.json"),
      JSON.stringify(
        {
          siman: simanNum,
          seif_count: seifCount,
          commentary_titles: commentaryData.map((c) => c.title),
        },
        null,
        2
      ),
      "utf8"
    );
  }

  const indexPath = path.join(OUT_ROOT, "_index.json");
  if (onlySiman != null) {
    if (!fs.existsSync(indexPath)) {
      console.error("Scoped rebuild (--siman) needs an existing _index.json. Run a full rebuild once without --siman.");
      process.exit(1);
    }
    const idx = loadJson(indexPath);
    const i = onlySiman - 1;
    if (!Array.isArray(idx.simanim) || i >= idx.simanim.length) {
      console.error("_index.json simanim array missing or too short for --siman", onlySiman);
      process.exit(1);
    }
    const meta = loadJson(path.join(OUT_ROOT, padSim(onlySiman), "meta.json"));
    idx.simanim[i] = { siman: onlySiman, seif_count: meta.seif_count };
    fs.writeFileSync(indexPath, JSON.stringify(idx, null, 2), "utf8");
    console.log("Updated _index.json entry for siman", onlySiman);
    console.log("Rebuilt siman folder", padSim(onlySiman), "under", OUT_ROOT);
  } else {
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), "utf8");
    console.log("Wrote", simanCount, "siman folders under", OUT_ROOT);
  }
  console.log("Commentaries merged:", commentaryData.length);
}

main();
