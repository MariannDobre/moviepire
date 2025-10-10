import { useAllRatings } from '../../hooks/movies/useAllRatings';

import SmallLoader from '../loaders/SmallLoader';

import { FaRegHeart, FaStar } from 'react-icons/fa';

export default function FavoriteMovie({ userId }) {
  const { allRatings, isFetching, error } = useAllRatings(userId);

  if (error)
    return (
      <div className='w-full h-full p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
        <p className='text-red-500 text-base font-normal tracking-wider text-center'>
          There was an error while fetching the stats for your favorite movie...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-full p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Loading the stats for your favorite movie...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );

  const favoriteMovie = allRatings
    ?.filter((item) => item.ratings === 10)
    ?.at(0);

  const favoriteMovieRating = favoriteMovie.ratings;
  const favoriteMovieTitle =
    favoriteMovie?.movies?.movieName || 'No favorite movie yet...';

  return (
    <div className='w-full h-full flex flex-col border border-neutral-700 p-6 rounded-md shadow-md'>
      <div className='w-full flex items-center justify-between'>
        <span className='w-12 h-12 flex items-center justify-center text-2xl bg-amber-700/35 text-amber-400 rounded-md drop-shadow-sm'>
          <FaRegHeart />
        </span>
      </div>

      <div className='w-full flex flex-col gap-0.5 mt-auto'>
        <span className='text-4xl text-white font-semibold tracking-wide'>
          {favoriteMovieTitle}
        </span>

        <p className='text-lg text-neutral-400 font-medium tracking-wide'>
          Most Loved Title
        </p>

        <p className='flex items-center gap-1 text-white text-xs font-normal tracking-widest'>
          <span className='text-amber-400 text-base'>
            <FaStar />
          </span>
          {favoriteMovieRating}/10
        </p>
      </div>
    </div>
  );
}
