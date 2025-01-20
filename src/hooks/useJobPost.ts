import { supabase } from '../api/supabase/supabaseClient';
import { PlatformPostType } from '../types/platformPostType';
import { transformPostFormat } from '../utils/transformPostFormat';
import { GotchaPostType } from '../types/gotchaPostType';
import { useInfiniteQuery } from '@tanstack/react-query';

interface QueryType {
  staleTime?: number;
  cacheTime?: number;
}

const DEFAULT_QUERY_OPTION: QueryType = {
  staleTime: 1000 * 60 * 60 * 24,
  cacheTime: 1000 * 60 * 60 * 24,
};

const transformPosts = (posts: PlatformPostType[]): GotchaPostType[] => {
  const transformed = posts.reduce<GotchaPostType[]>((acc, post) => {
    const transformPost = transformPostFormat(post);
    if (transformPost) acc.push(transformPost);
    return acc;
  }, []);
  return transformed;
};

const fetchPost = async (
  sortLabel: string,
  sortOrder: boolean,
  pageParam: number,
  pageSize: number,
) => {
  const { data, error } = await supabase
    .from('post' as any)
    .select('*')
    .order(sortLabel, { ascending: sortOrder })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return transformPosts(data) || [];
};

export const useJobPost = (
  queryKey: string,
  sortLabel: string = 'posting_date',
  sortOrder: boolean = true,
  pageSize: number,
  queryOption: QueryType = DEFAULT_QUERY_OPTION,
) => {
  // const { data, isLoading, error } = useQuery<GotchaPostType[]>({
  //   queryKey: [queryKey],
  //   queryFn: () => fetchPost(sortLabel, sortOrder),
  //   ...queryOption,
  // });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<GotchaPostType[]>({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) =>
      fetchPost(sortLabel, sortOrder, pageParam as number, pageSize),
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
