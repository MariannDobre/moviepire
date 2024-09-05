import { useQuery } from '@tanstack/react-query';
import { getRatings } from './functions/getRatings';

// retrieves back from supabase the ratings records of each user
export function useRatings(userId, itemId) {
  const {
    data: ratings,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['ratings', userId, itemId],
    queryFn: () => getRatings(userId),
  });

  return { ratings, isFetching, error };
}
