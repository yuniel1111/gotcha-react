import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const defaultQueryOption = {
  staleTime: 1000 * 60 * 60 * 24,
  cacheTime: 1000 * 60 * 60 * 24,
};

const fetchPost = async (url: string) => {
  const res = await axios.get(url);
  const posts = res.data;

  return posts;
};

export const usePost = (url: string, queryOption = defaultQueryOption) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [url],
    queryFn: () => fetchPost(url),
    ...queryOption,
  });

  return { data, isLoading, error };
};
