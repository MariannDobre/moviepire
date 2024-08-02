import { useQuery } from '@tanstack/react-query';
import { getFeaturedMovies } from '../services/apiMovies';

export function useFeaturedMovies() {
  const { data, isPending, error } = useQuery({
    queryKey: ['featuredMovies'],
    queryFn: () => getFeaturedMovies(),
  });

  return { data, isPending, error };
}
