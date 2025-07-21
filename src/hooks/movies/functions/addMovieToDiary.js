import supabase from '../../../services/supabase';

export async function addMovieToDiary(
  userId,
  itemId,
  movieTitle,
  movieYear,
  movieDuration,
  movieRating,
  listOrder
) {
  const { data, error } = await supabase.from('diary').insert({
    user_id: userId,
    item_id: itemId,
    is_favorite: true,
    alphabetical: movieTitle,
    release_date: movieYear,
    runtime: movieDuration,
    your_ratings: movieRating === 0 ? 0 : movieRating,
    list_order: listOrder,
  });

  if (error)
    throw new Error(
      'An error occurred while adding the item to the view list.'
    );

  return data;
}
