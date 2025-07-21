import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeRating } from '../functions/removeRating';
import toast from 'react-hot-toast';

export function useRemoveRating(userId, movieId, movieTitle) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRating,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => removeRating(userId, movieId),
    onSuccess: () => {
      toast.success(`The rating for: ${movieTitle}, was deleted successfully.`);
      queryClient.invalidateQueries({ queryKey: ['ratings', userId, movieId] });
    },
    onError: (error) =>
      toast.error(
        `An error occurred while deleting the rating for ${movieTitle}: ${error?.message}`
      ),
  });

  return { deleteRating, isPending, error };
}
