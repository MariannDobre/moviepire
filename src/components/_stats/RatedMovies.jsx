import { useAllRatings } from '../../hooks/movies/useAllRatings';

import { FaRegStar } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

import SmallLoader from '../loaders/SmallLoader';

export default function RatedMovies({ userId }) {
  const { allRatings, isFetching, error } = useAllRatings(userId);

  if (error)
    return (
      <div className='w-full h-full p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
        <p className='text-red-500 text-base font-normal tracking-wider text-center'>
          There was an error while fetching the stats for your rated movies...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-full p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Loading the stats for your rated movies...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );

  const watchedThisMonth = allRatings
    ? getMoviesWatchedThisMonth(allRatings)
    : 0;

  function getMoviesWatchedThisMonth(movies) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return movies.filter((movie) => {
      const createdDate = new Date(movie.created_at);
      return (
        createdDate.getMonth() === currentMonth &&
        createdDate.getFullYear() === currentYear
      );
    }).length;
  }

  return (
    <div className='w-full h-full flex flex-col border border-neutral-700 p-6 rounded-md shadow-md'>
      <div className='w-full flex items-center justify-between'>
        <span className='w-12 h-12 flex items-center justify-center text-2xl bg-amber-700/35 text-amber-400 rounded-md drop-shadow-sm'>
          <FaRegStar />
        </span>

        <span
          className={`w-12 h-12 flex items-center justify-center text-2xl bg-transparent rounded-md drop-shadow-sm ${
            watchedThisMonth > 0 ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          {watchedThisMonth > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
        </span>
      </div>

      <div className='w-full flex flex-col gap-0.5 mt-auto'>
        <span className='text-4xl text-white font-semibold tracking-wide'>
          {allRatings?.length}
        </span>

        <p className='text-lg text-neutral-400 font-medium tracking-wide'>
          Movies Rated
        </p>

        <p
          className={`text-xs font-normal tracking-widest ${
            watchedThisMonth > 0 ? 'text-emerald-500' : 'text-red-500'
          }`}
        >
          {watchedThisMonth > 0
            ? `+${watchedThisMonth} this month`
            : 'No activity detected'}
        </p>
      </div>
    </div>
  );
}
