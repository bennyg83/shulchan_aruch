#!/usr/bin/env bash
# Copy catalog + siman bundles into dist/ for standalone native builds (Android APK / iOS).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CORPUS_SRC="$ROOT/../oc318-mobile-reader/public/corpus/oc1"
DIST="$ROOT/dist"

mkdir -p "$DIST/corpus/oc1/bundles"
cp "$CORPUS_SRC/catalog.json" "$DIST/corpus/oc1/catalog.json"
cp "$CORPUS_SRC/bundles/"*.json "$DIST/corpus/oc1/bundles/"

COUNT="$(ls "$DIST/corpus/oc1/bundles" | wc -l | tr -d ' ')"
echo "Bundles assembled: $COUNT"
test "$COUNT" -gt 600
