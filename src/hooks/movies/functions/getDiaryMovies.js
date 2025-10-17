import supabase from '../../../services/supabase';

export async function getDiaryMovies(
  userId,
  genre,
  type,
  yearRange,
  pageIndex = 0,
  pageSize = 10
) {
  let query = supabase
    .from('diary')
    .select(
      '*, movies(id, movieName, movieYear, movieDuration, moviePoster, movieDescription, movieGenre, movieDirector, movieStars, type, imdbRating)',
      { count: 'exact' }
    )
    .eq('user_id', userId)
    .not('movies', 'is', null)
    .order('created_at', { ascending: true }) // oldest first
    .range(pageIndex * pageSize, pageIndex * pageSize + pageSize - 1);

  if (genre && genre !== 'All Genres') {
    query = query.contains('movies.movieGenre', [genre]);
  }

  if (type && type !== 'All Types') {
    query = query.eq('movies.type', type);
  }

  if (
    typeof yearRange === 'object' &&
    yearRange.startYear &&
    yearRange.endYear
  ) {
    query = query
      .gte('movies.movieYear', yearRange.startYear)
      .lte('movies.movieYear', yearRange.endYear);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(`Failed to fetch diary movies\n${error.message}`);

  return {
    data,
    count,
    nextPage: data.length === pageSize ? pageIndex + 1 : null,
  };
}
