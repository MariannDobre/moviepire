import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMovieDetails } from '../hooks/movies/useMovieDetails';
import { useMovieStatus } from '../hooks/movies/useMovieStatus';
import { useUser } from '../hooks/auth/useUser';

import Modal from '../interface/compound components/Modal';
import ViewClip from '../components/movies/ViewClip';
import SmallLoader from '../components/loaders/SmallLoader';

import {
  BsFillBookmarkPlusFill,
  BsFillBookmarkCheckFill,
} from 'react-icons/bs';

import 'react-lazy-load-image-component/src/effects/opacity.css';

const actionsButtonsStyles =
  'text-sm text-center text-red-400 tracking-wider bg-neutral-800/50 py-1 px-2 outline outline-1 outline-neutral-400/50 border-none cursor-pointer rounded-full shadow-lg hover:text-red-400/75 hover:bg-neutral-800/25 hover:outline-neutral-500 transition-all duration-300';

function AboutMovie() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { user, isAuthenticated } = useUser();
  const userId = isAuthenticated ? user?.id : null;
  const {
    movieDetails,
    isFetching: getMovies,
    error: detailsError,
  } = useMovieDetails(movieId);
  const {
    viewedStatus,
    isFetching: getStatus,
    error: statusError,
  } = useMovieStatus(userId, movieId);
  console.log(user);
  console.log(userId);

  const movieDuration = movieDetails?.movieDuration;
  const totalMinutes = parseInt(movieDuration, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedDuration = `${hours}h ${minutes < 10 ? 0 : ''}${minutes}m`;

  return (
    <React.Fragment>
      {detailsError && (
        <div className='text-stone-200 w-full h-[660px] flex items-center justify-center bg-neutral-900/75 rounded-md outline outline-1 outline-neutral-400/50'>
          <p className='text-lg tracking-wide'>
            An unexpected error occurred. We are trying to figure it out and
            solve it as quickly as possible.
          </p>
        </div>
      )}

      {getMovies ? (
        <div
          style={{ height: 'calc(100vh - 96px - 61px)' }}
          className='text-stone-200 w-full flex items-center justify-center bg-neutral-900/75 rounded-md outline outline-1 outline-neutral-400/50'
        >
          <SmallLoader />
        </div>
      ) : (
        <div className='flex flex-col gap-12'>
          <div
            style={{
              background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.75),
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.25),
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.75),
            rgba(0, 0, 0, 1)
            ), url(${movieDetails.movieBg}) no-repeat top / cover`,
            }}
            className='w-full h-[720px] flex justify-between p-12'
          >
            <div>
              <div className='flex gap-4 self-start'>
                <div className='w-44 h-60 relative'>
                  <LazyLoadImage
                    className='w-full h-full'
                    src={movieDetails.moviePoster}
                    alt={`Poster for ${movieDetails.movieName}`}
                    effect='opacity'
                    delayTime={500}
                  />

                  <button className='absolute text-5xl text-neutral-900 top-0 -left-1.5 bg-transparent border-none outline-0 outline-transparent p-0 w-auto h-auto hover:text-neutral-700 focus-visible:text-neutral-700 transition-all duration-300'>
                    {false ? (
                      <BsFillBookmarkCheckFill />
                    ) : (
                      <BsFillBookmarkPlusFill />
                    )}
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
            </div>

            <div className='flex items-center gap-4 self-end'>
              <button
                className={actionsButtonsStyles}
                onClick={() => navigate(`/trailer-for/${movieDetails.id}`)}
              >
                Play Trailer
              </button>

              <button className={actionsButtonsStyles}>Add to Viewlist</button>

              {/* <button className={actionsButtonsStyles}>Rate Title</button> */}
              <Modal>
                <Modal.Open
                  opens='rate-movie'
                  renderButton={() => (
                    <button className={actionsButtonsStyles}>Rate Title</button>
                  )}
                />

                <Modal.Window name='rate-movie'>
                  {/* <RateMovie /> */}

                  <div className='text-xl text-green-500'>RATE MOVIES</div>
                </Modal.Window>
              </Modal>

              {/* <button className={actionsButtonsStyles}>View Clip</button> */}
              <Modal>
                <Modal.Open
                  opens='view-clip'
                  renderButton={() => (
                    <button className={actionsButtonsStyles}>View Clip</button>
                  )}
                />

                <Modal.Window name='view-clip'>
                  <ViewClip
                    movieClip={movieDetails.movieVideos[0]}
                    movieName={movieDetails.movieName}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='bg-neutral-900/75 flex flex-col gap-3 p-6 outline outline-1 outline-neutral-400/50 rounded-md'>
              <h2 className='text-red-400 text-2xl font-bold tracking-wider'>
                About this title
              </h2>

              <p className='text-stone-200 text-base tracking-wide'>
                {movieDetails.movieDescription}
              </p>
            </div>

            <div className='bg-neutral-900/75 flex flex-col gap-3 p-6 outline outline-1 outline-neutral-400/50 rounded-md self-start'>
              <h2 className='text-red-400 text-2xl font-bold tracking-wider'>
                Cast and crew
              </h2>

              <div className='flex flex-col gap-1'>
                <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
                  <span className='text-red-300 tracking-wide font-semibold'>
                    Director
                  </span>
                  {movieDetails.movieDirector}
                </p>
                <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
                  <span className='text-red-300 tracking-wide font-semibold'>
                    Writers
                  </span>
                  {movieDetails.movieWriters.join(' • ')}
                </p>
                <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
                  <span className='text-red-300 tracking-wide font-semibold'>
                    Top stars
                  </span>
                  {movieDetails.movieStars.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default AboutMovie;
