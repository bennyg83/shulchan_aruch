import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const IPEX_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const VIEWER_ROOT = path.dirname(IPEX_ROOT);
const CFG_PATH = path.join(IPEX_ROOT, "ipex-config.json");
const LLM_CFG_PATH = path.join(VIEWER_ROOT, "llm-config.json");

export function loadIpexConfig() {
  return JSON.parse(fs.readFileSync(CFG_PATH, "utf8"));
}

export function getActiveProfileName(cfg = loadIpexConfig()) {
  return cfg.activeProfile || "fast";
}

export function getProfile(name, cfg = loadIpexConfig()) {
  const profileName = name || getActiveProfileName(cfg);
  const profile = cfg.profiles?.[profileName];
  if (!profile) throw new Error(`Unknown IPEX profile: ${profileName}`);
  return {
    name: profileName,
    label: profile.label,
    modelPath: profile.modelPath,
    downloadUrl: profile.downloadUrl,
    contextSize: profile.contextSize ?? cfg.contextSize,
    batchSize: profile.batchSize ?? cfg.batchSize,
    ubatchSize: profile.ubatchSize ?? cfg.ubatchSize,
    gpuLayers: profile.gpuLayers ?? cfg.gpuLayers,
    threads: profile.threads ?? cfg.threads,
    parallel: profile.parallel ?? cfg.parallel,
    port: cfg.port,
  };
}

export function getActiveProfile() {
  return getProfile(getActiveProfileName());
}

export function setActiveProfile(name) {
  const cfg = loadIpexConfig();
  if (!cfg.profiles?.[name]) {
    throw new Error(`Unknown profile "${name}". Available: ${Object.keys(cfg.profiles || {}).join(", ")}`);
  }
  cfg.activeProfile = name;
  fs.writeFileSync(CFG_PATH, JSON.stringify(cfg, null, 2) + "\n", "utf8");

  const llmCfg = JSON.parse(fs.readFileSync(LLM_CFG_PATH, "utf8"));
  llmCfg.active_profile = name;
  const profileLlm = llmCfg.profiles?.[name];
  if (profileLlm) {
    llmCfg.cache_file = profileLlm.cache_file;
    llmCfg.disable_thinking = profileLlm.disable_thinking;
    llmCfg.timeout_seconds = profileLlm.timeout_seconds;
    llmCfg.max_tokens = profileLlm.max_tokens ?? llmCfg.max_tokens;
  }
  fs.writeFileSync(LLM_CFG_PATH, JSON.stringify(llmCfg, null, 2) + "\n", "utf8");
  return name;
}
