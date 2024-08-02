import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '../services/supabase';
import toast from 'react-hot-toast';

// Helper functions
async function getFavoriteStatus(userId, itemId) {
  const { data, error } = await supabase
    .from('favorites')
    .select('is_favorite')
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (error)
    throw new Error('An error occurred while fetching the status of the item.');

  return data;
}

async function handleAddToFavorite(
  userId,
  itemId,
  movieTitle,
  movieYear,
  movieDuration,
  movieRating,
  listOrder
) {
  const { data, error } = await supabase.from('favorites').insert({
    user_id: userId,
    item_id: itemId,
    is_favorite: true,
    alphabetical: movieTitle,
    release_date: movieYear,
    runtime: movieDuration,
    your_ratings: movieRating === 0 ? 0 : movieRating,
    list_order: listOrder,
  });

  if (error)
    throw new Error('An error occurred while adding the item to view list.');

  return data;
}

async function handleRemoveFromFavorite(userId, itemId) {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (error)
    throw new Error('An error occured while removing the item from view list.');

  return data;
}

// Main functions
export function useStatus(userId, itemId) {
  const {
    data: favoritesStatus,
    isPending,
    error,
  } = useQuery({
    queryFn: () => getFavoriteStatus(userId, itemId),
    queryKey: ['favoritesStatus', userId, itemId],
  });

  return { favoritesStatus, isPending, error };
}

export function useAddToFavorite(
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
    mutate: addToFavorites,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      handleAddToFavorite(
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

  return { addToFavorites, isPending, error };
}

export function useRemoveFromFavorite(userId, itemId, movieTitle) {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromFavorites,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => handleRemoveFromFavorite(userId, itemId),
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

  return { removeFromFavorites, isPending, error };
}
