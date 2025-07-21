import { useEffect, useState } from 'react';
import Star from './Star';
import { FaStar } from 'react-icons/fa';
import { useUser } from '../../hooks/auth/useUser';
import { useParams } from 'react-router-dom';
import { useRating } from '../../hooks/movies/useRating';
import { useRemoveRating } from '../../hooks/movies/mutations/useRemoveRating';
import { useUpdateRating } from '../../hooks/movies/mutations/useUpdateRating';
import { useAddRating } from '../../hooks/movies/mutations/useAddRating';
import SmallLoader from '../loaders/SmallLoader';

export default function RatingContainer({
  maxRating = 5,
  className = '',
  starColor = 'text-white',
  starSize = 'text-base',
  textColor = 'text-white',
  textSize = 'text-base',
  movieTitle,
}) {
  const { user } = useUser();
  const { movieId } = useParams();

  const { rating } = useRating(user.id, movieId);
  const movieRating = rating?.ratings || 0;
  const ratingId = rating?.id;

  const [newRating, setNewRating] = useState(movieRating);
  const [displayedRating, setDisplayedRating] = useState(0);

  const { insertRating, isPending: adding } = useAddRating(
    user.id,
    movieId,
    movieTitle,
    newRating,
    setNewRating
  );

  const { modifyRating, isPending: updating } = useUpdateRating(
    user.id,
    movieId,
    movieTitle,
    newRating,
    ratingId,
    setNewRating
  );

  const { deleteRating, isPending: removing } = useRemoveRating(
    user.id,
    movieId,
    movieTitle
  );

  // Sync UI with DB value on load
  useEffect(() => {
    setNewRating(movieRating);
  }, [movieRating]);

  function handleRating(value) {
    setNewRating(value);
  }

  const isRated = Boolean(movieRating);

  return (
    <div className={className}>
      {/* Message */}
      <p className='text-white text-xl font-medium tracking-wide text-center'>
        {!isRated
          ? 'This title is not rated yet.'
          : `You rated this title with ${movieRating}/10.`}
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
            className='outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-blue-400 disabled:shadow-sm flex items-center justify-center text-center py-1.5 px-6 bg-blue-400 text-base text-white font-medium tracking-wider rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            {adding ? <SmallLoader /> : 'Submit Rating'}
          </button>
        ) : (
          <>
            <button
              type='button'
              onClick={() => modifyRating()}
              disabled={updating || newRating === movieRating}
              className='outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-blue-400 disabled:shadow-sm flex items-center justify-center text-center py-1.5 px-6 bg-blue-400 text-base text-white font-medium tracking-wider rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              {updating ? <SmallLoader /> : 'Update Rating'}
            </button>

            <button
              type='button'
              onClick={() => deleteRating()}
              disabled={removing}
              className='outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-red-400 disabled:shadow-sm flex items-center justify-center text-center py-1.5 px-6 bg-red-400 text-base text-white font-medium tracking-wider rounded-md shadow-sm hover:bg-red-500 focus-visible:bg-red-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              {removing ? <SmallLoader /> : 'Remove Rating'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
