const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');

const files = [
  'daily-claudio-2026-01-31.html',
  'daily-claudio-2026-02-01.html',
  'daily-claudio-2026-02-02.html',
  'daily-claudio-2026-02-03.html',
  'daily-claudio-2026-02-04.html',
  'daily-claudio-2026-02-05.html',
  'daily-claudio-2026-02-07.html',
  'daily-claudio-2026-02-08.html',
  'daily-claudio-2026-02-09.html',
  'daily-claudio-2026-02-10.html',
  'daily-claudio-2026-02-11.html',
  'daily-claudio-2026-02-12.html',
  'daily-claudio-2026-02-13.html',
  'daily-claudio-2026-02-15.html',
  'daily-claudio-2026-02-16.html',
  'daily-claudio-2026-02-18.html',
  'daily-claudio-2026-02-21.html',
  'daily-claudio-2026-02-23.html',
  'daily-claudio-2026-02-24.html'
];

function extractDate(filename) {
  const match = filename.match(/daily-claudio-(\d{4}-\d{2}-\d{2})\.html/);
  return match ? match[1] : '';
}

function formatDateSpanish(dateStr) {
  const [year, month, day] = dateStr.split('-');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

function migrateCardFormat(html, filename) {
  // Extraer hero image si existe
  const heroMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*class="hero-newsletter"/);
  const heroSrc = heroMatch ? heroMatch[1] : '';
  
  // Extraer todos los newsletter-cards
  const cards = [];
  const cardRegex = /<div class="newsletter-card">([\s\S]*?)<\/div>/g;
  let match;
  
  while ((match = cardRegex.exec(html)) !== null) {
    const cardContent = match[1];
    
    // Extraer emoji (opcional)
    const emojiMatch = cardContent.match(/<span class="card-emoji">([^<]*)<\/span>/);
    const emoji = emojiMatch ? emojiMatch[1] + ' ' : '';
    
    // Extraer h2
    const h2Match = cardContent.match(/<h2>([^<]*)<\/h2>/);
    const title = h2Match ? h2Match[1] : '';
    
    // Extraer contenido del párrafo
    const pMatch = cardContent.match(/<p>([\s\S]*?)<\/p>/);
    const content = pMatch ? pMatch[1] : '';
    
    cards.push({ emoji, title, content });
  }
  
  // Construir el nuevo contenido
  let articleContent = '';
  cards.forEach(card => {
    articleContent += `  <h2>${card.emoji}${card.title}</h2>\n  <p>${card.content}</p>\n\n`;
  });
  
  return { heroSrc, content: articleContent.trim() };
}

function migrateInlineCSS(html, filename) {
  // Extraer hero
  const heroMatch = html.match(/<img[^>]*class="hero"[^>]*src="([^"]*)"/);
  const heroSrc = heroMatch ? heroMatch[1] : '';
  
  // Extraer price banner
  const priceMatch = html.match(/<div class="price-banner">([\s\S]*?)<\/div>/);
  let priceBanner = '';
  if (priceMatch) {
    priceBanner = priceMatch[1]
      .replace(/<span class="price">/g, '<span style="font-size:2em;color:#ff8c00;font-weight:bold">')
      .replace(/<span class="change">/g, '<span style="color:#ef4444;font-size:1.2em;margin-left:1rem">')
      .trim();
  }
  
  // Extraer contenido de sections
  const containerMatch = html.match(/<div class="container">([\s\S]*?)<footer/);
  if (!containerMatch) {
    return { heroSrc, priceBanner: '', content: '' };
  }
  
  let content = containerMatch[1];
  
  // Remover hero y price banner
  content = content.replace(/<img[^>]*class="hero"[^>]*>/, '');
  content = content.replace(/<div class="price-banner">[\s\S]*?<\/div>/, '');
  
  // Convertir .quote a blockquote
  content = content.replace(/<div class="quote">([\s\S]*?)<\/div>/g, (match, inner) => {
    const citeMatch = inner.match(/<p[^>]*style="[^"]*text-align:\s*right[^"]*"[^>]*>([^<]*)<\/p>/);
    let cite = '';
    if (citeMatch) {
      cite = `<cite>${citeMatch[1]}</cite>`;
      inner = inner.replace(citeMatch[0], '');
    }
    
    inner = inner
      .replace(/<p[^>]*>/g, '')
      .replace(/<\/p>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return `<blockquote>\n    ${inner}\n    ${cite}\n  </blockquote>`;
  });
  
  // Remover section wrappers
  content = content.replace(/<div class="section">\s*/g, '\n  ');
  content = content.replace(/<h2 class="[^"]*">/g, '<h2>');
  content = content.replace(/<strong class="[^"]*">/g, '<strong>');
  content = content.replace(/<p style="[^"]*">/g, '<p>');
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  content = content.replace(/^\s*<\/div>\s*$/gm, '');
  content = content.replace(/\n\s*\n\s*\n+/g, '\n\n');
  
  return { heroSrc, priceBanner, content: content.trim() };
}

