import { useQuery } from '@tanstack/react-query';
import { getMovieTrailer } from '../services/apiMovies';

export function useTrailer(titleName) {
  const {
    data: trailerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['trailerData', titleName],
    queryFn: () => getMovieTrailer(titleName),
  });

  return { trailerData, isLoading, error };
}
