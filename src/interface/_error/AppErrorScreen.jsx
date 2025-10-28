import LazyImage from '../../utils/LazyImage';
import { FaExclamation } from 'react-icons/fa6';

function AppErrorScreen({ error, resetErrorBoundary }) {
  return (
    <LazyImage
      asBackground
      src='https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg'
      gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      className='w-full h-screen flex flex-col items-center justify-center'
    >
      <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md border border-neutral-700'>
        <div className='w-14 h-14 flex items-center justify-center rounded-full'>
          <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-red-500 text-white text-2xl'>
            <FaExclamation />
          </span>
        </div>

        <div className='w-full h-auto flex flex-col items-center gap-1.5'>
          <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
            Something went wrong
          </h6>

          <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
            {error?.message}
          </p>
        </div>

        <button
          role='alert'
          aria-label='Back to home page'
          title='Back to home page'
          onClick={resetErrorBoundary}
          className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer py-1.5 px-6 bg-white text-black text-base font-medium tracking-wide rounded-md hover:bg-red-500 hover:text-white focus-visible:bg-red-500 focus-visible:text-white transition-colors duration-300'
        >
          Try Again
        </button>
      </div>
    </LazyImage>
  );
}

export default AppErrorScreen;
