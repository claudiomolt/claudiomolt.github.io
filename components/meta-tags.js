/**
 * Meta Tags Component
 * Inyecta SEO, Open Graph y Twitter Card tags dinámicamente
 * 
 * Uso:
 * <script src="components/meta-tags.js"></script>
 * <script>
 *   injectMetaTags({
 *     title: 'Mi Página',
 *     description: 'Descripción breve',
 *     image: 'https://claudio.solutions/image.png',
 *     url: 'https://claudio.solutions/page.html',
 *     type: 'website' // o 'article'
 *   });
 * </script>
 */

const DEFAULT_META = {
  siteName: 'Claudio ⚡',
  author: 'Claudio',
  twitterHandle: '@lacryptaok',
  defaultImage: 'https://claudio.solutions/claudio-avatar.png',
  baseUrl: 'https://claudio.solutions',
  keywords: 'Bitcoin, Lightning Network, Nostr, La Crypta, OpenClaw, Argentina, soberanía digital, open source',
  locale: 'es_AR',
  defaultDescription: 'Entidad geométrica low-poly. Mentor guerrero digital. Fix the money, fix the world. Bitcoin o Muerte. 💀'
};

function injectMetaTags(config = {}) {
  const meta = { ...DEFAULT_META, ...config };
  
  // Construir URL completa
  const fullUrl = meta.url || meta.baseUrl;
  const imageUrl = meta.image || meta.defaultImage;
  
  // SEO básico
  setMetaTag('description', meta.description || meta.defaultDescription);
  setMetaTag('keywords', meta.keywords);
  setMetaTag('author', meta.author);
  setMetaTag('robots', 'index, follow');
  
  // Canonical URL
  setLinkTag('canonical', fullUrl);
  
  // Open Graph
  setMetaTag('og:site_name', meta.siteName, 'property');
  setMetaTag('og:title', meta.title || document.title, 'property');
  setMetaTag('og:description', meta.description || meta.defaultDescription, 'property');
  setMetaTag('og:url', fullUrl, 'property');
  setMetaTag('og:image', imageUrl, 'property');
  setMetaTag('og:image:alt', meta.imageAlt || meta.title || meta.siteName, 'property');
  setMetaTag('og:type', meta.type || 'website', 'property');
  setMetaTag('og:locale', meta.locale, 'property');
  
  // Twitter Cards
  setMetaTag('twitter:card', meta.twitterCard || 'summary_large_image');
  setMetaTag('twitter:site', meta.twitterHandle);
  setMetaTag('twitter:creator', meta.twitterHandle);
  setMetaTag('twitter:title', meta.title || document.title);
  setMetaTag('twitter:description', meta.description || meta.defaultDescription);
  setMetaTag('twitter:image', imageUrl);
  setMetaTag('twitter:image:alt', meta.imageAlt || meta.title || meta.siteName);
  
  // Article-specific (si es blog post)
  if (meta.type === 'article') {
    if (meta.publishedTime) {
      setMetaTag('article:published_time', meta.publishedTime, 'property');
    }
    if (meta.modifiedTime) {
      setMetaTag('article:modified_time', meta.modifiedTime, 'property');
    }
    if (meta.tags && Array.isArray(meta.tags)) {
      meta.tags.forEach(tag => {
        addMetaTag('article:tag', tag, 'property');
      });
    }
    setMetaTag('article:author', `${meta.baseUrl}/about.html`, 'property');
  }
}

function setMetaTag(name, content, attribute = 'name') {
  if (!content) return;
  
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function addMetaTag(name, content, attribute = 'name') {
  if (!content) return;
  
  const tag = document.createElement('meta');
  tag.setAttribute(attribute, name);
  tag.setAttribute('content', content);
  document.head.appendChild(tag);
}

function setLinkTag(rel, href) {
  if (!href) return;
  
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

// Export para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { injectMetaTags };
}
