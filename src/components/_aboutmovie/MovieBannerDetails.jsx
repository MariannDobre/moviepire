import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';

import AddToDiary from './AddToDiary';

import {
  FaRegCalendarAlt,
  FaRegClock,
  FaStar,
  FaPlay,
  FaExclamation,
} from 'react-icons/fa';

export default function MovieBannerDetails({ movie }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  return (
    <div className='w-full h-auto md:h-[420px] flex flex-col md:flex-row items-start justify-end md:items-center md:justify-start gap-3 md:gap-6'>
      <div className='w-full max-w-[220px] h-[320px] md:max-w-[280px] md:h-full flex items-end justify-end md:items-center md:justify-center rounded-t-lg overflow-hidden'>
        <img
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          className='w-full h-full object-cover rounded-t-lg drop-shadow-sm opacity-85'
          // width={280}
          src={movie?.moviePoster}
          alt={`Poster for ${movie?.movieName}`}
          effect='opacity'
          delayMethod='debounce'
          delayTime={500}
        />
      </div>

      <div className='w-full h-full flex flex-col gap-3 items-start justify-end'>
        <h6 className='text-lg md:text-xl lg:text-2xl text-white font-medium tracking-wide'>
          {movie?.movieName}
        </h6>

        <div className='w-full flex items-center justify-start gap-3 md:gap-6'>
          <p
            className='flex items-start gap-1 md:gap-1.5 text-xs md:text-sm text-gray-400 font-normal tracking-wide'
            title='Release year of the title'
          >
            <span className='text-base md:text-lg text-blue-400'>
              <FaRegCalendarAlt />
            </span>
            {movie?.movieYear}
          </p>

          <p
            className='flex items-start gap-1 md:gap-1.5 text-xs md:text-sm text-gray-400 font-normal tracking-wide'
            title='Runtime of the title'
          >
            <span className='text-base md:text-lg text-blue-400'>
              <FaRegClock />
            </span>
            {movie?.movieDuration}&nbsp;min
          </p>

          <p
            className='flex items-start gap-1 md:gap-1.5 text-xs md:text-sm text-gray-400 font-normal tracking-wide'
            title='IMDb rating of the title'
          >
            <span className='text-base md:text-lg text-yellow-500'>
              <FaStar />
            </span>
            {movie?.imdbRating ? movie.imdbRating : 'No record found'}
          </p>
        </div>

        <div className='w-full flex items-center justify-start gap-1.5 md:gap-3'>
          {movie?.movieGenre?.map((genre, index) => (
            <span
              key={index}
              className='text-xs md:text-sm text-gray-400 bg-gray-50/10 font-normal tracking-wide py-1 px-4 md:py-1.5 md:px-6 rounded-sm md:rounded-md shadow-sm'
            >
              {genre}
            </span>
          ))}
        </div>

        <div className='w-full flex items-center justify-start gap-1.5 md:gap-3'>
          {isAuthenticated ? (
            <AddToDiary movie={movie} />
          ) : (
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='outline-none border border-transparent flex items-center justify-center text-center gap-1 md:gap-1.5 py-1 px-4 md:py-1.5 md:px-6 cursor-pointer text-xs md:text-sm text-gray-400 bg-neutral-800 font-normal tracking-wide rounded-sm md:rounded-md shadow-sm hover:text-white focus-visible:text-white hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              <span>
                <FaExclamation />
              </span>
              Log In For Diary
            </button>
          )}

          <button
            type='button'
            onClick={() => navigate(`/trailer-for/${movie?.id}`)}
            className='outline-none border border-transparent flex items-center justify-center text-center gap-1 md:gap-1.5 py-1 px-4 md:py-1.5 md:px-6 cursor-pointer text-xs md:text-sm text-gray-400 bg-neutral-800 font-normal tracking-wide rounded-sm md:rounded-md shadow-sm hover:text-white focus-visible:text-white hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            <span>
              <FaPlay />
            </span>
            Watch Trailer
          </button>

          <button
            type='button'
            onClick={() => navigate(`/clip-for/${movie?.id}`)}
            className='outline-none border border-transparent flex items-center justify-center text-center gap-1 md:gap-1.5 py-1 px-4 md:py-1.5 md:px-6 cursor-pointer text-xs md:text-sm text-gray-400 bg-neutral-800 font-normal tracking-wide rounded-sm md:rounded-md shadow-sm hover:text-white focus-visible:text-white hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            <span>
              <FaPlay />
            </span>
            Watch Clip
          </button>
        </div>
      </div>
    </div>
  );
}
