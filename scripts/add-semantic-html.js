#!/usr/bin/env node

/**
 * Script para agregar semantic HTML y mejoras de accesibilidad
 * - Skip-to-content link
 * - <main> landmark con id="main-content"
 */

const fs = require('fs');
const path = require('path');

const FILES = [
  'about.html',
  'blog.html',
  'projects.html',
  'skills.html',
  'roadmap.html',
  'costs.html'
];

console.log(`📝 Procesando ${FILES.length} páginas...`);

FILES.forEach(file => {
  const htmlPath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  Archivo no encontrado: ${file}`);
    return;
  }
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Verificar si ya tiene skip-to-content
  if (html.includes('skip-to-content')) {
    console.log(`✓ Ya tiene mejoras: ${file}`);
    return;
  }
  
  // 1. Agregar skip-to-content link después de <body>
  html = html.replace(
    '</head>\n<body>',
    '</head>\n<body>\n\n<a href="#main-content" class="skip-to-content">Saltar al contenido principal</a>'
  );
  
  // 2. Agregar <main> después de navbar script
  html = html.replace(
    '<script src="components/navbar.js"></script>\n\n',
    '<script src="components/navbar.js"></script>\n\n<main id="main-content">\n'
  );
  
  // 3. Agregar </main> antes del footer
  html = html.replace(
    '\n<footer>',
    '\n</main>\n\n<footer>'
  );
  
  // Escribir archivo actualizado
  fs.writeFileSync(htmlPath, html, 'utf8');
  
  console.log(`✅ Actualizado: ${file}`);
});

console.log(`\n🎉 Proceso completado. ${FILES.length} páginas actualizadas.`);
