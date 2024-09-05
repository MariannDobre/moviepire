import supabase from '../../../services/supabase';

// calls the supabase client to send back all the data for the movie that match the movieId parameter
export async function getMovieDetails(movieId) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', movieId)
    .single();

  if (error)
    throw new Error(`Movies details could not be found: ${error?.message}`);

  return data;
}
