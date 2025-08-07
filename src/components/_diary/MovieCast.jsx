import { FaUsers } from 'react-icons/fa';

export default function MovieCast({ movieStars }) {
  return (
    <div className='w-full h-auto flex items-center self-start gap-1.5 lg:gap-3'>
      <p className='flex items-center gap-1.5 text-xs lg:text-sm text-blue-400 font-medium tracking-wider whitespace-nowrap'>
        <span className='text-base'>
          <FaUsers />
        </span>
        &nbsp;Main Stars
      </p>

      <div className='w-full h-[24px] flex items-center self-start flex-wrap gap-1.5 md:gap-3 overflow-hidden'>
        <span className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center text-xs lg:text-sm text-gray-400 font-medium tracking-wider bg-transparent rounded-full shadow-sm'>
          {movieStars && movieStars.join(' • ')}
        </span>
      </div>
    </div>
  );
}
