import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addMovieToViewlist } from '../functions/addMovieToViewlist';

// let the user to add/insert a movie to the viewed category
export function useAddToViewlist(
  userId,
  itemId,
  movieTitle,
  movieYear,
  movieDuration,
  movieRating,
  listOrder
) {
  const queryClient = useQueryClient();

  const {
    mutate: addToViewlist,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      addMovieToViewlist(
        userId,
        itemId,
        movieTitle,
        movieYear,
        movieDuration,
        movieRating,
        listOrder
      ),
    onSuccess: () => {
      toast.success(`${movieTitle} was added successfully to view list.`);
      queryClient.invalidateQueries({
        queryKey: ['favoritesStatus', userId, itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ['viewedMovies', userId],
      });
    },
    onError: (error) =>
      toast.error(
        `An error occurred while adding ${movieTitle} to view list: ${error?.message}`
      ),
  });

  return { addToViewlist, isPending, error };
}
