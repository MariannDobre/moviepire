import { useInfiniteQuery } from '@tanstack/react-query';
import { getDiaryMovies } from './functions/getDiaryMovies';

export function useDiaryMovies(userId, genre, type, yearRange) {
  const pageSize = 20;

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['diaryMovies', userId, genre, type, yearRange],
    queryFn: ({ pageParam = 0 }) =>
      getDiaryMovies(userId, genre, type, yearRange, pageParam, pageSize),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // cache for 2 minutes
  });

  const diaryMovies = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    diaryMovies,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  };
}
