# Start local LibreTranslate for OC001 and set env vars for this PowerShell session.
# Requires Docker Desktop running (Linux engine).

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$dockerOk = $false
try {
    docker info 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { $dockerOk = $true }
} catch {}

if (-not $dockerOk) {
    Write-Host "Docker engine is not running." -ForegroundColor Yellow
    Write-Host "Start Docker Desktop, wait until it says Running, then run this script again."
    Write-Host ('  Or: npm run libre:up   (from ' + $Root + ')')
    exit 1
}

Write-Host 'Starting LibreTranslate (en/he only) - first run may take several minutes...'
docker compose -f docker/libretranslate/docker-compose.yml up -d
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$env:LIBRE_URL = "http://localhost:5000"
$env:OC001_MT_CHAIN = "google,mymemory,lingva,libre"

Write-Host ""
Write-Host "Session env set:" -ForegroundColor Green
Write-Host ('  LIBRE_URL=' + $env:LIBRE_URL)
Write-Host ('  OC001_MT_CHAIN=' + $env:OC001_MT_CHAIN)
Write-Host ""
Write-Host 'Wait for models, then:  npm run libre:test'
Write-Host 'Translate:              npm run translate:placeholders:libre -- --root output/siman_308'
Write-Host 'Logs:                   npm run libre:logs'
