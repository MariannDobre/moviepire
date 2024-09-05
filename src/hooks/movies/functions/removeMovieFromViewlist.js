import supabase from '../../../services/supabase';

// calls the supabase client to delete the viewed movie based on the userId and itemId parameter
export async function handleRemoveFromViewlist(userId, itemId) {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (error)
    throw new Error(
      'An error occured while removing the item from the view list.'
    );

  return data;
}
