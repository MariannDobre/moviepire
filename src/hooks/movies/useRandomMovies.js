import { useQuery } from '@tanstack/react-query';
import { getRandomMovies } from './functions/getRandomMovies';

// retrieves back from supabase random movies
export function useRandomMovies() {
  const {
    data: randomMovies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['sliderMovies'],
    queryFn: () => getRandomMovies(),
  });

  return { randomMovies, isFetching, error };
}
