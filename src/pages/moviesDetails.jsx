import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useRating } from '../hooks/useRating';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useStatus } from '../hooks/useAddToFavorites';

import styled from 'styled-components';
import { Box } from '../globalVariables';
import { BsPlayCircle } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa6';

import RateMovie from '../components/movies/rateMovie';
import AddToFavorite from '../components/movies/addToFavorite';
import Modal from '../components/modal/modal';
import MiniLoader from '../components/loaders/miniLoader';

// Styles that can be found in other component/common styles
const sharedStyles = `
letter-spacing: var(--letter-spacing-xs);
word-spacing: var(--word-spacing-xs);
`;

// The main container of the page
const StyledMoviesDetails = styled.div`
  --width: 128rem;
  --margin: 4rem;

  display: flex;
  flex-direction: column;
  margin: 0 auto var(--margin) auto;
  width: var(--width);
`;

// Movie name/title
const Title = styled.h3`
  --font-size: 3.6rem;

  font-size: var(--font-size);
  color: var(--color-white);
  ${sharedStyles}
`;

const ClipTitle = styled.h6`
  --font-size: 1.6rem;
  --font-weight-span: 300;
  --line-height: 1.5;

  color: var(--color-white);
  font-size: var(--font-size);
  line-height: var(--line-height);
  ${sharedStyles}

  span {
    color: var(--color-gray-light);
    font-weight: var(--font-weight-span);
  }
`;

// Details about the movie
const Details = styled.p`
  --font-size: 1.6rem;

  font-size: var(--font-size);
  color: var(--color-gray-light);
  text-transform: capitalize;
  ${sharedStyles}
`;

// Movie genre
const Genre = styled.span`
  --font-size: 1.6rem;
  --padding: 0.4rem 1.6rem;

  color: var(--color-white);
  font-size: var(--font-size);
  padding: var(--padding);
  border: 0.15rem solid var(--color-gray-light);
  border-radius: 10rem;
  ${sharedStyles}
`;

const ClipGenre = styled.p`
  --font-size: calc(1.2rem + 0.2rem);
  --font-weight: 300;

  color: var(--color-gray-light);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-transform: capitalize;
  ${sharedStyles}
`;

// Movie description
const Description = styled.p`
  --font-size: 1.6rem;
  --line-height: 1.5;
  --font-weight: 500;

  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  ${sharedStyles}
`;

const ClipDescription = styled.p`
  --font-size: 1.2rem;
  --line-height: 1.5;

  font-size: var(--font-size);
  line-height: var(--line-height);
  color: var(--color-white);
  ${sharedStyles}
`;

// Movie distribution
const DistributionTag = styled.span`
  --font-size: 1.6rem;
  --line-height: 1.5;
  --font-weight: 700;

  color: var(--color-main-400);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  ${sharedStyles}
`;

const DistributionTeam = styled.p`
  --font-size: 1.6rem;
  --line-height: 1.5;
  --font-weight: 500;

  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  ${sharedStyles}

  span {
    color: var(--color-main-400);
  }
`;

const Cast = styled.p`
  --font-size: 1.6rem;
  --font-size-svg: 2rem;
  --line-height: 1.5;
  --font-weight: 500;
  --font-weight-link: 700;

  display: flex;
  align-items: center;
  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  ${sharedStyles}

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-main-400);
    font-weight: var(--font-weight-link);
    transition: color 0.35s ease;

    &:hover,
    &:active {
      color: var(--color-main-500);
    }

    svg {
      font-size: var(--font-size-svg);
    }
  }
`;

// The main poster of the page
const Poster = styled.img`
  --width: 28rem;
  --height: 40rem;

  width: var(--width);
  height: var(--height);
  background: no-repeat center / cover;
`;

// The second poster for viewing the clip modal
const ClipPoster = styled.img`
  --width: 8.8rem;
  --height: 13.2rem;

  width: var(--width);
  height: var(--height);
  background: no-repeat center / cover;
`;

// The container that holds the trailer and the link heading
const Trailer = styled.div`
  --width: 68rem;
  --height: 40rem;
  --padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: var(--height);
  width: var(--width);
  padding: var(--padding);
  cursor: pointer;

  &:hover {
    p {
      color: var(--color-gray);
      transition: color 0.35s ease;
    }

    svg {
      color: #fab005;
      transition: color 0.35s ease;
    }
  }
`;

const TrailerHeading = styled.p`
  --font-size: 2.4rem;
  --font-size-svg: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  font-size: var(--font-size);
  color: var(--color-white);
  ${sharedStyles}

  svg {
    font-size: var(--font-size-svg);
  }
`;

