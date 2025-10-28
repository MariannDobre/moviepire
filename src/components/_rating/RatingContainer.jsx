import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { useAddRating } from '../../hooks/movies/mutations/useAddRating';
import { useUpdateRating } from '../../hooks/movies/mutations/useUpdateRating';
import { useRemoveRating } from '../../hooks/movies/mutations/useRemoveRating';

import Star from './Star';
import SmallLoader from '../../interface/_loaders/SmallLoader';

import { FaStar } from 'react-icons/fa';

export default function RatingContainer({
  maxRating = 5,
  ratingID,
  userRating,
  movieID,
  movieName,
  starColor = 'text-white',
  starSize = 'text-base',
  textColor = 'text-white',
  textSize = 'text-base',
  className = '',
}) {
  const { user } = useUser();

  const [newRating, setNewRating] = useState(userRating);
  const [displayedRating, setDisplayedRating] = useState(0);

  const { insertRating, isPending: adding } = useAddRating(
    user.id,
    movieID,
    movieName,
    newRating,
    setNewRating
  );

  const { modifyRating, isPending: updating } = useUpdateRating(
    user.id,
    movieID,
    movieName,
    newRating,
    ratingID,
    setNewRating
  );

  const { deleteRating, isPending: removing } = useRemoveRating(
    user.id,
    movieID,
    movieName
  );

  // Sync UI with DB value on load
  useEffect(() => {
    setNewRating(userRating);
  }, [userRating]);

  function handleRating(value) {
    setNewRating(value);
  }

  const isRated = Boolean(userRating);

  return (
    <div className={className}>
      {/* Message */}
      <p className='text-white text-xl font-medium tracking-wide text-center'>
        {!isRated
          ? 'This title is not rated yet'
          : `You rated this title with ${userRating}/10`}
      </p>

      {/* Stars */}
      <div className='flex items-center justify-center gap-1.5'>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={
              displayedRating ? displayedRating >= i + 1 : newRating >= i + 1
            }
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setDisplayedRating(i + 1)}
            onHoverOut={() => setDisplayedRating(0)}
            starColor={starColor}
            starSize={starSize}
          />
        ))}
      </div>

      {/* Rating info */}
      <div
        className={`w-auto h-auto flex items-center justify-center m-0 leading-none ${textColor} ${textSize} font-medium tracking-wide absolute -top-16 left-1/2 -translate-x-1/2`}
      >
        <p className='relative'>
          <FaStar
            size={108 + newRating * 2}
            className={starColor}
          />

          <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            {displayedRating || newRating || 0}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div
        className={`w-full h-auto flex items-center justify-center mt-3 ${
          isRated ? 'gap-6' : 'gap-0'
        }`}
      >
        {!isRated ? (
          <button
            type='button'
            onClick={() => insertRating()}
            disabled={adding || !newRating}
            className='w-56 h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-amber-400 flex items-center justify-center text-center py-1.5 px-3 bg-amber-400 text-sm text-black font-medium tracking-wider rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
          >
            {adding ? (
              <SmallLoader
                size='text-xl'
                color='text-black'
              />
            ) : (
              'Submit Rating'
            )}
          </button>
        ) : (
          <>
            <button
              type='button'
              onClick={() => modifyRating()}
              disabled={updating || newRating === userRating}
              className='w-56 h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-amber-400 flex items-center justify-center text-center py-1.5 px-3 bg-amber-400 text-sm text-black font-medium tracking-wider rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
            >
              {updating ? (
                <SmallLoader
                  size='text-xl'
                  color='text-black'
                />
              ) : (
                'Update Rating'
              )}
            </button>

            <button
              type='button'
              onClick={() => deleteRating()}
              disabled={removing}
              className='w-56 h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-red-500 flex items-center justify-center text-center py-1.5 px-3 bg-red-500 text-sm text-white font-medium tracking-wider rounded-md hover:bg-red-700 focus-visible:bg-red-700 transition-colors duration-300'
            >
              {removing ? (
                <SmallLoader
                  size='text-xl'
                  color='text-black'
                />
              ) : (
                'Remove Rating'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
