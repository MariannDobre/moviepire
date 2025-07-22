import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRandomMovies } from '../../hooks/movies/useRandomMovies';
import SmallLoader from '../loaders/SmallLoader';

import { BsBoxArrowInRight } from 'react-icons/bs';

import 'react-lazy-load-image-component/src/effects/opacity.css';

export default function WhatToWatch() {
  const { randomMovies, isFetching, error } = useRandomMovies();

  if (error)
    return (
      <div className='w-full h-96 p-6 flex flex-col items-center justify-center gap-9 bg-neutral-50/10 border border-red-700 rounded-md lg:rounded-lg shadow-sm'>
        <p className='text-red-500 text-sm font-normal tracking-wide text-center'>
          There was an error while fetching the movies...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-96 p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-md lg:rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the movies...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div className='w-full flex flex-col gap-6 xl:gap-9'>
      <div className='w-full flex flex-col gap-1'>
        <h6 className='text-2xl text-white font-medium tracking-wide'>
          What to Watch
        </h6>

        <p className='text-base text-gray-400 font-normal tracking-wider'>
          Timeless classics and all-time favorites
        </p>
      </div>

      <div className='w-full grid place-items-center grid-cols-1 xl:grid-cols-5 gap-x-0 gap-y-3 xl:gap-x-6 xl:gap-y-0'>
        {randomMovies?.map((movie, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-between w-full max-w-96 h-[620px] p-1.5 rounded-md lg:rounded-lg shadow-sm bg-neutral-900/75 border border-neutral-500 hover:border-neutral-400 focus-visible:border-neutral-400 hover:shadow-lg focus-visible:shadow-lg hover:-translate-y-2 focus-visible:-translate-y-2 transition-all duration-500'
          >
            <div className='w-full max-w-96 h-[480px] flex items-center justify-center rounded-t-md lg:rounded-t-lg overflow-hidden'>
              <LazyLoadImage
                className='w-full h-full object-cover rounded-t-md lg:rounded-t-lg drop-shadow-sm'
                width={330}
                src={movie.moviePoster}
                alt={`Poster for ${movie.movieName}`}
                effect='opacity'
                delayMethod='debounce'
                delayTime={500}
              />
            </div>

            <div className='w-full h-[calc(620px-480px-24px)] flex flex-col py-1.5 px-3'>
              <h6 className='text-lg text-white font-medium tracking-wide'>
                {movie.movieName}&nbsp;
                <span className='text-gray-400'>({movie.movieYear})</span>
              </h6>

              <div className='w-full flex items-center justify-between mt-auto'>
                <Link
                  to={`/about/${movie.id}`}
                  className='group outline-none border-none cursor-pointer py-1.5 px-6 flex items-center justify-center gap-1.5 bg-yellow-700/35 text-sm tracking-wide text-yellow-500 rounded-md shadow-sm drop-shadow-sm hover:bg-yellow-700/25 focus-visible:bg-yellow-700/25 hover:text-yellow-400 focus-visible:text-yellow-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
                >
                  Explore
                  <span className='text-lg text-yellow-500 group-hover:text-yellow-400 group-focus-visible:text-yellow-400 transition-all duration-500'>
                    <BsBoxArrowInRight />
                  </span>
                </Link>

                <span className='text-sm text-gray-400 bg-gray-50/10 font-normal tracking-wide py-1.5 px-6 rounded-md shadow-sm'>
                  {movie.movieGenre[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
