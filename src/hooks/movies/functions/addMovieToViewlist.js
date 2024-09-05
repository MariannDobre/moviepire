import supabase from '../../../services/supabase';

// calls the supabase client to create a new record for the insertion of a movie in the viewed category
export async function addMovieToViewlist(
  userId,
  itemId,
  movieTitle,
  movieYear,
  movieDuration,
  movieRating,
  listOrder
) {
  const { data, error } = await supabase.from('favorites').insert({
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
