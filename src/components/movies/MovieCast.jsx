import React from 'react';

function MovieCast({ director, writers, stars }) {
  return (
    <div className='bg-neutral-900/75 flex flex-col gap-3 p-6 outline outline-1 outline-neutral-400/50 rounded-md self-start'>
      <h2 className='text-red-400 text-2xl font-bold tracking-wider'>
        Cast and crew
      </h2>

      <div className='flex flex-col gap-1'>
        <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
          <span className='text-red-300 tracking-wide font-semibold'>
            Director
          </span>
          {director}
        </p>
        <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
          <span className='text-red-300 tracking-wide font-semibold'>
            Writers
          </span>
          {writers.join(' • ')}
        </p>
        <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
          <span className='text-red-300 tracking-wide font-semibold'>
            Top stars
          </span>
          {stars.join(' • ')}
        </p>
      </div>
    </div>
  );
}

export default MovieCast;
