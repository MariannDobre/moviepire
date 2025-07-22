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
        className={`bg-neutral-800 fixed p-1.5 md:p-3 flex items-center justify-center z-50 ${
          isInputFocused
            ? 'block w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[352px] 2xl:w-[384px]'
            : 'hidden w-0'
        } border border-red-700 rounded-md shadow-sm max-h-96 overflow-y-auto`}
      >
        <p className='text-red-500 text-xs md:text-sm font-medium md:font-normal tracking-wider md:tracking-wide text-center'>
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
        isInputFocused
          ? 'block w-56 sm:w-64 md:w-72 lg:w-80 xl:w-[352px] 2xl:w-[384px]'
          : 'hidden w-0'
      } border border-neutral-500 rounded-md shadow-sm max-h-96 overflow-y-auto`}
    >
      {movies?.map((movie, index) => (
        <div
          key={index}
          className='flex items-start justify-start gap-3 p-1.5 md:p-3 cursor-pointer hover:bg-gray-50/10 transition-all duration-500'
          onClick={() => {
            navigate(`/about/${movie.id}`);
            setQuery('');
            setIsInputFocused(false);
          }}
        >
          {isFetching ? (
            <SmallLoader
              width='w-full'
              height='h-20 2xl:h-28'
              color='text-white'
              size='text-xl'
            />
          ) : (
            <React.Fragment>
              <LazyLoadImage
                className='w-14 h-20 2xl:w-18 2xl:h-28'
                src={movie.moviePoster}
                alt={`Poster for ${movie.movieName}`}
                effect='opacity'
                delayMethod='debounce'
                delayTime={500}
              />

              <div className='flex flex-col items-start gap-0.5 md:gap-1'>
                <h6 className='text-sm md:text-base text-white font-medium md:font-normal tracking-wider md:tracking-wide'>
                  {movie.movieName}
                </h6>

                <p className='text-xs text-gray-300 font-medium md:font-normal tracking-wider md:tracking-wide'>
                  {movie.movieYear}
                </p>

                <p className='text-xs text-gray-300 font-medium md:font-normal tracking-wider md:tracking-wide'>
                  {movie.movieStars.join(' • ')}
                </p>
              </div>
            </React.Fragment>
          )}
        </div>
      ))}

      <div className='p-1.5 md:p-3'>
        {query === '' ? (
          <p className='flex items-center gap-1.5 text-neutral-400 text-xs md:text-sm font-medium md:font-normal tracking-wider md:tracking-wide'>
            Waiting for user input...
            <SmallLoader
              color='text-blue-400'
              size='text-lg md:text-xl'
            />
          </p>
        ) : (
          <p className='text-neutral-400 text-xs md:text-sm lg:text-base font-medium md:font-normal tracking-wider md:tracking-wide'>
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
