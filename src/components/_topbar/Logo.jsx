import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

export default function Logo({ width = 'w-auto' }) {
  return (
    <div className={`${width} h-12 flex items-center justify-start gap-3`}>
      <Link
        to='/'
        className='outline-none border-none cursor-pointer w-12 h-12 flex items-center justify-center text-2xl text-white bg-gradient-to-br from-indigo-500 to-blue-400 rounded-lg shadow-sm hover:from-indigo-600 hover:to-blue-500'
      >
        <FaFilm />
      </Link>

      <div className='w-auto h-12 flex flex-col items-start justify-center'>
        <h6 className='text-lg text-white font-medium tracking-wide'>
          Moviepire
        </h6>

        <p className='text-sm text-gray-400 font-normal tracking-wider'>
          Track your cinematic journey
        </p>
      </div>
    </div>
  );
}
