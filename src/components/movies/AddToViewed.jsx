import React from 'react';
import { useAddToViewlist } from '../../hooks/movies/mutations/useAddToViewlist';
import { useRatings } from '../../hooks/movies/useRatings';
import { useUser } from '../../hooks/auth/useUser';
import { useMovieStatus } from '../../hooks/movies/useMovieStatus';
import SmallLoader from '../loaders/SmallLoader';
import { useRemoveFromViewlist } from '../../hooks/movies/mutations/useRemoveFromViewlist';

function AddToViewed({ movieId, movieTitle, movieYear, movieDuration }) {
  // custom hook call to get the user
  const { user } = useUser();
  // custom hook call to get the ratings
  const { ratings } = useRatings(user?.id, movieId);
  // custom hook call to get the status of the movie, either is viewed either not
  const { viewedStatus } = useMovieStatus(user?.id, movieId);

  // derived state to find the rating of the current displayed movie
  const findCurrentRating = ratings.filter(
    (item) => item.item_id === Number(movieId)
  );
  const movieRating =
    findCurrentRating.length > 0 ? findCurrentRating[0]?.ratings : 0;
  // derived state to find if the movie is viewed or not
  const status = viewedStatus[0]?.is_favorite
    ? viewedStatus[0]?.is_favorite
    : null;
  // pass the current date for the sort feature
  const listOrder = Date.now();

  // custom hook call to add the movie to the view list
  const { addToViewlist, isPending: isAdding } = useAddToViewlist(
    user?.id,
    movieId,
    movieTitle,
    movieYear,
    movieDuration,
    movieRating,
    listOrder
  );

  // custom hook call to remove the movie to the view list
  const { removeFromFavorites, isPending: isRemoving } = useRemoveFromViewlist(
    user?.id,
    movieId,
    movieTitle
  );

  // handler function to toggle the status of the movie, either is viewed either not
  function toggleStatus() {
    if (status) {
      removeFromFavorites();
    } else {
      addToViewlist();
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <h1 className='text-lg text-stone-200 tracking-wide'>
        Do you want to {status ? 'remove' : 'add'}&nbsp;{movieTitle}&nbsp;
        {status ? 'from' : 'to'} the viewlist?
      </h1>

      <button
        onClick={() => toggleStatus()}
        className='w-44 py-1.5 px-6 text-stone-200 text-base tracking-wider bg-red-400 border-none outline-none cursor-pointer rounded-md shadow-lg hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 disabled:bg-neutral-950 disabled:text-gray-500/75 disabled:cursor-not-allowed transition-all duration-300'
        disabled={isAdding || isRemoving}
      >
        {isAdding || isRemoving ? (
          <SmallLoader />
        ) : status ? (
          'Remove Title'
        ) : (
          'Add Title'
        )}
      </button>

      <p className='text-sm text-stone-400 tracking-wide'>
        <span className='font-bold'>Status:&nbsp;</span>
        {status ? 'title viewed' : 'title unviewed'}
      </p>
    </div>
  );
}

export default AddToViewed;
