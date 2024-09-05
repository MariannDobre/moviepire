import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from './functions/getMovieDetails';

// retrieves back from supabase all the data for the movie that matches the movieId parameter
export function useMovieDetails(movieId) {
  const {
    data: movieDetails,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  return { movieDetails, isFetching, error };
}
