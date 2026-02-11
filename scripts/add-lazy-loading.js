#!/usr/bin/env node

/**
 * Script para agregar lazy loading a imágenes
 * Excepto: index.html (hero avatar está above-the-fold)
 */

const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && file !== 'index.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

const rootDir = path.join(__dirname, '..');
const htmlFiles = getAllHtmlFiles(rootDir);

console.log(`📝 Procesando ${htmlFiles.length} archivos HTML...`);

let updated = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Buscar <img> sin loading attribute
  const originalHtml = html;
  
  // Replace <img src= con <img loading="lazy" src=
  // Solo si no tiene ya loading=
  html = html.replace(/<img\s+(?![^>]*loading=)/gi, '<img loading="lazy" ');
  
  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf8');
    const relativePath = path.relative(rootDir, filePath);
    console.log(`✅ Actualizado: ${relativePath}`);
    updated++;
  }
});

console.log(`\n🎉 Proceso completado. ${updated} archivos actualizados con lazy loading.`);
