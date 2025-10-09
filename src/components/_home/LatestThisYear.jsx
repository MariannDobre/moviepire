import { useLatestMovies } from '../../hooks/movies/useLatestMovies';

import SmallLoader from '../loaders/SmallLoader';
import SectionHeader from './SectionHeader';
import Slider from '../../utils/_slider/Slider';

export default function LatestThisYear() {
  const { latestMovies, isFetching, error } = useLatestMovies();

  if (isFetching)
    return (
      <div className='w-full h-auto flex flex-col gap-6'>
        <SectionHeader
          title='Latest This Year'
          subtitle='The best movies and series of 2025'
        />

        <div className='w-full h-[476px] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
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
        <SectionHeader
          title='Latest This Year'
          subtitle='The best movies and series of 2025'
        />

        <div className='w-full h-[476px] p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
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
      <SectionHeader
        title='Latest This Year'
        subtitle='The best movies and series of 2025'
      />

      <div className='w-full h-[476px]'>
        <Slider
          data={latestMovies}
          itemsPerSlide={4}
          maxSlides={3}
          heightTAG='home-page'
          columns={4}
        />
      </div>
    </div>
  );
}
