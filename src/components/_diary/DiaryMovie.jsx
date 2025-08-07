import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useUser } from '../../hooks/auth/useUser';
import { useRemoveFromDiary } from '../../hooks/movies/mutations/useRemoveFromDiary';
import { useRating } from '../../hooks/movies/useRating';

import MovieHeading from './MovieHeading';
import MovieGenres from './MovieGenres';
import MovieCast from './MovieCast';
import MovieDescription from './MovieDescription';
import MovieControlPanel from './MovieControlPanel';
import SmallLoader from '../loaders/SmallLoader';

import { FaTrashAlt } from 'react-icons/fa';

import 'react-lazy-load-image-component/src/effects/opacity.css';

export default function DiaryMovie({ movie }) {
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
    movieStars,
  } = movieData;

  const { rating } = useRating(user?.id, id);
  const { removeFromDiary, isPending: isRemovingFromDiary } =
    useRemoveFromDiary(user?.id, id, movieName);
  const movieRating = rating?.ratings || 0;

  if (!movie || !movie.movies) {
    // return (
    //   <div className='w-full h-[420px] flex items-center justify-center'>
    //     <p className='text-gray-400 text-lg font-normal tracking-wide text-center'>
    //       Movie data not available
    //     </p>
    //   </div>
    // );

    return console.warn('DiaryMovie skipped: missing movie or movie.movies');
  }

  // const findCurrentRating = ratings.filter(
  //   (item) => item.item_id === Number(id)
  // );
  // const movieRating =
  //   findCurrentRating.length > 0 ? findCurrentRating[0]?.ratings : 0;

  return (
    <div className='w-full flex flex-col gap-1.5 lg:gap-3 relative'>
      <button
        type='button'
        onClick={removeFromDiary}
        disabled={isRemovingFromDiary}
        className='group absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 outline-none border border-neutral-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 bg-transparent flex items-center justify-center rounded-md shadow-sm hover:border-red-700 focus-visible:border-red-700 hover:bg-red-100/10 focus-visible:bg-red-100/10 transition-all duration-500'
      >
        {isRemovingFromDiary ? (
          <SmallLoader
            color='text-red-500'
            size='text-sm'
          />
        ) : (
          <span className='w-full h-full flex items-center justify-center text-sm md:text-base text-red-500 group-hover:text-red-700 group-focus-visible:text-red-700 transition-all duration-500'>
            <FaTrashAlt />
          </span>
        )}
      </button>

      <div className='w-full h-auto flex items-start justify-start gap-3'>
        <div className='w-[72px] xl:w-[172px] h-auto'>
          <LazyLoadImage
            style={{
              width: '100%',
              height: '100%',
            }}
            className='w-full h-full object-cover drop-shadow-sm opacity-85'
            src={moviePoster}
            alt={`Poster for ${movieName}`}
            effect='opacity'
            delayMethod='debounce'
            delayTime={500}
          />
        </div>

        <div className='w-[calc(100%-12px-72px-32px-12px)] xl:w-[calc(100%-12px-172px-40px-12px)] h-full flex flex-col gap-1.5 lg:gap-3'>
          {/* HEADING */}
          <MovieHeading
            id={id}
            movieName={movieName}
            movieYear={movieYear}
            movieDuration={movieDuration}
          />

          {/* GENRES + TYPES */}
          <MovieGenres
            movieGenre={movieGenre}
            type={type}
          />

          {/* CAST */}
          <MovieCast movieStars={movieStars} />
        </div>
      </div>

      <div className='w-full h-auto'>
        {/* DESCRIPTION */}
        <MovieDescription movieDescription={movieDescription} />
      </div>

      <div className='w-full h-auto'>
        {/* CONTROL PANEL */}
        <MovieControlPanel
          id={id}
          imdbRating={imdbRating}
          movieRating={movieRating}
          date={movie.created_at}
        />
      </div>
    </div>
  );
}
