import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { handleRemoveFromViewlist } from '../functions/removeMovieFromViewlist';

// let the user to remove the movie from the viewed category
export function useRemoveFromViewlist(userId, itemId, movieTitle) {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromViewlist,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => handleRemoveFromViewlist(userId, itemId),
    onSuccess: () => {
      toast.success(`${movieTitle} was removed successfully from view list.`);
      queryClient.invalidateQueries({
        queryKey: ['favoritesStatus', userId, itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ['viewedMovies', userId],
      });
    },
    onError: (error) =>
      toast.error(
        `An error occurred while removing ${movieTitle} from view list: ${error?.message}`
      ),
  });

  return { removeFromViewlist, isPending, error };
}
