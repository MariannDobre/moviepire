import React, { useState } from 'react';
// import {
//   useAddToFavorite,
//   useRemoveFromFavorite,
//   useStatus,
// } from '../../hooks/useAddToFavorites';
// import { useDeleteRating } from '../../hooks/useRating';
// import { useViewedMovies } from '../../hooks/useViewedMovies';
import { BsBookmarkPlusFill, BsBookmarkCheckFill } from 'react-icons/bs';
import SmallLoader from '../loaders/SmallLoader';
import { useMovieStatus } from '../../hooks/movies/useMovieStatus';
import { useViewedMovies } from '../../hooks/movies/useViewedMovies';
import { useAddToViewlist } from '../../hooks/movies/mutations/useAddToViewlist';
import { useRemoveFromViewlist } from '../../hooks/movies/mutations/useRemoveFromViewlist';
import { useRemoveRating } from '../../hooks/movies/mutations/useRemoveRating';

function AddToFavorite({
  userId,
  itemId,
  movieTitle,
  movieYear,
  movieDuration,
  movieRating,
}) {
  const { viewedStatus, isFetching } = useMovieStatus(userId, itemId);
  const status = viewedStatus[0]?.is_favorite
    ? viewedStatus[0]?.is_favorite
    : null;
  const listOrder = Date.now();
  const [isFavorite, setIsFavorite] = useState(status);
  const { viewedMovies } = useViewedMovies(userId);
  const { addToViewlist, isPending: isAdding } = useAddToViewlist(
    userId,
    itemId,
    movieTitle,
    movieYear,
    movieDuration,
    movieRating,
    listOrder
  );
  const { removeFromFavorites, isPending: isRemoving } = useRemoveFromViewlist(
    userId,
    itemId,
    movieTitle
  );

  const findFavoriteRecordId = viewedMovies.filter(
    (item) => item?.item_id === Number(itemId)
  );
  const favoriteRecordId = findFavoriteRecordId[0]?.record_id;
  const { deleteRating } = useRemoveRating(
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
      addToViewlist();
    }

    setIsFavorite(!status);
  }

  return (
    <>
      {isFetching ? (
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
