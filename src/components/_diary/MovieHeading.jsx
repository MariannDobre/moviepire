import { Link } from 'react-router-dom';

import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

export default function MovieHeading({
  id,
  movieName,
  movieYear,
  movieDuration,
}) {
  return (
    <div className='w-full h-auto flex flex-col gap-1 self-start'>
      <Link
        to={`/about/${id}`}
        className='w-[calc(100%-12px-32px)] sm:w-[calc(100%-12px-32px)] md:w-[calc(100%-24px-32px)] lg:w-full outline-none border-none no-underline cursor-pointer bg-transparent text-base sm:text-lg md:text-xl lg:text-2xl text-blue-400 font-medium tracking-wide text-start self-start hover:text-blue-500 focus-visible:text-blue-500 transition-all duration-500'
      >
        {movieName}
      </Link>

      <div className='w-full h-auto flex items-center self-start gap-1.5 md:gap-3 lg:gap-6'>
        <p className='w-auto h-auto flex items-center self-start gap-0.5 sm:gap-1 md:gap-1.5 text-xs sm:text-sm md:text-base text-white font-normal tracking-wide text-start'>
          <span className='text-sm sm:text-base md:text-lg text-blue-400'>
            <FaRegCalendarAlt />
          </span>
          {movieYear}
        </p>

        <p className='w-auto h-auto flex items-center self-start gap-0.5 sm:gap-1 md:gap-1.5 text-xs sm:text-sm md:text-basee text-white font-normal tracking-wide text-start'>
          <span className='text-sm sm:text-base md:text-lg text-blue-400'>
            <FaRegClock />
          </span>
          {movieDuration}&nbsp;min
        </p>
      </div>
    </div>
  );
}
