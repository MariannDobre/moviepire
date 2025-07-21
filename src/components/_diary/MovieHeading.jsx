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
        className='outline-none border-none no-underline cursor-pointer bg-transparent text-2xl text-blue-400 font-medium tracking-wide text-start self-start hover:text-blue-500 focus-visible:text-blue-500 transition-all duration-500'
      >
        {movieName}
      </Link>

      <div className='w-full h-auto flex items-center self-start gap-6'>
        <p className='w-auto h-auto flex items-center self-start gap-1.5 text-base text-white font-normal tracking-wide text-start'>
          <span className='text-lg text-blue-400'>
            <FaRegCalendarAlt />
          </span>
          {movieYear}
        </p>

        <p className='w-auto h-auto flex items-center self-start gap-1.5 text-base text-white font-normal tracking-wide text-start'>
          <span className='text-lg text-blue-400'>
            <FaRegClock />
          </span>
          {movieDuration}&nbsp;min
        </p>
      </div>
    </div>
  );
}
