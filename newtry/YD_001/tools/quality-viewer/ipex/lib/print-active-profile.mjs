import { getActiveProfile } from "./ipex-config.mjs";

const p = getActiveProfile();
console.log(JSON.stringify(p));
