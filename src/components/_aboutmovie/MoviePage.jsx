import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/movies/useMovieDetails';

import MovieBanner from './MovieBanner';
import MovieBannerDetails from './MovieBannerDetails';
import MoviePlot from './MoviePlot';
import MovieRating from './MovieRating';
import MovieCast from './MovieCast';
import MovieDetails from './MovieDetails';
import SmallLoader from '../loaders/SmallLoader';

import { BsBoxArrowInLeft } from 'react-icons/bs';

export default function MoviePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { movieDetails, isFetching, error } = useMovieDetails(movieId);

  if (error)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-9 bg-neutral-50/10 border border-red-700 rounded-lg shadow-sm'>
        <p className='text-red-500 text-sm font-normal tracking-wide text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the movie data...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div className='w-full h-auto flex flex-col gap-9 relative'>
      <button
        type='button'
        className='outline-none border-none cursor-pointer absolute top-0 left-3 md:left-6 xl:left-9 2xl:left-12 flex items-center justify-center text-center gap-1.5 py-1 px-4 md:py-1.5 md:px-6 text-xs md:text-sm text-white bg-blue-400 font-normal tracking-wide rounded-sm md:rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
        onClick={() => navigate('/')}
      >
        <span className='text-base md:text-lg'>
          <BsBoxArrowInLeft />
        </span>
        Back to Home Page
      </button>

      <MovieBanner movieBanner={movieDetails?.movieBg}>
        <MovieBannerDetails movie={movieDetails} />
      </MovieBanner>

      <div className='w-full h-auto lg:h-40 flex flex-col lg:flex-row items-center justify-between gap-3 md:gap-6 lg:gap-9'>
        <MoviePlot plot={movieDetails?.movieDescription} />

        <MovieRating
          movieId={Number(movieId)}
          movieTitle={movieDetails?.movieName}
        />
      </div>

      <div className='w-full h-auto lg:h-64 flex flex-col lg:flex-row items-center justify-between gap-3 md:gap-6 lg:gap-9'>
        <MovieCast
          movieDirector={movieDetails?.movieDirector}
          movieWriters={movieDetails?.movieWriters}
          movieCast={movieDetails?.movieStars}
        />

        <MovieDetails
          movieId={Number(movieId)}
          movieBudget={movieDetails?.movieBudget}
          movieRuntime={movieDetails?.movieDuration}
          movieYear={movieDetails?.movieYear}
          imdbRating={movieDetails?.imdbRating}
        />
      </div>
    </div>
  );
}
