import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMovieByTitle } from '../../hooks/movies/useMovieByTitle';
import SmallLoader from '../loaders/SmallLoader';

import 'react-lazy-load-image-component/src/effects/opacity.css';

function Results({
  query,
  setQuery,
  isInputFocused,
  setIsInputFocused,
  inputRect,
}) {
  const navigate = useNavigate();
  const { movies, isFetching, error } = useMovieByTitle(query);

  if (error)
    return (
      <div
        style={{
          top: `calc(${inputRect?.height}px + 80px - 12px)`,
          left: `${inputRect?.left}px`,
        }}
        className={`bg-neutral-800 fixed p-3 flex items-center justify-center z-50 ${
          isInputFocused ? 'block w-[480px]' : 'hidden w-0'
        } border border-red-700 rounded-md shadow-sm max-h-96 overflow-y-auto`}
      >
        <p className='text-red-500 text-sm font-normal tracking-wide text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  return (
    <div
      style={{
        top: `calc(${inputRect?.height}px + 80px - 12px)`,
        left: `${inputRect?.left}px`,
      }}
      className={`bg-neutral-800 fixed flex flex-col z-50 ${
        isInputFocused ? 'block w-[480px]' : 'hidden w-0'
      } border border-neutral-500 rounded-md shadow-sm max-h-96 overflow-y-auto`}
    >
      {movies?.map((movie, index) => (
        <div
          key={index}
          className='flex items-start justify-start gap-3 p-3 cursor-pointer hover:bg-gray-50/10 transition-all duration-500'
          onClick={() => {
            navigate(`/about/${movie.id}`);
            setQuery('');
            setIsInputFocused(false);
          }}
        >
          {isFetching ? (
            <SmallLoader
              width='w-full'
              height='h-28'
              color='text-white'
              size='text-xl'
            />
          ) : (
            <React.Fragment>
              <LazyLoadImage
                className='w-18 h-28'
                src={movie.moviePoster}
                alt={`Poster for ${movie.movieName}`}
                effect='opacity'
                delayMethod='debounce'
                delayTime={500}
              />

              <div className='flex flex-col items-start gap-1'>
                <h6 className='text-base text-white font-normal tracking-wide'>
                  {movie.movieName}
                </h6>

                <p className='text-xs text-gray-300 font-normal tracking-wide'>
                  {movie.movieYear}
                </p>

                <p className='text-xs text-gray-300 font-normal tracking-wide'>
                  {movie.movieStars.join(' • ')}
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
      ))}

      <div className='p-3'>
        {query === '' ? (
          <p className='flex items-center gap-1.5 text-neutral-400 text-sm font-normal tracking-wide'>
            Waiting for user input...
            <SmallLoader
              color='text-blue-400'
              size='text-xl'
            />
          </p>
        ) : (
          <p className='text-neutral-400 text-base font-normal tracking-wide'>
            <span className='text-blue-400'>{movies?.length}&nbsp;</span>
            {movies?.length === 1 ? 'result' : 'results'} for
            <span className='text-blue-400 tracking-wider'>&nbsp;{query}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Results;
