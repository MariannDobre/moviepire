import React, { memo } from 'react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const buttonStyles =
  'outline-none border border-neutral-500 cursor-pointer rounded-md absolute z-10 top-1/2 -translate-y-1/2 w-12 h-20 flex items-center justify-center bg-transparent backdrop-blur-md text-white text-2xl hover:bg-black/75 hover:text-amber-400 focus-visible:bg-black/45 focus-visible:text-amber-400 transition-colors duration-300';

const SliderControls = memo(({ onPrevSlide, onNextSlide }) => {
  return (
    <React.Fragment>
      <button
        type='button'
        aria-label='Prev slide'
        onClick={onPrevSlide}
        className={`${buttonStyles} left-0`}
      >
        <FaChevronLeft />
      </button>

      <button
        type='button'
        aria-label='Next slide'
        onClick={onNextSlide}
        className={`${buttonStyles} right-0`}
      >
        <FaChevronRight />
      </button>
    </React.Fragment>
  );
});

SliderControls.displayName = 'SliderControls';

export default SliderControls;
