import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useViewedMovies } from '../../hooks/useViewedMovies';
import {
  useAddToFavorite,
  useRemoveFromFavorite,
} from '../../hooks/useAddToFavorites';
import { useDeleteRating } from '../../hooks/useRating';
import { useFeaturedMovies } from '../../hooks/useFeaturedMovies';

import styled from 'styled-components';
import { Box } from '../../globalVariables';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { BsBookmarkPlusFill, BsBookmarkCheckFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import MiniLoader from '../loaders/miniLoader';
import Modal from '../modal/modal';

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
  justify-content: center;
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
  --max-width: calc((128rem - 2rem) / 2);
  --height: calc(0.8rem - 0.2rem);

  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);
  background-color: var(--color-black-light);
  border-radius: calc(var(--border-rounded-xs) / 2);
`;

const Item = styled.div`
  --width: calc(128rem - (2rem * 5) / 6);
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

const AboutButton = styled.button`
  --font-size-svg: 1.8rem;

  outline: none;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.35s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    color: var(--color-white);
    font-size: var(--font-size-svg);
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

const TrailerButton = styled.button`
  --font-size: 1.4rem;
  --font-size-svg: 1.2rem;
  --font-weight: 600;

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
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  cursor: pointer;
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) 1.6rem;
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

const DetailsPoster = styled.img`
  --width: 7.6rem;
  --height: 11.6rem;

  width: var(--width);
  height: var(--height);
  background-repeat: no-repeat;
  object-fit: cover;
`;

const Title = styled(Link)`
  --font-size: 2rem;
  --font-weight: 500;

  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-decoration: none;
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  transition: color 0.35s ease;

  &:hover,
  &:active {
    color: var(--color-main-500);
  }
`;

const Details = styled.p`
  --font-size: calc(1.2rem + 0.2rem);
  --font-weight: 300;

  color: var(--color-gray-light);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

const Description = styled.p`
  --font-size: 1.4rem;
  --font-weight: 300;

  color: var(--color-white);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  line-height: 1.5;
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

