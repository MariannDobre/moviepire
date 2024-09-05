import supabase from '../../../services/supabase';

// calls supabase client to get random movies based on the value of limit function
export async function getRandomMovies() {
  const { data, error } = await supabase
    .from('random_movies')
    .select('*')
    .limit(5);

  if (error)
    throw new Error(`Cannot get the required movies: ${error?.message}`);

  return data;
}
