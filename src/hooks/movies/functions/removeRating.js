import supabase from '../../../services/supabase';

// calls the supabase ratings table to remove the record based on the userId and itemId parameter
export async function removeRating(userId, itemId, favoriteRecordId) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', itemId);

  const { error: viewlistTableError } = await supabase
    .from('favorites')
    .update({ your_ratings: 0 })
    .eq('record_id', favoriteRecordId)
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (ratingsTableError)
    throw new Error(
      `An error occurred while deleting the rating: ${ratingsTableError?.message}`
    );

  if (viewlistTableError)
    throw new Error(
      `An error occurred while deleting the rating in the favorites movies table: ${viewlistTableError?.message}`
    );
}
