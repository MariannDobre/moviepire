import React from 'react';
import { useAllMovies } from '../hooks/movies/useAllMovies';

function Discovery() {
  const { movies, isGetting, error } = useAllMovies();
  console.log(movies);

  return (
    <div className='flex flex-col gap-12'>
      <h1 className='text-red-400 text-3xl font-bold tracking-wider'>
        Discovery
      </h1>

      {/* 1824px */}
      <div className='text-stone-300'>
        {isGetting ? (
          <h1>Getting the data from the db</h1>
        ) : (
          <h1>Data received</h1>
        )}
      </div>
    </div>
  );
}

export default Discovery;
