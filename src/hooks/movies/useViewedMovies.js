import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getViewedMovies } from './functions/getViewedMovies';

// retrieves from supabase the viewed movies of each user and the sorted/filtered movies
export function useViewedMovies(userId) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'list_order';
  const filterBy = searchParams.get('order') || 'asc';

  const {
    data: viewedMovies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['viewedMovies', userId, sortBy, filterBy],
    queryFn: () => getViewedMovies(userId, sortBy, filterBy),
  });

  return { viewedMovies, isFetching, error };
}
