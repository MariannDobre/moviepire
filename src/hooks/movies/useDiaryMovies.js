import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getDiaryMovies } from './functions/getDiaryMovies';

// retrieves from supabase the viewed movies of each user and the sorted/filtered movies
export function useDiaryMovies(userId, genre, type, yearRange) {
  // const [searchParams] = useSearchParams();
  // const sortBy = searchParams.get('sortBy') || 'list_order';
  // const filterBy = searchParams.get('order') || 'asc';

  const {
    data: diaryMovies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['diaryMovies', userId, genre, type, yearRange],
    queryFn: () => getDiaryMovies(userId, genre, type, yearRange),
    enabled: !!userId,
  });

  return { diaryMovies, isFetching, error };
}
