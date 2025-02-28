import { supabase } from '../api/supabase/supabaseClient';
import { GotchaPostType } from '../types/gotchaPostType';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useProfileIdTestStore } from '../stores/useProfileIdTestStore';

interface QueryType {
  staleTime?: number;
  cacheTime?: number;
}

interface UseBookmarkPostType {
  queryKey: string;
  sortLabel?: string;
  sortOrder?: boolean;
  pageSize: number;
  queryOption?: QueryType;
}

const DEFAULT_QUERY_OPTION: QueryType = {
  staleTime: 1000 * 60 * 60 * 24,
  cacheTime: 1000 * 60 * 60 * 24,
};

const fetchPost = async (
  profile_id: string,
  sortLabel: string,
  sortOrder: boolean,
  pageParam: number,
  pageSize: number,
) => {
  const { data, error } = await supabase
    .from('bookmark' as any)
    .select('post, created_at')
    .eq('profile_id', `${profile_id}`)
    .order(sortLabel, { ascending: sortOrder })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return (
    data?.map(({ post, created_at }) => ({
      ...post,
      created_at,
    })) || []
  );
};

export const useBookmarkPost = ({
  queryKey = 'defaultKey',
  sortLabel = 'created_at',
  sortOrder = true,
  pageSize = 10,
  queryOption = DEFAULT_QUERY_OPTION,
}: UseBookmarkPostType) => {
  const profile_id = useProfileIdTestStore((state) => state.profile_id);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useSuspenseInfiniteQuery<GotchaPostType[]>({
    queryKey: [queryKey, sortLabel, sortOrder, pageSize],
    queryFn: ({ pageParam = 1 }) =>
      fetchPost(
        profile_id,
        sortLabel,
        sortOrder,
        pageParam as number,
        pageSize,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < pageSize ? undefined : allPages.length + 1;
    },
    ...queryOption,
  });

  return {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};
