/**
 * gen-icons.mjs
 *
 * Generates PWA icons from scripts/icon-source.svg.
 * Requires: npm install -D sharp
 * Run:  node scripts/gen-icons.mjs
 *
 * Output files (written to public/):
 *   icon-192.png        — Android home screen
 *   icon-512.png        — Android splash / maskable
 *   apple-touch-icon.png — iOS home screen (180x180)
 *   favicon.ico         — Browser tab (32x32)
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const SVG_PATH = join(__dirname, "icon-source.svg");
const PUBLIC_DIR = join(__dirname, "..", "public");

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "sharp not found. Run:  npm install -D sharp\nThen re-run this script."
    );
    process.exit(1);
  }

  const svgBuf = await readFile(SVG_PATH);

  const sizes = [
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
    { file: "apple-touch-icon.png", size: 180 },
  ];

  for (const { file, size } of sizes) {
    const out = join(PUBLIC_DIR, file);
    await sharp(svgBuf).resize(size, size).png().toFile(out);
    console.log(`  ✓  ${file} (${size}×${size})`);
  }

  // 32×32 favicon.ico (single-size ICO via PNG rename — most browsers accept PNG as .ico)
  const faviconOut = join(PUBLIC_DIR, "favicon.ico");
  await sharp(svgBuf).resize(32, 32).png().toFile(faviconOut);
  console.log("  ✓  favicon.ico (32×32)");

  // Copy SVG as favicon.svg too
  await writeFile(join(PUBLIC_DIR, "favicon.svg"), svgBuf);
  console.log("  ✓  favicon.svg");

  console.log("\nIcons written to public/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
