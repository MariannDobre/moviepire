import React from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { useRating } from '../../hooks/movies/useRating';

export default function MovieDetails({
  movieId,
  movieBudget,
  movieRuntime,
  movieYear,
  imdbRating,
}) {
  const { user, isAuthenticated } = useUser();
  const { rating } = useRating(user?.id, movieId);

  // const currentRatingData = ratings?.find(
  //   (item) => item.item_id === Number(movieId)
  // );
  const yourRating = rating?.ratings || 0;

  return (
    <div className='w-1/4 h-full p-6 border border-neutral-500 rounded-lg shadow-sm flex flex-col gap-3 items-start justify-start'>
      <h6 className='text-start text-lg text-white font-medium tracking-wide'>
        Movie Details
      </h6>

      <div className='w-full h-auto flex flex-col gap-2'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-base text-gray-400 font-normal tracking-wide'>
            Budget:
          </p>

          <span className='text-base text-white font-normal tracking-wide'>
            {movieBudget ? movieBudget : 'No record found'}
          </span>
        </div>

        <div className='w-full flex items-center justify-between'>
          <p className='text-base text-gray-400 font-normal tracking-wide'>
            Runtime:
          </p>

          <span className='text-base text-white font-normal tracking-wide'>
            {movieRuntime}&nbsp;minutes
          </span>
        </div>

        <div className='w-full flex items-center justify-between'>
          <p className='text-base text-gray-400 font-normal tracking-wide'>
            Release Year:
          </p>

          <span className='text-base text-white font-normal tracking-wide'>
            {movieYear}
          </span>
        </div>

        <div className='w-full flex items-center justify-between'>
          <p className='text-base text-gray-400 font-normal tracking-wide'>
            IMDb Rating:
          </p>

          <span className='text-base text-white font-normal tracking-wide'>
            {imdbRating ? `${imdbRating}/10` : 'No record found'}
          </span>
        </div>

        <div className='w-full flex items-center justify-between'>
          <p className='text-base text-gray-400 font-normal tracking-wide'>
            Your Rating:
          </p>

          <p className='text-base text-white font-normal tracking-wide'>
            {yourRating ? (
              <React.Fragment>
                <span className='text-yellow-500'>{yourRating}</span>/10
              </React.Fragment>
            ) : (
              "You didn't rate this title yet"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
