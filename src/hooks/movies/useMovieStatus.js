import { useQuery } from '@tanstack/react-query';
import { getViewedStatus } from './functions/getViewedStatus';

// retrieves back from supabase the viewed status of each movie
export function useMovieStatus(userId, itemId) {
  const {
    data: viewedStatus,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getViewedStatus(userId, itemId),
    queryKey: ['favoritesStatus', userId, itemId],
  });

  return { viewedStatus, isFetching, error };
}
