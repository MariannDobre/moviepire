import React from 'react';
import { useAddRating } from '../../hooks/movies/mutations/useAddRating';
import { useUpdateRating } from '../../hooks/movies/mutations/useUpdateRating';
import { useRemoveRating } from '../../hooks/movies/mutations/useRemoveRating';
import SmallLoader from '../loaders/SmallLoader';

const buttonsStyles =
  'w-44 py-1.5 px-6 text-stone-200 text-base tracking-wider bg-red-400 border-none outline-none cursor-pointer rounded-md shadow-lg hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 disabled:bg-neutral-950 disabled:text-gray-500/75 disabled:cursor-not-allowed transition-all duration-300';

function RateButton({
  rating,
  ratingId,
  setRating,
  ratingStatus,
  userId,
  movieId,
  movieTitle,
  viewedRecordId, // in teste, posibil optional posibil obligatoriu
}) {
  const { insertRating, isPending: isInserting } = useAddRating(
    userId,
    movieId,
    movieTitle,
    rating,
    setRating
  );

  const { modifyRating, isPending: isUpdating } = useUpdateRating(
    userId,
    movieId,
    movieTitle,
    rating,
    ratingId,
    setRating
  );

  const { deleteRating, isPending: isDeleting } = useRemoveRating(
    userId,
    movieId,
    movieTitle
  );

  return (
    <React.Fragment>
      {!ratingStatus[0] ? (
        <button
          className={buttonsStyles}
          type='button'
          onClick={() => insertRating()}
          disabled={!rating || isInserting}
        >
          {isInserting ? <SmallLoader /> : 'Rate Title'}
        </button>
      ) : (
        <div className='flex items-center justify-center gap-3'>
          <button
            className={buttonsStyles}
            type='button'
            onClick={() => modifyRating()}
            disabled={!rating || isUpdating}
          >
            {isUpdating ? <SmallLoader /> : 'Update Rating'}
          </button>

          <button
            className={buttonsStyles}
            type='button'
            onClick={() => deleteRating()}
            disabled={rating || isDeleting}
          >
            {isDeleting ? <SmallLoader /> : 'Delete Rating'}
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default RateButton;
