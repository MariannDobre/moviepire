import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import {
  useRandomViewedMovies,
  useViewedMovies,
} from '../../hooks/useViewedMovies';
import { useDeleteRating, useRating } from '../../hooks/useRating';
import {
  useRemoveFromFavorite,
  useAddToFavorite,
} from '../../hooks/useAddToFavorites';
import { useMoviesIds } from '../../hooks/useMoviesIds';

import styled from 'styled-components';
import { Box } from '../../globalVariables';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsBookmarkPlusFill, BsBookmarkCheckFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import MiniLoader from '../loaders/miniLoader';

const Slider = styled.div`
  --width: 100%;
  --max-width: 128rem;
  --height: 52rem;
  --padding: 2rem 0;

  display: flex;
  align-items: center;
  position: relative;
  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);
  padding: var(--padding);
  background-color: transparent;
  overflow: hidden;
`;

const Slide = styled.div`
  --width: 100%;
  --height: 100%;

  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  gap: 2rem;
  width: var(--width);
  height: var(--height);
  background-color: transparent;
`;

const SlideCounterContainer = styled.div`
  --width: 100%;
  --max-width: 128rem;
  --height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: absolute;
  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

const SlideCounter = styled.span`
  --width: 100%;
  --height: calc(0.8rem - 0.2rem);

  width: var(--width);
  height: var(--height);
  background-color: var(--color-black-light);
  border-radius: calc(var(--border-rounded-xs) / 2);
`;

const LessMovies = styled.p`
  --width: 100%;
  --max-width: 128rem;
  --font-size: 2.4rem;
  --font-weight: 500;
  --line-height: 1.5;

  width: var(--width);
  max-width: var(--max-width);
  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-align: center;
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

const Item = styled.div`
  /* --width: calc(128rem - (2rem * 5) / 6); */
  --width: 19.67rem;
  --height: 100%;
  --font-size: 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: var(--width);
  height: var(--height);
  background-color: var(--color-black-light);
  color: var(--color-white);
  font-size: var(--font-size);
  text-align: center;
`;

const ItemContent = styled.div`
  --padding: 1.6rem;
  --height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  height: var(--height);
  padding: var(--padding);
`;

const Poster = styled.img`
  --width: 100%;
  --height: 28rem;

  width: var(--width);
  height: var(--height);
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
  border-bottom: 0.1rem solid var(--color-gray-dark);
`;

const ItemHeading = styled(Link)`
  --font-size: 1.6rem;
  --font-weight: 600;

  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-decoration: none;
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  margin-bottom: auto;
  transition: color 0.35s ease;

  &:hover,
  &:active {
    color: var(--color-main-500);
  }
`;

const AddToButton = styled.button`
  outline: none;
  border: none;
  position: absolute;
  background-color: transparent;
  top: 0;
  left: -0.5rem;
  cursor: pointer;

  span {
    --width-span: 3.6rem;
    --height-span: 3.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width-span);
    height: var(--height-span);
  }

  svg {
    font-size: 4rem;
    transition: color 0.35s ease;
  }
`;

const ViewlistButton = styled.button`
  --font-size: 1.5rem;
  --font-size-svg: 2rem;
  --font-weight: 600;
  --width: 16rem;
  --height: 3.6rem;

  outline: none;
  border: none;
  color: #fab005;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: var(--width);
  height: var(--height);
  text-align: center;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  cursor: pointer;
  border-radius: calc(var(--border-rounded-xs) / 2);
  transition: background-color 0.35s ease;

  span {
    font-size: var(--font-size-svg);
    font-weight: 400;
  }

  &:hover {
    background-color: rgba(250, 176, 5, 0.1);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const TrailerButton = styled(Link)`
  --font-size: 1.4rem;
  --font-size-svg: 1.2rem;
  --font-weight: 700;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: var(--color-white);
  background-color: transparent;
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-decoration: none;
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  cursor: pointer;
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) 1.2rem;
  transition: background-color 0.35s ease;

  svg {
    font-size: var(--font-size-svg);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
    border: none;
  }
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

