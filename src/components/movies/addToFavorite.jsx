import React, { useState } from 'react';
import {
  useAddToFavorite,
  useRemoveFromFavorite,
  useStatus,
} from '../../hooks/useAddToFavorites';
import { useDeleteRating } from '../../hooks/useRating';
import { useViewedMovies } from '../../hooks/useViewedMovies';

import styled from 'styled-components';

import { BsBookmarkPlusFill, BsBookmarkCheckFill } from 'react-icons/bs';
import MiniLoader from '../loaders/miniLoader';

const FavoriteButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    --height-12: 4.8rem;
    --font-8: 3.2rem;

    height: var(--height-12);
    font-size: var(--font-8);
    color: var(--color-gray-dark);
  }

  &:hover {
    svg {
      color: var(--color-gray-light);
    }
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

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
        <MiniLoader />
      ) : (
        <FavoriteButton onClick={handleToggleStatus}>
          {status ? (
            <>
              {isRemoving ? (
                <MiniLoader />
              ) : (
                <BsBookmarkCheckFill
                  style={{ color: status ? '#fab005' : '' }}
                />
              )}
            </>
          ) : (
            <>{isAdding ? <MiniLoader /> : <BsBookmarkPlusFill />}</>
          )}
        </FavoriteButton>
      )}
    </>
  );
}

export default AddToFavorite;
