import { useQuery } from '@tanstack/react-query';
import { getLatestMovies } from './functions/getLatestMovies';

// retrieves from supabase all the movies from the current year
export function useLatestMovies() {
  const {
    data: latestMovies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['latestMovies'],
    queryFn: () => getLatestMovies(),
  });

  return { latestMovies, isFetching, error };
}
