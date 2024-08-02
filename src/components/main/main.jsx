import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useCarouselMovies } from '../../hooks/useCarouselItems';

import styled from 'styled-components';
import { Box } from '../../globalVariables';

import MainSlider from './mainSlider';
import MainSidebar from './mainSidebar';
import FeaturedYear from './featuredYear';
import FeaturedRandomViewed from './featuredRandomViewed';

const StyledMain = styled.main`
  --width: 128rem;
  --margin: 4rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
  width: var(--width);
  margin: 0 auto var(--margin) auto;
`;

const FeaturedHeading = styled.h3`
  --font-size: 3.2rem;

  color: #fab005;
  font-size: var(--font-size);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

function Main() {
  const { user, isAuthenticated } = useUser();
  const { randomMovies } = useCarouselMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <StyledMain>
      <Box
        $gap='2rem'
        $maxWidth='128rem'
        $padding='calc(2rem + 5.6rem) 0 0 0'
      >
        <MainSlider
          data={randomMovies}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />

        <MainSidebar
          data={randomMovies}
          currentIndex={currentIndex}
        />
      </Box>

      <Box
        $direction='column'
        $gap='3.2rem'
      >
        <FeaturedHeading>Featured this year</FeaturedHeading>

        <FeaturedYear />
      </Box>

      <Box
        $direction='column'
        $gap='3.2rem'
      >
        <FeaturedHeading>Rewatch from view list</FeaturedHeading>

        <FeaturedRandomViewed />
      </Box>
    </StyledMain>
  );
}

export default Main;
