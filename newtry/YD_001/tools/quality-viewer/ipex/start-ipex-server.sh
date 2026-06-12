#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
RUNTIME="$ROOT/runtime"
SERVER=$(find "$RUNTIME" -name 'llama-server.exe' 2>/dev/null | head -n1 || true)

if [[ -z "$SERVER" ]]; then
  echo "[ERROR] IPEX runtime missing. Run: node ipex/setup-ipex.mjs" >&2
  exit 1
fi

eval "$(node "$ROOT/lib/print-active-profile.mjs" | node -e "
const p=JSON.parse(require('fs').readFileSync(0,'utf8'));
console.log('PROFILE='+JSON.stringify(p.name));
console.log('LABEL='+JSON.stringify(p.label));
console.log('MODEL='+JSON.stringify(p.modelPath));
console.log('PORT='+p.port);
console.log('CTX='+p.contextSize);
console.log('BATCH='+p.batchSize);
console.log('UBATCH='+p.ubatchSize);
console.log('NGL='+p.gpuLayers);
console.log('THREADS='+p.threads);
console.log('PAR='+p.parallel);
")"

if [[ ! -f "$MODEL" ]]; then
  echo "[ERROR] Model not found for profile $PROFILE: $MODEL" >&2
  [[ "$PROFILE" == fast ]] && echo "Run: node ipex/setup-fast-model.mjs" >&2
  exit 1
fi

export ONEAPI_DEVICE_SELECTOR=level_zero:0
export SYCL_PI_LEVEL_ZERO_USE_IMMEDIATE_COMMANDLISTS=1
export SYCL_CACHE_PERSISTENT=1

echo "Starting IPEX llama-server — profile: $PROFILE ($LABEL)"
echo "  $SERVER"
echo "  model: $MODEL"
echo "  http://127.0.0.1:$PORT/v1/chat/completions"
echo ""

cd "$(dirname "$SERVER")"
exec "$SERVER" \
  -m "$MODEL" \
  -c "$CTX" \
  -b "$BATCH" \
  -ub "$UBATCH" \
  -ngl "$NGL" \
  -t "$THREADS" \
  --parallel "$PAR" \
  --port "$PORT" \
  --host 127.0.0.1
