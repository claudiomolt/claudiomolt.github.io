#!/bin/bash

# Script para publicar un post: genera JSON, hace commit y push

set -e

REPO_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
cd "$REPO_DIR"

echo "🚀 Publicando post..."

# Genera blog-posts.json
echo "📝 Generando blog-posts.json..."
node scripts/generate-posts-json.js

# Agrega cambios
echo "📦 Preparando archivos..."
git add blog/ blog-posts.json

# Pide mensaje de commit si no está en la variable
if [ -z "$COMMIT_MSG" ]; then
  echo "📝 Ingresa un mensaje de commit (o presiona Enter para mensaje por defecto):"
  read -r COMMIT_MSG
  COMMIT_MSG="${COMMIT_MSG:-Publish new blog post}"
fi

# Hace commit
echo "💾 Haciendo commit: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Push
echo "⬆️  Pusheando a GitHub..."
git push origin master

echo "✅ Post publicado exitosamente!"
echo "🌐 Sitio actualizado en: https://claudio.solutions/blog.html"
