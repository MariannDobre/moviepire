import supabase from '../../../services/supabase';

// calls the supabase client to create a new record for a successfull insertion of a rating
export async function addRating(userId, itemId, rating, favoriteRecordId) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .insert({ user_id: userId, item_id: itemId, ratings: rating });

  const { error: viewlistTableError } = await supabase
    .from('favorites')
    .update({ your_ratings: rating })
    .eq('user_id', userId)
    .eq('item_id', itemId);
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
