import { useQuery } from '@tanstack/react-query';
import { getRandomViewedMovies } from './functions/getRandomViewedMovies';

// retrieves back from supabase random movies from the view list category
export function useRandomViewedMovies(userId) {
  const {
    data: randomViewedMovies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['randomViewedMovies'],
    queryFn: () => getRandomViewedMovies(userId),
  });

  return { randomViewedMovies, isFetching, error };
}
