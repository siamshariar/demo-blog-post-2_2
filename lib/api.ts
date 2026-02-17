import { Post, PostsPage } from './types';

// Mock data generator - Generate posts on-demand (not upfront)
const generateMockPost = (id: number): Post => {
  return {
    id,
    slug: `post-${id}`,
    title: `Amazing Post #${id}: Exploring Modern Web Development`,
    shortDesc: `Discover the incredible insights about web development, performance optimization, and user experience in this comprehensive article. Learn how to build better applications.`,
    thumbnail: `https://picsum.photos/seed/${id}/800/600`,
    content: `
      <h2>Introduction</h2>
      <p>This is the full content of post #${id}. In a real application, this would contain rich HTML content with images, videos, and more.</p>
      
      <h3>Key Points</h3>
      <ul>
        <li>Performance optimization strategies</li>
        <li>Modern React patterns and best practices</li>
        <li>SEO-friendly architecture</li>
        <li>User experience improvements</li>
      </ul>
      
      <h3>Deep Dive</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h3>Advanced Concepts</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <blockquote>
        "The best way to predict the future is to invent it." - Alan Kay
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>By implementing these patterns, you can create incredibly fast and user-friendly applications that scale to millions of pages while maintaining excellent performance.</p>
    `,
    author: `Author ${id % 10}`,
    publishedAt: new Date(Date.now() - id * 3600000).toISOString(),
  };
};

// Simulate total available posts in "database"
const TOTAL_POSTS = 100000;

// API Functions
export async function getTrendingPosts({ pageParam = 1 }: { pageParam?: number }): Promise<PostsPage> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const PAGE_SIZE = 48;
  const start = (pageParam - 1) * PAGE_SIZE + 1; // Start from post ID 1
  const end = start + PAGE_SIZE;
  
  // Generate posts on-demand for this page only
  const items: Post[] = [];
  for (let i = start; i < end && i <= TOTAL_POSTS; i++) {
    items.push(generateMockPost(i));
  }
  
  const hasMore = end <= TOTAL_POSTS;
  
  console.log(`📦 API: Generated page ${pageParam} (Posts ${start}-${end - 1}) - Total in memory: ${items.length}`);
  
  return {
    items,
    nextPage: hasMore ? pageParam + 1 : null,
    hasMore,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Simulate network delay for full content
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Extract ID from slug (format: post-123)
  const id = parseInt(slug.replace('post-', ''));
  
  if (isNaN(id) || id < 1 || id > TOTAL_POSTS) {
    return null;
  }
  
  // Generate the post on-demand
  const post = generateMockPost(id);
  
  // Generate related posts (nearby IDs) — dedupe and exclude the current id
  const relatedIds = [...new Set([
    Math.max(1, id - 2),
    Math.max(1, id - 1),
    Math.min(TOTAL_POSTS, id + 1),
    Math.min(TOTAL_POSTS, id + 2),
  ])];
  
  const uniqueRelatedIds = relatedIds
    .filter(relatedId => relatedId !== id)
    .slice(0, 3);

  return {
    ...post,
    relatedPosts: uniqueRelatedIds.map(relatedId => generateMockPost(relatedId)),
  };
}

