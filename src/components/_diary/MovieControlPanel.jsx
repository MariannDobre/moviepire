import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';
import { FaStar } from 'react-icons/fa';

export default function MovieControlPanel({
  id,
  imdbRating,
  movieRating,
  date,
}) {
  return (
    <div className='w-full h-auto flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-6 mt-auto'>
      <div className='w-auto h-auto flex items-start gap-1.5 lg:gap-3 xl:gap-6'>
        <div className='flex flex-col gap-0.5'>
          <p className='text-xs lg:text-base text-white font-medium tracking-wider'>
            IMDb Rating
          </p>

          {imdbRating ? (
            <p className='flex items-center gap-1 lg:gap-1.5'>
              <span className='text-xs lg:text-lg text-yellow-500'>
                <FaStar />
              </span>

              <span className='text-xs lg:text-sm text-gray-400 font-normal tracking-wide'>
                {imdbRating}
              </span>
            </p>
          ) : (
            <p className='text-xs lg:text-sm text-gray-400 font-normal tracking-wide'>
              No record
            </p>
          )}
        </div>

        <div className='flex flex-col gap-0.5'>
          <p className='text-xs lg:text-base text-white font-medium tracking-wider'>
            Your Rating
          </p>

          {movieRating ? (
            <p className='flex items-center gap-1 lg:gap-1.5'>
              <span className='text-xs lg:text-lg text-yellow-500'>
                <FaStar />
              </span>

              <span className='text-xs lg:text-sm text-gray-400 font-normal tracking-wide'>
                {movieRating}
              </span>
            </p>
          ) : (
            <p className='text-xs lg:text-sm text-gray-400 font-normal tracking-wide'>
              No record
            </p>
          )}
        </div>

        {!movieRating && (
          <Link
            to={`/about/${id}?rate=true`}
            className='self-end outline-none border-none no-underline cursor-pointer flex items-center justify-center text-center text-xs lg:text-sm text-white font-medium tracking-wide bg-blue-400 rounded-sm lg:rounded-md shadow-sm py-0.5 px-2 lg:py-1.5 lg:px-6 hover:bg-blue-500 focus-visible:bg-blue-500 transition-all duration-500'
          >
            Rate Title
          </Link>
        )}
      </div>

      <p className='self-end flex items-center justify-center text-xs lg:text-sm text-white font-medium tracking-wider whitespace-nowrap'>
        Watched on&nbsp;{formatDate(date)}
      </p>
    </div>
  );
}
