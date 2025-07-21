import { useAllRatings } from '../../hooks/movies/useAllRatings';

import SmallLoader from '../loaders/SmallLoader';

import { FaRegHeart, FaStar } from 'react-icons/fa';

export default function FavoriteMovie({ userId }) {
  const { allRatings, isFetching, error } = useAllRatings(userId);

  const favoriteMovie = allRatings
    ?.filter((item) => item.ratings === 10)
    ?.at(0);

  const movieTitle =
    favoriteMovie?.movies?.movieName || 'No favorite movie yet...';

  if (error)
    return (
      <div className='w-auto h-56 p-6 flex flex-col items-center justify-center bg-neutral-900/75 border border-red-700 rounded-lg shadow-sm'>
        <p className='text-red-500 text-lg font-normal tracking-wide text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-auto h-56 p-6 flex flex-col items-center justify-center bg-neutral-900/75 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the stats for your favorite movie...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div className='w-auto h-56 p-6 flex flex-col bg-neutral-900/75 border border-neutral-500 rounded-lg shadow-sm hover:border-neutral-400 focus-visible:border-neutral-400 hover:shadow-lg focus-visible:shadow-lg hover:-translate-y-2 focus-visible:-translate-y-2 transition-all duration-500'>
      <div className='w-full flex items-center justify-between'>
        <span className='w-12 h-12 flex items-center justify-center bg-red-700/35 text-2xl text-red-500 rounded-lg shadow-sm drop-shadow-sm'>
          <FaRegHeart />
        </span>
      </div>

      <div className='w-full flex flex-col mt-auto'>
        <span className='text-3xl text-white font-semibold tracking-wide'>
          {movieTitle}
        </span>

        <p className='text-base text-gray-400 font-medium tracking-wide'>
          Most Loved Title
        </p>

        <p className='flex items-center gap-1.5 text-sm text-yellow-500 font-normal tracking-wide'>
          <span className='text-base'>
            <FaStar />
          </span>
          10/10
        </p>
      </div>
    </div>
  );
}
