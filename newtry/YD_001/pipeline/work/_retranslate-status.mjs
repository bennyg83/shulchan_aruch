#!/usr/bin/env node
/** Tail retranslate batch logs and count OK lines */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const logs = fs.readdirSync(dir).filter((f) => f.startsWith("_retranslate-") && f.endsWith(".log"));
let totalOk = 0;
for (const f of logs.sort()) {
  const text = fs.readFileSync(path.join(dir, f), "utf8");
  const ok = (text.match(/^OK /gm) || []).length;
  const done = text.includes("[DONE]");
  totalOk += ok;
  console.log(`${f}: ${ok} OK${done ? " DONE" : " running..."}`);
}
console.log(`[TOTAL] ${totalOk} blocks retranslated so far`);
