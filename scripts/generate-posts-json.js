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

  // Extrae title del formato: <h1>Daily Claudio<span>.</span></h1>
  const titleMatch = htmlContent.match(/<h1>([^<]+(?:<span>[^<]*<\/span>[^<]*)*)<\/h1>/);
  let title = titleMatch ? titleMatch[1].replace(/<span[^>]*>.*?<\/span>/g, "") : null;

  // Extrae excerpt del primer <p> dentro de newsletter-intro o primer párrafo significativo
  let excerpt = null;

  // Intenta obtener el excerpt del primer card con descripción
  const cardMatch = htmlContent.match(
    /<div class="newsletter-card">[\s\S]*?<h2>([^<]+)<\/h2>[\s\S]*?<p>([^<]+)<\/p>/
  );
  if (cardMatch) {
    excerpt = cardMatch[2].substring(0, 150);
    if (excerpt.length === 150) excerpt += "...";
  }

  // Si no, usa el primer párrafo relevante
  if (!excerpt) {
    const pMatch = htmlContent.match(/<article>[\s\S]*?<p[^>]*>([^<]+)<\/p>/);
    if (pMatch) {
      excerpt = pMatch[1].substring(0, 150);
      if (excerpt.length === 150) excerpt += "...";
    }
  }

  // Extrae tags del formato: <span class="tag">nombre</span>
  const tagsMatches = htmlContent.match(/<span class="tag">([^<]+)<\/span>/g) || [];
  const tags = tagsMatches.map((tag) => tag.replace(/<span class="tag">|<\/span>/g, ""));

  return { date, title, excerpt, tags };
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
      posts.push({
        date: metadata.date,
        title: metadata.title,
        excerpt: metadata.excerpt || "Sin descripción disponible",
        url: `blog/${file}`,
        tags: metadata.tags.length > 0 ? metadata.tags : ["blog"],
      });
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
