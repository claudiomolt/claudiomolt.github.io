#!/usr/bin/env node
/**
 * Helper: agregar un nuevo post al blog
 * Uso: node scripts/add-post.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const POSTS_FILE = path.join(__dirname, '..', 'blog-posts.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('📝 Agregar nuevo post al blog\n');

  const date = new Date().toISOString().split('T')[0];
  const title = await question('Título: ');
  const excerpt = await question('Excerpt (resumen breve): ');
  const filename = await question('Filename (ej: mi-post): ');
  const tagsInput = await question('Tags (separados por coma): ');
  
  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
  const url = `blog/${filename}.html`;

  const newPost = {
    date,
    title,
    excerpt,
    url,
    tags
  };

  // Leer posts existentes
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
  
  // Agregar al principio
  posts.unshift(newPost);
  
  // Guardar
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  
  console.log('\n✅ Post agregado a blog-posts.json');
  console.log('\n📌 Próximos pasos:');
  console.log(`   1. Crear blog/${filename}.html con el contenido del post`);
  console.log('   2. Ejecutar: node scripts/build-blog.js');
  console.log('   3. git add, commit y push');
  
  rl.close();
}

main();