const CloseButton = styled.button`
  --font-size-svg: 2.8rem;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;

  svg {
    font-size: var(--font-size-svg);
    color: var(--color-white);
    transition: color 0.35s ease;
  }

  &:hover > svg {
    color: var(--color-gray);
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

function FeaturedYear() {
  const [itemId, setItemId] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [movieYear, setMovieYear] = useState(null);
  const [movieDuration, setMovieDuration] = useState(null);

  //
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDetails, setShowDetails] = useState(null);
  const { data, isPending } = useFeaturedMovies();
  const { user } = useUser();
  const userId = user?.id;
  const totalSlides = Math.ceil(data.length / itemsPerSlide);

  //
  const [favorites, setFavorites] = useState(data.map((item) => item.id));
  const { viewedMovies } = useViewedMovies(userId);
  const favoriteItems = viewedMovies.filter((item) =>
    favorites.includes(item.item_id)
  );

  const findFavoriteRecordId = viewedMovies.filter(
    (item) => item?.item_id === Number(itemId)
  );
  const favoriteRecordId = findFavoriteRecordId[0]?.record_id;

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

  function handleShowDetails(itemId) {
    setShowDetails(itemId);
  }

  function handlePrevSlide() {
    if (currentSlide === 0) return;
    setCurrentSlide((currentSlide) => currentSlide - 1);
  }

  function handleNextSlide() {
    if (currentSlide === totalSlides - 1) return;
    setCurrentSlide((currentSlide) => currentSlide + 1);
  }

  function handleToggleStatus(itemId, movieTitle, movieYear, movieDuration) {
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
  }

  return (
    <Slider>
      {isPending ? (
        <MiniLoader />
      ) : (
        <>
          <SlideButton
            style={{ display: currentSlide === 0 ? 'none' : 'block', left: 0 }}
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
                  backgroundColor: currentSlide === index ? '#fab005' : '',
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
                {data
                  .slice(
                    currentSlide * itemsPerSlide,
                    (currentSlide + 1) * itemsPerSlide
                  )
                  .map((item, itemIndex) => {
                    return (
                      <Item key={itemIndex}>
                        <Poster
                          src={item.moviePoster}
                          alt={`Poster of ${item.movieName}`}
                        />

                        <AddToButton
                          className={
                            favoriteItems.find(
                              (favItem) => favItem.item_id === item.id
                            )
                              ? 'bookmark-active'
                              : 'bookmark'
                          }
                          onClick={() =>
                            handleToggleStatus(
                              item.id,
                              item.movieName,
                              item.movieYear,
                              item.movieDuration
                            )
                          }
                        >
                          {favoriteItems.find(
                            (favItem) => favItem.item_id === item.id
                          ) ? (
                            <>
                              {isRemoving && itemId === item.id ? (
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
                              {isAdding && itemId === item.id ? (
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
                          <ItemHeading to={`/title-id/${item.id}`}>
                            {item.movieName}
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
                                  item.id,
                                  item.movieName,
                                  item.movieYear,
                                  item.movieDuration
                                )
                              }
                            >
                              {favoriteItems.find(
                                (favItem) => favItem.item_id === item.id
                              ) ? (
                                <>
                                  {isRemoving && itemId === item.id ? (
                                    <MiniLoader />
                                  ) : (
                                    <>
                                      <span>&#10003;</span>&nbsp;Viewlist
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {isAdding && itemId === item.id ? (
                                    <MiniLoader />
                                  ) : (
                                    <>
                                      <span>+</span> Viewlist
                                    </>
                                  )}
                                </>
                              )}
                            </ViewlistButton>

                            <Box
                              $alignItems='center'
                              $justifyContent='space-between'
                              $width='100%'
                              $height='auto'
                            >
                              <TrailerButton>
                                <FaPlay /> Trailer
                              </TrailerButton>

                              <AboutButton
                                onClick={() => handleShowDetails(item.id)}
                              >
                                <BsInfoCircle />
                              </AboutButton>
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
              display: currentSlide === totalSlides - 1 ? 'none' : 'block',
              right: 0,
            }}
            onClick={handleNextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            <MdNavigateNext />
          </SlideButton>
        </>
      )}

      {data.map((item, index) => {
        const movieDuration = item.movieDuration;
        const totalMinutes = parseInt(movieDuration, 10);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedDuration = `${hours}h ${
          minutes < 10 ? 0 : ''
        }${minutes}m`;

        return (
          <React.Fragment key={index}>
            {showDetails === item.id && (
              <Modal>
                <Modal.Overlay>
                  <Modal.Body
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    gap='2rem'
                    width='64rem'
                    height='auto'
                    padding='2.4rem'
                    backgroundColor='#1a1a1a'
                  >
                    <Box $gap='1.6rem'>
                      <DetailsPoster
                        src={item.moviePoster}
                        alt={`Poster of ${item.movieName}`}
                      />

                      <Box
                        $direction='column'
                        $gap='0.2rem'
                      >
                        <Title to={`/title-id/${item.id}`}>
                          {item.movieName}
                        </Title>

                        <Details>
                          {item.movieYear} • {formattedDuration} • {item.type}
                        </Details>

                        <Details>{item.movieGenre.join(' • ')}</Details>
                      </Box>

                      <CloseButton onClick={() => setShowDetails(null)}>
                        <MdClose />
                      </CloseButton>
                    </Box>

                    <Description>{item.movieDescription}</Description>

                    <ViewlistButton
                      onClick={() =>
                        handleToggleStatus(
                          item.id,
                          item.movieName,
                          item.movieYear,
                          item.movieDuration
                        )
                      }
                    >
                      {favoriteItems.find(
                        (favItem) => favItem.item_id === item.id
                      ) ? (
                        <>
                          {isRemoving && itemId === item.id ? (
                            <MiniLoader />
                          ) : (
                            <>
                              <span>&#10003;</span> Viewlist
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {isAdding && itemId === item.id ? (
                            <MiniLoader />
                          ) : (
                            <>
                              <span>+</span> Viewlist
                            </>
                          )}
                        </>
                      )}
                    </ViewlistButton>
                  </Modal.Body>
                </Modal.Overlay>
              </Modal>
            )}
          </React.Fragment>
        );
      })}
    </Slider>
  );
}

export default FeaturedYear;
