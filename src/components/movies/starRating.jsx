import React, { useState } from 'react';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

const FILLED_STAR = '#4f46e5';
const OUTLINED_STAR = '#999999';
const SIZE = '28px';

function StarRating({ rating, setRating }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <div>
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
    </div>
  );
}

export default StarRating;

// RENDER THE STARS

function Stars({ fullStar, onRating, onHoverIn, onHoverOut }) {
  return (
    <button
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
    </button>
  );
}
