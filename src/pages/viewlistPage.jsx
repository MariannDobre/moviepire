import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useViewedMovies } from '../hooks/useViewedMovies';
import { useDeleteRating, useRating } from '../hooks/useRating';

import styled from 'styled-components';
import { Box } from '../globalVariables';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { FaArrowUpLong, FaArrowDownLong } from 'react-icons/fa6';
import MiniLoader from '../components/loaders/miniLoader';
import SortBy from '../components/sorting/sortBy';
import Filter from '../components/sorting/filter';
import { useRemoveFromFavorite } from '../hooks/useAddToFavorites';

const sharedStyles = `
letter-spacing: var(--letter-spacing-xs);
word-spacing: var(--word-spacing-xs);
`;

//
const StyledViewlistPage = styled.div`
  --width: 128rem;
  --margin: 5.6rem;
  --padding: 1.6rem 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background-color: var(--color-black-light);
  width: var(--width);
  margin-top: var(--margin);
  padding: var(--padding);
`;

const Heading = styled.p`
  --font-size: 2.4rem;
  --font-weight: 500;

  color: var(--color-gray);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Bookmark = styled.span`
  position: absolute;
  cursor: pointer;

  svg {
    color: #fab005;
    font-size: var(--font-size-3xl);
    transition: color 0.35s ease;

    &:hover {
      color: #f59f00;
    }
  }
`;

const Movie = styled.div`
  --padding: 1.6rem;

  display: flex;
  gap: 1.6rem;
  padding-bottom: var(--padding);
  border-bottom: 0.1rem solid var(--color-gray-light);
`;

const Poster = styled.img`
  --width: 11.2rem;
  --height: 17.6rem;

  width: var(--width);
  height: var(--height);
`;

const Title = styled(Link)`
  --font-size: 1.6rem;
  --font-weight: 500;

  color: var(--color-main-500);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-decoration: none;
  transition: all 0.35s ease;
  ${sharedStyles}

  &:hover,
  &:active {
    color: var(--color-white);
  }
`;

const Year = styled.span`
  --font-size: 1.2rem;
  --font-weight: 600;

  color: var(--color-gray);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Duration = styled.span`
  --font-size: 1.2rem;
  --font-weight: 600;

  color: var(--color-gray);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Type = styled.span`
  --font-size: 1.2rem;
  --font-weight: 600;

  color: var(--color-gray);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-transform: capitalize;
  ${sharedStyles}
`;

const Genre = styled.span`
  --font-size: 1.2rem;
  --font-weight: 600;

  color: var(--color-gray);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Rating = styled.span`
  --font-size: calc(1.2rem + 0.2rem);
  --font-size-svg: calc(1.6rem + 0.2rem);
  --font-weight: 600;

  display: flex;
  align-items: flex-start;
  gap: calc(0.4rem / 2);
  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);

  svg {
    font-size: var(--font-size-svg);
    color: #fab005;
  }
`;

const RatingButton = styled(Link)`
  --font-size: calc(1.2rem + 0.2rem);
  --font-size-svg: calc(1.6rem + 0.2rem);
  --font-weight: 600;
  --padding: 0.4rem;

  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  color: var(--color-white);
  background-color: transparent;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-decoration: none;
  padding: var(--padding) 0;
  cursor: pointer;
  transition: color 0.35s ease;
  ${sharedStyles}

  svg {
    color: #fab005;
    font-size: var(--font-size-svg);
    transition: color 0.35s ease;
  }

  &:hover {
    color: var(--color-gray);
  }

  &:hover > svg {
    color: #f59f00;
  }
`;

const Director = styled.span`
  --font-size: 1.2rem;
  --font-weight: 600;

  color: var(--color-main-500);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Stars = styled.span`
  --font-size: 1.2rem;
  --font-weight: 600;

  color: var(--color-main-400);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Description = styled.p`
  --font-size: calc(1.6rem - 0.2rem);
  --font-weight: 500;
  --line-height: 1.5;
  --margin-button: 0.4rem;

  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  ${sharedStyles}

  button {
    outline: none;
    border: none;
    background-color: transparent;
    color: var(--color-main-500);
    font-size: var(--font-size);
    margin-left: var(--margin-button);
    cursor: pointer;
    transition: color 0.35s ease;
    ${sharedStyles}

    &:focus {
      outline: none;
      border: none;
    }

    &:hover {
      color: var(--color-main-400);
    }
  }
`;

const SortingContainer = styled.div`
  --width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--width);
  border-bottom: 0.1rem solid var(--color-gray-light);
  padding: var(--padding-sm) 0;
`;

const TitleCounter = styled.span`
  --font-size: calc(1.6rem + 0.2rem);
  --font-size-strong: 2rem;
  --font-weight: 500;

  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}

  strong {
    font-size: var(--font-size-strong);
    color: var(--color-main-600);
  }
`;

const SortingLabel = styled.p`
  --font-size: calc(1.6rem + 0.2rem);
  --font-weight: 500;

  color: var(--color-gray);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  ${sharedStyles}
`;

const Message = styled.p`
  --font-size: 1.6rem;
  --font-weight: 500;
  --line-height: 1.5;
  --padding: 1.2rem;

  color: var(--color-white);
  font-size: var(--font-size-md);
  font-weight: 400;
  line-height: var(--line-height);
  text-align: center;
  padding: 0;
  ${sharedStyles}

  strong {
    font-size: var(--font-size-lg);
    color: var(--color-main-600);
  }
`;

