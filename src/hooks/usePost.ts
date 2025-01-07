import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabase/supabaseClient';

interface QueryType {
  staleTime?: number;
  cacheTime?: number;
}

const DEFAULT_QUERY_OPTION: QueryType = {
  staleTime: 1000 * 60 * 60 * 24,
  cacheTime: 1000 * 60 * 60 * 24,
};

const fetchPost = async (sortLabel: string, sortOrder: boolean) => {
  const { data, error } = await supabase
    .from('post')
    .select('*')
    .order(sortLabel, { ascending: sortOrder });

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }

  return data;
};

export const usePost = <T>(
  queryKey: string,
  sortLabel: string = 'posting_date',
  sortOrder: boolean = true,
  queryOption: QueryType = DEFAULT_QUERY_OPTION,
) => {
  const { data, isLoading, error } = useQuery<any[]>({
    queryKey: [queryKey, sortLabel, sortOrder],
    queryFn: () => fetchPost(sortLabel, sortOrder),
    ...queryOption,
  });

  return { data, isLoading, error };
};
