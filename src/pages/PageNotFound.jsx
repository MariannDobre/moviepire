import { Link } from 'react-router-dom';
import LazyImage from '../utils/LazyImage';

function PageNotFound() {
  return (
    <LazyImage
      asBackground
      src='https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg'
      gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      className='w-full h-[calc(100vh-72px)] flex items-center justify-center'
    >
      <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md border border-neutral-700'>
        <div className='w-full h-auto flex flex-col items-center gap-1.5'>
          <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
            Something went wrong
          </h6>

          <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
            Looks like this scene didn't make the final cut.
            <br />
            The page you're looking for doesn't exist — or maybe it got left on
            the editing floor.
          </p>
        </div>

        <Link
          to='/'
          aria-label='Back to home page'
          className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer py-1.5 px-6 bg-amber-400 text-black text-base font-medium tracking-wide rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
        >
          Home Page
        </Link>
      </div>
    </LazyImage>
  );
}

export default PageNotFound;
