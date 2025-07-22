import { useUser } from '../../hooks/auth/useUser';
import WatchedMovies from './WatchedMovies';
import RatedMovies from './RatedMovies';
import FavoriteMovie from './FavoriteMovie';
import AverageRating from './AverageRating';
import SmallLoader from '../loaders/SmallLoader';

export default function UserStats() {
  const { user, isFetching, isAuthenticated } = useUser();

  if (isFetching) {
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the movie data...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='w-full h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-96 p-6 flex flex-col items-center justify-center gap-9 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-base font-normal tracking-wide text-center'>
          You will need to log into your verified account or to register a new
          one to view and track your stats!
        </p>
      </div>
    );
  }

  return (
    <div className='w-full h-auto p-6 flex flex-col gap-6 xl:gap-9 bg-neutral-50/10 border border-neutral-500 rounded-lg shadow-sm'>
      <div className='w-full flex flex-col gap-1'>
        <h6 className='text-base md:text-lg lg:text-xl xl:text-2xl text-white font-medium tracking-wide'>
          Welcome back&nbsp;
          <strong className='text-blue-400'>
            {user?.user_metadata?.username}
          </strong>
          , this is your journey so far
        </h6>

        <p className='text-xs lg:text-sm xl:text-base text-gray-400 font-normal tracking-wider'>
          Track your cinematic adventures and discoveries
        </p>
      </div>

      <div className='w-full grid grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-3 xl:gap-x-6 xl:gap-y-0'>
        <WatchedMovies userId={user?.id} />

        <RatedMovies userId={user?.id} />

        <FavoriteMovie userId={user?.id} />

        <AverageRating userId={user?.id} />
      </div>
    </div>
  );
}
