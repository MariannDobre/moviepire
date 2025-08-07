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
        className='w-full outline-none border-none no-underline cursor-pointer bg-transparent text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-blue-400 font-medium tracking-wider lg:tracking-wide text-start self-start hover:text-blue-500 focus-visible:text-blue-500 transition-all duration-500'
      >
        {movieName}
      </Link>

      <div className='w-full h-auto flex items-center self-start gap-3 lg:gap-6'>
        <p className='w-auto h-auto flex items-center self-start gap-1 md:gap-1.5 text-xs md:text-sm lg:text-base text-white font-normal tracking-wider lg:tracking-wide text-start'>
          <span className='text-sm md:text-base lg:text-lg text-blue-400'>
            <FaRegCalendarAlt />
          </span>
          {movieYear}
        </p>

        <p className='w-auto h-auto flex items-center self-start gap-1 md:gap-1.5 text-xs md:text-sm lg:text-basee text-white font-normal tracking-wider lg:tracking-wide text-start'>
          <span className='text-sm md:text-base lg:text-lg text-blue-400'>
            <FaRegClock />
          </span>
          {movieDuration}&nbsp;min
        </p>
      </div>
    </div>
  );
}
