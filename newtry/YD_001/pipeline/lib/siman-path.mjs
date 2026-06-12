import path from "path";

/** YD001 output folders use zero-padded siman numbers: siman_001, siman_128, … */
export function simanOutputDir(outRoot, siman) {
  return path.join(outRoot, `siman_${String(siman).padStart(3, "0")}`);
}
