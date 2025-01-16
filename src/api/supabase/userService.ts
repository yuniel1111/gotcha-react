import { supabase } from './supabaseClient';

export const getUserProfile = async (profileId: string) => {
  const { data } = await supabase
    .from('profile')
    .select(
      'profile_id, email, name, created_at, updated_at, is_deleted, phone',
    )
    .eq('profile_id', profileId)
    .single();

  return data;
};
