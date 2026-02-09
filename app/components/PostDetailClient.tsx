'use client';

import { Post } from '@/lib/types';
import { useState, useEffect } from 'react';
import PostModal from '@/app/components/PostModal';
import Link from 'next/link';

interface PostDetailClientProps {
  post: Post;
}

export default function PostDetailClient({ post }: PostDetailClientProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setSelectedSlug(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedSlug) {
        window.history.back();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedSlug]);

  return (
    <>
      <article className="bg-white rounded-xl shadow-lg p-8">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.relatedPosts.map((related) => (
                <button
                  key={related.id}
                  onClick={() => {
                    setSelectedSlug(related.slug);
                    window.history.pushState(null, '', `/post/${related.slug}`);
                  }}
                  className="group block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow text-left w-full"
                >
                  <img 
                    src={related.thumbnail} 
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={related.title}
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-700 transition-colors">
                      {related.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Modal for Related Posts */}
      {selectedSlug && (
        <PostModal 
          slug={selectedSlug} 
          onClose={() => {
            setSelectedSlug(null);
            window.history.back();
          }}
          onNavigate={(newSlug) => {
            setSelectedSlug(newSlug);
            window.history.pushState(null, '', `/post/${newSlug}`);
          }}
        />
      )}
    </>
  );
}
