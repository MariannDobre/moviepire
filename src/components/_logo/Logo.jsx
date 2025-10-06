import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';

export default function Logo() {
  return (
    <div className='w-full h-24 flex items-center justify-start gap-3'>
      <Link
        to='/'
        className='outline-none border-none cursor-pointer w-12 h-12 rounded-md flex items-center justify-center text-white text-2xl bg-gradient-to-br from-rose-500 to-amber-400 shadow-sm hover:from-rose-700 hover:to-amber-400'
      >
        <FaFilm />
      </Link>

      <div className='w-fit h-full flex flex-col items-start justify-center'>
        <h6 className='text-white text-xl font-medium tracking-wide'>
          Moviepire
        </h6>

        <p className='text-neutral-400 text-sm font-normal tracking-wider'>
          Track your cinematic journey
        </p>
      </div>
    </div>
  );
}
