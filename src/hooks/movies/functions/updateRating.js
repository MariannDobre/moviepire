import supabase from '../../../services/supabase';

export async function updateRating(
  userId,
  movieId,
  rating,
  ratingId,
  favoriteRecordId
) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .update({ ratings: rating })
    .eq('id', ratingId);

  const { error: viewlistTableError } = await supabase
    .from('diary')
    .update({ your_ratings: rating })
    .eq('user_id', userId)
    .eq('item_id', movieId);
  // .eq('record_id', favoriteRecordId)

  if (ratingsTableError)
    throw new Error(
      `An error occurred while updating the rating: ${ratingsTableError?.message}`
    );

  if (viewlistTableError)
    throw new Error(
      `An error occurred while updating the rating in the favorites movies table: ${viewlistTableError?.message}`
    );
}
