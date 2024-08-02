import { useQuery } from '@tanstack/react-query';
import { get5RandomMovies } from '../services/apiMovies';

export function useCarouselMovies() {
  const {
    data: randomMovies,
    isPending,
    error,
  } = useQuery({
    queryKey: ['carouselMovies'],
    queryFn: () => get5RandomMovies(),
  });

  return { randomMovies, isPending, error };
}
