import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrailer } from '../hooks/movies/useTrailer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BsHouse, BsArrowReturnLeft } from 'react-icons/bs';
import { SlArrowRight } from 'react-icons/sl';
import SmallLoader from '../components/loaders/SmallLoader';

import 'react-lazy-load-image-component/src/effects/opacity.css';

function MovieTrailer() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { trailerData, isFetching, error } = useTrailer(movieId);

  return (
    <React.Fragment>
      {error && (
        <div className='text-stone-200 w-full h-[660px] flex items-center justify-center bg-neutral-900/75 rounded-md outline outline-1 outline-neutral-400/50'>
          <p className='text-lg tracking-wide'>
            An unexpected error occurred. We are trying to figure it out and
            solve it as quickly as possible.
          </p>
        </div>
      )}

      {isFetching ? (
        <div className='text-stone-200 w-full h-[660px] flex items-center justify-center bg-neutral-900/75 rounded-md outline outline-1 outline-neutral-400/50'>
          <SmallLoader />
        </div>
      ) : (
        <div className='w-full flex flex-col gap-6'>
          <button
            className='bg-transparent self-start flex items-center gap-2 p-2 rounded-md outline-none border-none text-stone-200 text-base font-medium tracking-wide hover:bg-neutral-400/25 focus-visible:bg-neutral-400/25 transition-all duration-300'
            onClick={() => navigate(-1)}
          >
            <span>
              <BsArrowReturnLeft />
            </span>
            Go Back
          </button>

          <div className='flex gap-12'>
            <iframe
              className='w-[1280px] h-[660px]'
              src={`${trailerData?.movieTrailer}?autoplay=1`}
              sandbox='allow-scripts allow-same-origin allow-presentation'
              allow='autoplay'
              frameBorder='0'
              loading='lazy'
              referrerPolicy='no-referrer'
              title={`Trailer video of ${trailerData.movieName}`}
              aria-label={`Trailer video of ${trailerData.movieName}`}
              scrolling='no'
            />

            <div
              style={{ width: 'calc(100% - 1280px - 48px)' }}
              className='bg-neutral-900/75 rounded-md outline outline-1 outline-neutral-400/50 p-6 flex flex-col gap-6'
            >
              <div className='flex gap-3'>
                <LazyLoadImage
                  className='w-24 h-36'
                  src={trailerData.moviePoster}
                  alt={`Poster of ${trailerData.movieName}`}
                  effect='opacity'
                  delayTime={500}
                />

                <div className='flex flex-col gap-1'>
                  <h1 className='text-lg text-stone-200 tracking-wide'>
                    {trailerData.movieName}{' '}
                    <span>({trailerData.movieYear})</span>
                  </h1>
                  <p className='text-base text-stone-400 tracking-wide'>
                    {trailerData.movieGenre.join(' • ')}
                  </p>

                  <div className='flex items-center gap-1'>
                    <button
                      className='text-base outline-none border-none text-stone-400 p-2 rounded-full hover:bg-neutral-400/25 focus-visible:bg-neutral-400/25 transition-all duration-300'
                      onClick={() => navigate('/')}
                    >
                      <BsHouse />
                    </button>
                    <button
                      className='text-base outline-none border-none text-stone-400 p-2 rounded-full hover:bg-neutral-400/25 focus-visible:bg-neutral-400/25 transition-all duration-300'
                      onClick={() => navigate(-1)}
                    >
                      <SlArrowRight />
                    </button>
                  </div>
                </div>
              </div>

              <div className='w-full h-[1px] bg-neutral-400/50'></div>

              <p className='text-base text-stone-200 tracking-wide'>
                {trailerData.movieDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default MovieTrailer;
