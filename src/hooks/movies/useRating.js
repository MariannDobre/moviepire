import { useQuery } from '@tanstack/react-query';
import { getRating } from './functions/getRating';

export function useRating(userId, movieId) {
  const {
    data: rating,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['ratings', userId, movieId],
    queryFn: () => getRating(userId, movieId),
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!userId && !!movieId,
  });

  return { rating, isFetching, error };
}
