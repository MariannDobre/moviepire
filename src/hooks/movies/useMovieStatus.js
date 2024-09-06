import { useQuery } from '@tanstack/react-query';
import { getViewedStatus } from './functions/getViewedStatus';
import { useUser } from '../auth/useUser';

// retrieves back from supabase the viewed status of each movie
export function useMovieStatus(userId, itemId) {
  const { isAuthenticated } = useUser();
  const getUserId = isAuthenticated ? userId : null;

  const {
    data: viewedStatus,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getViewedStatus(userId, itemId),
    queryKey: ['favoritesStatus', userId, itemId],
  });

  // const status = isAuthenticated ? viewedStatus : null;
  // const gettingStatus = isAuthenticated ? isFetching : null;
  // const statusError = isAuthenticated ? error : null;

  return { viewedStatus, isFetching, error };
}
