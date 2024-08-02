import { useQuery } from '@tanstack/react-query';
import { getMoviesByTitle } from '../services/apiMovies';

export function useMoviesByTitle(searchQuery) {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => getMoviesByTitle(searchQuery),
  });

  return { movies, isLoading, error };
}
