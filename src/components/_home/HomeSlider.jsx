import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsBoxArrowRight } from 'react-icons/bs';

export default function HomeSlider({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Group the slides
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

  // Helpers
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

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
                <div
                  key={itemIndex}
                  className='group w-full h-[476px] rounded-md border border-neutral-700 relative cursor-pointer'
                >
                  <img
                    src={item.moviePoster}
                    alt=''
                    className='w-full h-full rounded-md object-cover'
                  />

                  <div className='absolute top-[calc(100%+1px)] z-[5] w-full h-full flex flex-col gap-3 p-6 rounded-md bg-black/65 backdrop-blur-lg group-hover:top-0 group-focus-visible:top-0 transition-all duration-500'>
                    <h1 className='w-full h-auto text-white text-xl font-medium tracking-wide'>
                      {item.movieName}
                    </h1>

                    <div className='w-full h-auto flex items-center justify-start gap-3'>
                      <p className='text-neutral-400 text-base font-normal tracking-wide'>
                        {item.movieYear}
                      </p>

                      <span className='text-neutral-400 text-base'>|</span>

                      <p className='text-neutral-400 text-base font-normal tracking-wide'>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                    </div>

                    <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide'>
                      {item.movieGenre.join(' • ')}
                    </p>

                    <Link
                      to={`/about-movie/${item.id}`}
                      className='outline-none border border-yellow-500 cursor-pointer mt-auto py-1.5 px-3 rounded-md flex items-center justify-center gap-2 bg-yellow-950/45 text-yellow-500 text-base font-medium tracking-wide hover:bg-yellow-950/75 hover:-translate-y-2 focus-visible:bg-yellow-950/75 focus-visible:-translate-y-2 transition-all duration-300'
                    >
                      Explore&nbsp;
                      <span className='text-yellow-500 text-lg'>
                        <BsBoxArrowRight />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        type='button'
        aria-label='Prev slide'
        onClick={prevSlide}
        className='outline-none border border-neutral-500 cursor-pointer rounded-md absolute z-10 top-1/2 left-0 -translate-y-1/2 w-12 h-20 flex items-center justify-center bg-transparent backdrop-blur-md text-white text-2xl hover:bg-black/75 hover:text-amber-400 focus-visible:bg-black/45 focus-visible:text-amber-400 transition-colors duration-300'
      >
        <FaChevronLeft />
      </button>

      <button
        type='button'
        aria-label='Next slide'
        onClick={nextSlide}
        className='outline-none border border-neutral-500 cursor-pointer rounded-md absolute z-10 top-1/2 right-0 -translate-y-1/2 w-12 h-20 flex items-center justify-center bg-transparent backdrop-blur-md text-white text-2xl hover:bg-black/75 hover:text-amber-400 focus-visible:bg-black/45 focus-visible:text-amber-400 transition-colors duration-300'
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
