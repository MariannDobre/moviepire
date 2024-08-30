import { useQuery } from '@tanstack/react-query';
import { getMovieTrailer } from '../services/apiMovies';

export function useTrailer(movieId) {
  const {
    data: trailerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trailerData', movieId],
    queryFn: () => getMovieTrailer(movieId),
  });

  return { trailerData, isLoading, error };
}
