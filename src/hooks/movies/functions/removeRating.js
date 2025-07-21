import supabase from '../../../services/supabase';

export async function removeRating(userId, movieId) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', movieId);

  const { error: viewlistTableError } = await supabase
    .from('diary')
    .update({ your_ratings: 0 })
    .eq('user_id', userId)
    .eq('item_id', movieId);

  if (ratingsTableError)
    throw new Error(
      `An error occurred while deleting the rating: ${ratingsTableError?.message}`
    );

  if (viewlistTableError)
    throw new Error(
      `An error occurred while deleting the rating in the favorites movies table: ${viewlistTableError?.message}`
    );
}
