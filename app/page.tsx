// app/page.tsx - Server Component with Prefetching
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTrendingPosts } from '@/lib/api';
import VirtualizedFeed from '@/app/components/VirtualizedFeed';

export default async function HomePage() {
  const queryClient = new QueryClient();

  // 1. Fetch initial "SEO-friendly" data on server
  // This makes the first page load instant AND SEO-friendly
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: () => getTrendingPosts({ pageParam: 1 }),
    initialPageParam: 1,
  });

  // 2. Hydrate the Client Component with this data
  // The Feed component will have data immediately without any loading state
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VirtualizedFeed />
    </HydrationBoundary>
  );
}
