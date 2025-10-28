import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <div className='w-full h-[calc(100vh-72px-72px-476px-40px)] flex flex-col items-start justify-center gap-3 p-9 rounded-md shadow-md bg-gradient-to-br from-transparent to-amber-400'>
      <p className='w-full h-auto text-start text-neutral-100 text-xl font-normal tracking-wide'>
        Free, clean, and packed with smart filters — build your diary in
        minutes.
      </p>

      <h6 className='w-full h-auto text-start text-white text-4xl font-medium tracking-wide'>
        Your Movie Life, Organized.
      </h6>

      <Link
        to='/diary'
        aria-label='Create your diary now'
        title='Create your diary now'
        className='outline-none border-none cursor-pointer w-auto h-auto text-center bg-black/50 text-neutral-100 text-base font-medium tracking-wide py-3 px-9 shadow-md rounded-md hover:bg-black/75 hover:text-white focus-visible:bg-black/75 focus-visible:text-white transition-colors duration-300'
      >
        Create Your Diary
      </Link>
    </div>
  );
}
