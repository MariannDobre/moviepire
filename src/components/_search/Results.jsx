import { useNavigate } from 'react-router-dom';
import { useMovieByTitle } from '../../hooks/movies/useMovieByTitle';

import SmallLoader from '../../interface/_loaders/SmallLoader';
import LazyImage from '../../utils/LazyImage';

function Results({ query, onQuery, onCloseModal }) {
  const { movies, isFetching, error } = useMovieByTitle(query);
  const navigate = useNavigate();

  const shortQuery = query.length >= 3;

  if (error)
    return (
      <div className='w-[calc(876px-48px-2px)] h-[calc(524px-48px-32px-24px-2px-34px-12px)] border border-red-500 bg-red-950/35 flex flex-col items-center justify-center gap-6 p-6 rounded-md'>
        <p className='text-red-500 text-sm font-normal tracking-wider text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (!shortQuery)
    return (
      <div className='w-[calc(876px-48px-2px)] h-[calc(524px-48px-32px-24px-2px-34px-12px)] border border-neutral-700 bg-transparent flex flex-col items-center justify-center gap-6 p-6 rounded-md'>
        <p className='text-neutral-400 text-sm font-normal tracking-wider text-center'>
          Start typing to explore — we’ll show results once your query has at
          least
          <br />
          <span className='text-neutral-200 font-medium'>3 characters</span>.
        </p>
      </div>
    );

  if (shortQuery && !isFetching && movies?.length === 0)
    return (
      <div className='w-[calc(876px-48px-2px)] h-[calc(524px-48px-32px-24px-2px-34px-12px)] border border-neutral-700 bg-transparent flex flex-col items-center justify-center gap-6 p-6 rounded-md'>
        <p className='text-neutral-400 text-sm font-normal tracking-wider text-center'>
          No results found for&nbsp;
          <span className='text-neutral-200 font-medium'>“{query}”</span>.
          <br />
          Try checking your spelling or using different keywords.
        </p>
      </div>
    );

  return (
    <div
      className={`w-[calc(876px-48px-2px)] h-[calc(524px-48px-32px-24px-2px-34px-12px)] border ${
        isFetching
          ? 'bg-yellow-950/45 border-yellow-500'
          : 'border-neutral-700 bg-transparent'
      } flex flex-col items-center gap-3 p-3 rounded-md overflow-y-auto transition-colors duration-300`}
    >
      {isFetching ? (
        <div className='w-full h-full flex justify-center items-center'>
          <SmallLoader
            size='text-2xl'
            color='text-yellow-500'
          />
        </div>
      ) : (
        movies?.map((movie, index) => (
          <div
            key={index}
            className='w-full h-28 cursor-pointer bg-transparent flex items-center gap-3 p-1.5 rounded-md hover:bg-white/10 focus-visible:bg-white/10 transition-colors duration-300'
            onClick={() => {
              navigate(`/about-movie/${movie.id}`);
              onQuery('');
              onCloseModal();
            }}
          >
            <LazyImage
              src={movie.moviePoster}
              alt={`Poster for ${movie.movieName}`}
              className='w-16 h-full object-cover'
            />

            <div className='flex flex-col items-start gap-1'>
              <h6 className='text-white text-base font-medium tracking-wider'>
                {movie.movieName}&nbsp;
                <span className='text-neutral-400 text-sm font-normal'>
                  ({movie.movieYear})
                </span>
              </h6>

              <p className='text-neutral-200 text-xs font-normal tracking-widest'>
                {movie.movieGenre.join(' • ')}
              </p>

              <p className='text-neutral-200 text-xs font-normal tracking-widest'>
                {movie.movieStars.join(' • ')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Results;
