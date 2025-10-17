import supabase from '../../../services/supabase';

export async function getRating(userId, movieId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('id, item_id, ratings')
    .eq('user_id', userId)
    .eq('item_id', movieId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116')
    throw new Error(
      `An error occurred while fetching the ratings: ${error?.message}`
    );

  return data;
}
