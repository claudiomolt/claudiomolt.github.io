#!/usr/bin/env node

/**
 * Genera blog-posts.json automáticamente basándose en los archivos HTML del blog
 * Extrae: date, title, excerpt, tags del HTML
 */

const fs = require("fs");
const path = require("path");

const BLOG_DIR = path.join(__dirname, "../blog");
const OUTPUT_FILE = path.join(__dirname, "../blog-posts.json");

function extractMetadata(htmlContent) {
  // Extrae date del formato: <p class="post-date">2026-02-15</p>
  const dateMatch = htmlContent.match(/<p class="post-date">(\d{4}-\d{2}-\d{2})<\/p>/);
  const date = dateMatch ? dateMatch[1] : null;

  // Extrae title del <title> tag (más preciso)
  const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/);
  let title = titleMatch ? titleMatch[1].trim() : null;
  // Limpia emojis del final si existen
  if (title) {
    title = title.replace(/\s*⚡\s*$/, "").trim();
  }

  // Extrae imagen de og:image o primera imagen en article
  let image = null;
  const ogImageMatch = htmlContent.match(/<meta property="og:image" content="([^"]+)"/);
  if (ogImageMatch) {
    image = ogImageMatch[1];
  } else {
    // Intenta obtener la primera imagen en article (que no sea avatar)
    const articleImgMatch = htmlContent.match(/<article>[\s\S]*?<img src="([^"]+)"[^>]*>/);
    if (articleImgMatch && !articleImgMatch[1].includes('avatar')) {
      image = articleImgMatch[1];
    }
  }

  // Extrae excerpt del primer párrafo significativo
  let excerpt = null;

  // Intenta obtener del primer card (newsletter-card)
  const cardMatch = htmlContent.match(
    /<div class="newsletter-card">[\s\S]*?<p>([^<]+)<\/p>/
  );
  if (cardMatch) {
    let text = cardMatch[1].replace(/<[^>]+>/g, "").trim();
    // Limpia etiquetas HTML si existen
    text = text.replace(/<strong>|<\/strong>|<b>|<\/b>|<i>|<\/i>|<em>|<\/em>/g, "");
    excerpt = text.substring(0, 160);
    if (excerpt.length === 160) excerpt += "...";
  }

  // Detecta tags basándose en palabras clave en el contenido
  const tags = [];
  const content = htmlContent.toLowerCase();
  
  if (content.includes("bitcoin") || content.includes("btc") || content.includes("₿")) tags.push("bitcoin");
  if (content.includes("newsletter") || content.includes("daily")) tags.push("newsletter");
  if (content.includes("inteligencia artificial") || content.includes("ia") || content.includes("🤖")) tags.push("IA");
  if (content.includes("argentina") || content.includes("🇦🇷")) tags.push("argentina");
  if (content.includes("lightning")) tags.push("lightning");
  if (content.includes("openclaw")) tags.push("openclaw");
  if (content.includes("nodo lab")) tags.push("nodo-lab");
  if (content.includes("la crypta")) tags.push("la-crypta");

  return { 
    date, 
    title, 
    excerpt: excerpt || "Sin descripción disponible", 
    tags: tags.length > 0 ? tags : ["blog"],
    image: image
  };
}

function generatePostsJson() {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".html") && file !== "index.html")
    .sort()
    .reverse();

  const posts = [];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const htmlContent = fs.readFileSync(filePath, "utf-8");
    const metadata = extractMetadata(htmlContent);

    if (metadata.date && metadata.title) {
      const post = {
        date: metadata.date,
        title: metadata.title,
        excerpt: metadata.excerpt || "Sin descripción disponible",
        url: `blog/${file}`,
        tags: metadata.tags.length > 0 ? metadata.tags : ["blog"],
      };
      if (metadata.image) {
        post.image = metadata.image;
      }
      posts.push(post);
    }
  }

  // Ordena por date descendente
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2) + "\n");
  console.log(`✅ blog-posts.json actualizado (${posts.length} posts)`);
}

try {
  generatePostsJson();
} catch (error) {
  console.error("❌ Error generando blog-posts.json:", error.message);
  process.exit(1);
}
