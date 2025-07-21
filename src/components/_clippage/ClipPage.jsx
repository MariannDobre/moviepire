import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/movies/useMovieDetails';

import SmallLoader from '../loaders/SmallLoader';

import { BsArrowReturnLeft } from 'react-icons/bs';

export default function ClipPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { movieDetails, isFetching, error } = useMovieDetails(movieId);

  if (!movieDetails?.movieVideos)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-9 bg-neutral-50/10 border border-red-700 rounded-lg shadow-sm'>
        <p className='text-red-500 text-lg font-medium tracking-wider text-center'>
          There is no clip for this title...
        </p>

        <button
          type='button'
          onClick={() => navigate(-1)}
          className='outline-none border-none cursor-pointer flex items-center justify-center text-center bg-red-400 text-white text-base font-normal tracking-wide py-1.5 px-6 rounded-md shadow-sm hover:bg-red-500 focus-visible:bg-red-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
        >
          Go Back
        </button>
      </div>
    );

  if (error)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-9 bg-neutral-50/10 border border-red-700 rounded-lg shadow-sm'>
        <p className='text-red-500 text-sm font-normal tracking-wide text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the clip data...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div className='w-full h-[calc(100vh-48px-48px-80px)] flex flex-col gap-6'>
      <button
        className='outline-none border-none cursor-pointer bg-blue-400 self-start flex items-center justify-center gap-1.5 py-1.5 px-6 text-white text-sm font-normal tracking-wide rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
        onClick={() => navigate(-1)}
      >
        <span className='text-lg'>
          <BsArrowReturnLeft />
        </span>
        Go Back
      </button>

      <iframe
        className='w-full max-w-full h-full'
        src={`${movieDetails?.movieVideos[0]}?autoplay=1`}
        sandbox='allow-scripts allow-same-origin allow-presentation'
        allow='autoplay'
        frameBorder='0'
        loading='lazy'
        referrerPolicy='no-referrer'
        title={`Trailer video of ${movieDetails?.movieName}`}
        aria-label={`Trailer video of ${movieDetails?.movieName}`}
        scrolling='no'
      />
    </div>
  );
}
