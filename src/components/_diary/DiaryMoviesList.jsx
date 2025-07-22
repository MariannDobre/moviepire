import { useUser } from '../../hooks/auth/useUser';
import { useDiaryMovies } from '../../hooks/movies/useDiaryMovies';
import SmallLoader from '../loaders/SmallLoader';
import DiaryMovie from './DiaryMovie';

export default function DiaryMoviesList({
  selectedGenre,
  selectedType,
  selectedYearRange,
}) {
  const { user, isAuthenticated } = useUser();
  const { diaryMovies, isFetching, error } = useDiaryMovies(
    user?.id,
    selectedGenre,
    selectedType,
    selectedYearRange
  );

  if (!isAuthenticated) return null;

  if (error)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-9 bg-neutral-50/10 border border-red-700 rounded-lg shadow-sm'>
        <p className='text-red-500 text-sm font-normal tracking-wide text-center'>
          There was an error while fetching the diary data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading the diary data...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div className='w-full h-auto flex flex-col items-center gap-1.5 md:gap-3'>
      <p className='text-xs md:text-sm text-white font-medium tracking-wider self-start'>
        <span className='text-sm md:text-base text-blue-400'>
          {diaryMovies?.length}
        </span>
        &nbsp;entries found
      </p>

      <div className='w-full h-auto flex flex-col items-center gap-3 md:gap-6 p-3 md:p-6 bg-neutral-50/10 border border-neutral-500 rounded-md lg:rounded-lg shadow-sm'>
        {diaryMovies.length > 0 ? (
          diaryMovies.map((movie, index) => (
            <DiaryMovie
              key={index}
              movie={movie}
            />
          ))
        ) : (
          <p className='text-sm sm:text-base md:text-lg text-gray-400 font-medium tracking-wider md:tracking-wide text-center'>
            No title with this filtering options
          </p>
        )}
      </div>
    </div>
  );
}
