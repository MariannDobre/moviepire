import { memo, useCallback, useMemo, useState } from 'react';

import SliderCard from './SliderCard';
import SliderControls from './SliderControls';

const heightMap = {
  'home-page': 'h-[476px]',
  'discovery-page': 'h-[476px]',
};

const columnsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

const Slider = memo(
  ({ data, itemsPerSlide, maxSlides, heightTAG, columns }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Group the slides - memoized to prevent recalculation
    const slides = useMemo(() => {
      if (!data?.length) return [];

      const limit = itemsPerSlide * maxSlides;
      const limitedData = data.slice(0, limit);
      const groupedData = [];

      for (let i = 0; i < maxSlides; i++) {
        const start = i * itemsPerSlide;
        const end = start + itemsPerSlide;
        const slideItems = limitedData.slice(start, end);

        if (slideItems.length > 0) {
          groupedData.push(slideItems);
        }
      }

      return groupedData;
    }, [data, itemsPerSlide, maxSlides]);

    // Memoize helpers to prevent child re-renders
    const prevSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    const nextSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    if (!slides.length) return null;

    return (
      <div
        className={`w-full ${heightMap[heightTAG]} relative rounded-md overflow-hidden`}
      >
        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className='flex transition-transform duration-500 ease-in-out'
        >
          {slides.map((slideContent, slideIndex) => (
            <div
              key={slideIndex}
              className='min-w-full flex-shrink-0'
            >
              <div className={`grid ${columnsMap[columns]} gap-y-0 gap-x-6`}>
                {slideContent.map((item, itemIndex) => (
                  <SliderCard
                    key={itemIndex}
                    item={item}
                    cardHeight={heightMap[heightTAG]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <SliderControls
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
