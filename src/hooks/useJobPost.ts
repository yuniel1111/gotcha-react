import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabase/supabaseClient';
import { PlatformPostType } from '../types/platformPostType';
import { transformPostFormat } from '../utils/transformPostFormat';
import { GotchaPostType } from '../types/gotchaPostType';

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

const fetchPost = async (sortLabel: string, sortOrder: boolean) => {
  const { data, error } = await supabase
    .from('post' as any)
    .select('*')
    .order(sortLabel, { ascending: sortOrder });

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return transformPosts(data) || [];
};

export const useJobPost = (
  queryKey: string,
  sortLabel: string = 'posting_date',
  sortOrder: boolean = true,
  queryOption: QueryType = DEFAULT_QUERY_OPTION,
) => {
  const { data, isLoading, error } = useQuery<GotchaPostType[]>({
    queryKey: [queryKey],
    queryFn: () => fetchPost(sortLabel, sortOrder),
    ...queryOption,
  });

  return { data, isLoading, error };
};
