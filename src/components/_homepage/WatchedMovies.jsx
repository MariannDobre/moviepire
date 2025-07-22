import { useDiaryMovies } from '../../hooks/movies/useDiaryMovies';

import { FaRegEye } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

import SmallLoader from '../loaders/SmallLoader';

export default function WatchedMovies({ userId }) {
  const { diaryMovies, isFetching, error } = useDiaryMovies(userId);

  const watchedThisMonth = diaryMovies
    ? getMoviesWatchedThisMonth(diaryMovies)
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

  if (error)
    return (
      <div className='h-40 xl:h-56 p-3 xl:p-6 rounded-md lg:rounded-lg w-auto flex flex-col items-center justify-center bg-neutral-900/75 border border-red-700 shadow-sm'>
        <p className='text-red-500 text-lg font-normal tracking-wide text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='h-40 xl:h-56 p-3 xl:p-6 rounded-md lg:rounded-lg w-auto flex flex-col items-center justify-center bg-neutral-900/75 border border-yellow-700 shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the watched movies stats...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div className='h-40 xl:h-56 p-3 xl:p-6 rounded-md lg:rounded-lg w-auto flex flex-col bg-neutral-900/75 border border-neutral-500 shadow-sm hover:border-neutral-400 focus-visible:border-neutral-400 hover:shadow-lg focus-visible:shadow-lg hover:-translate-y-2 focus-visible:-translate-y-2 transition-all duration-500'>
      <div className='w-full flex items-center justify-between'>
        <span className='w-8 h-8 xl:w-12 xl:h-12 text-lg xl:text-2xl rounded-md lg:rounded-lg flex items-center justify-center bg-indigo-700/35 text-indigo-500 shadow-sm drop-shadow-sm'>
          <FaRegEye />
        </span>

        <span
          className={`w-8 h-8 xl:w-12 xl:h-12 text-base xl:text-xl rounded-md lg:rounded-lg ${
            watchedThisMonth > 0 ? 'text-emerald-500' : 'text-red-500'
          } flex items-center justify-center bg-transparent shadow-none drop-shadow-sm`}
        >
          {watchedThisMonth > 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
        </span>
      </div>

      <div className='w-full flex flex-col mt-auto'>
        <span className='text-2xl xl:text-4xl text-white font-semibold tracking-wide'>
          {diaryMovies?.length}
        </span>

        <p className='text-sm lg:text-base text-gray-400 font-medium tracking-wide'>
          Movies Watched
        </p>

        <p
          className={`text-xs lg:text-sm ${
            watchedThisMonth > 0 ? 'text-emerald-500' : 'text-red-500'
          } font-normal tracking-wide`}
        >
          {watchedThisMonth > 0
            ? `+${watchedThisMonth} this month`
            : 'No activity detected'}
        </p>
      </div>
    </div>
  );
}