function ViewlistPage() {
  const [viewDescription, setViewDescription] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [favoriteRecordId, setFavoriteRecordId] = useState(null);
  const { user } = useUser();
  const userId = user?.id;
  const { viewedMovies, isPending: isGettingMovies } = useViewedMovies(userId);
  const { dbRatings, isPending: isGettingRatings } = useRating(userId, null);
  const { removeFromFavorites } = useRemoveFromFavorite(
    userId,
    movieId,
    movieTitle
  );
  const { deleteRating } = useDeleteRating(
    userId,
    movieId,
    movieTitle,
    favoriteRecordId
  );

  function handleViewDescription(id) {
    setViewDescription((viewDescription) =>
      viewDescription === id ? null : id
    );
  }

  function handleRemoveFromFavorites(id, title, recordId, userRating) {
    setMovieId(id);
    setMovieTitle(title);
    setFavoriteRecordId(recordId);
    removeFromFavorites();

    if (userRating === undefined) return;
    deleteRating();
  }

  return (
    <StyledViewlistPage>
      {userId ? (
        <>
          <Heading>Your Viewedlist</Heading>

          <SortingContainer>
            <TitleCounter>
              <strong>{viewedMovies?.length}</strong>&nbsp;Titles
            </TitleCounter>

            <Box
              $alignItems='center'
              $gap='0.8rem'
              $width='auto'
            >
              <SortingLabel>Sort by:</SortingLabel>

              <SortBy
                options={[
                  {
                    value: 'list_order',
                    label: 'List Order',
                  },
                  { value: 'alphabetical', label: 'Alphabetical' },
                  { value: 'release_date', label: 'Release Date' },
                  { value: 'runtime', label: 'Runtime' },
                  { value: 'your_ratings', label: 'Ratings' },
                ]}
              />

              <Filter
                filterField='order'
                options={[
                  { value: 'asc', label: <FaArrowUpLong /> },
                  { value: 'desc', label: <FaArrowDownLong /> },
                ]}
              />
            </Box>
          </SortingContainer>

          <>
            {viewedMovies?.length > 0 ? (
              <>
                {viewedMovies.map((movie) => {
                  const {
                    movies: {
                      id,
                      movieName,
                      movieYear,
                      movieDuration,
                      moviePoster,
                      movieDescription,
                      movieGenre,
                      movieDirector,
                      movieStars,
                      type,
                    },
                    record_id,
                  } = movie;
                  const truncatedDescription =
                    movieDescription.length > 350
                      ? `${movieDescription.slice(0, 350)}...`
                      : movieDescription;
                  const runtime = movieDuration;
                  const totalMinutes = parseInt(runtime, 10);
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;
                  const formattedRuntime = `${hours}h ${
                    minutes < 10 ? 0 : ''
                  }${minutes}m`;

                  const userRating = dbRatings.find(
                    (rating) => rating?.item_id === id
                  );

                  return (
                    <Movie key={id}>
                      {isGettingMovies ? (
                        <MiniLoader />
                      ) : (
                        <>
                          <Poster
                            src={moviePoster}
                            alt='Movie poster'
                          />
                          <Bookmark
                            onClick={() =>
                              handleRemoveFromFavorites(
                                id,
                                movieName,
                                record_id,
                                userRating
                              )
                            }
                          >
                            <BsBookmarkCheckFill />
                          </Bookmark>

                          <Box
                            $direction='column'
                            $gap='0.6rem'
                          >
                            <Title to={`/title-id/${id}`}>{movieName}</Title>

                            <Box $gap='0.4rem'>
                              <Year>{movieYear}</Year>

                              <strong style={{ color: '#495057' }}>|</strong>

                              <Duration>{formattedRuntime}</Duration>

                              <strong style={{ color: '#495057' }}>|</strong>

                              <Type>{type}</Type>

                              <strong style={{ color: '#495057' }}>|</strong>

                              <Genre>{movieGenre.join(', ')}</Genre>
                            </Box>

                            <Box $gap='0.4rem'>
                              {userRating ? (
                                <Rating>
                                  {isGettingRatings ? (
                                    <MiniLoader />
                                  ) : (
                                    <>
                                      <TiStarFullOutline />
                                      &nbsp;{userRating?.ratings}
                                    </>
                                  )}
                                </Rating>
                              ) : (
                                <RatingButton to={`/title-id/${id}?rate-movie`}>
                                  <TiStarOutline /> Rate
                                </RatingButton>
                              )}
                            </Box>

                            <Box $gap='0.4rem'>
                              <Director>{movieDirector}</Director>

                              <strong style={{ color: '#495057' }}>|</strong>

                              <Stars>{movieStars.join(', ')}</Stars>
                            </Box>

                            <Description>
                              {movieDescription?.length > 350 &&
                              viewDescription === id
                                ? movieDescription
                                : truncatedDescription}
                              {movieDescription?.length > 350 ? (
                                <button
                                  style={{
                                    color:
                                      viewDescription === id ? '#fab005' : '',
                                  }}
                                  onClick={() => handleViewDescription(id)}
                                >
                                  {viewDescription === id
                                    ? 'collapse'
                                    : 'expand'}
                                </button>
                              ) : null}
                            </Description>
                          </Box>
                        </>
                      )}
                    </Movie>
                  );
                })}
              </>
            ) : (
              <Message>No titles added to the view list</Message>
            )}
          </>
        </>
      ) : (
        <Message>
          You need to register or to log in to be able to view your favorites
          movies
        </Message>
      )}
    </StyledViewlistPage>
  );
}

export default ViewlistPage;
