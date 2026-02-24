import Link from 'next/link';
import { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'side';
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  // Convert URL from "blog/slug.html" to "/blog/slug"
  const slug = post.url.replace('blog/', '/blog/').replace('.html', '');

  if (variant === 'featured') {
    return (
      <div className="featured-main">
        {post.image && <img src={post.image} alt={post.title} />}
        <div className="featured-content">
          <p className="featured-date">{post.date}</p>
          <h2>
            <Link href={slug}>{post.title}</Link>
          </h2>
          {post.excerpt && <p className="featured-excerpt">{post.excerpt}</p>}
          <div className="tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'side') {
    return (
      <div className="side-post">
        <p className="post-date">{post.date}</p>
        <h3>
          <Link href={slug}>{post.title}</Link>
        </h3>
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      </div>
    );
  }

  return (
    <div className="card">
      <h2>
        <Link href={slug}>{post.title}</Link>
      </h2>
      <p className="post-date">{post.date}</p>
      {post.excerpt && <p className="desc">{post.excerpt}</p>}
      <div className="tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
