import { useRandomMovies } from '../../hooks/movies/useRandomMovies';

import SmallLoader from '../loaders/SmallLoader';
import HomeSlider from './HomeSlider';

export default function WhatToWatch() {
  const { randomMovies, isFetching, error } = useRandomMovies();

  if (isFetching)
    return (
      <div className='w-full h-auto flex flex-col gap-6'>
        <div className='w-full h-auto flex flex-col gap-1.5'>
          <h6 className='text-white text-2xl font-medium tracking-wide'>
            What to Watch
          </h6>

          <p className='text-neutral-400 text-base font-normal tracking-wider'>
            Timeless classics and all-time favorites
          </p>
        </div>

        <div className='w-full h-96 p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
          <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
            Loading the movies...
          </p>

          <SmallLoader
            size='text-2xl'
            color='text-yellow-500'
          />
        </div>
      </div>
    );

  if (error)
    return (
      <div className='w-full h-auto flex flex-col gap-6'>
        <div className='w-full h-auto flex flex-col gap-1.5'>
          <h6 className='text-white text-2xl font-medium tracking-wide'>
            What to Watch
          </h6>

          <p className='text-neutral-400 text-base font-normal tracking-wider'>
            Timeless classics and all-time favorites
          </p>
        </div>

        <div className='w-full h-96 p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
          <p className='text-red-500 text-base font-normal tracking-wider text-center'>
            There was an error while fetching the movies...
            <br />
            {error?.message}
          </p>
        </div>
      </div>
    );

  return (
    <div className='w-full h-full flex flex-col gap-9'>
      <div className='w-full h-auto flex flex-col gap-2'>
        <h6 className='text-white text-2xl font-medium tracking-wide'>
          What to Watch
        </h6>

        <p className='text-neutral-400 text-base font-normal tracking-wider'>
          Timeless classics and all-time favorites
        </p>
      </div>

      <div className='w-full h-[476px]'>
        <HomeSlider data={randomMovies} />
      </div>
    </div>
  );
}