// The container that opens the modal for viewing the movie clip and the clip itself
const ClipContainer = styled.div`
  --width: 28rem;
  --height: 20rem;
  --padding: 1.2rem;
  --font-size: 1.6rem;
  --line-height: 1.4;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: var(--width);
  height: var(--height);
  font-size: var(--font-size);
  line-height: var(--line-height);
  color: var(--color-white);
  background-color: var(--color-black-light);
  padding: var(--padding);
  ${sharedStyles};
`;

const Clip = styled.iframe`
  --width: 76rem;
  --height: 52rem;

  width: var(--width);
  height: var(--height);
`;

// Actions for authenticated users as: rate a movie, add a movie to favorite/to viewed list
const ActionsHeading = styled.h6`
  --font-size: 1.2rem;

  color: var(--color-gray-light);
  font-size: var(--font-size);
  text-transform: uppercase;
  ${sharedStyles}
`;

// Styles and components for the movies that have a clip available
const CloseModal = styled.button`
  --font-size: 1.6rem;
  --font-size-svg: 2.4rem;
  --font-weight: 600;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-white);
  background-color: transparent;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) var(--padding-md);
  transition: background-color 0.35s ease;
  cursor: pointer;
  ${sharedStyles}

  &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: var(--font-size-svg);
  }
`;

//

