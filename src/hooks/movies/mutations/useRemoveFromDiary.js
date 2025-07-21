import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleRemoveFromDiary } from '../functions/removeMovieFromDiary';
import toast from 'react-hot-toast';

export function useRemoveFromDiary(userId, itemId, movieTitle) {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromDiary,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => handleRemoveFromDiary(userId, itemId),
    onSuccess: () => {
      toast.success(`${movieTitle} was removed successfully from your diary.`);
      queryClient.invalidateQueries({
        queryKey: ['favoritesStatus', userId, itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ['diaryMovies', userId],
      });
    },
    onError: (error) =>
      toast.error(
        `An error occurred while removing ${movieTitle} from view list: ${error?.message}`
      ),
  });

  return { removeFromDiary, isPending, error };
}
