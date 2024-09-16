import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  BsFillBookmarkPlusFill,
  BsFillBookmarkCheckFill,
} from 'react-icons/bs';

function MovieDetails({ movieDetails }) {
  const movieDuration = movieDetails.movieDuration;
  const totalMinutes = parseInt(movieDuration, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedDuration = `${hours}h ${minutes < 10 ? 0 : ''}${minutes}m`;

  return (
    <div className='flex gap-4 self-start w-auto'>
      <div className='w-44 h-60 relative'>
        <LazyLoadImage
          className='w-full h-full'
          src={movieDetails.moviePoster}
          alt={`Poster for ${movieDetails.movieName}`}
          effect='opacity'
          delayTime={500}
        />

        <button className='absolute text-5xl text-neutral-900 top-0 -left-1.5 bg-transparent border-none outline-0 outline-transparent p-0 w-auto h-auto hover:text-neutral-700 focus-visible:text-neutral-700 transition-all duration-300'>
          {false ? <BsFillBookmarkCheckFill /> : <BsFillBookmarkPlusFill />}
        </button>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl text-stone-200 tracking-wide'>
          {movieDetails.movieName}
        </h1>

        <div className='flex text-stone-400 gap-2'>
          <p>{movieDetails.movieYear}</p>

          <p className='capitalize'>{movieDetails.type}</p>

          <p>{formattedDuration}</p>
        </div>

        <div className='flex gap-2'>
          {movieDetails.movieGenre.map((el, index) => (
            <span
              key={index}
              className='text-sm text-center text-red-400 tracking-wider bg-neutral-800/50 shadow-lg py-1 px-2 rounded-full outline outline-1 outline-neutral-400/50'
            >
              {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
