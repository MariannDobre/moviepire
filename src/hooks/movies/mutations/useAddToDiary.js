import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMovieToDiary } from '../functions/addMovieToDiary';
import toast from 'react-hot-toast';

export function useAddToDiary(
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
    mutate: addToDiary,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      addMovieToDiary(
        userId,
        itemId,
        movieTitle,
        movieYear,
        movieDuration,
        movieRating,
        listOrder
      ),
    onSuccess: () => {
      toast.success(`${movieTitle} was added successfully to your diary.`);
      queryClient.invalidateQueries({
        queryKey: ['favoritesStatus', userId, itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ['diaryMovies', userId],
      });
    },
    onError: (error) =>
      toast.error(
        `An error occurred while adding ${movieTitle} to view list: ${error?.message}`
      ),
  });

  return { addToDiary, isPending, error };
}
