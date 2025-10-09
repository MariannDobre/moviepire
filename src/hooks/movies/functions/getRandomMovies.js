import supabase from '../../../services/supabase';

export async function getRandomMovies(limit, type) {
  let query = supabase.from('random_movies').select('*').limit(limit);

  if (type && type !== 'all movies') {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error)
    throw new Error(`Cannot get the required movies: ${error?.message}`);

  return data;
}
