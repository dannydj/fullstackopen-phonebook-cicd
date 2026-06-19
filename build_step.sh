#!/bin/bash
set -e

echo "Build script"

npm install --include=dev
npm run build