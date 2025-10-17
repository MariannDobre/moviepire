import { FaUsers } from 'react-icons/fa';

export default function MovieCast({ movieDirector, movieStars }) {
  return (
    <div className='w-full h-auto flex items-center self-start gap-3'>
      <div className='w-auto h-auto flex items-center gap-3'>
        <p className='text-white text-sm font-medium tracking-wide'>Director</p>

        <span className='text-amber-400 text-sm font-normal tracking-wide'>
          {movieDirector}
        </span>
      </div>

      <div className='w-auto h-auto flex items-center gap-3'>
        <p className='text-white text-sm font-medium tracking-wide'>Stars</p>

        <div className='w-auto h-auto flex items-center gap-3'>
          <span className='w-auto h-auto text-amber-400 text-sm font-normal tracking-wide'>
            {movieStars && movieStars.join(' • ')}
          </span>
        </div>
      </div>
    </div>
  );
}
