import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMovieByTitle } from '../../hooks/movies/useMovieByTitle';
import SmallLoader from '../loaders/SmallLoader';

import 'react-lazy-load-image-component/src/effects/opacity.css';

function Results({ query, isInputFocused, inputRect }) {
  // useNavigate call for redirecting user to the selected movie/title/item
  const navigate = useNavigate();
  // useMoviesByTitle call to show the results based on the query
  const { movies, isFetching, error } = useMovieByTitle(query);

  // handler to navigate the user to the selected movie/title/item
  const navigateSelectedMovie = (path) => {
    navigate(path);
  };

  return (
    <div
      style={{
        // top: input height + navigation y padding + outlet container top padding
        top: `calc(${inputRect?.height}px + 24px + 48px)`,
        right: '24px',
      }}
      className={`bg-neutral-800 fixed flex flex-col z-50 ${
        isInputFocused ? 'block w-96' : 'hidden'
      } outline outline-1 outline-neutral-400/50 rounded-md max-h-96 overflow-y-auto`}
    >
      {movies?.map((movie, index) => (
        <div
          key={index}
          className='flex gap-4 p-2 cursor-pointer hover:bg-gray-50/10 transition-all duration-300'
          onClick={() => navigateSelectedMovie(`/about/${movie.id}`)}
        >
          {isFetching ? (
            <div className='flex items-center justify-center w-full h-28 text-stone-200'>
              <SmallLoader />
            </div>
          ) : (
            <React.Fragment>
              <LazyLoadImage
                className='w-16 h-28'
                src={movie.moviePoster}
                alt={`Poster for ${movie.movieName}`}
                effect='opacity'
                delayMethod='debounce'
                delayTime={500}
              />

              <div className='flex flex-col gap-1'>
                <h1 className='text-stone-200 text-base tracking-wide'>
                  {movie.movieName}
                </h1>
                <p className='text-gray-300/75 text-xs tracking-wide'>
                  {movie.movieYear}
                </p>
                <p className='text-gray-300/75 text-xs'>
                  {movie.movieStars.join(' • ')}
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
      ))}

      <div className='p-2'>
        {query === '' ? (
          <p className='text-neutral-400/50 text-sm tracking-wide'>
            What do you want to see
          </p>
        ) : (
          <p className='text-neutral-400/50 text-sm tracking-wide'>
            <span className='text-red-400 tracking-wider'>
              {movies?.length}&nbsp;
            </span>
            {movies?.length === 1 ? 'result' : 'results'} for
            <span className='text-red-400 tracking-wider'>&nbsp;{query}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Results;
