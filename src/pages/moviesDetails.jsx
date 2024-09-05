import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';
import { useRatings } from '../hooks/movies/useRatings';
import { useMovieDetails } from '../hooks/movies/useMovieDetails';
import { useMovieStatus } from '../hooks/movies/useMovieStatus';
import { BsPlayCircle } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa6';
import RateMovie from '../components/movies/rateMovie';
import AddToFavorite from '../components/movies/addToFavorite';
import SmallLoader from '../components/loaders/SmallLoader';

function MoviesDetails() {
  const [clipModal, setClipModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize the necessary variables, objects for the component and his childrens
  const params = useParams();
  const navigate = useNavigate();
  const movieId = params.movieId;
  const { user, isAuthenticated } = useUser();
  const userId = user?.id;
  const { movieDetails } = useMovieDetails(movieId);
  const { ratings } = useRatings(userId, movieId);
  const { viewedStatus, isFetching: gettingFavoriteStatus } = useMovieStatus(
    userId,
    movieId
  );

  // Computing the necessary values for RateMovie component to work properly
  const movieTitle = movieDetails?.movieName;

  // Computing the necessary values for AddToFavorite component to work properly
  const findMovieRating = ratings?.filter((item) => item?.item_id === movieId);
  const movieRating = findMovieRating[0]?.ratings
    ? findMovieRating[0]?.ratings
    : 0;
  const movieYear = movieDetails?.movieYear;

  // Calculating the total runtime of a movie based on the database value
  const movieDuration = movieDetails?.movieDuration;
  const totalMinutes = parseInt(movieDuration, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedDuration = `${hours}h ${minutes < 10 ? 0 : ''}${minutes}m`;

  // Effect to inform the user

  // Function to handle actions in the component
  function handleWatchTrailer() {
    navigate(
      `/title-id/${movieDetails?.id}/trailer-id/${movieDetails?.movieName}`
    );
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>{movieTitle}</h1>

            <p>
              {movieDetails?.movieYear}&nbsp;|&nbsp;{movieDetails?.type}
              &nbsp;|&nbsp;
              {formattedDuration}
            </p>
          </div>

          <div>
            <div>
              <p>Your Rating</p>

              <RateMovie
                userId={userId}
                itemId={movieId}
                movieTitle={movieTitle}
              />
            </div>

            <div>
              <p>
                {viewedStatus[0]?.is_favorite === true
                  ? `seen ${
                      movieDetails?.type === 'tv show' ? 'series' : 'movie'
                    }`
                  : `unseen ${
                      movieDetails?.type === 'tv show' ? 'series' : 'movie'
                    }`}
              </p>

              {gettingFavoriteStatus ? (
                <SmallLoader />
              ) : (
                <AddToFavorite
                  userId={userId}
                  itemId={movieId}
                  movieTitle={movieTitle}
                  movieYear={movieYear}
                  movieDuration={movieDuration}
                  movieRating={movieRating}
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <img
            src={movieDetails?.moviePoster}
            alt={`Poster of ${movieTitle}`}
          />

          <div
            style={{
              background: `linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.35)) ,url(${movieDetails?.movieBg}) no-repeat center / cover`,
            }}
            onClick={handleWatchTrailer}
          >
            <p>
              <BsPlayCircle />
              &nbsp;Play trailer
            </p>
          </div>

          <div
            style={{
              cursor:
                movieDetails?.movieVideos === null ? 'default' : 'pointer',
              backgroundColor:
                movieDetails?.movieVideos !== null && isHovered
                  ? 'rgba(153, 153, 153, 0.25)'
                  : '',
              transition: 'background-color 0.35s ease',
            }}
            onClick={() => {
              if (movieDetails?.movieVideos === null) return;

              setClipModal(true);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {movieDetails?.movieVideos === null ? (
              <p>No clip available for this title yet</p>
            ) : (
              <p>Clip available</p>
            )}
          </div>
        </div>

        {clipModal && (
          <div>
            <div
              onClick={(event) => {
                if (event.target === event.currentTarget) setClipModal(false);
              }}
            >
              <div>
                {/* <Modal.Body
                display='flex'
                flexDirection='row'
                alignItems='flex-start'
                justifyContent='flex-start'
                backgroundColor='transparent'
                width='auto'
                height='auto'
              > */}
                <div>
                  <button onClick={() => setClipModal(false)}>
                    <MdClose /> Close
                  </button>

                  <iframe
                    frameBorder={0}
                    title={`${movieTitle} clip`}
                    src={`${movieDetails?.movieVideos[0]}?autoplay=1`}
                  />
                </div>

                <div>
                  <div>
                    <img
                      src={movieDetails?.moviePoster}
                      alt={`Poster of ${movieTitle}`}
                    />

                    <div>
                      <p>
                        {movieTitle}&nbsp;<span>({movieYear})</span>
                      </p>

                      <p>{movieDetails?.movieGenre.join(' • ')}</p>
                    </div>
                  </div>

                  <p>{movieDetails?.movieDescription}</p>
                </div>
                {/* </Modal.Body>
            </Modal.Overlay>
          </Modal> */}
              </div>
            </div>
          </div>
        )}

        <div>
          {movieDetails?.movieGenre.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <div>
          <p>{movieDetails?.movieDescription}</p>

          <div>
            <span>
              {movieDetails?.type === 'tv show' ? 'Creator' : 'Director'}
            </span>

            <p>
              {movieDetails?.movieDirector.split('&').map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>&</span>}
                  {item}
                </React.Fragment>
              ))}
            </p>
          </div>

          {movieDetails?.type === 'tv show' ? null : (
            <>
              <div>
                <span>Writers</span>

                <p>
                  {movieDetails?.movieWriters.map((item, index, array) => (
                    <React.Fragment key={index}>
                      {item}
                      <span>{index !== array.length - 1 ? 'X' : ''}</span>
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </>
          )}

          <div>
            <span>Stars</span>

            <p>
              {movieDetails?.movieStars.map((item, index, array) => (
                <React.Fragment key={index}>
                  {item}
                  <span>{index !== array.length - 1 ? ' X ' : ''}</span>
                </React.Fragment>
              ))}
            </p>
          </div>

          <div>
            <p>
              Check the full cast & crew via TMDB&nbsp;
              <Link
                to={movieDetails?.movieCasts}
                target='_blank'
              >
                here
                <FaAngleRight />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesDetails;
