import supabase from './supabase';

// Getting all movies/series
export async function getMoviesIds() {
  const { data, error } = await supabase.from('movies').select('id');

  if (error) throw new Error(`Cannot get the movies ids: ${error?.message}`);

  return data;
}

// Searching for a specific movie
export async function getMoviesByTitle(searchQuery) {
  const { data: movies, error } = await supabase
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

  return movies;
}

// Getting all the necessary data for the searched movie
export async function getMoviesDetails(movieId) {
  const { data: movieDetails, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', movieId)
    .single();

  if (error)
    throw new Error(`Movies details could not be found: ${error?.message}`);

  return movieDetails;
}

// Getting the trailer of a certain movie
export async function getMovieTrailer(movieId) {
  const { data: trailerData, error } = await supabase
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

  return trailerData;
}

// Getting the favorites movies
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

// Getting 5 random movies for the carousel component
export async function get5RandomMovies() {
  const { data, error } = await supabase
    .from('random_movies')
    .select('*')
    .limit(5);

  if (error)
    throw new Error(`Cannot get the required movies: ${error?.message}`);

  return data;
}

// Get featured items
export async function getFeaturedMovies() {
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

// Get random viewed movies for users
export async function getRandomViewedMovies(userId) {
  const { data, error } = await supabase
    .from('user_random_favorites')
    .select('*, movies(id, movieName, moviePoster)')
    .eq('user_id', userId);

  if (error)
    throw new Error(
      `Cannot get the viewed movies for rewatch: ${error?.message}`
    );

  return data;
}
