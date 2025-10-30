import { Link } from 'react-router-dom';
import { IoSparklesOutline } from 'react-icons/io5';

export default function AlreadyAuthentificated() {
  return (
    <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md border border-neutral-700'>
      <div className='w-14 h-14 flex items-center justify-center rounded-full'>
        <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-amber-400 text-black text-2xl'>
          <IoSparklesOutline />
        </span>
      </div>

      <div className='w-full h-auto flex flex-col items-center gap-1.5'>
        <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
          You're already signed in
        </h6>

        <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
          If you're trying to switch accounts, please log out first. Otherwise,
          feel free to keep exploring the app.
        </p>
      </div>

      <Link
        to='/'
        aria-label='Back to home page'
        title='Back to home page'
        className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer py-1.5 px-6 bg-amber-400 text-black text-base font-medium tracking-wide rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
      >
        Home Page
      </Link>
    </div>
  );
}
