import { memo, useCallback, useMemo, useState } from 'react';

import SliderCard from './SliderCard';
import SliderControls from './SliderControls';

const HomeSlider = memo(({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Group the slides - memoized to prevent recalculation
  const slides = useMemo(() => {
    if (!data?.length) return [];

    const limitedData = data.slice(0, 12);
    const groupedData = [];

    for (let i = 0; i < 3; i++) {
      const slideItems = limitedData.slice(i * 4, i * 4 + 4);

      if (slideItems.length > 0) {
        groupedData.push(slideItems);
      }
    }

    return groupedData;
  }, [data]);

  // Memoize helpers to prevent child re-renders
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className='w-full h-[476px] relative rounded-md overflow-hidden'>
      <div
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        className='flex transition-transform duration-500 ease-in-out'
      >
        {slides.map((slideContent, slideIndex) => (
          <div
            key={slideIndex}
            className='min-w-full flex-shrink-0'
          >
            <div className='grid grid-cols-4 gap-y-0 gap-x-6'>
              {slideContent.map((item, itemIndex) => (
                <SliderCard
                  key={itemIndex}
                  item={item}
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
});

HomeSlider.displayName = 'HomeSlider';

export default HomeSlider;
