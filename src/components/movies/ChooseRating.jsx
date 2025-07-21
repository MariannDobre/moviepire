import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FILLED_STAR = '#f87171';
const OUTLINED_STAR = '#a3a3a3';
const SIZE = '24px';

function ChooseRating({ rating, setRating }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <div className='flex items-center justify-center gap-1.5'>
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

export default ChooseRating;

// RENDER THE STARS

function Stars({ fullStar, onRating, onHoverIn, onHoverOut }) {
  return (
    <button
      className='cursor-pointer border-none outline-none bg-transparent'
      type='button'
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {fullStar ? (
        <FaStar
          size={SIZE}
          fill={FILLED_STAR}
        />
      ) : (
        <FaRegStar
          size={SIZE}
          fill={OUTLINED_STAR}
        />
      )}
    </button>
  );
}
