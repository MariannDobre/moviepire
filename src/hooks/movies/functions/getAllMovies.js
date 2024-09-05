import supabase from '../../../services/supabase';

// calls the supabase client to send back all the movies
export async function getAllMovies() {
  const { data, error } = await supabase.from('movies').select('*');

  if (error)
    throw new Error(
      `Cannot get the movies from the database: ${error?.message}`
    );

  return data;
}
