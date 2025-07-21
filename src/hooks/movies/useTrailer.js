import { useQuery } from '@tanstack/react-query';
import { getMovieTrailer } from './functions/getMovieTrailer';

// retrieves from supabase data for trailer page where the movie matches the movieId parameter
export function useTrailer(movieId) {
  const {
    data: trailerData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['trailerData', movieId],
    queryFn: () => getMovieTrailer(movieId),
  });

  return { trailerData, isFetching, error };
}
