import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getRandomViewedMovies, getViewedMovies } from '../services/apiMovies';

export function useViewedMovies(userId) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'list_order';
  const filterBy = searchParams.get('order') || 'asc';

  const {
    data: viewedMovies,
    isPending,
    error,
  } = useQuery({
    queryKey: ['viewedMovies', userId, sortBy, filterBy],
    queryFn: () => getViewedMovies(userId, sortBy, filterBy),
  });

  return { viewedMovies, isPending, error };
}

export function useRandomViewedMovies(userId) {
  const {
    data: randomViewedMovies,
    isPending,
    error,
  } = useQuery({
    queryKey: ['randomViewedMovies'],
    queryFn: () => getRandomViewedMovies(userId),
  });

  return { randomViewedMovies, isPending, error };
}