const RateButton = styled(Link)`
  --font-size: calc(1.2rem + 0.2rem);
  --font-size-svg: 1.6rem;
  --font-weight: 700;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  background-color: transparent;
  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-decoration: none;
  padding: calc(var(--padding-md) / 2) 0;
  border-radius: calc(var(--border-rounded-xs) / 2);
  letter-spacing: var(--letter-spacing-xs);
  cursor: pointer;
  transition: background-color 0.35s ease;

  svg {
    color: #fab005;
    font-size: var(--font-size-svg);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const SlideButton = styled.button`
  --width: 4.8rem;
  --height: 6.8rem;

  outline: none;
  border: 0.1rem solid var(--color-white);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width);
  height: var(--height);
  font-size: var(--font-size-3xl);
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: calc(var(--border-rounded-xs) / 2);
  top: 25%;
  z-index: 100;
  cursor: pointer;
  transition: all 0.35s ease;

  svg {
    color: var(--color-white);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    svg {
      color: #fab005;
    }
  }
`;

const itemsPerSlide = 6;
const movieRating = 0;
const listOrder = Date.now();

function FeaturedRandomViewed() {
  //
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemId, setItemId] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [movieYear, setMovieYear] = useState(null);
  const [movieDuration, setMovieDuration] = useState(null);
  const [favoriteRecordId, setFavoriteRecordId] = useState(null);

  //
  const { user } = useUser();
  const userId = user?.id;

  //
  const { viewedMovies, isPending: isGetting } = useViewedMovies(userId);
  const { randomViewedMovies } = useRandomViewedMovies(userId);
  const { moviesIds } = useMoviesIds();
  const { dbRatings } = useRating(userId, null);
  const [favorites, setFavorites] = useState(moviesIds.map((item) => item.id));
  const favoriteItems = viewedMovies.filter((item) =>
    favorites.includes(item.item_id)
  );
  const totalSlides =
    viewedMovies.length <= 36
      ? Math.ceil(viewedMovies.length / itemsPerSlide)
      : 6;

  //
  const { addToFavorites, isPending: isAdding } = useAddToFavorite(
    userId,
    itemId,
    movieTitle,
    movieYear,
    movieDuration,
    movieRating,
    listOrder
  );
  const { removeFromFavorites, isPending: isRemoving } = useRemoveFromFavorite(
    userId,
    itemId,
    movieTitle
  );
  const { deleteRating } = useDeleteRating(
    userId,
    itemId,
    movieTitle,
    favoriteRecordId
  );

  function handlePrevSlide() {
    if (currentSlide === 0) return;
    setCurrentSlide((currentSlide) => currentSlide - 1);
  }

  function handleNextSlide() {
    if (currentSlide === totalSlides - 1) return;
    setCurrentSlide((currentSlide) => currentSlide + 1);
  }

  function handleToggleStatus(
    itemId,
    movieTitle,
    movieYear,
    movieDuration,
    recordId
  ) {
    if (favoriteItems.find((favItem) => favItem.item_id === itemId)) {
      removeFromFavorites();
      deleteRating();
    } else {
      addToFavorites();
    }

    setItemId(itemId);
    setMovieTitle(movieTitle);
    setMovieYear(movieYear);
    setMovieDuration(movieDuration);
    setFavoriteRecordId(recordId);
  }

  return (
    <>
      <Slider>
        {viewedMovies.length < 12 ? (
          <>
            <SlideCounterContainer>
              {Array.from({ length: 1 }, (_, index) => (
                <SlideCounter
                  key={index}
                  style={{
                    backgroundColor: currentSlide === index ? '#fab005' : '',
                    maxWidth: `128rem`,
                  }}
                />
              ))}
            </SlideCounterContainer>

            <LessMovies>
              For proper operation, there must be at least 12 movies in the
              viewlist
            </LessMovies>
          </>
        ) : (
          <>
            {isGetting ? (
              <MiniLoader />
            ) : (
              <>
                <SlideButton
                  style={{
                    display: currentSlide === 0 ? 'none' : 'block',
                    left: 0,
                  }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                >
                  <MdNavigateBefore />
                </SlideButton>

                <SlideCounterContainer>
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <SlideCounter
                      key={index}
                      style={{
                        backgroundColor:
                          currentSlide === index ? '#fab005' : '',
                        maxWidth: `calc((128rem - 2rem) / ${totalSlides})`,
                      }}
                    />
                  ))}
                </SlideCounterContainer>

                <React.Fragment>
                  {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <Slide
                      key={slideIndex}
                      style={{
                        translate: `${-100 * currentSlide}%`,
                        transition: 'translate 0.35s ease-in-out',
                      }}
                    >
                      {randomViewedMovies
                        .slice(
                          currentSlide * itemsPerSlide,
                          (currentSlide + 1) * itemsPerSlide
                        )
                        .map((item, itemIndex) => {
                          const { record_id } = item;
                          const userRating = dbRatings.find(
                            (rating) => rating.item_id === item.movies.id
                          );

                          return (
                            <Item key={itemIndex}>
                              <Poster
                                src={item.movies.moviePoster}
                                alt={`Poster of ${item.movies.movieName}`}
                              />

                              <AddToButton
                                className={
                                  favoriteItems.find(
                                    (favItem) =>
                                      favItem.item_id === item.movies.id
                                  )
                                    ? 'bookmark-active'
                                    : 'bookmark'
                                }
                                onClick={() =>
                                  handleToggleStatus(
                                    item.movies.id,
                                    item.movies.movieName,
                                    item.movies.movieYear,
                                    item.movies.movieDuration,
                                    record_id
                                  )
                                }
                              >
                                {favoriteItems.find(
                                  (favItem) =>
                                    favItem.item_id === item.movies.id
                                ) ? (
                                  <>
                                    {isRemoving && itemId === item.movies.id ? (
                                      <span style={{ color: '#fab005' }}>
                                        <MiniLoader />
                                      </span>
                                    ) : (
                                      <>
                                        <BsBookmarkCheckFill />
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {isAdding && itemId === item.movies.id ? (
                                      <span style={{ color: '#fab005' }}>
                                        <MiniLoader />
                                      </span>
                                    ) : (
                                      <>
                                        <BsBookmarkPlusFill />
                                      </>
                                    )}
                                  </>
                                )}
                              </AddToButton>

                              <ItemContent>
                                <ItemHeading to={`/title-id/${item.movies.id}`}>
                                  {item.movies.movieName}
                                </ItemHeading>

                                <Box
                                  $direction='column'
                                  $alignItems='center'
                                  $gap='0.8rem'
                                  $width='16rem'
                                  $height='auto'
                                  $margin='0 0 0.4rem 0'
                                >
                                  <ViewlistButton
                                    onClick={() =>
                                      handleToggleStatus(
                                        item.movies.id,
                                        item.movies.movieName,
                                        item.movies.movieYear,
                                        item.movies.movieDuration,
                                        record_id
                                      )
                                    }
                                  >
                                    {favoriteItems.find(
                                      (favItem) =>
                                        favItem.item_id === item.movies.id
                                    ) ? (
                                      <>
                                        {isRemoving &&
                                        itemId === item.movies.id ? (
                                          <MiniLoader />
                                        ) : (
                                          <>
                                            <span>&#10003;</span>&nbsp;Viewlist
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {isAdding &&
                                        itemId === item.movies.id ? (
                                          <MiniLoader />
                                        ) : (
                                          <>
                                            <span>+</span>&nbsp;Viewlist
                                          </>
                                        )}
                                      </>
                                    )}
                                  </ViewlistButton>

                                  <Box
                                    $alignItems='center'
                                    $justifyContent='space-between'
                                    $gap='0.4rem'
                                    $width='100%'
                                    $height='auto'
                                  >
                                    <TrailerButton
                                      to={`/title-id/${item.movies.id}/trailer-id/${item.movies.movieName}`}
                                    >
                                      <FaPlay /> Trailer
                                    </TrailerButton>

                                    {userRating ? (
                                      <Rating>
                                        <TiStarFullOutline />
                                        &nbsp;<span>{userRating.ratings}</span>
                                      </Rating>
                                    ) : (
                                      <RateButton
                                        to={`/title-id/${item.movies.id}?rate-movie`}
                                      >
                                        <TiStarOutline /> Rate
                                      </RateButton>
                                    )}
                                  </Box>
                                </Box>
                              </ItemContent>
                            </Item>
                          );
                        })}
                    </Slide>
                  ))}
                </React.Fragment>

                <SlideButton
                  style={{
                    display:
                      currentSlide === totalSlides - 1 ? 'none' : 'block',
                    right: 0,
                  }}
                  onClick={handleNextSlide}
                  disabled={currentSlide === totalSlides - 1}
                >
                  <MdNavigateNext />
                </SlideButton>
              </>
            )}
          </>
        )}
      </Slider>
    </>
  );
}

export default FeaturedRandomViewed;
