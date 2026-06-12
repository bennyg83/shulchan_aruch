IPEX-LLM portable llama.cpp (Intel GPU) for YD quality validation
================================================================

Profiles
  fast      Qwen2.5-3B-Instruct Q4_K_M  (default — validation batch)
  accurate  Qwen3-4B Q4_K_M             (slower, for re-checks)

One-time setup
  cd newtry/YD_001/tools/quality-viewer
  npm run ipex:setup
  npm run ipex:model:fast

Start IPEX server (uses active profile from ipex-config.json)
  npm run ipex:server:ps1

Switch profile
  node ipex/set-profile.mjs fast
  node ipex/set-profile.mjs accurate
  (then restart IPEX server)

Run full YD mechaber + Rema validation
  npm run llm:all

Caches (separate per profile)
  cache/llm-reviewed-fast.jsonl
  cache/llm-reviewed-accurate.jsonl
