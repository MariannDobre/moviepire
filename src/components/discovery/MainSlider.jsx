import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper/modules';

import { FaPlay } from 'react-icons/fa';
import { MdArrowForwardIos } from 'react-icons/md';

function MainSlider({ sliderData }) {
  const swiper = useSwiper();
  console.log(swiper);

  return (
    <div className='max-w-[1452px] h-full relative'>
      <button className='flex items-center justify-center absolute top-1/4 right-1 z-[100] w-auto h-24 rounded-md text-red-400 text-2xl bg-black/50 outline outline-1 outline-neutral-950 px-3'>
        <MdArrowForwardIos />
      </button>

      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        onSwiper={(swiper) => console.log(swiper.activeIndex)}
        // onSlideChange={() => console.log('slide schimbat')}
        freeMode={true}
        modules={[FreeMode]}
        className='max-w-full h-full'
      >
        {sliderData.map((movie, index) => (
          <SwiperSlide
            key={index}
            className='h-full'
          >
            <div
              style={{
                background: `linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 0),
                  rgba(0, 0, 0, 0.5),
                  rgba(0, 0, 0, 0.75),
                  rgba(0, 0, 0, 0.95),
                  rgba(0, 0, 0, 1)
                  ), url(${movie.movieBg}) no-repeat top / cover`,
              }}
              className='flex flex-col items-start justify-end h-full px-12'
            >
              <div className='flex gap-6 w-full h-44'>
                <img
                  src={movie.moviePoster}
                  alt='Movie poster'
                  className='w-28 h-44'
                />

                <div className='flex items-center self-end gap-6'>
                  <Link
                    className='text-stone-200 text-lg text-center outline outline-2 outline-stone-200 rounded-full p-2 hover:outline-red-400 hover:text-red-400 focus-visible:outline-red-400 focus-visible:text-red-400 transition-all duration-300'
                    to={`/title-id/${movie.id}/trailer-id/${movie.movieName}`}
                  >
                    <FaPlay />
                  </Link>

                  <div className='flex flex-col items-start'>
                    <h1 className='text-stone-200 text-3xl tracking-wide'>
                      {movie.movieName}
                    </h1>

                    <p className='text-stone-400 text-lg tracking-wide'>
                      Watch the trailer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainSlider;
