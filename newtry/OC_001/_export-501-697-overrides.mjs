#!/usr/bin/env node
/** Write _siman501-697-stragglers-overrides.mjs from manual OVERRIDES */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const OC_ROOT = path.dirname(fileURLToPath(import.meta.url));
const { OVERRIDES } = await import("./_build-overrides-and-apply.mjs");
const { CHOKHMAT_SHLOMO_4 } = await import("./pipeline/chokhmat-shlomo-696-en.mjs");

const all = { ...OVERRIDES };
all["696|chokhmat-shlomo|4|_"] = CHOKHMAT_SHLOMO_4;

const outPath = path.join(OC_ROOT, "_siman501-697-stragglers-overrides.mjs");
const body = `/** Manual overrides — simanim 501–697 editorial stragglers */\nexport const OVERRIDES = ${JSON.stringify(all, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
console.log("Wrote", Object.keys(all).length, "overrides to", outPath);
