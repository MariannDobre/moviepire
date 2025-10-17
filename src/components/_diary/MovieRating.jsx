import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MovieRating({ id, imdbRating, userRating }) {
  return (
    <div className='w-full h-auto flex items-center self-start gap-3'>
      <React.Fragment>
        {imdbRating ? (
          <p className='w-auto h-auto flex items-center self-start gap-1.5 text-sm text-neutral-100 font-medium tracking-wider text-start'>
            <span className='text-lg text-amber-400'>
              <FaStar />
            </span>

            <span className='text-sm font-normal tracking-wide'>
              {imdbRating}&nbsp;<em className='text-neutral-200'>(IMDb)</em>
            </span>
          </p>
        ) : (
          <p className='w-auto h-auto flex items-center self-start text-sm text-neutral-100 font-medium tracking-wider text-start'>
            No record&nbsp;
            <em className='text-neutral-200 font-normal tracking-wide text-xs'>
              (IMDb)
            </em>
          </p>
        )}
      </React.Fragment>

      <div className='w-px h-4 bg-neutral-700' />

      <React.Fragment>
        {userRating ? (
          <p className='w-auto h-auto flex items-center self-start gap-1.5 text-sm text-neutral-100 font-medium tracking-wider text-start'>
            <span className='text-lg text-amber-400'>
              <FaStar />
            </span>

            <span className='text-sm font-normal tracking-wide'>
              {userRating}&nbsp;
              <em className='text-neutral-200 text-xs'>(Personal)</em>
            </span>
          </p>
        ) : (
          <Link
            to={`/about/${id}?rate=true`}
            className='outline-none border-b border-b-amber-400 w-auto h-auto flex items-center justify-center self-start text-center text-sm text-neutral-100 font-medium tracking-wider hover:text-neutral-200 focus-visible:text-neutral-200 transition-colors duration-300'
          >
            Rate Now
          </Link>
        )}
      </React.Fragment>
    </div>
  );
}
