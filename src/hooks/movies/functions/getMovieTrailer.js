import supabase from '../../../services/supabase';

// calls the supabase client to send back the data for the trailer page for the movie that matches the movieId parameter
export async function getMovieTrailer(movieId) {
  const { data, error } = await supabase
    .from('movies')
    .select(
      'movieName, movieYear, moviePoster, movieTrailer, movieGenre, movieDescription'
    )
    .eq('id', movieId)
    .single();

  if (error)
    throw new Error(
      `The data about this trailer could not be found: ${error?.message}`
    );

  return data;
}
