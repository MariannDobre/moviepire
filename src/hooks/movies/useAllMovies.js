import { useQuery } from '@tanstack/react-query';
import { getAllMovies } from './functions/getAllMovies';

// retrieves all the records and the data of the movies
export function useAllMovies() {
  const {
    data: movies,
    isFetching: isGetting,
    error,
  } = useQuery({
    queryKey: ['allMovies'],
    queryFn: () => getAllMovies(),
  });

  return { movies, isGetting, error };
}
