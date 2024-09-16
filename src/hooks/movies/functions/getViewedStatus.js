import supabase from '../../../services/supabase';

// calls the supabase client to send back the viewed status of each movie
export async function getViewedStatus(userId, itemId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('is_favorite')
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (error)
    throw new Error('An error occurred while fetching the status of the item.');

  return data;
}
