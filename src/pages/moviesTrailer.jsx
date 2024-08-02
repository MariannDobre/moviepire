import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTrailer } from '../hooks/useTrailer';

import styled from 'styled-components';
import { Box } from '../globalVariables';

import { BsArrowReturnLeft } from 'react-icons/bs';

// Styles that can be found in other component/common styles
const sharedStyles = `
letter-spacing: var(--letter-spacing-xs);
word-spacing: var(--word-spacing-xs);
`;

//
const StyledMoviesTrailer = styled.div`
  --width: 100%;
  --max-width: 128rem;
  --height: 100%;
  --max-height: calc(52rem + 5.6rem + 0.8rem);
  --margin: 5.6rem;

  display: flex;
  align-items: center;
  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);
  max-height: var(--max-height);
  margin-top: var(--margin);
`;

const Trailer = styled.iframe`
  --width: 100%;
  --max-width: 88rem;
  --height: 52rem;

  width: var(--width);
  max-width: var(--max-width);
  min-height: var(--height);
`;

const Poster = styled.img`
  --width: 9.6rem;
  --height: 12.4rem;

  width: var(--width);
  height: var(--height);
`;

const Title = styled.h3`
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

const Description = styled.p`
  --font-size: calc(1.6rem - 0.2rem);
  --line-height: 1.5;

  color: var(--color-white);
  font-size: var(--font-size);
  line-height: var(--line-height);
  ${sharedStyles}
`;

const Genre = styled.p`
  --font-size: calc(1.6rem - 0.2rem);
  --font-weight: 300;

  color: var(--color-gray-light);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  text-transform: capitalize;
  ${sharedStyles}
`;

const HorizontalBar = styled.div`
  --width: 100%;
  --height: 0.2rem;

  width: var(--width);
  height: var(--height);
  background-color: var(--color-gray-dark);
`;

const ClosePage = styled.button`
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

function MoviesTrailer() {
  const navigate = useNavigate();
  const params = useParams();
  const titleName = params.titleName;
  const { trailerData } = useTrailer(titleName);

  return (
    <StyledMoviesTrailer>
      <Box
        $direction='column'
        $gap='1.2rem'
        $padding='1.2rem 0 0 0'
        $width='100%'
        $maxWidth='88rem'
      >
        <ClosePage onClick={() => navigate(-1)}>
          Go back <BsArrowReturnLeft />
        </ClosePage>

        <Trailer
          frameBorder={0}
          title={trailerData?.movieName}
          src={`${trailerData?.movieTrailer}?autoplay=1`}
        />
      </Box>

      <Box
        $direction='column'
        $gap='1.2rem'
        $backgroundColor='#1a1a1a'
        $width='100%'
        $maxWidth='40rem'
        $height='calc(56rem + 1.2rem + 1.2rem)'
        $maxHeight='58.4rem'
        $padding='2rem'
      >
        <Box
          $gap='1.2rem'
          $height='100%'
          $maxHeight='12.4rem'
        >
          <Poster
            alt='Poster of the movie'
            src={trailerData?.moviePoster}
          />

          <Box
            $direction='column'
            $alignItems='flex-start'
            $justifyContent='flex-start'
            $gap='0.4rem'
          >
            <Title>
              {trailerData?.movieName}&nbsp;
              <span>({trailerData?.movieYear})</span>
            </Title>

            <Genre>{trailerData?.movieGenre.join(' • ')}</Genre>
          </Box>
        </Box>

        <HorizontalBar />

        <Description>{trailerData?.movieDescription}</Description>
      </Box>
    </StyledMoviesTrailer>
  );
}

export default MoviesTrailer;
