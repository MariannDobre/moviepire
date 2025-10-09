import { useState } from 'react';
import { useRandomMovies } from '../hooks/movies/useRandomMovies';

import SmallLoader from '../components/loaders/SmallLoader';
import TypeSelector from '../components/_discovery/TypeSelector';
import DiscoveryTable from '../components/_discovery/DiscoveryTable';
import Banner from '../components/_banner/Banner';

const limit = 32;

export default function DiscoveryPage() {
  const [type, setType] = useState('all movies');
  const { randomMovies, isFetching, error } = useRandomMovies(limit, type);

  if (isFetching)
    return (
      <div className='w-full flex flex-col gap-9'>
        <TypeSelector
          type={type}
          onType={setType}
        />

        <div className='w-full h-[calc(100vh-72px-40px-36px)] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
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
      <div className='w-full h-auto flex flex-col gap-9'>
        <TypeSelector
          type={type}
          onType={setType}
        />

        <div className='w-full h-[calc(100vh-72px-40px-36px)] p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
          <p className='text-red-500 text-base font-normal tracking-wider text-center'>
            There was an error while fetching the movies...
            <br />
            {error?.message}
          </p>
        </div>
      </div>
    );

  return (
    <div className='w-full flex flex-col gap-9'>
      <TypeSelector
        type={type}
        onType={setType}
      />

      <DiscoveryTable data={randomMovies} />

      <Banner />
    </div>
  );
}
