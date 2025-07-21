import { useNavigate, useParams } from 'react-router-dom';
import { useTrailer } from '../../hooks/movies/useTrailer';

import Trailer from './Trailer';
import TrailerDetails from './TrailerDetails';
import SmallLoader from '../loaders/SmallLoader';

import { BsArrowReturnLeft } from 'react-icons/bs';

export default function MovieTrailer() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { trailerData, isFetching, error } = useTrailer(movieId);

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
          Loading the trailer data...
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

      <div className='w-full h-full flex items-center gap-12'>
        <Trailer
          movieTrailer={trailerData?.movieTrailer}
          movieName={trailerData?.movieName}
        />

        <TrailerDetails
          moviePoster={trailerData?.moviePoster}
          movieName={trailerData?.movieName}
          movieYear={trailerData?.movieYear}
          movieDescription={trailerData?.movieDescription}
          movieGenre={trailerData?.movieGenre}
        />
      </div>
    </div>
  );
}
