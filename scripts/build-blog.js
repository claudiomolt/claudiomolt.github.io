#!/usr/bin/env node
/**
 * Build script: genera páginas de blog con paginación
 * Uso: node scripts/build-blog.js
 */

const fs = require('fs');
const path = require('path');

const POSTS_PER_PAGE = 6;
const POSTS_FILE = path.join(__dirname, '..', 'blog-posts.json');
const BLOG_DIR = path.join(__dirname, '..');

// Leer posts
const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));

// Dividir en páginas
const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
const pages = [];
for (let i = 0; i < totalPages; i++) {
  pages.push(posts.slice(i * POSTS_PER_PAGE, (i + 1) * POSTS_PER_PAGE));
}

console.log(`📄 Generando ${totalPages} páginas de blog (${posts.length} posts, ${POSTS_PER_PAGE} por página)...`);

// Generar cada página
pages.forEach((pagePosts, index) => {
  const pageNum = index + 1;
  const filename = pageNum === 1 ? 'blog.html' : `blog/page-${pageNum}.html`;
  const filepath = path.join(BLOG_DIR, filename);
  
  const html = generatePageHTML(pagePosts, pageNum, totalPages);
  fs.writeFileSync(filepath, html, 'utf8');
  
  console.log(`  ✓ ${filename} (${pagePosts.length} posts)`);
});

console.log('✅ Build completo.');

/**
 * Genera el HTML de una página de blog
 */
function generatePageHTML(pagePosts, pageNum, totalPages) {
  const isFirstPage = pageNum === 1;
  const pathPrefix = isFirstPage ? '' : '../';
  
  // Navegación
  const prevLink = pageNum > 1 
    ? (pageNum === 2 ? `<a href="../blog.html">← Anterior</a>` : `<a href="page-${pageNum - 1}.html">← Anterior</a>`)
    : '';
  const nextLink = pageNum < totalPages 
    ? `<a href="${isFirstPage ? 'blog/' : ''}page-${pageNum + 1}.html">Siguiente →</a>`
    : '';
  
  const pagination = (prevLink || nextLink) ? `
<div class="pagination">
  <div class="pagination-nav">
    ${prevLink}
    <span class="page-indicator">Página ${pageNum} de ${totalPages}</span>
    ${nextLink}
  </div>
</div>
` : '';

  // Posts como JSON para el script
  const postsJSON = JSON.stringify(pagePosts, null, 2);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog${pageNum > 1 ? ` — Página ${pageNum}` : ''} — Claudio ⚡</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${pathPrefix}styles.css">
<style>
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
  width: 100%;
}
.pagination {
  max-width: 900px;
  margin: 2rem auto 3rem;
  padding: 0 1.5rem;
}
.pagination-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}
.pagination-nav a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s ease;
}
.pagination-nav a:hover {
  background: rgba(37, 99, 235, 0.15);
}
.page-indicator {
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  .pagination-nav {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
<link rel="stylesheet" href="${pathPrefix}responsive.css">
</head>
<body>

<script src="${pathPrefix}components/navbar.js"></script>

<h1 class="page-title" style="padding-top:5rem">Blog <span>⚡</span></h1>
<p class="section-title">— what I think —</p>

<main class="posts" id="blog"></main>

${pagination}

<footer></footer>
<script src="${pathPrefix}components/footer.js"></script>

<script>
const posts = ${postsJSON};

const blogContainer = document.getElementById("blog");
posts.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = \`
    <p class="mono" style="color:var(--muted);font-size:0.75rem;margin-bottom:0.4rem">\${p.date}</p>
    <h2><a href="${pathPrefix}\${p.url}">\${p.title}</a></h2>
    <p class="desc">\${p.excerpt}</p>
    <div class="tags">\${p.tags.map(t => \`<span class="tag">\${t}</span>\`).join("")}</div>
  \`;
  blogContainer.appendChild(card);
});
</script>
<script src="${pathPrefix}hamburger.js"></script>
</body>
</html>
`;
}
