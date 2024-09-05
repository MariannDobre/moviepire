import supabase from '../../../services/supabase';

// calls the supabase client to send back the viewed movies of each user and also sort and filter on the back end the values that are comming through sortBy and filterBy
export async function getViewedMovies(userId, sortBy, filterBy) {
  let query = supabase
    .from('favorites')
    .select(
      '*, movies(id, movieName, movieYear, movieDuration, moviePoster, movieDescription, movieGenre, movieDirector, movieStars, type)'
    )
    .eq('user_id', userId);

  if (sortBy === 'list_order') {
    query = query.order(sortBy, {
      ascending: filterBy === 'asc',
    });
  } else if (sortBy === 'alphabetical') {
    query = query.order(sortBy, { ascending: filterBy === 'asc' });
  } else if (sortBy === 'release_date') {
    query = query.order(sortBy, { ascending: filterBy === 'asc' });
  } else if (sortBy === 'runtime') {
    query = query.order(sortBy, { ascending: filterBy === 'asc' });
  } else if (sortBy === 'your_ratings') {
    query = query.order(sortBy, { ascending: filterBy === 'asc' });
  }

  const { data, error } = await query;

  if (error)
    throw new Error(
      `Cannot get the viewed movies for user: ${userId}\n
      Error: ${error.message}`
    );

  return data;
}
