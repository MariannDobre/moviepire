import { useQuery } from '@tanstack/react-query';
import { getMovieByTitle } from './functions/getMovieByTitle';

// retrieves back from supabase movies where their titles match the searchQuery parameter
export function useMovieByTitle(searchQuery) {
  const {
    data: movies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => getMovieByTitle(searchQuery),
  });

  return { movies, isFetching, error };
}
