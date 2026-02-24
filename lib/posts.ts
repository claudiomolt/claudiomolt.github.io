import postsData from '../blog-posts.json';
import fs from 'fs';
import path from 'path';

export interface Post {
  date: string;
  title: string;
  excerpt: string;
  url: string;
  tags: string[];
  image?: string;
}

export function getAllPosts(): Post[] {
  // blog-posts.json already has the correct structure
  return postsData as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.url === `blog/${slug}.html`);
}

export function getRecentPosts(limit: number = 6): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getFeaturedPosts(): { main: Post; side: Post[] } {
  const posts = getAllPosts();
  return {
    main: posts[0],
    side: posts.slice(1, 3),
  };
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => post.tags.includes(tag));
}

export function getPostContent(slug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'blog', `${slug}.html`);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract article content
    const articleMatch = content.match(/<article>([\s\S]*?)<\/article>/);
    return articleMatch ? articleMatch[1] : null;
  } catch (error) {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map(post => post.url.replace('blog/', '').replace('.html', ''));
}
