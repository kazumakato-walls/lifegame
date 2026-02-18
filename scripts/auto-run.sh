#!/bin/bash
set -e

echo "🚀 Running validation..."
make validate

echo "🌿 Creating branch..."
make branch

echo "💾 Commit..."
make commit

echo "⬆ Push..."
make push

echo "📦 Creating PR..."
make pr

echo "🎉 Done"
