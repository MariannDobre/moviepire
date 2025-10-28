import { useQuery } from '@tanstack/react-query';
import { getMovieByTitle } from './functions/getMovieByTitle';

export function useMovieByTitle(searchQuery) {
  const shouldFetch = Boolean(searchQuery?.length >= 3);

  const {
    data: movies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => getMovieByTitle(searchQuery),
    enabled: shouldFetch,
  });

  return { movies, isFetching, error };
}
