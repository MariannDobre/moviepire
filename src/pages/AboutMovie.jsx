import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/movies/useMovieDetails';
import { useUser } from '../hooks/auth/useUser';

import Modal from '../interface/compound components/Modal';
import ViewClip from '../components/movies/ViewClip';
import RateMovie from '../components/movies/RateMovie';
import SmallLoader from '../components/loaders/SmallLoader';

import MovieDescription from '../components/movies/MovieDescription';
import MovieCast from '../components/movies/MovieCast';
import MovieDetails from '../components/movies/MovieDetails';
import Rating from '../components/movies/Rating';
import AddToViewed from '../components/movies/AddToViewed';

const actionsButtonsStyles =
  'text-sm text-center text-red-400 tracking-wider bg-neutral-800/50 py-1 px-2 outline outline-1 outline-neutral-400/50 border-none cursor-pointer rounded-full shadow-lg hover:text-red-400/75 hover:bg-neutral-800/25 hover:outline-neutral-500 transition-all duration-300';

function AboutMovie() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { isAuthenticated } = useUser();
  const {
    movieDetails,
    isFetching: getMovie,
    error: detailsError,
  } = useMovieDetails(movieId);

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

      {getMovie ? (
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
            className='w-full h-[720px] flex flex-col justify-between p-12'
          >
            <div className='flex items-start justify-between'>
              <MovieDetails movieDetails={movieDetails} />

              {isAuthenticated && <Rating movieId={movieId} />}
            </div>

            <div className='flex items-center gap-4 self-end'>
              <button
                className={actionsButtonsStyles}
                onClick={() => navigate(`/trailer-for/${movieDetails.id}`)}
              >
                Play Trailer
              </button>

              <Modal>
                <Modal.Open
                  opens='add-to-viewlist'
                  renderButton={() => (
                    <button className={actionsButtonsStyles}>
                      Manage Title
                    </button>
                  )}
                />

                <Modal.Window
                  name='add-to-viewlist'
                  height='auto'
                >
                  {isAuthenticated ? (
                    <AddToViewed
                      movieId={movieId}
                      movieTitle={movieDetails.movieName}
                      movieYear={movieDetails.movieYear}
                      movieDuration={movieDetails.movieDuration}
                    />
                  ) : (
                    <div>
                      <p className='text-stone-200 text-lg tracking-wider text-center'>
                        You need to have an account to be able to add this title
                        to the viewlist.
                      </p>
                    </div>
                  )}
                </Modal.Window>
              </Modal>

              <Modal>
                <Modal.Open
                  opens='rate-movie'
                  renderButton={() => (
                    <button className={actionsButtonsStyles}>Rate Title</button>
                  )}
                />

                <Modal.Window
                  name='rate-movie'
                  height='auto'
                >
                  {isAuthenticated ? (
                    <RateMovie
                      movieId={movieId}
                      movieTitle={movieDetails.movieName}
                    />
                  ) : (
                    <div>
                      <p className='text-stone-200 text-lg tracking-wider text-center'>
                        You need to have an account to be able to rate this
                        title.
                      </p>
                    </div>
                  )}
                </Modal.Window>
              </Modal>

              <Modal>
                <Modal.Open
                  opens='view-clip'
                  renderButton={() => (
                    <button className={actionsButtonsStyles}>View Clip</button>
                  )}
                />

                <Modal.Window
                  name='view-clip'
                  height='h-[480px]'
                >
                  <ViewClip
                    movieClip={movieDetails.movieVideos[0]}
                    movieName={movieDetails.movieName}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>

          <div className='flex flex-col gap-6'>
            <MovieDescription description={movieDetails.movieDescription} />

            <MovieCast
              director={movieDetails.movieDirector}
              writers={movieDetails.movieWriters}
              stars={movieDetails.movieStars}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default AboutMovie;
