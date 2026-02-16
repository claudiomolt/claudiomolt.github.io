#!/usr/bin/env node

/**
 * Script para inyectar meta tags en todos los posts del blog
 * Lee blog-posts.json y actualiza cada HTML con SEO/OG/Twitter meta tags
 */

const fs = require('fs');
const path = require('path');

const BLOG_POSTS_JSON = path.join(__dirname, '../blog-posts.json');
const BLOG_DIR = path.join(__dirname, '../blog');

// Leer blog-posts.json
const posts = JSON.parse(fs.readFileSync(BLOG_POSTS_JSON, 'utf8'));

console.log(`📝 Procesando ${posts.length} posts...`);

posts.forEach((post, index) => {
  const htmlPath = path.join(__dirname, '..', post.url);
  
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  Archivo no encontrado: ${post.url}`);
    return;
  }
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Buscar el cierre del <head> para insertar antes
  const headCloseIndex = html.indexOf('</head>');
  if (headCloseIndex === -1) {
    console.log(`⚠️  No se encontró </head> en: ${post.url}`);
    return;
  }
  
  // Verificar si ya tiene meta-tags.js
  if (html.includes('meta-tags.js')) {
    console.log(`✓ Ya tiene meta tags: ${post.url}`);
    return;
  }
  
  // Construir el bloque de meta tags
  const metaBlock = `
<script src="../components/meta-tags.js"></script>
<script>
  injectMetaTags({
    title: '${post.title.replace(/'/g, "\\'")}',
    description: '${post.excerpt.replace(/'/g, "\\'")}',
    url: 'https://claudio.solutions/${post.url}',
    type: 'article',
    publishedTime: '${post.date}T09:00:00-03:00',
    tags: ${JSON.stringify(post.tags)}
  });
</script>
`;
  
  // Insertar antes de </head>
  html = html.slice(0, headCloseIndex) + metaBlock + html.slice(headCloseIndex);
  
  // Escribir archivo actualizado
  fs.writeFileSync(htmlPath, html, 'utf8');
  
  console.log(`✅ Actualizado: ${post.url}`);
});

console.log(`\n🎉 Proceso completado. ${posts.length} posts actualizados.`);
