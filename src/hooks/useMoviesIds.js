import { useQuery } from '@tanstack/react-query';
import { getMoviesIds } from '../services/apiMovies';

export function useMoviesIds() {
  const {
    data: moviesIds,
    isPending,
    error,
  } = useQuery({
    queryKey: ['moviesIds'],
    queryFn: () => getMoviesIds(),
  });

  return { moviesIds, isPending, error };
}
