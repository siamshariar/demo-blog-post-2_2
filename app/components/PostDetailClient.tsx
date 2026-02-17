'use client';

import { Post } from '@/lib/types';
import { useState, useEffect } from 'react';
import PostModal from './PostModal';

interface PostDetailClientProps {
  post: Post;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const [modalSlug, setModalSlug] = useState<string | null>(null);

  // Scroll to top whenever a different post is rendered (full detail page navigation)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, 0);
      }
    }
  }, [post.slug]);

  // Handle modal close
  const handleModalClose = () => {
    setModalSlug(null);
  };

  // Handle modal navigate (when clicking related posts)
  const handleModalNavigate = (slug: string) => {
    setModalSlug(slug);
    // No URL update to avoid RSC fetches
  };

  return (
    <>
      {modalSlug && (
        <PostModal
          slug={modalSlug}
          onClose={handleModalClose}
          onNavigate={handleModalNavigate}
        />
      )}

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            📄 Detail Page
          </span>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            🔍 SEO Optimized
          </span>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-black leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-black">
          {post.author && <span className="font-medium">By {post.author}</span>}
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>

      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"
      />

      <div className="text-black text-xl leading-relaxed mb-8">
        {post.shortDesc}
      </div>

      {post.content && (
        <div
          className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-black prose-li:text-black"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      <div className="mt-12 border-t pt-8">
        <h3 className="font-bold text-2xl mb-6 text-black">Related Posts</h3>
        {!post.relatedPosts || post.relatedPosts.length === 0 ? (
          <p className="text-gray-500">No related posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {post.relatedPosts
              .filter(related => related.slug !== post.slug)
              .map((related) => (
              <button
                key={related.id}
                onClick={() => setModalSlug(related.slug)}
                className="group text-left w-full cursor-pointer"
              >
                <article className="border rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden transform group-hover:-translate-y-1 mb-6">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={related.thumbnail}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-700 transition-colors">
                      {related.title}
                    </h4>
                  </div>
                </article>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
