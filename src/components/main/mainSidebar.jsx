import React from 'react';

import styled from 'styled-components';
import { Box } from '../../globalVariables';
import { BsPlayCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Sidebar = styled.div`
  --width: calc(36rem - 2rem);
  --height: 56rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: var(--width);
  height: var(--height);
  background: linear-gradient(
    to bottom,
    var(--color-black-light),
    var(--color-black),
    var(--color-black)
  );
  padding: var(--padding-lg);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Heading = styled.p`
  color: var(--color-main-600);
  font-size: var(--font-size-xl);
  font-weight: bold;
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

const Poster = styled.img`
  --width: 7.6rem;
  --height: 12rem;

  display: block;
  width: var(--width);
  height: var(--height);
  background: center/cover no-repeat;
`;

const TrailerLink = styled(Link)`
  --font-size: 1.6rem;
  --font-size-svg: 2.4rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  color: var(--color-gray-light);
  font-size: var(--font-size);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.35s ease;

  svg {
    color: var(--color-white);
    font-size: var(--font-size-svg);
    transition: color 0.35s ease;
  }

  &:hover,
  &:active {
    color: var(--color-gray);
  }

  &:hover > svg,
  &:active > svg {
    color: #f59f00;
  }
`;

const Title = styled(Link)`
  --font-size: 1.6rem;
  --font-weight: 600;

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

function MainSidebar({ data, currentIndex }) {
  const currentItem = data[currentIndex];
  const nextItem1 = data[(currentIndex + 1) % data.length];
  const nextItem2 = data[(currentIndex + 2) % data.length];

  return (
    <Sidebar>
      <Heading>Up next</Heading>

      <Box
        $direction='column'
        $gap='2rem'
      >
        <Item>
          <Poster
            src={currentItem.moviePoster}
            alt={currentItem.movieName}
          />

          <Box
            $direction='column'
            $gap='0.4rem'
          >
            <Title to={`/title-id/${currentItem.id}`}>
              {currentItem.movieName}
            </Title>

            <TrailerLink
              to={`/title-id/${currentItem.id}/trailer-id/${currentItem.movieName}`}
            >
              Watch trailer <BsPlayCircle />
            </TrailerLink>
          </Box>
        </Item>

        <Item>
          <Poster
            src={nextItem1.moviePoster}
            alt={nextItem1.movieName}
          />

          <Box
            $direction='column'
            $gap='0.4rem'
          >
            <Title to={`/title-id/${nextItem1.id}`}>
              {nextItem1.movieName}
            </Title>

            <TrailerLink
              to={`/title-id/${nextItem1.id}/trailer-id/${nextItem1.movieName}`}
            >
              Watch trailer <BsPlayCircle />
            </TrailerLink>
          </Box>
        </Item>

        <Item>
          <Poster
            src={nextItem2.moviePoster}
            alt={nextItem2.movieName}
          />

          <Box
            $direction='column'
            $gap='0.4rem'
          >
            <Title to={`/title-id/${nextItem2.id}`}>
              {nextItem2.movieName}
            </Title>

            <TrailerLink
              to={`/title-id/${nextItem2.id}/trailer-id/${nextItem2.movieName}`}
            >
              Watch trailer <BsPlayCircle />
            </TrailerLink>
          </Box>
        </Item>
      </Box>
    </Sidebar>
  );
}

export default MainSidebar;
