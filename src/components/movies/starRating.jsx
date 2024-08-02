import React, { useState } from 'react';

import styled from 'styled-components';

import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

const FILLED_STAR = '#4f46e5';
const OUTLINED_STAR = '#999999';
const SIZE = '28px';

const StarContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

function StarRating({ rating, setRating }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <StarContainer>
      {Array.from({ length: 10 }, (_, i) => {
        return (
          <Stars
            key={i + 1}
            fullStar={hoveredRating ? hoveredRating >= i + 1 : rating >= i + 1}
            onRating={() => handleRating(i + 1)}
            onHoverIn={() => setHoveredRating(i + 1)}
            onHoverOut={() => setHoveredRating(0)}
          />
        );
      })}
    </StarContainer>
  );
}

export default StarRating;

// RENDER THE STARS

const Star = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;

  &:focus {
    outline: none;
    border: none;
  }
`;

function Stars({ fullStar, onRating, onHoverIn, onHoverOut }) {
  return (
    <Star
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {fullStar ? (
        <TiStarFullOutline
          size={SIZE}
          fill={FILLED_STAR}
        />
      ) : (
        <TiStarOutline
          size={SIZE}
          fill={OUTLINED_STAR}
        />
      )}
    </Star>
  );
}
