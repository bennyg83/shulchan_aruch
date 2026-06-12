$ErrorActionPreference = "Stop"
$IpexRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RuntimeDir = Join-Path $IpexRoot "runtime"

function Find-LlamaServer([string]$Dir) {
    $direct = Join-Path $Dir "llama-server.exe"
    if (Test-Path $direct) { return $direct }
    foreach ($child in Get-ChildItem $Dir -Directory) {
        $found = Find-LlamaServer $child.FullName
        if ($found) { return $found }
    }
    return $null
}

$ProfileJson = node (Join-Path $IpexRoot "lib\print-active-profile.mjs")
$Cfg = $ProfileJson | ConvertFrom-Json

$LlamaServer = Find-LlamaServer $RuntimeDir
if (-not $LlamaServer) {
    Write-Host "IPEX runtime not found. Run setup first:" -ForegroundColor Red
    Write-Host "  node ipex/setup-ipex.mjs"
    exit 1
}

if (-not (Test-Path $Cfg.modelPath)) {
    Write-Host "Model not found for profile '$($Cfg.name)':" -ForegroundColor Red
    Write-Host "  $($Cfg.modelPath)"
    if ($Cfg.name -eq "fast") {
        Write-Host "Run: node ipex/setup-fast-model.mjs"
    }
    exit 1
}

$env:ONEAPI_DEVICE_SELECTOR = "level_zero:0"
$env:SYCL_PI_LEVEL_ZERO_USE_IMMEDIATE_COMMANDLISTS = "1"
$env:SYCL_CACHE_PERSISTENT = "1"

Write-Host "Starting IPEX llama-server (Intel GPU)..." -ForegroundColor Cyan
Write-Host "Profile: $($Cfg.name) - $($Cfg.label)"
Write-Host "Binary:  $LlamaServer"
Write-Host "Model:   $($Cfg.modelPath)"
Write-Host "Port:    $($Cfg.port)"
Write-Host "Context: $($Cfg.contextSize)  GPU layers: $($Cfg.gpuLayers)"
Write-Host ""
Write-Host "OpenAI API: http://127.0.0.1:$($Cfg.port)/v1/chat/completions"
Write-Host ""

Set-Location (Split-Path -Parent $LlamaServer)
& $LlamaServer `
  -m $Cfg.modelPath `
  -c $Cfg.contextSize `
  -b $Cfg.batchSize `
  -ub $Cfg.ubatchSize `
  -ngl $Cfg.gpuLayers `
  -t $Cfg.threads `
  --parallel $Cfg.parallel `
  --port $Cfg.port `
  --host 127.0.0.1
