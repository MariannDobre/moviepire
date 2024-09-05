import supabase from '../../../services/supabase';

// calls the supabase client to update the current rating record of an item based on the ratingId, userId and itemId parameter
export async function updateRating(
  ratingId,
  rating,
  favoriteRecordId,
  userId,
  itemId
) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .update({ ratings: rating })
    .eq('id', ratingId);

  const { error: viewlistTableError } = await supabase
    .from('favorites')
    .update({ your_ratings: rating })
    .eq('record_id', favoriteRecordId)
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (ratingsTableError)
    throw new Error(
      `An error occurred while updating the rating: ${ratingsTableError?.message}`
    );

  if (viewlistTableError)
    throw new Error(
      `An error occurred while updating the rating in the favorites movies table: ${viewlistTableError?.message}`
    );
}
