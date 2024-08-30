import React from 'react';
import { useRandomMovies } from '../hooks/useRandomMovies';
import MainSlider from '../components/discovery/MainSlider';
import SliderSidebar from '../components/discovery/SliderSidebar';

function Discovery() {
  const { randomMovies } = useRandomMovies();

  return (
    <div className='flex flex-col gap-12'>
      <h1 className='text-red-400 text-3xl font-bold tracking-wider'>
        Discovery
      </h1>

      {/* 1824px */}
      <div className='flex gap-12 h-[640px]'>
        <MainSlider sliderData={randomMovies} />

        <SliderSidebar sidebarData={randomMovies} />
      </div>
    </div>
  );
}

export default Discovery;
