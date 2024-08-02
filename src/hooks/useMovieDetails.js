import { useQuery } from '@tanstack/react-query';
import { getMoviesDetails } from '../services/apiMovies';

export function useMovieDetails(movieId) {
  const {
    data: movieDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMoviesDetails(movieId),
  });

  return { movieDetails, isLoading, error };
}
