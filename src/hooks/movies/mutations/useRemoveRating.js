import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeRating } from '../functions/removeRating';

// let the user to delete their rating
export function useRemoveRating(userId, itemId, movieTitle, favoriteRecordId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRating,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => removeRating(userId, itemId, favoriteRecordId),
    onSuccess: () => {
      toast.success(`The rating for: ${movieTitle}, was deleted successfully.`);
      queryClient.invalidateQueries({ queryKey: ['ratings', userId, itemId] });
    },
    onError: (error) =>
      toast.error(
        `An error occurred while deleting the rating for ${movieTitle}: ${error?.message}`
      ),
  });

  return { deleteRating, isPending, error };
}
