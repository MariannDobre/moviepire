import supabase from '../../../services/supabase';

// calls the supabase client to send back all the movies from the current year
export async function getLatestMovies() {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .gte('movieYear', 2024);

  if (error)
    throw new Error(
      `Cannot get the featured this year movies: ${error?.message}`
    );

  return data;
}
