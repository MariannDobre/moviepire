import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';

import { FaRegCalendarAlt, FaRegClock, FaRegEye } from 'react-icons/fa';

export default function MovieHeading({
  id,
  movieName,
  movieYear,
  movieDuration,
  date,
  index,
}) {
  return (
    <div className='w-full h-auto flex flex-col gap-1.5 self-start'>
      <Link
        to={`/about/${id}`}
        className='w-auto h-auto outline-none border-none flex items-center gap-1.5 no-underline cursor-pointer text-2xl text-amber-400 font-medium tracking-wide text-start self-start hover:text-amber-500 focus-visible:text-amber-500 transition-colors duration-300'
      >
        <span>{index + 1}.</span>
        {movieName}
      </Link>

      <div className='w-full h-auto flex items-center self-start gap-[18px]'>
        <p className='w-auto h-auto flex items-center self-start gap-1.5 text-sm text-neutral-100 font-medium tracking-wider text-start'>
          <span className='text-base text-amber-400'>
            <FaRegCalendarAlt />
          </span>
          {movieYear}
        </p>

        <p className='w-auto h-auto flex items-center self-start gap-1.5 text-sm text-neutral-100 font-medium tracking-wider text-start'>
          <span className='text-base text-amber-400'>
            <FaRegClock />
          </span>
          {movieDuration}&nbsp;min
        </p>

        <p className='w-auto h-auto flex items-center self-start gap-1.5 text-sm text-neutral-100 font-medium tracking-wider text-start'>
          <span className='text-base text-amber-400'>
            <FaRegEye />
          </span>
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}
