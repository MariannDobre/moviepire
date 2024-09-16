import React, { useState } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { useRatings } from '../../hooks/movies/useRatings';
import SmallLoader from '../loaders/SmallLoader';
import ChooseRating from './ChooseRating';
import RateButton from './RateButton';
import { FaStar } from 'react-icons/fa';

function RateMovie({ movieTitle, movieId }) {
  const [rating, setRating] = useState(0);
  const { user } = useUser();
  const { ratings, isFetching } = useRatings(user?.id, movieId);

  const findCurrentRating = ratings.filter(
    (item) => item.item_id === Number(movieId)
  );

  const starSize =
    findCurrentRating[0]?.ratings && rating === 0
      ? 80 + findCurrentRating[0]?.ratings * 2
      : rating > 0
      ? 80 + rating * 2
      : 80;
  const ratingForStar =
    findCurrentRating[0]?.ratings && rating === 0
      ? findCurrentRating[0]?.ratings
      : rating > 0
      ? rating
      : '?';

  return (
    <div className='relative flex flex-col items-center justify-center gap-3'>
      <Star
        rating={rating}
        isFetching={isFetching}
        displayRating={ratingForStar}
        starSize={starSize}
      />

      <h1 className='text-lg text-stone-200 tracking-wide'>
        Rate {movieTitle}
      </h1>

      <ChooseRating
        rating={
          findCurrentRating[0]?.ratings && rating === 0
            ? findCurrentRating[0]?.ratings
            : rating
        }
        setRating={setRating}
      />

      <RateButton
        rating={rating}
        ratingId={findCurrentRating[0]?.id}
        setRating={setRating}
        ratingStatus={findCurrentRating}
        userId={user?.id}
        movieId={movieId}
        movieTitle={movieTitle}
      />
    </div>
  );
}

function Star({ rating, isFetching, displayRating, starSize }) {
  return (
    <div className='absolute -top-full text-red-400'>
      {/* <FaStar size={rating ? 80 + rating * 2 : 80} /> */}
      <FaStar size={starSize} />

      <span className='text-lg text-stone-200 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        {isFetching ? <SmallLoader /> : displayRating}
      </span>
    </div>
  );
}

export default RateMovie;
