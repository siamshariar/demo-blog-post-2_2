// TypeScript Type Definitions

export interface Post {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  relatedPosts?: Post[];
}

export interface PostsPage {
  items: Post[];
  nextPage: number | null;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
