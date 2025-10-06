import { Link } from 'react-router-dom';
import { useLatestMovies } from '../../hooks/movies/useLatestMovies';
import SmallLoader from '../loaders/SmallLoader';

import { BsBoxArrowInRight } from 'react-icons/bs';
import HomeSlider from './HomeSlider';

export default function LatestThisYear() {
  const { latestMovies, isFetching, error } = useLatestMovies();

  if (isFetching)
    return (
      <div className='w-full h-auto flex flex-col gap-6'>
        <div className='w-full h-auto flex flex-col gap-1.5'>
          <h6 className='text-white text-2xl font-medium tracking-wide'>
            Latest This Year
          </h6>

          <p className='text-neutral-400 text-base font-normal tracking-wider'>
            The best movies and series of 2025
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
            Latest This Year
          </h6>

          <p className='text-neutral-400 text-base font-normal tracking-wider'>
            The best movies and series of 2025
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
          Latest This Year
        </h6>

        <p className='text-neutral-400 text-base font-normal tracking-wider'>
          The best movies and series of 2025
        </p>
      </div>

      <div className='w-full h-[476px]'>
        <HomeSlider data={latestMovies} />
      </div>
    </div>
  );
}
