import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateRating } from '../functions/updateRating';

// let the user to update their current rating
export function useUpdateRating(
  userId,
  movieId,
  movieTitle,
  rating,
  ratingId,
  setRating
) {
  const queryClient = useQueryClient();

  const {
    mutate: modifyRating,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => updateRating(userId, movieId, rating, ratingId),
    onSuccess: () => {
      toast.success(`The rating for: ${movieTitle}, was updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ['ratings', userId, movieId] });
      setRating(0);
    },
    onError: (error) =>
      toast.error(
        `An error occurred while updating the rating for ${movieTitle}: ${error?.message}`
      ),
  });

  return { modifyRating, isPending, error };
}
