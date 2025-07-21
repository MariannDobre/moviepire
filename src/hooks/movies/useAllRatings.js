import { useQuery } from '@tanstack/react-query';
import { getAllRatings } from './functions/getAllRatings';

export function useAllRatings(userId) {
  const {
    data: allRatings,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['allRatings', userId],
    queryFn: () => getAllRatings(userId),
    staleTime: 0,
    refetchOnMount: true,
  });

  return { allRatings, isFetching, error };
}
