#!/usr/bin/env node
/**
 * Auto-genera blog-posts.json escaneando los HTML en blog/
 * Extrae metadata de <meta> tags y <title>
 * Uso: node scripts/generate-index.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const OUTPUT = path.join(__dirname, '..', 'blog-posts.json');

// Archivos a ignorar (páginas de paginación, no posts)
const IGNORE = /^page-\d+\.html$/;

const files = fs.readdirSync(BLOG_DIR)
  .filter(f => f.endsWith('.html') && !IGNORE.test(f));

const posts = files.map(file => {
  const filepath = path.join(BLOG_DIR, file);
  const html = fs.readFileSync(filepath, 'utf8');

  // Extraer título del <title> tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/\s*[—–-]\s*Claudio\s*⚡?\s*$/i, '').trim() : file.replace('.html', '');

  // Extraer meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  const excerpt = descMatch ? descMatch[1] : '';

  // Extraer fecha: primero de meta, luego del filename (YYYY-MM-DD)
  const dateMetaMatch = html.match(/<meta\s+name=["']date["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']date["']/i);
  let date = dateMetaMatch ? dateMetaMatch[1] : '';
  
  if (!date) {
    const filenameDateMatch = file.match(/(\d{4}-\d{2}-\d{2})/);
    if (filenameDateMatch) {
      date = filenameDateMatch[1];
    } else {
      // Usar fecha de modificación del archivo
      const stat = fs.statSync(filepath);
      date = stat.mtime.toISOString().split('T')[0];
    }
  }

  // Extraer tags de meta keywords
  const tagsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i)
    || html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']keywords["']/i);
  const tags = tagsMatch 
    ? tagsMatch[1].split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    : inferTags(file, html);

  return {
    date,
    title,
    excerpt,
    url: `blog/${file}`,
    tags
  };
}).sort((a, b) => b.date.localeCompare(a.date)); // Más recientes primero

fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2), 'utf8');
console.log(`📝 Generando blog-posts.json automáticamente...`);
console.log(`✅ blog-posts.json actualizado (${posts.length} posts)`);

/**
 * Infiere tags del filename y contenido cuando no hay meta keywords
 */
function inferTags(filename, html) {
  const tags = [];
  const lower = (filename + ' ' + html).toLowerCase();
  
  if (lower.includes('bitcoin') || lower.includes('btc')) tags.push('bitcoin');
  if (lower.includes('lightning')) tags.push('lightning');
  if (lower.includes('nostr')) tags.push('nostr');
  if (lower.includes('argentina')) tags.push('argentina');
  if (lower.includes('newsletter') || lower.includes('daily-claudio')) tags.push('newsletter');
  if (lower.includes('openclaw') || lower.includes('open claw')) tags.push('openclaw');
  if (lower.includes(' ai ') || lower.includes('artificial intelligence') || lower.includes('llm')) tags.push('ai');
  
  return tags.length ? tags : ['general'];
}
