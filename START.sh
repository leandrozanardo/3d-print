#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo "Starting Fix My Print web UI..."
echo "Open http://127.0.0.1:5173/ when Vite is ready."
exec npm start
