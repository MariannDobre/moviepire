import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { BsHouse } from 'react-icons/bs';
import { SlArrowRight } from 'react-icons/sl';

import 'react-lazy-load-image-component/src/effects/opacity.css';

export default function TrailerDetails({
  moviePoster,
  movieName,
  movieYear,
  movieDescription,
  movieGenre,
}) {
  const navigate = useNavigate();

  return (
    <div className='border border-neutral-800 w-full max-w-[calc(1816px-1280px-48px-2px)] h-full p-6 flex flex-col gap-6 bg-neutral-900/75 rounded-lg shadow-sm'>
      <div className='flex gap-3'>
        <LazyLoadImage
          src={moviePoster}
          alt={`Poster of ${movieName}`}
          effect='opacity'
          delayTime={500}
          className='w-24 h-36 rounded-t-lg drop-shadow-sm'
        />

        <div className='flex flex-col gap-1'>
          <h6 className='text-lg text-white font-medium tracking-wide'>
            {movieName}&nbsp;
            <span>({movieYear})</span>
          </h6>

          <p className='text-base text-neutral-500 font-normal tracking-wide'>
            {movieGenre.join(' • ')}
          </p>

          <div className='flex items-center gap-1'>
            <button
              type='button'
              onClick={() => navigate('/')}
              className='group outline-none border-none cursor-pointer w-10 h-10 flex items-center justify-center bg-transparent rounded-lg shadow-sm hover:bg-neutral-800/75 focus-visible:bg-neutral-800/75 transition-all duration-500'
            >
              <span className='text-lg text-neutral-500 group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
                <BsHouse />
              </span>
            </button>

            <button
              type='button'
              onClick={() => navigate(-1)}
              className='group outline-none border-none cursor-pointer w-10 h-10 flex items-center justify-center bg-transparent rounded-lg shadow-sm hover:bg-neutral-800/75 focus-visible:bg-neutral-800/75 transition-all duration-500'
            >
              <span className='text-lg text-neutral-500 group-hover:text-white group-focus-visible:text-white transition-all duration-500'>
                <SlArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className='w-full h-px bg-neutral-800 rounded-lg' />

      <p className='text-base text-white font-normal tracking-wide'>
        {movieDescription}
      </p>
    </div>
  );
}
