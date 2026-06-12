#!/usr/bin/env node
/**
 * Switch active IPEX + LLM validation profile.
 *   node ipex/set-profile.mjs fast
 *   node ipex/set-profile.mjs accurate
 */
import { getActiveProfile, getProfile, setActiveProfile } from "./lib/ipex-config.mjs";

const name = process.argv[2];
if (!name || name.startsWith("-")) {
  console.error("Usage: node ipex/set-profile.mjs <fast|accurate>");
  process.exit(1);
}

setActiveProfile(name);
const p = getProfile(name);
console.log(`[OK] Active profile: ${name} (${p.label})`);
console.log("  model:", p.modelPath);
console.log("");
console.log("Restart IPEX server, then re-run validation:");
console.log("  npm run ipex:server:ps1");
console.log("  npm run llm:all");
