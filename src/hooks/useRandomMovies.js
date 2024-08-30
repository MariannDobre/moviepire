import { useQuery } from '@tanstack/react-query';
import { get5RandomMovies } from '../services/apiMovies';

export function useRandomMovies() {
  const {
    data: randomMovies,
    isPending,
    error,
  } = useQuery({
    queryKey: ['sliderMovies'],
    queryFn: () => get5RandomMovies(),
  });

  return { randomMovies, isPending, error };
}
