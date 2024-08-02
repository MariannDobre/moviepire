import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '../services/supabase';
import toast from 'react-hot-toast';

// Helper functions
async function getRatings(userId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('id, item_id ,ratings')
    .eq('user_id', userId);

  if (error)
    throw new Error(
      `An error occurred while fetching the ratings: ${error?.message}`
    );

  return data;
}

async function handleInsertRating(userId, itemId, rating, favoriteRecordId) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .insert({ user_id: userId, item_id: itemId, ratings: rating });

  const { error: favoritesTableError } = await supabase
    .from('favorites')
    .update({ your_ratings: rating })
    .eq('record_id', favoriteRecordId)
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (ratingsTableError)
    throw new Error(
      `An error occurred while inserting the rating: ${ratingsTableError?.message}`
    );

  if (favoritesTableError)
    throw new Error(
      `An error occurred while inserting the rating in the favorites movies table: ${favoritesTableError?.message}`
    );
}

async function handleUpdateRating(
  ratingId,
  rating,
  favoriteRecordId,
  userId,
  itemId
) {
  const { error: ratingsTableError } = await supabase
    .from('ratings')
    .update({ ratings: rating })
    .eq('id', ratingId);

  const { error: favoritesTableError } = await supabase
    .from('favorites')
    .update({ your_ratings: rating })
    .eq('record_id', favoriteRecordId)
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (ratingsTableError)
    throw new Error(
      `An error occurred while updating the rating: ${ratingsTableError?.message}`
    );

  if (favoritesTableError)
    throw new Error(
      `An error occurred while updating the rating in the favorites movies table: ${favoritesTableError?.message}`
    );
}

async function handleDeleteRating(userId, itemId, favoriteRecordId) {
  const { data, error: ratingsTableError } = await supabase
    .from('ratings')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', itemId);

  const { error: favoritesTableError } = await supabase
    .from('favorites')
    .update({ your_ratings: 0 })
    .eq('record_id', favoriteRecordId)
    .eq('user_id', userId)
    .eq('item_id', itemId);

  if (ratingsTableError)
    throw new Error(
      `An error occurred while deleting the rating: ${ratingsTableError?.message}`
    );

  if (favoritesTableError)
    throw new Error(
      `An error occurred while deleting the rating in the favorites movies table: ${favoritesTableError?.message}`
    );

  return data;
}

// Main functions
export function useRating(userId, itemId) {
  const {
    data: dbRatings,
    isPending,
    error,
  } = useQuery({
    queryKey: ['ratings', userId, itemId],
    queryFn: () => getRatings(userId),
  });

  return { dbRatings, isPending, error };
}

export function useInsertRating(
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
    mutationFn: () =>
      handleInsertRating(userId, itemId, rating, favoriteRecordId),
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

export function useUpdateRating(
  ratingId,
  userId,
  itemId,
  rating,
  movieTitle,
  setRating,
  favoriteRecordId
) {
  const queryClient = useQueryClient();

  const {
    mutate: updateRating,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      handleUpdateRating(ratingId, rating, favoriteRecordId, userId, itemId),
    onSuccess: () => {
      toast.success(`The rating for: ${movieTitle}, was updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ['ratings', userId, itemId] });
      setRating(0);
    },
    onError: (error) =>
      toast.error(
        `An error occurred while updating the rating for ${movieTitle}: ${error?.message}`
      ),
  });

  return { updateRating, isPending, error };
}

export function useDeleteRating(userId, itemId, movieTitle, favoriteRecordId) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRating,
    isPending,
    error,
  } = useMutation({
    mutationFn: () => handleDeleteRating(userId, itemId, favoriteRecordId),
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