function generateDescription(content) {
  // Extraer primer texto significativo
  const pMatch = content.match(/<p>([^<]*)/);
  if (pMatch) {
    let desc = pMatch[1].replace(/→.*$/gm, '').replace(/<[^>]*>/g, '').trim();
    if (desc.length > 150) desc = desc.substring(0, 150) + '...';
    return desc;
  }
  return 'Daily Claudio — Bitcoin, AI, y Argentina. Fix the money, fix the world.';
}

function generateKeywords(content) {
  const keywords = ['bitcoin', 'daily claudio', 'newsletter', 'crypto'];
  const contentLower = content.toLowerCase();
  
  if (contentLower.includes('argentina')) keywords.push('argentina');
  if (contentLower.includes('etf')) keywords.push('etf');
  if (contentLower.includes('ai') || contentLower.includes('inteligencia artificial')) keywords.push('ai');
  if (contentLower.includes('lightning')) keywords.push('lightning network');
  if (contentLower.includes('trump')) keywords.push('trump');
  
  return keywords.join(', ');
}

function migrateFile(filename) {
  const filePath = path.join(blogDir, filename);
  const html = fs.readFileSync(filePath, 'utf-8');
  
  const date = extractDate(filename);
  const dateSpanish = formatDateSpanish(date);
  
  let heroSrc, priceBanner = '', content;
  
  // Detectar formato y migrar
  if (html.includes('class="newsletter-card"')) {
    console.log(`  📦 Migrando desde cards: ${filename}`);
    const result = migrateCardFormat(html, filename);
    heroSrc = result.heroSrc;
    content = result.content;
  } else if (html.includes('<style>')) {
    console.log(`  🎨 Migrando desde CSS inline: ${filename}`);
    const result = migrateInlineCSS(html, filename);
    heroSrc = result.heroSrc;
    priceBanner = result.priceBanner;
    content = result.content;
  } else {
    console.log(`  ⚠️  Formato no reconocido: ${filename}`);
    return;
  }
  
  const description = generateDescription(content);
  const keywords = generateKeywords(content);
  
  const url = `https://claudio.solutions/blog/${filename}`;
  const ogImage = heroSrc || 'https://files.catbox.moe/301s2t.png';
  
  // Construir HTML final
  const newHtml = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>⚡ Daily Claudio — ${dateSpanish}</title>

<!-- Meta tags -->
<meta name="description" content="${description.replace(/"/g, '&quot;')}">
<meta name="date" content="${date}">
<meta name="keywords" content="${keywords}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="⚡ Daily Claudio — ${dateSpanish}">
<meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
<meta property="og:image" content="${ogImage}">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="⚡ Daily Claudio — ${dateSpanish}">
<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
<meta name="twitter:image" content="${ogImage}">

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
<link rel="stylesheet" href="../blog.css">
<link rel="stylesheet" href="../responsive.css">
</head>
<body>

<script src="../components/navbar.js"></script>

<div class="post-header" style="padding-top:4rem">
  <img src="../claudio-avatar.png" alt="Claudio" class="avatar">
  <h1>⚡ Daily Claudio — ${dateSpanish}<span>.</span></h1>
  <p class="post-date">${date}</p>
</div>

<article>
${heroSrc ? `  <img src="${heroSrc}" class="hero" style="width:100%;border-radius:12px;margin:1.5rem 0">\n\n` : ''}${priceBanner ? `  <div style="background:#0d1525;padding:1.5rem;border-radius:8px;margin:1.5rem 0;border-left:4px solid #ff8c00">\n    ${priceBanner}\n  </div>\n\n` : ''}${content}
</article>

<footer></footer>
<script src="../components/footer.js"></script>

<script src="../hamburger.js"></script>
</body>
</html>`;

  fs.writeFileSync(filePath, newHtml, 'utf-8');
  console.log(`  ✅ Completado\n`);
}

// Migrar todos
console.log('🚀 Iniciando migración de TODOS los newsletters...\n');
files.forEach(migrateFile);
console.log('✨ Migración completada!\n');
