import React from 'react';

function AddToViewed({ movieTitle }) {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <h1 className='text-lg text-stone-200 tracking-wide'>
        Do you want to add {movieTitle} to the view list?
      </h1>

      <button>Add/Remove to/from view list</button>

      <p>
        <span>Status:</span> not viewed
      </p>
    </div>
  );
}

export default AddToViewed;
