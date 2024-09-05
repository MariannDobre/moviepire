import supabase from '../../../services/supabase';

// calls the supabase client to send back random movies from the view list category
export async function getRandomViewedMovies(userId) {
  const { data, error } = await supabase
    .from('user_random_favorites')
    .select('*, movies(id, movieName, moviePoster)')
    .eq('user_id', userId);

  if (error)
    throw new Error(
      `Cannot get the viewed movies for rewatch: ${error?.message}`
    );

  return data;
}
