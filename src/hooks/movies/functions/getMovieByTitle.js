import supabase from '../../../services/supabase';

// calls the supabase client to send back all the movies where their title match the searchQuery parameter
export async function getMovieByTitle(searchQuery) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .textSearch('movieName', searchQuery, {
      type: 'websearch',
      config: 'english',
    });

  if (error)
    throw new Error(
      `Cannot search the movies by their title: ${error?.message}}`
    );

  return data;
}