const HorizontalBar = styled.div`
  --width: 100%;
  --height: 0.2rem;

  width: var(--width);
  height: var(--height);
  background-color: var(--color-gray-dark);
`;

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
  const { dbRatings } = useRating(userId, movieId);
  const { favoritesStatus, isPending: gettingFavoriteStatus } = useStatus(
    userId,
    movieId
  );

  // Computing the necessary values for RateMovie component to work properly
  const movieTitle = movieDetails?.movieName;

  // Computing the necessary values for AddToFavorite component to work properly
  const findMovieRating = dbRatings?.filter(
    (item) => item?.item_id === movieId
  );
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
    <StyledMoviesDetails>
      <Box
        $direction='column'
        $gap='1.6rem'
        $maxWidth='128rem'
        $height='auto'
        $padding='calc(4rem + 5.6rem) 0 0 0'
        style={{
          background: `linear-gradient(
          90deg,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.75),
          rgba(0, 0, 0, 0.75),
          rgba(0, 0, 0, 1)
          ),url(${movieDetails?.movieBg}) no-repeat center / cover`,
        }}
      >
        <Box
          $alignItems='center'
          $justifyContent='space-between'
          $maxWidth='128rem'
          $height='7.2rem'
        >
          <Box
            $direction='column'
            $maxWidth='100rem'
            $height='7.2rem'
          >
            <Title>{movieTitle}</Title>

            <Details>
              {movieDetails?.movieYear}&nbsp;|&nbsp;{movieDetails?.type}
              &nbsp;|&nbsp;
              {formattedDuration}
            </Details>
          </Box>

          <Box
            $alignItems='center'
            $justifyContent='space-between'
            $maxWidth='28rem'
            $height='7.2rem'
          >
            <Box
              $direction='column'
              $alignItems='center'
              $justifyContent='center'
              $gap='0.4rem'
              $maxWidth='calc(16rem - 2rem)'
            >
              <ActionsHeading>Your Rating</ActionsHeading>

              <RateMovie
                userId={userId}
                itemId={movieId}
                movieTitle={movieTitle}
              />
            </Box>

            <Box
              $direction='column'
              $alignItems='center'
              $justifyContent='center'
              $gap='0.4rem'
              $maxWidth='calc(16rem - 2rem)'
            >
              <ActionsHeading>
                {favoritesStatus[0]?.is_favorite === true
                  ? `seen ${
                      movieDetails?.type === 'tv show' ? 'series' : 'movie'
                    }`
                  : `unseen ${
                      movieDetails?.type === 'tv show' ? 'series' : 'movie'
                    }`}
              </ActionsHeading>

              {gettingFavoriteStatus ? (
                <MiniLoader />
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
            </Box>
          </Box>
        </Box>

        <Box
          $justifyContent='center'
          $gap='2rem'
          $maxWidth='128rem'
        >
          <Poster
            src={movieDetails?.moviePoster}
            alt={`Poster of ${movieTitle}`}
          />

          <Trailer
            style={{
              background: `linear-gradient(135deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.35)) ,url(${movieDetails?.movieBg}) no-repeat center / cover`,
            }}
            onClick={handleWatchTrailer}
          >
            <TrailerHeading>
              <BsPlayCircle />
              &nbsp;Play trailer
            </TrailerHeading>
          </Trailer>

          <ClipContainer
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
          </ClipContainer>
        </Box>

        {clipModal && (
          <Modal>
            <Modal.Overlay
              onClick={(event) => {
                if (event.target === event.currentTarget) setClipModal(false);
              }}
            >
              <Modal.Body
                display='flex'
                flexDirection='row'
                alignItems='flex-start'
                justifyContent='flex-start'
                backgroundColor='transparent'
                width='auto'
                height='auto'
              >
                <Box
                  $direction='column'
                  $gap='1.2rem'
                  $padding='1.2rem 0 0 0'
                  $width='100%'
                  $maxWidth='76rem'
                  $height='100%'
                  $maxHeight='58.4rem'
                >
                  <CloseModal onClick={() => setClipModal(false)}>
                    <MdClose /> Close
                  </CloseModal>

                  <Clip
                    frameBorder={0}
                    title={`${movieTitle} clip`}
                    src={`${movieDetails?.movieVideos[0]}?autoplay=1`}
                  />
                </Box>

                <Box
                  $direction='column'
                  $gap='1.2rem'
                  $backgroundColor='#1a1a1a'
                  $width='100%'
                  $maxWidth='32rem'
                  $height='calc(56rem + 1.2rem + 1.2rem)'
                  $maxHeight='58.4rem'
                  $padding='2rem'
                >
                  <Box
                    $gap='1.2rem'
                    $height='100%'
                    $maxHeight='13.2rem'
                  >
                    <ClipPoster
                      src={movieDetails?.moviePoster}
                      alt={`Poster of ${movieTitle}`}
                    />

                    <Box
                      $direction='column'
                      $alignItems='flex-start'
                      $gap='0.4rem'
                    >
                      <ClipTitle>
                        {movieTitle}&nbsp;<span>({movieYear})</span>
                      </ClipTitle>

                      <ClipGenre>
                        {movieDetails?.movieGenre.join(' • ')}
                      </ClipGenre>
                    </Box>
                  </Box>

                  <HorizontalBar />

                  <ClipDescription>
                    {movieDetails?.movieDescription}
                  </ClipDescription>
                </Box>
              </Modal.Body>
            </Modal.Overlay>
          </Modal>
        )}

        <Box $gap='1.2rem'>
          {movieDetails?.movieGenre.map((item, index) => (
            <Genre key={index}>{item}</Genre>
          ))}
        </Box>

        <Box
          $direction='column'
          $gap='1.2rem'
          $backgroundColor='#1a1a1a'
          $padding='2rem'
        >
          <Description>{movieDetails?.movieDescription}</Description>

          <HorizontalBar />

          <Box
            $alignItems='center'
            $gap='0.8rem'
          >
            <DistributionTag>
              {movieDetails?.type === 'tv show' ? 'Creator' : 'Director'}
            </DistributionTag>

            <DistributionTeam>
              {movieDetails?.movieDirector.split('&').map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>&</span>}
                  {item}
                </React.Fragment>
              ))}
            </DistributionTeam>
          </Box>

          <HorizontalBar />

          {movieDetails?.type === 'tv show' ? null : (
            <>
              <Box
                $alignItems='center'
                $gap='0.8rem'
              >
                <DistributionTag>Writers</DistributionTag>

                <DistributionTeam>
                  {movieDetails?.movieWriters.map((item, index, array) => (
                    <React.Fragment key={index}>
                      {item}
                      <span>{index !== array.length - 1 ? 'X' : ''}</span>
                    </React.Fragment>
                  ))}
                </DistributionTeam>
              </Box>

              <HorizontalBar />
            </>
          )}

          <Box
            $alignItems='center'
            $gap='0.8rem'
          >
            <DistributionTag>Stars</DistributionTag>

            <DistributionTeam>
              {movieDetails?.movieStars.map((item, index, array) => (
                <React.Fragment key={index}>
                  {item}
                  <span>{index !== array.length - 1 ? ' X ' : ''}</span>
                </React.Fragment>
              ))}
            </DistributionTeam>
          </Box>

          <HorizontalBar />

          <Box>
            <Cast>
              Check the full cast & crew via TMDB&nbsp;
              <Link
                to={movieDetails?.movieCasts}
                target='_blank'
              >
                here
                <FaAngleRight />
              </Link>
            </Cast>
          </Box>
        </Box>
      </Box>
    </StyledMoviesDetails>
  );
}

export default MoviesDetails;
