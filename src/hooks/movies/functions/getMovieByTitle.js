import supabase from '../../../services/supabase';

export async function getMovieByTitle(searchQuery) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .ilike('movieName', `%${searchQuery}%`);
  // .textSearch('movieName', searchQuery, {
  //   type: 'websearch',
  //   config: 'english',
  // });

  if (error)
    throw new Error(
      `Cannot search the movies by their title: ${error?.message}}`
    );

  return data;
}
