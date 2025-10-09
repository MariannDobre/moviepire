import WatchedMovies from './WatchedMovies';
import RatedMovies from './RatedMovies';
import FavoriteMovie from './FavoriteMovie';
import AverageRating from './AverageRating';

export default function StatsContainer({ userID }) {
  return (
    <div className='w-full h-[476px] grid grid-cols-2 grid-rows-2 gap-x-9 gap-y-9'>
      <WatchedMovies userId={userID} />

      <RatedMovies userId={userID} />

      <FavoriteMovie userId={userID} />

      <AverageRating userId={userID} />
    </div>
  );
}
