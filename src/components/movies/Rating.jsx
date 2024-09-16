import React from 'react';
import { useRatings } from '../../hooks/movies/useRatings';
import { useUser } from '../../hooks/auth/useUser';
import SmallLoader from '../loaders/SmallLoader';
import { FaStar } from 'react-icons/fa';

function Rating({ movieId }) {
  const { user } = useUser();
  const { ratings, isFetching } = useRatings(user?.id, movieId);

  const findCurrentRating = ratings.filter(
    (item) => item.item_id === Number(movieId)
  );

  // console.log(findCurrentRating);

  return (
    <p className='flex items-center gap-1 py-1.5 px-3 text-lg tracking-wide text-neutral-400/50 bg-neutral-900/75 shadow-lg outline outline-1 outline-neutral-400/50 rounded-md'>
      {isFetching ? (
        <SmallLoader />
      ) : (
        <>
          {findCurrentRating[0] ? (
            <>
              <span className='text-yellow-600'>
                <FaStar />
              </span>
              <strong className='text-stone-200 text-xl'>
                {findCurrentRating[0]?.ratings}
              </strong>
              /10
            </>
          ) : (
            <>
              <span className='text-stone-200'>
                You didn't rate this title yet
              </span>
            </>
          )}
        </>
      )}
    </p>
  );
}

export default Rating;
