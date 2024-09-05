import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addRating } from '../functions/addRating';

// let the user to add/insert a rating for his viewed movie
export function useAddRating(
  userId,
  itemId,
  rating,
  movieTitle,
  setRating,
  favoriteRecordId
) {
  const queryClient = useQueryClient();

  const {
    mutate: insertRating,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => addRating(userId, itemId, rating, favoriteRecordId),
    onSuccess: () => {
      toast.success(`The rating for: ${movieTitle}, was added successfully.`);
      queryClient.invalidateQueries({
        queryKey: ['ratings', userId, itemId],
      });
      setRating(0);
    },
    onError: (error) =>
      toast.error(
        `An error occurred while adding the rating for ${movieTitle}: ${error?.message}`
      ),
  });

  return { insertRating, isPending, error };
}
