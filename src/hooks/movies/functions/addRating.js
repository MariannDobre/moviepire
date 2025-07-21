import supabase from '../../../services/supabase';

export async function addRating(userId, movieId, rating, favoriteRecordId) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .insert({ user_id: userId, item_id: movieId, ratings: rating });

  const { error: viewlistTableError } = await supabase
    .from('diary')
    .update({ your_ratings: rating })
    .eq('user_id', userId)
    .eq('item_id', movieId);
  // .eq('record_id', favoriteRecordId)

  if (ratingsTableError)
    throw new Error(
      `An error occurred while inserting the rating: ${ratingsTableError?.message}`
    );

  if (viewlistTableError)
    throw new Error(
      `An error occurred while inserting the rating in the favorites movies table: ${viewlistTableError?.message}`
    );
}
