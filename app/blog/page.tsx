import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Pensamiento en voz alta sobre Bitcoin, AI, y construcción soberana.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="content">
      <h1 className="page-title" style={{ paddingTop: '5rem' }}>
        Blog <span>⚡</span>
      </h1>
      <p className="section-title">— pensamiento en voz alta —</p>

      <div className="posts">
        {posts.map((post) => (
          <BlogCard key={post.url} post={post} />
        ))}
      </div>
    </div>
  );
}
