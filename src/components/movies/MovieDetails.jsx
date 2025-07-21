import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useUser } from '../../hooks/auth/useUser';
import { useMovieStatus } from '../../hooks/movies/useMovieStatus';
import SmallLoader from '../loaders/SmallLoader';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

import 'react-lazy-load-image-component/src/effects/opacity.css';

function MovieDetails({ movieDetails }) {
  // geting if the user is authentificated or not
  const { isAuthenticated } = useUser();

  // calculate and format the duration of the movie
  const movieDuration = movieDetails.movieDuration;
  const totalMinutes = parseInt(movieDuration, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedDuration = `${hours}h ${minutes < 10 ? 0 : ''}${minutes}m`;

  return (
    <div className='flex gap-4 self-start w-auto'>
      <div className='w-44 h-60 relative'>
        <LazyLoadImage
          className='w-full h-full rounded-t-lg'
          src={movieDetails.moviePoster}
          alt={`Poster for ${movieDetails.movieName}`}
          effect='opacity'
          delayTime={500}
        />

        {isAuthenticated && <StatusIndicator movieId={movieDetails.id} />}
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

function StatusIndicator({ movieId }) {
  // custom hook call to get the user
  const { user } = useUser();
  // custom hook call to see if the movie is viewed or not
  const { viewedStatus, isFetching } = useMovieStatus(user?.id, movieId);

  // derived state for the status
  const status = viewedStatus[0]?.is_favorite
    ? viewedStatus[0]?.is_favorite
    : null;

  return (
    <React.Fragment>
      {status && (
        <React.Fragment>
          {isFetching ? (
            <div className='flex items-center justify-center absolute bg-yellow-500 top-0 rounded-t-lg w-9 h-12'>
              <SmallLoader />
            </div>
          ) : (
            <span className='absolute text-5xl text-yellow-500 drop-shadow-lg top-0 -left-1.5 bg-transparent p-0 w-auto h-auto'>
              <BsFillBookmarkCheckFill />
            </span>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
