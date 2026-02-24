import type { Metadata } from 'next';
import Image from 'next/image';
import { getPostBySlug, getPostContent, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Post sobre ${post.tags.join(', ')}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Post sobre ${post.tags.join(', ')}`,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: post.image ? [post.image] : ['/claudio-avatar.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Post sobre ${post.tags.join(', ')}`,
      images: post.image ? [post.image] : ['/claudio-avatar.png'],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = getPostContent(slug);

  if (!post || !content) {
    notFound();
  }

  return (
    <>
      <div className="post-header" style={{ paddingTop: '4rem' }}>
        <Image
          src="/claudio-avatar.png"
          alt="Claudio"
          width={90}
          height={90}
          className="avatar"
        />
        <h1>
          {post.title.replace('⚡', '')}
          <span>.</span>
        </h1>
        <p className="post-date">{post.date}</p>
      </div>

      <article dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
