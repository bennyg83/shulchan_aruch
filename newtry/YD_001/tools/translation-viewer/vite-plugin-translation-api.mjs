import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_ROOT = path.resolve(__dirname, "../../output");

const GARBAGE_PATTERNS = [
  /Lord's Prayer/i,
  /Capernaum/i,
  /Hashem's (Word|people|promise|covenant|glory)/i,
  /Magen Abraham/i,
  /on Saturday/i,
  /baptism/i,
  /Dalai Lama/i,
  /Dambigail/i,
  /Agrater/i,
  /\bquaint\b/i,
  /penis/i,
  /\bthis bitch\b/i,
  /cowboy/i,
  /Lord's covenant/i,
  /Holy Qur'an/i,
  /(\. ){6,}/,
  /[A-Z]\.[A-Z]\.[A-Z]\.[A-Z]\.[A-Z]\./,
];

function isGarbage(text) {
  return GARBAGE_PATTERNS.some((p) => p.test(text));
}

function parseBlocks(txt) {
  const blocks = [];
  const parts = txt.split("**** YD001 SOURCE BLOCK ****");
  for (const part of parts.slice(1)) {
    const slug = (part.match(/^[\s\S]*?slug:\s*(\S+)/) || [])[1] || "";
    const seif = (part.match(/seif:\s*(\S+)/) || [])[1] || "";
    const marker = (part.match(/marker:\s*(\S+)/) || [])[1] || "_";
    const heMatch = part.match(/\*\*\*\* HEBREW \*\*\*\*([\s\S]*?)\*\*\*\* ENGLISH \*\*\*\*/);
    const enMatch = part.match(/\*\*\*\* ENGLISH \*\*\*\*([\s\S]*?)\*\*\*\* END BLOCK \*\*\*\*/);
    if (!heMatch || !enMatch) continue;
    const hebrew = heMatch[1].trim();
    const english = enMatch[1].trim();
    blocks.push({ slug, seif, marker, hebrew, english, garbage: isGarbage(english) });
  }
  return blocks;
}

const COMMENTARY_ORDER = [
  "mechaber","rama","tur","beit-yosef","darkei-moshe","turei-zahav","magen-avraham",
  "siftei-kohen","bach","beur-hagra","peri-megadim","mishna-berurah","biur-halacha",
  "shulchan-aruch-kpeshuta","chayei-adam","beer-hagolah","baer-heitev","nekudot-hakesef",
  "pitchei-teshuva","rabbi-akiva-eiger-yd","yad-avraham","chokhmat-adam",
];

function commentaryRank(slug) {
  const i = COMMENTARY_ORDER.indexOf(slug);
  return i === -1 ? 99 : i;
}

function scanSiman(num) {
  const dir = path.join(OUTPUT_ROOT, `siman_${String(num).padStart(3, "0")}`);
  if (!fs.existsSync(dir)) return null;
  const commentaries = [];
  let totalBlocks = 0;
  let garbageBlocks = 0;
  for (const sub of fs.readdirSync(dir).sort()) {
    const subDir = path.join(dir, sub);
    if (!fs.statSync(subDir).isDirectory()) continue;
    const partFile = path.join(subDir, "part-001.txt");
    if (!fs.existsSync(partFile)) continue;
    const txt = fs.readFileSync(partFile, "utf8");
    const blocks = parseBlocks(txt);
    const gc = blocks.filter((b) => b.garbage).length;
    totalBlocks += blocks.length;
    garbageBlocks += gc;
    commentaries.push({ slug: sub, blocks, garbageBlocks: gc });
  }
  commentaries.sort((a, b) => commentaryRank(a.slug) - commentaryRank(b.slug));
  return { siman: num, totalBlocks, garbageBlocks, commentaries };
}

function listSimanim() {
  if (!fs.existsSync(OUTPUT_ROOT)) return [];
  const entries = fs.readdirSync(OUTPUT_ROOT)
    .filter((d) => /^siman_\d+$/.test(d))
    .sort();
  return entries.map((d) => {
    const num = parseInt(d.replace("siman_", ""), 10);
    const dir = path.join(OUTPUT_ROOT, d);
    let totalBlocks = 0, garbageBlocks = 0;
    for (const sub of fs.readdirSync(dir)) {
      const partFile = path.join(dir, sub, "part-001.txt");
      if (!fs.existsSync(partFile)) continue;
      const txt = fs.readFileSync(partFile, "utf8");
      const blocks = parseBlocks(txt);
      totalBlocks += blocks.length;
      garbageBlocks += blocks.filter((b) => b.garbage).length;
    }
    return { siman: num, totalBlocks, garbageBlocks, clean: garbageBlocks === 0 };
  });
}

export function translationApiPlugin() {
  let devServer = null;
  let debounce;

  function broadcast(siman) {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const data = scanSiman(siman);
      devServer?.hot.send({ type: "custom", event: "siman-update", data: { siman, data } });
      // also push updated index entry
      const idx = listSimanim().find((s) => s.siman === siman);
      devServer?.hot.send({ type: "custom", event: "index-update", data: idx });
    }, 300);
  }

  return {
    name: "yd001-translation-api",
    configureServer(server) {
      devServer = server;

      // watch output directory for txt changes
      const chokidar = server.watcher;
      chokidar.add(OUTPUT_ROOT);
      chokidar.on("change", (filePath) => {
        if (!filePath.endsWith(".txt")) return;
        const m = filePath.match(/siman_(\d+)/);
        if (m) broadcast(parseInt(m[1], 10));
      });

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        try {
          const url = new URL(req.url, "http://localhost");
          if (url.pathname === "/api/index") {
            res.end(JSON.stringify(listSimanim()));
          } else if (url.pathname === "/api/siman") {
            const num = parseInt(url.searchParams.get("n") || "0", 10);
            res.end(JSON.stringify(scanSiman(num)));
          } else {
            next();
          }
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(e?.message || e) }));
        }
      });
    },
  };
}
