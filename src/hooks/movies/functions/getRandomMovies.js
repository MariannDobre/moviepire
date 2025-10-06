import supabase from '../../../services/supabase';

export async function getRandomMovies() {
  const { data, error } = await supabase
    .from('random_movies')
    .select('*')
    .limit(12);

  if (error)
    throw new Error(`Cannot get the required movies: ${error?.message}`);

  return data;
}
