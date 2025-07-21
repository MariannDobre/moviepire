import supabase from '../../../services/supabase';

export async function handleRemoveFromDiary(userId, itemId) {
  const { data, error } = await supabase
    .from('diary')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (error)
    throw new Error(
      'An error occured while removing the item from the view list.'
    );

  return data;
}
