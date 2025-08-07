import AboutCards from './AboutCards';

import { FaFilm } from 'react-icons/fa';
import HowItWorks from './HowItWorks';
import AboutCTA from './AboutCTA';

export default function AboutPage() {
  return (
    <div className='w-full h-auto flex flex-col gap-6 md:gap-9 lg:gap-12 xl:gap-16 2xl:gap-20'>
      <div className='w-full flex flex-col items-center justify-center gap-1.5 lg:gap-3'>
        <h6 className='flex items-center justify-center gap-1.5 lg:gap-3 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl text-white font-semibold tracking-wide'>
          <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl text-blue-400'>
            <FaFilm />
          </span>
          Moviepire
        </h6>

        <p className='w-full max-w-[720px] text-center text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 font-normal tracking-wider lg:tracking-wide'>
          Your personal companion for tracking movies and series across the
          years. Build your viewing history, rate your favorites, and discover
          what to watch next.
        </p>
      </div>

      <AboutCards />

      <HowItWorks />

      <AboutCTA />
    </div>
  );
}
