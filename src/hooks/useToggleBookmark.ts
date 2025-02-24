import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../api/supabase/supabaseClient';
import { GotchaPostType } from '../types/gotchaPostType';

const addFetch = async (
  post_id: string,
  profile_id: string,
  post: GotchaPostType,
) => {
  const { error } = await supabase.from('bookmark').insert([
    {
      post_id,
      profile_id,
      post,
    },
  ]);

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

  const addMutation = useMutation({
    mutationFn: () => addFetch(post_id, profile_id, post),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', profile_id] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteFetch(post_id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', profile_id] });
    },
  });

  return { addMutation, deleteMutation };
};
