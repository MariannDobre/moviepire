import React from 'react';

function MovieDescription({ description }) {
  return (
    <div className='bg-neutral-900/75 flex flex-col gap-3 p-6 outline outline-1 outline-neutral-400/50 rounded-md'>
      <h2 className='text-red-400 text-2xl font-bold tracking-wider'>
        About this title
      </h2>

      <p className='text-stone-200 text-base tracking-wide'>{description}</p>
    </div>
  );
}

export default MovieDescription;
