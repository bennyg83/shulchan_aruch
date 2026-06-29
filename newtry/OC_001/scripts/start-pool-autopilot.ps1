# OC001 pool autopilot (Ollama on slave laptop)
$env:OC001_POOL_BACKEND = "ollama"
$env:OC001_OLLAMA_URL = "http://10.100.102.14:11434"
$env:OC001_OLLAMA_MODEL_TRANSLATE = "qwen2.5:14b-instruct"
Set-Location $PSScriptRoot\..
node pipeline/pool-autopilot.mjs
