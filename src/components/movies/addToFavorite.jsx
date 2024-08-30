import React, { useState } from 'react';
import {
  useAddToFavorite,
  useRemoveFromFavorite,
  useStatus,
} from '../../hooks/useAddToFavorites';
import { useDeleteRating } from '../../hooks/useRating';
import { useViewedMovies } from '../../hooks/useViewedMovies';
import { BsBookmarkPlusFill, BsBookmarkCheckFill } from 'react-icons/bs';
import SmallLoader from '../loaders/SmallLoader';

function AddToFavorite({
  userId,
  itemId,
  movieTitle,
  movieYear,
  movieDuration,
  movieRating,
}) {
  const { favoritesStatus, isPending: isGetting } = useStatus(userId, itemId);
  const status = favoritesStatus[0]?.is_favorite
    ? favoritesStatus[0]?.is_favorite
    : null;
  const listOrder = Date.now();
  const [isFavorite, setIsFavorite] = useState(status);
  const { viewedMovies } = useViewedMovies(userId);
  const { addToFavorites, isPending: isAdding } = useAddToFavorite(
    userId,
    itemId,
    movieTitle,
    movieYear,
    movieDuration,
    movieRating,
    listOrder
  );
  const { removeFromFavorites, isPending: isRemoving } = useRemoveFromFavorite(
    userId,
    itemId,
    movieTitle
  );

  const findFavoriteRecordId = viewedMovies.filter(
    (item) => item?.item_id === Number(itemId)
  );
  const favoriteRecordId = findFavoriteRecordId[0]?.record_id;
  const { deleteRating } = useDeleteRating(
    userId,
    itemId,
    movieTitle,
    favoriteRecordId
  );

  function handleToggleStatus() {
    if (status) {
      removeFromFavorites();
      deleteRating();
    } else {
      addToFavorites();
    }

    setIsFavorite(!status);
  }

  return (
    <>
      {isGetting ? (
        <SmallLoader />
      ) : (
        <button onClick={handleToggleStatus}>
          {status ? (
            <>
              {isRemoving ? (
                <SmallLoader />
              ) : (
                <BsBookmarkCheckFill
                  style={{ color: status ? '#fab005' : '' }}
                />
              )}
            </>
          ) : (
            <>{isAdding ? <SmallLoader /> : <BsBookmarkPlusFill />}</>
          )}
        </button>
      )}
    </>
  );
}

export default AddToFavorite;
