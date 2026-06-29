#!/usr/bin/env node
/** Build _slot13-manual-en-506-515.mjs from pipeline/slot13-manual-506-515.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "slot13-manual-506-515.json"), "utf8")
);
const out = `/** worker-slot-13 manual EN simanim 506-515 */\nexport const MANUAL = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "_slot13-manual-en-506-515.mjs"), out, "utf8");
console.log("wrote _slot13-manual-en-506-515.mjs");
