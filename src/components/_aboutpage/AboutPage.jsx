import AboutCards from './AboutCards';

import { FaFilm } from 'react-icons/fa';
import HowItWorks from './HowItWorks';
import AboutCTA from './AboutCTA';

export default function AboutPage() {
  return (
    <div className='w-full h-auto flex flex-col gap-20'>
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h6 className='flex items-center justify-center gap-3 text-center text-5xl text-white font-semibold tracking-wide'>
          <span class='text-6xl text-blue-400'>
            <FaFilm />
          </span>
          Moviepire
        </h6>

        <p className='w-full max-w-[720px] text-center text-xl text-gray-400 font-normal tracking-wide'>
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
