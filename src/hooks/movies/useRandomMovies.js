import { useQuery } from '@tanstack/react-query';
import { getRandomMovies } from './functions/getRandomMovies';

// retrieves back from supabase random movies
export function useRandomMovies(limit, type) {
  const {
    data: randomMovies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['what-to-watch', limit, type],
    queryFn: () => getRandomMovies(limit, type),
  });

  return { randomMovies, isFetching, error };
}
