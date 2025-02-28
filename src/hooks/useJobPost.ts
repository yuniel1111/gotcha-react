import { supabase } from '../api/supabase/supabaseClient';
import { PlatformPostType } from '../types/platformPostType';
import { transformPostFormat } from '../utils/transformPostFormat';
import { GotchaPostType } from '../types/gotchaPostType';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useProfileIdTestStore } from '../stores/useProfileIdTestStore';

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

const fetchBookmarkedPostId = async (profile_id: string) => {
  const { data, error } = await supabase
    .from('bookmark')
    .select('post_id')
    .eq('profile_id', profile_id);

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return new Set(data.map((bookmark) => bookmark.post_id));
};

const fetchPost = async (
  profile_id: string,
  sortLabel: string,
  sortOrder: boolean,
  pageParam: number,
  pageSize: number,
) => {
  if (!profile_id) {
    throw new Error('Profile ID is required');
  }
  const postIdList = await fetchBookmarkedPostId(profile_id);

  const { data, error } = await supabase
    .from('post' as any)
    .select('*')
    .order(sortLabel, { ascending: sortOrder })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  const posts = data
    ? data.map((post) => ({
        ...post,
        isBookmarked: postIdList.has(post.post_id),
      }))
    : [];

  return transformPosts(posts);
};

export const useJobPost = (
  queryKey: string,
  sortLabel: string = 'posting_date',
  sortOrder: boolean = true,
  pageSize: number,
  queryOption: QueryType = DEFAULT_QUERY_OPTION,
) => {
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
