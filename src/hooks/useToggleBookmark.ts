import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../api/supabase/supabaseClient';
import { GotchaPostType } from '../types/gotchaPostType';

const addFetch = async (
  post_id: string,
  profile_id: string,
  post: GotchaPostType,
) => {
  const { error } = await supabase.from('bookmark').insert({
    post_id: Number(post_id),
    profile_id: Number(profile_id),
    detail: post,
  });

  if (error) throw new Error(error.message);

  return post_id;
};

const deleteFetch = async (post_id: string) => {
  const { error } = await supabase
    .from('bookmark')
    .delete()
    .eq('post_id', post_id);

  if (error) throw new Error(error.message);

  return post_id;
};

export const useToggleBookmark = (
  post_id: string,
  profile_id: string,
  post: GotchaPostType,
) => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<string, Error, string>({
    mutationFn: () => addFetch(post_id, profile_id, post),
    meta: { type: 'delete-bookmark' },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
  const deleteMutation = useMutation<string, Error, string>({
    mutationFn: () => deleteFetch(post_id),
    meta: { type: 'add-bookmark' },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  return { addMutation, deleteMutation };
};
