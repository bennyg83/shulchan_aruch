# After 90 minutes: if Yoreh De'ah MT has zero pending blocks, start Choshen Mishpat MT.
# Run from anywhere: powershell -NoProfile -File "...\check-yd-then-start-cm-after-90min.ps1"

$ErrorActionPreference = "Continue"
# PSScriptRoot = ...\newtry\YD_001\pipeline\work → repo root is four levels up
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..\") -ErrorAction SilentlyContinue).Path
if (-not $Root -or -not (Test-Path (Join-Path $Root "newtry\YD_001"))) {
  $Root = "c:\Users\binya\Downloads\Shulchan Aruch"
}

$Log = Join-Path $PSScriptRoot "mt-delayed-90min-check.log"
function Write-Log([string]$Message) {
  $line = "[{0:u}] {1}" -f (Get-Date).ToUniversalTime(), $Message
  Add-Content -Path $Log -Value $line
}

function Get-YdPending {
  Push-Location $Root
  try {
    $ydOut = Join-Path $Root "newtry\YD_001\output"
    $helper = Join-Path $Root "newtry\YD_001\pipeline\work\count-yd-pending-blocks.mjs"
    $n = node $helper $ydOut
    return [int]($n.Trim())
  }
  finally {
    Pop-Location
  }
}

Write-Log "Scheduled check: sleeping 90 minutes before YD pending count..."
Start-Sleep -Seconds (90 * 60)

Write-Log "Wake: counting YD pending blocks..."
$pending = Get-YdPending
Write-Log "YD pending blocks: $pending"

if ($pending -eq 0) {
  Write-Log "YD complete — starting Choshen Mishpat MT (LibreTranslate, log mt-cm001-resume.log)."
  $cm = Join-Path $Root "newtry\CM_001"
  $cmd = "cd /d `"$cm`" && set LIBRE_URL=http://localhost:5000 && node tools\translate-cm001-pending-mymemory.mjs --backend libre --root output --ms 100 --workers 2 --chunk-len 400 >> pipeline\work\mt-cm001-resume.log 2>&1"
  Start-Process -FilePath "cmd.exe" -ArgumentList @("/c", $cmd) -WindowStyle Minimized
  Write-Log "CM MT launched via cmd.exe (minimized)."
}
else {
  Write-Log "YD not finished ($pending blocks left) — not starting CM. Re-run this script or start CM manually when YD is done."
}
