import { Link, useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/movies/useMovieDetails';

import MovieBanner from '../components/_about-movie-page/MovieBanner';
import MovieBannerDetails from '../components/_about-movie-page/MovieBannerDetails';
import MovieGenres from '../components/_about-movie-page/MovieGenres';
import MoviePlot from '../components/_about-movie-page/MoviePlot';
import MovieCast from '../components/_about-movie-page/MovieCast';
import SmallLoader from '../interface/_loaders/SmallLoader';
import RateMovie from '../components/_about-movie-page/RateMovie';
import AddToDiary from '../components/_about-movie-page/AddToDiary';

import { BsBoxArrowInLeft } from 'react-icons/bs';

export default function AboutMoviePage() {
  const params = useParams();
  const { movieID } = params;
  const { movieDetails, isFetching, error } = useMovieDetails(movieID);

  if (error)
    return (
      <div className='w-full h-[calc(100vh-72px)] p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
        <p className='text-red-500 text-base font-normal tracking-wider text-center'>
          There was an error while fetching the movie data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-72px)] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Loading the movie data...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );

  return (
    <div className='w-full h-auto flex flex-col gap-16 relative'>
      <Link
        to='/'
        className='outline-none border-none cursor-pointer absolute top-0 left-0 flex items-center justify-center text-center gap-1.5 py-1.5 px-6 bg-amber-400 text-black text-sm font-medium tracking-wider rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
      >
        <span className='text-lg'>
          <BsBoxArrowInLeft />
        </span>
        Back to Home Page
      </Link>

      {/* Page header */}
      <MovieBanner movieBanner={movieDetails?.movieBg}>
        <MovieBannerDetails
          movieID={Number(movieID)}
          movieName={movieDetails?.movieName}
          movieYear={movieDetails?.movieYear}
          movieDuration={movieDetails?.movieDuration}
          movieType={movieDetails?.type}
          moviePoster={movieDetails?.moviePoster}
          movieTrailer={movieDetails?.movieTrailer}
          movieClip={
            movieDetails?.movieVideos?.length
              ? movieDetails.movieVideos[0]
              : null
          }
        />
      </MovieBanner>

      {/* Details about the movie */}
      <section className='w-full h-auto flex gap-6'>
        <div className='w-[calc(100%-12px-288px)] h-auto flex flex-col gap-3'>
          {/* Movie genres */}
          <MovieGenres movieGenres={movieDetails?.movieGenre} />

          {/* Movie plot */}
          <MoviePlot moviePlot={movieDetails?.movieDescription} />

          {/* Movie cast */}
          <MovieCast
            movieWriters={movieDetails?.movieWriters}
            movieStars={movieDetails?.movieStars}
          />
        </div>

        {/* Page actions (rate movie/add to diary) */}
        {23 > 22 ? (
          <div className='w-72 h-auto flex flex-col gap-3 self-start'>
            <RateMovie
              movieID={Number(movieID)}
              movieName={movieDetails?.movieName}
            />

            <AddToDiary
              movieID={movieID}
              movieName={movieDetails?.movieName}
              movieYear={movieDetails?.movieYear}
              movieDuration={movieDetails?.movieDuration}
            />
          </div>
        ) : (
          <div className='w-72 h-auto p-3 flex flex-col items-center justify-center gap-3 bg-white/15 border border-neutral-700 rounded-md'>
            <p className='text-white text-sm font-normal tracking-wider text-center'>
              Login or register a valid account to interact with following
              options (rating &mdash; diary)
            </p>

            <div className='w-full h-auto flex items-center justify-center gap-3'>
              <Link
                to='/login'
                className='outline-none border-none cursor-pointer no-underline py-1.5 px-6 bg-amber-400 rounded-md text-black text-sm font-mono tracking-wider text-center hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
              >
                Login
              </Link>

              <Link
                to='/register'
                className='outline-none border-none cursor-pointer no-underline py-1.5 px-6 bg-amber-400 rounded-md text-black text-sm font-mono tracking-wider text-center hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
