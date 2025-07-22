import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

export default function Logo() {
  return (
    <div className='hidden w-0 h-0 md:w-1/4 md:h-8 lg:flex lg:items-center lg:justify-start lg:gap-3 xl:w-1/4 xl:h-12'>
      <Link
        to='/'
        className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-base lg:text-xl xl:text-2xl rounded-md xl:rounded-lg outline-none border-none cursor-pointer flex items-center justify-center text-white bg-gradient-to-br from-indigo-500 to-blue-400 shadow-sm hover:from-indigo-600 hover:to-blue-500'
      >
        <FaFilm />
      </Link>

      <div className='w-auto h-full flex flex-col items-start justify-center'>
        <h6
          className={`text-sm lg:text-base xl:text-lg text-white font-medium tracking-wide`}
        >
          Moviepire
        </h6>

        <p
          className={`text-xs xl:text-sm text-gray-400 font-normal tracking-wider`}
        >
          Track your cinematic journey
        </p>
      </div>
    </div>
  );
}
