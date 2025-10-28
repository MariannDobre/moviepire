import { useUser } from '../../hooks/auth/useUser';
import { useRemoveFromDiary } from '../../hooks/movies/mutations/useRemoveFromDiary';
import { useRating } from '../../hooks/movies/useRating';

import MovieHeading from './MovieHeading';
import MovieGenres from './MovieGenres';
import MovieCast from './MovieCast';
import MovieDescription from './MovieDescription';
import SmallLoader from '../../interface/_loaders/SmallLoader';

import { FaTrashAlt } from 'react-icons/fa';
import LazyImage from '../../utils/LazyImage';
import MovieRating from './MovieRating';

export default function DiaryMovie({ movie, index }) {
  const { user } = useUser();

  const movieData = movie?.movies || {};
  const {
    id,
    type,
    imdbRating,
    movieName,
    moviePoster,
    movieYear,
    movieDuration,
    movieGenre,
    movieDescription,
    movieDirector,
    movieStars,
  } = movieData;

  const { rating } = useRating(user?.id, id);
  const { removeFromDiary, isPending: isRemovingFromDiary } =
    useRemoveFromDiary(user?.id, id, movieName);

  const userRating = rating?.ratings ?? 0;

  return (
    <div className='w-full h-auto flex flex-col gap-3 relative'>
      <button
        type='button'
        aria-label='Remove the current movie from the diary'
        title='Remove the current movie from the diary'
        onClick={removeFromDiary}
        disabled={isRemovingFromDiary}
        className='group absolute top-0 right-0 w-8 h-8 outline-none border border-neutral-700 bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 flex items-center justify-center rounded-md hover:bg-white/15 focus-visible:bg-white/15 transition-colors duration-300'
      >
        {isRemovingFromDiary ? (
          <SmallLoader
            size='text-sm'
            color='text-red-500'
          />
        ) : (
          <span className='w-full h-full flex items-center justify-center text-sm text-red-500 transition-colors duration-300'>
            <FaTrashAlt />
          </span>
        )}
      </button>

      <div className='w-full h-auto flex items-start justify-start gap-3'>
        <div className='w-44 h-72'>
          <LazyImage
            src={moviePoster}
            alt={`Poster of ${movieName}`}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='w-[calc(100%-72px-24px-176px-12px)] h-full flex flex-col gap-3'>
          {/* HEADING */}
          <MovieHeading
            id={id}
            movieName={movieName}
            movieYear={movieYear}
            movieDuration={movieDuration}
            date={movie.created_at}
            index={index}
          />

          {/* GENRES + TYPES */}
          <MovieGenres
            movieGenre={movieGenre}
            type={type}
          />

          {/* IMDB RATING + USER RATING */}
          <MovieRating
            id={id}
            imdbRating={imdbRating}
            userRating={userRating}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <MovieDescription movieDescription={movieDescription} />

      {/* CAST */}
      <MovieCast
        movieDirector={movieDirector}
        movieStars={movieStars}
      />
    </div>
  );
}
