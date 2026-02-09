'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post, PostsPage } from '@/lib/types';
import { useMemo } from 'react';

interface PostModalProps {
  slug: string;
  onClose: () => void;
}

export default function PostModal({ slug, onClose }: PostModalProps) {
  const queryClient = useQueryClient();

  // 1. GET DATA FROM CACHE (Instant)
  const cachedData = useMemo(() => {
    const postsData = queryClient.getQueryData(['posts']) as { 
      pages: PostsPage[] 
    } | undefined;
    
    return postsData?.pages
      ?.flatMap((p) => p.items)
      ?.find((item) => item.slug === slug);
  }, [queryClient, slug]);

  // 2. FETCH FULL DETAILS (Background)
  const { data: fullPost } = useQuery<Post>({
    queryKey: ['post', slug],
    queryFn: async () => {
      const res = await fetch(`/api/post/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      return res.json();
    },
    initialData: cachedData ?? undefined,
  });

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-4xl w-full my-8 rounded-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 flex items-center justify-center text-black hover:text-black bg-white/90 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Modal Content */}
        <div className="p-8 pt-16">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-green-100 text-black text-xs font-semibold rounded-full mb-4">
              ⚡ Instant Load from Cache
            </span>
            <h1 className="text-4xl font-bold text-black leading-tight">
              {fullPost?.title || 'Loading...'}
            </h1>
            <div className="flex items-center gap-4 mt-4 text-sm text-black">
              {fullPost?.author && <span>By {fullPost.author}</span>}
              {fullPost?.publishedAt && (
                <span>
                  {new Date(fullPost.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          </div>

          <img 
            src={fullPost?.thumbnail} 
            alt={fullPost?.title}
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-md" 
          />

          <div className="text-black text-xl leading-relaxed mb-8">
            {fullPost?.shortDesc}
          </div>

          {fullPost?.content && (
            <div 
              className="prose prose-lg max-w-none text-black"
              dangerouslySetInnerHTML={{ __html: fullPost.content }}
            />
          )}

          {fullPost?.relatedPosts && fullPost.relatedPosts.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-bold mb-6 text-black">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {fullPost.relatedPosts.map((related) => (
                  <button
                    key={related.id}
                    onClick={() => window.location.href = `/post/${related.slug}`}
                    className="border rounded-lg p-4 hover:shadow-lg transition-shadow text-left"
                  >
                    <img 
                      src={related.thumbnail} 
                      alt={related.title}
                      className="w-full h-32 object-cover rounded mb-3" 
                    />
                    <h4 className="font-semibold text-black line-clamp-2">
                      {related.title}
                    </h4>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
